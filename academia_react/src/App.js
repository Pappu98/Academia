import './App.css';
import React, { useState } from 'react';
import Login from './Components/Login';
import Search from './Components/Search';
import StudentDetails from './Components/StudentDetails';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

const App = () => {
  //const [user, setUser] = useState(false);
  //let temp=localStorage.getItem("save");
  //setUser(temp);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">
          <span>Academia</span>
        </div>
      </nav>
        <Routes>
              <Route path="/search" element={<Search />} />
              <Route path="/update/:studentid" element={<StudentDetails />} />            
            <Route path="/" element={<Login/>}/>
        </Routes>
    </div>
  );
};

export default App;