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
import { useToast } from "@/hooks/use-toast";
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
import { useNavigate } from "react-router-dom";
import { PATIENT } from "@/data/constants";

export function PatientRegister() {
  const patientStore = usePatientStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const registerSchema = z.object({
    phone: z.string().min(10).max(13),
    password: z.string().min(1),
    name: z.string().min(1),
    imageUrl: z.string().optional(),
    age: z.string().refine((age) => parseInt(age) > 0 && parseInt(age) < 100, {
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
          age: parseInt(age),
          gender,
        },
      };
      const { data } = await api.post("/patient/register", payload);
      if (data.data && data.data.id) {
        const user = { ...data.data, phone };
        patientStore.setUser({ ...user, phone, password, name });
        navigate("/", { state: { role: PATIENT.toLowerCase(), phone: phone } });
      }
    } catch (err) {
      let message = (err as Error).message ?? "An error occurred";
      if (axios.isAxiosError(err)) {
        message = err.response?.data.message;
      }
      console.log(message);

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
        duration: 2000,
      });
    }

    patientStore.setLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm p-2 space-y-2"
      >
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
              <FormLabel>Gender</FormLabel>
              <FormControl>
                <Select
                  required
                  onValueChange={field.onChange}
                  value={field.value}
                >
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
              <FormDescription>Password is encrypted</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
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
