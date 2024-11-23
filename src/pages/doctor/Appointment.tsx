import { useEffect, useState } from "react";
import { addDays, format, startOfWeek, isSameDay } from "date-fns";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "@/api";
import { useDoctorStore } from "@/store/doctor.store";
import moment from "moment";
import { DoctorAppointment } from "@/store/appointment.doctor.store";

type Appointment = {
  id: number;
  patientName: string;
  time: string;
  duration: string;
  type: string;
};

export default function DoctorAppointments() {
  const { user } = useDoctorStore();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const navigate = useNavigate();

  const startDate = startOfWeek(currentDate);
  const endDate = addDays(startDate, 6);

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

  useEffect(() => {
    (async () => {
      const { data: result } = await api.get(
        `/appointment/doctor/${user?.id}?date=${moment(selectedDate).format("YYYY/MM/DD")}`,
        { headers: { Authorization: `Bearer ${user?.token}`, id: user?.id } }
      );
      const data = result.data.map((appointment: DoctorAppointment) => {
        return {
          id: appointment.id,
          patientName: appointment.patient.name,
          time: moment(appointment.slot.startTime).format("HH:mm A"),
          duration: "30 min",
          type: "check-up",
        };
      });
      setAppointments(data);
    })();
  }, [selectedDate]);

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

  return (
    <div className="container mx-auto p-4">
      <Button variant="ghost" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      <h1 className="text-2xl font-bold mb-4">Doctor&apos;s Appointments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl font-bold">
              Week of {format(startDate, "MMMM d, yyyy")}
            </CardTitle>
            <div className="flex justify-between items-center mt-2">
              <Button variant="outline" size="sm" onClick={handlePrevWeek}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Previous Week
              </Button>
              <span className="text-sm font-medium">
                {format(startDate, "MMM d")} - {format(endDate, "MMM d, yyyy")}
              </span>
              <Button variant="outline" size="sm" onClick={handleNextWeek}>
                Next Week
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-7 gap-4">
              {weekDays.map((day) => (
                <Button
                  key={day.toString()}
                  variant={isSameDay(day, selectedDate) ? "default" : "outline"}
                  className={`w-full h-16 flex flex-col items-center justify-center ${
                    isSameDay(day, selectedDate)
                      ? "bg-primary text-primary-foreground"
                      : ""
                  }`}
                  onClick={() => setSelectedDate(day)}
                >
                  <div className="text-xs font-medium">
                    {format(day, "EEE")}
                  </div>
                  <div className="text-lg font-bold">{format(day, "d")}</div>
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <h3 className="font-semibold mb-2">
                Appointments for {format(selectedDate, "MMMM d, yyyy")}
              </h3>
              <div className="space-y-2">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedAppointment?.id === appointment.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedAppointment(appointment)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage
                          src={`https://api.dicebear.com/6.x/initials/svg?seed=${appointment.patientName}`}
                          alt={appointment.patientName}
                        />
                        <AvatarFallback>
                          {appointment.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {appointment.patientName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {appointment.time}
                        </div>
                      </div>
                    </div>
                    <Badge>{appointment.type}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-bold">
              Appointment Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedAppointment ? (
              <div className="space-y-4">
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage
                      src={`https://api.dicebear.com/6.x/initials/svg?seed=${selectedAppointment.patientName}`}
                      alt={selectedAppointment.patientName}
                    />
                    <AvatarFallback>
                      {selectedAppointment.patientName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {selectedAppointment.patientName}
                    </h3>
                    <p className="text-sm opacity-70">
                      <Clock className="inline mr-2 h-4 w-4" />
                      {selectedAppointment.time} ({selectedAppointment.duration}
                      )
                    </p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">
                    Type: {selectedAppointment.type}
                  </p>
                </div>
                <Button
                  className="w-full"
                  onClick={() => navigate("/doctor/prescription")}
                >
                  Start Consultation
                </Button>
              </div>
            ) : (
              <p className="text-center opacity-70">
                Select an appointment to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
