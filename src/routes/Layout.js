import { Fragment } from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <div className="container-fluid d-flex p-0 m-0">
      <Sidebar />
      <PageWrapper />
    </div>
  )
};

export default Layout;