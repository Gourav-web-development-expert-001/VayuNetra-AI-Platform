import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Stethoscope, HeartPulse, Hospital, Users } from 'lucide-react';
import './ExpandedViews.css';

const HOSPITAL_DATA = [
  { day: 'Mon', respiratoryCases: 120, aqiTrend: 110 },
  { day: 'Tue', respiratoryCases: 135, aqiTrend: 130 },
  { day: 'Wed', respiratoryCases: 180, aqiTrend: 165 },
  { day: 'Thu', respiratoryCases: 210, aqiTrend: 190 },
  { day: 'Fri', respiratoryCases: 190, aqiTrend: 150 },
  { day: 'Sat', respiratoryCases: 150, aqiTrend: 120 },
  { day: 'Sun', respiratoryCases: 110, aqiTrend: 90 },
];

export default function HealthIntelView() {
  return (
    <main className="dashboard expanded-view">
      <div className="view-header">
        <Stethoscope size={28} className="text-gradient pulse-glow" color="var(--status-good)" />
        <h2>Global Health Command</h2>
      </div>

      <div className="metrics-grid">
        <div className="metric-card glass-panel">
          <Hospital size={20} className="metric-icon" color="#fb7185" />
          <div className="metric-info">
            <span className="metric-label">Hospital Load</span>
            <span className="metric-value">84%</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <HeartPulse size={20} className="metric-icon" color="#fb7185" />
          <div className="metric-info">
            <span className="metric-label">Respiratory Cases</span>
            <span className="metric-value">+15% <span style={{fontSize: '0.8rem', color: 'var(--text-muted)'}}>vs last wk</span></span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Users size={20} className="metric-icon" color="#fb7185" />
          <div className="metric-info">
            <span className="metric-label">Affected Demographics</span>
            <span className="metric-value">Elderly (65+)</span>
          </div>
        </div>
      </div>

      <div className="glass-panel main-chart-panel" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3>Correlation: AQI Trends vs. Hospital Admissions</h3>
        </div>
        <div style={{ height: '350px', width: '100%', marginTop: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={HOSPITAL_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <defs>
                <linearGradient id="colorCases" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#fb7185" stopOpacity={0.6}/>
                  <stop offset="95%" stopColor="#fb7185" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-panel-hover)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }} />
              <Area type="monotone" dataKey="respiratoryCases" stroke="#fb7185" fillOpacity={1} fill="url(#colorCases)" name="Respiratory Admissions" strokeWidth={3} />
              <Area type="monotone" dataKey="aqiTrend" stroke="var(--status-poor)" fillOpacity={0} strokeDasharray="5 5" name="Average AQI" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-panel p-4" style={{ marginTop: '24px' }}>
        <h3 className="mb-4">Active Public Advisories</h3>
        <div className="directive-list">
          <div className="directive-item" style={{ cursor: 'default' }}>
            <div className="directive-info">
              <h4 style={{ color: '#fb7185' }}>Level 3 Respiratory Warning (Port Area)</h4>
              <p>Broadcast across mobile networks. Advising asthmatic patients to stay indoors due to PM2.5 spikes.</p>
            </div>
            <span className="active-nodes">Broadcast Active</span>
          </div>
          <div className="directive-item" style={{ cursor: 'default' }}>
            <div className="directive-info">
              <h4 style={{ color: 'var(--status-moderate)' }}>School Outdoor Activity Restriction (Industrial Zone)</h4>
              <p>Mandatory restriction of outdoor recess for primary schools within a 5km radius of the industrial cluster.</p>
            </div>
            <span className="active-nodes" style={{ color: 'var(--status-moderate)', borderColor: 'var(--status-moderate)', background: 'rgba(245,158,11,0.1)' }}>Pending Approval</span>
          </div>
        </div>
      </div>
    </main>
  );
}
