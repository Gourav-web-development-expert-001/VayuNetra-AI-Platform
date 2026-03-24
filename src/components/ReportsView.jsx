import React from 'react';
import { FileText, Download } from 'lucide-react';

export default function ReportsView() {
  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Report Generation</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>Generate comprehensive PDF reports for stakeholders and regulatory compliance</p>
        </div>
      </header>

      <div className="reports-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        <div className="report-preview-card glass-panel" style={{ padding: '32px' }}>
          <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
            <FileText size={18} className="text-cyan" />
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Report Preview</h3>
          </div>
          
          <div className="preview-doc" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-subtle)', borderRadius: '12px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
              <div>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '1.4rem' }}>VayuNetra Air Quality Report</h2>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Delhi Municipal Corporation</p>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem', fontWeight: 600 }}>Draft</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Report Period</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>Feb 21 - Feb 28, 2026</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>City Average AQI</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>137</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Wards Monitored</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>8</p>
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actions Taken</span>
                <p style={{ margin: '4px 0 0 0', fontWeight: 600 }}>12</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginBottom: '24px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '12px' }}>Included Sections</span>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['AQI Summary', 'Ward Analysis', 'Health Advisory', 'Admin Actions', 'Pollution Source Analysis', 'Forecast Data'].map(chip => (
                  <span key={chip} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--border-subtle)', padding: '4px 12px', borderRadius: '16px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{chip}</span>
                ))}
              </div>
            </div>
            
            <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '16px', borderRadius: '8px', borderLeft: '3px solid var(--brand-cyan)' }}>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>This report will contain 6 sections with data from 8 wards including AQI trends, pollutant breakdowns, health advisories, and administrative actions taken during the reporting period.</p>
            </div>
          </div>
        </div>

        <div className="report-config-card glass-panel" style={{ padding: '32px', height: 'fit-content' }}>
          <div className="panel-heading" style={{ marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Report Configuration</h3>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>City</label>
              <select style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px' }}>
                <option style={{ background: '#000' }}>Delhi NCR</option>
              </select>
            </div>
            
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Date Range</label>
              <select style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)', borderRadius: '8px' }}>
                <option style={{ background: '#000' }}>Last 7 Days</option>
              </select>
            </div>

            <div className="form-group" style={{ marginTop: '8px' }}>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Include Sections</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {['AQI Summary', 'Ward Analysis', 'Health Advisory', 'Admin Actions', 'Pollution Source Analysis', 'Forecast Data'].map(item => (
                  <label key={item} className="hover-cyan" style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.95rem' }}>
                    <input type="checkbox" defaultChecked style={{ width: '18px', height: '18px', accentColor: 'var(--brand-cyan)', cursor: 'pointer' }} />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            <button className="primary-btn hover-glow" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '14px', background: 'var(--brand-cyan)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
              <Download size={18} /> Generate PDF Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
