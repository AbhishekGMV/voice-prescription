import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Clock, FileText, Bell, Settings } from "lucide-react";

export default function PatientHome() {
  return (
    <div className="container mx-auto py-8 px-4">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, John Doe</h1>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
          <Avatar>
            <AvatarImage
              src="/placeholder.svg?height=40&width=40"
              alt="John Doe"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Book Appointment</CardTitle>
            <CardDescription>
              Schedule a new appointment with a doctor
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar className="h-12 w-12 text-primary" />
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={() => (window.location.href = "/book-appointment")}
            >
              Book Now
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Previous Appointments</CardTitle>
            <CardDescription>View your appointment history</CardDescription>
          </CardHeader>
          <CardContent>
            <Clock className="h-12 w-12 text-primary" />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/previous-appointments")}
            >
              View History
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Consultation Records</CardTitle>
            <CardDescription>
              Access your medical records and prescriptions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FileText className="h-12 w-12 text-primary" />
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => (window.location.href = "/consultation-records")}
            >
              View Records
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=40&width=40"
                    alt="Dr. Jane Smith"
                  />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">Dr. Jane Smith</h3>
                  <p className="text-sm text-muted-foreground">Cardiologist</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">July 20, 2023</p>
                <p className="text-sm text-muted-foreground">10:00 AM</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
