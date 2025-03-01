import { Outlet } from "react-router-dom";

import Header from "./Header";

const Layout = () => {
  return (
    <>
      <div className="lg:container px-5 mt-5">
        <Header />
        <main className="mt-5">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default Layout;
