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
  Scale
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
  const [activeSubTab, setActiveSubTab] = useState('LIFETIME'); // 'LIFETIME', 'YOY', 'MOM', 'TRANSACTIONS'
  const [selectedYear, setSelectedYear] = useState('2026');
  const [compareYearA, setCompareYearA] = useState('2025');
  const [compareYearB, setCompareYearB] = useState('2026');
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

  const { allTimeSummary, yearlyHistory, monthlyDetails } = lifetimeFinancialData;
  const currentYearMonthlyData = monthlyDetails[selectedYear] || monthlyDetails['2026'];

  let peakIncomeMonth = currentYearMonthlyData[0];
  currentYearMonthlyData.forEach((item) => {
    if (item.income > peakIncomeMonth.income) peakIncomeMonth = item;
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

      {/* 2. Primary KPI Cards: All-Time Lifetime Financial Totals */}
      <div className="preview-grid" style={{ margin: 0 }}>
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.1))', borderColor: 'rgba(16,185,129,0.3)' }}>
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບລວມຕັ້ງແຕ່ເລີ່ມປ່ອຍກູ້ມາ (All-Time Income)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.45rem' }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ + ຄ່າທຳນຽມ (2024 - 2026)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍລວມຕັ້ງແຕ່ເລີ່ມປ່ອຍກູ້ມາ (All-Time Expense)</p>
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
            <p>💰 ກຳໄລສຸດທິລວມຕັ້ງແຕ່ເລີ່ມປ່ອຍກູ້ (All-Time Net Profit)</p>
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

      {/* Main Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`filter-pill-btn ${activeSubTab === 'LIFETIME' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('LIFETIME')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🌐 1. ຍອດລວມຕັ້ງແຕ່ເລີ່ມປ່ອຍກູ້ (All-Time Overview)
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'YOY' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('YOY')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          ⚖️ 2. ປຽບທຽບ ປີໃສ່ປີ (YoY Comparison: 2024-2026)
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'MOM' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('MOM')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📊 3. ປຽບທຽບ ເດືອນໃສ່ເດືອນ (MoM Comparison)
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'TRANSACTIONS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('TRANSACTIONS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          💳 4. ບັນທຶກລາຍການ ລາຍຮັບ-ລາຍຈ່າຍ ({transactions.length})
        </button>
      </div>

      {/* TAB 1: 🌐 ALL-TIME LIFETIME OVERVIEW & YEARLY BREAKDOWN */}
      {activeSubTab === 'LIFETIME' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Yearly History Overview Table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <History size={24} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>📅 ສະຫຼຸບລາຍຮັບ-ລາຍຈ່າຍ ແຍກຕາມແຕ່ລະປີ (2024, 2025, 2026)</h3>
              </div>
              <span className="tag tag-emerald" style={{ fontSize: '0.8rem' }}>
                ສະສົມ 3 ປີລວມ: ₭ {allTimeSummary.netProfitLAK.toLocaleString()} (ກຳໄລ {allTimeSummary.overallProfitMarginPercent}%)
              </span>
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
                        ປີ {item.year} {item.year === '2024' ? <span className="tag tag-purple" style={{ fontSize: '0.7rem' }}>ປີກໍ່ຕັ້ງ</span> : item.year === '2026' ? <span className="tag tag-emerald" style={{ fontSize: '0.7rem' }}>ປະຈຸບັນ</span> : null}
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

          {/* 🌟 PROMINENT 12-MONTH GRAPHIC BAR CHART & MoM % GROWTH FOR ALL YEARS */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <BarChart3 size={28} color="#34d399" />
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ 12 ເດືອນ & % ເຕີບໂຕ MoM (ປີ {selectedYear})
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    ເບິ່ງພາບລວມ 12 ເດືອນ ຕັ້ງແຕ່ປີກໍ່ຕັ້ງ (2024, 2025, 2026) ພ້ອມ % ເຕີບໂຕ MoM
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', fontWeight: 700 }}>
                  <span style={{ color: '#34d399', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', background: '#10b981', borderRadius: '2px', display: 'inline-block' }} /> 🟢 ລາຍຮັບ
                  </span>
                  <span style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ width: '10px', height: '10px', background: '#ef4444', borderRadius: '2px', display: 'inline-block' }} /> 🔴 ລາຍຈ່າຍ
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>ເລືອກປີເບິ່ງ:</span>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.88rem', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}
                  >
                    <option value="2026">ປີ 2026 (ປະຈຸບັນ)</option>
                    <option value="2025">ປີ 2025</option>
                    <option value="2024">ປີ 2024 (ປີກໍ່ຕັ້ງ)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Dynamic Graphic Bar Visualizer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px', padding: '24px 16px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', gap: '8px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
              {currentYearMonthlyData.map((d, i) => {
                const incomeHeight = Math.max(10, Math.round((d.income / 45000000) * 100));
                const expenseHeight = Math.max(10, Math.round((d.expense / 45000000) * 100));

                return (
                  <div key={i} style={{ flex: 1, minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    {/* Growth MoM Badge */}
                    <span style={{ fontSize: '0.7rem', color: d.growthMoM.startsWith('+') ? '#34d399' : d.growthMoM === 'ເລີ່ມຕົ້ນ' ? '#c084fc' : '#f87171', fontWeight: 800, marginBottom: '6px' }}>
                      {d.growthMoM}
                    </span>

                    {/* Bars Pair Container */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '210px', width: '100%', justifyContent: 'center' }}>
                      {/* Income Bar */}
                      <div
                        style={{
                          width: '42%',
                          background: 'linear-gradient(180deg, #34d399, #059669)',
                          height: `${incomeHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
                          transition: 'height 0.4s ease'
                        }}
                        title={`${d.month} (${selectedYear}): ລາຍຮັບ ₭ ${d.income.toLocaleString()}`}
                      />
                      {/* Expense Bar */}
                      <div
                        style={{
                          width: '42%',
                          background: 'linear-gradient(180deg, #f87171, #dc2626)',
                          height: `${expenseHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                          transition: 'height 0.4s ease'
                        }}
                        title={`${d.month} (${selectedYear}): ລາຍຈ່າຍ ₭ ${d.expense.toLocaleString()}`}
                      />
                    </div>

                    {/* Month Name */}
                    <span style={{ fontSize: '0.75rem', marginTop: '10px', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center' }}>
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Peak Month Summary Banner */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                🏆 <strong>ເດືອນລາຍຮັບສູງສຸດ (ປີ {selectedYear}):</strong> {peakIncomeMonth.month} (₭ {peakIncomeMonth.income.toLocaleString()})
              </span>
              <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>
                💰 ກຳໄລລວມທັງໝົດ ປີ {selectedYear}: ₭ {currentYearMonthlyData.reduce((acc, curr) => acc + curr.profit, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ⚖️ YEAR-OVER-YEAR (YoY) COMPARISON (2024 vs 2025 vs 2026) */}
      {activeSubTab === 'YOY' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Scale size={24} color="#38bdf8" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>⚖️ ການປຽບທຽບ ປີໃສ່ປີ (Year-over-Year / YoY Comparison)</h3>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ປຽບທຽບ:</span>
                <select
                  value={compareYearA}
                  onChange={(e) => setCompareYearA(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}
                >
                  <option value="2024">ປີ 2024 (ປີກໍ່ຕັ້ງ)</option>
                  <option value="2025">ປີ 2025</option>
                </select>
                <span style={{ fontSize: '0.85rem' }}>ໃສ່</span>
                <select
                  value={compareYearB}
                  onChange={(e) => setCompareYearB(e.target.value)}
                  style={{ padding: '6px 10px', borderRadius: '6px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}
                >
                  <option value="2025">ປີ 2025</option>
                  <option value="2026">ປີ 2026</option>
                </select>
              </div>
            </div>

            {/* Side-by-Side Comparison Cards */}
            {(() => {
              const dataA = yearlyHistory.find((y) => y.year === compareYearA) || yearlyHistory[0];
              const dataB = yearlyHistory.find((y) => y.year === compareYearB) || yearlyHistory[2];

              const incomeDiff = dataB.income - dataA.income;
              const incomeDiffPercent = ((incomeDiff / dataA.income) * 100).toFixed(1);
              const profitDiff = dataB.profit - dataA.profit;
              const profitDiffPercent = ((profitDiff / dataA.profit) * 100).toFixed(1);

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #6366f1' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ປີ {compareYearA}</div>
                    <h3 style={{ fontSize: '1.25rem', color: '#818cf8', margin: '6px 0 10px' }}>₭ {dataA.income.toLocaleString()}</h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      ລາຍຈ່າຍ: ₭ {dataA.expense.toLocaleString()} | ກຳໄລ: ₭ {dataA.profit.toLocaleString()}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #10b981' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ປີ {compareYearB}</div>
                    <h3 style={{ fontSize: '1.25rem', color: '#34d399', margin: '6px 0 10px' }}>₭ {dataB.income.toLocaleString()}</h3>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      ລາຍຈ່າຍ: ₭ {dataB.expense.toLocaleString()} | ກຳໄລ: ₭ {dataB.profit.toLocaleString()}
                    </div>
                  </div>

                  <div className="glass-panel" style={{ padding: '20px', background: 'rgba(16,185,129,0.1)', borderLeft: '4px solid #38bdf8' }}>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>ສ່ວນເຕີບໂຕ (YoY Growth Variance)</div>
                    <h3 style={{ fontSize: '1.25rem', color: '#38bdf8', margin: '6px 0 10px' }}>
                      +₭ {incomeDiff.toLocaleString()} ({incomeDiffPercent > 0 ? `+${incomeDiffPercent}%` : `${incomeDiffPercent}%`})
                    </h3>
                    <div style={{ fontSize: '0.82rem', color: '#34d399', fontWeight: 700 }}>
                      ກຳໄລເພີ່ມຂຶ້ນ: +₭ {profitDiff.toLocaleString()} (+{profitDiffPercent}%)
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* TAB 3: 📊 MONTH-OVER-MONTH (MoM) COMPARISON */}
      {activeSubTab === 'MOM' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart3 size={26} color="#34d399" />
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ 12 ເດືອນ & % ເຕີບໂຕ MoM (ປີ {selectedYear})</h3>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ເລືອກປີ:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '6px', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}
                >
                  <option value="2026">ປີ 2026 (ປະຈຸບັນ)</option>
                  <option value="2025">ປີ 2025</option>
                  <option value="2024">ປີ 2024 (ປີກໍ່ຕັ້ງ)</option>
                </select>
              </div>
            </div>

            {/* 12-Month Graphic Bar Visualizer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px', padding: '24px 16px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', gap: '8px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
              {currentYearMonthlyData.map((d, i) => {
                const incomeHeight = Math.max(10, Math.round((d.income / 45000000) * 100));
                const expenseHeight = Math.max(10, Math.round((d.expense / 45000000) * 100));

                return (
                  <div key={i} style={{ flex: 1, minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <span style={{ fontSize: '0.7rem', color: d.growthMoM.startsWith('+') ? '#34d399' : d.growthMoM === 'ເລີ່ມຕົ້ນ' ? '#c084fc' : '#f87171', fontWeight: 800, marginBottom: '6px' }}>
                      {d.growthMoM}
                    </span>

                    <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '210px', width: '100%', justifyContent: 'center' }}>
                      <div
                        style={{
                          width: '42%',
                          background: 'linear-gradient(180deg, #34d399, #059669)',
                          height: `${incomeHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)'
                        }}
                        title={`${d.month}: ລາຍຮັບ ₭ ${d.income.toLocaleString()}`}
                      />
                      <div
                        style={{
                          width: '42%',
                          background: 'linear-gradient(180deg, #f87171, #dc2626)',
                          height: `${expenseHeight}%`,
                          borderRadius: '4px 4px 0 0',
                          boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)'
                        }}
                        title={`${d.month}: ລາຍຈ່າຍ ₭ ${d.expense.toLocaleString()}`}
                      />
                    </div>

                    <span style={{ fontSize: '0.75rem', marginTop: '10px', color: 'var(--text-primary)', fontWeight: 700, textAlign: 'center' }}>
                      {d.month}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: 💳 LIVE TRANSACTIONS LOG & AI SLIP READER */}
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
