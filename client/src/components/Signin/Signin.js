import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Signin.css";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignin = (e) => {
    e.preventDefault();
    const user = { username, password };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_NOTER_SERVER}/users/login`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("User Logged In");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        alert("Authentication Failed");
        setUsername("");
        setPassword("");
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { username, password };

    axios({
      method: "POST",
      url: `${process.env.REACT_APP_NOTER_SERVER}/users`,
      headers: {
        "Content-Type": "application/json",
      },
      data: user,
    })
      .then((res) => {
        console.log("New User Created!");
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      })
      .catch((error) => {
        alert(error);
        setUsername("");
        setPassword("");
      });
  };

  return (
    <div className="Signin">
      <h1 className="SigninHeader">Noter</h1>
      <div className="SigninForm">
        <form>
          <div className="FormUsername">
            <span className="FormLabel">Username</span>
            <input
              type="text"
              className="FormInput"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="FormPassword">
            <span className="FormLabel">Password</span>
            <input
              type="password"
              className="FormInput"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="FormButtons">
            <button className="Buttons" onClick={handleSignin}>
              Sign In
            </button>
            <button className="Buttons RegisterButton" onClick={handleRegister}>
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signin;
