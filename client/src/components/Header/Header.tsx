import React from "react";
import logo from "../../resources/logo.png";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";


const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('./');
  }

  return (
    <header className="header-container">
      <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="user-icon">
            <IconContext.Provider value={{ color: "black", size: "35px" }}>
              <a href="/profile">
                <div>
                  <FaUserCircle />
                </div>
              </a>
            </IconContext.Provider>
          </div>
      </div>
    </header>
  );
};

export default Header;
