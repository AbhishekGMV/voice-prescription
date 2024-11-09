import { DoctorRegister } from "@/pages/doctor/Register";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientRegister } from "./patient/Register";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-4">
      <Card className=" w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up
          </CardTitle>
        </CardHeader>
        <Tabs defaultValue="patient" className="">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className="p-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              value="patient"
            >
              Patient
            </TabsTrigger>
            <TabsTrigger
              className="p-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
              value="doctor"
            >
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
