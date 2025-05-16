import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';



const Home = () => {
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [registroCompletado, setRegistroCompletado] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cedulaGuardada = localStorage.getItem('cedula');
    const nombresGuardados = localStorage.getItem('nombres');
  
    if (cedulaGuardada && nombresGuardados) {
      setRegistroCompletado(true);
      setCedula(cedulaGuardada);
      setNombres(nombresGuardados);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cedula || !nombres) {
      alert('Por favor ingresa tu cédula y nombres');
      return;
    }

    localStorage.setItem('cedula', cedula);
    localStorage.setItem('nombres', nombres);
    setRegistroCompletado(true);
  };

  const seleccionarRol = (tipo) => {
    localStorage.setItem('userType', tipo);
    navigate('/dashboard/' + tipo);
  };

  return (
    <div className="home-container">
      <div className="content">
        <h1 className="logo">Luka</h1>
        <p className="tagline">Rompiendo barreras, creando oportunidades</p>

        {!registroCompletado ? (
          <form className="form-section" onSubmit={handleSubmit}>
            <h2 className="form-title">Ingresa para continuar</h2>
            <input
              type="number"
              placeholder="Cédula"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              className="input-field"
            />
            <input
              type="text"
              placeholder="Nombres completos"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="submit-button">Continuar</button>
          </form>
        ) : (
          <div className="selector-section">
            <h2 className="form-title">¿Cómo deseas continuar?</h2>
            <button
              className="cta-button"
              onClick={() => seleccionarRol('prestatario')}
            >
              Ingresar como Prestatario
            </button>
            <button
              className="cta-button"
              onClick={() => seleccionarRol('inversionista')}
            >
              Ingresar como Inversionista
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;