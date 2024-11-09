import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const doctors = [
  {
    id: 1,
    name: "Dr. Jane Smith",
    specialty: "Cardiologist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Today",
  },
  {
    id: 2,
    name: "Dr. John Doe",
    specialty: "Pediatrician",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Tomorrow",
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    specialty: "Dermatologist",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: In 2 days",
  },
  {
    id: 4,
    name: "Dr. Michael Lee",
    specialty: "Orthopedic Surgeon",
    image: "/placeholder.svg?height=100&width=100",
    availability: "Next available: Next week",
  },
];

export default function DoctorList() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback>
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{doctor.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {doctor.specialty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                {doctor.availability}
              </p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button className="w-full">Book Appointment</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
