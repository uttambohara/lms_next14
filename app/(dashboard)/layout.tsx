import React from "react";
import Header from "./_components/header/header";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid h-screen grid-rows-[70px_1fr] lg:grid-cols-[220px_1fr]">
      <Sidebar />

      <Header />

      <main className="overflow-y-scroll ">{children}</main>
    </div>
  );
}
