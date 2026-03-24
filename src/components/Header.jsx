import React, { useState } from 'react';
import { Search, Bell, User, Sun, Moon, LogOut } from 'lucide-react';
import './Header.css';

export default function Header({ toggleTheme, isDarkTheme, currentUser, onLoginClick, onLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const notifications = [
    { id: 1, title: 'AQI Over 300 in Ward 01', time: '10m ago', type: 'critical' },
    { id: 2, title: 'New Weather Forecast Available', time: '1h ago', type: 'info' },
    { id: 3, title: 'Health Advisory Issued', time: '2h ago', type: 'warning' },
  ];

  const searchSuggestions = [
    { text: "Ward 01 - Connaught Place", type: "Location" },
    { text: "PM2.5 Sensor Array Beta", type: "Sensor" },
    { text: "AQI Predictive Models", type: "Module" },
    { text: "Emergency Anomaly Logs", type: "Data" }
  ];

  return (
    <header className="header glass-panel">
      <div className="header-left">
        <div 
          className="search-bar" 
          style={{ position: 'relative' }}
          onMouseEnter={() => setShowSearchSuggestions(true)}
          onMouseLeave={() => setShowSearchSuggestions(false)}
        >
          <Search size={18} className="search-icon" />
          <input 
            type="text" 
            placeholder="Search wards, sensors, or metrics..." 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onFocus={() => setShowSearchSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSearchSuggestions(false), 200)}
          />

          {showSearchSuggestions && (
            <div className="glass-panel animate-fade-in" style={{ position: 'absolute', top: 'calc(100% + 12px)', left: 0, width: '300px', padding: '16px', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px', fontWeight: 700 }}>AI Suggested Queries</span>
              {searchSuggestions.map((s, i) => (
                <div 
                  key={i} 
                  className="hover-cyan" 
                  onClick={() => {
                    setSearchValue(s.text);
                    setShowSearchSuggestions(false);
                  }}
                  style={{ padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid transparent', transition: 'all 0.2s' }}
                >
                  <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{s.text}</span>
                  <span style={{ fontSize: '0.65rem', color: 'var(--brand-cyan)', background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '4px 8px', borderRadius: '12px', fontWeight: 600 }}>{s.type}</span>
                </div>
              ))}
            </div>
          )}
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
