import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PatientLogin } from "./patient/Login";
import { DoctorLogin } from "./doctor/Login";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

function Signin() {
  const { state } = useLocation();
  console.log(state);

  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className=" w-full max-w-sm shadow-xl">
        <Tabs
          defaultValue={`${state?.role ?? "patient"}`}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="p-2" value="patient">
              Patient
            </TabsTrigger>
            <TabsTrigger className="p-2" value="doctor">
              Doctor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient">
            <PatientLogin />
          </TabsContent>
          <TabsContent value="doctor">
            <DoctorLogin />
          </TabsContent>
          <div className="text-sm text-muted-foreground text-center">
            Don't have an account?{" "}
            <Button variant="link" asChild>
              <Link to="/register">Register</Link>
            </Button>
          </div>
        </Tabs>
      </Card>
    </div>
  );
}

export default Signin;
