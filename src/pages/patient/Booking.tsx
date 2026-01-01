import { useEffect, useState } from "react";
import { format, addDays } from "date-fns";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePatientStore } from "@/store/patient.store";
import api from "@/api";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { usePatientAppointmentStore } from "@/store/appointment.patient.store";

export default function Booking() {
  const { user } = usePatientStore();
  const appointmentStore = usePatientAppointmentStore();
  const { state } = useLocation();
  const navigate = useNavigate();
  const doctor = state.doctor;
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [availableSlots, setAvailableSlots] = useState<Slot[]>([]);

  interface Slot {
    startTime: string;
    endTime: string;
  }

  useEffect(() => {
    (async () => {
      if (!user || !doctor) return;
      try {
        const { data: response } = await api.get(
          `/doctor/${doctor.id}/slots?date=${moment(selectedDate).format("YYYY-MM-DD")}`
        );
        setAvailableSlots(response.data.slots);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [user, selectedDate]);

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = async () => {
    appointmentStore.setLoading(true);
    if (!user || !doctor || !selectedSlot) {
      return;
    }
    const { data: result } = await api.post("/appointment/book", {
      doctorId: doctor.id,
      startTime: selectedSlot.startTime,
      endTime: selectedSlot.endTime,
    });
    if (result.status === "success") {
      toast({
        title: "Booking confirmed!",
        description: "Doctor details will appear on your dashboard",
        variant: "success",
      });
      navigate("/patient/appointment");
    }
    appointmentStore.setLoading(false);
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/placeholder.svg?height=60&width=60"
                alt={`Dr. ${doctor.name}`}
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                Book an Appointment with Dr. {doctor.name}
              </CardTitle>
              <CardDescription>{doctor.role}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Select a Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border shadow"
              disabled={(date) => date > addDays(new Date(), 30)}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold">
              {selectedDate ? (
                <>Available slots for {format(selectedDate, "MMMM d, yyyy")}</>
              ) : (
                "Please select a date"
              )}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {availableSlots.map((slot: Slot) => (
                <Button
                  key={slot.startTime}
                  // variant={selectedSlot?.id === slot.id ? "default" : "outline"}
                  // className={cn(
                  //   "justify-start",
                  //   selectedSlot?.id === slot.id &&
                  //     "bg-primary text-primary-foreground"
                  // )}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {moment(slot.startTime).utc().format("hh:mm A")}
                </Button>
              ))}
            </div>
            {availableSlots.length === 0 && selectedDate && (
              <p className="text-center text-muted-foreground mt-4">
                No available slots for this date
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            {selectedDate && selectedSlot && (
              <>
                Selected: {format(selectedDate, "MMMM d, yyyy")} at{" "}
                {moment(selectedSlot.startTime).utc().format("hh:mm A")}
              </>
            )}
          </div>
          <Button
            disabled={!selectedDate || !selectedSlot}
            onClick={handleBooking}
          >
            {appointmentStore.loading ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
