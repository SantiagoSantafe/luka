import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [cedula, setCedula] = useState('');
  const [nombres, setNombres] = useState('');
  const [archivo, setArchivo] = useState(null);
  const [progreso, setProgreso] = useState(0);
  const [subiendo, setSubiendo] = useState(false);
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(() => {
    const tipo = localStorage.getItem('userType');
    if (!tipo) {
      navigate('/select-user-type');
    } else {
      setTipoUsuario(tipo);
    }
  }, [navigate]);

  const handleArchivo = (e) => {
    const file = e.target.files[0];
    if (file) {
      setArchivo(file);
      setSubiendo(true);
      setProgreso(0);

      // Simulación de subida
      const interval = setInterval(() => {
        setProgreso((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setSubiendo(false);
            return 100;
          }
          return prev + 20;
        });
      }, 300);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cedula || !nombres || !archivo) {
      alert('Por favor completa todos los campos y sube el archivo.');
      return;
    }

    // Aquí podrías guardar temporalmente los datos
    localStorage.setItem('cedula', cedula);
    localStorage.setItem('nombres', nombres);

    navigate(`/dashboard/${tipoUsuario}`);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cédula</label>
            <input
              type="number"
              value={cedula}
              onChange={(e) => setCedula(e.target.value)}
              placeholder="Tu número de cédula"
              required
            />
          </div>

          <div className="form-group">
            <label>Nombres completos</label>
            <input
              type="text"
              value={nombres}
              onChange={(e) => setNombres(e.target.value)}
              placeholder="Tus nombres"
              required
            />
          </div>

          <div className="form-group">
            <label>Subir documento de identidad (simulado)</label>
            <input type="file" onChange={handleArchivo} />
            {subiendo && <progress value={progreso} max="100">{progreso}%</progress>}
          </div>

          <button type="submit" className="submit-button">
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;