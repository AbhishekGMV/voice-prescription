import api from "@/api";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { usePatientStore } from "@/store/patient.store";

export default function PatientDashboard() {
  const [consultations, setConsultations] = useState<[] | null>(null);
  const { user } = usePatientStore();

  useEffect(() => {
    if (!user) return;
    (async () => {
      const { data } = await api.get(`/consultation/patient/${user.id}`, {
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
          // <DataTable columns={columns} data={consultations} />
          <>Data</>
        ) : (
          <h3>No consultations found</h3>
        )}
      </div>
    </div>
  );
}
