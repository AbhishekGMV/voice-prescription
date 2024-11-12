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
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "@/api";
import { usePatientStore } from "@/store/patient.store";
import { Doctor } from "@/store/doctor.store";

export default function DoctorList() {
  const navigate = useNavigate();
  const { user } = usePatientStore();
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    (async () => {
      const { data: result } = await api.get("/doctor", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          id: user?.id,
        },
      });
      setDoctors(result.data);
    })();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Book an Appointment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors?.map((doctor) => (
          <Card key={doctor.id} className="flex flex-col">
            <CardHeader className="flex-row gap-4 items-center">
              <Avatar className="w-16 h-16">
                <AvatarImage src={doctor.imageUrl} alt={doctor.name} />
                <AvatarFallback>
                  {doctor && doctor.name
                    ? doctor.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "??"}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{doctor.name}</CardTitle>
                <Badge variant="secondary" className="mt-1">
                  {doctor?.role}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">now</p>
            </CardContent>
            <CardFooter className="mt-auto">
              <Button
                className="w-full"
                onClick={() =>
                  navigate("/book-appointment", { state: { doctor } })
                }
              >
                Book Appointment
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
