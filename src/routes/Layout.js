import { Stack } from "@mui/material";
import { Fragment } from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Sidebar from "../components/Sidebar/Sidebar";
import ConnectSocket from "../socket/ConnectSocket";

const Layout = () => {
  return (
    <Stack direction='row' sx={{ minWidth: { xs: 300, md: 600 } }}>
      <ConnectSocket>
        <Sidebar />
        <PageWrapper />
      </ConnectSocket>
    </Stack>
  )
};

export default Layout;