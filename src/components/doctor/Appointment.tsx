import { useEffect, useState } from "react";
import { DataTable } from "./DataTable";
import { useDoctorStore } from "@/store/doctor.store";
import api from "@/api";
import { appointmentColumns } from "./AppointmentTableColumns";

export default function DoctorAppointment() {

  const [appointments, setAppointments] = useState([]);
  const { user } = useDoctorStore();

  useEffect(() => {
    if (!user) return;

    (async () => {
      const { data } = await api.get(`/appointment/doctor/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setAppointments(data.data);
    })();
  }, [user]);

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={appointmentColumns} data={appointments} />
      </div>
    </div>
  );
}
