// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Student Management App</h1>
      <div className="home-buttons">
        <Link to="/form">
          <button>Add Student</button>
        </Link>
        <Link to="/students">
          <button>View Students</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
