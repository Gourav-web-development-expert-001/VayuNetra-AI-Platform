import React, { useState } from 'react';
import { ShieldAlert, HeartPulse } from 'lucide-react';
import './HealthAdvisory.css';

export default function HealthAdvisory({ mlData, ward }) {
  const [activeCategory, setActiveCategory] = useState('general');
  const [checkedItems, setCheckedItems] = useState([]);
  const aqi = mlData?.aqi || 185;
  const healthStatus = mlData?.health || "Avoid outdoor exposure completely";
  const isSevere = aqi > 200;

  const categories = [
    { id: 'child', label: 'Child' },
    { id: 'elderly', label: 'Elderly' },
    { id: 'asthma', label: 'Asthma' },
    { id: 'general', label: 'General' }
  ];

  const precautions = [
    'Wear N95 mask outdoors',
    'Avoid outdoor exercise',
    'Keep windows closed',
    'Use air purifier indoors',
    'Stay hydrated',
    'Protect eyes from irritation'
  ];

  const getCategoryAdvice = () => {
    if (activeCategory === 'child') {
      return aqi > 100 ? "Children's lungs are still developing. Keep children indoors and avoid intense outdoor play. Ensure schools have air purifiers running." : "Safe for children to play outdoors, but monitor for coughing.";
    }
    if (activeCategory === 'elderly') {
      return aqi > 100 ? "Older adults are at higher risk for heart and lung issues. Limit outdoor exertion and keep medication nearby." : "Good air quality. Gentle outdoor walks are safe for the elderly.";
    }
    if (activeCategory === 'asthma') {
      return aqi > 100 ? "High risk of asthma attacks! Keep rescue inhalers accessible at all times. Do NOT exercise outside today." : "Fair conditions. Always carry your inhaler just in case.";
    }
    return aqi > 100 ? "Limit prolonged outdoor exertion. Use public transport over walking. Keep windows closed during peak pollution hours (8-11 AM)." : "Air quality is acceptable for general outdoor activities.";
  };

  const toggleCheck = (idx) => {
    if (checkedItems.includes(idx)) {
      setCheckedItems(checkedItems.filter(i => i !== idx));
    } else {
      setCheckedItems([...checkedItems, idx]);
    }
  };

  const safetyScore = (checkedItems.length / precautions.length) * 100;
  
  let readinessState = "Unsafe (Please prepare)";
  let readinessColor = "var(--status-poor)";
  if (safetyScore === 100) {
    readinessState = isSevere ? "Protected (Still Risky)" : "Fully Protected";
    readinessColor = isSevere ? "var(--status-moderate)" : "var(--status-good)";
  } else if (safetyScore >= 50) {
    readinessState = isSevere ? "Partially Protected" : "Adequately Prepared";
    readinessColor = "var(--status-moderate)";
  }

  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Health Advisory</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Personalized health guidance based on current air quality conditions</p>
        </div>
      </header>

      <div className="health-grid">
        <div className="advisory-card glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="panel-heading" style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <HeartPulse size={18} className="text-red" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Should I Go Outside Today?</h3>
          </div>
          
          <div className="big-alert" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '300px' }}>
            <ShieldAlert size={80} style={{ color: isSevere ? 'var(--status-poor)' : 'var(--status-moderate)', marginBottom: '16px', filter: `drop-shadow(0 0 20px ${isSevere ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.5)'})` }} />
            <h1 style={{ color: isSevere ? 'var(--status-poor)' : 'var(--status-moderate)', fontSize: '4rem', margin: '0 0 16px 0', lineHeight: 1 }}>{isSevere ? 'NO' : 'CAUTION'}</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>{healthStatus}</p>
            <div className="badge" style={{ background: isSevere ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)', border: `1px solid ${isSevere ? 'var(--status-poor)' : 'var(--status-moderate)'}`, color: isSevere ? 'var(--status-poor)' : 'var(--status-moderate)', padding: '6px 16px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600 }}>
              Based on AQI {Math.round(aqi)} for {ward?.name || 'Delhi Overview'}
            </div>
          </div>
        </div>

        <div className="category-card glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-heading" style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Risk Category Advice</h3>
          </div>
          <div className="category-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: `1px solid ${activeCategory === cat.id ? 'var(--brand-cyan)' : 'var(--border-subtle)'}`,
                  background: activeCategory === cat.id ? 'var(--brand-cyan)' : 'transparent',
                  color: activeCategory === cat.id ? '#000' : 'var(--text-primary)',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="cat-advice-box" style={{ padding: '24px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid var(--border-subtle)', borderRadius: '12px', color: 'var(--text-secondary)', lineHeight: 1.6, flex: 1, transition: 'all 0.3s ease' }}>
            {getCategoryAdvice()}
          </div>
        </div>

        <div className="checklist-card glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
          <div className="panel-heading" style={{ marginBottom: '32px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Precautions Checklist</h3>
          </div>
          
          <div className="safety-scale" style={{ marginBottom: '24px', background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Readiness to go out:</span>
              <span style={{ fontSize: '0.9rem', fontWeight: 600, color: readinessColor, transition: 'color 0.3s' }}>{readinessState}</span>
            </div>
            <div style={{ height: '8px', background: 'rgba(0,0,0,0.5)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${safetyScore}%`, background: readinessColor, transition: 'all 0.5s ease-out' }}></div>
            </div>
          </div>

          <div className="checklist-items" style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1, overflowY: 'auto' }}>
            {precautions.map((item, i) => (
              <label key={i} className="check-item hover-cyan" style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                <input 
                  type="checkbox" 
                  checked={checkedItems.includes(i)}
                  onChange={() => toggleCheck(i)}
                  style={{ width: '20px', height: '20px', accentColor: 'var(--brand-cyan)', cursor: 'pointer' }} 
                />
                <span style={{ textDecoration: checkedItems.includes(i) ? 'line-through' : 'none', color: checkedItems.includes(i) ? 'var(--text-muted)' : 'inherit', transition: 'all 0.2s' }}>{item}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
