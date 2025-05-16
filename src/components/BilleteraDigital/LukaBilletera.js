import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowDownCircle, 
  ArrowUpCircle, 
  History, 
  Bell, 
  ChevronRight, 
  Search,
  BarChart2,
  CreditCard,
  Home,
  User,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import './LukaBilletera.css';
import {
  Home as HomeIcon,
  Wallet as WalletIcon,
  User as UserIcon,
  TrendingUp as TrendingUpIcon,
  Calculator
} from 'lucide-react';

const LukaBilletera = () => {
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const [transactionType, setTransactionType] = useState('');
  const [amount, setAmount] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Estado de la billetera del usuario
  const [walletData, setWalletData] = useState({
    balance: 2345000,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    lastUpdate: new Date()
  });
  
  // Historial de transacciones
  const [transactions, setTransactions] = useState([
    {
      id: 1,
      type: 'deposit',
      description: 'Recarga PSE',
      amount: 500000,
      date: new Date(2025, 4, 1, 10, 45), // Hoy, 10:45 AM
      status: 'completed'
    },
    {
      id: 2,
      type: 'investment',
      description: 'Inversión Crédito #9834',
      amount: 200000,
      date: new Date(2025, 3, 30, 15, 20), // Ayer, 3:20 PM
      status: 'completed'
    },
    {
      id: 3,
      type: 'earning',
      description: 'Rendimientos',
      amount: 45000,
      date: new Date(2025, 3, 24, 12, 10), // 24 Abr, 12:10 PM
      status: 'completed'
    },
    {
      id: 4,
      type: 'withdrawal',
      description: 'Retiro a cuenta bancaria',
      amount: 300000,
      date: new Date(2025, 3, 20, 9, 30), // 20 Abr, 9:30 AM
      status: 'completed'
    },
    {
      id: 5,
      type: 'earning',
      description: 'Intereses de inversión',
      amount: 35000,
      date: new Date(2025, 3, 15, 14, 45), // 15 Abr, 2:45 PM
      status: 'completed'
    }
  ]);
  
  // Métodos de recarga disponibles
  const chargeMethods = [
    { id: 'pse', name: 'PSE', shortName: 'PSE' },
    { id: 'transfer', name: 'Transferencia Bancaria', shortName: 'TB' },
    { id: 'cash', name: 'Efectivo en Convenio', shortName: 'CE' }
  ];
  
  // Bancos disponibles para retiro
  const banks = [
    { id: 'bancolombia', name: 'Bancolombia' },
    { id: 'davivienda', name: 'Davivienda' },
    { id: 'bbva', name: 'BBVA' },
    { id: 'popular', name: 'Banco Popular' },
    { id: 'bogota', name: 'Banco de Bogotá' }
  ];
  
  const handleOpenTransaction = (type) => {
    setTransactionType(type);
    setShowTransactionModal(true);
    setAmount('');
  };
  
  const handleCloseModal = () => {
    setShowTransactionModal(false);
  };
  
  const handleProcessTransaction = () => {
    const numAmount = parseFloat(amount);
    
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Por favor ingresa un monto válido');
      return;
    }
    
    if (transactionType === 'withdrawal' && numAmount > walletData.balance) {
      alert('No tienes saldo suficiente para este retiro');
      return;
    }
    
    // En una aplicación real, enviaríamos la solicitud al backend
    // Para simular, creamos una nueva transacción y actualizamos el saldo
    
    const newTransaction = {
      id: transactions.length + 1,
      type: transactionType,
      description: transactionType === 'deposit' ? 'Recarga PSE' : 'Retiro a cuenta bancaria',
      amount: numAmount,
      date: new Date(),
      status: 'pending'
    };
    
    setTransactions([newTransaction, ...transactions]);
    
    // Actualizar el saldo pendiente
    setWalletData(prev => ({
      ...prev,
      pendingDeposits: transactionType === 'deposit' ? prev.pendingDeposits + numAmount : prev.pendingDeposits,
      pendingWithdrawals: transactionType === 'withdrawal' ? prev.pendingWithdrawals + numAmount : prev.pendingWithdrawals
    }));
    
    setShowTransactionModal(false);
    
    // Mensaje de confirmación
    alert(`Tu ${transactionType === 'deposit' ? 'depósito' : 'retiro'} de $${numAmount.toLocaleString()} ha sido recibido y está siendo procesado.`);
  };
  
  // Filtrar transacciones por búsqueda
  const filteredTransactions = searchQuery
    ? transactions.filter(t => 
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery)
      )
    : transactions.slice(0, 5); // Mostrar solo las 5 más recientes si no hay búsqueda
  
  // Funciones para formatear fechas
  const formatDate = (date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return `Hoy, ${formatTime(date)}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Ayer, ${formatTime(date)}`;
    } else {
      return `${date.getDate()} ${getMonthName(date.getMonth())}, ${formatTime(date)}`;
    }
  };
  
  const formatTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
  };
  
  const getMonthName = (month) => {
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    return months[month];
  };
  
  return (
    <div className="billetera-container">
      {/* Header */}
      <header className="billetera-header">
        <div className="logo-container">
          <div className="logo">
            <span>L</span>
          </div>
          <h1 className="logo-text">luka</h1>
        </div>
        <div className="user-section">
          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
          <div className="user-avatar">
            <UserIcon size={20} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="billetera-content">
        {/* Saldo Card */}
        <div className="balance-card">
          <div className="balance-header">
            <div className="balance-title">
              <Wallet size={20} />
              <span>Mi Billetera</span>
            </div>
            <div className="balance-update">
              Actualizado en tiempo real
            </div>
          </div>
          
          <h2 className="balance-amount">${walletData.balance.toLocaleString()} COP</h2>
          <p className="balance-label">Saldo disponible</p>
          
          {(walletData.pendingDeposits > 0 || walletData.pendingWithdrawals > 0) && (
            <div className="pending-transactions">
              {walletData.pendingDeposits > 0 && (
                <div className="pending-item">
                  <AlertCircle size={16} className="pending-icon deposit" />
                  <span>${walletData.pendingDeposits.toLocaleString()} en depósitos pendientes</span>
                </div>
              )}
              {walletData.pendingWithdrawals > 0 && (
                <div className="pending-item">
                  <AlertCircle size={16} className="pending-icon withdrawal" />
                  <span>${walletData.pendingWithdrawals.toLocaleString()} en retiros pendientes</span>
                </div>
              )}
            </div>
          )}
          
          <div className="balance-actions">
            <button className="action-button deposit" onClick={() => handleOpenTransaction('deposit')}>
              <ArrowDownCircle size={18} />
              <span>Recargar</span>
            </button>
            <button className="action-button withdraw" onClick={() => handleOpenTransaction('withdrawal')}>
              <ArrowUpCircle size={18} />
              <span>Retirar</span>
            </button>
          </div>
        </div>

        {/* Historial de Movimientos */}
        <div className="history-card">
          <div className="history-header">
            <h2 className="history-title">Historial de Movimientos</h2>

          </div>
          
          <div className="search-container">
            <Search size={16} className="search-icon" />
            <input 
              type="text" 
              placeholder="Buscar transacciones..." 
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="transaction-list">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map(transaction => (
                <div className="transaction-item" key={transaction.id}>
                  <div className="transaction-icon-container">
                    {transaction.type === 'deposit' && (
                      <div className="transaction-icon deposit">
                        <ArrowDownCircle size={18} />
                      </div>
                    )}
                    {transaction.type === 'withdrawal' && (
                      <div className="transaction-icon withdraw">
                        <ArrowUpCircle size={18} />
                      </div>
                    )}
                    {transaction.type === 'investment' && (
                      <div className="transaction-icon investment">
                        <CreditCard size={18} />
                      </div>
                    )}
                    {transaction.type === 'earning' && (
                      <div className="transaction-icon earning">
                        <BarChart2 size={18} />
                      </div>
                    )}
                  </div>
                  <div className="transaction-details">
                    <h3 className="transaction-title">{transaction.description}</h3>
                    <p className="transaction-date">{formatDate(transaction.date)}</p>
                  </div>
                  <div className="transaction-amount-container">
                    <span className={`transaction-amount ${transaction.type === 'withdrawal' || transaction.type === 'investment' ? 'negative' : 'positive'}`}>
                      {transaction.type === 'withdrawal' || transaction.type === 'investment' ? '-' : '+'}${transaction.amount.toLocaleString()}
                    </span>
                    {transaction.status === 'pending' && (
                      <span className="transaction-status">Pendiente</span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-transactions">
                <p>No se encontraron transacciones</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Métodos de Recarga */}
        <div className="methods-card">
          <h2 className="methods-title">Métodos de Recarga</h2>
          <div className="methods-grid">
            {chargeMethods.map(method => (
              <div className="method-item" key={method.id} onClick={() => handleOpenTransaction('deposit')}>
                <div className="method-icon">
                  <span>{method.shortName}</span>
                </div>
                <span className="method-name">{method.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Navigation Bar */}
      <nav className="bottom-nav">
          <Link to="/" className={`nav-item ${window.location.pathname === '/' ? 'active' : ''}`}>
            <HomeIcon className="nav-icon" />
            <span className="nav-label">Inicio</span>
          </Link>
          <Link to={`/dashboard/${localStorage.getItem('userType') || 'prestatario'}`} className={`nav-item ${window.location.pathname.includes('/dashboard') ? 'active' : ''}`}>
            <TrendingUpIcon className="nav-icon" />
            <span className="nav-label">Dashboard</span>
          </Link>
          <Link to="/billetera" className={`nav-item ${window.location.pathname === '/billetera' ? 'active' : ''}`}>
            <WalletIcon className="nav-icon" />
            <span className="nav-label">Billetera</span>
          </Link>
          <Link to="/calculadora" className={`nav-item ${window.location.pathname === '/calculadora' ? 'active' : ''}`}>
            <Calculator className="nav-icon" />
            <span className="nav-label">Calculadora</span>
          </Link>
          <Link to="/perfil" className={`nav-item ${window.location.pathname === '/perfil' ? 'active' : ''}`}>
            <UserIcon className="nav-icon" />
            <span className="nav-label">Perfil</span>
          </Link>
        </nav>

      {/* Modal para transacciones */}
      {showTransactionModal && (
        <div className="modal-overlay">
          <div className="transaction-modal">
            <div className="modal-header">
              <h3 className="modal-title">
                {transactionType === 'deposit' ? 'Recargar Billetera' : 'Retirar Fondos'}
              </h3>
              <button className="close-button" onClick={handleCloseModal}>×</button>
            </div>
            
            <div className="modal-content">
              <div className="amount-input-container">
                <label className="amount-label">Monto a {transactionType === 'deposit' ? 'recargar' : 'retirar'}</label>
                <div className="currency-input">
                  <span className="currency-symbol">$</span>
                  <input 
                    type="number" 
                    placeholder="0" 
                    className="amount-input"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="10000"
                    max={transactionType === 'withdrawal' ? walletData.balance : undefined}
                  />
                  <span className="currency-code">COP</span>
                </div>
              </div>
              
              {transactionType === 'deposit' && (
                <div className="payment-selector">
                  <label className="payment-label">Selecciona un método de pago</label>
                  <div className="payment-options">
                    {chargeMethods.map(method => (
                      <div className="payment-option" key={method.id}>
                        <input 
                          type="radio" 
                          id={method.id} 
                          name="paymentMethod" 
                          value={method.id}
                          defaultChecked={method.id === 'pse'}
                        />
                        <label htmlFor={method.id}>
                          <div className="option-icon">{method.shortName}</div>
                          <span>{method.name}</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {transactionType === 'withdrawal' && (
                <div className="bank-selector">
                  <label className="bank-label">Selecciona un banco destino</label>
                  <select className="bank-select">
                    <option value="">-- Selecciona tu banco --</option>
                    {banks.map(bank => (
                      <option key={bank.id} value={bank.id}>{bank.name}</option>
                    ))}
                  </select>
                  
                  <label className="account-label">Número de cuenta</label>
                  <input type="text" className="account-input" placeholder="Ingresa el número de cuenta" />
                  
                  <div className="account-type">
                    <span className="type-label">Tipo de cuenta:</span>
                    <div className="type-options">
                      <div className="type-option">
                        <input type="radio" id="savings" name="accountType" value="savings" defaultChecked />
                        <label htmlFor="savings">Ahorros</label>
                      </div>
                      <div className="type-option">
                        <input type="radio" id="checking" name="accountType" value="checking" />
                        <label htmlFor="checking">Corriente</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="transaction-info">
                <div className="info-item">
                  <span className="info-label">Monto mínimo:</span>
                  <span className="info-value">$10,000 COP</span>
                </div>
                {transactionType === 'deposit' ? (
                  <div className="info-item">
                    <span className="info-label">Tiempo de procesamiento:</span>
                    <span className="info-value">Inmediato a 24 horas hábiles</span>
                  </div>
                ) : (
                  <div className="info-item">
                    <span className="info-label">Tiempo de procesamiento:</span>
                    <span className="info-value">24 a 48 horas hábiles</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseModal}>Cancelar</button>
              <button 
                className="confirm-button"
                onClick={handleProcessTransaction}
                disabled={!amount || parseFloat(amount) <= 0}
              >
                {transactionType === 'deposit' ? 'Recargar' : 'Retirar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LukaBilletera;