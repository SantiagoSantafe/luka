import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardInversionista.css';

const DashboardInversionista = () => {
  const [userData, setUserData] = useState({
    nombre: 'Carlos',
    saldoDisponible: 2500000,
    rentabilidadTotal: 12.5,
    inversionesActivas: 3,
    inversionesCompletadas: 2
  });

  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState([
    {
      id: 1,
      nombre: 'Crédito #9834',
      montoInvertido: 1200000,
      rentabilidad: 13.2,
      fechaVencimiento: '15/06/2025',
      estado: 'Al día',
      scorePrestatario: 820
    },
    {
      id: 2,
      nombre: 'Crédito #7156',
      montoInvertido: 800000,
      rentabilidad: 11.8,
      fechaVencimiento: '03/05/2025',
      estado: 'Al día',
      scorePrestatario: 790
    },
    {
      id: 3,
      nombre: 'Crédito #3421',
      montoInvertido: 500000,
      rentabilidad: 12.5,
      fechaVencimiento: '22/07/2025',
      estado: 'Al día',
      scorePrestatario: 850
    }
  ]);

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

  const handleDeposit = () => {
    console.log('Abrir formulario de depósito');
    // Aquí podríamos abrir un modal para depositar
  };

  const handleWithdraw = () => {
    console.log('Abrir formulario de retiro');
    // Aquí podríamos abrir un modal para retirar fondos
  };

  const handleInvestMore = () => {
    console.log('Buscar nuevas oportunidades de inversión');
    // Aquí podríamos navegar a una página de oportunidades
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard-container inversionista">
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
        
        <div className="dashboard-summary">
          <div className="summary-card balance">
            <h3 className="card-title">Saldo disponible</h3>
            <p className="card-value">${userData.saldoDisponible.toLocaleString()}</p>
            <div className="card-actions">
              <button className="action-btn deposit" onClick={handleDeposit}>Depositar</button>
              <button className="action-btn withdraw" onClick={handleWithdraw}>Retirar</button>
            </div>
          </div>
          
          <div className="summary-card stats">
            <div className="stat-item">
              <h4 className="stat-label">Rentabilidad total</h4>
              <p className="stat-value">{userData.rentabilidadTotal}%</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4 className="stat-label">Inversiones activas</h4>
              <p className="stat-value">{userData.inversionesActivas}</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h4 className="stat-label">Inversiones completadas</h4>
              <p className="stat-value">{userData.inversionesCompletadas}</p>
            </div>
          </div>
        </div>
        
        <section className="investments-section">
          <div className="section-header">
            <h3 className="section-title">Tus inversiones activas</h3>
            <button className="invest-more-btn" onClick={handleInvestMore}>
              Invertir más
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
          
          <div className="investments-list">
            {investments.map(investment => (
              <div className="investment-card" key={investment.id}>
                <div className="investment-header">
                  <h4 className="investment-name">{investment.nombre}</h4>
                  <span className={`investment-status ${investment.estado.toLowerCase().replace(' ', '-')}`}>
                    {investment.estado}
                  </span>
                </div>
                
                <div className="investment-details">
                  <div className="investment-detail">
                    <span className="detail-label">Monto invertido</span>
                    <span className="detail-value">${investment.montoInvertido.toLocaleString()}</span>
                  </div>
                  
                  <div className="investment-detail">
                    <span className="detail-label">Rentabilidad</span>
                    <span className="detail-value positive">{investment.rentabilidad}%</span>
                  </div>
                  
                  <div className="investment-detail">
                    <span className="detail-label">Vencimiento</span>
                    <span className="detail-value">{investment.fechaVencimiento}</span>
                  </div>
                  
                  <div className="investment-detail">
                    <span className="detail-label">Score prestatario</span>
                    <span className="detail-value">{investment.scorePrestatario}/1000</span>
                  </div>
                </div>
                
                <button className="view-details-btn">
                  Ver detalles
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="view-all-container">
            <button className="view-all-btn">
              Ver todas las inversiones
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardInversionista;