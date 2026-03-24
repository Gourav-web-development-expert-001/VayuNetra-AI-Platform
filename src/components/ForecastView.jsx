import React from 'react';
import { LineChart as LineChartIcon } from 'lucide-react';

export default function ForecastView({ mlData, ward }) {
  const dataPoints = mlData?.forecast || [70, 110, 90, 100, 100, 115, 95];
  const maxVal = Math.max(...dataPoints, 140) + 20;
  
  const generatePath = () => {
    let path = `M 0,${100 - (dataPoints[0]/maxVal)*100}`;
    dataPoints.forEach((val, i) => {
      const x = (i / (dataPoints.length - 1)) * 100;
      const y = 100 - (val / maxVal) * 100;
      // using simple curve control points
      if (i > 0) {
        const prevX = ((i - 1) / (dataPoints.length - 1)) * 100;
        const prevY = 100 - (dataPoints[i - 1] / maxVal) * 100;
        const cp1x = prevX + (x - prevX) / 2;
        const cp1y = prevY;
        const cp2x = prevX + (x - prevX) / 2;
        const cp2y = y;
        path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
      }
    });
    return path;
  };

  const generateArea = () => {
    return `${generatePath()} L 100,100 L 0,100 Z`;
  };

  const getDynamicDays = () => {
    const today = new Date().getDay(); // 0 is Sunday, 1 is Monday...
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return Array.from({ length: 7 }, (_, i) => dayNames[(today + i) % 7]);
  };
  const days = getDynamicDays();

  return (
    <main className="generic-view animate-fade-in" style={{ padding: '24px', flex: 1 }}>
      <header className="view-header" style={{ marginBottom: '24px' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0 }}>Pollution Forecast</h2>
          <p className="subtitle" style={{ color: 'var(--text-muted)', margin: '4px 0 0 0', fontSize: '0.9rem' }}>ML-powered 7-day AQI prediction with confidence intervals</p>
        </div>
      </header>

      <div className="forecast-card glass-panel" style={{ padding: '32px', height: 'calc(100vh - 180px)', display: 'flex', flexDirection: 'column' }}>
        <div className="panel-heading" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px' }}>
          <LineChartIcon size={18} className="text-cyan" />
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>7-Day Pollution Forecast - {ward?.name || 'Delhi'}</h3>
        </div>

        <div className="chart-wrapper" style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column' }}>
          {/* Y Axis Labels */}
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: 'var(--text-muted)', fontSize: '0.8rem', paddingRight: '16px' }}>
            <span>140</span>
            <span>105</span>
            <span>70</span>
            <span>35</span>
            <span>0</span>
          </div>

          <div style={{ marginLeft: '40px', flex: 1, position: 'relative', borderBottom: '1px solid var(--border-subtle)', borderLeft: '1px solid var(--border-subtle)' }}>
            {/* Grid lines */}
            {[0, 25, 50, 75].map(top => (
              <div key={top} style={{ position: 'absolute', top: `${top}%`, left: 0, right: 0, borderTop: '1px dashed rgba(255,255,255,0.05)' }}></div>
            ))}

            {/* SVG Chart */}
            <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 100 100" style={{ position: 'absolute', inset: 0, overflow: 'visible' }}>
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(0, 240, 255, 0.2)" />
                  <stop offset="100%" stopColor="rgba(0, 240, 255, 0)" />
                </linearGradient>
              </defs>
              <path d={generateArea()} fill="url(#areaGradient)" />
              <path d={generatePath()} fill="none" stroke="var(--brand-cyan)" strokeWidth="3" vectorEffect="non-scaling-stroke" style={{ filter: 'drop-shadow(0 0 8px rgba(0, 240, 255, 0.5))' }} />
            </svg>
              
            {/* HTML Nodes (to prevent ellipse stretching of SVG circles under preserveAspectRatio="none") */}
            {dataPoints.map((val, i) => {
              const x = (i / (dataPoints.length - 1)) * 100;
              const y = 100 - (val / maxVal) * 100;
              return (
                <div 
                  key={i} 
                  title={`${days[i]}: ${val} AQI`}
                  style={{ 
                    position: 'absolute', 
                    left: `${x}%`, 
                    top: `${y}%`, 
                    width: '12px', 
                    height: '12px', 
                    background: '#000', 
                    border: '2px solid var(--brand-cyan)', 
                    borderRadius: '50%', 
                    transform: 'translate(-50%, -50%)',
                    cursor: 'pointer',
                    boxShadow: '0 0 10px rgba(0,240,255,0.5)'
                  }} 
                />
              );
            })}
          </div>

          {/* X Axis Labels */}
          <div style={{ marginLeft: '40px', height: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '8px' }}>
            {days.map(day => (
              <span key={day}>{day}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
