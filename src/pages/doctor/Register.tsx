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
import { toast, useToast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Card } from "../../components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export function DoctorRegister() {
  const doctorStore = useDoctorStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const registerSchema = z.object({
    phone: z.string().min(10).max(13),
    password: z.string().min(1),
    name: z.string(),
    imageUrl: z.string().optional(),
    role: z.string(),
  });

  const roles = [
    { label: "General", value: "General" },
    { label: "Dental", value: "Dental" },
    { label: "Cardio", value: "Cardio" },
  ];

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phone: "",
      password: "",
      name: "",
      role: "",
    },
  });

  async function onSubmit({
    phone,
    password,
    name,
    role,
  }: z.infer<typeof registerSchema>) {
    doctorStore.setLoading(true);
    try {
      const payload = {
        user: {
          phone,
          password,
          name,
          role,
        },
      };
      const { data } = await api.post("/doctor/register", payload);
      if (data.data && data.data.id) {
        const user = { ...data.data, phone };
        doctorStore.setUser({ ...user, phone, password, name, role });
        navigate("/doctor/sign");
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

    doctorStore.setLoading(false);
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
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role, idx) => {
                        return (
                          <>
                            <SelectItem key={idx} value={role.value}>
                              {role.label}
                            </SelectItem>
                          </>
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

export function DoctorSignatureUpload() {
  const doctorStore = useDoctorStore();
  const user = doctorStore.user;
  const navigate = useNavigate();

  const signatureSchema = z.object({
    sign: z.instanceof(FileList).optional(),
  });

  const form = useForm<z.infer<typeof signatureSchema>>({
    resolver: zodResolver(signatureSchema),
    defaultValues: {
      sign: undefined,
    },
  });

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target || !event.target.files) {
      return;
    }
    doctorStore.setSignature(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!user) {
      return;
    }
    const formData = new FormData();
    formData.append("signature", doctorStore.signature as Blob);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        id: `${user.id}`,
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      doctorStore.setLoading(true);

      const result = await api.patch(`doctor/${user.id}`, formData, config);
      if (result.data.status === "success") {
        await handleLogin();
        doctorStore.setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handleLogin() {
    doctorStore.setLoading(true);
    try {
      const { data } = await api.post("/doctor/login", {
        user,
      });
      if (data.data && data.data.token) {
        const result = { ...data.data };
        doctorStore.setUser({ ...user, id: result.id, token: result.token });
        navigate("/doctor/dashboard");
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

    doctorStore.setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="grid w-full max-w-sm items-center gap-1.5 p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="sign"
              render={() => (
                <FormItem>
                  <FormLabel>Signature</FormLabel>
                  <FormControl>
                    <Input id="sign" type="file" onChange={handleFileUpload} />
                  </FormControl>
                  <FormDescription>
                    This will be used for prescriptions
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full"
              type="submit"
              disabled={doctorStore.loading}
            >
              {doctorStore.loading ? (
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Submit
            </Button>
            <Button
              className="w-full"
              type="button"
              variant={"secondary"}
              onClick={handleLogin}
            >
              Skip for now
            </Button>
          </form>
        </Form>
      </Card>
    </div>
  );
}
