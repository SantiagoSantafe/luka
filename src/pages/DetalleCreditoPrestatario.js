import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, CreditCard, TrendingUp, FileText, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import './DetalleCreditoPrestatario.css';

const DetalleCreditoPrestatario = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [credito, setCredito] = useState(null);

  useEffect(() => {
    // Simulación de carga de datos desde una API
    setTimeout(() => {
      // Datos de ejemplo basados en lo que vimos en el dashboard
      setCredito({
        id: id,
        numero: `#${id === '1' ? '9834' : id}`, // Si es el ID 1, usamos 9834 como se ve en el dashboard
        monto: 1500000,
        plazo: 12,
        cuotaMensual: 140000,
        fechaInicio: '15/06/2024',
        fechaVencimiento: '15/06/2025',
        scoreLuka: 82,
        estado: 'Al día',
        cuotasPagadas: 6,
        cuotasTotales: 24,
        tasaInteres: 12.5,
        destinoCredito: 'Compra de equipo para negocio de artesanías',
        proximoPago: {
          fecha: '15/07/2025',
          monto: 140000,
          estado: 'Pendiente'
        },
        historialPagos: [
          { fecha: '15/01/2025', monto: 140000, estado: 'Pagado', numeroCuota: 1 },
          { fecha: '15/02/2025', monto: 140000, estado: 'Pagado', numeroCuota: 2 },
          { fecha: '15/03/2025', monto: 140000, estado: 'Pagado', numeroCuota: 3 },
          { fecha: '15/04/2025', monto: 140000, estado: 'Pagado', numeroCuota: 4 },
          { fecha: '15/05/2025', monto: 140000, estado: 'Pagado', numeroCuota: 5 },
          { fecha: '15/06/2025', monto: 140000, estado: 'Pagado', numeroCuota: 6 },
          { fecha: '15/07/2025', monto: 140000, estado: 'Pendiente', numeroCuota: 7 },
        ]
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <div className="detalle-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const calcularProgreso = () => {
    return (credito.cuotasPagadas / credito.cuotasTotales) * 100;
  };

  return (
    <div className="detalle-credito-container">
      <header className="detalle-header">
        <Link to="/dashboard/prestatario" className="back-button">
          <ArrowLeft size={20} />
          <span>Volver al Dashboard</span>
        </Link>
        <h1>Crédito {credito.numero}</h1>
        <span className={`estado-badge ${credito.estado.toLowerCase().replace(' ', '-')}`}>
          {credito.estado}
        </span>
      </header>

      <div className="detalle-content">
        <div className="detalle-card info-general">
          <h2>Información General</h2>
          
          <div className="info-grid">
            <div className="info-item">
              <CreditCard className="info-icon" />
              <div>
                <h3>Monto del Crédito</h3>
                <p>${credito.monto.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="info-item">
              <Clock className="info-icon" />
              <div>
                <h3>Plazo</h3>
                <p>{credito.plazo} meses</p>
              </div>
            </div>
            
            <div className="info-item">
              <TrendingUp className="info-icon" />
              <div>
                <h3>Tasa de Interés</h3>
                <p>{credito.tasaInteres}% anual</p>
              </div>
            </div>
            
            <div className="info-item">
              <Calendar className="info-icon" />
              <div>
                <h3>Fecha de Vencimiento</h3>
                <p>{credito.fechaVencimiento}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="progreso-card">
          <h2>Progreso del Crédito</h2>
          <div className="progreso-info">
            <div className="progreso-stats">
              <div className="progreso-stat">
                <span className="stat-number">{credito.cuotasPagadas}</span>
                <span className="stat-label">Cuotas pagadas</span>
              </div>
              <div className="progreso-stat">
                <span className="stat-number">{credito.cuotasTotales}</span>
                <span className="stat-label">Cuotas totales</span>
              </div>
            </div>
            <div className="progreso-bar-container">
              <div className="progreso-bar">
                <div className="progreso-completado" style={{ width: `${calcularProgreso()}%` }}></div>
              </div>
              <div className="progreso-porcentaje">{Math.round(calcularProgreso())}% completado</div>
            </div>
          </div>
        </div>

        <div className="detalle-cards-row">
          <div className="detalle-card pago-proximo">
            <h2>Próximo Pago</h2>
            <div className="pago-proximo-info">
              <div className="fecha-pago">
                <Calendar className="fecha-icon" />
                <div>
                  <h3>Fecha de Pago</h3>
                  <p>{credito.proximoPago.fecha}</p>
                </div>
              </div>
              <div className="monto-pago">
                <span className="monto-label">Monto a pagar:</span>
                <span className="monto-valor">${credito.proximoPago.monto.toLocaleString()}</span>
              </div>
              <button className="pagar-ahora-btn">Pagar ahora</button>
            </div>
          </div>

          <div className="detalle-card score">
            <h2>Score Luka</h2>
            <div className="score-container">
              <div className="score-circle">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" strokeWidth="12" />
                  <circle 
                    cx="60" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke="#0d4a75" 
                    strokeWidth="12" 
                    strokeDasharray={`${2 * Math.PI * 54 * credito.scoreLuka / 100} ${2 * Math.PI * 54 * (1 - credito.scoreLuka / 100)}`}
                    strokeDashoffset={2 * Math.PI * 54 * 0.25}
                  />
                </svg>
                <div className="score-value">
                  <span className="current-score">{credito.scoreLuka}</span>
                  <span className="max-score">/100</span>
                </div>
              </div>
              <div className="score-info">
                <p>Tu puntaje está <strong>{credito.scoreLuka >= 80 ? 'excelente' : credito.scoreLuka >= 60 ? 'bueno' : 'bajo'}</strong></p>
                <p className="score-tip">Mantén tus pagos al día para mejorar tu score.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="detalle-card destino">
          <h2>Destino del Crédito</h2>
          <div className="destino-info">
            <FileText className="destino-icon" />
            <p>{credito.destinoCredito}</p>
          </div>
        </div>

        <div className="detalle-card historial-pagos">
          <h2>Historial de Pagos</h2>
          <div className="pagos-lista">
            {credito.historialPagos.map((pago, index) => (
              <div className="pago-item" key={index}>
                <div className="pago-info">
                  <div className="pago-fecha-numero">
                    <span className="pago-numero">Cuota {pago.numeroCuota}</span>
                    <span className="pago-fecha">{pago.fecha}</span>
                  </div>
                  <div className="pago-monto">${pago.monto.toLocaleString()}</div>
                  <div className={`pago-estado ${pago.estado.toLowerCase()}`}>
                    {pago.estado === 'Pagado' ? <CheckCircle size={16} /> : <AlertTriangle size={16} />}
                    <span>{pago.estado}</span>
                  </div>
                </div>
                {pago.estado === 'Pendiente' && (
                  <button className="pagar-cuota-btn">Pagar cuota</button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="acciones-container">
          <button className="accion-btn descargar">Descargar Certificado</button>
          <button className="accion-btn soporte">Solicitar Soporte</button>
        </div>
      </div>
    </div>
  );
};

export default DetalleCreditoPrestatario;