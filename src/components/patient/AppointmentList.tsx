import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import api from "@/api";
import { Patient } from "@/store/patient.store";
import { Doctor } from "@/store/doctor.store";

interface Slot {
  startTime: string;
}
interface Appointment {
  id: string;
  doctor: Doctor;
  slot: Slot;
  status: string;
  role: string;
}

export default function AppointmentsList(user: Patient | Doctor | null) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 3;
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstAppointment,
    indexOfLastAppointment,
  );

  useEffect(() => {
    (async () => {
      const { data: result } = await api.get(
        `/appointment/patient/${user?.id}`,
        {
          headers: { Authorization: `Bearer ${user?.token}`, id: user?.id },
        },
      );
      console.log(result.data);
      setAppointments(result.data);
    })();
  }, []);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "confirmed":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Appointments</h1>
      <div className="space-y-4 mb-6">
        {currentAppointments.map((appointment) => (
          <Card key={appointment.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={appointment.doctor.imageUrl}
                      alt={appointment.doctor.name}
                    />
                    <AvatarFallback>
                      {appointment.doctor && appointment.doctor.name
                        ? appointment.doctor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "??"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-semibold">
                      {appointment.doctor.name}
                    </h2>
                    <p className="text-muted-foreground">{appointment.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {format(appointment.slot.startTime, "MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{format(appointment.slot.startTime, "h:mm a")}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(appointment.status)} text-white`}
                  >
                    {appointment.status}
                  </Badge>
                  <Trash2 className="mr-2 h-4 w-4 cursor-pointer" />
                </div>
              </div>
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
