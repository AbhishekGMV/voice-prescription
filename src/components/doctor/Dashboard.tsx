import { MainNav } from "./MainNav";
import { UserNav } from "../common/UserNav";
import { DataTable } from "./DataTable";
import { columns } from "./TableColumns";
import api from "@/api";
import { useEffect, useState } from "react";
import { useDoctorStore } from "@/store/doctor.store";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState([]);
  const { user } = useDoctorStore();

  const fetchData = async (token: string) => {
    if (!user) return;

    const { data } = await api.get(`/consultation/doctor/${user.id}`, {
      headers: {
        Authorization: token,
      },
    });
    setConsultations(data.data);
  };

  useEffect(() => {
    if (!user) return;

    fetchData(user.token);
  }, [user]);

  return (
    <div>
      <div className="m-6 flex justify-between">
        <MainNav className="mx-6" />
        <UserNav />
      </div>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={consultations} />
      </div>
    </div>
  );
}
