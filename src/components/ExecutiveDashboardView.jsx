import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Building2,
  Users,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Award,
  BarChart3,
  PieChart,
  Calendar,
  AlertTriangle,
  Sparkles,
  Info,
  DollarSign,
  Activity,
  Layers,
  ArrowRight
} from 'lucide-react';

export default function ExecutiveDashboardView({ transactions, customers, monthlyLoans, wallets }) {
  const [selectedPeriod, setSelectedPeriod] = useState('THIS_MONTH'); // 'THIS_MONTH', 'LAST_MONTH', 'THIS_YEAR'
  const [selectedBranch, setSelectedBranch] = useState('ALL');

  // Compute 8 KPI Metrics
  let totalIncomeLAK = 0;
  let totalExpenseLAK = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'INCOME') totalIncomeLAK += tx.amountLAKEquivalent || tx.amount;
    if (tx.type === 'EXPENSE') totalExpenseLAK += tx.amountLAKEquivalent || tx.amount;
  });

  const netProfitLAK = totalIncomeLAK - totalExpenseLAK;
  const cashLiquidityLAK = wallets ? wallets.reduce((sum, w) => sum + (w.balanceLAK || 0), 0) : 110200000;
  const activeReceivablesLAK = 85000000; // Customer receivables
  const activePayablesLAK = 12500000;   // Supplier payables
  const growthRateMoM = 15.8;           // +15.8% MoM
  const healthScore = 92;               // 92/100 Financial Health

  // Category breakdown for Donut/Pie chart simulation
  const categoryBreakdown = [
    { name: '📢 Ads ໂຄສະນາ & ການຕະຫຼາດ', amount: 4000000, percent: 35, color: '#ef4444' },
    { name: '👥 ເງິນເດືອນພະນັກງານ', amount: 3500000, percent: 30, color: '#6366f1' },
    { name: '🏠 ທີ່ຢູ່ອາໄສ & ຄ່າເຊົ່າ', amount: 2000000, percent: 18, color: '#8b5cf6' },
    { name: '🍜 ອາຫານ & ເຄື່ອງດື່ມ', amount: 1200000, percent: 10, color: '#f59e0b' },
    { name: '🚗 ການເດີນທາງ & ນ້ຳມັນ', amount: 800000, percent: 7, color: '#3b82f6' }
  ];

  // Daily/Weekly Cashflow Waterfall Chart Data
  const waterfallSteps = [
    { stage: 'ລາຍຮັບລວມ (Total Revenue)', amount: totalIncomeLAK, isPositive: true, color: '#34d399' },
    { stage: 'ຄ່າ Ads ໂຄສະນາ', amount: -4000000, isPositive: false, color: '#f87171' },
    { stage: 'ເງິນເດືອນພະນັກງານ', amount: -3500000, isPositive: false, color: '#f87171' },
    { stage: 'ຄ່າເຊົ່າ & IT Server', amount: -2000000, isPositive: false, color: '#f87171' },
    { stage: 'ກຳໄລສຸດທິ (Net Profit)', amount: netProfitLAK, isPositive: true, color: '#38bdf8' }
  ];

  // High-Expense Heatmap Days (Simulated Calendar Heatmap)
  const heatmapDays = [
    { day: '01', intensity: 'low', expense: '500,000 ₭' },
    { day: '02', intensity: 'high', expense: '4,500,000 ₭' },
    { day: '03', intensity: 'med', expense: '1,800,000 ₭' },
    { day: '04', intensity: 'low', expense: '300,000 ₭' },
    { day: '05', intensity: 'high', expense: '3,800,000 ₭' },
    { day: '06', intensity: 'low', expense: '200,000 ₭' },
    { day: '07', intensity: 'med', expense: '1,200,000 ₭' },
    { day: '08', intensity: 'low', expense: '400,000 ₭' },
    { day: '09', intensity: 'med', expense: '1,500,000 ₭' },
    { day: '10', intensity: 'high', expense: '5,200,000 ₭' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Filter Controls */}
      <div className="glass-panel" style={{ padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity size={22} color="var(--accent-purple)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>📊 ໜ້າພາບລວມການເງິນ & ສຸຂະພາບອົງກອນ (Executive Dashboard)</h3>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="month-select-box">
            <Calendar size={15} color="var(--text-muted)" />
            <select value={selectedPeriod} onChange={(e) => setSelectedPeriod(e.target.value)}>
              <option value="THIS_MONTH">ເດືອນນີ້ (August 2026)</option>
              <option value="LAST_MONTH">ເດືອນກ່ອນ (July 2026)</option>
              <option value="THIS_YEAR">ປີນີ້ (Year 2026)</option>
            </select>
          </div>

          <div className="month-select-box">
            <Building2 size={15} color="var(--text-muted)" />
            <select value={selectedBranch} onChange={(e) => setSelectedBranch(e.target.value)}>
              <option value="ALL">ທຸກສາຂາ (All Branches)</option>
              <option value="BR-01">ສາຂາ ໃຫຍ່ນະຄອນຫຼວງ</option>
              <option value="BR-02">ສາຂາ ຫຼວງພະບາງ</option>
              <option value="BR-03">ສາຂາ ຈຳປາສັກ</option>
            </select>
          </div>
        </div>
      </div>

      {/* 8 KPI Summary Cards */}
      <div className="preview-grid" style={{ margin: 0, gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))' }}>
        {/* KPI 1: Total Income */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🟢 1. ລາຍຮັບລວມ (Total Income)</p>
            <h3 style={{ color: '#34d399' }}>₭ {totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ArrowUpRight size={14} /> +12.5% ຈາກເດືອນກ່ອນ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={22} />
          </div>
        </div>

        {/* KPI 2: Total Expense */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🔴 2. ລາຍຈ່າຍລວມ (Total Expense)</p>
            <h3 style={{ color: '#f87171' }}>₭ {totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
              <ArrowDownRight size={14} /> -4.2% ຄວບຄຸມງົບໄດ້ດີ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <TrendingDown size={22} />
          </div>
        </div>

        {/* KPI 3: Net Profit */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>💰 3. ກຳໄລສຸດທິ (Net Profit)</p>
            <h3 style={{ color: '#38bdf8' }}>₭ {netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: 700 }}>
              Profit Margin: {totalIncomeLAK > 0 ? Math.round((netProfitLAK / totalIncomeLAK) * 100) : 0}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Wallet size={22} />
          </div>
        </div>

        {/* KPI 4: Cash Liquidity */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>💵 4. ເງິນສົດຄົງເຫຼືອ (Liquidity)</p>
            <h3 style={{ color: '#c084fc' }}>₭ {cashLiquidityLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#c084fc', marginTop: '4px' }}>
              ລວມ 4 ສະກຸນ (LAK, THB, USD, CNY)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Building2 size={22} />
          </div>
        </div>

        {/* KPI 5: Active Receivables */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>📋 5. ລູກໜີ້ຄ້າງຊຳລະ (Receivables)</p>
            <h3 style={{ color: '#fbbf24' }}>₭ {activeReceivablesLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#fbbf24', marginTop: '4px' }}>
              NPL Ratio ຕ່ຳ: 0.7%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24' }}>
            <Users size={22} />
          </div>
        </div>

        {/* KPI 6: Accounts Payable */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>💳 6. ໜີ້ສິນຄ້າງຈ່າຍ (Payables)</p>
            <h3 style={{ color: '#f472b6' }}>₭ {activePayablesLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#f472b6', marginTop: '4px' }}>
              ຄ່າ Ads & ເຊົ່າ ໃກ້ຄົບກຳນົດ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(236, 72, 153, 0.2)', color: '#f472b6' }}>
            <Layers size={22} />
          </div>
        </div>

        {/* KPI 7: MoM Growth */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>📈 7. ອັດຕາເຕີບໂຕ MoM %</p>
            <h3 style={{ color: '#34d399' }}>+{growthRateMoM}%</h3>
            <span style={{ fontSize: '0.78rem', color: '#34d399', marginTop: '4px' }}>
              ເຕີບໂຕຕໍ່ເນື່ອງ 6 ເດືອນ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>
            <BarChart3 size={22} />
          </div>
        </div>

        {/* KPI 8: Financial Health Gauge */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(6,182,212,0.1))', borderColor: 'rgba(16,185,129,0.3)' }}>
          <div className="kpi-info">
            <p>🛡️ 8. ສຸຂະພາບການເງິນ (Health Score)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.4rem' }}>{healthScore} / 100</h3>
            <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, marginTop: '4px' }}>
              🟢 ລະດັບດີຫຼາຍ (Excellent Health)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.25)', color: '#34d399' }}>
            <ShieldCheck size={26} />
          </div>
        </div>
      </div>

      {/* Visual Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Donut/Pie Chart for Expense Breakdown */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <PieChart size={20} color="var(--accent-purple)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>🍩 ສັດສ່ວນລາຍຈ່າຍຕາມໝວດໝູ່ (Expense Donut Chart)</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {categoryBreakdown.map((item, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                  <span style={{ fontWeight: 600 }}>{item.name}</span>
                  <span style={{ fontWeight: 700, color: item.color }}>₭ {item.amount.toLocaleString()} ({item.percent}%)</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '4px' }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waterfall Chart (Revenue to Net Profit) */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <BarChart3 size={20} color="var(--accent-cyan)" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>🌊 ຜົນແຍກຈາກລາຍຮັບ ຫາ ກຳໄລ (Waterfall Chart)</h4>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {waterfallSteps.map((step, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderRadius: '10px', background: 'rgba(0,0,0,0.2)', borderLeft: `4px solid ${step.color}` }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{step.stage}</span>
                <span style={{ fontSize: '0.9rem', fontWeight: 800, color: step.color }}>
                  {step.isPositive ? '+' : ''}₭ {Math.abs(step.amount).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* High-Expense Days Heatmap */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Activity size={20} color="#fbbf24" />
            <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>🔥 ວັນທີ່ມີລາຍຈ່າຍສູງ (Expense Heatmap Days)</h4>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
            {heatmapDays.map((d, i) => {
              const bg = d.intensity === 'high' ? 'rgba(239, 68, 68, 0.35)' : d.intensity === 'med' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.15)';
              const border = d.intensity === 'high' ? '#ef4444' : d.intensity === 'med' ? '#f59e0b' : '#10b981';

              return (
                <div key={i} style={{ padding: '10px 6px', borderRadius: '8px', background: bg, border: `1px solid ${border}`, textAlign: 'center' }} title={`ວັນທີ ${d.day}: ${d.expense}`}>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>ວັນທີ {d.day}</div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: border, marginTop: '2px' }}>{d.expense}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
