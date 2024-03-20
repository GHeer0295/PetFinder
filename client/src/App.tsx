import './App.css';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Header from './components/Header/Header';
import Dashboard from './components/Dashboard/Dashboard';
import SearchResults from './components/SearchResults/SearchResults'; // Import the SearchResults component
import Message from './components/Message/Message';

// temp: Added router have messages on another page for now
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/search-results" element={<SearchResults/>}/>
          <Route path='message' element={<Message />}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
