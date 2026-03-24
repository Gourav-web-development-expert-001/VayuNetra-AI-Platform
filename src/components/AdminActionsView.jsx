import React from 'react';
import { ShieldAlert, Download, MessageCircle, Mail } from 'lucide-react';

export default function AdminActionsView({ mlData, ward }) {
  const recommendation = mlData?.recommendation || "Increase monitoring and advisories due to ambient anomalies.";
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
          <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid var(--border-neon)', padding: '24px', borderRadius: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <ShieldAlert size={28} className="text-cyan pulse-glow" style={{ flexShrink: 0 }} />
            <div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--brand-cyan)' }}>Mitigation Protocol</h4>
              <p style={{ margin: 0, color: 'var(--text-primary)', lineHeight: 1.6, fontSize: '1.05rem' }}>{recommendation}</p>
            </div>
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
