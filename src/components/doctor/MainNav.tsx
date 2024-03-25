import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const location = useLocation();
  const routes = [
    {
      path: "/doctor/dashboard",
      section: "Dashboard",
      className: "text-sm font-medium transition-colors hover:text-primary",
    },
    {
      path: "/doctor/appointment",
      section: "Appointment",
      className: "text-sm font-medium transition-colors hover:text-primary",
    },
  ];
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      {routes.map((route, idx) => (
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
