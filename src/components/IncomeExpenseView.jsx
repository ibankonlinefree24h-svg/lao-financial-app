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
  Bot,
  Building2,
  Calendar,
  PieChart,
  Target
} from 'lucide-react';
import { calculateSmartFinancialBudget } from '../data/mockIncomeExpenses';
import ReceiptModal from './ReceiptModal';

export default function IncomeExpenseView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate,
  onUpdateExchangeRate
}) {
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [activeCurrencyFilter, setActiveCurrencyFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [activeReceiptTx, setActiveReceiptTx] = useState(null);
  const [isEditingRate, setIsEditingRate] = useState(false);

  const [selectedYear, setSelectedYear] = useState('2026');
  const [usdRate, setUsdRate] = useState(22500);
  const [tempRubRate, setTempRubRate] = useState(exchangeRate.rubToLak);
  const [tempUsdRate, setTempUsdRate] = useState(usdRate);

  const rubToLak = exchangeRate.rubToLak;

  const convert3ToLAK = (amount, currency) => {
    if (currency === 'RUB') return Math.round(amount * rubToLak);
    if (currency === 'USD') return Math.round(amount * usdRate);
    return amount;
  };

  // Full 12-Month Multi-Year Graphic Dataset (2026, 2025, 2024)
  const yearlyAnalyticsData = {
    '2026': [
      { month: 'ມັງກອນ', income: 14500000, expense: 4200000, profit: 10300000, growth: '+12.5%' },
      { month: 'ກຸມພາ', income: 16800000, expense: 4500000, profit: 12300000, growth: '+15.8%' },
      { month: 'ມີນາ', income: 15900000, expense: 4800000, profit: 11100000, growth: '-5.3%' },
      { month: 'ເມສາ', income: 19200000, expense: 5300000, profit: 13900000, growth: '+20.7%' },
      { month: 'ພຶດສະພາ', income: 17800000, expense: 6100000, profit: 11700000, growth: '-7.2%' },
      { month: 'ມິຖຸນາ', income: 21500000, expense: 5400000, profit: 16100000, growth: '+20.7%' },
      { month: 'ກໍລະກົດ', income: 23800000, expense: 5700000, profit: 18100000, growth: '+10.6%' },
      { month: 'ສິງຫາ', income: 27400000, expense: 5900000, profit: 21500000, growth: '+15.1%' },
      { month: 'ກັນຍາ', income: 29500000, expense: 6100000, profit: 23400000, growth: '+7.6%' },
      { month: 'ຕຸລາ', income: 31800000, expense: 6300000, profit: 25500000, growth: '+7.7%' },
      { month: 'ພະຈິກ', income: 34200000, expense: 6500000, profit: 27700000, growth: '+7.5%' },
      { month: 'ທັນວາ', income: 38000000, expense: 6800000, profit: 31200000, growth: '+11.1%' }
    ],
    '2025': [
      { month: 'ມັງກອນ', income: 9200000, expense: 3100000, profit: 6100000, growth: '+6.2%' },
      { month: 'ກຸມພາ', income: 10400000, expense: 3300000, profit: 7100000, growth: '+13.0%' },
      { month: 'ມີນາ', income: 11200000, expense: 3500000, profit: 7700000, growth: '+7.6%' },
      { month: 'ເມສາ', income: 12800000, expense: 3800000, profit: 9000000, growth: '+14.2%' },
      { month: 'ພຶດສະພາ', income: 11900000, expense: 4100000, profit: 7800000, growth: '-7.0%' },
      { month: 'ມິຖຸນາ', income: 13500000, expense: 3900000, profit: 9600000, growth: '+13.4%' },
      { month: 'ກໍລະກົດ', income: 14800000, expense: 4200000, profit: 10600000, growth: '+9.6%' },
      { month: 'ສິງຫາ', income: 16500000, expense: 4400000, profit: 12100000, growth: '+11.4%' },
      { month: 'ກັນຍາ', income: 15200000, expense: 4300000, profit: 10900000, growth: '-7.8%' },
      { month: 'ຕຸລາ', income: 16900000, expense: 4500000, profit: 12400000, growth: '+11.1%' },
      { month: 'ພະຈິກ', income: 17800000, expense: 4600000, profit: 13200000, growth: '+5.3%' },
      { month: 'ທັນວາ', income: 19500000, expense: 4800000, profit: 14700000, growth: '+9.5%' }
    ]
  };

  const currentYearData = yearlyAnalyticsData[selectedYear] || yearlyAnalyticsData['2026'];

  let peakIncomeMonth = currentYearData[0];
  let peakExpenseMonth = currentYearData[0];

  currentYearData.forEach((item) => {
    if (item.income > peakIncomeMonth.income) peakIncomeMonth = item;
    if (item.expense > peakExpenseMonth.expense) peakExpenseMonth = item;
  });

  const totalYearIncome = currentYearData.reduce((acc, curr) => acc + curr.income, 0);
  const totalYearExpense = currentYearData.reduce((acc, curr) => acc + curr.expense, 0);
  const totalYearProfit = totalYearIncome - totalYearExpense;

  // Calculate totals from live transactions
  let totalIncomeLAK = 0;
  let totalExpenseLAK = 0;

  transactions.forEach((tx) => {
    const lakEquivalent = convert3ToLAK(tx.amount, tx.currency);

    if (tx.type === 'INCOME') {
      totalIncomeLAK += lakEquivalent;
    } else {
      totalExpenseLAK += lakEquivalent;
    }
  });

  const netProfitLAK = totalIncomeLAK - totalExpenseLAK;
  const profitMarginPercent = totalIncomeLAK > 0 ? Math.round((netProfitLAK / totalIncomeLAK) * 100) : 0;

  // Bank Balances & Office Cash Vault
  const bankBalances = [
    { name: 'BCEL ONE (ທະນາຄານການຄ້າ)', balance: 45200000, icon: '🏦', color: '#6366f1' },
    { name: 'JDB (ທະນາຄານພັດທະນາ)', balance: 18500000, icon: '🏛️', color: '#a855f7' },
    { name: 'LDB / APB (ທະນາຄານສົ່ງເສີມກອງກຳ)', balance: 12000000, icon: '🏬', color: '#06b6d4' },
    { name: '💵 ຕູ້ເງິນສົດຫ້ອງການ (Office Cash Vault)', balance: 8400000, icon: '💵', color: '#f59e0b' }
  ];

  const totalBankLiquidity = bankBalances.reduce((sum, b) => sum + b.balance, 0);
  const smartBudget = calculateSmartFinancialBudget(netProfitLAK, totalIncomeLAK);

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTypeFilter !== 'ALL' && tx.type !== activeTypeFilter) return false;
    if (activeCurrencyFilter !== 'ALL' && tx.currency !== activeCurrencyFilter) return false;

    const matchesSearch =
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerName && tx.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSearch;
  });

  const handleSaveRates = () => {
    onUpdateExchangeRate(Number(tempRubRate));
    setUsdRate(Number(tempUsdRate));
    setIsEditingRate(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Multi-Currency 3-Way Exchange Rate Engine Banner */}
      <div className="exchange-rate-banner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <RefreshCw size={18} color="var(--accent-purple)" />
          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
            ອັດຕາແລກປ່ຽນ 3 ສະກຸນເງິນ: <strong>1 RUB = {rubToLak} LAK</strong> | <strong>1 USD = {usdRate.toLocaleString()} LAK</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isEditingRate ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem' }}>RUB:</span>
              <input
                type="number"
                value={tempRubRate}
                onChange={(e) => setTempRubRate(e.target.value)}
                style={{ width: '75px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.8rem' }}>USD:</span>
              <input
                type="number"
                value={tempUsdRate}
                onChange={(e) => setTempUsdRate(e.target.value)}
                style={{ width: '85px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <button className="icon-btn-xs" style={{ width: 'auto', padding: '4px 10px' }} onClick={handleSaveRates}>
                ບັນທຶກ
              </button>
            </div>
          ) : (
            <button
              className="icon-btn-xs"
              style={{ width: 'auto', padding: '4px 10px', fontSize: '0.8rem', display: 'flex', gap: '4px' }}
              onClick={() => setIsEditingRate(true)}
            >
              <Sliders size={14} /> ປ່ຽນອັດຕາແລກປ່ຽນ
            </button>
          )}
        </div>
      </div>

      {/* 2. Key Financial Cards (Income, Expense, Net Profit) */}
      <div className="preview-grid" style={{ margin: 0 }}>
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບລວມ (Total Income LAK Eq.)</p>
            <h3 style={{ color: '#34d399' }}>₭ {totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ & ຄ່າທຳນຽມ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍລວມ (Total Expense LAK Eq.)</p>
            <h3 style={{ color: '#f87171' }}>₭ {totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowDownRight size={15} /> Ads ໂຄສະນາ, ເງິນເດືອນ, IT
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <TrendingDown size={24} />
          </div>
        </div>

        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>💰 ກຳໄລສຸດທິ (Net Profit LAK Eq.)</p>
            <h3 style={{ color: netProfitLAK >= 0 ? '#38bdf8' : '#f87171' }}>₭ {netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາກຳໄລ: {profitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Wallet size={24} />
          </div>
        </div>
      </div>

      {/* 3. 🌟 MAIN FEATURE: 12-MONTH GRAPHIC BAR CHART & YEARLY ANALYTICS */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BarChart3 size={28} color="#34d399" />
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ ຄົບ 12 ເດືອນ (ປີ {selectedYear})
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                ວິເຄາະເດືອນໃດລາຍຮັບ/ລາຍຈ່າຍສູງ, ເຕີບໂຕ MoM %, ແລະ ປຽບທຽບແຕ່ລະປີ
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

            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', background: 'rgba(0,0,0,0.3)', padding: '4px 10px', borderRadius: '8px' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ເລືອກປີ:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{ padding: '6px 12px', borderRadius: '6px', fontSize: '0.88rem', background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', fontWeight: 700 }}
              >
                <option value="2026">ປີ 2026 (ປະຈຸບັນ)</option>
                <option value="2025">ປີ 2025</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Graphic Bar Visualizer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '300px', padding: '24px 16px 16px', background: 'rgba(0,0,0,0.3)', borderRadius: '14px', gap: '8px', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
          {currentYearData.map((d, i) => {
            const incomeHeightPercent = Math.max(8, Math.round((d.income / 40000000) * 100));
            const expenseHeightPercent = Math.max(8, Math.round((d.expense / 40000000) * 100));

            return (
              <div key={i} style={{ flex: 1, minWidth: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                {/* Growth Tag */}
                <span style={{ fontSize: '0.7rem', color: d.growth.startsWith('+') ? '#34d399' : '#f87171', fontWeight: 800, marginBottom: '6px' }}>
                  {d.growth}
                </span>

                {/* Bars Pair Container */}
                <div style={{ display: 'flex', gap: '4px', alignItems: 'flex-end', height: '210px', width: '100%', justifyContent: 'center' }}>
                  {/* Income Bar */}
                  <div
                    style={{
                      width: '42%',
                      background: 'linear-gradient(180deg, #34d399, #059669)',
                      height: `${incomeHeightPercent}%`,
                      borderRadius: '4px 4px 0 0',
                      boxShadow: '0 0 10px rgba(16, 185, 129, 0.3)',
                      transition: 'height 0.4s ease'
                    }}
                    title={`${d.month}: ລາຍຮັບ ₭ ${d.income.toLocaleString()}`}
                  />
                  {/* Expense Bar */}
                  <div
                    style={{
                      width: '42%',
                      background: 'linear-gradient(180deg, #f87171, #dc2626)',
                      height: `${expenseHeightPercent}%`,
                      borderRadius: '4px 4px 0 0',
                      boxShadow: '0 0 10px rgba(239, 68, 68, 0.3)',
                      transition: 'height 0.4s ease'
                    }}
                    title={`${d.month}: ລາຍຈ່າຍ ₭ ${d.expense.toLocaleString()}`}
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

        {/* Yearly Summary Analysis Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            🏆 <strong>ເດືອນລາຍຮັບສູງສຸດ:</strong> {peakIncomeMonth.month} (₭ {peakIncomeMonth.income.toLocaleString()})
          </span>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            🔴 <strong>ເດືອນລາຍຈ່າຍສູງສຸດ:</strong> {peakExpenseMonth.month} (₭ {peakExpenseMonth.expense.toLocaleString()})
          </span>
          <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>
            💰 ກຳໄລລວມທັງໝົດປີ {selectedYear}: ₭ {totalYearProfit.toLocaleString()}
          </span>
        </div>
      </div>

      {/* 4. Bank Balances & Office Cash Vault */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Building2 size={22} color="var(--accent-purple)" />
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
              🏦 ສູນຄຸ້ມຄອງ ບັນຊີທະນາຄານ & ຕູ້ເງິນສົດ (Multi-Bank & Cash Vault)
            </h3>
          </div>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#34d399' }}>
            ຍອດເງິນສົດ/ທະນາຄານລວມ: ₭ {totalBankLiquidity.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {bankBalances.map((b, idx) => (
            <div key={idx} className="glass-panel" style={{ padding: '14px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${b.color}` }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{b.name}</div>
              <h4 style={{ fontSize: '1.15rem', color: b.color, margin: '6px 0 0', fontWeight: 800 }}>
                ₭ {b.balance.toLocaleString()}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Live Transactions Table & Controls */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-primary-emerald" onClick={() => onAddTransaction('INCOME')}>
              <PlusCircle size={18} /> + ບັນທຶກລາຍຮັບ (AI Slip Reader)
            </button>
            <button
              style={{
                background: 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '12px',
                fontWeight: 600,
                fontSize: '0.9rem',
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

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <div className="filter-pill-buttons">
              <button
                className={`filter-pill-btn ${activeTypeFilter === 'ALL' ? 'active' : ''}`}
                onClick={() => setActiveTypeFilter('ALL')}
              >
                ທັງໝົດ ({transactions.length})
              </button>
              <button
                className={`filter-pill-btn ${activeTypeFilter === 'INCOME' ? 'active' : ''}`}
                onClick={() => setActiveTypeFilter('INCOME')}
                style={activeTypeFilter === 'INCOME' ? { background: '#10b981', borderColor: '#10b981' } : {}}
              >
                🟢 ລາຍຮັບ
              </button>
              <button
                className={`filter-pill-btn ${activeTypeFilter === 'EXPENSE' ? 'active' : ''}`}
                onClick={() => setActiveTypeFilter('EXPENSE')}
                style={activeTypeFilter === 'EXPENSE' ? { background: '#ef4444', borderColor: '#ef4444' } : {}}
              >
                🔴 ລາຍຈ່າຍ
              </button>
            </div>

            <div className="search-bar-gold" style={{ width: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາລາຍຮັບ-ລາຍຈ່າຍ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="table-responsive-wrapper" style={{ marginTop: '24px' }}>
          <table className="customer-full-table">
            <thead>
              <tr>
                <th>ວັນທີ</th>
                <th>ປະເພດ</th>
                <th>ໝວດໝູ່</th>
                <th>ຜູ້ຈ່າຍ / ຜູ້ຮັບ / ລູກຄ້າ</th>
                <th>ສະກຸນເງິນ & ຈຳນວນເດີມ</th>
                <th>ຈຳນວນເງິນລວມເປັນກີບ</th>
                <th>ຮູບແບບ / ໃບສຳຄັນ</th>
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
                    <td>{tx.date}</td>

                    <td>
                      <span className={`status-badge-pill ${isIncome ? 'green' : 'red'}`}>
                        {isIncome ? '🟢 ລາຍຮັບ' : '🔴 ລາຍຈ່າຍ'}
                      </span>
                    </td>

                    <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tx.category}</td>

                    <td>{tx.customerName || '-'}</td>

                    <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                      {tx.currency === 'LAK'
                        ? `₭ ${tx.amount.toLocaleString()}`
                        : tx.currency === 'RUB'
                        ? `${tx.amount.toLocaleString()} RUB`
                        : `$ ${tx.amount.toLocaleString()}`}
                    </td>

                    <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                      ₭ {convertedLAK.toLocaleString()}
                    </td>

                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {tx.paymentMethod === 'TRANSFER' ? (
                          <span className="tag tag-blue" style={{ fontSize: '0.75rem' }}>
                            💳 ໂອນ
                          </span>
                        ) : (
                          <span className="tag tag-amber" style={{ fontSize: '0.75rem' }}>
                            💵 ເງິນສົດ
                          </span>
                        )}

                        <button className="table-link-btn" onClick={() => setActiveReceiptTx(tx)} title="ພິມໃບສຳຄັນຮັບ-ຈ່າຍ">
                          <Printer size={13} /> ໃບສຳຄັນ
                        </button>

                        {tx.slipUrl && (
                          <button className="table-link-btn" onClick={() => setSelectedSlipUrl(tx.slipUrl)} title="ເບິ່ງສະລິບການໂອນເງິນ">
                            <ImageIcon size={13} /> ສະລິບ
                          </button>
                        )}
                      </div>
                    </td>

                    <td style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{tx.note || '-'}</td>

                    <td>
                      <button className="icon-btn-xs" style={{ color: '#f87171' }} onClick={() => onDeleteTransaction(tx.id)} title="ລຶບລາຍການ">
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
