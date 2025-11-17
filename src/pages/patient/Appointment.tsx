import { BookAppointmentDialogue } from "@/components/patient/BookAppointmentDialogue";
import DoctorList from "../doctor/DoctorList";

export default function PatientAppointment() {
  return (
    <div className="container mx-auto py-10">
      <BookAppointmentDialogue />
      <div>
        <DoctorList />
      </div>
    </div>
  );
}
