import React from "react";
import { Toaster } from "@/components/ui/toaster";

interface RootLayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: RootLayoutProps) {
  return (
    <div>
      {children}
      <Toaster />
    </div>
  );
}

export default Layout;
