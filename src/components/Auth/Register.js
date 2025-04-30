import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [registerMethod, setRegisterMethod] = useState('credentials'); // 'credentials' o 'social'
  
  // Estados para formulario de registro
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  // Validación
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);

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

  const toggleRegisterMethod = () => {
    setRegisterMethod(registerMethod === 'credentials' ? 'social' : 'credentials');
  };

  const validatePassword = (pass) => {
    let strength = 0;
    if (pass.length >= 8) strength += 1;
    if (/[A-Z]/.test(pass)) strength += 1;
    if (/[0-9]/.test(pass)) strength += 1;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 1;
    setPasswordStrength(strength);
    return strength;
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!fullName.trim()) newErrors.fullName = "Nombre completo es requerido";
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) newErrors.email = "Correo electrónico es requerido";
    else if (!emailRegex.test(email)) newErrors.email = "Correo electrónico inválido";
    
    const phoneRegex = /^\d{10}$/;
    if (!phone.trim()) newErrors.phone = "Número de teléfono es requerido";
    else if (!phoneRegex.test(phone.replace(/\D/g, ''))) newErrors.phone = "Teléfono debe tener 10 dígitos";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!password) newErrors.password = "Contraseña es requerida";
    else if (password.length < 8) newErrors.password = "Mínimo 8 caracteres";
    else if (passwordStrength < 3) newErrors.password = "La contraseña debe ser más fuerte";
    
    if (!confirmPassword) newErrors.confirmPassword = "Confirme su contraseña";
    else if (password !== confirmPassword) newErrors.confirmPassword = "Las contraseñas no coinciden";
    
    if (!acceptTerms) newErrors.terms = "Debes aceptar los términos y condiciones";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep2()) {
      setLoading(true);
      
      // Simulación de registro exitoso
      setTimeout(() => {
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/dashboard');
        setLoading(false);
      }, 1500);
    }
  };

  const formatPhoneNumber = (value) => {
    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length <= 3) return phoneNumber;
    if (phoneNumber.length <= 6) return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  return (
    <div className="auth-container">
      <div className="auth-logo-container">
        <div className="auth-logo">
          <span>L</span>
        </div>
        <h1 className="auth-logo-text">luka</h1>
      </div>
      
      <div className="auth-content">
        <h1 className="auth-title">Crea tu cuenta</h1>
        <p className="auth-message">
          Únete a Luka para invertir o solicitar microcréditos con impacto social
        </p>
        
        {registerMethod === 'credentials' ? (
          <>
            <div className="progress-steps">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>1</div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>2</div>
            </div>
            
            <form className="auth-form" onSubmit={handleSubmit}>
              {currentStep === 1 ? (
                <>
                  <div className="form-group">
                    <label htmlFor="fullName">Nombre completo</label>
                    <input 
                      type="text" 
                      id="fullName"
                      className={`form-input ${errors.fullName ? 'input-error' : ''}`}
                      placeholder="Nombre y apellidos"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input 
                      type="email" 
                      id="email"
                      className={`form-input ${errors.email ? 'input-error' : ''}`}
                      placeholder="nombre@ejemplo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Número de teléfono</label>
                    <input 
                      type="tel" 
                      id="phone"
                      className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      placeholder="123-456-7890"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={12}
                    />
                    {errors.phone && <div className="error-message">{errors.phone}</div>}
                  </div>
                  
                  <button 
                    type="button" 
                    className="primary-button"
                    onClick={nextStep}
                  >
                    Continuar
                  </button>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <div className="password-input-container">
                      <input 
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className={`form-input ${errors.password ? 'input-error' : ''}`}
                        placeholder="Mínimo 8 caracteres"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                      <button 
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? 
                          <span className="eye-icon">👁️</span> : 
                          <span className="eye-icon">👁️‍🗨️</span>
                        }
                      </button>
                    </div>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                    
                    <div className="password-strength-meter">
                      <div className={`strength-bar ${passwordStrength >= 1 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 2 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 3 ? 'active' : ''}`}></div>
                      <div className={`strength-bar ${passwordStrength >= 4 ? 'active' : ''}`}></div>
                    </div>
                    <div className="strength-text">
                      {passwordStrength === 0 && "Muy débil"}
                      {passwordStrength === 1 && "Débil"}
                      {passwordStrength === 2 && "Media"}
                      {passwordStrength === 3 && "Fuerte"}
                      {passwordStrength === 4 && "Muy fuerte"}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="confirmPassword">Confirmar contraseña</label>
                    <div className="password-input-container">
                      <input 
                        type={showConfirmPassword ? "text" : "password"}
                        id="confirmPassword"
                        className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                        placeholder="Confirma tu contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      <button 
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? 
                          <span className="eye-icon">👁️</span> : 
                          <span className="eye-icon">👁️‍🗨️</span>
                        }
                      </button>
                    </div>
                    {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
                  </div>
                  
                  <div className="form-checkbox">
                    <input 
                      type="checkbox" 
                      id="accept-terms"
                      checked={acceptTerms}
                      onChange={() => setAcceptTerms(!acceptTerms)}
                    />
                    <label htmlFor="accept-terms">
                      Acepto los <a href="#" className="auth-link">Términos y Condiciones</a> y la <a href="#" className="auth-link">Política de Privacidad</a>
                    </label>
                    {errors.terms && <div className="error-message">{errors.terms}</div>}
                  </div>
                  
                  <div className="form-buttons">
                    <button 
                      type="button" 
                      className="secondary-button back-button"
                      onClick={prevStep}
                    >
                      Atrás
                    </button>
                    <button 
                      type="submit" 
                      className="primary-button"
                      disabled={loading}
                    >
                      {loading ? 'Procesando...' : 'Crear cuenta'}
                    </button>
                  </div>
                </>
              )}
            </form>
            
            <div className="auth-divider">
              <span>o</span>
            </div>
            
            <button 
              className="secondary-button toggle-auth"
              onClick={toggleRegisterMethod}
            >
              Registrarse con redes sociales
            </button>
          </>
        ) : (
          <>
            <div className="social-buttons">
              <button 
                className="social-button apple" 
                onClick={() => handleSocialLogin('Apple')}
                disabled={loading}
              >
                <svg className="social-icon apple" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M16.05 7.55C16.67 6.8 17.07 5.81 16.94 4.81C16.05 4.87 14.9 5.42 14.25 6.17C13.66 6.85 13.17 7.87 13.33 8.81C14.34 8.9 15.42 8.29 16.05 7.55ZM18.14 15.93C18.18 13.83 19.97 12.96 20.06 12.91C18.87 11.16 17.11 10.92 16.47 10.88C14.94 10.72 13.5 11.78 12.72 11.78C11.93 11.78 10.74 10.9 9.47 10.93C7.85 10.96 6.36 11.9 5.53 13.36C3.87 16.32 5.12 20.7 6.73 23.04C7.53 24.2 8.47 25.48 9.69 25.43C10.88 25.38 11.36 24.65 12.79 24.65C14.22 24.65 14.66 25.43 15.91 25.4C17.2 25.38 18 24.25 18.78 23.09C19.5 22.08 19.89 21.1 19.91 21.03C19.87 21.02 18.15 20.3 18.14 15.93Z" />
                </svg>
                Continuar con Apple
              </button>
              
              <button 
                className="social-button google" 
                onClick={() => handleSocialLogin('Google')}
                disabled={loading}
              >
                <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continuar con Google
              </button>
              
              <button 
                className="social-button facebook" 
                onClick={() => handleSocialLogin('Facebook')}
                disabled={loading}
              >
                <svg className="social-icon" viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continuar con Facebook
              </button>
            </div>
            
            <div className="auth-divider">
              <span>o</span>
            </div>
            
            <button 
              className="secondary-button toggle-auth"
              onClick={toggleRegisterMethod}
            >
              Registrarse con correo
            </button>
          </>
        )}

        {loading && <div className="loading-spinner"></div>}
        
        <div className="auth-footer">
          <p>¿Ya tienes una cuenta? <Link to="/login" className="auth-link">Iniciar sesión</Link></p>
        </div>
      </div>
      
      <div className="auth-terms">
        <p>
          Al crear una cuenta, aceptas nuestros <a href="#" className="auth-link">Términos y Condiciones</a> y <a href="#" className="auth-link">Política de Privacidad</a>
        </p>
      </div>
    </div>
  );
};

export default Register;