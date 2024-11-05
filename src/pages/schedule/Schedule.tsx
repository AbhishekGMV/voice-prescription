import api from "@/api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DAYS_OF_WEEK } from "@/data/constants";
import { useDoctorStore } from "@/store/doctor.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import moment, { unitOfTime } from "moment";
import { useEffect } from "react";
// import { useEffect } from "react";
import { ControllerRenderProps, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

function Schedule() {
  const { user } = useDoctorStore();

  const formSchema = z.object({
    schedule: z.array(
      z.object({
        startTime: z.string(),
        endTime: z.string(),
        dayOfWeek: z.enum(DAYS_OF_WEEK),
      })
    ),
  });

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
    (async () => {
      if (!user) return;
      const { data } = await api.get("/availability", {
        headers: {
          Authorization: `Bearer ${user.token}`,
          id: user.id,
        },
      });
      const availabilities = data?.data.map(
        (availability: z.infer<typeof data.data>) => ({
          startTime: moment(availability.startTime).format("HH:mm"),
          endTime: moment(availability.endTime).format("HH:mm"),
          ...availability,
        })
      );
      availabilities.map(
        (schedule: z.infer<typeof availabilities>, idx: number) => {
          form.setValue(`schedule.${idx}.startTime`, schedule.startTime);
          form.setValue(`schedule.${idx}.endTime`, schedule.endTime);
          form.setValue(`schedule.${idx}.dayOfWeek`, schedule.dayOfWeek);
        }
      );
    })();
  }, [user, form]);

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
    const data = {
      availabilities: schedule,
      weekStart: moment().startOf("isoWeek").format("YYYY-MM-DD").toString(),
      interval: 30,
    };
    const result = await api.post("/availability", data, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        id: user.id,
      },
    });
    console.log(result);
  };

  return (
    <div className="container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {scheduleFields.map((schedule, idx) => {
            return (
              <div key={idx} className="flex gap-10">
                <div className="capitalize ">
                  {schedule.dayOfWeek.substring(0, 3)}
                </div>
                <FormField
                  control={form.control}
                  name={`schedule.${idx}.startTime`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          onChange={(e) =>
                            handleTimeChange(field, e.target.value, field.value)
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
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          type="time"
                          onChange={(e) =>
                            handleTimeChange(field, e.target.value, field.value)
                          }
                          value={moment(field.value).format("HH:mm")}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            );
          })}

          <Button
            className="my-4 "
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default Schedule;
