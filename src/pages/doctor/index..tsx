import { DoctorLogin } from "@/pages/doctor/Login";
import { DoctorRegister } from "@/pages/doctor/Register";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

function Doctor() {
  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className=" w-full max-w-sm">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="p-2" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="p-2" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <DoctorLogin />
          </TabsContent>
          <TabsContent value="register">
            <DoctorRegister />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Doctor;
