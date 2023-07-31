import { useContext } from "react";
import { AuthContext } from "./context/Auth";
import AppRouter from "./routes/AppRouter";
import { CssBaseline, CssVarsProvider, GlobalStyles } from "@mui/joy";
import customTheme from "./theme";

const App = () => {
  const { status } = useContext(AuthContext);

  if (status === "checking")
    return (
      <p className="loading">
        <span>Checking credentials, wait a moment...</span>
      </p>
    );

  return (
    <CssVarsProvider
      defaultMode="dark"
      disableTransitionOnChange
      theme={customTheme}
    >
      <CssBaseline />
      <GlobalStyles
        styles={{
          ":root": {
            "--Collapsed-breakpoint": "769px", // form will stretch when viewport is below `769px`
            "--Cover-width": "40vw", // must be `vw` only
            "--Form-maxWidth": "700px",
            "--Transition-duration": "0.4s", // set to `none` to disable transition
          },
        }}
      />
      <main>
        <AppRouter />
      </main>
    </CssVarsProvider>
  );
};
export default App;
