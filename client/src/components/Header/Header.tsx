import React from "react";
import logo from "../../resources/logo.png";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../../services/authService";


const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('./');
  }

  const handleLogout = async(e: React.FormEvent) => {
    try {
        await logout();
        navigate('/login')
    }

    catch(e) {
        console.log(e)
    }
  }


  return (
    <header className="header-container">
      <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="flex flex-row items-center">

            <div className="user-icon">
              <IconContext.Provider value={{ color: "black", size: "35px" }}>
                <a href="/profile">
                  <div>
                    <FaUserCircle />
                  </div>
                </a>
              </IconContext.Provider>
            </div>
            <button className='mx-2 bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleLogout}>Logout</button>

          </div>
      </div>
    </header>
  );
};

export default Header;
