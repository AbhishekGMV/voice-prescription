import { Route, routes } from "@/data/routes";
import { cn } from "@/lib/utils";
import { Doctor } from "@/store/doctor.store";
import { Patient } from "@/store/patient.store";
import { Link, useLocation } from "react-router-dom";

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
  user: Doctor | Patient | null;
}

export function MainNav({ className, user, ...props }: MainNavProps) {
  console.log(user);
  const location = useLocation();
  if (!user || (user.type !== "doctor" && user.type !== "patient")) {
    return;
  }

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes[user.type].map((route: Route, idx: number) => (
        <Link
          to={route.path}
          key={idx}
          className={`${route.className} ${
            route.path !== location.pathname ? "text-muted-foreground" : ""
          }  `}
        >
          {route.section}
        </Link>
      ))}
    </nav>
  );
}
