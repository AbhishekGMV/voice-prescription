import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { DoctorAppointment } from "@/store/appointment.store";

export const appointmentColumns: ColumnDef<DoctorAppointment>[] = [
  {
    accessorKey: "patient.name",
    header: "Patient",
  },
  {
    accessorKey: "slot.slotNumber",
    header: "Slot",
  },
  {
    accessorKey: "createdAt",
    header: "Date & time",
    cell: (params) => {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }).format(new Date(params.getValue() as string));

      return date;
    },
  },
  {
    accessorKey: "",
    header: "Action",
    cell: () => (
      <Link to="/doctor/prescription">
        <Button>Make prescription</Button>
      </Link>
    ),
  },
];
