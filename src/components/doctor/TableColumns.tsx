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
  patientName: string;
  datetime: string;
  pdfUrl: string;
  audio: string;
};

const playPrescriptionAudio = (prescriptionData :string) => {
    const msg = new SpeechSynthesisUtterance();
    msg.voice = speechSynthesis.getVoices()[0];
    msg.volume = 1;
    msg.rate = 0.9;
    msg.pitch = 1;
    msg.text = prescriptionData;
    msg.lang = "en-US";
    speechSynthesis.speak(msg);
  };

export const columns: ColumnDef<Consultation>[] = [
  {
    accessorKey: "patient.name",
    header: "Patient",
  },
  {
    accessorKey: "createdAt",
    header: "Date & time",
  },
  {
    accessorKey: "prescriptionUrl",
    header: "Download",
    cell: (params) => (
      <Button
        onClick={() => window.open((params.getValue() as string), "_blank")}
        className="size-8 bg-green-700 hover:bg-green-800"
      >
        <FontAwesomeIcon icon={faDownload} />
      </Button>
    ),
  },
  {
    accessorKey: "audio",
    header: "Audio",
    cell: (params) =>
      [faPlayCircle, faPause, faStepForward, faStopCircle].map((icon, idx) => {
        return (
          <Button
            onClick={() => playPrescriptionAudio(params.getValue() as string)}
            key={idx}
            className="size-8 m-2"
          >
            <FontAwesomeIcon icon={icon} />
          </Button>
        );
      }),
  },
];
