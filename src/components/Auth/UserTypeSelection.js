import React from 'react';
import { useNavigate } from 'react-router-dom';
import LukaHeader from '../LukaHeader'; // Import the new header component

// Importamos íconos que necesitemos (estos serían de lucide-react o similar)
// Esto se debe ajustar según la biblioteca de íconos que estén usando
const Home = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const User = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const Wallet = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>;
const TrendingUp = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const Calculator = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="2" width="16" height="20" rx="2"></rect><line x1="8" x2="16" y1="6" y2="6"></line><line x1="16" x2="16" y1="14" y2="18"></line><line x1="8" x2="8" y1="14" y2="18"></line><line x1="12" x2="12" y1="14" y2="18"></line><line x1="8" x2="16" y1="14" y2="14"></line><line x1="8" x2="16" y1="10" y2="10"></line><line x1="8" x2="16" y1="18" y2="18"></line></svg>;
const CreditCard = (props) => <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;

// Componente de Selección de Tipo de Usuario mejorado
const UserTypeSelection = () => {
  //const { setUserType } = useAuth();
  const navigate = useNavigate();

  const handleTypeSelection = (type) => {
    localStorage.setItem('userType', type);
    navigate(`/dashboard/${type}`);
  };


  return (
    <div className="user-type-container">
      {/* Implementar el nuevo header con logo */}
      <LukaHeader />

      <div className="user-type-card">
        <h2 className="selection-title">¡Bienvenido a Luka!</h2>
        <p className="selection-subtitle">Selecciona cómo quieres usar la aplicación</p>
        
        <div className="dashboard-options">
          {/* Opción de Inversionista */}
          <div 
            className="dashboard-option"
            onClick={() => handleTypeSelection('inversionista')}
          >
            <div className="option-icon investor-icon">
              <TrendingUp size={28} />
            </div>
            <div className="option-details">
              <h3>Inversionista</h3>
              <p>Invierte tu dinero y obtén rendimientos</p>
            </div>
          </div>
          
          {/* Opción de Prestatario */}
          <div 
            className="dashboard-option"
            onClick={() => handleTypeSelection('prestatario')}
          >
            <div className="option-icon borrower-icon">
              <CreditCard size={28} />
            </div>
            <div className="option-details">
              <h3>Prestatario</h3>
              <p>Solicita microcréditos para tus necesidades</p>
            </div>
          </div>
          
          {/* Opción de Billetera */}
          <div 
            className="dashboard-option"
            onClick={() => navigate('/billetera')}
          >
            <div className="option-icon wallet-icon">
              <Wallet size={28} />
            </div>
            <div className="option-details">
              <h3>Mi Billetera</h3>
              <p>Administra tu saldo, recargas y retiros</p>
            </div>
          </div>
          
          {/* Opción de Calculadora */}
          <div 
            className="dashboard-option"
            onClick={() => navigate('/calculadora')}
          >
            <div className="option-icon calculator-icon">
              <Calculator size={28} />
            </div>
            <div className="option-details">
              <h3>Calculadora</h3>
              <p>Simula créditos e inversiones</p>
            </div>
          </div>
        </div>
        
        <div className="quick-actions">
          <h3>Acciones Rápidas</h3>
          <div className="action-buttons">
            <button className="action-button primary">
              <CreditCard size={18} />
              <span>Solicitar Microcrédito</span>
            </button>
            <button className="action-button secondary">
              <TrendingUp size={18} />
              <span>Invertir Ahora</span>
            </button>
          </div>
        </div>
        
        <div className="type-selection-footer">
          <p>Podrás cambiar de dashboard en cualquier momento desde el inicio</p>
        </div>
      </div>
      
      {/* Barra de navegación inferior */}
      <nav className="bottom-nav">
        <div className="nav-item active">
          <Home size={20} />
          <span>Inicio</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/billetera')}>
          <Wallet size={20} />
          <span>Billetera</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/calculadora')}>
          <Calculator size={20} />
          <span>Calculadora</span>
        </div>
        <div className="nav-item" onClick={() => navigate('/perfil')}>
          <User size={20} />
          <span>Perfil</span>
        </div>
      </nav>
    </div>
  );
};

export default UserTypeSelection;