import logo from "../../assets/logo.jpeg";
import rxLogo from "../../assets/prescription-logo.png";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "../../components/ui/separator";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { Alert } from "../../components/ui/alert";
import { ArrowLeft, LoaderCircleIcon, MicIcon, MicOffIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "@/api";
import { DoctorAppointment } from "@/store/appointment.doctor.store";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
];

function ProcessPrescription() {
  const navigate = useNavigate();
  const [toggleMic, setToggleMic] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const [appointment, setAppointment] = useState<DoctorAppointment | null>(
    null
  );
  const { id: appointmentId } = useParams();

  useEffect(() => {
    if (
      (typeof window !== "undefined" && "SpeechRecognition" in window) ||
      "webkitSpeechRecognition" in window
    ) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        console.log(transcript);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    setToggleMic(!toggleMic);
    if (!recognitionRef.current) {
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  useEffect(() => {
    if (!appointmentId) navigate("/doctor/dashboard");
    (async () => {
      const { data: appointmentData } = await api.get(
        `/appointment/${appointmentId}`
      );
      console.log(appointmentData.data);
      setAppointment(appointmentData.data);
    })();
  }, []);

  function today() {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(new Date());
  }

  if (!appointment) {
    return <LoaderCircleIcon />;
  }
  return (
    <>
      <div className="container bg-white shadow-xl m-auto">
        <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="doctor flex justify-between">
          <div>
            <h4 className="my-2 text-2xl text-blue-900 font-bold">
              Dr. {appointment.doctor.name}
            </h4>
            <div className="text-blue-800 font-bold">
              {appointment.doctor.specialization}
            </div>
            <div className="text-blue-600">{appointment.doctor.phone}</div>
          </div>
          <div>
            <img className="h-[100px] w-[200px]" src={logo} alt="logo" />
          </div>
        </div>
        <div className="patient flex my-4 justify-between">
          <div>
            <div>Patient: {appointment.patient.name}</div>
            <div>Age: {appointment.patient.age}</div>
            <div>Phone: {appointment.patient.phone}</div>
          </div>
          <div className="text-lg">Date: {today()}</div>
          <Button
            variant={toggleMic ? "destructive" : "default"}
            onClick={() => {
              toggleListening();
            }}
            className="relative z-10 overflow-hidden"
          >
            {toggleMic ? (
              <>
                <MicIcon />
                Stop listening{" "}
              </>
            ) : (
              <>
                <MicOffIcon /> Start listening
              </>
            )}
            <div
              className="absolute inset-0 bg-white opacity-50 rounded animate-slide"
              style={{ zIndex: 0 }}
            ></div>
          </Button>
        </div>
        <div>
          <Alert>Diagnosis: Fever</Alert>
        </div>
        <Table className="prescription-table my-4">
          <TableHeader>
            <TableRow>
              <TableHead>
                <img className="w-[50px]" src={rxLogo} alt="" />
              </TableHead>
              <TableHead>Frequency</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="">Quantity</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium">{invoice.invoice}</TableCell>
                <TableCell>{invoice.paymentStatus}</TableCell>
                <TableCell>{invoice.paymentMethod}</TableCell>
                <TableCell className="">{invoice.totalAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Separator className="my-4" />
        <AudioCommandInputFields />
        <div className="flex justify-between">
          <Button className="m-2">Add advice</Button>
          <div>
            <Button className="m-2 bg-blue-700">Sign</Button>
            <Button className="m-2 bg-green-700">Save</Button>
          </div>
        </div>
      </div>
    </>
  );
}

const AudioCommandInputFields = () => {
  const fields = [
    {
      label: "Diagnosis",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Medicine",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Frequency",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Duration",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
    {
      label: "Dosage",
      placeholder: "Ex: Fever",
      value: "",
      onChange: () => {},
      onMouseEnter: () => {},
      onMouseLeave: () => {},
    },
  ];
  return (
    <>
      {fields.map((field) => {
        return (
          <div className="m-2">
            <Label>{field.label}</Label>
            <Input
              className="w-[30%] border-slate-400"
              onChange={field.onChange}
              onMouseEnter={field.onMouseEnter}
              onMouseLeave={field.onMouseLeave}
            />
          </div>
        );
      })}
    </>
  );
};

export default ProcessPrescription;
