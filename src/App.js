import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importar componentes
import Login from './components/Auth/Login';
// Asegúrate de que estos componentes existan o ajusta las rutas según sea necesario
import DashboardInversionista from './components/DashboardInversionista/DashboardInversionista';
import DashboardPrestatario from './components/DashboardPrestatario/DashboardPrestatario';
import ConfiguracionAvanzada from './components/ConfiguracionAvanzada/ConfiguracionAvanzada';
import NotFound from './components/NotFound'; // Componente para ruta no encontrada

// Componente de protección de rutas
const ProtectedRoute = ({ allowedType, children }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUserType = localStorage.getItem('userType');
  
  if (!isLoggedIn) {
    // Si no está logueado, redirigir al login
    return <Navigate to="/login" replace />;
  }
  
  if (allowedType && currentUserType !== allowedType) {
    // Si está intentando acceder a un dashboard que no le corresponde, redirigir al correcto
    return <Navigate to={`/dashboard/${currentUserType}`} replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        
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
        
        {/* Rutas protegidas - Configuración (accesible por ambos tipos) */}
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
    </Router>
  );
}

export default App;
