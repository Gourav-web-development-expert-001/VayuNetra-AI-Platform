import React, { useState } from 'react';
import { Settings, Bell, Database, Monitor, Cpu, CheckCircle } from 'lucide-react';

export default function SettingsView({ isDarkTheme, toggleTheme }) {
  const [aqiThreshold, setAqiThreshold] = useState(150);
  const [activeToggles, setActiveToggles] = useState(['postgres', 'palantir']);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const toggleSetting = (id) => {
    if (activeToggles.includes(id)) {
      setActiveToggles(activeToggles.filter(item => item !== id));
    } else {
      setActiveToggles([...activeToggles, id]);
    }
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>System Settings</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Configure VayuNetra AI thresholds and backend core parameters.</p>
        </div>
      </header>

      <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {/* Alerts & Thresholds */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <Bell className="text-cyan" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Notification Thresholds</h3>
          </div>
          
          <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '0.95rem', color: 'var(--text-primary)' }}>Critical AQI Alert Threshold</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 700, color: aqiThreshold > 200 ? 'var(--status-poor)' : 'var(--status-moderate)' }}>{aqiThreshold} AQI</span>
            </div>
            <input 
              type="range" 
              min="50" 
              max="500" 
              step="10" 
              value={aqiThreshold} 
              onChange={(e) => setAqiThreshold(e.target.value)}
              style={{ width: '100%', accentColor: 'var(--brand-cyan)' }} 
            />
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '8px' }}>Push notifications will be globally broadcast if predictive AQI exceeds this parameter.</p>
          </div>
        </div>

        {/* System Integrations */}
        <div className="glass-panel" style={{ padding: '32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
            <Database className="text-cyan" size={24} />
            <h3 style={{ margin: 0, fontSize: '1.2rem' }}>API Integrations & Backend</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              { id: 'postgres', title: 'PostgreSQL Real-Time Logging', desc: 'Siphon frontend analytical state into local DB', icon: Database },
              { id: 'palantir', title: 'Palantir-link Predictive Engine', desc: 'Deploy neural autoencoders for anomaly detection', icon: Cpu },
              { id: 'weather', title: 'WeatherStack API Live Sync', desc: 'Override simulated humidity/temp with live external endpoints', icon: Monitor }
            ].map(item => {
              const isActive = activeToggles.includes(item.id);
              const Icon = item.icon;
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <Icon size={20} style={{ color: isActive ? 'var(--brand-cyan)' : 'var(--text-muted)' }} />
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', color: isActive ? '#fff' : 'var(--text-secondary)' }}>{item.title}</h4>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.desc}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => toggleSetting(item.id)}
                    style={{ 
                      width: '48px', height: '24px', background: isActive ? 'var(--brand-cyan)' : 'var(--bg-input)', 
                      borderRadius: '12px', border: isActive ? 'none' : '1px solid var(--border-subtle)', 
                      position: 'relative', cursor: 'pointer', transition: 'all 0.3s' 
                    }}
                  >
                    <div style={{ position: 'absolute', top: '2px', left: isActive ? '26px' : '2px', width: '20px', height: '20px', background: isActive ? '#000' : 'var(--text-muted)', borderRadius: '50%', transition: 'all 0.3s' }}></div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Global UI Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
          {saved && <span style={{ color: 'var(--status-good)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.9rem', animation: 'fadeIn 0.3s ease' }}><CheckCircle size={16} /> Configuration Saved</span>}
          <button 
            className="primary-btn hover-glow" 
            onClick={handleSave}
            disabled={isSaving}
            style={{ padding: '12px 32px', background: 'var(--brand-cyan)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: isSaving ? 'wait' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {isSaving ? 'Synchronizing...' : (
              <>
                <Settings size={18} /> Apply Global Configurations
              </>
            )}
          </button>
        </div>

      </div>
    </main>
  );
}
