import { DataTable } from "./DataTable";
import { columns } from "./TableColumns";
import api from "@/api";
import { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctor.store";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState([]);
  const { user } = useDoctorStore();

  useEffect(() => {
    if (!user) return;

    (async () => {
      if (!user) return;

      const { data } = await api.get(`/consultation/doctor/${user.id}`, {
        headers: {
          Authorization: user.token,
        },
      });
      setConsultations(data.data);
    })();
  }, [user]);

  return (
    <div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={consultations} />
      </div>
    </div>
  );
}
