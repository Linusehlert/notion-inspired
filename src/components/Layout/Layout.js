//components
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="relative box-border flex h-screen w-screen flex-1 cursor-text bg-white">
      <Sidebar />
      <Outlet />
    </div>
  );
}
