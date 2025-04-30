import React from 'react';
import { BarChart3, Map, TrendingUp, ArrowRight, ChevronDown, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DashboardInversionista = () => {
  // Datos de ejemplo para el gráfico de rentabilidad
  const data = [
    { name: 'Ene', Luka: 4.2, CDT: 3.1, IPC: 1.8 },
    { name: 'Feb', Luka: 4.3, CDT: 3.1, IPC: 1.7 },
    { name: 'Mar', Luka: 4.5, CDT: 3.2, IPC: 1.9 },
    { name: 'Abr', Luka: 4.6, CDT: 3.2, IPC: 2.0 },
    { name: 'May', Luka: 4.4, CDT: 3.3, IPC: 2.1 },
    { name: 'Jun', Luka: 4.7, CDT: 3.3, IPC: 2.0 },
  ];
  
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
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard de Inversiones</h1>
        
        {/* KPIs Row */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Monto invertido</span>
              <BarChart3 className="w-5 h-5 text-[#004d66]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">$4,750,000</h2>
            <p className="text-xs text-green-600 font-medium">+$250,000 último mes</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Rentabilidad neta</span>
              <TrendingUp className="w-5 h-5 text-[#99cc33]" />
            </div>
            <h2 className="text-2xl font-bold text-[#99cc33]">4.5%</h2>
            <p className="text-xs text-green-600 font-medium">+0.2% sobre el mes anterior</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Score promedio</span>
              <svg className="w-5 h-5 text-[#004d66]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L14.2451 8.90983H21.5106L15.6327 13.1803L17.8779 20.0902L12 15.8197L6.12215 20.0902L8.36729 13.1803L2.48944 8.90983H9.75486L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">85 / 100</h2>
            <p className="text-xs text-blue-600 font-medium">Calidad alta</p>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Estado de créditos</span>
              <CheckCircle className="w-5 h-5 text-[#004d66]" />
            </div>
            <div className="flex items-center mt-2">
              <div className="flex-1">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-3/4"></div>
                </div>
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">12 al día</span>
                  <span className="text-xs text-gray-500">4 finalizados</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Microcréditos Activos */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Microcréditos Activos</h2>
            <button className="text-[#004d66] text-sm font-medium flex items-center">
              Ver todos <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          {/* Crédito 1 */}
          <div className="border border-gray-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="font-medium">Crédito #9834</h3>
                <div className="ml-2 px-2 py-1 bg-green-100 rounded-full">
                  <span className="text-xs text-green-700">Al día</span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <p className="font-medium">92/100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monto</p>
                <p className="font-medium">$250,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rentabilidad</p>
                <p className="font-medium text-[#99cc33]">4.8%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">4 de 12 cuotas pagadas</p>
              <div className="h-1 flex-1 mx-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#004d66] w-1/3"></div>
              </div>
            </div>
          </div>
          
          {/* Crédito 2 */}
          <div className="border border-gray-200 rounded-lg p-3 mb-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="font-medium">Crédito #8752</h3>
                <div className="ml-2 px-2 py-1 bg-yellow-100 rounded-full">
                  <span className="text-xs text-yellow-700">1 día mora</span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <p className="font-medium">78/100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monto</p>
                <p className="font-medium">$180,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rentabilidad</p>
                <p className="font-medium text-[#99cc33]">5.2%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">6 de 10 cuotas pagadas</p>
              <div className="h-1 flex-1 mx-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#004d66] w-3/5"></div>
              </div>
            </div>
          </div>
          
          {/* Crédito 3 */}
          <div className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <h3 className="font-medium">Crédito #7621</h3>
                <div className="ml-2 px-2 py-1 bg-green-100 rounded-full">
                  <span className="text-xs text-green-700">Al día</span>
                </div>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </div>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div>
                <p className="text-xs text-gray-500">Score</p>
                <p className="font-medium">87/100</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Monto</p>
                <p className="font-medium">$320,000</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Rentabilidad</p>
                <p className="font-medium text-[#99cc33]">4.5%</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-xs text-gray-500">2 de 6 cuotas pagadas</p>
              <div className="h-1 flex-1 mx-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-[#004d66] w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Rentabilidad Histórica */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Rentabilidad Histórica</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Luka" stroke="#004d66" strokeWidth={2} />
                <Line type="monotone" dataKey="CDT" stroke="#99cc33" strokeWidth={2} />
                <Line type="monotone" dataKey="IPC" stroke="#ff7300" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Diversificación Geográfica */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Diversificación Geográfica</h2>
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <Map className="w-12 h-12 text-gray-400 mb-2" />
            <p className="text-gray-500">Mapa de calor por región</p>
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
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-xs mt-1">Invertir</span>
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

export default DashboardInversionista;