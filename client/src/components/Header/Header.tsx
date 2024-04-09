import React, {useState, useEffect, useContext} from "react";
import logo from "../../resources/logo.png";
import { useNavigate } from 'react-router-dom';
import "./Header.css";
import { IconContext } from "react-icons";
import { FaUserCircle } from "react-icons/fa";
import { LuMessagesSquare } from "react-icons/lu";
import { isLoggedIn, logout } from "../../services/authService";
import { AuthContext } from "../../contexts";


const Header: React.FC = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const checkAuthentication = async () => {
    try {
        await isLoggedIn()
        authContext?.setIsAuth(true)

    }
    catch(e) {
        console.log(e)
        authContext?.setIsAuth(false)
    }   
  }
  
  useEffect(() => {
    checkAuthentication();
  }, [authContext?.isAuth]);

  const handleLogoClick = () => {
    navigate('./');
  }

  const handleLogout = async(e: React.FormEvent) => {
    try {
        await logout();
        navigate('/login')
        authContext?.setIsAuth(false)
    }

    catch(e) {
        console.log(e)
    }
  }

  const LogoutButton: React.FC | null = () => {
    if (authContext?.isAuth) {
      return <button className='mx-2 bg-custom-red hover:bg-custom-red-dark py-2 px-4 text-white rounded' onClick={handleLogout}>Logout</button>
    }
    return null
  }



  return (
    <header className="header-container">
      <div className="header-content">
          <img src={logo} alt="Logo" className="logo" />
          <div className="message-icon">
            <IconContext.Provider value={{ color: "black", size: "35px" }}>
              <a href="/message">
                  <div>
                    <LuMessagesSquare/>
                  </div>
              </a>
            </IconContext.Provider>
          </div>
          
          <div className="user-icon">
            <IconContext.Provider value={{ color: "black", size: "35px" }}>
              <a href="/profile">
                <div>
                  <FaUserCircle />
                </div>
              </a>
            </IconContext.Provider>
          </div>

          <LogoutButton/>
      </div>
    </header>
  );
};

export default Header;
