import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Users, 
  Wallet, 
  CreditCard, 
  RefreshCw, 
  ChevronRight, 
  BarChart, 
  TrendingUp, 
  AlertCircle,
  Home,
  User,
  DollarSign,
  Award,
  BarChart2,
  PieChart,
  HelpCircle,
  Share2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './CalculadoraMicrocreditos.css';

const CalculadoraMicrocreditos = () => {
  const [activeTab, setActiveTab] = useState('inversionista');
  const [loading, setLoading] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  
  // Estados para el modo inversionista
  const [montoInversion, setMontoInversion] = useState(1000000);
  const [plazoPreferido, setPlazoPreferido] = useState(12);
  const [scoreMinimo, setScoreMinimo] = useState(75);
  
  // Estados para el modo prestatario
  const [montoDeseado, setMontoDeseado] = useState(1500000);
  const [plazoDeseado, setPlazoDeseado] = useState(12);
  const [scoreLuka, setScoreLuka] = useState(80);
  
  // Cálculos para el modo inversionista
  const rentabilidadBruta = 0.14; // 14%
  const rentabilidadNeta = 0.115; // 11.5%
  const numeroCreditosSimulados = Math.ceil(montoInversion / 250000);
  const numeroBeneficiarios = Math.ceil(montoInversion / 300000);
  const riesgoPromedio = 100 - scoreMinimo;

  // Distribución sectorial simulada
  const [sectorDistribution, setSectorDistribution] = useState([
    { sector: 'Comercio', porcentaje: 40 },
    { sector: 'Servicios', porcentaje: 30 },
    { sector: 'Manufactura', porcentaje: 20 },
    { sector: 'Agricultura', porcentaje: 10 }
  ]);
  
  // Cálculos para el modo prestatario
  const tasaEstimada = scoreLuka >= 90 ? 0.14 : scoreLuka >= 80 ? 0.16 : scoreLuka >= 70 ? 0.18 : 0.20;
  const cuotaMensual = Math.round((montoDeseado * (1 + tasaEstimada)) / plazoDeseado);
  const totalPagar = cuotaMensual * plazoDeseado;
  
  // Probabilidad de aprobación basada en el score
  const probabilidadAprobacion = scoreLuka >= 90 ? 95 : 
                                scoreLuka >= 80 ? 80 : 
                                scoreLuka >= 70 ? 60 : 40;
  
  // Monto máximo aprobable (simulación)
  const montoMaximo = scoreLuka >= 90 ? 3000000 : 
                     scoreLuka >= 80 ? 2000000 : 
                     scoreLuka >= 70 ? 1500000 : 1000000;

  // Efecto para simular la carga inicial
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Manejo de cambios en los formularios
  const formatCurrency = (value) => {
    return `$${value.toLocaleString()}`;
  };

  const handleSimulate = () => {
    setLoading(true);
    // Simulamos un procesamiento
    setTimeout(() => {
      // Ajustamos la distribución sectorial aleatoriamente para dar sensación de cálculo
      const newDistribution = [...sectorDistribution];
      newDistribution.forEach(item => {
        item.porcentaje = item.porcentaje + (Math.random() * 6 - 3);
      });
      setSectorDistribution(newDistribution);
      setLoading(false);
    }, 800);
  };

  const handleShareResults = () => {
    setShareModalOpen(true);
  };

  const handleOpenHelp = () => {
    setHelpModalOpen(true);
  };

  // Renderizado de la calculadora
  if (loading) {
    return (
      <div className="calculator-container">
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <p>Procesando cálculos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="calculator-container">
      {/* Header */}
      <header className="calculator-header">
        <div className="logo-container">
          <div className="logo">
            <span>L</span>
          </div>
          <h1 className="logo-text">luka</h1>
        </div>
        <div className="header-actions">
          <button className="help-button" onClick={handleOpenHelp}>
            <HelpCircle size={20} />
          </button>
          <div className="user-avatar">
            <User size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="calculator-content">
        <div className="page-title">
          <Calculator className="title-icon" />
          <h1>Calculadora de Microcréditos</h1>
        </div>
        
        {/* Tabs */}
        <div className="calculator-tabs">
          <button 
            className={`tab-button ${activeTab === 'inversionista' ? 'active' : ''}`}
            onClick={() => setActiveTab('inversionista')}
          >
            <Users size={20} />
            <span>Modo Inversionista</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'prestatario' ? 'active' : ''}`}
            onClick={() => setActiveTab('prestatario')}
          >
            <CreditCard size={20} />
            <span>Modo Prestatario</span>
          </button>
        </div>
        
        {/* Modo Inversionista */}
        {activeTab === 'inversionista' && (
          <div className="calculator-panel">
            <div className="panel-section">
              <h2 className="section-title">
                <Wallet size={18} />
                <span>Configuración de inversión</span>
              </h2>
              
              {/* Monto a invertir */}
              <div className="form-group">
                <div className="form-group-header">
                  <label>Monto a invertir (COP)</label>
                  <span className="value-display">{formatCurrency(montoInversion)}</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="100000" 
                    max="10000000" 
                    step="100000" 
                    value={montoInversion}
                    onChange={(e) => setMontoInversion(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="slider-labels">
                    <span>$100,000</span>
                    <span>$10,000,000</span>
                  </div>
                </div>
              </div>
              
              {/* Plazo preferido */}
              <div className="form-group">
                <label>Plazo preferido (meses)</label>
                <div className="toggle-buttons">
                  {[6, 12, 18, 24].map((plazo) => (
                    <button
                      key={plazo}
                      className={`toggle-button ${plazoPreferido === plazo ? 'active' : ''}`}
                      onClick={() => setPlazoPreferido(plazo)}
                    >
                      {plazo}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Nivel de riesgo */}
              <div className="form-group">
                <div className="form-group-header">
                  <label>Score mínimo aceptado</label>
                  <span className="value-display">{scoreMinimo}</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="60" 
                    max="95" 
                    step="5" 
                    value={scoreMinimo}
                    onChange={(e) => setScoreMinimo(Number(e.target.value))}
                    className="slider risk-slider"
                  />
                  <div className="risk-labels">
                    <span className="high-risk">Mayor riesgo</span>
                    <span className="low-risk">Menor riesgo</span>
                  </div>
                </div>
              </div>
              
              <button className="simulate-button" onClick={handleSimulate}>
                <RefreshCw size={18} />
                <span>Recalcular con estos parámetros</span>
              </button>
            </div>
            
            {/* Resultados */}
            <div className="panel-section results-section">
              <h2 className="section-title">
                <BarChart size={18} />
                <span>Resultados de la simulación</span>
              </h2>
              
              <div className="results-grid">
                <div className="result-card highlighted">
                  <div className="result-header">
                    <h3>Rentabilidad neta</h3>
                    <TrendingUp className="result-icon positive" />
                  </div>
                  <p className="result-value">{(rentabilidadNeta * 100).toFixed(1)}%</p>
                  <p className="result-label">anual</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Rendimiento estimado</h3>
                    <DollarSign className="result-icon positive" />
                  </div>
                  <p className="result-value">{formatCurrency(Math.round(montoInversion * rentabilidadNeta))}</p>
                  <p className="result-label">ganancia neta anual</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Créditos financiados</h3>
                    <CreditCard className="result-icon" />
                  </div>
                  <p className="result-value">{numeroCreditosSimulados}</p>
                  <p className="result-label">microcréditos totales</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Beneficiarios</h3>
                    <Users className="result-icon" />
                  </div>
                  <p className="result-value">{numeroBeneficiarios}</p>
                  <p className="result-label">emprendedores apoyados</p>
                </div>
              </div>
              
              {/* Sección de impacto */}
              <div className="impact-section">
                <h3 className="subsection-title">Distribución sectorial de inversión</h3>
                <div className="sector-distribution">
                  {sectorDistribution.map((item, index) => (
                    <div className="sector-item" key={index}>
                      <div className="sector-info">
                        <span className="sector-name">{item.sector}</span>
                        <span className="sector-percentage">{Math.round(item.porcentaje)}%</span>
                      </div>
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{width: `${item.porcentaje}%`, backgroundColor: getColorForSector(item.sector)}}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="impact-note">
                <Award className="note-icon" />
                <div>
                  <h3>Impacto social de tu inversión</h3>
                  <p>Con una inversión de {formatCurrency(montoInversion)} podrías ayudar a financiar aproximadamente {numeroBeneficiarios} emprendedores y sus familias, contribuyendo directamente a la inclusión financiera.</p>
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="primary-button">
                  Invertir con estos parámetros
                </button>
                <button className="secondary-button" onClick={handleShareResults}>
                  <Share2 size={16} />
                  <span>Compartir simulación</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Modo Prestatario */}
        {activeTab === 'prestatario' && (
          <div className="calculator-panel">
            <div className="panel-section">
              <h2 className="section-title">
                <CreditCard size={18} />
                <span>Configuración de crédito</span>
              </h2>
              
              {/* Monto deseado */}
              <div className="form-group">
                <div className="form-group-header">
                  <label>Monto deseado (COP)</label>
                  <span className="value-display">{formatCurrency(montoDeseado)}</span>
                </div>
                <div className="slider-container">
                  <input 
                    type="range" 
                    min="200000" 
                    max="3000000" 
                    step="100000" 
                    value={montoDeseado}
                    onChange={(e) => setMontoDeseado(Number(e.target.value))}
                    className="slider"
                  />
                  <div className="slider-labels">
                    <span>$200,000</span>
                    <span>$3,000,000</span>
                  </div>
                </div>
              </div>
              
              {/* Plazo deseado */}
              <div className="form-group">
                <label>Plazo deseado (meses)</label>
                <div className="toggle-buttons">
                  {[3, 6, 12, 18, 24].map((plazo) => (
                    <button
                      key={plazo}
                      className={`toggle-button ${plazoDeseado === plazo ? 'active' : ''}`}
                      onClick={() => setPlazoDeseado(plazo)}
                    >
                      {plazo}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Score Luka */}
              <div className="form-group">
                <div className="form-group-header">
                  <label>Tu Score Luka actual</label>
                  <span className="value-display">{scoreLuka}/100</span>
                </div>
                <div className="score-container">
                  <div className="score-bar">
                    <div 
                      className={`score-fill ${
                        scoreLuka >= 90 ? 'excellent' : 
                        scoreLuka >= 80 ? 'good' : 
                        scoreLuka >= 70 ? 'medium' : 'low'
                      }`}
                      style={{width: `${scoreLuka}%`}}
                    ></div>
                  </div>
                  <div className="score-labels">
                    <span className="score-label low">Bajo</span>
                    <span className="score-label medium">Medio</span>
                    <span className="score-label good">Alto</span>
                    <span className="score-label excellent">Excelente</span>
                  </div>
                </div>
              </div>
              
              <button className="simulate-button" onClick={handleSimulate}>
                <RefreshCw size={18} />
                <span>Calcular mi préstamo</span>
              </button>
            </div>
            
            {/* Resultados */}
            <div className="panel-section results-section">
              <h2 className="section-title">
                <BarChart size={18} />
                <span>Detalles de tu préstamo</span>
              </h2>
              
              <div className="results-grid">
                <div className="result-card highlighted">
                  <div className="result-header">
                    <h3>Cuota mensual</h3>
                    <Calculator className="result-icon" />
                  </div>
                  <p className="result-value">{formatCurrency(cuotaMensual)}</p>
                  <p className="result-label">{plazoDeseado} cuotas</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Tasa de interés</h3>
                    <TrendingUp className="result-icon" />
                  </div>
                  <p className="result-value">{(tasaEstimada * 100).toFixed(1)}%</p>
                  <p className="result-label">anual</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Total a pagar</h3>
                    <Wallet className="result-icon" />
                  </div>
                  <p className="result-value">{formatCurrency(totalPagar)}</p>
                  <p className="result-label">capital + intereses</p>
                </div>
                
                <div className="result-card">
                  <div className="result-header">
                    <h3>Probabilidad de aprobación</h3>
                    <Award className="result-icon" />
                  </div>
                  <p className="result-value">{probabilidadAprobacion}%</p>
                  <p className="result-label">con tu score actual</p>
                </div>
              </div>
              
              {/* Gráfico de distribución */}
              <div className="payment-breakdown">
                <h3 className="subsection-title">Desglose de pagos</h3>
                <div className="payment-chart">
                  <div className="chart-bar">
                    <div 
                      className="bar-segment capital"
                      style={{width: `${(montoDeseado / totalPagar) * 100}%`}}
                    ></div>
                    <div 
                      className="bar-segment interest"
                      style={{width: `${((totalPagar - montoDeseado) / totalPagar) * 100}%`}}
                    ></div>
                  </div>
                  <div className="chart-legend">
                    <div className="legend-item">
                      <span className="legend-color capital"></span>
                      <span>Capital: {formatCurrency(montoDeseado)}</span>
                    </div>
                    <div className="legend-item">
                      <span className="legend-color interest"></span>
                      <span>Intereses: {formatCurrency(totalPagar - montoDeseado)}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="improvement-tips">
                <div className="tip-header">
                  <TrendingUp className="tip-icon" />
                  <h3>Cómo mejorar tu crédito</h3>
                </div>
                <p className="tip-description">Si mejoras tu score a 90+ podrías:</p>
                <div className="tip-benefits">
                  <div className="benefit-item">
                    <span className="benefit-value">14%</span>
                    <span className="benefit-label">Tasa de interés</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-value">+{formatCurrency(montoMaximo - montoDeseado)}</span>
                    <span className="benefit-label">Monto máximo</span>
                  </div>
                  <div className="benefit-item">
                    <span className="benefit-value">95%</span>
                    <span className="benefit-label">Prob. aprobación</span>
                  </div>
                </div>
                <ul className="improvement-list">
                  <li>Paga tus créditos actuales a tiempo</li>
                  <li>Mantén bajos saldos en tarjetas de crédito</li>
                  <li>Evita solicitar múltiples créditos en corto tiempo</li>
                </ul>
              </div>
              
              <div className="action-buttons">
                <button className="primary-button">
                  Solicitar este préstamo
                </button>
                <button className="secondary-button" onClick={handleShareResults}>
                  <Share2 size={16} />
                  <span>Compartir simulación</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="bottom-nav">
        <Link to="/home" className="nav-item">
          <Home size={20} />
          <span>Inicio</span>
        </Link>
        <Link to="/dashboard" className="nav-item">
          <BarChart2 size={20} />
          <span>Dashboard</span>
        </Link>
        <Link to="/calculadora" className="nav-item active">
          <Calculator size={20} />
          <span>Calculadora</span>
        </Link>
        <Link to="/perfil" className="nav-item">
          <User size={20} />
          <span>Perfil</span>
        </Link>
      </nav>
      
      {/* Modales */}
      {shareModalOpen && (
        <div className="modal-overlay" onClick={() => setShareModalOpen(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Compartir simulación</h3>
              <button className="close-button" onClick={() => setShareModalOpen(false)}>×</button>
            </div>
            <div className="modal-content">
              <p>Comparte los resultados de tu simulación:</p>
              <div className="share-options">
                <button className="share-option">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#25D366">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>WhatsApp</span>
                </button>
                <button className="share-option">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#3b5998">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
                <button className="share-option">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="#1DA1F2">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 9.99 9.99 0 01-3.127 1.195c-.899-.96-2.18-1.56-3.591-1.56-2.724 0-4.917 2.210-4.917 4.93 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617a9.99 9.99 0 002.46-2.548l-.047-.02z"/>
                  </svg>
                  <span>Twitter</span>
                </button>
              </div>
              <div className="share-link">
                <label>Enlace para compartir:</label>
                <div className="link-container">
                  <input 
                    type="text" 
                    readOnly 
                    value={`https://luka.co/calculadora/?mode=${activeTab}&amount=${activeTab === 'inversionista' ? montoInversion : montoDeseado}&term=${activeTab === 'inversionista' ? plazoPreferido : plazoDeseado}`} 
                    className="link-input"
                  />
                  <button className="copy-button">Copiar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {helpModalOpen && (
        <div className="modal-overlay" onClick={() => setHelpModalOpen(false)}>
          <div className="modal-container help-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Ayuda de la Calculadora</h3>
              <button className="close-button" onClick={() => setHelpModalOpen(false)}>×</button>
            </div>
            <div className="modal-content">
              <div className="help-section">
                <h4>Modo Inversionista</h4>
                <p>Esta calculadora te permite simular el rendimiento de tu inversión en microcréditos:</p>
                <ul>
                  <li><strong>Monto a invertir:</strong> Cantidad que deseas destinar a microcréditos.</li>
                  <li><strong>Plazo preferido:</strong> Duración promedio de tus inversiones.</li>
                  <li><strong>Score mínimo:</strong> Calidad crediticia mínima que aceptas para tus prestatarios.</li>
                </ul>
                <p>Los resultados muestran la rentabilidad esperada y el impacto social de tu inversión.</p>
              </div>
              <div className="help-section">
                <h4>Modo Prestatario</h4>
                <p>Te permite calcular las condiciones de un posible préstamo:</p>
                <ul>
                  <li><strong>Monto deseado:</strong> Cantidad de dinero que necesitas.</li>
                  <li><strong>Plazo deseado:</strong> Tiempo en el que planeas devolverlo.</li>
                  <li><strong>Score Luka:</strong> Tu calificación crediticia actual en nuestra plataforma.</li>
                </ul>
                <p>Los resultados muestran la cuota mensual, tasa de interés y probabilidad de aprobación.</p>
              </div>
              <div className="disclaimer">
                <strong>Nota:</strong> Esta calculadora proporciona estimaciones basadas en datos históricos y condiciones actuales. Los resultados reales pueden variar.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Función auxiliar para obtener colores según el sector
const getColorForSector = (sector) => {
  switch(sector) {
    case 'Comercio': return '#3498db';
    case 'Servicios': return '#2ecc71';
    case 'Manufactura': return '#e74c3c';
    case 'Agricultura': return '#f39c12';
    default: return '#95a5a6';
  }
};

export default CalculadoraMicrocreditos;