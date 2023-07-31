import { useContext } from "react";
import {
  Box,
  Input,
  Typography,
  Button,
  Checkbox,
  FormControl,
} from "@mui/joy";
import FormLabel, { formLabelClasses } from "@mui/joy/FormLabel";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { ThemeToggle } from "../components";
import GoogleIcon from "../assets/GoogleIcon";
// import { useForm } from "../hooks/useform";

interface FormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
  persistent: HTMLInputElement;
}
interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

const Login = () => {
  const { handleLoginWithGoogle, handleLoginWithCredentials } =
    useContext(AuthContext);

  const handleSubmit = (e: React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const formElements = e.currentTarget.elements;
    const data = {
      email: formElements.email.value,
      password: formElements.password.value,
      persistent: formElements.persistent.checked,
    };
    // console.log(JSON.stringify(data, null, 2));
    handleLoginWithCredentials(data.password, data.email);
  };

  return (
    <>
      <Box
        sx={(theme) => ({
          width:
            "clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)",
          transition: "width var(--Transition-duration)",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(4px)",
          backgroundColor: "rgba(255 255 255 / 0.6)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100dvh",
            width:
              "clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)",
            maxWidth: "100%",
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{
              py: 3,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              fontWeight="lg"
              mx={2}
              sx={{ color: "var(--primary-color)" }}
              level="h1"
              startDecorator={<img src="./headphones.png" alt="site logo" />}
            >
              Wawe
            </Typography>
            <ThemeToggle />
          </Box>
          <Box
            component="main"
            sx={{
              my: "auto",
              py: 2,
              pb: 5,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
              maxWidth: "100%",
              mx: "auto",
              borderRadius: "sm",
              "& form": {
                display: "flex",
                flexDirection: "column",
                gap: 2,
              },
              [`& .${formLabelClasses.asterisk}`]: {
                visibility: "hidden",
              },
            }}
          >
            <div>
              <Typography component="h1" fontSize="xl2" fontWeight="lg">
                Sign in to your account
              </Typography>
              <Typography level="body2" sx={{ my: 1, mb: 3 }}>
                Welcome back
              </Typography>
            </div>
            <form onSubmit={handleSubmit}>
              <FormControl required>
                <FormLabel>Email</FormLabel>
                <Input type="email" name="email" />
              </FormControl>
              <FormControl required>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" />
              </FormControl>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Checkbox
                  size="sm"
                  label="Remember for 30 days"
                  name="persistent"
                />
                <Typography fontSize="sm" fontWeight="lg" color="primary">
                  <Link to="#" style={{ textDecoration: "none" }}>
                    Forgot your password?
                  </Link>
                </Typography>
              </Box>
              <Button type="submit" fullWidth>
                Sign in
              </Button>
            </form>
            <Button
              onClick={handleLoginWithGoogle}
              variant="outlined"
              color="neutral"
              fullWidth
              startDecorator={<GoogleIcon />}
            >
              Sign in with Google
            </Button>

            <Typography level="body2" sx={{ my: 1, mb: 3 }}>
              do not have an account <Link to="/register">Register</Link> here.
            </Typography>
          </Box>
          <Box component="footer" sx={{ py: 3 }}>
            <Typography level="body3" textAlign="center">
              © Wawe {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={(theme) => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: "clamp(0px, (100vw - var(--Collapsed-breakpoint)) * 999, 100vw - var(--Cover-width))",
          transition:
            "background-image var(--Transition-duration), left var(--Transition-duration) !important",
          transitionDelay: "calc(var(--Transition-duration) + 0.1s)",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1527181152855-fc03fc7949c8?auto=format&w=1000&dpr=2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage:
              "url(https://images.unsplash.com/photo-1572072393749-3ca9c8ea0831?auto=format&w=1000&dpr=2)",
          },
        })}
      />
    </>
  );
};

export default Login;
