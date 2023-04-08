import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut } from "firebase/auth";
import logo from "../assets/logo.png";
import { useState } from "react";

export const Header = () => {
  const [isAuth, setIsAuth] = useState(JSON.parse(localStorage.getItem("isAuth")) ||false);
  const navigate= useNavigate()

  const handlelogin = () => {
    signInWithPopup(auth, provider).then((result) => {
     
      setIsAuth(true);
      localStorage.setItem("isAuth",true)
    });
  };

  const handleLogout = () => {
    signOut(auth);
    setIsAuth(false);
    localStorage.setItem("isAuth",false)
    navigate("/")
  };

  return (
    <header>
      <Link to="/" className="logo">
        <img src={logo} alt="logo" />
        <span>WriteNOde</span>
      </Link>
      <nav className="nav">
        <NavLink to="/" className="link" end>
          Home
        </NavLink>

        {isAuth ? (
          <>
            <NavLink to="/create" className="link">
              Create
            </NavLink>
            <button onClick={handleLogout} className="auth">
              <i className="bi bi-box-arrow-right"></i>Logout
            </button>
          </>
        ) : (
          <button onClick={handlelogin} className="auth">
            <i className="bi bi-google"></i>Login
          </button>
        )}
      </nav>
    </header>
  );
};
