import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { PatientLogin } from "./Login";
import { PatientRegister } from "./Register";
import { useState } from "react";

function Patient() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex justify-center min-h-screen items-center">
      <Card className=" w-full max-w-sm">
        <Tabs
          value={activeTab}
          onValueChange={(tab) => setActiveTab(tab)}
          className="w-[400px]"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="p-2" value="login">
              Login
            </TabsTrigger>
            <TabsTrigger className="p-2" value="register">
              Register
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <PatientLogin />
          </TabsContent>
          <TabsContent value="register">
            <PatientRegister />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Patient;
