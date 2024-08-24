import { Outlet } from "react-router-dom";
import Layout from "./default";
import { NavBar } from "../components";

const AppLayout = () => {
  return (
    <Layout.Root
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr",
          md: "1fr",
        },
      }}
    >
      <Layout.Header>
        <NavBar />
      </Layout.Header>
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      {/* <Footer /> */}
    </Layout.Root>
  );
};

export default AppLayout;
