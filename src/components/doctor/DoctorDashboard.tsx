import { UserButton, useClerk, useUser } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function DoctorDashboard() {
  const clerk = useClerk();
  const user = useUser();
  useEffect(() => {
    console.log(clerk?.client?.isNew());
  }, [user]);
  return (
    <div>
      <UserButton />
      Doctor dashboard
    </div>
  );
}
