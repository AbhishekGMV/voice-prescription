import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const appointments = [
  {
    id: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2023-06-15",
    time: "10:00 AM",
    location: "Heart Care Center",
    status: "upcoming",
  },
  {
    id: 2,
    doctorName: "Dr. Michael Lee",
    specialty: "Dermatologist",
    date: "2023-06-20",
    time: "2:00 PM",
    location: "Skin Health Clinic",
    status: "upcoming",
  },
  {
    id: 3,
    doctorName: "Dr. Emily Chen",
    specialty: "Pediatrician",
    date: "2023-06-25",
    time: "11:30 AM",
    location: "Children's Wellness Center",
    status: "upcoming",
  },
  {
    id: 4,
    doctorName: "Dr. John Smith",
    specialty: "Orthopedist",
    date: "2023-05-10",
    time: "9:00 AM",
    location: "Bone & Joint Clinic",
    status: "completed",
  },
  {
    id: 5,
    doctorName: "Dr. Lisa Brown",
    specialty: "Neurologist",
    date: "2023-05-05",
    time: "3:30 PM",
    location: "Neurology Center",
    status: "completed",
  },
  {
    id: 6,
    doctorName: "Dr. David Wilson",
    specialty: "Ophthalmologist",
    date: "2023-04-28",
    time: "11:00 AM",
    location: "Vision Care Institute",
    status: "completed",
  },
];

export default function AppointmentHistory() {
  const upcomingAppointments = appointments.filter(
    (app) => app.status === "upcoming"
  );
  const pastAppointments = appointments.filter(
    (app) => app.status === "completed"
  );

  const AppointmentCard = ({ appointment }: { appointment: any }) => (
    <Card
      key={appointment.id}
      className="container hover:shadow-md transition-shadow"
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">{appointment.doctorName}</h3>
            <Badge variant="secondary" className="mt-1">
              {appointment.specialty}
            </Badge>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                {appointment.status === "upcoming" ? "Manage" : "View"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Appointment Details</DialogTitle>
                <DialogDescription>
                  {appointment.status === "upcoming"
                    ? "View or modify your appointment with "
                    : "View your past appointment with "}
                  {appointment.doctorName}.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="col-span-3">{appointment.date}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <ClockIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="col-span-3">{appointment.time}</span>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <MapPinIcon className="h-4 w-4 text-muted-foreground" />
                  <span className="col-span-3">{appointment.location}</span>
                </div>
              </div>
              <DialogFooter>
                {appointment.status === "upcoming" && (
                  <>
                    <Button variant="outline">Reschedule</Button>
                    <Button variant="destructive">Cancel Appointment</Button>
                  </>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            <span>{appointment.date}</span>
          </div>
          <div className="flex items-center">
            <ClockIcon className="h-4 w-4 mr-2" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center col-span-2">
            <MapPinIcon className="h-4 w-4 mr-2" />
            <span>{appointment.location}</span>
          </div>
        </div>
        <div className="mt-4">
          <Badge
            variant={
              appointment.status === "upcoming" ? "default" : "secondary"
            }
          >
            {appointment.status === "upcoming" ? "Upcoming" : "Completed"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Tabs defaultValue="upcoming" className="container m-4 w-full">
      <TabsList className="grid w-full grid-cols-2 mb-4">
        <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
        <TabsTrigger value="past">Past</TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="space-y-4">
        {upcomingAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>
      <TabsContent value="past" className="space-y-4">
        {pastAppointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
