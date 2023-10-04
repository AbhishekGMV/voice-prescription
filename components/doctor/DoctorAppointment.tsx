import { UserButton, useUser } from "@clerk/clerk-react";
import { AppBar, Toolbar } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../common/Sidebar";
import api from "../../api";

const columns: GridColDef[] = [
  { field: "id", headerName: "Appointment No", width: 70 },
  { field: "patient_name", headerName: "Patient", width: 130 },
  {
    field: "role",
    headerName: "Visit Type",
    width: 90,
  },
  {
    field: "booking_time",
    headerName: "Booking Date",
    width: 160,
  },
  { field: "start_time", headerName: "Slot start", width: 130 },
  { field: "end_time", headerName: "Slot end", width: 130 },
  {
    field: "delete",
    headerName: "Delete",
    width: 100,
    renderCell: () => <button onClick={() => {}}>Delete</button>,
  },
];

export default function DoctorAppointment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && !user && !location.state) navigate("/doctor/onboard");

    async function fecthAppointmentData() {
      try {
        const { data } = await api.get("/appointment/doctor");
        console.log(data);
        setAppointments(data);
      } catch (err) {
        console.log(err);
      }
    }
    fecthAppointmentData();
  }, [location.state, navigate, user, isLoaded]);

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, marginLeft: "200px" }}>
        <Sidebar />
        <AppBar position="static">
          <Toolbar>
            <div style={{ flexGrow: 1 }}></div>
            <UserButton />
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: "16px" }}>
          <DataGrid
            rows={appointments}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
