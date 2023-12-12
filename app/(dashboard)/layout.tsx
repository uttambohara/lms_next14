import React from "react";
import Header from "./_components/header/header";
import Sidebar from "./_components/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-rows-[70px_1fr] lg:grid-cols-[200px_1fr] h-screen">
      <Sidebar />

      <Header />

      <main className="overflow-y-scroll ">
        <div>{children}</div>
      </main>
    </div>
  );
}
