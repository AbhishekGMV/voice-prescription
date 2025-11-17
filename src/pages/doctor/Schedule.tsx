"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, ControllerRenderProps } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment, { unitOfTime } from "moment";
import { ReloadIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { DAYS_OF_WEEK } from "@/data/constants";
import { useDoctorStore } from "@/store/doctor.store";
import api from "@/api";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  schedule: z.array(
    z.object({
      startTime: z.string(),
      endTime: z.string(),
      dayOfWeek: z.enum(DAYS_OF_WEEK),
    })
  ),
});

export default function Schedule() {
  const { user } = useDoctorStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      schedule: DAYS_OF_WEEK.map((day, idx) => ({
        dayOfWeek: day,
        startTime: moment()
          .startOf("isoWeek" as unitOfTime.StartOf)
          .add(idx, "days")
          .set("hours", 9)
          .set("minutes", 0)
          .format(),
        endTime: moment()
          .startOf("isoWeek" as unitOfTime.StartOf)
          .add(idx, "days")
          .set("hours", 18)
          .set("minutes", 0)
          .format(),
      })),
    },
  });

  const { fields: scheduleFields } = useFieldArray({
    name: "schedule",
    control: form.control,
  });

  useEffect(() => {
    const fetchAvailability = async () => {
      if (!user) return;
      try {
        const { data: result } = await api.get("/availability", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            id: user.id,
          },
        });
        const isCurrentWeek = result.data.some(
          (availability: z.infer<typeof result.data>) =>
            moment(availability.startTime).format("YYYY-MM-DD") ===
            moment().startOf("isoWeek").format("YYYY-MM-DD")
        );
        if (!isCurrentWeek) {
          toast({
            variant: "default",
            title: "Set your schedule of this week",
            description:
              "Your current week schedule is not set. Save changes to confirm schedule",
          });
          return;
        }
        const availabilities = result?.data.map(
          (availability: z.infer<typeof result.data>) => ({
            startTime: moment(availability.startTime).format("HH:mm"),
            endTime: moment(availability.endTime).format("HH:mm"),
            ...availability,
          })
        );
        availabilities.forEach(
          (schedule: z.infer<typeof availabilities>, idx: number) => {
            form.setValue(`schedule.${idx}.startTime`, schedule.startTime);
            form.setValue(`schedule.${idx}.endTime`, schedule.endTime);
            form.setValue(`schedule.${idx}.dayOfWeek`, schedule.dayOfWeek);
          }
        );
      } catch (error) {
        console.error("Error fetching availability:", error);
        toast({
          title: "Error",
          description: "Failed to fetch availability. Please try again.",
          variant: "destructive",
        });
      }
    };

    fetchAvailability();
  }, [user, form, toast]);

  const handleTimeChange = (
    field: ControllerRenderProps<z.infer<typeof formSchema>>,
    newValue: string,
    currValue: string
  ) => {
    const updatedValue = moment(currValue)
      .set({
        hour: moment(newValue, "HH:mm").hour(),
        minute: moment(newValue, "HH:mm").minute(),
      })
      .format();
    field.onChange(updatedValue);
  };

  const onSubmit = async ({ schedule }: z.infer<typeof formSchema>) => {
    if (!user) return;
    try {
      const data = {
        availabilities: schedule,
        interval: 30,
        weekStart: moment().startOf("isoWeek").format(),
      };
      await api.post("/availability", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          id: user.id,
        },
      });
      toast({
        title: "Success",
        description: "Your schedule has been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      toast({
        title: "Error",
        description: "Failed to update schedule. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Update Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {scheduleFields.map((schedule, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-20 font-medium capitalize">
                    {schedule.dayOfWeek.substring(0, 3)}
                  </div>
                  <FormField
                    control={form.control}
                    name={`schedule.${idx}.startTime`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="sr-only">Start Time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            onChange={(e) =>
                              handleTimeChange(
                                field,
                                e.target.value,
                                field.value
                              )
                            }
                            value={moment(field.value).format("HH:mm")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`schedule.${idx}.endTime`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="sr-only">End Time</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="time"
                            onChange={(e) =>
                              handleTimeChange(
                                field,
                                e.target.value,
                                field.value
                              )
                            }
                            value={moment(field.value).format("HH:mm")}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
