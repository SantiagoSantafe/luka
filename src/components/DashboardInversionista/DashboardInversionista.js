import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './DashboardInversionista.css';
import { TrendingUp, Users, Clock, BarChart2, Download, DollarSign, PieChart, CreditCard, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const DashboardInversionista = () => {
  const [userData, setUserData] = useState({
    nombre: 'Carlos',
    saldoDisponible: 2500000,
    rentabilidadTotal: 12.5,
    inversionesActivas: 3,
    inversionesCompletadas: 2,
    totalMicrocreditosApoyados: 100, // Nuevo dato para mostrar el impacto
    rendimientoMensual: 25000, // Rendimiento mensual estimado
    rendimientoAnual: 312500, // Rendimiento anual proyectado
  });

  const [loading, setLoading] = useState(true);
  const [showMoveMoneyModal, setShowMoveMoneyModal] = useState(false);
  const [moveType, setMoveType] = useState('');
  const [moveAmount, setMoveAmount] = useState('');
  
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

  // Datos para la visualización del impacto social
  const [impactStats, setImpactStats] = useState({
    emprendedores: 65,
    mujeres: 48,
    rurales: 37,
    primeroCredito: 42
  });

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
    setMoveType('deposit');
    setShowMoveMoneyModal(true);
  };

  const handleWithdraw = () => {
    setMoveType('withdraw');
    setShowMoveMoneyModal(true);
  };

  const handleInvestMore = () => {
    console.log('Buscar nuevas oportunidades de inversión');
    // Aquí podríamos navegar a una página de oportunidades
  };
  
  const handleMoveMoneySubmit = () => {
    const amount = parseFloat(moveAmount);
    
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor ingresa una cantidad válida');
      return;
    }
    
    if (moveType === 'withdraw' && amount > userData.saldoDisponible) {
      alert('No tienes suficiente saldo disponible');
      return;
    }
    
    // Aquí en una app real, enviaríamos la solicitud al backend
    // Por ahora, solo actualizamos el estado local para simular
    
    setUserData(prevData => ({
      ...prevData,
      saldoDisponible: moveType === 'deposit' 
        ? prevData.saldoDisponible + amount
        : prevData.saldoDisponible - amount
    }));
    
    setShowMoveMoneyModal(false);
    setMoveAmount('');
    
    alert(`Has ${moveType === 'deposit' ? 'depositado' : 'retirado'} $${amount.toLocaleString()} exitosamente`);
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
      {/* Header con logo actualizado */}
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo">
            <img src="/assets/logoLuka.jpg" alt="Luka Logo" className="logo-image" />
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
        
        {/* Sección de impacto social - ACTUALIZADA CON ESTILOS EN LÍNEA */}
        <div className="impact-section">
          <div className="impact-card">
            <div className="impact-header">
              <h3>
                <Users className="icon" />
                Impacto de tu inversión
              </h3>
              <span className="impact-badge">Impacto Social</span>
            </div>
            <div className="impact-numbers">
              <h2 className="impact-total">{userData.totalMicrocreditosApoyados}</h2>
              <p className="impact-label">microcréditos apoyados</p>
            </div>
            <div className="impact-stats">
              <div className="impact-stat">
                <span className="stat-number">{impactStats.emprendedores}</span>
                <span className="stat-label" style={{ color: "white", fontWeight: 600, opacity: 1 }}>Emprendedores</span>
              </div>
              <div className="impact-stat">
                <span className="stat-number">{impactStats.mujeres}</span>
                <span className="stat-label" style={{ color: "white", fontWeight: 600, opacity: 1 }}>Mujeres</span>
              </div>
              <div className="impact-stat">
                <span className="stat-number">{impactStats.rurales}</span>
                <span className="stat-label" style={{ color: "white", fontWeight: 600, opacity: 1 }}>Rurales</span>
              </div>
              <div className="impact-stat">
                <span className="stat-number">{impactStats.primeroCredito}</span>
                <span className="stat-label" style={{ color: "white", fontWeight: 600, opacity: 1 }}>1er Crédito</span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-details">
        </div>
        
        <div className="dashboard-summary">
          <div className="summary-card balance">
            <h3 className="card-title">Saldo disponible</h3>
            <p className="card-value">${userData.saldoDisponible.toLocaleString()}</p>
            <div className="card-actions">
              <button className="action-btn deposit" onClick={handleDeposit}>
                <ArrowDownCircle className="btn-icon" />
                Depositar
              </button>
              <button className="action-btn withdraw" onClick={handleWithdraw}>
                <ArrowUpCircle className="btn-icon" />
                Retirar
              </button>
              <button className="action-btn withdraw" onClick={handleWithdraw}>
                <ArrowUpCircle className="btn-icon" />
                Invertir
              </button>
            </div>
          </div>
          
          {/* Card de Rentabilidad mejorada - NUEVA */}
          <div className="summary-card earnings">
            <h3 className="card-title">Rentabilidad de tus inversiones</h3>
            <div className="earnings-details">
              <div className="earnings-primary">
                <TrendingUp className="earnings-icon" />
                <div>
                  <p className="earnings-rate">{userData.rentabilidadTotal}%</p>
                  <span className="earnings-label">Anual</span>
                </div>
              </div>
              <div className="earnings-projections">
                <div className="earning-projection">
                  <span className="projection-value">${userData.rendimientoMensual.toLocaleString()}</span>
                  <span className="projection-label">Por mes</span>
                </div>
                <div className="earning-projection">
                  <span className="projection-value">${userData.rendimientoAnual.toLocaleString()}</span>
                  <span className="projection-label">Proyección anual</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats de inversión - Mejores visuales */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">
              <PieChart />
            </div>
            <div className="stat-content">
              <h4 className="stat-label">Inversiones activas</h4>
              <p className="stat-value">{userData.inversionesActivas}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <CreditCard />
            </div>
            <div className="stat-content">
              <h4 className="stat-label">Inversiones completadas</h4>
              <p className="stat-value">{userData.inversionesCompletadas}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <BarChart2 />
            </div>
            <div className="stat-content">
              <h4 className="stat-label">Total inversiones</h4>
              <p className="stat-value">${(investments.reduce((total, inv) => total + inv.montoInvertido, 0)).toLocaleString()}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon">
              <Clock />
            </div>
            <div className="stat-content">
              <h4 className="stat-label">Promedio plazo</h4>
              <p className="stat-value">90 días</p>
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
                    <span className="detail-text">El interés y rentabilidad del microcrédito es de: </span>
                    <span className="detail-value positive">{investment.rentabilidad}%</span>
                  </div>
                  
                  <div className="investment-detail">
                    <span className="detail-text">Monto invertido es de: </span>
                    <span className="detail-value positive">{investment.montoInvertido.toLocaleString()}$</span>
                  </div>

                  <div className="investment-detail">
                    <span className="detail-text">El score crediticio del prestatario es de: </span>
                    <span className="detail-value positive">{investment.scorePrestatario}/1000</span>
                  </div>
                  
                  <div className="investment-detail">
                    <span className="detail-label">Vencimiento</span>
                    <span className="detail-value">{investment.fechaVencimiento}</span>
                  </div>
                </div>
                
                <div className="investment-actions">
                  {/* Modificado para usar la ruta simplificada */}
                  <Link to={`/credito/${investment.id}`} className="view-details-btn">
                    Ver detalles
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </Link>
                  <button className="withdraw-investment-btn">
                    Retirar inversión
                    <ArrowUpCircle size={16} />
                  </button>
                </div>
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
        
        {/* Sección de reportes descargables - NUEVA */}
        <section className="reports-section">
          <h3 className="section-title">Reportes y certificados</h3>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon">
                <Download />
              </div>
              <div className="report-content">
                <h4>Reporte de inversiones</h4>
                <p>Resumen detallado de tus inversiones activas</p>
                <button className="download-btn">Descargar PDF</button>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon">
                <DollarSign />
              </div>
              <div className="report-content">
                <h4>Certificado tributario</h4>
                <p>Para declaración de renta (DIAN)</p>
                <button className="download-btn">Descargar PDF</button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Modal para depositar o retirar fondos */}
      {showMoveMoneyModal && (
        <div className="modal-overlay">
          <div className="money-modal">
            <h3 className="modal-title">
              {moveType === 'deposit' ? 'Depositar fondos' : 'Retirar fondos'}
            </h3>
            <div className="modal-content">
              <div className="form-group">
                <label htmlFor="amount">Cantidad (COP)</label>
                <input
                  type="number"
                  id="amount"
                  placeholder="Ingresa el monto"
                  value={moveAmount}
                  onChange={(e) => setMoveAmount(e.target.value)}
                  className="amount-input"
                  min="10000"
                  max={moveType === 'withdraw' ? userData.saldoDisponible : "100000000"}
                />
              </div>
              {moveType === 'withdraw' && (
                <div className="available-balance">
                  <p>Saldo disponible: <strong>${userData.saldoDisponible.toLocaleString()}</strong></p>
                </div>
              )}
              {moveType === 'deposit' && (
                <div className="payment-methods">
                  <p className="methods-title">Métodos de pago:</p>
                  <div className="methods-options">
                    <button className="method-option selected">PSE</button>
                    <button className="method-option">Transferencia</button>
                    <button className="method-option">Efectivo</button>
                  </div>
                </div>
              )}
            </div>
            <div className="modal-actions">
              <button 
                className="cancel-btn" 
                onClick={() => setShowMoveMoneyModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="confirm-btn"
                onClick={handleMoveMoneySubmit}
              >
                {moveType === 'deposit' ? 'Depositar' : 'Retirar'}
              </button>
            </div>
          </div>
        </div>
      )}
        <nav className="bottom-nav">
        <Link to="/" className={`nav-item ${window.location.pathname === '/' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Inicio</span>
        </Link>

        <Link to={`/dashboard/${localStorage.getItem('userType') || 'prestatario'}`} className={`nav-item ${window.location.pathname.includes('/dashboard') ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
            <polyline points="17 6 23 6 23 12"></polyline>
          </svg>
          <span>Dashboard</span>
        </Link>

        <Link to="/billetera" className={`nav-item ${window.location.pathname === '/billetera' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
            <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
            <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
          </svg>
          <span>Billetera Digital</span>
        </Link>

        <Link to="/perfil" className={`nav-item ${window.location.pathname === '/perfil' ? 'active' : ''}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default DashboardInversionista;