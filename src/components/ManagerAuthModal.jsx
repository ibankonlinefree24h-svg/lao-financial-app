import React, { useState } from 'react';
import {
  Sparkles,
  Lock,
  User,
  ShieldCheck,
  Building2,
  KeyRound,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Zap,
  Globe
} from 'lucide-react';

export default function ManagerAuthModal({ onLoginSuccess }) {
  const [username, setUsername] = useState('manager');
  const [password, setPassword] = useState('123456');
  const [selectedBranch, setSelectedBranch] = useState('BR-01');
  const [selectedRole, setSelectedRole] = useState('MANAGER');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const branches = [
    { id: 'BR-01', name: '🏢 ສາຂາ ໃຫຍ່ນະຄອນຫຼວງວຽງຈັນ (Headquarters)' },
    { id: 'BR-02', name: '🏬 ສາຂາ ຫຼວງພະບາງ (Luang Prabang Branch)' },
    { id: 'BR-03', name: '🌾 ສາຂາ ຈຳປາສັກ (Champasak Branch)' }
  ];

  const roles = [
    { id: 'SUPER_ADMIN', name: '👑 Super Admin (ສິດສູງສຸດ)' },
    { id: 'MANAGER', name: '💼 Manager (ຜູ້ຈັດການການເງິນ)' },
    { id: 'ACCOUNTANT', name: '📊 Accountant (ນັກບັນຊີ)' },
    { id: 'AUDITOR', name: '🔍 Auditor (ຜູ້ກວດສອບ)' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setErrorMsg('ກະລຸນາປ້ອນຊື່ຜູ້ໃຊ້ ແລະ ລະຫັດຜ່ານ');
      return;
    }

    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const userProfile = {
        username,
        role: selectedRole,
        branchId: selectedBranch,
        branchName: branches.find((b) => b.id === selectedBranch)?.name || 'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ',
        loggedInAt: new Date().toISOString()
      };
      onLoginSuccess(userProfile);
    }, 600);
  };

  const handleDemoLogin = (roleId) => {
    setSelectedRole(roleId);
    setUsername(roleId.toLowerCase());
    setPassword('123456');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess({
        username: roleId.toLowerCase(),
        role: roleId,
        branchId: selectedBranch,
        branchName: branches.find((b) => b.id === selectedBranch)?.name || 'ສາຂາ ນະຄອນຫຼວງວຽງຈັນ',
        loggedInAt: new Date().toISOString()
      });
    }, 400);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top right, #1e1b4b 0%, #0f172a 60%, #020617 100%)',
        padding: '16px',
        overflowY: 'auto'
      }}
    >
      {/* Background Decorative Glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.25) 0%, rgba(99, 102, 241, 0.1) 50%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          filter: 'blur(40px)'
        }}
      />

      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '460px',
          padding: '36px 30px',
          background: 'rgba(15, 23, 42, 0.85)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          borderRadius: '24px',
          position: 'relative',
          zIndex: 10
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7, #ec4899)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.5)'
            }}
          >
            <Sparkles size={32} />
          </div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', margin: '0 0 6px' }}>
            IBank Manager Panel
          </h2>
          <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: 0 }}>
            ລະບົບຈັດການການເງິນ ແລະ ສິນເຊື່ອລະດັບອົງກອນ (Enterprise Platform)
          </p>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              color: '#f87171',
              fontSize: '0.85rem',
              marginBottom: '18px',
              textAlign: 'center'
            }}
          >
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Branch Select */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Building2 size={15} color="#a855f7" /> ເລືອກສາຂາ (Branch)
            </label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              {branches.map((b) => (
                <option key={b.id} value={b.id} style={{ background: '#0f172a', color: '#fff' }}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Username */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={15} color="#38bdf8" /> ຊື່ຜູ້ໃຊ້ (Username) *
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ປ້ອນຊື່ຜູ້ໃຊ້ ຫຼື manager"
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Password */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Lock size={15} color="#34d399" /> ລະຫັດຜ່ານ (Password) *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="ປ້ອນລະຫັດຜ່ານ"
                style={{
                  width: '100%',
                  padding: '12px 42px 12px 14px',
                  borderRadius: '12px',
                  background: 'rgba(30, 41, 59, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer'
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <KeyRound size={15} color="#fbbf24" /> ສິດການໃຊ້ງານ (Role Scope)
            </label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '12px',
                background: 'rgba(30, 41, 59, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id} style={{ background: '#0f172a', color: '#fff' }}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94a3b8', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ accentColor: '#a855f7' }}
              />
              ຈົດຈຳການເຂົ້າລະບົບ (Remember Me)
            </label>
            <span style={{ color: '#a855f7', cursor: 'pointer', fontWeight: 600 }}>ລືມລະຫັດຜ່ານ?</span>
          </div>

          {/* Main Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              marginTop: '6px',
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.98rem',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 8px 25px rgba(168, 85, 247, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.25s ease'
            }}
          >
            {isLoading ? (
              <span>⏳ ກຳລັງເຂົ້າສູ່ລະບົບ...</span>
            ) : (
              <>
                <span>ເຂົ້າສູ່ລະບົບຜູ້ຈັດການ (Sign In)</span> <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* ⚡ 1-Click Fast Demo Login Buttons */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', textAlign: 'center', marginBottom: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <Zap size={14} color="#facc15" /> ປຸ່ມເຂົ້າລະບົບທົດສອບດ່ວນ (1-Click Demo Login):
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
            <button
              type="button"
              className="icon-btn-xs"
              style={{ width: '100%', padding: '8px 10px', fontSize: '0.78rem', background: 'rgba(168,85,247,0.2)', color: '#c084fc', border: '1px solid rgba(168,85,247,0.3)' }}
              onClick={() => handleDemoLogin('MANAGER')}
            >
              💼 Manager
            </button>

            <button
              type="button"
              className="icon-btn-xs"
              style={{ width: '100%', padding: '8px 10px', fontSize: '0.78rem', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', border: '1px solid rgba(56,189,248,0.3)' }}
              onClick={() => handleDemoLogin('ACCOUNTANT')}
            >
              📊 Accountant
            </button>
          </div>
        </div>

        {/* Security Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.75rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          <ShieldCheck size={14} color="#34d399" />
          <span>ປອດໄພດ້ວຍລະບົບ 256-Bit SSL Encryption & Audit Trail Logs</span>
        </div>
      </div>
    </div>
  );
}
