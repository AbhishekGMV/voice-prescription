import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Calendar,
  Clock,
  Menu,
  MoreVertical,
  Phone,
  Video,
  StethoscopeIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import api from "@/api";
import { useDoctorStore } from "@/store/doctor.store";
import moment from "moment";
import { DoctorAppointment } from "@/store/appointment.doctor.store";

type Appointment = {
  id: number;
  patient: string;
  time: string;
  duration: string;
  type: string;
  status: string;
  reason: string;
};

export default function DoctorHomepage() {
  const navigate = useNavigate();
  const { user: doctor } = useDoctorStore();
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (!doctor) return;
    (async () => {
      const { data: result } = await api.get(
        `/appointment/doctor/${doctor.id}`
      );
      const data = result.data.map((appointment: DoctorAppointment) => {
        return {
          id: appointment.id,
          time: moment(appointment.startTime).format("HH:mm A"),
          patient: appointment.patient.name,
          reason: "Follow up",
          status: appointment.status,
          type: "In-person",
        };
      });
      setAppointments(data);
    })();
  }, [doctor]);

  const NavLinks = () => (
    <>
      <Link
        to="#"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        Dashboard
      </Link>
      <Link
        to="/doctor/appointment"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        Appointments
      </Link>
      <Link
        to="/doctor/consultation"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        Consultations
      </Link>
      <Link
        to="/doctor/schedule"
        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        Schedule
      </Link>
    </>
  );

  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "Video":
        return <Video className="h-4 w-4 text-blue-500" />;
      case "Phone":
        return <Phone className="h-4 w-4 text-green-500" />;
      default:
        return <Calendar className="h-4 w-4 text-purple-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Rescheduled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCreatePrescription = () => {
    navigate(`/doctor/prescription`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Avatar className="h-10 w-10 sm:h-12 sm:w-12">
                <AvatarImage
                  src="/placeholder.svg?height=48&width=48"
                  alt={doctor?.name}
                />
                <AvatarFallback>
                  {doctor?.name?.substring(2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  {doctor?.name}
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {doctor?.role}
                </p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-4">
              <NavLinks />
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[240px] sm:w-[300px]">
                <nav className="flex flex-col space-y-4 mt-6">
                  <NavLinks />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4">
            Welcome back, Dr. {doctor?.name}
          </h2>
        </div>

        <section>
          <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Today's Appointments
          </h3>
          <Card>
            <CardHeader>
              <CardTitle>
                You have {appointments.length} appointments today
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px] sm:h-[600px]">
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {appointments.map((appointment: Appointment) => (
                    <li
                      key={appointment.id}
                      className="p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <Avatar className="h-12 w-12 mr-4">
                              <AvatarImage
                                src={`https://api.dicebear.com/6.x/initials/svg?seed=${appointment.patient}`}
                                alt={appointment.patient}
                              />
                              <AvatarFallback>
                                {appointment.patient
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                          <div className="flex-grow min-w-0">
                            <p className="text-sm sm:text-base font-medium text-gray-900 dark:text-white truncate">
                              {appointment.patient}
                            </p>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {appointment.time}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {appointment.reason}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}
                          >
                            {appointment.status}
                          </span>
                          {getAppointmentTypeIcon(appointment.type)}
                          <Button
                            onClick={handleCreatePrescription}
                            variant="default"
                            size="sm"
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                          >
                            <StethoscopeIcon />
                            Start Consultation
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>View Details</DropdownMenuItem>
                              <DropdownMenuItem>Reschedule</DropdownMenuItem>
                              <DropdownMenuItem>
                                Cancel Appointment
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
