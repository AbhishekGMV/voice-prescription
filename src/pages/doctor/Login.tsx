import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDoctorStore } from "@/store/doctor.store";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import api from "@/api";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";

const formSchema = z.object({
  user: z.object({
    phone: z.string().min(10).max(13),
    password: z.string().min(1),
  }),
});

export function DoctorLogin() {
  const doctorStore = useDoctorStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: { phone: "", password: "" },
    },
  });

  async function onSubmit({ user }: z.infer<typeof formSchema>) {
    doctorStore.setLoading(true);
    try {
      const { data } = await api.post("/doctor/login", {
        user,
      });

      if (data.data && data.data.token) {
        doctorStore.setLoading(false);
        return navigate("/doctor/dashboard");
      }
      throw new Error("Invalid response from server");
    } catch (err) {
      doctorStore.setLoading(false);

      let message = (err as Error).message || "An error occurred";
      if (axios.isAxiosError(err)) {
        message = err.response?.data.message;
      }
      toast({
        title: "Error",
        description: message ?? "Something went wrong.",
        variant: "destructive",
      });
    } finally {
      doctorStore.setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="user.phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormDescription>
                We don't share your phone number with anyone
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="user.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormDescription>Password is encrypted</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" disabled={doctorStore.loading}>
          {doctorStore.loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
