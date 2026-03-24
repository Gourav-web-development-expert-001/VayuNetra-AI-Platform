import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Cpu, Eye, Target, Zap } from 'lucide-react';
import './ExpandedViews.css';

const VARIANCE_DATA = [
  { region: 'Downtown', actual: 45, predicted: 42 },
  { region: 'Industrial', actual: 158, predicted: 150 },
  { region: 'West End', actual: 82, predicted: 85 },
  { region: 'Tech Park', actual: 35, predicted: 33 },
  { region: 'Port Area', actual: 210, predicted: 195 },
];

export default function AIInsightsView() {
  return (
    <main className="dashboard expanded-view">
      <div className="view-header">
        <Cpu size={28} className="text-gradient pulse-glow" />
        <h2>Extended AI Analytics</h2>
      </div>

      <div className="metrics-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="metric-card glass-panel">
          <Target size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Model Accuracy (7-Day)</span>
            <span className="metric-value text-gradient">96.4%</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Zap size={20} className="metric-icon" color="var(--status-good)" />
          <div className="metric-info">
            <span className="metric-label">Compute Latency</span>
            <span className="metric-value">12 ms</span>
          </div>
        </div>
        <div className="metric-card glass-panel">
          <Eye size={20} className="metric-icon" color="var(--brand-cyan)" />
          <div className="metric-info">
            <span className="metric-label">Anomalies Detected</span>
            <span className="metric-value text-alert">3 Active</span>
          </div>
        </div>
      </div>

      <div className="glass-panel main-chart-panel" style={{ marginTop: '24px' }}>
        <div className="card-header">
          <h3>Variance Analysis: Actual vs. Predicted AQI</h3>
        </div>
        <div style={{ height: '350px', width: '100%', marginTop: '16px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={VARIANCE_DATA} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} barGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="region" stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} contentStyle={{ backgroundColor: 'var(--bg-panel-hover)', borderColor: 'var(--border-subtle)', borderRadius: '8px' }} />
              <Bar dataKey="actual" fill="var(--status-poor)" name="Actual AQI" radius={[4, 4, 0, 0]} />
              <Bar dataKey="predicted" fill="var(--brand-cyan)" name="Predicted AQI" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="glass-panel p-4" style={{ marginTop: '24px' }}>
        <h3 className="mb-4">Recent Machine Learning Logs</h3>
        <div className="feed-list" style={{ fontFamily: 'monospace' }}>
          <div className="feed-item">
            <span className="feed-time">14:02:45 UTC</span>
            <span className="feed-desc">&gt;&gt; Re-calibrating neural weights for Industrial Zone. Gradient descent converged at step 450. Loss: 0.012</span>
          </div>
          <div className="feed-item">
            <span className="feed-time">13:45:12 UTC</span>
            <span className="feed-desc text-alert">&gt;&gt; WARN: Sudden feature drift detected in PM2.5 sensors (Port Area). Triggering secondary validation model...</span>
          </div>
          <div className="feed-item">
            <span className="feed-time">13:10:05 UTC</span>
            <span className="feed-desc">&gt;&gt; Routine inference batch complete. 4200 nodes processed across 12 feature dimensions.</span>
          </div>
        </div>
      </div>
    </main>
  );
}
