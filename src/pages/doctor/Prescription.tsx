import logo from "../../assets/logo.jpeg";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert";
import {
  ArrowLeft,
  LoaderCircleIcon,
  MicIcon,
  MicOffIcon,
  PlusIcon,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "@/api";
import { DoctorAppointment } from "@/store/appointment.doctor.store";

/* ---------------- Types ---------------- */

type PrescriptionRow = {
  id: string;
  medicine: string;
  frequency: string;
  duration: string;
  quantity: string;
};

const VOICE_FIELDS = ["frequency", "duration", "quantity"] as const;
type VoiceField = (typeof VOICE_FIELDS)[number];

/* ---------------- Component ---------------- */

function ProcessPrescription() {
  const navigate = useNavigate();
  const { id: appointmentId } = useParams();

  const [appointment, setAppointment] = useState<DoctorAppointment | null>(
    null
  );

  const [rows, setRows] = useState<PrescriptionRow[]>([]);
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [activeFieldIndex, setActiveFieldIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);

  const recognitionRef = useRef<SpeechRecognition | null>(null);

  /* ---------------- Fetch appointment ---------------- */

  useEffect(() => {
    if (!appointmentId) {
      navigate("/doctor/dashboard");
      return;
    }

    (async () => {
      const { data } = await api.get(`/appointment/${appointmentId}`);
      setAppointment(data.data);
    })();
  }, [appointmentId, navigate]);

  /* ---------------- Speech Recognition ---------------- */

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        if (!activeRowId) return;

        const transcript = event.results[0][0].transcript;
        const field: VoiceField = VOICE_FIELDS[activeFieldIndex];

        setRows((prev) =>
          prev.map((row) =>
            row.id === activeRowId ? { ...row, [field]: transcript } : row
          )
        );

        // Move to next field
        if (activeFieldIndex < VOICE_FIELDS.length - 1) {
          setActiveFieldIndex((i) => i + 1);
        } else {
          stopListening();
        }
      };

      recognition.onend = () => {
        if (isListening && activeRowId) {
          try {
            recognition.start();
          } catch {}
        }
      };

      recognitionRef.current = recognition;
    }

    return () => recognitionRef.current?.stop();
  }, [activeRowId, activeFieldIndex, isListening]);

  /* ---------------- Voice Controls ---------------- */

  const startRowDictation = (rowId: string) => {
    if (!recognitionRef.current) return;

    try {
      recognitionRef.current.stop();
      setActiveRowId(rowId);
      setActiveFieldIndex(0);
      setIsListening(true);
      recognitionRef.current.start();
    } catch {}
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
    setActiveRowId(null);
    setActiveFieldIndex(0);
  };

  /* ---------------- Helpers ---------------- */

  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        medicine: "",
        frequency: "",
        duration: "",
        quantity: "",
      },
    ]);
  };

  function today() {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date());
  }

  if (!appointment) {
    return <LoaderCircleIcon className="animate-spin m-auto" />;
  }

  /* ---------------- Render ---------------- */

  return (
    <div className="container bg-white shadow-xl m-auto p-4">
      <Button variant="ghost" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      {/* Doctor */}
      <div className="flex justify-between mt-4">
        <div>
          <h4 className="text-2xl font-bold">Dr. {appointment.doctor.name}</h4>
          <div className="text-blue-700">
            {appointment.doctor.specialization}
          </div>
          <div className="text-blue-500">{appointment.doctor.phone}</div>
        </div>
        <img className="h-[100px]" src={logo} alt="logo" />
      </div>

      {/* Patient */}
      <div className="flex justify-between mt-6">
        <div>
          <div>Patient: {appointment.patient.name}</div>
          <div>Age: {appointment.patient.age}</div>
          <div>Phone: {appointment.patient.phone}</div>
        </div>
        <div className="text-lg">Date: {today()}</div>
      </div>

      <Alert className="mt-4">Diagnosis</Alert>

      {/* Prescription Table */}
      <Table className="my-4">
        <TableHeader>
          <TableRow>
            <TableHead>Medicine</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <Input
                  value={row.medicine}
                  onChange={(e) =>
                    setRows((prev) =>
                      prev.map((r) =>
                        r.id === row.id ? { ...r, medicine: e.target.value } : r
                      )
                    )
                  }
                />
              </TableCell>

              {VOICE_FIELDS.map((field, idx) => (
                <TableCell key={field}>
                  <Input
                    value={row[field]}
                    className={
                      activeRowId === row.id && activeFieldIndex === idx
                        ? "border-red-500 animate-pulse"
                        : ""
                    }
                    onChange={(e) =>
                      setRows((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, [field]: e.target.value }
                            : r
                        )
                      )
                    }
                  />
                </TableCell>
              ))}

              <TableCell>
                <Button
                  size="icon"
                  variant={activeRowId === row.id ? "destructive" : "ghost"}
                  onClick={() =>
                    activeRowId === row.id
                      ? stopListening()
                      : startRowDictation(row.id)
                  }
                >
                  {activeRowId === row.id ? <MicIcon /> : <MicOffIcon />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button onClick={addRow} variant="outline">
        <PlusIcon className="mr-2 h-4 w-4" />
        Add Row
      </Button>

      <Separator className="my-6" />

      <div className="flex justify-end gap-2">
        <Button variant="outline">Save</Button>
        <Button className="bg-green-700">Submit</Button>
      </div>
    </div>
  );
}

export default ProcessPrescription;
