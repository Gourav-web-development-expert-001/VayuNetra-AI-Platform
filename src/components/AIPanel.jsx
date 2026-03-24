import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle, Fingerprint, BrainCircuit } from 'lucide-react';
import './AIPanel.css';

const PREDICTION_DATA = [
  { day: 'Mon', aqi: 120, predicted: 120 },
  { day: 'Tue', aqi: 135, predicted: 135 },
  { day: 'Wed', aqi: 140, predicted: 140 },
  { day: 'Thu', aqi: null, predicted: 165 },
  { day: 'Fri', aqi: null, predicted: 190 },
  { day: 'Sat', aqi: null, predicted: 150 },
  { day: 'Sun', aqi: null, predicted: 110 },
];

export default function AIPanel() {
  return (
    <div className="ai-panel-wrapper">
      <div className="ai-header">
        <BrainCircuit className="ai-icon pulse-glow" size={24} />
        <h2>Intelligence Engine</h2>
      </div>

      <div className="ai-grid">
        {/* Graph Card */}
        <div className="ai-card glass-panel col-span-2">
          <div className="card-header">
            <h3>7-Day AQI Forecast</h3>
            <span className="confidence-score">94% Confidence</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={PREDICTION_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--brand-cyan)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--brand-cyan)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--bg-panel-hover)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--brand-cyan)' }}
                />
                <Area type="monotone" dataKey="aqi" stroke="var(--status-moderate)" fillOpacity={0} strokeWidth={3} />
                <Area type="monotone" dataKey="predicted" stroke="var(--brand-cyan)" fillOpacity={1} fill="url(#colorAqi)" strokeDasharray="5 5" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Source Classification */}
        <div className="ai-card glass-panel">
          <div className="card-header">
            <h3>Source Classification</h3>
            <Fingerprint className="text-muted" size={18} />
          </div>
          <div className="source-list">
            <div className="source-item">
              <div className="source-info">
                <span className="source-name">Vehicular Traffic</span>
                <span className="source-val">42%</span>
              </div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '42%', background: 'var(--status-poor)'}}></div></div>
            </div>
            <div className="source-item">
              <div className="source-info">
                <span className="source-name">Industrial Construction</span>
                <span className="source-val">28%</span>
              </div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '28%', background: 'var(--status-moderate)'}}></div></div>
            </div>
            <div className="source-item">
              <div className="source-info">
                <span className="source-name">Dust & Biomass</span>
                <span className="source-val">15%</span>
              </div>
              <div className="progress-bg"><div className="progress-fill" style={{width: '15%', background: 'var(--status-good)'}}></div></div>
            </div>
          </div>
        </div>

        {/* Anomaly Detection */}
        <div className="ai-card glass-panel alert-card border-neon">
          <div className="card-header">
            <h3 className="text-alert flex-center gap-2"><AlertTriangle size={18} /> Anomaly Detected</h3>
          </div>
          <p className="anomaly-text">Sudden NO2 spike in Industrial Zone (+45% above normal). Correlated with unauthorized factory emissions at 08:00 AM.</p>
          <div className="insight-tags">
            <span className="tag">High Priority</span>
            <span className="tag">Action Required</span>
          </div>
        </div>
      </div>
    </div>
  );
}
