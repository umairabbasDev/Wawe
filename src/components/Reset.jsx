import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { auth, sendPasswordResetEmail } from "../firebase/config";

function Reset() {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  if (error) {
    toast.error(error);
  }
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/login");
  }, [user, loading]);

  return (
    <div className="register_container">
      {loading ? (
        <h3> Loading . . . </h3>
      ) : (
        <div className="register_content">
          <div className="input_fields--content">
            <input
              type="text"
              className="reset__textBox"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            />
              </div>
            <button
              className="register-btn"
              onClick={() => sendPasswordResetEmail(email)}
            >
              Send password reset email
            </button>
          <div>
            Don't have an account? <Link className="log-link" to="/register">Register</Link> now.
          </div>
        </div>
      )}
    </div>
  );
}

export default Reset;
