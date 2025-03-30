import React, { useState } from 'react';
import './Dashboard.css';

const Dashboard = () => {
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

  return (
    <div className="dashboard-container">
      {/* Header con navegación */}
      <header className="dashboard-header">
        <div className="back-button">
          <span>&#8592;</span>
        </div>
        <h1>Prestatario</h1>
        <div className="menu-button">
          <span>&#9776;</span>
        </div>
      </header>

      {/* Saludo y puntaje crediticio */}
      <section className="greeting-section">
        <h2>¡Buenos días, {userData.name}!</h2>
        
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
            Presiona aquí para ver toda la información sobre tus microcréditos.
          </button>
          <button className="action-button primary">Depositar fondos</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;