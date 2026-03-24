import React, { useState } from 'react';
import { ChevronRight, ArrowLeft, CheckCircle } from 'lucide-react';
import AIPanel from './AIPanel';
import HealthPanel from './HealthPanel';
import './Dashboard.css';

const MAP_DATA = {
  INDIA: [
    { id: 'delhi', name: 'Delhi NCR', type: 'state', aqi: 185, status: 'poor', risk: 'High', lat: 30, lng: 40, height: 80 },
    { id: 'maharashtra', name: 'Maharashtra', type: 'state', aqi: 95, status: 'good', risk: 'Low', lat: 70, lng: 30, height: 40 },
    { id: 'karnataka', name: 'Karnataka', type: 'state', aqi: 65, status: 'good', risk: 'Low', lat: 80, lng: 60, height: 30 }
  ],
  delhi: [
    { id: 'central', name: 'Central Delhi', type: 'city', aqi: 150, status: 'moderate', risk: 'Medium', lat: 45, lng: 45, height: 60 },
    { id: 'east', name: 'East Delhi', type: 'city', aqi: 180, status: 'poor', risk: 'High', lat: 40, lng: 60, height: 75 },
    { id: 'new_delhi', name: 'New Delhi', type: 'city', aqi: 110, status: 'moderate', risk: 'Medium', lat: 50, lng: 50, height: 50 },
    { id: 'north', name: 'North Delhi', type: 'city', aqi: 160, status: 'poor', risk: 'High', lat: 25, lng: 50, height: 65 },
    { id: 'northeast', name: 'North East Delhi', type: 'city', aqi: 190, status: 'poor', risk: 'High', lat: 20, lng: 65, height: 80 },
    { id: 'northwest', name: 'North West Delhi', type: 'city', aqi: 170, status: 'poor', risk: 'High', lat: 25, lng: 35, height: 70 },
    { id: 'shahdara', name: 'Shahdara', type: 'city', aqi: 210, status: 'severe', risk: 'Critical', lat: 35, lng: 70, height: 90 },
    { id: 'south', name: 'South Delhi', type: 'city', aqi: 140, status: 'moderate', risk: 'Medium', lat: 75, lng: 45, height: 55 },
    { id: 'southeast', name: 'South East Delhi', type: 'city', aqi: 185, status: 'poor', risk: 'High', lat: 65, lng: 65, height: 75 },
    { id: 'southwest', name: 'South West Delhi', type: 'city', aqi: 130, status: 'moderate', risk: 'Medium', lat: 70, lng: 25, height: 55 },
    { id: 'west', name: 'West Delhi', type: 'city', aqi: 165, status: 'poor', risk: 'High', lat: 50, lng: 25, height: 65 },
  ],
  central: [
    { id: 'c_1', name: 'Darya Ganj', aqi: 160, status: 'poor', risk: 'High', lat: 40, lng: 40, height: 65 },
    { id: 'c_2', name: 'Karol Bagh', aqi: 145, status: 'moderate', risk: 'Medium', lat: 50, lng: 50, height: 55 },
    { id: 'c_3', name: 'Paharganj', aqi: 155, status: 'poor', risk: 'High', lat: 45, lng: 60, height: 60 }
  ],
  east: [
    { id: 'e_1', name: 'Gandhi Nagar', aqi: 190, status: 'poor', risk: 'High', lat: 30, lng: 30, height: 80 },
    { id: 'e_2', name: 'Preet Vihar', aqi: 170, status: 'poor', risk: 'High', lat: 50, lng: 50, height: 70 },
    { id: 'e_3', name: 'Mayur Vihar', aqi: 185, status: 'poor', risk: 'High', lat: 70, lng: 70, height: 75 }
  ],
  new_delhi: [
    { id: 'nd_1', name: 'Connaught Place', aqi: 120, status: 'moderate', risk: 'Medium', lat: 40, lng: 40, height: 50 },
    { id: 'nd_2', name: 'Chanakyapuri', aqi: 85, status: 'good', risk: 'Low', lat: 60, lng: 30, height: 35 },
    { id: 'nd_3', name: 'Parliament Street', aqi: 95, status: 'good', risk: 'Low', lat: 50, lng: 60, height: 40 }
  ],
  north: [
    { id: 'n_1', name: 'Civil Lines', aqi: 140, status: 'moderate', risk: 'Medium', lat: 40, lng: 40, height: 55 },
    { id: 'n_2', name: 'Kotwali', aqi: 150, status: 'moderate', risk: 'Medium', lat: 50, lng: 60, height: 60 },
    { id: 'n_3', name: 'Sadar Bazar', aqi: 180, status: 'poor', risk: 'High', lat: 70, lng: 50, height: 75 }
  ],
  northeast: [
    { id: 'ne_1', name: 'Seelampur', aqi: 220, status: 'severe', risk: 'Critical', lat: 40, lng: 30, height: 90 },
    { id: 'ne_2', name: 'Yamuna Vihar', aqi: 175, status: 'poor', risk: 'High', lat: 60, lng: 50, height: 70 },
    { id: 'ne_3', name: 'Karawal Nagar', aqi: 185, status: 'poor', risk: 'High', lat: 70, lng: 70, height: 75 }
  ],
  northwest: [
    { id: 'nw_1', name: 'Saraswati Vihar', aqi: 160, status: 'poor', risk: 'High', lat: 30, lng: 30, height: 65 },
    { id: 'nw_2', name: 'Rohini', aqi: 190, status: 'poor', risk: 'High', lat: 50, lng: 40, height: 80 },
    { id: 'nw_3', name: 'Kanjhawala', aqi: 140, status: 'moderate', risk: 'Medium', lat: 70, lng: 70, height: 55 }
  ],
  shahdara: [
    { id: 'sh_1', name: 'Shahdara', aqi: 230, status: 'severe', risk: 'Critical', lat: 40, lng: 40, height: 95 },
    { id: 'sh_2', name: 'Seemapuri', aqi: 200, status: 'poor', risk: 'High', lat: 60, lng: 20, height: 85 },
    { id: 'sh_3', name: 'Vivek Vihar', aqi: 190, status: 'poor', risk: 'High', lat: 70, lng: 60, height: 80 }
  ],
  south: [
    { id: 's_1', name: 'Hauz Khas', aqi: 150, status: 'moderate', risk: 'Medium', lat: 30, lng: 40, height: 60 },
    { id: 's_2', name: 'Mehrauli', aqi: 130, status: 'moderate', risk: 'Medium', lat: 60, lng: 50, height: 50 },
    { id: 's_3', name: 'Saket', aqi: 145, status: 'moderate', risk: 'Medium', lat: 80, lng: 30, height: 55 }
  ],
  southeast: [
    { id: 'se_1', name: 'Defence Colony', aqi: 160, status: 'poor', risk: 'High', lat: 30, lng: 40, height: 65 },
    { id: 'se_2', name: 'Kalkaji', aqi: 175, status: 'poor', risk: 'High', lat: 50, lng: 60, height: 70 },
    { id: 'se_3', name: 'Sarita Vihar', aqi: 200, status: 'poor', risk: 'High', lat: 80, lng: 70, height: 85 }
  ],
  southwest: [
    { id: 'sw_1', name: 'Vasant Vihar', aqi: 120, status: 'moderate', risk: 'Medium', lat: 30, lng: 30, height: 50 },
    { id: 'sw_2', name: 'Najafgarh', aqi: 140, status: 'moderate', risk: 'Medium', lat: 60, lng: 70, height: 55 },
    { id: 'sw_3', name: 'Dwarka', aqi: 110, status: 'moderate', risk: 'Medium', lat: 70, lng: 40, height: 45 }
  ],
  west: [
    { id: 'w_1', name: 'Patel Nagar', aqi: 165, status: 'poor', risk: 'High', lat: 30, lng: 70, height: 65 },
    { id: 'w_2', name: 'Rajouri Garden', aqi: 175, status: 'poor', risk: 'High', lat: 50, lng: 40, height: 70 },
    { id: 'w_3', name: 'Punjabi Bagh', aqi: 155, status: 'poor', risk: 'High', lat: 70, lng: 60, height: 60 }
  ]
};

const BREADCRUMB_MAP = {
  INDIA: 'National Overview',
  delhi: 'Delhi NCR',
  maharashtra: 'Maharashtra',
  karnataka: 'Karnataka',
  central: 'Central Delhi',
  east: 'East Delhi',
  new_delhi: 'New Delhi',
  north: 'North Delhi',
  northeast: 'North East Delhi',
  northwest: 'North West Delhi',
  shahdara: 'Shahdara',
  south: 'South Delhi',
  southeast: 'South East Delhi',
  southwest: 'South West Delhi',
  west: 'West Delhi'
};

export default function Dashboard() {
  const [mapLevelHistory, setMapLevelHistory] = useState(['INDIA']);
  
  const currentLevelId = mapLevelHistory[mapLevelHistory.length - 1];
  const activeNodes = MAP_DATA[currentLevelId] || [];
  
  const [activeWard, setActiveWard] = useState(activeNodes[0]);
  const [activeActions, setActiveActions] = useState([]);

  const toggleAction = (actionId) => {
    if (activeActions.includes(actionId)) {
      setActiveActions(activeActions.filter(a => a !== actionId));
    } else {
      setActiveActions([...activeActions, actionId]);
    }
  };

  const currentLevelActions = [
    { id: 'traffic', label: 'Restrict Heavy Traffic', type: 'alert' },
    { id: 'sprinklers', label: 'Dispatch Water Sprinklers', type: 'normal' },
    { id: 'advisory', label: 'Issue Health Advisory', type: 'normal' },
    { id: 'smog', label: 'Deploy Mobile Smog Towers', type: 'normal' },
    { id: 'construction', label: 'Halt Construction Activities', type: 'alert' },
    { id: 'reroute', label: 'Reroute Commercial Fleet', type: 'normal' }
  ];

  const handleNodeClick = (node) => {
    setActiveWard(node);
    if (MAP_DATA[node.id]) {
      // It has sub-level data, drill down
      setMapLevelHistory([...mapLevelHistory, node.id]);
      setActiveWard(MAP_DATA[node.id][0]);
    }
  };

  const navigateUp = (index) => {
    const newHistory = mapLevelHistory.slice(0, index + 1);
    setMapLevelHistory(newHistory);
    setActiveWard(MAP_DATA[newHistory[newHistory.length - 1]][0]);
  };

  return (
    <main className="dashboard">
      <div className="main-column">
        <section className="map-container glass-panel">
        <div className="map-header">
          <div className="breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {mapLevelHistory.map((levelId, idx) => (
              <React.Fragment key={levelId}>
                {idx > 0 && <ChevronRight size={16} />}
                <span 
                  style={{ cursor: 'pointer', color: idx === mapLevelHistory.length - 1 ? 'var(--text-primary)' : 'var(--text-secondary)', fontWeight: idx === mapLevelHistory.length - 1 ? '700' : '500' }}
                  onClick={() => navigateUp(idx)}
                  className="hover-cyan"
                >
                  {BREADCRUMB_MAP[levelId]}
                </span>
              </React.Fragment>
            ))}
            {mapLevelHistory.length > 1 && (
              <button onClick={() => navigateUp(mapLevelHistory.length - 2)} style={{ background: 'transparent', border: '1px solid var(--border-subtle)', borderRadius: '4px', cursor: 'pointer', padding: '2px 8px', marginLeft: '12px', display: 'flex', alignItems: 'center', color: 'var(--text-muted)' }}>
                <ArrowLeft size={14} style={{ marginRight: '4px' }} /> Back
              </button>
            )}
          </div>
          <h2>Live Intelligence Map</h2>
          <div className="map-controls">
            <span className="control-btn active">AQI</span>
            <span className="control-btn">PM2.5</span>
            <span className="control-btn">NO2</span>
          </div>
        </div>
        
        <div className="map-3d-wrapper">
          <div className="city-plane">
            <div className="grid-lines"></div>
            
            {activeNodes.map(ward => (
              <div 
                key={ward.id} 
                className={`ward-node status-${ward.status} ${activeWard.id === ward.id ? 'active' : ''}`}
                style={{ left: `${ward.lng}%`, top: `${ward.lat}%` }}
                onClick={() => handleNodeClick(ward)}
              >
                {activeWard.id === ward.id && <div className="ward-pulse"></div>}
                
                <div className="ward-pillar" style={{ '--building-height': `${ward.height}px` }}>
                  <div className="pillar-top">{ward.aqi}</div>
                </div>
                
                <div className="ward-label">
                  {ward.name}
                  {MAP_DATA[ward.id] && <span style={{ opacity: 0.6, fontSize: '0.6rem', marginLeft: '4px' }}>▼ Drill</span>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      <AIPanel />
    </div>

      <div className="side-panel">
        <div className="ward-details glass-panel glow-border">
          <div className="ward-header">
            <h3>{activeWard.name}</h3>
            <span className={`risk-badge risk-${activeWard.status}`}>
              {activeWard.risk} Risk
            </span>
          </div>
          
          <div className="aqi-display">
            <div className="aqi-value text-gradient">{activeWard.aqi}</div>
            <div className="aqi-label">Current AQI</div>
          </div>
          
          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-label">PM2.5</span>
              <span className="stat-val">{(activeWard.aqi * 0.4).toFixed(1)} µg/m³</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">PM10</span>
              <span className="stat-val">{(activeWard.aqi * 0.8).toFixed(1)} µg/m³</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">NO2</span>
              <span className="stat-val">{(activeWard.aqi * 0.3).toFixed(1)} ppb</span>
            </div>
          </div>
        </div>

        <HealthPanel aqi={activeWard.aqi} />

        <div className="quick-actions glass-panel">
          <h3>Strategic Control</h3>
          <div className="action-list">
            {currentLevelActions.map(action => {
              const isActive = activeActions.includes(action.id);
              return (
                <button 
                  key={action.id}
                  className={`action-btn ${action.type === 'alert' ? 'alert' : ''}`}
                  onClick={() => toggleAction(action.id)}
                  style={{
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    border: isActive ? '1px solid var(--brand-cyan)' : undefined,
                    background: isActive ? 'rgba(0, 240, 255, 0.1)' : undefined,
                    color: isActive ? '#fff' : undefined,
                    boxShadow: isActive ? '0 0 10px rgba(0,240,255,0.2)' : undefined
                  }}
                >
                  {action.label}
                  {isActive && <CheckCircle size={16} color="var(--brand-cyan)" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
