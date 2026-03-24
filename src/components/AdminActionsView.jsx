import React, { useState } from 'react';
import { ShieldAlert, Download, MessageCircle, Mail, Car, Factory, Megaphone } from 'lucide-react';

export default function AdminActionsView({ mlData, ward }) {
  const [activeActions, setActiveActions] = useState([]);
  const recommendation = mlData?.recommendation || "Increase monitoring and advisories due to ambient anomalies.";
  const aqi = mlData?.aqi || 185;
  const isSevere = aqi > 200;

  const trafficDirective = isSevere ? 'Implement Odd-Even scheme immediately. Divert heavy commercial vehicles from city limits.' : 'Monitor traffic congestion at key junctions. Normal flow permitted.';
  const industrialDirective = isSevere ? 'Halt all non-essential construction. Issue stringent warning to nearby industrial sectors.' : 'Standard emissions monitoring active. No immediate halting required.';
  const publicSafetyDirective = isSevere ? 'Deploy anti-smog guns in high-density areas. Issue emergency public health advisory.' : 'Maintain street sweeping schedules to control PM10 dust.';

  const toggleAction = (id) => {
    if (activeActions.includes(id)) {
      setActiveActions(activeActions.filter(aid => aid !== id));
    } else {
      setActiveActions([...activeActions, id]);
    }
  };

  const protocols = [
    { id: 'mitigation', title: 'Mitigation Protocol', text: recommendation, icon: ShieldAlert, color: 'var(--brand-cyan)' },
    { id: 'traffic', title: 'Traffic Control', text: trafficDirective, icon: Car, color: isSevere ? 'var(--status-poor)' : 'var(--status-good)' },
    { id: 'industrial', title: 'Industrial Regulation', text: industrialDirective, icon: Factory, color: isSevere ? 'var(--status-poor)' : 'var(--status-moderate)' },
    { id: 'safety', title: 'Public Safety', text: publicSafetyDirective, icon: Megaphone, color: 'var(--brand-cyan)' }
  ];

  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Admin Actions - {ward?.name || 'Delhi Overview'}</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>ML-generated recommendations for municipal officers to mitigate air pollution</p>
        </div>
      </header>

      <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="weather-rec-card glass-panel" style={{ padding: '32px', height: 'fit-content' }}>
          <div className="panel-heading" style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>AI Action Recommendation</h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            
            {protocols.map((p) => {
              const isActive = activeActions.includes(p.id);
              const Icon = p.icon;
              return (
                <div 
                  key={p.id}
                  onClick={() => toggleAction(p.id)}
                  style={{ 
                    cursor: 'pointer',
                    background: isActive ? 'rgba(0, 240, 255, 0.1)' : 'rgba(255, 255, 255, 0.03)', 
                    border: `1px solid ${isActive ? 'var(--brand-cyan)' : 'var(--border-subtle)'}`, 
                    padding: '24px', 
                    borderRadius: '12px', 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'flex-start',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: isActive ? '0 4px 20px rgba(0, 240, 255, 0.15)' : 'none'
                  }}
                  className="hover-glow"
                >
                  {isActive && <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--brand-cyan)', boxShadow: '0 0 10px rgba(0,240,255,0.8)' }}></div>}
                  <Icon size={28} className={isActive ? "pulse-glow" : ""} style={{ color: isActive ? 'var(--brand-cyan)' : p.color, flexShrink: 0, transition: 'color 0.3s' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <h4 style={{ margin: 0, color: isActive ? 'var(--brand-cyan)' : 'var(--text-primary)', transition: 'color 0.3s' }}>{p.title}</h4>
                      {isActive && <span style={{ fontSize: '0.75rem', background: 'var(--brand-cyan)', color: '#000', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>DEPLOYED</span>}
                    </div>
                    <p style={{ margin: 0, color: isActive ? '#fff' : 'var(--text-secondary)', lineHeight: 1.6, fontSize: '0.95rem', transition: 'color 0.3s' }}>{p.text}</p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        <div className="action-controls-card glass-panel" style={{ padding: '32px', height: 'fit-content' }}>
          <div className="panel-heading" style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Action Controls</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button className="primary-btn hover-glow" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'var(--brand-cyan)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer', transition: 'box-shadow 0.2s' }}>
              <Download size={18} /> Export Report (PDF)
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <button className="secondary-btn hover-cyan" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <MessageCircle size={18} /> WhatsApp
              </button>
              <button className="secondary-btn hover-cyan" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px', cursor: 'pointer', transition: 'border-color 0.2s' }}>
                <Mail size={18} /> Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
