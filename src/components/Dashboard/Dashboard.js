import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Dashboard.css';

// Importamos íconos usando SVG básico para la demostración
// En una implementación real, usarías tu biblioteca de íconos
const ArrowLeft = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
);

const User = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Bell = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const Wallet = (props) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
  </svg>
);

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Estado para simular los datos del usuario
  const [userData] = useState({
    name: 'Andrés',
    creditScore: 800,
    maxScore: 1000,
    amountDue: 1500000,
    termDays: 30,
    interestRate: 5.2,
    paymentDate: '15/04/2025',
  });
  
  // Estado para controlar el menú de perfil
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // Simular carga de datos
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulamos cargar datos
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Función para volver a la pantalla de selección de dashboards
  const handleBack = () => {
    navigate('/select-user-type');
  };
  
  // Función para mostrar/ocultar menú de perfil
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <div className="dashboard-container">
      {/* Header mejorado */}
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo"><span>L</span></div>
          <h1 className="logo-text">luka</h1>
        </div>
        
        <div className="user-section">
          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar" onClick={toggleProfileMenu}>
            <User size={20} />
          </div>
          
          {/* Menú desplegable de perfil */}
          {showProfileMenu && (
            <div className="profile-dropdown">
              <div className="profile-header">
                <div className="profile-avatar">
                  <User size={36} />
                </div>
                <div className="profile-info">
                  <h4>¡Hola, {userData.name}!</h4>
                  <p className="profile-status">Usuario Activo</p>
                </div>
              </div>
              
              <div className="profile-menu-items">
                <Link to="/perfil" className="profile-menu-item">
                  <User size={18} />
                  <span>Mi Perfil</span>
                </Link>
                <Link to="/resumen-pagos" className="profile-menu-item">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Resumen de Pagos</span>
                </Link>
                <Link to="/certificado-tributario" className="profile-menu-item">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Certificado Tributario</span>
                </Link>
                <Link to="/configuracion" className="profile-menu-item">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                  <span>Configuración</span>
                </Link>
              </div>
              
              <div className="profile-footer">
                <button className="logout-button">Cerrar Sesión</button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="dashboard-content">
        {/* Botón para volver a la pantalla de selección de dashboards */}
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={18} /> Volver a Inicio
        </button>

        <div className="welcome-section">
          <h2 className="welcome-message">¡Hola, {userData.name}!</h2>
          <p>Este es el estado actualizado de tus microcréditos.</p>
        </div>

        {/* Saludo y puntaje crediticio */}
        <section className="greeting-section">
          <div className="credit-score-container">
            <div className="credit-score-circle">
              <div className="credit-score-inner">
                <div className="credit-score-label">Puntaje crediticio</div>
                <div className="credit-score-value">{userData.creditScore}/{userData.maxScore}</div>
                <div className="credit-score-message">¡Eres buena paga!</div>
              </div>
            </div>
          </div>
        </section>

        {/* Información de créditos */}
        <section className="credit-info-section">
          <h3>Información de tus créditos solicitados:</h3>
          
          <div className="credit-details-grid">
            <div className="credit-detail-card dark">
              <div className="detail-label">Falta por pagar:</div>
              <div className="detail-value">${userData.amountDue.toLocaleString()}</div>
            </div>
            
            <div className="credit-detail-card light">
              <div className="detail-label">Plazo:</div>
              <div className="detail-value">{userData.termDays} días</div>
            </div>
            
            <div className="credit-detail-card light">
              <div className="detail-label">Intereses:</div>
              <div className="detail-value">{userData.interestRate}%</div>
            </div>
            
            <div className="credit-detail-card dark">
              <div className="detail-label">Próxima fecha de pago:</div>
              <div className="detail-value">{userData.paymentDate}</div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="action-buttons">
            <button className="action-button primary">Pagar</button>
            <button className="action-button secondary">
              Ver historial detallado de microcréditos
            </button>
            <button className="action-button primary">Depositar fondos</button>
          </div>
        </section>
      </main>
      
      {/* Navegación inferior */}
      <nav className="bottom-nav">
        <Link to="/select-user-type" className="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Inicio</span>
        </Link>
        <Link to="/billetera" className="nav-item">
          <Wallet size={20} />
          <span>Billetera</span>
        </Link>
        <Link to="/calculadora" className="nav-item">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="4" y="2" width="16" height="20" rx="2"></rect>
            <line x1="8" x2="16" y1="6" y2="6"></line>
            <line x1="16" x2="16" y1="14" y2="18"></line>
            <line x1="8" x2="8" y1="14" y2="18"></line>
            <line x1="12" x2="12" y1="14" y2="18"></line>
            <line x1="8" x2="16" y1="14" y2="14"></line>
            <line x1="8" x2="16" y1="10" y2="10"></line>
            <line x1="8" x2="16" y1="18" y2="18"></line>
          </svg>
          <span>Calculadora</span>
        </Link>
        <Link to="/perfil" className="nav-item">
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>
      
      {/* Overlay de carga */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Cargando tu información...</p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;