import { Outlet } from "react-router-dom";
import Layout from "./default";
import { NavBar } from "../components";

const AppLayout = () => {
  return (
    <Layout.Root
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "minmax(64px, 200px) minmax(450px, 1fr)",
          md: "minmax(160px, 300px) minmax(600px, 1fr) minmax(300px, 420px)",
        },
        // ...(drawerOpen && {
        height: "100vh",
        // overflow: "hidden",
        // }),
      }}
    >
      <Layout.Header>
        <NavBar />
      </Layout.Header>
      <Layout.SideNav>{/* <Navigation /> */}</Layout.SideNav>
      <Layout.Main>
        <Outlet />
      </Layout.Main>
      {/* <Footer /> */}
    </Layout.Root>
  );
};

export default AppLayout;
