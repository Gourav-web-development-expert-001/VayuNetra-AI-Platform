import React, { useState } from 'react';
import { Shield, X, CheckCircle, Fingerprint } from 'lucide-react';

export default function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    role: 'Municipal Officer',
    govtId: '',
    email: '',
    password: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      
      setTimeout(() => {
        onLogin({
          name: isLogin ? "Admin Chief" : formData.name,
          role: isLogin ? "Command Center" : formData.role,
          govtId: formData.govtId
        });
        onClose();
      }, 1500);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '450px', maxWidth: '90%', padding: '0', overflow: 'hidden', position: 'relative', border: '1px solid var(--border-neon)', animation: 'fadeIn 0.3s ease-out' }}>
        
        {/* Header */}
        <div style={{ background: 'rgba(0, 240, 255, 0.05)', padding: '24px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Shield className="text-cyan pulse-glow" size={24} />
            <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#fff' }}>VayuNetra Command Server</h2>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '32px' }}>
          
          {success ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <CheckCircle size={64} style={{ color: 'var(--status-good)', margin: '0 auto 16px auto', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))' }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.5rem', color: '#fff' }}>Verification Successful</h3>
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Government Identity Confirmed. Establishing secure uplink...</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '8px' }}>
                <button 
                  onClick={() => setIsLogin(true)}
                  style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', background: isLogin ? 'var(--brand-cyan)' : 'transparent', color: isLogin ? '#000' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Admin Login
                </button>
                <button 
                  onClick={() => setIsLogin(false)}
                  style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '6px', background: !isLogin ? 'var(--brand-cyan)' : 'transparent', color: !isLogin ? '#000' : 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                >
                  Govt Registration
                </button>
              </div>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {!isLogin && (
                  <>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Full Name</label>
                      <input required name="name" onChange={handleChange} value={formData.name} type="text" placeholder="Authorized Personnel Name" style={{ width: '100%', padding: '12px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '8px' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Department Role</label>
                      <select name="role" onChange={handleChange} value={formData.role} style={{ width: '100%', padding: '12px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '8px' }}>
                        <option style={{ background: '#000' }}>Municipal Officer</option>
                        <option style={{ background: '#000' }}>Environmental Analyst</option>
                        <option style={{ background: '#000' }}>Traffic Controller</option>
                        <option style={{ background: '#000' }}>Health Inspector</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Government ID Number</label>
                  <div style={{ position: 'relative' }}>
                    <Fingerprint size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                    <input required name="govtId" onChange={handleChange} value={formData.govtId} type="text" placeholder="e.g. AADHAR / EMP-ID" style={{ width: '100%', padding: '12px 12px 12px 36px', background: 'var(--bg-input)', border: '1px solid var(--brand-cyan)', color: '#fff', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,240,255,0.1)' }} />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Password</label>
                  <input required name="password" onChange={handleChange} value={formData.password} type="password" placeholder="••••••••" style={{ width: '100%', padding: '12px', background: 'var(--bg-input)', border: '1px solid var(--border-subtle)', color: '#fff', borderRadius: '8px' }} />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  style={{ marginTop: '16px', padding: '14px', background: 'var(--brand-cyan)', color: '#000', border: 'none', borderRadius: '8px', fontWeight: 700, cursor: isSubmitting ? 'not-allowed' : 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? (
                    'Verifying Identity...'
                  ) : (
                    isLogin ? 'Establish Uplink' : 'Register Secure Access'
                  )}
                </button>
              </form>
            </>
          )}

        </div>
      </div>
    </div>
  );
}
