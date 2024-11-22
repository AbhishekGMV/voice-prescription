import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { DoctorAppointment } from "@/store/appointment.doctor.store";

export const appointmentColumns: ColumnDef<DoctorAppointment>[] = [
  {
    accessorKey: "slot.startDate",
    header: "Date",
    cell: (params) => {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(params.row.original.slot.startTime));

      return date;
    },
  },
  {
    accessorKey: "patient.name",
    header: "Patient",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "slot.startTime",
    header: "Date & time",
    cell: (params) => {
      const date = new Intl.DateTimeFormat("en-US", {
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
