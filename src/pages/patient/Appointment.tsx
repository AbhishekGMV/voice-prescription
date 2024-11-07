import { useEffect } from "react";
import api from "@/api";
import { appointmentColumns } from "@/components/appointment/DoctorAppointmentColumns";
import { DataTable } from "@/components/doctor/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useDoctorAppointmentStore } from "@/store/appointment.store";
import { usePatientStore } from "@/store/patient.store";
import { BookAppointmentDialogue } from "@/components/patient/BookAppointmentDialogue";
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

export default function PatientAppointment() {
  const { user } = usePatientStore();
  const appointmentStore = useDoctorAppointmentStore();

  useEffect(() => {
    if (!user) return;

    (async () => {
      appointmentStore.setLoading(true);
      const { data } = await api.get(`/appointment/doctor/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          id: user.id,
        },
      });
      appointmentStore.setAppointments(data.data || []);
      appointmentStore.setLoading(false);
    })();
  }, []);
  return (
    <div className="container mx-auto py-10">
      <BookAppointmentDialogue />

      <div>
        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="book">Book appointment</TabsTrigger>
          </TabsList>
          <TabsContent value="upcoming">
            {appointmentStore.appointments === null ? (
              <div className="h-full w-full flex justify-center items-center ">
                <LoadingSpinner />
              </div>
            ) : appointmentStore.appointments.length > 0 &&
              !appointmentStore.loading ? (
              <DataTable
                columns={appointmentColumns}
                data={appointmentStore.appointments}
              />
            ) : (
              <h3>No appointments found</h3>
            )}
          </TabsContent>
          <TabsContent value="book">
            <Card>
              <CardHeader>
                <CardTitle>Book an appointment</CardTitle>
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
      </div>
    </div>
  );
}
