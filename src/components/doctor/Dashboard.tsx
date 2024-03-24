import { MainNav } from "./MainNav";
import { UserNav } from "../common/UserNav";
import { DataTable } from "./DataTable";
import { columns } from "./TableColumns";
import api from "@/api";
import { useEffect, useState } from "react";

export default function DoctorDashboard() {
  const [consultations, setConsultations] = useState([]);

  const fetchData = async () => {
    const { data } = await api.get("/consultation");
    setConsultations(data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
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
