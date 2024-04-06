import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SearchResults from './components/SearchResults/SearchResults'; // Import the SearchResults component
import Login from './components/Login/Login';
import Register from './components/Registration/Registration';
import Profile from './components/Profile/Profile';

import Message from './components/Message/Message';
import React, {useState, useEffect} from 'react';
import { AuthContext } from './contexts';
import ReviewForm from './components/Reviews/ReviewForm';

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  return (
    <BrowserRouter>
      <div className="App">
      <AuthContext.Provider value={{isAuth, setIsAuth}} >
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search-results" element={<SearchResults/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/:username" element={<Profile/>}/>
          <Route path="/profile/:username/reviews/add" element={<ReviewForm/>}/>

          <Route path="/message" element={<Message />} />
        </Routes>
        </AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
