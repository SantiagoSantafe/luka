import React from 'react';
import { BrowserRouter as Router, Routes, Route, HashRouter } from 'react-router-dom';

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
import UserTypeSelection from './components/Auth/UserTypeSelection';
import DetalleCreditoPrestatario from './pages/DetalleCreditoPrestatario';

// Importante: Usamos HashRouter en lugar de BrowserRouter para GitHub Pages
// Esto evita problemas con las rutas y no necesita configuración de basename
function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/select-user-type" element={<UserTypeSelection />} />

        {/* Dashboards sin protección */}
        <Route path="/dashboard/inversionista" element={<DashboardInversionista />} />
        <Route path="/dashboard/prestatario" element={<DashboardPrestatario />} />
        <Route path="/dashboard" element={<Home />} />

        {/* Funcionalidades adicionales */}
        <Route path="/billetera" element={<LukaBilletera />} />
        <Route path="/calculadora" element={<CalculadoraMicrocreditos />} />
        <Route path="/configuracion" element={<ConfiguracionAvanzada />} />
        
        {/* Ruta para el detalle de crédito de prestatario */}
        <Route path="/credito/:id" element={<DetalleCreditoPrestatario />} />

        {/* Página 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;