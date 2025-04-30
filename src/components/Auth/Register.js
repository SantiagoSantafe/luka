import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

// Estilos en línea como fallback si el CSS no carga correctamente
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    padding: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial, sans-serif'
  },
  content: {
    width: '100%',
    maxWidth: '400px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem'
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    justifyContent: 'center'
  },
  logoIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: '#004d66',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '0.5rem',
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: '1.25rem'
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#004d66',
    margin: 0
  },
  title: {
    fontSize: '1.75rem',
    fontWeight: '700',
    marginBottom: '0.75rem',
    color: '#333',
    textAlign: 'center'
  },
  message: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#666',
    fontSize: '0.95rem'
  },
  typeSelector: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  optionsContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem'
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    padding: '1.25rem',
    backgroundColor: '#ffffff',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textAlign: 'left',
    width: '100%'
  },
  optionSelected: {
    borderColor: '#004d66',
    backgroundColor: 'rgba(0, 77, 102, 0.08)'
  },
  optionIcon: {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '1rem',
    flexShrink: 0,
    backgroundColor: 'rgba(0, 77, 102, 0.1)',
    color: '#004d66'
  },
  optionContent: {
    flex: 1
  },
  optionTitle: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '0.25rem',
    color: '#333'
  },
  optionDescription: {
    fontSize: '0.9rem',
    color: '#666',
    margin: 0
  },
  primaryButton: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    backgroundColor: '#004d66',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    marginTop: '1rem'
  },
  secondaryButton: {
    width: '100%',
    padding: '0.75rem 1.5rem',
    backgroundColor: 'transparent',
    color: '#004d66',
    border: '1px solid #004d66',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    marginTop: '1rem'
  },
  buttonGroup: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1.5rem'
  },
  footer: {
    marginTop: '1.5rem',
    textAlign: 'center',
    fontSize: '0.9rem',
    color: '#666'
  },
  link: {
    color: '#004d66',
    textDecoration: 'none',
    fontWeight: '500'
  },
  terms: {
    textAlign: 'center',
    fontSize: '0.8rem',
    color: '#999',
    maxWidth: '400px'
  },
  errorMessage: {
    color: '#e53935',
    fontSize: '0.8rem',
    marginTop: '0.5rem',
    textAlign: 'center'
  }
};

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Comenzar en la selección de tipo de usuario para simplificar
  const [registerMethod, setRegisterMethod] = useState('credentials');
  
  // Estado para la selección de tipo de usuario
  const [userType, setUserType] = useState('');
  
  // Estados para formulario de registro (para pasos adicionales)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Validación
  const [errors, setErrors] = useState({});

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    
    // Si seleccionó un tipo, quitar el error
    if (errors.userType) {
      const newErrors = {...errors};
      delete newErrors.userType;
      setErrors(newErrors);
    }
  };

  const handleCompletarRegistro = () => {
    if (!userType) {
      setErrors({ userType: "Debes seleccionar un tipo de usuario" });
      return;
    }
    
    setLoading(true);
    
    // Simulamos el registro exitoso
    setTimeout(() => {
      // Guardamos la información básica del usuario
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userType', userType);
      
      // Redirigimos según el tipo de usuario
      if (userType === 'inversionista') {
        navigate('/dashboard/inversionista');
      } else {
        navigate('/dashboard/prestatario');
      }
      
      setLoading(false);
    }, 1500);
  };

  const handlePreviousStep = () => {
    // Este botón podría volver al paso anterior o a la página de inicio
    navigate('/');
  };
  
  return (
    <div style={styles.container} className="auth-container">
      <div style={styles.logo} className="auth-logo-container">
        <div style={styles.logoIcon} className="auth-logo">
          <span>L</span>
        </div>
        <h1 style={styles.logoText} className="auth-logo-text">luka</h1>
      </div>
      
      <div style={styles.content} className="auth-content">
        <h1 style={styles.title} className="auth-title">Crea tu cuenta</h1>
        <p style={styles.message} className="auth-message">
          Únete a Luka para invertir o solicitar microcréditos con impacto social
        </p>
        
        <div style={styles.typeSelector} className="user-type-selector">
          <h2 style={{fontSize: '1.3rem', fontWeight: '600', textAlign: 'center', marginBottom: '0.5rem'}}>
            ¿Cómo quieres utilizar Luka?
          </h2>
          <p style={{fontSize: '0.95rem', color: '#666', textAlign: 'center', marginBottom: '1.5rem'}}>
            Selecciona tu perfil para continuar
          </p>
          
          <div style={styles.optionsContainer} className="user-type-options">
            <button 
              style={{
                ...styles.option, 
                ...(userType === 'inversionista' ? styles.optionSelected : {})
              }} 
              className={`user-type-option ${userType === 'inversionista' ? 'selected' : ''}`}
              onClick={() => handleUserTypeSelection('inversionista')}
              type="button"
            >
              <div style={{...styles.optionIcon, backgroundColor: 'rgba(0, 77, 102, 0.1)', color: '#004d66'}} className="option-icon investor">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                  <path d="M15 9a3 3 0 1 1-3-3 3 3 0 0 1 3 3z"/>
                  <path d="M6.17 18.89a8 8 0 0 1 11.66 0"/>
                </svg>
              </div>
              <div style={styles.optionContent} className="option-content">
                <h3 style={styles.optionTitle}>Inversionista</h3>
                <p style={styles.optionDescription}>Quiero invertir en microcréditos y obtener rentabilidad</p>
              </div>
            </button>
            
            <button 
              style={{
                ...styles.option, 
                ...(userType === 'prestatario' ? styles.optionSelected : {})
              }}
              className={`user-type-option ${userType === 'prestatario' ? 'selected' : ''}`}
              onClick={() => handleUserTypeSelection('prestatario')}
              type="button"
            >
              <div style={{...styles.optionIcon, backgroundColor: 'rgba(153, 204, 51, 0.1)', color: '#99cc33'}} className="option-icon borrower">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 3v4a1 1 0 0 0 1 1h4"/>
                  <path d="M17 21H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7l5 5v11a2 2 0 0 1-2 2z"/>
                  <path d="M12 17v-6"/>
                  <path d="M9.5 14.5h5"/>
                </svg>
              </div>
              <div style={styles.optionContent} className="option-content">
                <h3 style={styles.optionTitle}>Prestatario</h3>
                <p style={styles.optionDescription}>Necesito solicitar un microcrédito para mi proyecto</p>
              </div>
            </button>
          </div>
          
          {errors.userType && (
            <div style={styles.errorMessage} className="error-message">
              {errors.userType}
            </div>
          )}
          
          <div style={styles.buttonGroup} className="form-buttons">
            <button 
              style={styles.secondaryButton}
              className="secondary-button"
              onClick={handlePreviousStep}
              type="button"
            >
              Atrás
            </button>
            <button 
              style={styles.primaryButton}
              className="primary-button"
              onClick={handleCompletarRegistro}
              disabled={loading}
              type="button"
            >
              {loading ? 'Procesando...' : 'Completar registro'}
            </button>
          </div>
        </div>
        
        {loading && (
          <div className="loading-spinner" style={{
            width: '30px',
            height: '30px',
            border: '3px solid rgba(0, 77, 102, 0.1)',
            borderRadius: '50%',
            borderTopColor: '#004d66',
            animation: 'spin 1s linear infinite',
            margin: '1rem auto'
          }}></div>
        )}
        
        <div style={styles.footer} className="auth-footer">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login" style={styles.link} className="auth-link">Iniciar sesión</Link>
          </p>
        </div>
      </div>
      
      <div style={styles.terms} className="auth-terms">
        <p>
          Al crear una cuenta, aceptas nuestros <a href="#" style={styles.link} className="auth-link">Términos y Condiciones</a> y <a href="#" style={styles.link} className="auth-link">Política de Privacidad</a>
        </p>
      </div>
      
      {/* Animación de keyframes para el spinner */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
};

export default Register;