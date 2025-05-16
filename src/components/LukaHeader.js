import React from 'react';
import { Bell, User } from 'lucide-react';

const LukaHeader = ({ showNotifications = true, showUserAvatar = true }) => {
  return (
    <header className="app-header">
      <div className="logo-container">
        <div className="logo">
          <img 
            src={process.env.PUBLIC_URL + '/assets/logoLuka.jpg'} 
            alt="Luka Logo" 
            className="logo-image" 
          />
        </div>
        <h1 className="logo-text">luka</h1>
      </div>
      
      <div className="user-section">
        {showNotifications && (
          <button className="notification-button">
            <Bell size={20} />
            <span className="notification-badge">3</span>
          </button>
        )}
        {showUserAvatar && (
          <div className="user-avatar">
            <User size={20} />
          </div>
        )}
      </div>
    </header>
  );
};

export default LukaHeader;