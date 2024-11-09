"use client";

import { useState } from "react";
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

const generateAvailableSlots = () => {
  const slots: { [key: string]: string[] } = {};
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = addDays(today, i);
    const dateString = format(date, "yyyy-MM-dd");
    slots[dateString] = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
    ];
  }
  return slots;
};

const availableSlots = generateAvailableSlots();

export default function Booking() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  const getAvailableSlots = (date: Date | undefined) => {
    if (!date) return [];
    const dateString = format(date, "yyyy-MM-dd");
    return availableSlots[dateString] || [];
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="space-y-1">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16">
              <AvatarImage
                src="/placeholder.svg?height=60&width=60"
                alt="Dr. Jane Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">
                Book an Appointment with Dr. Jane Smith
              </CardTitle>
              <CardDescription>Cardiologist • Central Hospital</CardDescription>
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
              disabled={(date) =>
                date < new Date() || date > addDays(new Date(), 30)
              }
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
              {getAvailableSlots(selectedDate).map((slot) => (
                <Button
                  key={slot}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  className={cn(
                    "justify-start",
                    selectedSlot === slot &&
                      "bg-primary text-primary-foreground"
                  )}
                  onClick={() => handleSlotSelect(slot)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  {slot}
                </Button>
              ))}
            </div>
            {getAvailableSlots(selectedDate).length === 0 && selectedDate && (
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
                {selectedSlot}
              </>
            )}
          </div>
          <Button
            disabled={!selectedDate || !selectedSlot}
            onClick={() =>
              alert(
                `Appointment booked for ${format(selectedDate!, "MMMM d, yyyy")} at ${selectedSlot}`
              )
            }
          >
            Confirm Booking
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
