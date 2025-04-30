import React from 'react';
import { Link } from 'react-router-dom';

// Estilos en línea
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
    maxWidth: '500px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '2rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    marginBottom: '1.5rem',
    textAlign: 'center'
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
    fontSize: '2rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#333',
    textAlign: 'center'
  },
  message: {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#666',
    fontSize: '1rem'
  },
  errorCode: {
    fontSize: '5rem',
    fontWeight: 'bold',
    color: '#004d66',
    marginBottom: '1rem'
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#004d66',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1rem'
  }
};

const NotFound = () => {
  // Determinar a dónde redirigir según si hay sesión activa
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userType = localStorage.getItem('userType');
  
  const getRedirectPath = () => {
    if (isLoggedIn && userType) {
      return `/dashboard/${userType}`;
    }
    return '/login';
  };

  return (
    <div style={styles.container}>
      <div style={styles.logo}>
        <div style={styles.logoIcon}>
          <span>L</span>
        </div>
        <h1 style={styles.logoText}>luka</h1>
      </div>
      
      <div style={styles.content}>
        <div style={styles.errorCode}>404</div>
        <h1 style={styles.title}>Página no encontrada</h1>
        <p style={styles.message}>
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        
        <Link to={getRedirectPath()} style={styles.button}>
          {isLoggedIn ? 'Volver al Dashboard' : 'Ir al Inicio de Sesión'}
        </Link>
      </div>
    </div>
  );
};

export default NotFound;