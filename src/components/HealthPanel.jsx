import React from 'react';
import { HeartPulse, Activity, UserPlus, Info } from 'lucide-react';
import './HealthPanel.css';

export default function HealthPanel({ aqi }) {
  // Simple logic to determine health risk
  const getSeverity = (val) => {
    if (val <= 50) return { level: 'Safe', color: 'var(--status-good)', text: 'Air quality is satisfactory. No health risk.' };
    if (val <= 100) return { level: 'Moderate', color: 'var(--status-moderate)', text: 'Acceptable air quality for most individuals.' };
    if (val <= 200) return { level: 'Unhealthy for Sensitive Groups', color: 'var(--status-poor)', text: 'Members of sensitive groups may experience health effects.' };
    return { level: 'Hazardous', color: 'var(--status-hazardous)', text: 'Health warning of emergency conditions. Entire population is likely to be affected.' };
  };

  const getGeneralTip = (val) => {
    if (val <= 50) return 'Optimal air quality! Perfect conditions to open windows and ventilate indoor spaces.';
    if (val <= 100) return 'Acceptable ventilation outside, but monitor conditions if you suffer from chronic allergies.';
    if (val <= 200) return 'HVAC systems should be firmly set to recirculation mode in current conditions.';
    return 'CRITICAL: Seal all windows immediately. Utilize high-grade indoor air purifiers rated for PM2.5.';
  };

  const getChildrenAdvice = (val) => {
    if (val <= 50) return 'Perfectly safe for extended outdoor physical education and play.';
    if (val <= 100) return 'Safe, but reduce prolonged strenuous activity if experiencing symptoms.';
    if (val <= 200) return 'Limit prolonged outdoor exertion. Move physical activities indoors.';
    return 'Avoid all outdoor physical activities entirely. Remain indoors.';
  };

  const getRespiratoryAdvice = (val) => {
    if (val <= 50) return 'No special precautions needed. Enjoy the outdoors.';
    if (val <= 100) return 'Monitor breathing closely. Limit activity if asthma symptoms emerge.';
    if (val <= 200) return 'Keep rescue inhalers highly accessible. Mandate N95 masking outdoors.';
    return 'High risk of acute respiratory distress. Avoid all outdoor exposure.';
  };

  const severity = getSeverity(aqi);

  return (
    <div className="health-panel glass-panel">
      <div className="health-header">
        <div className="header-title">
          <HeartPulse size={18} className="health-icon pulse-glow" />
          <h3>Health Intelligence</h3>
        </div>
      </div>

      <div className="severity-indicator" style={{ borderLeftColor: severity.color }}>
        <div className="severity-level" style={{ color: severity.color }}>{severity.level}</div>
        <div className="severity-desc">{severity.text}</div>
      </div>

      <div className="demographic-advisories">
        <div className="advisory-item">
          <div className="adv-icon"><UserPlus size={16} /></div>
          <div className="adv-content">
            <span className="adv-target">Children & Elderly</span>
            <span className="adv-action">{getChildrenAdvice(aqi)}</span>
          </div>
        </div>
        
        <div className="advisory-item">
          <div className="adv-icon"><Activity size={16} /></div>
          <div className="adv-content">
            <span className="adv-target">Respiratory Sensitive</span>
            <span className="adv-action">{getRespiratoryAdvice(aqi)}</span>
          </div>
        </div>
      </div>
      
      <div className="general-tip" style={{ borderColor: severity.color, background: 'rgba(255,255,255,0.02)' }}>
        <Info size={14} className="info-icon" style={{ color: severity.color }} />
        <span>{getGeneralTip(aqi)}</span>
      </div>
    </div>
  );
}
