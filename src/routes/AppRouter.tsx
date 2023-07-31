import { useContext } from "react";
import { AuthContext } from "../context/Auth";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

const AppRouter = () => {
  const { status, userId } = useContext(AuthContext);
  return (
    <>
      {status === "authenticated" && userId ? (
        <PrivateRoutes />
      ) : (
        <PublicRoutes />
      )}
    </>
  );
};

export default AppRouter;

// logo
// <div>
//   <img src="/headphones.png" alt="web icon" />
//   <img src={logo} alt="web logo" />
// </div>

// NavBar
// <NavBar/>
