import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../App';
import './UserTypeSelection.css';

const UserTypeSelection = () => {
  const { setUserType } = useAuth();
  const navigate = useNavigate();

  const handleTypeSelection = (type) => {
    setUserType(type);
    navigate(`/dashboard/${type}`);
  };

  return (
    <div className="user-type-container">
      <div className="user-type-card">
        <div className="logo-container">
          <div className="logo">
            <span>L</span>
          </div>
          <h1 className="logo-text">luka</h1>
        </div>
        
        <h2 className="selection-title">¿Cómo quieres usar Luka?</h2>
        <p className="selection-subtitle">Selecciona el tipo de usuario para continuar</p>
        
        <div className="user-type-options">
          <button 
            className="user-type-option" 
            onClick={() => handleTypeSelection('inversionista')}
          >
            <div className="option-icon investor-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M2 12h20M17 19a5 5 0 0 0-10 0"></path>
              </svg>
            </div>
            <div className="option-details">
              <h3>Inversionista</h3>
              <p>Invierte tu dinero y obtén rendimientos</p>
            </div>
          </button>
          
          <button 
            className="user-type-option" 
            onClick={() => handleTypeSelection('prestatario')}
          >
            <div className="option-icon borrower-icon">
              <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <line x1="6" y1="12" x2="6" y2="12"></line>
                <line x1="10" y1="12" x2="10" y2="12"></line>
              </svg>
            </div>
            <div className="option-details">
              <h3>Prestatario</h3>
              <p>Solicita microcréditos para tus necesidades</p>
            </div>
          </button>
        </div>
        
        <div className="type-selection-footer">
          <p>Podrás cambiar esta configuración más adelante si lo necesitas</p>
        </div>
      </div>
    </div>
  );
};

export default UserTypeSelection;

