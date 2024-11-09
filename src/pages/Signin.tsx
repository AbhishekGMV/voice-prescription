import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientLogin } from "./patient/Login";
import { DoctorLogin } from "./doctor/Login";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function Signin() {
  const { state } = useLocation();

  return (
    <div className="flex justify-center min-h-screen items-center bg-gray-100 p-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign In
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <Tabs defaultValue={`${state?.role ?? "patient"}`}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger
              value="patient"
              className="p-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
            >
              Patient
            </TabsTrigger>
            <TabsTrigger
              value="doctor"
              className="p-2 data-[state=active]:bg-primary data-[state=active]:text-white rounded-lg"
            >
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
