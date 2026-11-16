import { Outlet } from "react-router";
import Header from "../components/Header";

export default function Layout() {
  return (
    <>
      <Header />
      <div className="container-xxl py-3 px-3 px-md-4">
        <Outlet />
      </div>
    </>
  );
}
