"use client";

import { useState, useRef } from "react";
import { format } from "date-fns";
import {
  Download,
  Play,
  Pause,
  Square,
  Calendar,
  Clock,
  Stethoscope,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface ConsultationRecord {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  doctorAvatar: string;
  date: Date;
  duration: string;
  diagnosis: string;
  prescriptionUrl: string;
  audioUrl: string;
}

const consultationRecords: ConsultationRecord[] = [
  {
    id: "1",
    doctorName: "Dr. Jane Smith",
    doctorSpecialty: "Cardiologist",
    doctorAvatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2023, 6, 15),
    duration: "30 minutes",
    diagnosis: "Hypertension",
    prescriptionUrl: "/sample-prescription.pdf",
    audioUrl: "https://example.com/audio/prescription-1.mp3",
  },
  {
    id: "2",
    doctorName: "Dr. John Doe",
    doctorSpecialty: "Dermatologist",
    doctorAvatar: "/placeholder.svg?height=40&width=40",
    date: new Date(2023, 6, 10),
    duration: "45 minutes",
    diagnosis: "Eczema",
    prescriptionUrl: "/sample-prescription.pdf",
    audioUrl: "https://example.com/audio/prescription-2.mp3",
  },
];

export default function Consultation() {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const audioRefs = useRef<{ [key: string]: HTMLAudioElement | null }>({});

  const handlePlay = (id: string) => {
    if (playingAudio && playingAudio !== id) {
      audioRefs.current[playingAudio]?.pause();
    }
    audioRefs.current[id]?.play();
    setPlayingAudio(id);
  };

  const handlePause = (id: string) => {
    audioRefs.current[id]?.pause();
    setPlayingAudio(null);
  };

  const handleStop = (id: string) => {
    if (audioRefs.current[id]) {
      audioRefs.current[id]!.pause();
      audioRefs.current[id]!.currentTime = 0;
    }
    setPlayingAudio(null);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Your Consultation Records</h1>
      <div className="space-y-6">
        {consultationRecords.map((record) => (
          <Card key={record.id} className="w-full">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={record.doctorAvatar}
                      alt={record.doctorName}
                    />
                    <AvatarFallback>
                      {record.doctorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>{record.doctorName}</CardTitle>
                    <Badge variant="secondary">{record.doctorSpecialty}</Badge>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(record.prescriptionUrl, "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Prescription
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(record.date, "MMMM d, yyyy")}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{record.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Stethoscope className="h-4 w-4 text-muted-foreground" />
                  <span>Diagnosis: {record.diagnosis}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-semibold">Prescription Audio</div>
                <audio
                  ref={(el) => (audioRefs.current[record.id] = el)}
                  src={record.audioUrl}
                />
                <div className="flex items-center space-x-2">
                  {playingAudio === record.id ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePause(record.id)}
                    >
                      <Pause className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePlay(record.id)}
                    >
                      <Play className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleStop(record.id)}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                  <Slider
                    className="w-full"
                    onValueChange={(value) => {
                      if (audioRefs.current[record.id]) {
                        audioRefs.current[record.id]!.currentTime =
                          (value[0] / 100) *
                          audioRefs.current[record.id]!.duration;
                      }
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
