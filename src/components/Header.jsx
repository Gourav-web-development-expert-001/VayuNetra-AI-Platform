import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon, LogOut } from 'lucide-react';
import './Header.css';

export default function Header({ toggleTheme, isDarkTheme, currentUser, onLoginClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'AQI Over 300 in Ward 01', time: '10m ago', type: 'critical' },
    { id: 2, title: 'New Weather Forecast Available', time: '1h ago', type: 'info' },
    { id: 3, title: 'Health Advisory Issued', time: '2h ago', type: 'warning' },
  ];
  return (
    <header className="header glass-panel">
      <div className="header-left">
        <div className="search-bar">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search wards, sensors, or metrics..." />
        </div>
      </div>
      
      <div className="header-right">
        <div className="status-indicator">
          <span className="live-dot pulse-glow"></span>
          <span className="live-text">SYSTEM ONLINE</span>
        </div>
        
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <div style={{ position: 'relative' }}>
          <button className="icon-btn" onClick={() => setShowNotifications(!showNotifications)}>
            <Bell size={20} />
            {notifications.length > 0 && <span className="notification-badge">{notifications.length}</span>}
          </button>
          
          {showNotifications && (
            <div className="glass-panel" style={{ position: 'absolute', top: 'calc(100% + 12px)', right: 0, width: '320px', padding: '16px', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Recent Alerts</h4>
              {notifications.map(n => (
                <div key={n.id} style={{ padding: '12px', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: `3px solid ${n.type === 'critical' ? 'var(--status-poor)' : n.type === 'warning' ? 'var(--status-moderate)' : 'var(--brand-cyan)'}` }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#fff' }}>{n.title}</p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{n.time}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {currentUser ? (
          <div className="user-profile" style={{ cursor: 'pointer' }}>
            <div className="user-avatar"><User size={20} /></div>
            <div className="user-info">
              <span className="user-name">{currentUser.name}</span>
              <span className="user-role">{currentUser.role}</span>
            </div>
            <button onClick={onLogout} title="Sign Out Securely" className="hover-cyan" style={{ marginLeft: '12px', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button className="primary-btn hover-glow" onClick={onLoginClick} style={{ padding: '8px 16px', background: 'var(--brand-cyan)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
            Govt Login
          </button>
        )}
      </div>
    </header>
  );
}
