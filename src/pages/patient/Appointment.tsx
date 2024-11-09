import { useEffect } from "react";
import api from "@/api";
import { appointmentColumns } from "@/components/appointment/DoctorAppointmentColumns";
import { DataTable } from "@/components/doctor/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useDoctorAppointmentStore } from "@/store/appointment.store";
import { usePatientStore } from "@/store/patient.store";
import { BookAppointmentDialogue } from "@/components/patient/BookAppointmentDialogue";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DoctorList from "../doctor/DoctorList";

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
        <Tabs defaultValue="book" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="book">Book appointment</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          </TabsList>

          <TabsContent value="book">
            <DoctorList />
          </TabsContent>
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
        </Tabs>
      </div>
    </div>
  );
}
