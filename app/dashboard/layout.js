import React from "react";
import SideBar from "./_components/SideBar";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="hidden md:block md:w-64 h-screen fixed top-0 left-0 z-30">
        <SideBar />
      </div>
      <div className="md:ml-64 min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
