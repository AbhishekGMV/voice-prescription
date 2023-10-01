import { UserButton } from "@clerk/clerk-react";
import {
  AppBar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 90,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const isDashboardSelected = location.pathname === "/doctor/dashboard";
const isAppointmentsSelected = location.pathname === "/doctor/appointments";
const isDoctorsSelected = location.pathname === "/doctor/doctors";
const isBookAppointmentSelected =
  location.pathname === "/doctor/book-appointment";

const items = [
  {
    icon: <HomeIcon className="mr-2" />,
    text: "Dashboard",
    isSelected: isDashboardSelected,
  },
  {
    icon: <EventIcon className="mr-2" />,
    text: "Appointments",
    isSelected: isAppointmentsSelected,
  },
  {
    icon: <LocalHospitalIcon className="mr-2" />,
    text: "Doctors",
    isSelected: isDoctorsSelected,
  },
  {
    icon: <AddCircleIcon className="mr-2" />,
    text: "Book an appointment",
    isSelected: isBookAppointmentSelected,
  },
];

export default function DoctorDashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) navigate("/doctor/onboard");
  }, [location.state, navigate]);

  return (
    <div style={{ display: "flex" }}>
      <Drawer open variant="persistent">
        <List>
          {items.map((item, index) => (
            <ListItem key={index}>
              <ListItemButton selected={item.isSelected}>
                {item.icon}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div style={{ flexGrow: 1, marginLeft: "250px" }}>
        <AppBar position="static">
          <Toolbar>
            <div style={{ flexGrow: 1 }}></div>
            <UserButton />
          </Toolbar>
        </AppBar>

        <div style={{ marginTop: "16px" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
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
