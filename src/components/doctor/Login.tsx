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
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";

const formSchema = z.object({
  phone: z.string().min(10).max(13),
  password: z.string().min(1),
});

export function DoctorLogin() {
  const doctorStore = useDoctorStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit({ phone, password }: z.infer<typeof formSchema>) {
    doctorStore.setLoading(true);
    try {
      const { data } = await api.post("/doctor/login", {
        phone,
        password,
      });
      if (data.data && data.data.token) {
        const user = { ...data.data, phone };
        localStorage.setItem("user", JSON.stringify(user));
        doctorStore.setUser(user);
        navigate("/doctor/dashboard");
      }
    } catch (err) {
      let message = (err as Error).message || "An error occured";
      if (axios.isAxiosError(err)) {
        message = err.response?.data.message;
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    doctorStore.setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="phone"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormDescription>Password is encryted</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={doctorStore.loading}>
            {doctorStore.loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
