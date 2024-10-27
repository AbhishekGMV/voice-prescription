import { DataTable } from "../../components/doctor/DataTable";
import { columns } from "../../components/doctor/TableColumns";
import api from "@/api";
import { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctor.store";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState<[] | null>(null);
  const { user } = useDoctorStore();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await api.get(`/consultation/doctor/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          id: user.id,
        },
      });
      setConsultations(data.data);
    })();
  }, [user]);

  return (
    <div>
      <div className="container mx-auto py-10">
        {consultations === null ? (
          <div className="h-full w-full flex justify-center items-center ">
            <LoadingSpinner />
          </div>
        ) : consultations.length > 0 ? (
          <DataTable columns={columns} data={consultations} />
        ) : (
          <h3>No consultations found</h3>
        )}
      </div>
    </div>
  );
}
