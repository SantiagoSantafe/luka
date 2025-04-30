import React from 'react';
import { Wallet, ArrowDownCircle, ArrowUpCircle, History, Bell, ChevronRight } from 'lucide-react';

const LukaBilletera = () => {
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
          <Bell className="w-6 h-6 text-gray-600" />
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        {/* Saldo Card */}
        <div className="bg-gradient-to-r from-[#004d66] to-[#00668a] rounded-xl p-6 text-white shadow-lg mb-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center">
              <Wallet className="mr-2" />
              <span className="text-sm opacity-90">Mi Billetera</span>
            </div>
            <div className="bg-white/20 px-3 py-1 rounded-full text-xs">
              Actualizado en tiempo real
            </div>
          </div>
          
          <h2 className="text-3xl font-bold mb-1">$2,345,000 COP</h2>
          <p className="text-white/70 text-sm mb-8">Saldo disponible</p>
          
          <div className="flex justify-between">
            <button className="flex items-center bg-white/10 hover:bg-white/20 rounded-lg py-2 px-4 transition-colors">
              <ArrowDownCircle className="w-5 h-5 mr-2" />
              <span>Recargar</span>
            </button>
            <button className="flex items-center bg-[#99cc33] hover:bg-[#8ab82e] rounded-lg py-2 px-4 transition-colors">
              <ArrowUpCircle className="w-5 h-5 mr-2" />
              <span>Retirar</span>
            </button>
          </div>
        </div>

        {/* Historial de Movimientos */}
        <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Historial de Movimientos</h2>
            <button className="text-[#004d66] text-sm font-medium flex items-center">
              Ver todos <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-4">
            {/* Movimiento 1 */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <ArrowDownCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Recarga PSE</h3>
                  <p className="text-xs text-gray-500">Hoy, 10:45 AM</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+$500,000</span>
            </div>
            
            {/* Movimiento 2 */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-3">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <History className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium">Inversión Crédito #9834</h3>
                  <p className="text-xs text-gray-500">Ayer, 3:20 PM</p>
                </div>
              </div>
              <span className="text-blue-600 font-medium">-$200,000</span>
            </div>
            
            {/* Movimiento 3 */}
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <ArrowDownCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Rendimientos</h3>
                  <p className="text-xs text-gray-500">24 Abr, 12:10 PM</p>
                </div>
              </div>
              <span className="text-green-600 font-medium">+$45,000</span>
            </div>
          </div>
        </div>
        
        {/* Métodos de Recarga */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Métodos de Recarga</h2>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="font-bold text-blue-600">PSE</span>
              </div>
              <span className="text-xs text-center">PSE</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="font-bold text-blue-600">TB</span>
              </div>
              <span className="text-xs text-center">Transferencia</span>
            </div>
            <div className="flex flex-col items-center p-3 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                <span className="font-bold text-blue-600">CE</span>
              </div>
              <span className="text-xs text-center">Convenio</span>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="grid grid-cols-4 bg-white border-t border-gray-200 py-3">
        <button className="flex flex-col items-center text-[#004d66]">
          <Wallet className="w-6 h-6" />
          <span className="text-xs mt-1">Billetera</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
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

export default LukaBilletera;