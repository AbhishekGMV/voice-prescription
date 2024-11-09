import { DoctorRegister } from "@/pages/doctor/Register";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PatientRegister } from "./patient/Register";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className=" w-full max-w-sm">
        <Tabs defaultValue="patient" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="p-2" value="patient">
              Patient
            </TabsTrigger>
            <TabsTrigger className="p-2" value="doctor">
              Doctor
            </TabsTrigger>
          </TabsList>
          <TabsContent value="patient">
            <PatientRegister />
          </TabsContent>
          <TabsContent value="doctor">
            <DoctorRegister />
          </TabsContent>
        </Tabs>
        <div className="text-sm text-muted-foreground text-center">
          Already have an account?{" "}
          <Button variant="link" asChild>
            <Link to="/">Login</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default Signup;
