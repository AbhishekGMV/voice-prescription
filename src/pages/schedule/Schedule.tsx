import api from "@/api";
import { DateTimePicker } from "@/components/doctor/DateTimePicker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { useDoctorStore } from "@/store/doctor.store";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

function Schedule() {
  const { user } = useDoctorStore();

  const formSchema = z.object({
    fromDate: z.date(),
    toDate: z.date(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fromDate: undefined,
      toDate: undefined,
    },
  });

  const onSubmit = async ({ fromDate, toDate }: z.infer<typeof formSchema>) => {
    if (fromDate === undefined || toDate === undefined) {
      return;
    }
    if (!user) return;

    const data = {
      startTime: new Date(fromDate).toISOString(),
      endTime: new Date(toDate).toISOString(),
      interval: 30,
      date: new Date().toISOString(),
      doctorId: user.id,
    };

    try {
      const result = await api.post("/slot/availability", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          id: user.id,
        },
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="fromDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>From</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => form.setValue("fromDate", date as Date)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="toDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>To</FormLabel>
                <FormControl>
                  <DateTimePicker
                    date={field.value}
                    setDate={(date) => form.setValue("toDate", date as Date)}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />

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
