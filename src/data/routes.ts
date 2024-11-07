export const patientRoutes: Route[] = [
  {
    path: "/patient/dashboard",
    section: "Dashboard",
    className: "text-sm font-medium transition-colors hover:text-primary",
  },
  {
    path: "/patient/appointment",
    section: "Appointment",
    className: "text-sm font-medium transition-colors hover:text-primary",
  },
];

export const doctorRoutes: Route[] = [
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
  {
    path: "/doctor/schedule",
    section: "Schedule",
    className: "text-sm font-medium transition-colors hover:text-primary",
  },
];

export const routes = {
  doctor: doctorRoutes,
  patient: patientRoutes,
};

export type Route = {
  path: string;
  section: string;
  className: string;
};
