import DashboardSidebar from "@/components/DashboardView/common/DashboardSidebar";
import Header from "@/components/DashboardView/common/Header";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout1 = () => {
  const [openSidebar, setOpenSidebar] = useState(false);

  return (
    <div className="flex min-h-screen w-full overflow-y-clip">
      {/* Sidebar */}
      <DashboardSidebar open={openSidebar} setOpen={setOpenSidebar} />

      <div className="flex flex-1 flex-col">
        {/* Header */}
        <Header setOpen={setOpenSidebar} />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout1;
