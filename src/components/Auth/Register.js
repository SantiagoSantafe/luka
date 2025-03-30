import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSocialLogin = (provider) => {
    setLoading(true);
    console.log(`Iniciando registro con ${provider}`);
    
    // Simulación de registro exitoso
    setTimeout(() => {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/dashboard');
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <h1 className="auth-title">Regístrate</h1>
        <p className="auth-message">
          ¡Hola! Habilita y acepta los permisos de segundo plano para mejor 
          funcionamiento de tu crédito
        </p>
        
        <div className="social-buttons">
          <button 
            className="social-button apple" 
            onClick={() => handleSocialLogin('Apple')}
            disabled={loading}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/apple-icon.svg`} alt="Apple" className="social-icon" />
            Continue with Apple
          </button>
          
          <button 
            className="social-button google" 
            onClick={() => handleSocialLogin('Google')}
            disabled={loading}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/Google-icon.svg`} alt="Google" className="social-icon" />
            Continue with Google
          </button>
          
          <button 
            className="social-button facebook" 
            onClick={() => handleSocialLogin('Facebook')}
            disabled={loading}
          >
            <img src={`${process.env.PUBLIC_URL}/assets/Facebook_f_logo_(2019).svg`} alt="Facebook" className="social-icon" />
            Continue with Facebook
          </button>
        </div>

        {loading && <div className="loading-indicator">Procesando...</div>}
      </div>
    </div>
  );
};

export default Register;