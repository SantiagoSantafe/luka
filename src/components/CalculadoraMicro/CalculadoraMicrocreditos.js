import React, { useState } from 'react';
import { Calculator, Users, Wallet, CreditCard, RefreshCw, ChevronRight, BarChart, TrendingUp, AlertCircle } from 'lucide-react';

const CalculadoraMicrocreditos = () => {
  const [activeTab, setActiveTab] = useState('inversionista');
  
  // Estados para el modo inversionista
  const [montoInversion, setMontoInversion] = useState(1000000);
  const [plazoPreferido, setPlazoPreferido] = useState(12);
  const [scoreMinimo, setScoreMinimo] = useState(75);
  
  // Estados para el modo prestatario
  const [montoDeseado, setMontoDeseado] = useState(1500000);
  const [plazoDeseado, setPlazoDeseado] = useState(12);
  const [scoreLuka, setScoreLuka] = useState(80);
  
  // Cálculos para el modo inversionista
  const rentabilidadBruta = 0.14; // 14%
  const rentabilidadNeta = 0.115; // 11.5%
  const numeroCreditosSimulados = Math.ceil(montoInversion / 250000);
  const riesgoPromedio = 100 - scoreMinimo;
  
  // Cálculos para el modo prestatario
  const tasaEstimada = scoreLuka >= 90 ? 0.14 : scoreLuka >= 80 ? 0.16 : scoreLuka >= 70 ? 0.18 : 0.20;
  const cuotaMensual = Math.round((montoDeseado * (1 + tasaEstimada)) / plazoDeseado);
  const totalPagar = cuotaMensual * plazoDeseado;
  
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
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Calculadora de Microcréditos</h1>
        
        {/* Tabs */}
        <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-6">
          <div className="flex">
            <button 
              className={`flex-1 py-3 font-medium text-center ${activeTab === 'inversionista' ? 'bg-[#004d66] text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('inversionista')}
            >
              <Users className="w-5 h-5 inline-block mr-2" />
              Modo Inversionista
            </button>
            <button 
              className={`flex-1 py-3 font-medium text-center ${activeTab === 'prestatario' ? 'bg-[#004d66] text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setActiveTab('prestatario')}
            >
              <CreditCard className="w-5 h-5 inline-block mr-2" />
              Modo Prestatario
            </button>
          </div>
        </div>
        
        {/* Calculadora Inversionista */}
        {activeTab === 'inversionista' && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuración</h2>
              
              {/* Monto a invertir */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto a invertir (COP)
                </label>
                <input 
                  type="range" 
                  min="100000" 
                  max="10000000" 
                  step="100000" 
                  value={montoInversion}
                  onChange={(e) => setMontoInversion(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">$100,000</span>
                  <span className="text-sm font-semibold text-[#004d66]">${montoInversion.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">$10,000,000</span>
                </div>
              </div>
              
              {/* Plazo preferido */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo preferido (meses)
                </label>
                <div className="flex">
                  {[6, 12, 18, 24].map((plazo) => (
                    <button
                      key={plazo}
                      className={`flex-1 py-2 text-center text-sm ${plazoPreferido === plazo ? 'bg-[#004d66] text-white' : 'bg-gray-100 text-gray-700'} ${plazo === 6 ? 'rounded-l-lg' : ''} ${plazo === 24 ? 'rounded-r-lg' : ''}`}
                      onClick={() => setPlazoPreferido(plazo)}
                    >
                      {plazo}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Nivel de riesgo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nivel de riesgo aceptado (score mínimo)
                </label>
                <input 
                  type="range" 
                  min="60" 
                  max="95" 
                  step="5" 
                  value={scoreMinimo}
                  onChange={(e) => setScoreMinimo(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <div className="flex items-center">
                    <span className="text-xs text-red-500">Mayor riesgo</span>
                    <span className="text-xs text-gray-500 ml-1">(60)</span>
                  </div>
                  <span className="text-sm font-semibold text-[#004d66]">{scoreMinimo}</span>
                  <div className="flex items-center">
                    <span className="text-xs text-green-500">Menor riesgo</span>
                    <span className="text-xs text-gray-500 ml-1">(95)</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Resultados */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resultados de la simulación</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Rentabilidad bruta</p>
                    <TrendingUp className="w-4 h-4 text-[#99cc33]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#99cc33]">{(rentabilidadBruta * 100).toFixed(1)}%</h3>
                  <p className="text-xs text-gray-500">anual fija</p>
                </div>
                
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Rentabilidad neta</p>
                    <TrendingUp className="w-4 h-4 text-[#004d66]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#004d66]">{(rentabilidadNeta * 100).toFixed(1)}%</h3>
                  <p className="text-xs text-gray-500">después de comisiones</p>
                </div>
                
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Créditos a financiar</p>
                    <Users className="w-4 h-4 text-[#004d66]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">{numeroCreditosSimulados}</h3>
                  <p className="text-xs text-gray-500">diversificación</p>
                </div>
                
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Riesgo promedio</p>
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-bold text-orange-500">{riesgoPromedio}%</h3>
                  <p className="text-xs text-gray-500">basado en score mínimo</p>
                </div>
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Calculator className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-800 mb-1">Inversión estimada</h3>
                    <p className="text-sm text-blue-600">Con una inversión de ${montoInversion.toLocaleString()} COP, podrías obtener aproximadamente ${Math.round(montoInversion * rentabilidadNeta).toLocaleString()} COP de ganancia neta al término del periodo.</p>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[#004d66] hover:bg-[#003b50] text-white py-3 rounded-lg font-medium mt-4">
                Invertir con estos parámetros
              </button>
            </div>
          </div>
        )}
        
        {/* Calculadora Prestatario */}
        {activeTab === 'prestatario' && (
          <div className="bg-white rounded-xl p-4 shadow-sm mb-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Configuración</h2>
              
              {/* Monto deseado */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monto deseado (COP)
                </label>
                <input 
                  type="range" 
                  min="200000" 
                  max="3000000" 
                  step="100000" 
                  value={montoDeseado}
                  onChange={(e) => setMontoDeseado(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between mt-1">
                  <span className="text-xs text-gray-500">$200,000</span>
                  <span className="text-sm font-semibold text-[#004d66]">${montoDeseado.toLocaleString()}</span>
                  <span className="text-xs text-gray-500">$3,000,000</span>
                </div>
              </div>
              
              {/* Plazo deseado */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Plazo deseado (meses)
                </label>
                <div className="flex">
                  {[3, 6, 12, 18, 24].map((plazo) => (
                    <button
                      key={plazo}
                      className={`flex-1 py-2 text-center text-sm ${plazoDeseado === plazo ? 'bg-[#004d66] text-white' : 'bg-gray-100 text-gray-700'} ${plazo === 3 ? 'rounded-l-lg' : ''} ${plazo === 24 ? 'rounded-r-lg' : ''}`}
                      onClick={() => setPlazoDeseado(plazo)}
                    >
                      {plazo}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Score Luka */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Score Luka actual
                  </label>
                  <span className="text-sm text-blue-600">{scoreLuka}/100</span>
                </div>
                <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden mb-1">
                  <div 
                    className={`h-full ${
                      scoreLuka >= 90 ? 'bg-green-500' : 
                      scoreLuka >= 80 ? 'bg-green-400' : 
                      scoreLuka >= 70 ? 'bg-yellow-500' : 
                      'bg-red-500'
                    }`}
                    style={{width: `${scoreLuka}%`}}
                  ></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-red-500">Bajo</span>
                  <span className="text-xs text-yellow-500">Medio</span>
                  <span className="text-xs text-green-500">Alto</span>
                  <span className="text-xs text-green-600">Excelente</span>
                </div>
              </div>
            </div>
            
            {/* Resultados */}
            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Resultados de la simulación</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Tasa estimada</p>
                    <TrendingUp className="w-4 h-4 text-[#004d66]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#004d66]">{(tasaEstimada * 100).toFixed(1)}%</h3>
                  <p className="text-xs text-gray-500">anual fijo</p>
                </div>
                
                <div className="bg-[#f8f9fa] p-3 rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Cuota mensual</p>
                    <Calculator className="w-4 h-4 text-[#004d66]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">${cuotaMensual.toLocaleString()}</h3>
                  <p className="text-xs text-gray-500">{plazoDeseado} pagos</p>
                </div>
                
                <div className="bg-[#f8f9fa] p-3 rounded-lg col-span-2">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm text-gray-500">Total a pagar</p>
                    <Wallet className="w-4 h-4 text-[#004d66]" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">${totalPagar.toLocaleString()}</h3>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Capital: ${montoDeseado.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">Intereses: ${(totalPagar - montoDeseado).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-100 rounded-lg p-3 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0 mr-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-green-800 mb-1">Recomendaciones para mejorar</h3>
                    <p className="text-sm text-green-600 mb-2">Si aumentas tu score a 90+ podrías reducir tu tasa al 14%, ahorrando hasta ${(totalPagar - (montoDeseado * (1 + 0.14))).toLocaleString()} COP en intereses.</p>
                    <ul className="text-xs text-green-600 list-disc list-inside">
                      <li>Paga tus créditos actuales a tiempo</li>
                      <li>Mantén bajos saldos en tarjetas de crédito</li>
                      <li>Evita solicitar múltiples créditos en corto tiempo</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <button className="w-full bg-[#004d66] hover:bg-[#003b50] text-white py-3 rounded-lg font-medium">
                Solicitar este crédito
              </button>
            </div>
          </div>
        )}
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
        <button className="flex flex-col items-center text-gray-400">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
            <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className="text-xs mt-1">Dashboard</span>
        </button>
        <button className="flex flex-col items-center text-[#004d66]">
          <Calculator className="w-6 h-6" />
          <span className="text-xs mt-1">Calculadora</span>
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

export default CalculadoraMicrocreditos;