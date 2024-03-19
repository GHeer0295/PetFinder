import './App.css';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import Message from './components/Message/Message';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// temp: Added router have messages on another page for now
function App() {
  return (
    <div className="App">
      <Header />
      <Dashboard />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path='message' element={<Message />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
