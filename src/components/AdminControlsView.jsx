import React, { useState } from 'react';
import { ShieldAlert, AlertOctagon, CheckCircle2, ToggleRight, ToggleLeft } from 'lucide-react';
import './ExpandedViews.css';

const INCIDENTS = [
  { id: 'INC-901', location: 'Industrial Zone', type: 'Unregulated Emissions', severity: 'Critical', time: '10:45 AM' },
  { id: 'INC-902', location: 'Port Area', type: 'Dust Storm', severity: 'High', time: '11:12 AM' },
  { id: 'INC-903', location: 'Highways 4 & 5', type: 'Traffic Congestion', severity: 'Medium', time: '12:05 PM' },
];

export default function AdminControlsView() {
  const [toggles, setToggles] = useState({
    waterSprinklers: false,
    heavyTraffic: true,
    factoryCaps: true,
    healthAlerts: false
  });

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="dashboard expanded-view">
      <div className="view-header">
        <ShieldAlert size={28} className="text-gradient pulse-glow" color="var(--status-poor)" />
        <h2>Strategic Command Center</h2>
      </div>

      <div className="admin-grid">
        <div className="glass-panel p-4 panel-col-2">
          <div className="card-header">
            <h3>Active Environmental Incidents</h3>
          </div>
          <table className="incident-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Location</th>
                <th>Incident Type</th>
                <th>Severity</th>
                <th>Time</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {INCIDENTS.map(inc => (
                <tr key={inc.id}>
                  <td>{inc.id}</td>
                  <td>{inc.location}</td>
                  <td>{inc.type}</td>
                  <td><span className={`severity-tag severity-${inc.severity.toLowerCase()}`}>{inc.severity}</span></td>
                  <td>{inc.time}</td>
                  <td><button className="action-btn-small">Resolve</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="glass-panel p-4">
          <div className="card-header">
            <h3>City-Wide Directives</h3>
          </div>
          <div className="directive-list">
            <div className="directive-item" onClick={() => handleToggle('waterSprinklers')}>
              <div className="directive-info">
                <h4>Automated Water Sprinklers</h4>
                <p>Deploy anti-smog guns heavily in affected wards.</p>
              </div>
              {toggles.waterSprinklers ? <ToggleRight size={32} color="var(--brand-cyan)" /> : <ToggleLeft size={32} color="var(--text-muted)" />}
            </div>

            <div className="directive-item" onClick={() => handleToggle('heavyTraffic')}>
              <div className="directive-info">
                <h4>Restrict Heavy Vehicles</h4>
                <p>Ban trucks from city core during peak hours.</p>
              </div>
              {toggles.heavyTraffic ? <ToggleRight size={32} color="var(--brand-cyan)" /> : <ToggleLeft size={32} color="var(--text-muted)" />}
            </div>

            <div className="directive-item" onClick={() => handleToggle('factoryCaps')}>
              <div className="directive-info">
                <h4>Enforce Emission Caps</h4>
                <p>Halt non-essential industrial production.</p>
              </div>
              {toggles.factoryCaps ? <ToggleRight size={32} color="var(--brand-cyan)" /> : <ToggleLeft size={32} color="var(--text-muted)" />}
            </div>
            
            <div className="directive-item" onClick={() => handleToggle('healthAlerts')}>
              <div className="directive-info">
                <h4>Mobile Health Alerts</h4>
                <p>Broadcast emergency warnings to civilian phones.</p>
              </div>
              {toggles.healthAlerts ? <ToggleRight size={32} color="var(--brand-cyan)" /> : <ToggleLeft size={32} color="var(--text-muted)" />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
