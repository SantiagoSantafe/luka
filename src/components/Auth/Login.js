import React, { useState, useEffect } from 'react';
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
  input: {
    width: '100%',
    padding: '0.75rem 1rem',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    fontSize: '0.95rem',
    marginBottom: '1rem'
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
  divider: {
    display: 'flex',
    alignItems: 'center',
    margin: '1.5rem 0',
    color: '#999'
  },
  dividerLine: {
    flex: 1,
    height: '1px',
    backgroundColor: '#e0e0e0'
  },
  dividerText: {
    padding: '0 10px',
    fontSize: '0.9rem'
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.75rem 0',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    backgroundColor: '#ffffff',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    marginBottom: '0.75rem'
  },
  socialIcon: {
    width: '24px',
    height: '24px',
    marginRight: '12px'
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
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    fontSize: '0.9rem',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#333'
  },
  passwordContainer: {
    position: 'relative'
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#999',
    cursor: 'pointer'
  },
  checkbox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  checkboxInput: {
    marginRight: '0.5rem',
    width: '18px',
    height: '18px'
  }
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showUserTypeSelector, setShowUserTypeSelector] = useState(false);
  const [userType, setUserType] = useState('');
  const [errors, setErrors] = useState({});

  // Cargar el correo electrónico recordado si existe
  useEffect(() => {
    // Solo cargamos el correo recordado
    const rememberedUser = localStorage.getItem('rememberUser');
    if (rememberedUser) {
      setEmail(rememberedUser);
      setRememberMe(true);
    }
    
    // No verificamos sesión activa al cargar el componente
    // para permitir que se muestre siempre la pantalla de login
  }, []);

  const validateForm = () => {
    const formErrors = {};
    
    if (!email.trim()) {
      formErrors.email = "El correo electrónico es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Formato de correo electrónico inválido";
    }
    
    if (!password) {
      formErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 6) {
      formErrors.password = "La contraseña debe tener al menos 6 caracteres";
    }
    
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    
    // Validar el formulario antes de proceder
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    // Verificamos primero si el usuario ya tiene un tipo guardado
    const savedUserType = localStorage.getItem('userType');
    
    // Simulación de autenticación exitosa
    // En una aplicación real, aquí iría la llamada a la API de autenticación
    setTimeout(() => {
      // Si ya tiene un tipo de usuario guardado, lo redirigimos directamente
      if (savedUserType) {
        if (savedUserType === 'inversionista') {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard/inversionista');
        } else if (savedUserType === 'prestatario') {
          localStorage.setItem('isLoggedIn', 'true');
          navigate('/dashboard/prestatario');
        }
      } else {
        // Si no tiene un tipo guardado, mostrar el selector
        setShowUserTypeSelector(true);
      }
      setLoading(false);
    }, 1500);
  };

  const handleUserTypeSelection = (type) => {
    setUserType(type);
    
    // Si seleccionó un tipo, quitar el error
    if (errors.userType) {
      const newErrors = {...errors};
      delete newErrors.userType;
      setErrors(newErrors);
    }
  };

  const handleCompletarIngreso = () => {
    if (!userType) {
      setErrors({ ...errors, userType: "Debes seleccionar un tipo de usuario" });
      return;
    }
    
    setLoading(true);
    
    // Guardar información del usuario
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', userType);
    
    if (rememberMe) {
      localStorage.setItem('rememberUser', email);
    } else {
      localStorage.removeItem('rememberUser');
    }
    
    // Redirigir según el tipo de usuario
    setTimeout(() => {
      if (userType === 'inversionista') {
        navigate('/dashboard/inversionista');
      } else if (userType === 'prestatario') {
        navigate('/dashboard/prestatario');
      }
      setLoading(false);
    }, 1000);
  };

  // Función para limpiar el tipo de usuario guardado
  const handleClearUserType = () => {
    // Solo eliminamos el tipo de usuario, mantenemos la sesión y recordatorio de email
    localStorage.removeItem('userType');
    setUserType('');
  };

  // Componente para selector de tipo de usuario
  const UserTypeSelector = () => {
    // Verificar si ya tenemos un tipo guardado para mostrarlo como sugerencia
    const savedUserType = localStorage.getItem('userType');
    
    useEffect(() => {
      // Inicializar el tipo de usuario con el valor guardado (si existe)
      if (savedUserType && !userType) {
        setUserType(savedUserType);
      }
    }, []);
    
    return (
      <div style={styles.typeSelector} className="user-type-selector">
        <h2 style={{fontSize: '1.3rem', fontWeight: '600', textAlign: 'center', marginBottom: '0.5rem'}}>
          ¿Cómo quieres ingresar?
        </h2>
        <p style={{fontSize: '0.95rem', color: '#666', textAlign: 'center', marginBottom: '1.5rem'}}>
          Selecciona tu perfil para continuar
        </p>
        
        {savedUserType && (
          <div style={{marginBottom: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#666'}}>
            <p>Tienes guardado el perfil: <strong>{savedUserType === 'inversionista' ? 'Inversionista' : 'Prestatario'}</strong></p>
            <button 
              onClick={handleClearUserType}
              style={{
                color: '#004d66',
                background: 'none',
                border: 'none',
                fontSize: '0.9rem',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Usar otro perfil
            </button>
          </div>
        )}
        
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
              <p style={styles.optionDescription}>Accede a tu portafolio de inversiones</p>
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
              <p style={styles.optionDescription}>Gestiona tus créditos y pagos</p>
            </div>
          </button>
        </div>
        
        {errors.userType && (
          <div style={styles.errorMessage} className="error-message">
            {errors.userType}
          </div>
        )}
        
        <button 
          style={{
            ...styles.primaryButton,
            opacity: loading ? 0.7 : 1,
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
          className="primary-button"
          onClick={handleCompletarIngreso}
          disabled={loading}
        >
          {loading ? 'Procesando...' : 'Continuar'}
        </button>
      </div>
    );
  };

  // Renderizado condicional basado en el estado de autenticación
  if (showUserTypeSelector) {
    return (
      <div style={styles.container} className="auth-container">
        <div style={styles.logo} className="auth-logo-container">
          <div style={styles.logoIcon} className="auth-logo">
            <span>L</span>
          </div>
          <h1 style={styles.logoText} className="auth-logo-text">luka</h1>
        </div>
        
        <div style={styles.content} className="auth-content">
          <UserTypeSelector />
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
        </div>
        
        <div style={styles.terms} className="auth-terms">
          <p>
            Al iniciar sesión, aceptas nuestros <a href="#" style={styles.link} className="auth-link">Términos y Condiciones</a> y <a href="#" style={styles.link} className="auth-link">Política de Privacidad</a>
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
  }

  // Pantalla de login normal
  return (
    <div style={styles.container} className="auth-container">
      <div style={styles.logo} className="auth-logo-container">
        <div style={styles.logoIcon} className="auth-logo">
          <span>L</span>
        </div>
        <h1 style={styles.logoText} className="auth-logo-text">luka</h1>
      </div>
      
      <div style={styles.content} className="auth-content">
        <h1 style={styles.title} className="auth-title">Bienvenido a Luka</h1>
        <p style={styles.message} className="auth-message">
          Invierte en microcréditos con impacto social y rentabilidad
        </p>
        
        <form style={{width: '100%'}} onSubmit={handleLogin}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="email">Correo electrónico</label>
            <input 
              type="email" 
              id="email"
              style={styles.input}
              className="form-input"
              placeholder="nombre@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && (
              <div style={styles.errorMessage} className="error-message">
                {errors.email}
              </div>
            )}
          </div>
          
          <div style={styles.formGroup}>
            <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem'}}>
              <label style={styles.label} htmlFor="password">Contraseña</label>
              <Link to="/forgot-password" style={styles.link}>¿Olvidaste tu contraseña?</Link>
            </div>
            <div style={styles.passwordContainer}>
              <input 
                type={showPassword ? "text" : "password"}
                id="password"
                style={styles.input}
                className="form-input"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button 
                type="button"
                style={styles.passwordToggle}
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && (
              <div style={styles.errorMessage} className="error-message">
                {errors.password}
              </div>
            )}
          </div>
          
          <div style={styles.checkbox}>
            <input 
              type="checkbox" 
              id="remember-me"
              style={styles.checkboxInput}
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="remember-me" style={{fontSize: '0.9rem'}}>Recordar mi cuenta</label>
          </div>
          
          <button 
            type="submit" 
            style={{
              ...styles.primaryButton,
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
            className="primary-button"
            disabled={loading}
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </button>
        </form>
        
        <div style={styles.divider}>
          <div style={styles.dividerLine}></div>
          <span style={styles.dividerText}>o</span>
          <div style={styles.dividerLine}></div>
        </div>
        
        <div style={{width: '100%', display: 'flex', flexDirection: 'column', gap: '0.75rem'}}>
          <button 
            style={{...styles.socialButton, backgroundColor: '#212121', color: 'white', border: 'none'}} 
            className="social-button apple" 
            onClick={handleLogin}
            disabled={loading}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M16.05 7.55C16.67 6.8 17.07 5.81 16.94 4.81C16.05 4.87 14.9 5.42 14.25 6.17C13.66 6.85 13.17 7.87 13.33 8.81C14.34 8.9 15.42 8.29 16.05 7.55ZM18.14 15.93C18.18 13.83 19.97 12.96 20.06 12.91C18.87 11.16 17.11 10.92 16.47 10.88C14.94 10.72 13.5 11.78 12.72 11.78C11.93 11.78 10.74 10.9 9.47 10.93C7.85 10.96 6.36 11.9 5.53 13.36C3.87 16.32 5.12 20.7 6.73 23.04C7.53 24.2 8.47 25.48 9.69 25.43C10.88 25.38 11.36 24.65 12.79 24.65C14.22 24.65 14.66 25.43 15.91 25.4C17.2 25.38 18 24.25 18.78 23.09C19.5 22.08 19.89 21.1 19.91 21.03C19.87 21.02 18.15 20.3 18.14 15.93Z" />
            </svg>
            Continuar con Apple
          </button>
          
          <button 
            style={styles.socialButton} 
            className="social-button google" 
            onClick={handleLogin}
            disabled={loading}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" width="24" height="24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continuar con Google
          </button>
          
          <button 
            style={styles.socialButton} 
            className="social-button facebook" 
            onClick={handleLogin}
            disabled={loading}
          >
            <svg style={styles.socialIcon} viewBox="0 0 24 24" width="24" height="24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            Continuar con Facebook
          </button>
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
            ¿No tienes una cuenta? <Link to="/register" style={styles.link} className="auth-link">Regístrate</Link>
          </p>
        </div>
      </div>
      
      <div style={styles.terms} className="auth-terms">
        <p>
          Al iniciar sesión, aceptas nuestros <a href="#" style={styles.link} className="auth-link">Términos y Condiciones</a> y <a href="#" style={styles.link} className="auth-link">Política de Privacidad</a>
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

export default Login;