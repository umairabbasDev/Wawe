import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/config";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) toast.info("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  if (error) {
    toast.error(error);
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);

  return (
    <div className="register_container">
      {loading ? (
        <h3> Loading . . . </h3>
      ) : (
        <div className="register_content">
          <div className="input_fields--content">
            <input
              type="text"
              className="register__textBox"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            />
            <input
              type="text"
              className="register__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
            <input
              type="password"
              className="register__textBox"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="register-btn" onClick={register}>
            Register
          </button>
          <button className="register-google" onClick={signInWithGoogle}>
            <span>
              <img src="/google.png" alt="" srcset="" /> Register with Google
            </span>
          </button>

          <div>
            Already have an account?{" "}
            <Link className="log-link" to="/login">
              Login
            </Link>{" "}
            now.
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
