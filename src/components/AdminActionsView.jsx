import React, { useState } from 'react';
import { ShieldAlert, Download, MessageCircle, Mail, Car, Factory, Megaphone, CheckCircle, Loader } from 'lucide-react';

export default function AdminActionsView({ mlData, ward }) {
  const [activeActions, setActiveActions] = useState([]);
  const [simulatingAction, setSimulatingAction] = useState(null);
  const [simStep, setSimStep] = useState(0);

  const recommendation = mlData?.recommendation || "Increase monitoring and advisories due to ambient anomalies.";
  const aqi = mlData?.aqi || 185;
  const isSevere = aqi > 200;

  const trafficDirective = isSevere ? 'Implement Odd-Even scheme immediately. Divert heavy commercial vehicles from city limits.' : 'Monitor traffic congestion at key junctions. Normal flow permitted.';
  const industrialDirective = isSevere ? 'Halt all non-essential construction. Issue stringent warning to nearby industrial sectors.' : 'Standard emissions monitoring active. No immediate halting required.';
  const publicSafetyDirective = isSevere ? 'Deploy anti-smog guns in high-density areas. Issue emergency public health advisory.' : 'Maintain street sweeping schedules to control PM10 dust.';

  const handleActionClick = (actionObj) => {
    if (activeActions.includes(actionObj.id)) {
      setActiveActions(activeActions.filter(aid => aid !== actionObj.id));
      return;
    }
    setSimulatingAction(actionObj);
    setSimStep(0);
    setTimeout(() => {
      setSimStep(1);
      setTimeout(() => {
        setSimStep(2);
        setActiveActions(prev => [...prev, actionObj.id]);
      }, 3000);
    }, 2000);
  };

  const imageMap = {
    'traffic': 'https://images.unsplash.com/photo-1545648507-28ece6a2ee1c?auto=format&fit=crop&w=400&q=80',
    'mitigation': 'https://plus.unsplash.com/premium_photo-1663102371946-b6b553e410b2?auto=format&fit=crop&w=400&q=80',
    'industrial': 'https://images.unsplash.com/photo-1541888049864-fbb438eebd74?auto=format&fit=crop&w=400&q=80',
    'safety': 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80'
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
                  onClick={() => handleActionClick(p)}
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

      {/* Action Simulation Modal */}
      {simulatingAction && (
        <div className="animate-fade-in" style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(8px)' }}>
          <div className="glass-panel" style={{ width: '450px', padding: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', position: 'relative', overflow: 'hidden' }}>
            
            {simStep === 2 && <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'var(--status-good)', boxShadow: '0 0 20px var(--status-good)' }}></div>}
            
            <h3 style={{ margin: 0, color: simStep === 2 ? '#fff' : 'var(--brand-cyan)', textAlign: 'center', fontSize: '1.4rem' }}>
              {simStep === 2 ? 'Mission Accomplished' : `Deploying: ${simulatingAction.title}`}
            </h3>
            
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '16px' }}>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: simStep >= 0 ? 1 : 0.3 }}>
                {simStep > 0 ? <CheckCircle size={24} className="text-cyan" /> : <Loader size={24} className="text-cyan pulse-spin" style={{ animation: 'spin 2s linear infinite' }} />}
                <span style={{ fontSize: '1.1rem', color: simStep > 0 ? '#fff' : 'var(--text-muted)' }}>1. Emailing Respective Official Team...</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', opacity: simStep >= 1 ? 1 : 0.4 }}>
                 {simStep > 1 ? <CheckCircle size={24} className="text-cyan" /> : (simStep === 1 ? <Loader size={24} className="text-cyan pulse-spin" style={{ animation: 'spin 2s linear infinite' }} /> : <div style={{width: 24}}></div>)}
                <span style={{ fontSize: '1.1rem', color: simStep > 1 ? '#fff' : 'var(--text-muted)' }}>2. Awaiting Field Verification...</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', opacity: simStep >= 2 ? 1 : 0.4 }}>
                 {simStep >= 2 ? <CheckCircle size={24} style={{ color: 'var(--status-good)' }} /> : <div style={{width: 24}}></div>}
                 <div style={{ flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '12px', fontSize: '1.1rem', color: simStep >= 2 ? '#fff' : 'var(--text-muted)' }}>3. Protocol Verified & Secured!</span>
                    {simStep >= 2 && (
                      <div className="animate-fade-in" style={{ width: '100%', height: '200px', background: `url(${imageMap[simulatingAction.id] || imageMap['traffic']}) center/cover`, borderRadius: '12px', border: '2px solid var(--status-good)', boxShadow: '0 4px 20px rgba(0,255,100,0.2)' }}></div>
                    )}
                 </div>
              </div>
            </div>

            {simStep >= 2 && (
              <button 
                className="hover-glow animate-fade-in" 
                onClick={() => setSimulatingAction(null)}
                style={{ marginTop: '24px', width: '100%', padding: '16px', background: 'var(--status-good)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '1.1rem', cursor: 'pointer', transition: 'box-shadow 0.3s' }}
              >
                Acknowledge Log
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
