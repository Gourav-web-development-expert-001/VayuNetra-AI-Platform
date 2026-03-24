import React from 'react';
import { Settings, Cpu, FlaskConical, Stethoscope, Lock } from 'lucide-react';

export default function GenericView({ tabId }) {
  const getViewContent = () => {
    switch (tabId) {
      case 'realtime':
        return {
          title: 'Real-Time Sensor Data',
          icon: <FlaskConical size={48} className="text-gradient" />,
          desc: 'Connected to 4,200 active environmental nodes. Gathering raw AQI, PM2.5, SO2, and weather data in real-time. Full deep-dive grid loading...'
        };
      case 'ai':
        return {
          title: 'Extended AI Analytics',
          icon: <Cpu size={48} className="text-gradient" />,
          desc: 'Processing deep-learning emission models. Access detailed variance analysis, prediction matrices, and historical ML logs here.'
        };
      case 'health':
        return {
          title: 'Global Health Command',
          icon: <Stethoscope size={48} className="text-gradient" />,
          desc: 'Correlating demographic health records with localized pollution metrics. Generating localized hospital risk projections.'
        };
      case 'admin':
        return {
          title: 'Admin Strategic Controls',
          icon: <Lock size={48} className="text-gradient" />,
          desc: 'Restricted Access: Elevated credentials required. Manage city infrastructure, emission caps, and emergency dispatch.'
        };
      case 'settings':
        return {
          title: 'System Settings',
          icon: <Settings size={48} className="text-gradient" />,
          desc: 'Configure notification thresholds, API integrations, interface scaling, and Palantir-link parameters.'
        };
      default:
        return { title: 'Unknown Module', icon: <Cpu size={48} />, desc: 'Module not found.' };
    }
  };

  const content = getViewContent();

  return (
    <main className="dashboard generic-view-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 104px)' }}>
      <div className="glass-panel" style={{ padding: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px', maxWidth: '600px', textAlign: 'center' }}>
        <div style={{ padding: '24px', background: 'rgba(0, 240, 255, 0.05)', borderRadius: '50%', boxShadow: '0 0 30px rgba(0, 240, 255, 0.1)' }}>
          {content.icon}
        </div>
        <h2>{content.title}</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{content.desc}</p>
        <button className="action-btn" style={{ marginTop: '16px', border: '1px solid var(--brand-cyan)', color: 'var(--brand-cyan)' }}>
          Initialize Module
        </button>
      </div>
    </main>
  );
}
