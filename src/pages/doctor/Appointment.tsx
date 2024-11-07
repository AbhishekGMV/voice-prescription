import { useEffect } from "react";
import { useDoctorStore } from "@/store/doctor.store";
import api from "@/api";
import { appointmentColumns } from "@/components/appointment/DoctorAppointmentColumns";
import { DataTable } from "@/components/doctor/DataTable";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { useDoctorAppointmentStore } from "@/store/appointment.store";

export default function DoctorAppointment() {
  const { user } = useDoctorStore();
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
    <div>
      <div className="container mx-auto py-10">
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
      </div>
    </div>
  );
}
