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
import { useToast } from "../../components/ui/use-toast";
import { Card } from "../../components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import { usePatientStore } from "@/store/patient.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function PatientRegister({
  onRegisterSuccess,
}: {
  onRegisterSuccess: () => void;
}) {
  const patientStore = usePatientStore();
  const { toast } = useToast();

  const registerSchema = z.object({
    phone: z.string().min(10).max(13),
    password: z.string().min(1),
    name: z.string().min(1),
    imageUrl: z.string().optional(),
    age: z
      .string()
      .refine((age) => parseInt(age) > 0 && parseInt(age) < 100, {
        message: "Invalid age",
      }),
    gender: z.string(),
  });

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      password: "",
      name: "",
      age: "",
      gender: "",
    },
  });

  const genders = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Others", value: "others" },
  ];

  async function onSubmit({
    phone,
    password,
    name,
    age,
    gender,
  }: z.infer<typeof registerSchema>) {
    patientStore.setLoading(true);
    try {
      const payload = {
        user: {
          phone,
          password,
          name,
          age,
          gender,
        },
      };
      const { data } = await api.post("/patient/register", payload);
      if (data.data && data.data.id) {
        const user = { ...data.data, phone };
        patientStore.setUser({ ...user, phone, password, name });
        onRegisterSuccess();
      }
    } catch (err) {
      let message = (err as Error).message || "An error occurred";
      if (axios.isAxiosError(err)) {
        message = err.response?.data.message;
      }
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }

    patientStore.setLoading(false);
  }

  return (
    <Card className="w-full max-w-sm p-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Age</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Age" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {genders.map((gender, idx) => {
                        return (
                          <SelectItem key={idx} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormControl>
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
                <FormDescription>Password is encrypted</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={patientStore.loading}>
            {patientStore.loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Submit
          </Button>
        </form>
      </Form>
    </Card>
  );
}
