import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content">
        <h1 className="logo">Luka</h1>
        <div className="tagline">
          <p>Rompiéndo Barreras,</p>
          <p>creando oportunidades</p>
        </div>
        
        <div className="cta-container">
          <Link to="/register" className="cta-button">¡Empieza ya!</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;