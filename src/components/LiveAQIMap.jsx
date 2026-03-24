import React from 'react';
import { Activity } from 'lucide-react';
import './LiveAQIMap.css';

export default function LiveAQIMap() {
  const wards = [
    { id: 'W-01', name: 'Downtown Core', aqi: 310, status: 'severe' },
    { id: 'W-02', name: 'Industrial Hub', aqi: 220, status: 'poor' },
    { id: 'W-03', name: 'Residential West', aqi: 165, status: 'poor' },
    { id: 'W-04', name: 'Tech Park', aqi: 148, status: 'moderate' },
    { id: 'W-05', name: 'Port Authority', aqi: 85, status: 'good' },
    { id: 'W-06', name: 'Uptown', aqi: 72, status: 'good' },
  ];

  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Live AQI Map</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Real-time ward-level air quality visualization with interactive exploration</p>
        </div>
      </header>

      <div className="live-map-grid">
        <div className="radar-panel glass-panel">
          <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Activity size={18} className="text-cyan" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Live Ward-Level AQI Map</h3>
          </div>
          
          <div className="radar-container">
            <div className="radar-axis axis-x"></div>
            <div className="radar-axis axis-y"></div>
            <div className="radar-ring ring-1"></div>
            <div className="radar-ring ring-2"></div>
            <div className="radar-ring ring-3"></div>
            
            {wards.map((ward, idx) => {
              const angle = (idx / wards.length) * Math.PI * 2;
              const radius = 20 + Math.random() * 25; 
              const top = 50 + Math.sin(angle) * radius;
              const left = 50 + Math.cos(angle) * radius;

              return (
                <div 
                  key={ward.id} 
                  className={`radar-dot bg-status-${ward.status}`}
                  style={{ top: `${top}%`, left: `${left}%` }}
                >
                  {ward.aqi}
                </div>
              );
            })}
          </div>
        </div>

        <div className="ward-summary-panel glass-panel">
          <div className="panel-heading" style={{ marginBottom: '16px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Ward Summary</h3>
          </div>
          <div className="ward-list">
            {wards.map(ward => (
              <div key={ward.id} className="ward-list-item">
                <div className={`ward-badge bg-status-${ward.status}`}>{ward.aqi}</div>
                <div className="ward-info">
                  <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{ward.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>VAYU-{ward.id}</span>
                </div>
                <div className={`ward-risk text-status-${ward.status}`} style={{ fontWeight: 600, fontSize: '0.8rem', marginLeft: 'auto' }}>
                  {ward.status === 'good' ? 'Moderate' : ward.status === 'severe' ? 'Severe' : 'Poor'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
