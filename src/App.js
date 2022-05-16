import { Routes, Route } from "react-router-dom"
import './App.css';
import Landing from './components/Landing/Landing';
import Navbar from './components/Navbar/Navbar';
import Dashboard from './components/Dashboard/Dashboard'
import { useState } from "react";

function App() {
  const [cookieState, setCookieState] = useState(null)
  return (
      <div className="App">
          <h1>Magic Playlist</h1>
          <p>Create your own playlist based on the filters</p>
          <Routes>
            <Route path="/" element={<Landing cookieState={state => setCookieState(state)}/>}/>
            <Route path="/dashboard" element={<Dashboard cookieState={cookieState}/>}/>
          </Routes>
          <p style={{
            position: "absolute",
            bottom: 0,
            right: 5            
          }}>
                Developed by <a href="https://github.com/ved08">Ved</a>, powered by Spotify API
            </p>
      </div>
  );
}

export default App;
