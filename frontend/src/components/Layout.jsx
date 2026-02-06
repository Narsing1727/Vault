import { Outlet } from "react-router-dom";

import { SideBar } from "./SideBar";
import { NavBar } from "./NavBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background">
  
      <SideBar/>

      <div className="ml-56 flex min-h-screen flex-col">
      
        <NavBar
          title="Dashboard"
          subtitle="Global account overview"
        />

        <main className="flex-1 px-6 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
