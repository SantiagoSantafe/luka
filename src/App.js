import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Importar componentes principales
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardInversionista from './components/DashboardInversionista/DashboardInversionista';
import DashboardPrestatario from './components/DashboardPrestatario/DashboardPrestatario';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada/ConfiguracionAvanzada';
import LukaBilletera from './components/BilleteraDigital/LukaBilletera';
import CalculadoraMicrocreditos from './components/CalculadoraMicro/CalculadoraMicrocreditos';
import NotFound from './components/NotFound';

// Determina si estamos en producción (GitHub Pages) o desarrollo
const isProduction = process.env.NODE_ENV === 'production';
// Obtén el nombre del repositorio para el basename en producción
const basename = isProduction ? '/luka-main' : '';

// Contexto de autenticación
export const AuthContext = createContext({
  isLoggedIn: false,
  userType: '',
  login: () => {},
  logout: () => {},
  isLoading: true
});

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente de protección de rutas
const ProtectedRoute = ({ allowedType, children }) => {
  const { isLoggedIn, userType, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  
  if (!isLoggedIn) {
    // Si no está logueado, redirigir al login
    return <Navigate to="/login" replace />;
  }
  
  if (allowedType && userType !== allowedType) {
    // Si está intentando acceder a un dashboard que no le corresponde, redirigir al correcto
    return <Navigate to={`/dashboard/${userType}`} replace />;
  }
  
  return children;
};

// Componente para gestionar la autenticación global
const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [userType, setUserType] = useState(localStorage.getItem('userType') || '');
  const [isLoading, setIsLoading] = useState(true);
  
  // Función para iniciar sesión
  const login = (type) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userType', type);
    setIsLoggedIn(true);
    setUserType(type);
  };
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    // No eliminamos el tipo de usuario para recordarlo en el siguiente inicio de sesión
    setIsLoggedIn(false);
    setUserType('');
  };
  
  // Comprobar el estado de la sesión al cargar
  useEffect(() => {
    // Simulamos una carga de verificación de autenticación
    const timer = setTimeout(() => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setUserType(localStorage.getItem('userType') || '');
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Proporcionar el contexto de autenticación a todos los componentes
  return (
    <AuthContext.Provider value={{ isLoggedIn, userType, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Componente principal para redirigir según el estado de autenticación
const AppContent = () => {
  const { isLoggedIn, userType, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    if (isLoading) return;
    
    const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
    const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route));
    
    // Si está autenticado y está en una ruta pública, redirigir al dashboard
    if (isLoggedIn && isPublicRoute) {
      if (userType) {
        navigate(`/dashboard/${userType}`);
      } else {
        // Si no tiene tipo de usuario definido, se queda en la página para elegir
        // Esto permite que el flujo de selección de tipo de usuario funcione
      }
    }
    
    // Si no está autenticado y no está en una ruta pública, redirigir al login
    if (!isLoggedIn && !isPublicRoute && location.pathname !== '/') {
      navigate('/login');
    }
  }, [isLoggedIn, userType, isLoading, navigate, location.pathname]);
  
  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Rutas protegidas - Dashboard de Inversionista */}
      <Route 
        path="/dashboard/inversionista" 
        element={
          <ProtectedRoute allowedType="inversionista">
            <DashboardInversionista />
          </ProtectedRoute>
        } 
      />
      
      {/* Rutas protegidas - Dashboard de Prestatario */}
      <Route 
        path="/dashboard/prestatario" 
        element={
          <ProtectedRoute allowedType="prestatario">
            <DashboardPrestatario />
          </ProtectedRoute>
        } 
      />
      
      {/* Billetera digital - accesible por ambos tipos de usuario */}
      <Route 
        path="/billetera" 
        element={
          <ProtectedRoute>
            <LukaBilletera />
          </ProtectedRoute>
        } 
      />
      
      {/* Calculadora de Microcréditos - accesible por ambos tipos de usuario */}
      <Route 
        path="/calculadora" 
        element={
          <ProtectedRoute>
            <CalculadoraMicrocreditos />
          </ProtectedRoute>
        } 
      />
      
      {/* Configuración - accesible por ambos tipos de usuario */}
      <Route 
        path="/configuracion" 
        element={
          <ProtectedRoute>
            <ConfiguracionAvanzada />
          </ProtectedRoute>
        } 
      />
      
      {/* Ruta de redirección para dashboards genéricos */}
      <Route 
        path="/dashboard" 
        element={
          <Navigate to={`/dashboard/${localStorage.getItem('userType') || 'inversionista'}`} replace />
        } 
      />
      
      {/* Ruta para páginas no encontradas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <Router basename={basename}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  );
}

export default App;