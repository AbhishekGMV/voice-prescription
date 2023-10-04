import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import EventIcon from "@mui/icons-material/Event";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Sidebar() {
  const isDashboardSelected = location.pathname === "/doctor/dashboard";
  const isAppointmentsSelected = location.pathname === "/doctor/appointments";
  const isDoctorsSelected = location.pathname === "/doctor/doctors";

  const items = [
    {
      icon: <HomeIcon className="mr-2" />,
      text: "Dashboard",
      path: "/doctor/dashboard",
      isSelected: isDashboardSelected,
    },
    {
      icon: <EventIcon className="mr-2" />,
      text: "Appointments",
      path: "/doctor/appointments",
      isSelected: isAppointmentsSelected,
    },
    {
      icon: <LocalHospitalIcon className="mr-2" />,
      text: "Add patient",
      path: "/doctor/add-patient",
      isSelected: isDoctorsSelected,
    },
  ];

  return (
    <Drawer open variant="persistent">
      <List>
        {items.map((item, index) => (
          <ListItem key={index}>
            <Link to={item.path}>
              <ListItemButton selected={item.isSelected}>
                {item.icon}
                <ListItemText primary={item.text} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
