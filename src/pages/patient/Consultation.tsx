import { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  Volume2,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for consultations
const consultations = [
  {
    id: 1,
    doctorName: "Dr. John Doe",
    doctorAvatar: "/placeholder.svg?height=40&width=40",
    specialty: "Cardiologist",
    date: new Date(2023, 4, 15, 10, 30),
    duration: 30,
    type: "Video Call",
    diagnosis: "Mild hypertension",
    prescription: "Lisinopril 10mg daily",
    notes:
      "Patient reported occasional chest pain. Recommended lifestyle changes and follow-up in 3 months.",
  },
  {
    id: 2,
    doctorName: "Dr. Jane Smith",
    doctorAvatar: "/placeholder.svg?height=40&width=40",
    specialty: "Dermatologist",
    date: new Date(2023, 4, 20, 14, 0),
    duration: 45,
    type: "In-person",
    diagnosis: "Eczema",
    prescription: "Hydrocortisone cream 1%, apply twice daily",
    notes:
      "Skin patch test performed. Advised to avoid known allergens and maintain skin moisture.",
  },
  {
    id: 3,
    doctorName: "Dr. Mike Johnson",
    doctorAvatar: "/placeholder.svg?height=40&width=40",
    specialty: "Pediatrician",
    date: new Date(2023, 4, 25, 11, 15),
    duration: 20,
    type: "Phone Call",
    diagnosis: "Common cold",
    prescription: "Rest and increased fluid intake",
    notes:
      "Child showing typical cold symptoms. No signs of severe illness. Follow up if symptoms worsen.",
  },
];

export default function PatientConsultation() {
  const [currentPage, setCurrentPage] = useState(1);
  const [speaking, setSpeaking] = useState(false);
  const [currentUtterance, setCurrentUtterance] =
    useState<SpeechSynthesisUtterance | null>(null);
  const consultationsPerPage = 5;
  const totalPages = Math.ceil(consultations.length / consultationsPerPage);

  const indexOfLastConsultation = currentPage * consultationsPerPage;
  const indexOfFirstConsultation =
    indexOfLastConsultation - consultationsPerPage;
  const currentConsultations = consultations.slice(
    indexOfFirstConsultation,
    indexOfLastConsultation
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  useEffect(() => {
    return () => {
      if (currentUtterance) {
        speechSynthesis.cancel();
      }
    };
  }, [currentUtterance]);

  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      if (speaking) {
        speechSynthesis.cancel();
        setSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      setCurrentUtterance(utterance);

      utterance.onend = () => {
        setSpeaking(false);
      };

      speechSynthesis.speak(utterance);
      setSpeaking(true);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Consultation History</h1>
      <div className="space-y-4 mb-6">
        {currentConsultations.map((consultation) => (
          <Card key={consultation.id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarImage
                      src={consultation.doctorAvatar}
                      alt={consultation.doctorName}
                    />
                    <AvatarFallback>
                      {consultation.doctorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {consultation.doctorName}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {consultation.specialty}
                    </p>
                  </div>
                </div>
                <Badge variant="secondary">{consultation.type}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{format(consultation.date, "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>
                    {format(consultation.date, "h:mm a")} (
                    {consultation.duration} minutes)
                  </span>
                </div>
              </div>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="details">
                  <AccordionTrigger>Consultation Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">Diagnosis</h3>
                          <p>{consultation.diagnosis}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">Prescription</h3>
                          <p>{consultation.prescription}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <FileText className="h-5 w-5 mr-2 mt-0.5 text-muted-foreground" />
                        <div>
                          <h3 className="font-semibold">Notes</h3>
                          <p>{consultation.notes}</p>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4"
                      onClick={() =>
                        speakText(
                          `Consultation details for ${consultation.doctorName}. Diagnosis: ${consultation.diagnosis}. Prescription: ${consultation.prescription}. Notes: ${consultation.notes}`
                        )
                      }
                    >
                      {speaking ? (
                        <Pause className="h-4 w-4 mr-2" />
                      ) : (
                        <Volume2 className="h-4 w-4 mr-2" />
                      )}
                      {speaking ? "Stop" : "Play"} Audio
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <Button
          onClick={prevPage}
          disabled={currentPage === 1}
          variant="outline"
          className="flex items-center"
        >
          <ChevronLeft className="mr-2 h-4 w-4" /> Previous
        </Button>
        <span className="text-muted-foreground">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          variant="outline"
          className="flex items-center"
        >
          Next <ChevronRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
