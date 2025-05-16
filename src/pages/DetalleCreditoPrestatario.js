import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, DollarSign } from 'lucide-react';
import CalendarioPagos from '../components/CalendarioPagos/CalendarioPagos';
import './DetalleCreditoPrestatario.css';

const DetalleCreditoPrestatario = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [mostrarCalendario, setMostrarCalendario] = useState(true); // ya visible

  // Simulación de cuotas pagadas
  const cuotasPagadas = [
    '2024-03-15',
    '2024-04-15',
    // Puedes simular más aquí
  ];

  return (
    <div className="detalle-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Volver
      </button>

      <h1>Detalle del Crédito #{id}</h1>

      <button className="ver-mas-btn" onClick={() => setMostrarCalendario(!mostrarCalendario)}>
        {mostrarCalendario ? 'Ocultar calendario' : 'Ver más'}
      </button>

      {mostrarCalendario && (
        <CalendarioPagos
          año={2024}
          mes={4} // mayo (indexado desde 0)
          cuotasPagadas={cuotasPagadas}
        />
      )}

      <section className="acciones-pago">
        <button className="pago-button">
          <DollarSign size={18} /> Pagar desde billetera
        </button>
      </section>

      <section className="calculadora-section">
        <h2>Calculadora de Interés por Pago Anticipado</h2>
        <p>🧮 Esta calculadora te muestra cuánto podrías ahorrar si cancelas anticipadamente.</p>
        <p><strong>Ejemplo:</strong> Si pagas hoy, ahorrarías $320.000 en intereses.</p>
      </section>
    </div>
  );
};

export default DetalleCreditoPrestatario;