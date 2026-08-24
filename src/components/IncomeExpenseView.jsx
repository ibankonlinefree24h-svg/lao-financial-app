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
  Globe
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
  const [activeSubTab, setActiveSubTab] = useState('CONTINUOUS'); // 'CONTINUOUS', 'SUMMARY', 'YOY', 'TRANSACTIONS'
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
      {/* 1. Exchange Rate Engine Banner */}
      <div className="exchange-rate-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <RefreshCw size={18} color="var(--accent-purple)" />
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
              style={{ width: 'auto', padding: '4px 12px', fontSize: '0.8rem', display: 'flex', gap: '4px' }}
              onClick={() => setIsEditingRate(true)}
            >
              <Sliders size={14} /> ປັບອັດຕາແລກປ່ຽນ
            </button>
          )}
        </div>
      </div>

      {/* 2. Key Lifetime Financial Cards (Founding 2025 -> 2026 Present) */}
      <div className="preview-grid" style={{ margin: 0 }}>
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))', borderColor: 'rgba(16,185,129,0.3)' }}>
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.45rem' }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ + ຄ່າທຳນຽມ (ຕັ້ງແຕ່ກໍ່ຕັ້ງ)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#f87171' }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowDownRight size={15} /> Ads ໂຄສະນາ, ເງິນເດືອນ, ລະບົບ IT
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <TrendingDown size={24} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.15), rgba(2,132,199,0.1))', borderColor: 'rgba(6,182,212,0.3)' }}>
          <div className="kpi-info">
            <p>💰 ກຳໄລສຸດທິລວມ (2025 - 2026)</p>
            <h3 style={{ color: '#38bdf8', fontSize: '1.45rem' }}>₭ {allTimeSummary.netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາກຳໄລລວມ: {allTimeSummary.overallProfitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Wallet size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>📜 ຈຳນວນສັນຍາສິນເຊື່ອລວມ (Total Loans)</p>
            <h3 style={{ color: '#c084fc' }}>{allTimeSummary.totalLoansIssued} ສັນຍາປ່ອຍກູ້ລວມ</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
              ເລີ່ມຕົ້ນປີ {allTimeSummary.startYear} ຫາ ປະຈຸບັນ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Award size={24} />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`filter-pill-btn ${activeSubTab === 'CONTINUOUS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('CONTINUOUS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📊 1. ກຣາຟຟິກລຽງກັນຕັ້ງແຕ່ກໍ່ຕັ້ງ 2025 - 2026 ປະຈຸບັນ
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'SUMMARY' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('SUMMARY')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🌐 2. ສະຫຼຸບລວມ ປີ 2025 vs 2026
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'TRANSACTIONS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('TRANSACTIONS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          💳 3. ບັນທຶກລາຍການ ລາຍຮັບ-ລາຍຈ່າຍ ({transactions.length})
        </button>
      </div>

      {/* 🌟 MAIN FEATURE: CONTINUOUS 24-MONTH STREAM GRAPHIC CHART (2025 - 2026) */}
      {activeSubTab === 'CONTINUOUS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BarChart3 size={30} color="#34d399" />
                <div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>
                    📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ ລຽງກັນຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 ຫາ 2026 ປະຈຸບັນ)
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                    ສະແດງທັງໝົດ 24 ເດືອນລຽງກັນ: 🔷 12 ເດືອນປີກໍ່ຕັ້ງ 2025 | 🟢 12 ເດືອນປີປະຈຸບັນ 2026 ພ້ອມ % ເຕີບໂຕ MoM
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

            {/* Continuous 24-Month Bar Chart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '330px', padding: '26px 16px 16px', background: 'rgba(0,0,0,0.35)', borderRadius: '14px', gap: '6px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
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

                    {/* Bar Container */}
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
                          boxShadow: is2026 ? '0 0 10px rgba(16, 185, 129, 0.35)' : '0 0 10px rgba(56, 189, 248, 0.35)'
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
                          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
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

            {/* Visual Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
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
        </div>
      )}

      {/* TAB 2: 🌐 YEARLY SUMMARY (2025 vs 2026) */}
      {activeSubTab === 'SUMMARY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <History size={24} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>📅 ສະຫຼຸບລາຍຮັບ-ລາຍຈ່າຍ ແຍກຕາມແຕ່ລະປີ (2025 & 2026)</h3>
              </div>
            </div>

            <div className="table-responsive-wrapper">
              <table className="customer-full-table">
                <thead>
                  <tr>
                    <th>ປີ (Year)</th>
                    <th>ລາຍຮັບລວມ (Total Income)</th>
                    <th>ລາຍຈ່າຍລວມ (Total Expense)</th>
                    <th>ກຳໄລສຸດທິ (Net Profit)</th>
                    <th>ອັດຕາກຳໄລ (%)</th>
                    <th>% ເຕີບໂຕ YoY</th>
                    <th>ສັນຍາສິນເຊື່ອ</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyHistory.map((item) => (
                    <tr key={item.year} style={item.year === '2026' ? { background: 'rgba(16, 185, 129, 0.08)' } : {}}>
                      <td style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>
                        ປີ {item.year} {item.year === '2026' && <span className="tag tag-emerald" style={{ fontSize: '0.7rem' }}>ປະຈຸບັນ</span>}
                      </td>
                      <td style={{ fontWeight: 700, color: '#34d399' }}>₭ {item.income.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: '#f87171' }}>₭ {item.expense.toLocaleString()}</td>
                      <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '0.98rem' }}>₭ {item.profit.toLocaleString()}</td>
                      <td style={{ fontWeight: 700, color: 'var(--accent-cyan)' }}>{item.marginPercent}%</td>
                      <td>
                        <span className="status-badge-pill green" style={{ fontSize: '0.78rem' }}>
                          {item.growthRateYoY}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.loanCount} ສັນຍາປ່ອຍກູ້</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 💳 LIVE TRANSACTIONS LOG */}
      {activeSubTab === 'TRANSACTIONS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
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

            <div className="table-responsive-wrapper" style={{ marginTop: '20px' }}>
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
