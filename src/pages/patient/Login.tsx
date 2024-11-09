import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useToast } from "../../hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { usePatientStore } from "@/store/patient.store";
import { PATIENT } from "@/data/constants";

const formSchema = z.object({
  user: z.object({
    phone: z
      .string()
      .min(10, { message: "Invalid phone number format" })
      .max(13, { message: "Invalid phone number format" }),
    password: z
      .string()
      .min(3, { message: "Password must contain min 3 characters" }),
  }),
});

export function PatientLogin() {
  const patientStore = usePatientStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user: { phone: patientStore.user?.phone ?? "", password: "" },
    },
  });
  async function onSubmit({ user }: z.infer<typeof formSchema>) {
    patientStore.setLoading(true);
    try {
      const { data } = await api.post("/patient/login", {
        user,
      });
      if (data.data && data.data.token) {
        const user = { ...data.data, type: PATIENT.toLowerCase() };
        patientStore.setUser({ ...user });
        navigate("/patient/dashboard");
      }
    } catch (err) {
      let message = (err as Error).message || "An error occurred";
      if (axios.isAxiosError(err)) {
        message = err.response?.data.message;
      }
      console.log(err);
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    patientStore.setLoading(false);
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
                <Input
                  placeholder="Phone"
                  {...field}
                  disabled={(patientStore.user?.phone?.length as number) === 10}
                />
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
        <Button
          className="w-full"
          type="submit"
          disabled={patientStore.loading}
        >
          {patientStore.loading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
