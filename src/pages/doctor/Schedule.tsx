"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import moment from "moment";
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
      dayOfWeek: z.number(),
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
      schedule: DAYS_OF_WEEK.map((idx) => ({
        dayOfWeek: moment().day(idx).day(),
        startTime: "09:00",
        endTime: "18:00",
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
        const { data: result } = await api.get("/doctor/availability");
        const availabilities = result.data.map(
          (availability: z.infer<typeof result.data>) => ({
            ...availability,
            startTime: moment.utc(availability.startTime).format("HH:mm"),
            endTime: moment.utc(availability.endTime).format("HH:mm"),
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

  const onSubmit = async ({ schedule }: z.infer<typeof formSchema>) => {
    if (!user) return;
    try {
      const data = {
        weeklyAvailability: schedule.map((slot) => ({
          dayOfWeek: slot.dayOfWeek,
          startTime: slot.startTime,
          endTime: slot.endTime,
        })),
        doctorId: user.id,
        interval: 30,
      };
      await api.post("/doctor/availability", data);
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
                    {moment()
                      .day(schedule.dayOfWeek)
                      .format("dddd")
                      .substring(0, 3)}
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
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
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
                            onChange={(e) => field.onChange(e.target.value)}
                            value={field.value}
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
