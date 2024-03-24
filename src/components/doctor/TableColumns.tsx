import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faDownload,
  faPause,
  faStopCircle,
  faPlayCircle,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export type Consultation = {
  patientName: string;
  datetime: string;
  pdfUrl: string;
  audio: string; 
}

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "patientName",
    header: "Patient",
  },
  {
    accessorKey: "datetime",
    header: "Date & time",
  },
  {
    accessorKey: "pdfView",
    header: "View",
    cell: () => (
      <Button className="size-8 bg-sky-700 hover:bg-sky-800">
        <FontAwesomeIcon icon={faEye} />
      </Button>
    ),
  },
  {
    accessorKey: "pdfDownload",
    header: "Download",
    cell: () => (
      <Button className="size-8 bg-green-700 hover:bg-green-800">
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    ),
  },
  {
    accessorKey: "audio",
    header: "Audio",
    cell: () =>
      [faPlayCircle, faPause, faStepForward, faStopCircle].map((icon) => {
        return (
          <Button className="size-8 m-2">
            <FontAwesomeIcon icon={icon} />
          </Button>
        );
      }),
  },
];
