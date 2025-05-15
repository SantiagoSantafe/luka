import React, { useEffect, useState, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

// Importar componentes principales
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import DashboardInversionista from './components/DashboardInversionista/DashboardInversionista';
import DashboardPrestatario from './components/DashboardPrestatario/DashboardPrestatario';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada/ConfiguracionAvanzada';
import LukaBilletera from './components/BilleteraDigital/LukaBilletera';
import CalculadoraMicrocreditos from './components/CalculadoraMicro/CalculadoraMicrocreditos';
import NotFound from './components/NotFound';
import UserTypeSelection from './components/Auth/UserTypeSelection'; // Nuevo componente para seleccionar tipo de usuario

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
  setUserType: () => {}, // Nueva función para establecer el tipo de usuario
  isLoading: true
});

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  return useContext(AuthContext);
};

// Componente de protección de rutas
const ProtectedRoute = ({ allowedType, children }) => {
  const { isLoggedIn, userType, isLoading } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Si está autenticado pero no tiene tipo de usuario asignado, redirigir a la selección
    if (isLoggedIn && !userType && !isLoading) {
      navigate('/select-user-type');
    }
  }, [isLoggedIn, userType, isLoading, navigate]);
  
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
  
  if (!userType) {
    // Si está logueado pero no tiene tipo de usuario, redirigir a la selección
    return <Navigate to="/select-user-type" replace />;
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
  
  // Función para iniciar sesión (ahora solo establece isLoggedIn, no el tipo de usuario)
  const login = () => {
    localStorage.setItem('isLoggedIn', 'true');
    setIsLoggedIn(true);
  };
  
  // Nueva función separada para establecer el tipo de usuario
  const updateUserType = (type) => {
    localStorage.setItem('userType', type);
    setUserType(type);
  };
  
  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userType'); // Ahora sí eliminamos el tipo de usuario al cerrar sesión
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
    <AuthContext.Provider value={{ 
      isLoggedIn, 
      userType, 
      login, 
      logout, 
      setUserType: updateUserType, 
      isLoading 
    }}>
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
    
    const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password', '/'];
    const isPublicRoute = publicRoutes.some(route => location.pathname.startsWith(route) || location.pathname === route);
    
    // Si está autenticado y está en una ruta pública, redirigir al dashboard o a la selección
    if (isLoggedIn && isPublicRoute && location.pathname !== '/') {
      if (userType) {
        navigate(`/dashboard/${userType}`);
      } else {
        navigate('/select-user-type');
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Ruta de selección de tipo de usuario (después de login) */}
      <Route 
        path="/select-user-type" 
        element={
          isLoggedIn ? <UserTypeSelection /> : <Navigate to="/login" />
        } 
      />
      
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
          isLoggedIn ? 
            userType ? 
              <Navigate to={`/dashboard/${userType}`} replace /> : 
              <Navigate to="/select-user-type" replace /> :
            <Navigate to="/login" replace />
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