import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

export type Appointment = {
  patientName: string;
  datetime: string;
  pdfUrl: string;
  audio: string;
};


export const appointmentColumns: ColumnDef<Appointment>[] = [
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
    )
  },
];
