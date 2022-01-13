import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const login_container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.2,
    },
  },
};

const login_content = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <motion.div
      className="login_container"
      variants={login_container}
      initial="hidden"
      animate="visible"
    >
      {loading ? (
        <h3> Loading . . . </h3>
      ) : (
        <>
          <motion.div
            key={login_content}
            className="login_content"
            variants={login_content}
          >
            <h1>Login</h1>
            <div className="input_fields--content">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <Link className="reset" to="/reset">
                Forgot Password
              </Link>
            </div>
            <span>
              <button
                className="login-Btn"
                onClick={() => signInWithEmailAndPassword(email, password)}
              >
                Login
              </button>
              <button className="login-google" onClick={signInWithGoogle}>
                <span>
                  <img src="/google.png" alt="" srcset="" /> Login with Google
                </span>
              </button>
            </span>
          </motion.div>
          <div>
            Don't have an account?{" "}
            <Link className="reg-link" to="/register">
              Register
            </Link>{" "}
            now.
          </div>
        </>
      )}
    </motion.div>
  );
};

export default Login;
