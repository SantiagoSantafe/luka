import React, { useState } from 'react';
import { 
  Lock, 
  Shield, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Download, 
  Trash2, 
  User, 
  Moon, 
  Sun, 
  Globe, 
  FileText, 
  Clipboard, 
  ChevronRight, 
  Bell, 
  LogOut, 
  AlertTriangle,
  Settings,
  HelpCircle,
  FileCheck
} from 'lucide-react';

import '../LukaHeader.css'; // Importamos los estilos compartidos para el logo

const ConfiguracionAvanzada = () => {
  // Estados para la funcionalidad
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('seguridad');
  
  // Estados para las configuraciones de seguridad
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [authenticatorEnabled, setAuthenticatorEnabled] = useState(false);
  
  // Estados para las configuraciones de privacidad
  const [showInvestmentLevel, setShowInvestmentLevel] = useState(false);
  const [useAnonymousName, setUseAnonymousName] = useState(true);
  const [openBankingAccess, setOpenBankingAccess] = useState(true);
  const [personalInfoUsage, setPersonalInfoUsage] = useState(true);
  const [campaignParticipation, setCampaignParticipation] = useState(false);
  
  // Estados para las configuraciones de personalización
  const [darkMode, setDarkMode] = useState(false);
  const [autoTheme, setAutoTheme] = useState(false);
  const [language, setLanguage] = useState('es');
  const [animationsReduced, setAnimationsReduced] = useState(false);
  
  // Estados para notificaciones
  const [paymentAlerts, setPaymentAlerts] = useState(true);
  const [investmentOpportunities, setInvestmentOpportunities] = useState(true);
  const [scoreUpdates, setScoreUpdates] = useState(false);
  
  // Datos de ejemplo
  const devices = [
    { id: 1, name: 'iPhone 12', date: 'Hoy, 10:30 AM', ip: '192.168.1.5', current: true },
    { id: 2, name: 'MacBook Pro', date: 'Ayer, 8:15 PM', ip: '86.75.30.9', current: false },
    { id: 3, name: 'iPad', date: '23 Abril, 5:45 PM', ip: '45.67.89.01', current: false }
  ];
  
  const documents = [
    { id: 1, title: 'Contrato Marco', date: '15 Mar 2025' },
    { id: 2, title: 'Aviso de Privacidad', date: '20 Feb 2025' },
    { id: 3, title: 'Reglamento Interno', date: '5 Ene 2025' },
    { id: 4, title: 'Términos y Condiciones', date: '10 Abr 2025' }
  ];
  
  const certificates = [
    { id: 1, title: 'Certificado de Inversión (DIAN)' },
    { id: 2, title: 'Certificado de Pagos' },
    { id: 3, title: 'Reporte Anual de Actividades' },
    { id: 4, title: 'Declaración de Impuestos' }
  ];
  
  // Función para cambiar de tema
  const handleThemeChange = (theme) => {
    if (theme === 'dark') {
      setDarkMode(true);
      setAutoTheme(false);
    } else if (theme === 'light') {
      setDarkMode(false);
      setAutoTheme(false);
    } else {
      setAutoTheme(true);
    }
  };
  
  // Renderiza un interruptor (toggle)
  const renderToggle = (value, onChange) => (
    <div 
      className={`w-12 h-6 flex items-center ${value ? 'bg-[#004d66]' : 'bg-gray-200'} rounded-full p-1 cursor-pointer transition-colors duration-300`}
      onClick={() => onChange(!value)}
    >
      <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${value ? 'translate-x-6' : ''}`}></div>
    </div>
  );
  
  return (
    <div className={`flex flex-col h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800'}`}>
      {/* Header con logo actualizado */}
      <header className={`flex items-center justify-between p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}>
        <div className="logo-container">
          <div className="logo">
            <img src="/assets/logoLuka.jpg" alt="Luka Logo" className="logo-image" />
          </div>
          <h1 className="logo-text">luka</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <HelpCircle className="w-5 h-5" />
          </button>
          <button className={`p-2 rounded-full ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-600 hover:bg-gray-100'}`}>
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex items-center mb-4">
            <Settings className="w-5 h-5 mr-2 text-[#004d66]" />
            <h1 className="text-2xl font-bold">Configuración</h1>
          </div>
        </div>
        
        {/* Tabs */}
        <div className={`flex px-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'} overflow-x-auto`}>
          <button 
            className={`py-3 px-4 font-medium whitespace-nowrap ${activeTab === 'seguridad' 
              ? 'text-[#004d66] border-b-2 border-[#004d66]' 
              : darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('seguridad')}
          >
            <Lock className="w-4 h-4 inline mr-1" />
            Seguridad
          </button>
          <button 
            className={`py-3 px-4 font-medium whitespace-nowrap ${activeTab === 'privacidad' 
              ? 'text-[#004d66] border-b-2 border-[#004d66]' 
              : darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('privacidad')}
          >
            <Shield className="w-4 h-4 inline mr-1" />
            Privacidad
          </button>
          <button 
            className={`py-3 px-4 font-medium whitespace-nowrap ${activeTab === 'personalizacion' 
              ? 'text-[#004d66] border-b-2 border-[#004d66]' 
              : darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('personalizacion')}
          >
            <User className="w-4 h-4 inline mr-1" />
            Personalización
          </button>
          <button 
            className={`py-3 px-4 font-medium whitespace-nowrap ${activeTab === 'legal' 
              ? 'text-[#004d66] border-b-2 border-[#004d66]' 
              : darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            onClick={() => setActiveTab('legal')}
          >
            <FileCheck className="w-4 h-4 inline mr-1" />
            Legal
          </button>
        </div>
        
        <div className="p-4">
          {/* Seguridad */}
          {activeTab === 'seguridad' && (
            <div>
              {/* Contenido de seguridad */}
            </div>
          )}
          
          {/* Privacidad */}
          {activeTab === 'privacidad' && (
            <div>
              {/* Contenido de privacidad */}
            </div>
          )}
          
          {/* Personalización */}
          {activeTab === 'personalizacion' && (
            <div>
              <section className="mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Tema Visual
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <button 
                      className={`p-3 rounded-lg flex flex-col items-center ${
                        !darkMode && !autoTheme 
                        ? `bg-blue-50 border-2 border-[#004d66] ${darkMode ? 'text-white' : 'text-gray-800'}` 
                        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border border-gray-200 text-gray-800'}`
                      }`}
                      onClick={() => handleThemeChange('light')}
                    >
                      <Sun className="w-6 h-6 text-[#004d66] mb-2" />
                      <span className="text-sm">Claro</span>
                    </button>
                    
                    <button 
                      className={`p-3 rounded-lg flex flex-col items-center ${
                        darkMode && !autoTheme 
                        ? `bg-blue-50 border-2 border-[#004d66] ${darkMode ? 'text-white' : 'text-gray-800'}` 
                        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border border-gray-200 text-gray-800'}`
                      }`}
                      onClick={() => handleThemeChange('dark')}
                    >
                      <Moon className="w-6 h-6 text-[#004d66] mb-2" />
                      <span className="text-sm">Oscuro</span>
                    </button>
                    
                    <button 
                      className={`p-3 rounded-lg flex flex-col items-center ${
                        autoTheme 
                        ? `bg-blue-50 border-2 border-[#004d66] ${darkMode ? 'text-white' : 'text-gray-800'}` 
                        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border border-gray-200 text-gray-800'}`
                      }`}
                      onClick={() => handleThemeChange('auto')}
                    >
                      <svg className="w-6 h-6 text-[#004d66] mb-2" viewBox="0 0 24 24" fill="none">
                        <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm">Auto</span>
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Animaciones reducidas
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Modo accesibilidad
                      </p>
                    </div>
                    <div>
                      {renderToggle(animationsReduced, setAnimationsReduced)}
                    </div>
                  </div>
                </div>
              </section>
              
              <section className="mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Idioma
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className={`p-3 rounded-lg flex items-center ${
                        language === 'es' 
                        ? `bg-blue-50 border-2 border-[#004d66] ${darkMode ? 'text-white' : 'text-gray-800'}` 
                        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border border-gray-200 text-gray-800'}`
                      }`}
                      onClick={() => setLanguage('es')}
                    >
                      <Globe className="w-5 h-5 text-[#004d66] mr-2" />
                      <span>Español</span>
                    </button>
                    
                    <button 
                      className={`p-3 rounded-lg flex items-center ${
                        language === 'en' 
                        ? `bg-blue-50 border-2 border-[#004d66] ${darkMode ? 'text-white' : 'text-gray-800'}` 
                        : `${darkMode ? 'bg-gray-700 border-gray-600 text-gray-200' : 'bg-gray-100 border border-gray-200 text-gray-800'}`
                      }`}
                      onClick={() => setLanguage('en')}
                    >
                      <Globe className="w-5 h-5 text-[#004d66] mr-2" />
                      <span>English</span>
                    </button>
                  </div>
                  
                  <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-3`}>
                    Próximamente: Portugués, Creole
                  </p>
                </div>
              </section>
              
              <section>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Notificaciones
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Alertas de pago
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Recordatorios de cuotas
                      </p>
                    </div>
                    <div>
                      {renderToggle(paymentAlerts, setPaymentAlerts)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Oportunidades de inversión
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Nuevos créditos disponibles
                      </p>
                    </div>
                    <div>
                      {renderToggle(investmentOpportunities, setInvestmentOpportunities)}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        Actualizaciones de Score
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Cuando hay cambios
                      </p>
                    </div>
                    <div>
                      {renderToggle(scoreUpdates, setScoreUpdates)}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
          
          {/* Legal */}
          {activeTab === 'legal' && (
            <div>
              <section className="mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Documentos Legales
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
                  <div className="space-y-3">
                    {documents.map((document, index) => (
                      <button 
                        key={document.id} 
                        className={`w-full flex justify-between items-center py-3 ${
                          index !== documents.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}` : ''
                        } rounded-lg px-2 hover:bg-gray-50 transition-colors duration-300 ${
                          darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <FileText className="w-5 h-5 text-[#004d66] mr-3" />
                          <div>
                            <span className="font-medium">{document.title}</span>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              Última versión: {document.date}
                            </p>
                          </div>
                        </div>
                        <ChevronRight className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-gray-200' : 'text-gray-800'} mb-3`}>
                  Certificados y Reportes
                </h2>
                <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 shadow-sm`}>
                  <div className="space-y-3">
                    {certificates.map((certificate, index) => (
                      <button 
                        key={certificate.id} 
                        className={`w-full flex justify-between items-center py-3 ${
                          index !== certificates.length - 1 ? `border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}` : ''
                        } rounded-lg px-2 hover:bg-gray-50 transition-colors duration-300 ${
                          darkMode ? 'hover:bg-gray-700 text-gray-200' : 'hover:bg-gray-50 text-gray-800'
                        }`}
                      >
                        <div className="flex items-center">
                          <Clipboard className="w-5 h-5 text-[#004d66] mr-3" />
                          <span>{certificate.title}</span>
                        </div>
                        <Download className={`w-5 h-5 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className={`p-4 ${darkMode ? 'bg-gray-800 border-t border-gray-700' : 'bg-white border-t border-gray-200'} text-center`}>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          © 2025 Luka Financiera • Todos los derechos reservados • v2.5.0
        </p>
      </footer>
    </div>
  );
};

export default ConfiguracionAvanzada;