import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_NOTER_SERVER}/users/logout`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(async () => {
      const isTokenExists = await localStorage.getItem("token");
      if (isTokenExists) {
        localStorage.removeItem("token");
        navigate("/");
      }
    });
  };

  const handleDeleteAccount = () => {
    const token = localStorage.getItem("token");
    axios({
      method: "DELETE",
      url: `${process.env.REACT_APP_NOTER_SERVER}/users/delete`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(() => {
      console.log("User Account Deleted");
      localStorage.removeItem("token");
      navigate("/");
    });
  };

  return (
    <div className="Navbar">
      <div className="NavTitle">
        <Link className="NavTitle" to="/dashboard">
          <h1 className="TitleText">Noter</h1>
        </Link>
      </div>
      <div className="NavRouters">
        <Link className="NavRouters routes" to="/dashboard">
          <span className="routes">Dashboard</span>
        </Link>
      </div>
      <div className="NavButtons">
        <button className="CreateNote" onClick={handleSignOut}>
          Sign Out
        </button>
        <button
          className="CreateNote DeleteAccountButton"
          onClick={handleDeleteAccount}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}

export default Navbar;
