// CalendarioPagos.js
import React from 'react';
import './CalendarioPagos.css';

const diasPorMes = (año, mes) => new Date(año, mes + 1, 0).getDate();
const hoy = new Date();

const obtenerEstadoCuota = (fecha, pagadas) => {
  const hoySinHora = new Date();
  hoySinHora.setHours(0, 0, 0, 0);

  const estaPagada = pagadas.some((p) => p === fecha.toISOString().split('T')[0]);
  if (estaPagada) return 'pagada';
  if (fecha < hoySinHora) return 'vencida';
  return 'proxima';
};

const CalendarioPagos = ({ año, mes, cuotasPagadas }) => {
  const totalDias = diasPorMes(año, mes);
  const primerDia = new Date(año, mes, 1).getDay();

  const celdas = [];
  for (let i = 0; i < primerDia; i++) {
    celdas.push(<div key={'vacio-' + i} className="celda-calendario vacia"></div>);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const fecha = new Date(año, mes, dia);
    const estado = obtenerEstadoCuota(fecha, cuotasPagadas);
    celdas.push(
      <div key={dia} className={`celda-calendario ${estado}`}>
        {dia}
        <div className="detalle-cuota">
          {estado === 'pagada' && '✔'}
          {estado === 'vencida' && '¡Vencida!'}
          {estado === 'proxima' && 'Próxima'}
        </div>
      </div>
    );
  }

  return (
    <div className="contenedor-calendario">
      <h3>Calendario de pagos - {año}/{mes + 1}</h3>
      <div className="rejilla-calendario">
        <div>Lun</div><div>Mar</div><div>Mié</div><div>Jue</div><div>Vie</div><div>Sáb</div><div>Dom</div>
        {celdas}
      </div>
    </div>
  );
};

export default CalendarioPagos;
