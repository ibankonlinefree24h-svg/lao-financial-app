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
  ChevronRight
} from 'lucide-react';
import {
  defaultExchangeRates,
  initialWallets,
  expenseCategories,
  incomeCategories,
  lifetimeFinancialData
} from '../data/mockIncomeExpenses';
import ReceiptModal from './ReceiptModal';

export default function IncomeExpenseView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate,
  onUpdateExchangeRate
}) {
  const [chartViewMode, setChartViewMode] = useState('BAR_24'); // 'BAR_24', 'DONUT_CAT', 'AREA_FLOW'
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [activeReceiptTx, setActiveReceiptTx] = useState(null);
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

  // Calculate live balances across wallets
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
      {/* 1. Next-Gen Multi-Currency Exchange Rate Bar */}
      <div className="exchange-rate-banner" style={{ background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.9))', borderRadius: '16px', border: '1px solid var(--border-color)', padding: '14px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '10px', background: 'linear-gradient(135deg, #a855f7, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
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
        </div>
      </div>

      {/* 2. 👑 MASTER FINANCIAL COMMAND CARDS */}
      <div className="preview-grid" style={{ margin: 0 }}>
        {/* Total Lifetime Income */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))', borderColor: 'rgba(16, 185, 129, 0.35)', position: 'relative', overflow: 'hidden' }}>
          <div className="kpi-info">
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#34d399', display: 'inline-block' }} />
              ລາຍຮັບລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)
            </p>
            <h3 style={{ color: '#34d399', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ + ຄ່າທຳນຽມ (ຕັ້ງແຕ່ກໍ່ຕັ້ງ)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={26} />
          </div>
        </div>

        {/* Total Lifetime Expense */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(185, 28, 28, 0.08))', borderColor: 'rgba(239, 68, 68, 0.3)', position: 'relative', overflow: 'hidden' }}>
          <div className="kpi-info">
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171', display: 'inline-block' }} />
              ລາຍຈ່າຍລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)
            </p>
            <h3 style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowDownRight size={15} /> Ads ໂຄສະນາ, ເງິນເດືອນ, ລະບົບ IT
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <TrendingDown size={26} />
          </div>
        </div>

        {/* Net Profit & Margin */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(2, 132, 199, 0.1))', borderColor: 'rgba(6, 182, 212, 0.35)' }}>
          <div className="kpi-info">
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8', display: 'inline-block' }} />
              ກຳໄລສຸດທິລວມ (Net Profit)
            </p>
            <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາກຳໄລລວມ: {allTimeSummary.overallProfitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Wallet size={26} />
          </div>
        </div>

        {/* Available Liquidity Across Wallets */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)' }}>
          <div className="kpi-info">
            <p style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600 }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#c084fc', display: 'inline-block' }} />
              ເງິນສົດ & ບັນຊີຄົງເຫຼືອລວມ (Liquidity)
            </p>
            <h3 style={{ color: '#c084fc', fontSize: '1.5rem', fontWeight: 800 }}>₭ {totalWalletLiquidityLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: 600 }}>
              ລວມ BCEL One, JDB, LDB, APB & Cash
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Building2 size={26} />
          </div>
        </div>
      </div>

      {/* 3. 🎨 VISUAL FINANCIAL MATRIX (Interactive 3-Mode Visualizer) */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: 'linear-gradient(135deg, #10b981, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
              <BarChart3 size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>📊 ກຣາຟຟິກວິເຄາະການເງິນ (Financial Visual Matrix)</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                ສະແດງຜົນ 24 ເດືອນລຽງກັນ (2025 ຫາ 2026), ສັດສ່ວນລາຍຈ່າຍ, ແລະ ກະແສເງິນສົດ
              </p>
            </div>
          </div>

          {/* Visual Mode Switcher Pills */}
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
            <button
              className={`filter-pill-btn ${chartViewMode === 'BAR_24' ? 'active' : ''}`}
              onClick={() => setChartViewMode('BAR_24')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              📊 24 ເດືອນ ລຽງກັນ
            </button>

            <button
              className={`filter-pill-btn ${chartViewMode === 'DONUT_CAT' ? 'active' : ''}`}
              onClick={() => setChartViewMode('DONUT_CAT')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              🍩 ສັດສ່ວນລາຍຈ່າຍ
            </button>

            <button
              className={`filter-pill-btn ${chartViewMode === 'AREA_FLOW' ? 'active' : ''}`}
              onClick={() => setChartViewMode('AREA_FLOW')}
              style={{ padding: '6px 14px', fontSize: '0.82rem' }}
            >
              ⚡ ກະແສເງິນສົດ Flow
            </button>
          </div>
        </div>

        {/* MODE 1: CONTINUOUS 24-MONTH SIDE-BY-SIDE BAR GRAPHIC */}
        {chartViewMode === 'BAR_24' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '330px', padding: '26px 16px 16px', background: 'rgba(0,0,0,0.35)', borderRadius: '16px', gap: '6px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
              {continuous24Months.map((d, i) => {
                const incomeHeight = Math.max(12, Math.round((d.income / maxIncomeVal) * 100));
                const expenseHeight = Math.max(12, Math.round((d.expense / maxIncomeVal) * 100));
                const is2026 = d.year === '2026';

                return (
                  <div key={i} style={{ flex: 1, minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    {/* Growth Tag */}
                    <span style={{ fontSize: '0.66rem', color: d.growthMoM.startsWith('+') ? '#34d399' : d.growthMoM === 'ເລີ່ມຕົ້ນ' ? '#818cf8' : '#f87171', fontWeight: 800, marginBottom: '6px' }}>
                      {d.growthMoM}
                    </span>

                    {/* Bars Container */}
                    <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '210px', width: '100%', justifyContent: 'center' }}>
                      {/* Income Bar */}
                      <div
                        style={{
                          width: '44%',
                          background: is2026
                            ? 'linear-gradient(180deg, #34d399, #059669)'
                            : 'linear-gradient(180deg, #38bdf8, #0284c7)',
                          height: `${incomeHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: is2026 ? '0 0 10px rgba(16, 185, 129, 0.35)' : '0 0 10px rgba(56, 189, 248, 0.35)',
                          transition: 'height 0.4s ease'
                        }}
                        title={`${d.month}: ລາຍຮັບ ₭ ${d.income.toLocaleString()}`}
                      />
                      {/* Expense Bar */}
                      <div
                        style={{
                          width: '44%',
                          background: 'linear-gradient(180deg, #f87171, #dc2626)',
                          height: `${expenseHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                          transition: 'height 0.4s ease'
                        }}
                        title={`${d.month}: ລາຍຈ່າຍ ₭ ${d.expense.toLocaleString()}`}
                      />
                    </div>

                    {/* Month Label */}
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
              <span style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 800 }}>
                💰 ລາຍຮັບລວມ 24 ເດືອນ: ₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}
              </span>
            </div>
          </div>
        )}

        {/* MODE 2: CATEGORY SPENDING DONUT DISTRIBUTION */}
        {chartViewMode === 'DONUT_CAT' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', padding: '10px' }}>
            {expenseCategories.slice(0, 6).map((cat, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${cat.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '1.2rem' }}>{cat.icon}</span>
                  <span className="tag tag-pink" style={{ fontSize: '0.75rem' }}>ໝວດລາຍຈ່າຍ</span>
                </div>
                <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '8px 0 4px' }}>{cat.name}</h4>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ງົບປະມານ: ₭ {cat.budgetLAK.toLocaleString()}</div>
                <h3 style={{ fontSize: '1.2rem', color: cat.color, margin: '8px 0 0', fontWeight: 800 }}>
                  ₭ {Math.round(cat.budgetLAK * 0.65).toLocaleString()}
                </h3>
              </div>
            ))}
          </div>
        )}

        {/* MODE 3: NET CASH FLOW TREND FLOW */}
        {chartViewMode === 'AREA_FLOW' && (
          <div style={{ padding: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <h4 style={{ marginBottom: '14px', fontSize: '1rem', color: '#38bdf8', fontWeight: 700 }}>
              ⚡ ກະແສເງິນສົດສຸດທິ (Net Cumulative Cash Flow Flow)
            </h4>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '220px', gap: '8px', overflowX: 'auto', paddingBottom: '10px' }}>
              {continuous24Months.map((m, idx) => (
                <div key={idx} style={{ flex: 1, minWidth: '45px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '80%',
                      background: 'linear-gradient(180deg, #38bdf8, rgba(56, 189, 248, 0.2))',
                      height: `${Math.max(15, Math.round((m.profit / 36000000) * 100))}%`,
                      borderRadius: '6px 6px 0 0',
                      boxShadow: '0 0 12px rgba(56, 189, 248, 0.4)'
                    }}
                    title={`${m.month}: ກຳໄລ ₭ ${m.profit.toLocaleString()}`}
                  />
                  <span style={{ fontSize: '0.65rem', marginTop: '6px', color: 'var(--text-secondary)' }}>{m.shortMonth}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 4. 💳 SMART WALLET Liquidity & Quick Action Buttons */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>💳 ບັນຊີທະນາຄານ & ຕູ້ເງິນສົດ (Multi-Bank Liquidity)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ບໍລິຫານຈັດການຍອດເງິນຄົງເຫຼືອແຕ່ລະບັນຊີ</p>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="btn-primary-emerald" onClick={() => onAddTransaction('INCOME')}>
              <PlusCircle size={18} /> + ບັນທຶກລາຍຮັບ
            </button>
            <button
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                padding: '10px 18px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 15px rgba(239, 68, 68, 0.35)'
              }}
              onClick={() => onAddTransaction('EXPENSE')}
            >
              <MinusCircle size={18} /> - ບັນທຶກລາຍຈ່າຍ
            </button>
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

      {/* 5. ⚡ LIVE TRANSACTION STREAM TABLE */}
      <div className="glass-panel" style={{ padding: '24px', borderRadius: '20px' }}>
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
                <th>ໃບສຳຄັນ / ສະລິບ</th>
                <th>ໝາຍເຫດ</th>
                <th>ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'INCOME';
                const isExpense = tx.type === 'EXPENSE';
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
