import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardPrestatario.css';

const DashboardPrestatario = () => {
  const [userData, setUserData] = useState({
    nombre: 'Andrés',
    puntaje: 800,
    puntajeMax: 1000,
    montoDeuda: 1500000,
    plazo: 30,
    tasaInteres: 5.2,
    fechaPago: '15/04/2025'
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga de datos del usuario
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType');
    window.location.href = '/login';
  };

  const handleViewDetails = () => {
    console.log('Ver detalles de créditos');
    // Aquí podríamos navegar a una página de detalles
  };

  const handleDeposit = () => {
    console.log('Abrir formulario de depósito');
    // Aquí podríamos abrir un modal para depositar
  };

  const handlePayment = () => {
    console.log('Procesar pago');
    // Aquí podríamos abrir un modal de pago
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container prestatario">
      {/* Header */}
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo">
            <span>L</span>
          </div>
          <h1 className="logo-text">luka</h1>
        </div>
        <div className="user-section">
          <div className="user-menu">
            <Link to="/configuracion" className="settings-link">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
            </Link>
            <button className="logout-button" onClick={handleLogout}>
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-section">
          <h2 className="welcome-message">¡Buenos días, {userData.nombre}!</h2>
        </div>
        
        <div className="score-section">
          <div className="score-circle">
            <div className="score-content">
              <p className="score-label">Puntaje crediticio</p>
              <h3 className="score-value">{userData.puntaje}/{userData.puntajeMax}</h3>
              <p className="score-description">¡Eres buena paga!</p>
            </div>
          </div>
        </div>

        <section className="loan-info-section">
          <h3 className="section-title">Información de tus créditos solicitados:</h3>
          
          <div className="loan-details-grid">
            <div className="loan-detail-card dark">
              <p className="detail-label">Falta por pagar:</p>
              <p className="detail-value">${userData.montoDeuda.toLocaleString()}</p>
            </div>
            
            <div className="loan-detail-card light">
              <p className="detail-label">Plazo:</p>
              <p className="detail-value">{userData.plazo} días</p>
            </div>
            
            <div className="loan-detail-card light">
              <p className="detail-label">Intereses:</p>
              <p className="detail-value">{userData.tasaInteres}%</p>
            </div>
            
            <div className="loan-detail-card dark">
              <p className="detail-label">Próxima fecha de pago:</p>
              <p className="detail-value">{userData.fechaPago}</p>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="action-button primary" onClick={handlePayment}>
              Pagar
            </button>
            
            <button className="action-button secondary" onClick={handleViewDetails}>
              Presiona aquí para ver toda la información sobre tus microcréditos.
            </button>
            
            <button className="action-button primary" onClick={handleDeposit}>
              Depositar fondos
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPrestatario;