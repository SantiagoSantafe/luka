import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home, User, Wallet, TrendingUp, Calendar, AlertCircle, FileText, ArrowLeft
} from 'lucide-react';
import './DashboardPrestatario.css';


const DashboardPrestatario = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };
  const [loading, setLoading] = useState(true);

  const creditosActivos = [
    {
      id: 1,
      nombre: 'Crédito #9834',
      monto: 1500000,
      plazo: 12,
      cuota: 140000,
      fechaPago: '15/06/2025',
      score: 82,
      estado: 'Al día'
    },
    {
      id: 2,
      nombre: 'Crédito #7156',
      monto: 800000,
      plazo: 6,
      cuota: 135000,
      fechaPago: '01/06/2025',
      score: 82,
      estado: 'Al día'
    },
    {
      id: 3,
      nombre: 'Crédito #3421',
      monto: 500000,
      plazo: 6,
      cuota: 180000,
      fechaPago: '20/05/2025',
      score: 82,
      estado: 'Al día'
    }
  ];

  const montoMaximo = 4000000;
  const scoreLukaPromedio = Math.round(
    creditosActivos.reduce((acc, c) => acc + c.score, 0) / creditosActivos.length
  );
  const cuotasPagadasTotales = 6;
  const cuotasTotalesGlobal = 24;
  const progreso = (cuotasPagadasTotales / cuotasTotalesGlobal) * 100;

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const formatCurrency = (valor) => `$${valor.toLocaleString('es-CO')}`;

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
        <p>Cargando tu información...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container prestatario">
      <header className="dashboard-header">
        <div className="logo-container">
          <div className="logo"><span>L</span></div>
          <h1 className="logo-text">luka</h1>
        </div>
        <div className="user-avatar"><User size={20} /></div>
      </header>

      <main className="dashboard-content">
        <button className="back-button" onClick={handleBack}>
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="welcome-section">
          <h2 className="welcome-message">¡Hola, Andrés!</h2>
          <p>Este es el estado actualizado de tus microcréditos.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><Wallet /></div>
            <div className="stat-content">
              <h4 className="stat-label">Créditos activos</h4>
              <p className="stat-value">{creditosActivos.length}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><TrendingUp /></div>
            <div className="stat-content">
              <h4 className="stat-label">Score Luka</h4>
              <p className="stat-value">{scoreLukaPromedio}/100</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Calendar /></div>
            <div className="stat-content">
              <h4 className="stat-label">Cuotas pagadas</h4>
              <p className="stat-value">{cuotasPagadasTotales}/{cuotasTotalesGlobal}</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FileText /></div>
            <div className="stat-content">
              <h4 className="stat-label">Monto máximo aprobado</h4>
              <p className="stat-value">{formatCurrency(montoMaximo)}</p>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h3>Progreso global de tus créditos</h3>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progreso}%` }}></div>
          </div>
          <p>{cuotasPagadasTotales} de {cuotasTotalesGlobal} cuotas pagadas</p>
        </div>

        <section className="credits-section">
          <h3>Tus créditos activos</h3>
          <div className="credits-list">
            {creditosActivos.map((c) => (
              <div className="credit-card" key={c.id}>
                <div className="credit-header">
                  <h4 className="credit-title">{c.nombre}</h4>
                  <span className={`credit-status ${c.estado.toLowerCase().replace(' ', '-')}`}>{c.estado}</span>
                </div>
                <div className="credit-info">
                  <p><strong>Monto:</strong> {formatCurrency(c.monto)}</p>
                  <p><strong>Plazo:</strong> {c.plazo} meses</p>
                  <p><strong>Cuota mensual:</strong> {formatCurrency(c.cuota)}</p>
                  <p><strong>Vencimiento:</strong> {c.fechaPago}</p>
                  <p><strong>Score Luka:</strong> 82/100</p>
                </div>
                <Link to={`/credito/${c.id}`} className="view-button">Ver más</Link>              </div>
            ))}
          </div>
        </section>

        <section className="reports-section">
          <h3>Reportes y certificados</h3>
          <div className="reports-grid">
            <div className="report-card">
              <div className="report-icon"><FileText /></div>
              <div className="report-content">
                <h4>Resumen de pagos</h4>
                <p>Detalle de todas tus cuotas pagadas</p>
                <button className="download-button">Descargar PDF</button>
              </div>
            </div>
            <div className="report-card">
              <div className="report-icon"><TrendingUp /></div>
              <div className="report-content">
                <h4>Certificado tributario</h4>
                <p>Para declaración de renta (DIAN)</p>
                <button className="download-button">Descargar PDF</button>
              </div>
            </div>
          </div>
        </section>

        <div className="improvement-tips">
          <div className="tip-header">
            <AlertCircle className="tip-icon" />
            <h3>Consejo financiero</h3>
          </div>
          <p>Si pagas 5 días antes, podrías mejorar tu score Luka en +3 puntos.</p>
          <p>Completa 3 meses sin retrasos para solicitar aumento de cupo.</p>
        </div>
      </main>

      <nav className="bottom-nav">
        <Link to="/" className={`nav-item ${window.location.pathname === '/' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link to={`/dashboard/${localStorage.getItem('userType') || 'prestatario'}`} className={`nav-item ${window.location.pathname.includes('/dashboard') ? 'active' : ''}`}>
          <TrendingUp size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/billetera" className={`nav-item ${window.location.pathname === '/billetera' ? 'active' : ''}`}>
          <Wallet size={20} />
          <span>Billetera Digital</span>
        </Link>
        <Link to="/calculadora" className={`nav-item ${window.location.pathname === '/calculadora' ? 'active' : ''}`}>
          <TrendingUp size={20} />
          <span>Calculadora</span>
        </Link>
        <Link to="/perfil" className={`nav-item ${window.location.pathname === '/perfil' ? 'active' : ''}`}>
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>
    </div>
  );
};

export default DashboardPrestatario;