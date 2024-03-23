import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DoctorLogin } from "./doctor/DoctorLogin";

function Homepage() {
  
  return (
    <div>
      <Card className="w-full max-w-sm">
        <Tabs defaultValue="doctor" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="doctor">Doctor</TabsTrigger>
            <TabsTrigger value="password">Patient</TabsTrigger>
          </TabsList>
          <TabsContent value="doctor">
            <DoctorLogin />
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Change your password here. After saving, you'll be logged out.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="current">Current password</Label>
                  <Input id="current" type="password" />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">New password</Label>
                  <Input id="new" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save password</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Homepage;
