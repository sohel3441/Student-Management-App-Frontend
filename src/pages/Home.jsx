import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">🎓 Student Management App</h1>
      <p className="home-subtitle">Easily add, view, and manage student records.</p>

      <div className="home-buttons">
        <Link to="/form" className="home-link">
          <button className="home-button add-btn">➕ Add Student</button>
        </Link>
        <Link to="/students" className="home-link">
          <button className="home-button view-btn">📋 View Students</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
