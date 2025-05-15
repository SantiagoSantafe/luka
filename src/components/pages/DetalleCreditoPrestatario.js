import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, DollarSign, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import './DetalleCreditoPrestatario.css';

const DetalleCreditoPrestatario = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Simulación de calendario de pagos para el crédito específico
  const calendario = [
    { fecha: '2024-03-15', estado: 'pagado' },
    { fecha: '2024-04-15', estado: 'pagado' },
    { fecha: '2024-05-15', estado: 'proximo' },
    { fecha: '2024-06-15', estado: 'pendiente' }
  ];

  return (
    <div className="detalle-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} /> Volver
      </button>

      <h1>Detalle del Crédito #{id}</h1>

      <section className="calendario-pagos">
        <h2><Calendar size={20} /> Calendario de Pagos</h2>
        <div className="calendario-grid">
          {calendario.map((cuota, index) => (
            <div key={index} className={`cuota-card ${cuota.estado}`}>
              <p>{cuota.fecha}</p>
              {cuota.estado === 'pagado' && <CheckCircle />}
              {cuota.estado === 'proximo' && <AlertTriangle />}
              {cuota.estado === 'pendiente' && <XCircle />}
            </div>
          ))}
        </div>
      </section>

      <section className="acciones-pago">
        <button className="pago-button">
          <DollarSign size={18} /> Pagar desde billetera
        </button>
      </section>

      <section className="calculadora-section">
        <h2>Calculadora de Interés por Pago Anticipado</h2>
        <p>🧮 Esta calculadora te muestra cuánto podrías ahorrar si cancelas anticipadamente.</p>
        {/* Aquí insertaremos la lógica real luego */}
        <p><strong>Ejemplo:</strong> Si pagas hoy, ahorrarías $320.000 en intereses.</p>
      </section>
    </div>
  );
};

export default DetalleCreditoPrestatario;