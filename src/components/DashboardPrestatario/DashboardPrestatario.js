import React from 'react';
import { AlertCircle, ChevronUp, ChevronDown, Calendar, Clock, CheckCircle, TrendingUp, ChevronRight } from 'lucide-react';

const DashboardPrestatario = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white shadow-sm">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-lg bg-[#004d66] flex items-center justify-center text-white mr-3">
            <span className="font-bold text-xl">L</span>
          </div>
          <h1 className="text-xl font-bold text-[#004d66]">luka</h1>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            <svg className="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Mi Crédito</h1>
        
        {/* Panel de Deuda Total */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Resumen de Deuda</h2>
            <div className="flex items-center bg-blue-100 px-3 py-1 rounded-full">
              <CheckCircle className="w-4 h-4 text-blue-600 mr-1" />
              <span className="text-xs text-blue-600">Al día</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm text-gray-500">Total adeudado</p>
              <h3 className="text-xl font-bold text-gray-800">$1,450,000</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Capital restante</p>
              <h3 className="text-xl font-bold text-gray-800">$1,200,000</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Intereses acumulados</p>
              <h3 className="text-xl font-bold text-[#004d66]">$250,000</h3>
            </div>
            <div>
              <p className="text-sm text-gray-500">Cuotas</p>
              <h3 className="text-xl font-bold text-gray-800">4 / 12</h3>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-gray-500">Progreso del crédito</p>
              <p className="text-xs font-medium">33%</p>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-[#004d66] w-1/3"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-500">Score Luka</p>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center">
                <div className="flex-1">
                  <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-green-500 w-4/5"></div>
                  </div>
                </div>
                <span className="ml-2 font-bold">80/100</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Capacidad máxima</p>
              <h3 className="text-xl font-bold text-[#99cc33]">$2,500,000</h3>
            </div>
          </div>
        </div>
        
        {/* Calendario de Pagos */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Calendario de Pagos</h2>
            <div className="flex items-center text-[#004d66]">
              <Calendar className="w-4 h-4 mr-1" />
              <span className="text-sm">Abril 2025</span>
            </div>
          </div>
          
          {/* Pago 1 - Pagado */}
          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cuota #1</h3>
                <p className="text-xs text-gray-500">Pagada: 10 Enero, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$145,000</p>
                <div className="flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Pagado a tiempo</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pago 2 - Pagado */}
          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cuota #2</h3>
                <p className="text-xs text-gray-500">Pagada: 10 Febrero, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$145,000</p>
                <div className="flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Pagado a tiempo</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pago 3 - Pagado */}
          <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cuota #3</h3>
                <p className="text-xs text-gray-500">Pagada: 10 Marzo, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$145,000</p>
                <div className="flex items-center text-green-600 text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  <span>Pagado a tiempo</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pago 4 - Actual */}
          <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-3 mb-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cuota #4</h3>
                <p className="text-xs text-gray-500">Vence: 10 Abril, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$145,000</p>
                <div className="flex items-center text-yellow-600 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>7 días restantes</span>
                </div>
              </div>
            </div>
            <button className="mt-2 w-full bg-[#004d66] hover:bg-[#003b50] text-white py-2 rounded-lg text-sm font-medium">
              Pagar ahora
            </button>
          </div>
          
          {/* Pago 5 - Futuro */}
          <div className="border-l-4 border-gray-300 bg-gray-50 rounded-r-lg p-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Cuota #5</h3>
                <p className="text-xs text-gray-500">Vence: 10 Mayo, 2025</p>
              </div>
              <div className="text-right">
                <p className="font-bold">$145,000</p>
                <div className="flex items-center text-gray-500 text-xs">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>Próximamente</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-3 flex justify-center">
            <button className="text-[#004d66] flex items-center text-sm font-medium">
              Ver todas las cuotas
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
        
        {/* Recomendaciones Personalizadas */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Recomendaciones Personalizadas</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-3">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="font-medium text-blue-800 mb-1">Mejora tu Score Luka</h3>
                <p className="text-sm text-blue-600">Si pagas 5 días antes de la fecha límite, mejorarás tu score en +3 puntos</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0 mr-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 8V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-green-800 mb-1">Aumento de Cupo</h3>
                <p className="text-sm text-green-600">Si cumples 3 meses pagando a tiempo, podrás solicitar un aumento de cupo de hasta $500,000</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="grid grid-cols-4 bg-white border-t border-gray-200 py-3">
        <button className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="text-xs mt-1">Inicio</span>
        </button>
        <button className="flex flex-col items-center text-[#004d66]">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-xs mt-1">Mi Crédito</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-xs mt-1">Solicitar</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
            <path d="M5 19C5 16.2386 7.23858 14 10 14H14C16.7614 14 19 16.2386 19 19V21H5V19Z" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-xs mt-1">Perfil</span>
        </button>
      </nav>
    </div>
  );
};

export default DashboardPrestatario;