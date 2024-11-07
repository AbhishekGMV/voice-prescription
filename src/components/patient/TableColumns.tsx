import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDownload,
  faPause,
  faStopCircle,
  faPlayCircle,
  faStepForward,
} from "@fortawesome/free-solid-svg-icons";

export type Consultation = {
  doctor: string;
  datetime: string;
  pdfUrl: string;
  audio: string;
};

const playPrescriptionAudio = (prescriptionData: string) => {
  const msg = new SpeechSynthesisUtterance();
  msg.voice = speechSynthesis
    .getVoices()
    .filter((voice) => voice.name === "Nicky")[0];
  msg.volume = 1;
  msg.rate = 0.9;
  msg.pitch = 1.1;
  msg.text = prescriptionData;
  msg.lang = "en-US";
  speechSynthesis.speak(msg);
};

const audioControls = [
  {
    icon: faPlayCircle,
    handleClick: playPrescriptionAudio,
    variant: "bg-sky-700",
    hover: "bg-sky-800",
  },
  {
    icon: faPause,
    handleClick: () => speechSynthesis.pause(),
    variant: "bg-yellow-700",
    hover: "bg-yellow-800",
  },
  {
    icon: faStepForward,
    handleClick: () => speechSynthesis.resume(),
    variant: "bg-slate-700",
    hover: "bg-slate-800",
  },
  {
    icon: faStopCircle,
    handleClick: () => speechSynthesis.cancel(),
    variant: "bg-red-700",
    hover: "bg-red-800",
  },
];

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "doctor.name",
    header: "Doctor",
  },
  {
    accessorKey: "doctor.role",
    header: "Consultation",
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
    accessorKey: "prescriptionUrl",
    header: "Download",
    cell: (params) => (
      <Button
        onClick={() => window.open(params.getValue() as string, "_blank")}
        className="size-8 bg-green-700 hover:bg-green-800"
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    ),
  },
  {
    accessorKey: "prescriptionContent",
    header: "Audio",
    cell: (params) =>
      audioControls.map(({ icon, handleClick, variant, hover }, idx) => {
        return (
          <Button
            onClick={() => handleClick(params.getValue() as string)}
            key={idx}
            className={`size-8 m-2 ${variant} hover:${hover}`}
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        );
      }),
  },
];
