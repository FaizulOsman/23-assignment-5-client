import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      <div className="mb-auto">
        <Outlet />
      </div>
    </div>
  );
}
