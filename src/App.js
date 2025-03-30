import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Home from './components/Home/Home';
import './App.css';

function App() {
  // Simulación simple de autenticación - en un proyecto real usarías un sistema más robusto
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/register" 
            element={isLoggedIn ? <Navigate to="/dashboard" /> : <Register />} 
          />
          <Route 
            path="/dashboard" 
            element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;