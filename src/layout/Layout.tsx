import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="h-screen flex flex-col justify-between">
      <div className="mb-auto">
        <Outlet />
      </div>
    </div>
  );
}
