import { Outlet } from "react-router-dom";
import { Navbar } from "./navbar";

export const Layout: React.FC = () => {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
