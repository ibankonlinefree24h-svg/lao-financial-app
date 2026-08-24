import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  PlusCircle,
  MinusCircle,
  RefreshCw,
  Search,
  Filter,
  Image as ImageIcon,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Sliders,
  X,
  FileSpreadsheet,
  Printer,
  Sparkles,
  BarChart3,
  Building2,
  Calendar,
  PieChart,
  Target,
  ArrowRightLeft,
  Tag,
  Clock,
  ShieldCheck,
  Award,
  Download,
  CheckCircle,
  History,
  Layers,
  Scale,
  Globe,
  Zap,
  Activity,
  CreditCard,
  ChevronRight,
  Table,
  Eye,
  User,
  Phone,
  MapPin,
  CheckSquare,
  FileText,
  AlertTriangle,
  Compass,
  Cpu,
  Sun,
  PiggyBank,
  Briefcase
} from 'lucide-react';
import {
  defaultExchangeRates,
  initialWallets,
  expenseCategories,
  incomeCategories,
  lifetimeFinancialData,
  breakEvenAnalysisData,
  financialForecastData,
  aiTaxAndHealthData,
  seasonalTrendsData,
  investmentPlanningFunds
} from '../data/mockIncomeExpenses';
import ReceiptModal from './ReceiptModal';

export default function IncomeExpenseView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate,
  onUpdateExchangeRate
}) {
  const [activeMainTab, setActiveMainTab] = useState('GRANULAR_TABLE'); // 'GRANULAR_TABLE', 'CONTINUOUS_CHART', 'PLANNING_SUITE', 'WALLETS', 'TRANSACTIONS'
  const [planningSubTab, setPlanningSubTab] = useState('AI_TAX'); // 'AI_TAX', 'INVESTMENT', 'SEASONAL', 'PROJECTION', 'BUDGET'
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [activeReceiptTx, setActiveReceiptTx] = useState(null);
  const [activeDetailTx, setActiveDetailTx] = useState(null);
  const [activeMonthAudit, setActiveMonthAudit] = useState(null);
  const [isEditingRate, setIsEditingRate] = useState(false);

  // Exchange Rates State
  const [rates, setRates] = useState(defaultExchangeRates);
  const [tempThbRate, setTempThbRate] = useState(rates.thbToLak);
  const [tempUsdRate, setTempUsdRate] = useState(rates.usdToLak);
  const [tempCnyRate, setTempCnyRate] = useState(rates.cnyToLak);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'THB') return Math.round(amount * rates.thbToLak);
    if (c === 'USD') return Math.round(amount * rates.usdToLak);
    if (c === 'CNY') return Math.round(amount * rates.cnyToLak);
    if (c === 'RUB') return Math.round(amount * rates.rubToLak);
    return Math.round(amount);
  };

  const { allTimeSummary, yearlyHistory, continuous24Months } = lifetimeFinancialData;

  let maxIncomeVal = 10000000;
  continuous24Months.forEach((m) => {
    if (m.income > maxIncomeVal) maxIncomeVal = m.income;
  });

  const totalWalletLiquidityLAK = initialWallets.reduce((sum, w) => sum + w.balanceLAK, 0);

  const handleSaveRates = () => {
    setRates({
      ...rates,
      thbToLak: Number(tempThbRate),
      usdToLak: Number(tempUsdRate),
      cnyToLak: Number(tempCnyRate)
    });
    setIsEditingRate(false);
  };

  const handleExportData = (type) => {
    alert(`ລະບົບກຳລັງສ້າງ ແລະ ສົ່ງອອກໄຟລ໌ຕາຕະລາງລາຍລະອຽດ 24 ເດືອນ (.${type.toUpperCase()}) ໃຫ້ຮຽບຮ້ອຍ!`);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTypeFilter !== 'ALL' && tx.type !== activeTypeFilter) return false;

    const matchSearch =
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerName && tx.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.tags && tx.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 👑 1. ULTRA-LUXURY EXECUTIVE COMMAND HERO HEADER */}
      <div
        className="glass-panel"
        style={{
          padding: '22px 26px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.85))',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.45)',
          backdropFilter: 'blur(20px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.45)'
            }}
          >
            <Zap size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
              ⚡ ລະບົບບໍລິຫານ ລາຍຮັບ-ລາຍຈ່າຍ (Executive Financial Center)
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              ຕິດຕາມລາຍຮັບດອກເບ້ຍສິນເຊື່ອ, ລາຍຈ່າຍ, ເຄື່ອງມື AI ວິເຄາະ ແລະ ວາງແຜນການເງິນຄົບວົງຈອນ
            </p>
          </div>
        </div>

        {/* 3 Prominent Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            className="btn-primary-emerald"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
              fontWeight: 800,
              borderRadius: '14px',
              boxShadow: '0 6px 20px rgba(16, 185, 129, 0.45)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onClick={() => onAddTransaction('INCOME')}
          >
            <PlusCircle size={20} /> + ບັນທຶກລາຍຮັບ
          </button>

          <button
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '14px',
              fontWeight: 800,
              fontSize: '0.95rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(239, 68, 68, 0.45)',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => onAddTransaction('EXPENSE')}
          >
            <MinusCircle size={20} /> - ບັນທຶກລາຍຈ່າຍ
          </button>

          <button
            style={{
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white',
              padding: '12px 22px',
              borderRadius: '14px',
              fontWeight: 700,
              fontSize: '0.92rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => onAddTransaction('TRANSFER')}
          >
            <ArrowRightLeft size={18} /> 🔄 ໂອນຍ້າຍບັນຊີ
          </button>
        </div>
      </div>

      {/* 2. Exchange Rate Bar */}
      <div
        className="exchange-rate-banner"
        style={{
          background: 'rgba(15, 23, 42, 0.75)',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          padding: '12px 20px',
          backdropFilter: 'blur(16px)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #a855f7, #6366f1)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white'
            }}
          >
            <RefreshCw size={16} />
          </div>
          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
            ອັດຕາແລກປ່ຽນ 4 ສະກຸນ: <strong>1 THB = {rates.thbToLak} ₭</strong> | <strong>1 USD = {rates.usdToLak.toLocaleString()} ₭</strong> | <strong>1 CNY = {rates.cnyToLak.toLocaleString()} ₭</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isEditingRate ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem' }}>THB:</span>
              <input
                type="number"
                value={tempThbRate}
                onChange={(e) => setTempThbRate(e.target.value)}
                style={{ width: '65px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem' }}>USD:</span>
              <input
                type="number"
                value={tempUsdRate}
                onChange={(e) => setTempUsdRate(e.target.value)}
                style={{ width: '80px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem' }}>CNY:</span>
              <input
                type="number"
                value={tempCnyRate}
                onChange={(e) => setTempCnyRate(e.target.value)}
                style={{ width: '70px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <button className="icon-btn-xs" style={{ width: 'auto', padding: '4px 10px' }} onClick={handleSaveRates}>
                ບັນທຶກ
              </button>
            </div>
          ) : (
            <button
              className="icon-btn-xs"
              style={{ width: 'auto', padding: '6px 14px', fontSize: '0.8rem', display: 'flex', gap: '6px', background: 'rgba(255,255,255,0.06)' }}
              onClick={() => setIsEditingRate(true)}
            >
              <Sliders size={14} /> ປັບອັດຕາແລກປ່ຽນ
            </button>
          )}

          <button
            className="icon-btn-xs"
            style={{
              width: 'auto',
              padding: '6px 14px',
              fontSize: '0.8rem',
              background: 'rgba(16,185,129,0.18)',
              color: '#34d399',
              border: '1px solid rgba(16,185,129,0.3)',
              display: 'flex',
              gap: '6px',
              borderRadius: '8px'
            }}
            onClick={() => handleExportData('xlsx')}
          >
            <FileSpreadsheet size={14} /> Export Excel/PDF 24 ເດືອນ
          </button>
        </div>
      </div>

      {/* 3. Executive KPI Cards */}
      <div className="preview-grid" style={{ margin: 0 }}>
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))', borderColor: 'rgba(16, 185, 129, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ (Loan Interest Revenue)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '14px' }}>
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(185, 28, 28, 0.08))', borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowDownRight size={15} /> Ads ໂຄສະນາ, ເງິນເດືອນ, IT Server
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '14px' }}>
            <TrendingDown size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(2, 132, 199, 0.1))', borderColor: 'rgba(6, 182, 212, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>💰 ກຳໄລສຸດທິລວມ (Net Profit)</p>
            <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາກຳໄລລວມ: {allTimeSummary.overallProfitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', borderRadius: '14px' }}>
            <Wallet size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>💳 ເງິນສົດ & ບັນຊີຄົງເຫຼືອລວມ (Liquidity)</p>
            <h3 style={{ color: '#c084fc', fontSize: '1.5rem', fontWeight: 800 }}>₭ {totalWalletLiquidityLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: 600 }}>
              ລວມ BCEL One, JDB, LDB, APB & Cash
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', borderRadius: '14px' }}>
            <Building2 size={26} />
          </div>
        </div>
      </div>

      {/* 4. Sleek Categorized Sub-Tab Navigation Bar */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
          <button
            className={`filter-pill-btn ${activeMainTab === 'GRANULAR_TABLE' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('GRANULAR_TABLE')}
            style={{ padding: '9px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            📑 1. ຕາຕະລາງລາຍລະອຽດ 24 ເດືອນ (24-Month Table)
          </button>

          <button
            className={`filter-pill-btn ${activeMainTab === 'CONTINUOUS_CHART' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('CONTINUOUS_CHART')}
            style={{ padding: '9px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            📊 2. ກຣາຟຟິກ 24 ເດືອນ ລຽງກັນ (24-Month Graphic)
          </button>

          <button
            className={`filter-pill-btn ${activeMainTab === 'PLANNING_SUITE' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('PLANNING_SUITE')}
            style={{ padding: '9px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            🔮 3. AI ວິເຄາະ & ວາງແຜນການເງິນ (AI & Planning Suite)
          </button>

          <button
            className={`filter-pill-btn ${activeMainTab === 'WALLETS' ? 'active' : ''}`}
            onClick={() => setActiveMainTab('WALLETS')}
            style={{ padding: '9px 20px', fontSize: '0.9rem', borderRadius: '12px' }}
          >
            💳 4. ບັນຊີ & ທຸລະກຳ Real-Time ({transactions.length})
          </button>
        </div>

        {/* Secondary Sub-Tabs for Planning Suite */}
        {activeMainTab === 'PLANNING_SUITE' && (
          <div style={{ display: 'flex', gap: '8px', padding: '10px 14px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', flexWrap: 'wrap', border: '1px solid var(--border-color)' }}>
            <button
              className={`filter-pill-btn ${planningSubTab === 'AI_TAX' ? 'active' : ''}`}
              onClick={() => setPlanningSubTab('AI_TAX')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              🤖 AI ວິເຄາະສຸຂະພາບ & ອາກອນ
            </button>

            <button
              className={`filter-pill-btn ${planningSubTab === 'INVESTMENT' ? 'active' : ''}`}
              onClick={() => setPlanningSubTab('INVESTMENT')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              💎 ແຜນເກັບເງິນອອມ & ກອງທຶນລົງທຶນ
            </button>

            <button
              className={`filter-pill-btn ${planningSubTab === 'SEASONAL' ? 'active' : ''}`}
              onClick={() => setPlanningSubTab('SEASONAL')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              🌸 ວິເຄາະຕາມລະດູກາລ (Seasonal Peak)
            </button>

            <button
              className={`filter-pill-btn ${planningSubTab === 'PROJECTION' ? 'active' : ''}`}
              onClick={() => setPlanningSubTab('PROJECTION')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              🔮 ປະມານການ 3 ເດືອນ & Break-Even
            </button>

            <button
              className={`filter-pill-btn ${planningSubTab === 'BUDGET' ? 'active' : ''}`}
              onClick={() => setPlanningSubTab('BUDGET')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              💡 ເຕືອນງົບປະມານ & Statement Reconciliation
            </button>
          </div>
        )}
      </div>

      {/* 🌟 TAB 1: GRANULAR 24-MONTH DETAILED BREAKDOWN TABLE */}
      {activeMainTab === 'GRANULAR_TABLE' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Table size={28} color="#34d399" />
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                  📑 ຕາຕະລາງລາຍລະອຽດ ລາຍຮັບ-ລາຍຈ່າຍ ຄົບ 24 ເດືອນ (2025 - 2026)
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  ແຍກລາຍລະອຽດດອກເບ້ຍສິນເຊື່ອ, ຄ່າ Ads, ເງິນເດືອນ, ຄ່າເຊົ່າ, ກຳໄລສຸດທິ, % ກຳໄລ ແລະ % MoM
                </p>
              </div>
            </div>

            <button
              className="btn-primary-emerald"
              onClick={() => handleExportData('xlsx')}
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              <FileSpreadsheet size={16} /> Export Excel/PDF 24 ເດືອນ
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="customer-full-table" style={{ fontSize: '0.84rem' }}>
              <thead>
                <tr>
                  <th style={{ minWidth: '110px' }}>ເດືອນ/ປີ</th>
                  <th style={{ color: '#34d399' }}>🟢 ດອກເບ້ຍສິນເຊື່ອ</th>
                  <th style={{ color: '#10b981', fontWeight: 800 }}>🟢 ລາຍຮັບລວມ</th>
                  <th style={{ color: '#f87171' }}>🔴 ຄ່າ Ads ໂຄສະນາ</th>
                  <th style={{ color: '#fb7185' }}>🔴 ເງິນເດືອນ</th>
                  <th style={{ color: '#f43f5e' }}>🔴 ຄ່າເຊົ່າ & IT</th>
                  <th style={{ color: '#ef4444', fontWeight: 800 }}>🔴 ລາຍຈ່າຍລວມ</th>
                  <th style={{ color: '#38bdf8', fontWeight: 800 }}>💰 ກຳໄລສຸດທິ</th>
                  <th>% ກຳໄລ</th>
                  <th>% MoM</th>
                  <th>ກວດສອບ</th>
                </tr>
              </thead>
              <tbody>
                {continuous24Months.map((m, idx) => {
                  const is2026 = m.year === '2026';
                  return (
                    <tr key={idx} style={is2026 ? { background: 'rgba(16, 185, 129, 0.04)' } : {}}>
                      <td style={{ fontWeight: 800, color: is2026 ? '#34d399' : '#38bdf8' }}>
                        {m.month}
                      </td>
                      <td style={{ color: '#34d399', fontWeight: 600 }}>₭ {m.interestIncome.toLocaleString()}</td>
                      <td style={{ color: '#10b981', fontWeight: 800 }}>₭ {m.income.toLocaleString()}</td>
                      <td style={{ color: '#f87171' }}>₭ {m.adsExpense.toLocaleString()}</td>
                      <td style={{ color: '#fb7185' }}>₭ {m.salaryExpense.toLocaleString()}</td>
                      <td style={{ color: '#f43f5e' }}>₭ {m.officeExpense.toLocaleString()}</td>
                      <td style={{ color: '#ef4444', fontWeight: 800 }}>₭ {m.expense.toLocaleString()}</td>
                      <td style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>₭ {m.profit.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{m.margin}%</td>
                      <td>
                        <span className="status-badge-pill green" style={{ fontSize: '0.72rem' }}>
                          {m.growthMoM}
                        </span>
                      </td>
                      <td>
                        <button
                          className="table-link-btn"
                          onClick={() => setActiveMonthAudit(m)}
                          style={{ padding: '3px 8px', fontSize: '0.75rem' }}
                        >
                          <Eye size={12} /> Audit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 🌟 TAB 2: CONTINUOUS 24-MONTH GRAPHIC BAR CHART */}
      {activeMainTab === 'CONTINUOUS_CHART' && (
        <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChart3 size={28} color="#34d399" />
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
                  📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ ລຽງກັນຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 ຫາ 2026 ປະຈຸບັນ)
                </h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  ສະແດງ 24 ເດືອນລຽງກັນ: 🔷 12 ເດືອນ ປີກໍ່ຕັ້ງ 2025 | 🟢 12 ເດືອນ ປີປະຈຸບັນ 2026
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span className="tag tag-blue" style={{ fontSize: '0.82rem' }}>
                📅 ປີກໍ່ຕັ້ງ 2025: ₭ 182.4M
              </span>
              <span className="tag tag-emerald" style={{ fontSize: '0.82rem' }}>
                🟢 ປີປະຈຸບັນ 2026: ₭ 288.6M (+58.2%)
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '330px', padding: '26px 16px 16px', background: 'rgba(0,0,0,0.35)', borderRadius: '16px', gap: '6px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
            {continuous24Months.map((d, i) => {
              const incomeHeight = Math.max(12, Math.round((d.income / maxIncomeVal) * 100));
              const expenseHeight = Math.max(12, Math.round((d.expense / maxIncomeVal) * 100));
              const is2026 = d.year === '2026';

              return (
                <div key={i} style={{ flex: 1, minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.66rem', color: d.growthMoM.startsWith('+') ? '#34d399' : d.growthMoM === 'ເລີ່ມຕົ້ນ' ? '#818cf8' : '#f87171', fontWeight: 800, marginBottom: '6px' }}>
                    {d.growthMoM}
                  </span>

                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '210px', width: '100%', justifyContent: 'center' }}>
                    <div
                      style={{
                        width: '44%',
                        background: is2026
                          ? 'linear-gradient(180deg, #34d399, #059669)'
                          : 'linear-gradient(180deg, #38bdf8, #0284c7)',
                        height: `${incomeHeight}%`,
                        borderRadius: '4px 4px 0 0',
                        boxShadow: is2026 ? '0 0 10px rgba(16, 185, 129, 0.35)' : '0 0 10px rgba(56, 189, 248, 0.35)'
                      }}
                      title={`${d.month}: ລາຍຮັບ ₭ ${d.income.toLocaleString()}`}
                    />
                    <div
                      style={{
                        width: '44%',
                        background: 'linear-gradient(180deg, #f87171, #dc2626)',
                        height: `${expenseHeight}%`,
                        borderRadius: '4px 4px 0 0',
                        boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                      }}
                      title={`${d.month}: ລາຍຈ່າຍ ₭ ${d.expense.toLocaleString()}`}
                    />
                  </div>

                  <span style={{ fontSize: '0.7rem', marginTop: '10px', color: is2026 ? '#34d399' : '#38bdf8', fontWeight: 700, textAlign: 'center', whiteSpace: 'nowrap' }}>
                    {d.shortMonth}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '18px', fontSize: '0.85rem', fontWeight: 700 }}>
              <span style={{ color: '#38bdf8' }}>🔷 ປີກໍ່ຕັ້ງ 2025 (12 ເດືອນ - ສີຟ້າ)</span>
              <span style={{ color: '#34d399' }}>🟢 ປີປະຈຸບັນ 2026 (12 ເດືອນ - ສີຂຽວ)</span>
              <span style={{ color: '#f87171' }}>🔴 ລາຍຈ່າຍ (ສີແດງ)</span>
            </div>

            <span style={{ fontSize: '0.88rem', color: '#38bdf8', fontWeight: 800 }}>
              💰 ລາຍຮັບລວມ 24 ເດືອນ: ₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* 🌟 TAB 3: AI & PLANNING SUITE */}
      {activeMainTab === 'PLANNING_SUITE' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Sub-Module 1: AI Tax & Financial Health */}
          {planningSubTab === 'AI_TAX' && (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.12), rgba(15, 23, 42, 0.9))', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Cpu size={30} color="#c084fc" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🤖 AI ວິເຄາະສຸຂະພາບການເງິນ & ປະມານການອາກອນ (AI Tax & Health)</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ວິເຄາະສຸຂະພາບການເງິນອັດໂນມັດ ພ້ອມປະມານການອາກອນກຳໄລ 5% ຕາມກົດໝາຍອາກອນລາວ
                    </p>
                  </div>
                </div>

                <span className="tag tag-purple" style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
                  {aiTaxAndHealthData.financialRating}
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #a855f7', borderRadius: '16px' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ຄະແນນສຸຂະພາບການເງິນ (AI Health Score)</div>
                  <h3 style={{ fontSize: '1.6rem', color: '#c084fc', margin: '6px 0 0', fontWeight: 800 }}>
                    {aiTaxAndHealthData.healthScore} / 100
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, marginTop: '4px' }}>
                    🟢 ກຳໄລສູງ 76.1% & ສະພາບຄ່ອງແຂງແຮງ
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #f59e0b', borderRadius: '16px' }}>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ປະມານການອາກອນກຳໄລ (5% SME Profit Tax)</div>
                  <h3 style={{ fontSize: '1.6rem', color: '#fbbf24', margin: '6px 0 0', fontWeight: 800 }}>
                    ₭ {aiTaxAndHealthData.estimatedTaxLAK.toLocaleString()} LAK
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    ຄຳນວນຈາກກຳໄລລວມ ₭ {aiTaxAndHealthData.totalNetProfitLAK.toLocaleString()}
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '18px', background: 'rgba(16,185,129,0.12)', borderLeft: '4px solid #10b981', borderRadius: '16px' }}>
                  <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>ເງິນອອມສຳຮອງຄວາມສ່ຽງ NPL (15% Reserve)</div>
                  <h3 style={{ fontSize: '1.6rem', color: '#34d399', margin: '6px 0 0', fontWeight: 800 }}>
                    ₭ {aiTaxAndHealthData.recommendedReserveLAK.toLocaleString()} LAK
                  </h3>
                  <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700, marginTop: '4px' }}>
                    💡 ຄວນກັນໄວ້ຮອງຮັບຄວາມສ່ຽງໜີ້ເສຍ
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#c084fc', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} /> ຂໍ້ແນະນຳທາງການເງິນຈາກ AI (AI Strategic Advice):
                </h4>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.88rem', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {aiTaxAndHealthData.aiAdvicePoints.map((pt, idx) => (
                    <li key={idx}>{pt}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Sub-Module 2: Savings & Investment Funds */}
          {planningSubTab === 'INVESTMENT' && (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <PiggyBank size={30} color="#34d399" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>💎 ແຜນການເກັບເງິນອອມ & ແຜນລົງທຶນຕໍ່ໜ້າ (Savings & Future Investment)</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ກອງທຶນສຳຮອງສຸກເສີນ, ຂະຫຍາຍສິນເຊື່ອ, ຊື້ສິນຊັບ & ອາຄານ, ແລະ ພັດທະນາລະບົບ IT
                    </p>
                  </div>
                </div>

                <button className="btn-primary-emerald" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                  <PlusCircle size={16} /> + ສ້າງກອງທຶນໃໝ່
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '18px' }}>
                {investmentPlanningFunds.map((fund) => {
                  const progressPercent = Math.round((fund.currentLAK / fund.targetLAK) * 100);
                  return (
                    <div key={fund.id} className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${fund.color}`, borderRadius: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span className="tag tag-emerald" style={{ fontSize: '0.75rem' }}>{fund.status}</span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 800, color: fund.color }}>{progressPercent}%</span>
                      </div>
                      <h4 style={{ fontSize: '1.02rem', fontWeight: 800, margin: '10px 0 4px', color: 'var(--text-primary)' }}>{fund.name}</h4>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        ເກັບໄດ້: <strong style={{ color: fund.color }}>₭ {fund.currentLAK.toLocaleString()}</strong> / ເປົ້າໝາຍ ₭ {fund.targetLAK.toLocaleString()}
                      </div>
                      <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '10px', borderRadius: '5px', marginTop: '12px', overflow: 'hidden' }}>
                        <div style={{ width: `${progressPercent}%`, background: fund.color, height: '100%', borderRadius: '5px' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sub-Module 3: Seasonal Trends */}
          {planningSubTab === 'SEASONAL' && (
            <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <Sun size={30} color="#f59e0b" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🌸 ວິເຄາະການເງິນຕາມລະດູກາລ (Seasonal Peak & Off-Peak Analytics)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ວິເຄາະຊ່ວງເວລາທີ່ມີຄວາມຕ້ອງການສິນເຊື່ອສູງສຸດໃນລາວ ເພື່ອວາງແຜນສະພາບຄ່ອງເງິນສົດ
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                {seasonalTrendsData.map((s, idx) => (
                  <div key={idx} className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #f59e0b', borderRadius: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#fbbf24' }}>{s.season}</h4>
                      <span className="tag tag-gold" style={{ fontSize: '0.78rem' }}>{s.demandIncrease}</span>
                    </div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px', marginBottom: 0 }}>
                      {s.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Module 4: Projection & Break-Even */}
          {planningSubTab === 'PROJECTION' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(30, 41, 59, 0.9))', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <Target size={28} color="#38bdf8" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🎯 ລະບົບວິເຄາະຈຸດຄຸ້ມທຶນ (Break-Even Point Analysis)</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ຄຳນວນຈຳນວນສັນຍາສິນເຊື່ອຂັ້ນຕ່ຳທີ່ຕ້ອງມີ ເພື່ອໃຫ້ກຸ້ມຄ່າໃຊ້ຈ່າຍຄົງທີ່ປະຈຳເດືອນ
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
                  <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #ef4444', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ຄ່າໃຊ້ຈ່າຍຄົງທີ່ປະຈຳເດືອນ (Fixed Costs)</div>
                    <h3 style={{ fontSize: '1.3rem', color: '#f87171', margin: '6px 0 0', fontWeight: 800 }}>
                      ₭ {breakEvenAnalysisData.monthlyFixedExpenseLAK.toLocaleString()} / ເດືອນ
                    </h3>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #a855f7', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ຈຳນວນສັນຍາກຸ້ມທຶນ (Break-Even Loans)</div>
                    <h3 style={{ fontSize: '1.3rem', color: '#c084fc', margin: '6px 0 0', fontWeight: 800 }}>
                      {breakEvenAnalysisData.contractsToBreakEven} ສັນຍາ / ເດືອນ
                    </h3>
                  </div>

                  <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16,185,129,0.12)', borderLeft: '4px solid #10b981', borderRadius: '16px' }}>
                    <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>ສັນຍາປະຈຸບັນ vs ຈຸດຄຸ້ມທຶນ</div>
                    <h3 style={{ fontSize: '1.3rem', color: '#34d399', margin: '6px 0 0', fontWeight: 800 }}>
                      {breakEvenAnalysisData.currentActiveLoans} ສັນຍາ (ປອດໄພ 100%)
                    </h3>
                  </div>
                </div>
              </div>

              {/* 3-Month Projection Table */}
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <Compass size={28} color="#34d399" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🔮 ປະມານການກຳໄລລ່ວງໜ້າ 3 ເດືອນ (3-Month Financial Projection)</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ຄາດກາລາຍຮັບ, ລາຍຈ່າຍ, ແລະ ກຳໄລສຸດທິໄຕມາດ 4 (ກັນຍາ, ຕຸລາ, ພະຈິກ 2026)
                    </p>
                  </div>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="customer-full-table">
                    <thead>
                      <tr>
                        <th>ເດືອນຄາດກາ (Projection Month)</th>
                        <th style={{ color: '#34d399' }}>🟢 ລາຍຮັບຄາດກາ (Projected Income)</th>
                        <th style={{ color: '#f87171' }}>🔴 ລາຍຈ່າຍຄາດກາ (Projected Expense)</th>
                        <th style={{ color: '#38bdf8', fontWeight: 800 }}>💰 ກຳໄລສຸດທິຄາດກາ (Net Profit)</th>
                        <th>ຄວາມແມັດຢຳ (% Confidence)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {financialForecastData.map((f, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 800, color: '#34d399' }}>{f.month}</td>
                          <td style={{ fontWeight: 700, color: '#34d399' }}>₭ {f.projectedIncome.toLocaleString()}</td>
                          <td style={{ fontWeight: 700, color: '#f87171' }}>₭ {f.projectedExpense.toLocaleString()}</td>
                          <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.95rem' }}>₭ {f.projectedProfit.toLocaleString()}</td>
                          <td>
                            <span className="status-badge-pill green" style={{ fontSize: '0.78rem' }}>
                              🎯 {f.confidence} Confidence
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Module 5: Smart Budget Alerts & Reconciliation */}
          {planningSubTab === 'BUDGET' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <AlertTriangle size={28} color="#f59e0b" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>💡 ລະບົບເຕືອນງົບປະມານລາຍຈ່າຍ (Smart Budgeting Alerts)</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ຕິດຕາມການໃຊ້ຈ່າຍແຕ່ລະໝວດໝູ່ ບໍ່ໃຫ້ເກີນງົບປະມານທີ່ຕັ້ງໄວ້
                    </p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                  {expenseCategories.map((c, idx) => {
                    const percentSpent = Math.round((c.totalSpentLAK / c.budgetLAK) * 100);
                    return (
                      <div key={idx} className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${c.color}`, borderRadius: '14px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                          <span className="tag tag-emerald" style={{ fontSize: '0.72rem' }}>{c.status}</span>
                        </div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '8px 0 2px' }}>{c.name}</h4>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                          ໃຊ້ໄປ: ₭ {c.totalSpentLAK.toLocaleString()} / ງົບ ₭ {c.budgetLAK.toLocaleString()}
                        </div>
                        <div style={{ width: '100%', background: 'rgba(255,255,255,0.1)', height: '8px', borderRadius: '4px', marginTop: '10px', overflow: 'hidden' }}>
                          <div style={{ width: `${percentSpent}%`, background: c.color, height: '100%' }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                  <ShieldCheck size={28} color="#34d399" />
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>🧾 ກະທົບຍອດ Bank Statement Reconciliation</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      ກວດສອບຄວາມຖືກຕ້ອງ 100% ລະຫວ່າງ ຍອດໃນລະບົບ vs ຍອດໃນ Bank Statement
                    </p>
                  </div>
                </div>

                <div className="table-responsive-wrapper">
                  <table className="customer-full-table">
                    <thead>
                      <tr>
                        <th>ບັນຊີ/ກະເປົາເງິນ</th>
                        <th>ເລກບັນຊີ</th>
                        <th>ຍອດເງິນໃນລະບົບ (System Balance)</th>
                        <th>ຍອດ Bank Statement</th>
                        <th>ສະຖານະ Reconciliation</th>
                      </tr>
                    </thead>
                    <tbody>
                      {initialWallets.map((w) => (
                        <tr key={w.id}>
                          <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{w.icon} {w.name}</td>
                          <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{w.accountNo}</td>
                          <td style={{ fontWeight: 800, color: w.color }}>₭ {w.balanceLAK.toLocaleString()}</td>
                          <td style={{ fontWeight: 800, color: '#34d399' }}>₭ {w.balanceLAK.toLocaleString()}</td>
                          <td>
                            <span className="status-badge-pill green" style={{ fontSize: '0.78rem' }}>
                              {w.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 🌟 TAB 4: WALLETS & REAL-TIME TRANSACTIONS STREAM */}
      {activeMainTab === 'WALLETS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>💳 ບັນຊີທະນາຄານ & ຕູ້ເງິນສົດ (Multi-Bank Liquidity)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ບໍລິຫານຈັດການຍອດເງິນຄົງເຫຼືອແຕ່ລະບັນຊີ</p>
              </div>

              <button
                style={{
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white',
                  padding: '10px 18px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 15px rgba(99, 102, 241, 0.35)'
                }}
                onClick={() => onAddTransaction('TRANSFER')}
              >
                <ArrowRightLeft size={18} /> 🔄 ໂອນຍ້າຍບັນຊີ
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {initialWallets.map((w) => (
                <div key={w.id} className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${w.color}`, borderRadius: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>{w.icon}</span>
                    <span className="tag tag-purple" style={{ fontSize: '0.7rem' }}>{w.type}</span>
                  </div>
                  <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: '8px 0 2px', color: 'var(--text-primary)' }}>{w.name}</h4>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{w.accountNo}</div>
                  <h3 style={{ fontSize: '1.2rem', color: w.balanceLAK >= 0 ? w.color : '#f87171', margin: '10px 0 0', fontWeight: 800 }}>
                    ₭ {w.balanceLAK.toLocaleString()}
                  </h3>
                </div>
              ))}
            </div>
          </div>

          {/* Real-Time Stream */}
          <div className="glass-panel" style={{ padding: '24px', borderRadius: '22px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Activity size={22} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>⚡ ລາຍການທຸລະກຳ Real-Time (Live Activity Stream)</h3>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div className="filter-pill-buttons">
                  <button className={`filter-pill-btn ${activeTypeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('ALL')}>
                    ທັງໝົດ ({transactions.length})
                  </button>
                  <button className={`filter-pill-btn ${activeTypeFilter === 'INCOME' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('INCOME')}>
                    🟢 ລາຍຮັບ
                  </button>
                  <button className={`filter-pill-btn ${activeTypeFilter === 'EXPENSE' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('EXPENSE')}>
                    🔴 ລາຍຈ່າຍ
                  </button>
                </div>

                <div className="search-bar-gold" style={{ width: '220px' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="ຄົ້ນຫາ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="table-responsive-wrapper">
              <table className="customer-full-table">
                <thead>
                  <tr>
                    <th>ວັນທີ/ເວລາ</th>
                    <th>ປະເພດ</th>
                    <th>ໝວດໝູ່ & ແທັກ</th>
                    <th>ບັນຊີ/ກະເປົາເງິນ</th>
                    <th>ຜູ້ຈ່າຍ / ຜູ້ຮັບ / ລູກຄ້າ</th>
                    <th>ຈຳນວນເງິນ & ສະກຸນເງິນ</th>
                    <th>ມູນຄ່າລວມເປັນກີບ</th>
                    <th>ໃບສຳຄັນ / ສະລິບ / Detail</th>
                    <th>ໝາຍເຫດ</th>
                    <th>ຈັດການ</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((tx) => {
                    const isIncome = tx.type === 'INCOME';
                    const convertedLAK = convert3ToLAK(tx.amount, tx.currency);

                    return (
                      <tr key={tx.id}>
                        <td style={{ fontSize: '0.82rem' }}>{tx.date}</td>
                        <td>
                          <span className={`status-badge-pill ${isIncome ? 'green' : 'red'}`}>
                            {isIncome ? '🟢 ລາຍຮັບ' : '🔴 ລາຍຈ່າຍ'}
                          </span>
                        </td>
                        <td>{tx.category}</td>
                        <td>{tx.walletName}</td>
                        <td>{tx.customerName || '-'}</td>
                        <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                          {tx.currency === 'LAK' ? `₭ ${tx.amount.toLocaleString()}` : `${tx.amount.toLocaleString()} ${tx.currency}`}
                        </td>
                        <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                          ₭ {convertedLAK.toLocaleString()}
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button className="table-link-btn" onClick={() => setActiveDetailTx(tx)} title="ເບິ່ງລາຍລະອຽດຄົບ 100%">
                              <Eye size={13} /> ລາຍລະອຽດ
                            </button>
                            <button className="table-link-btn" onClick={() => setActiveReceiptTx(tx)}>
                              <Printer size={13} /> ໃບສຳຄັນ
                            </button>
                            {tx.slipUrl && (
                              <button className="table-link-btn" onClick={() => setSelectedSlipUrl(tx.slipUrl)}>
                                <ImageIcon size={13} /> ສະລິບ
                              </button>
                            )}
                          </div>
                        </td>
                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{tx.note || '-'}</td>
                        <td>
                          <button className="icon-btn-xs" style={{ color: '#f87171' }} onClick={() => onDeleteTransaction(tx.id)}>
                            <X size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 DEEP TRANSACTION DETAIL DRAWER */}
      {activeDetailTx && (
        <div className="customer-modal-backdrop" onClick={() => setActiveDetailTx(null)}>
          <div className="customer-modal-container glass-panel" style={{ maxWidth: '650px', background: '#0f172a' }} onClick={(e) => e.stopPropagation()}>
            <div className="customer-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <FileText size={22} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>📋 ລາຍລະອຽດທຸລະກຳແບບລະອຽດ 100% ({activeDetailTx.id})</h3>
              </div>
              <button className="icon-btn" onClick={() => setActiveDetailTx(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="glass-panel" style={{ padding: '12px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ລະຫັດອ້າງອີງທຸລະກຳ</div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-purple)', fontSize: '0.95rem' }}>{activeDetailTx.id}</div>
                </div>

                <div className="glass-panel" style={{ padding: '12px', background: 'rgba(0,0,0,0.2)' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ວັນທີ & ເວລາ</div>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem' }}>{activeDetailTx.date}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 MONTHLY AUDIT DEEP DRAWER */}
      {activeMonthAudit && (
        <div className="customer-modal-backdrop" onClick={() => setActiveMonthAudit(null)}>
          <div className="customer-modal-container glass-panel" style={{ maxWidth: '600px', background: '#0f172a' }} onClick={(e) => e.stopPropagation()}>
            <div className="customer-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Calendar size={22} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>🔍 Audit ລາຍລະອຽດປະຈຳເດືອນ ({activeMonthAudit.month})</h3>
              </div>
              <button className="icon-btn" onClick={() => setActiveMonthAudit(null)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div className="glass-panel" style={{ padding: '14px', background: 'rgba(16,185,129,0.1)', borderLeft: '4px solid #10b981' }}>
                <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700 }}>🟢 ມູນຄ່າລາຍຮັບລວມ ({activeMonthAudit.month})</div>
                <h3 style={{ fontSize: '1.3rem', color: '#34d399', margin: '4px 0' }}>₭ {activeMonthAudit.income.toLocaleString()}</h3>
              </div>

              <button className="btn-primary-emerald" style={{ marginTop: '10px', justifyContent: 'center' }} onClick={() => setActiveMonthAudit(null)}>
                ອັດໜ້າຕ່າງ Audit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Receipt / Voucher Print Modal */}
      {activeReceiptTx && (
        <ReceiptModal
          transaction={activeReceiptTx}
          exchangeRate={exchangeRate}
          onClose={() => setActiveReceiptTx(null)}
        />
      )}

      {/* Slip Image Preview Modal */}
      {selectedSlipUrl && (
        <div className="customer-modal-backdrop" onClick={() => setSelectedSlipUrl(null)}>
          <div className="glass-panel" style={{ padding: '20px', maxWidth: '450px', background: '#0f172a', textAlign: 'center' }}>
            <h4 style={{ marginBottom: '14px', fontSize: '1rem' }}>🖼️ ຫຼັກຖານສະລິບການໂອນເງິນ (Payment Receipt)</h4>
            <img src={selectedSlipUrl} alt="Slip" style={{ width: '100%', borderRadius: '12px', maxHeight: '450px', objectFit: 'contain' }} />
            <button className="btn-primary-emerald" style={{ marginTop: '16px', width: '100%', justifyContent: 'center' }} onClick={() => setSelectedSlipUrl(null)}>
              ອັດໜ້າຕ່າງ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
