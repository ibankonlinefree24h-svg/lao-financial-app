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
  Target,
  ArrowRightLeft,
  Tag,
  Clock,
  ShieldCheck,
  Award,
  Download,
  FileText,
  Percent,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import {
  defaultExchangeRates,
  initialWallets,
  expenseCategories,
  incomeCategories,
  initialSavingsGoals,
  initialRecurringTransactions
} from '../data/mockIncomeExpenses';
import ReceiptModal from './ReceiptModal';

export default function IncomeExpenseView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate,
  onUpdateExchangeRate
}) {
  const [activeSubTab, setActiveSubTab] = useState('DASHBOARD'); // 'DASHBOARD', 'WALLETS', 'BUDGETS', 'REPORTS'
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

  // Dynamic Wallets and Goals State
  const [wallets, setWallets] = useState(initialWallets);
  const [savingsGoals, setSavingsGoals] = useState(initialSavingsGoals);
  const [recurringTxs, setRecurringTxs] = useState(initialRecurringTransactions);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'THB') return Math.round(amount * rates.thbToLak);
    if (c === 'USD') return Math.round(amount * rates.usdToLak);
    if (c === 'CNY') return Math.round(amount * rates.cnyToLak);
    if (c === 'RUB') return Math.round(amount * rates.rubToLak);
    return Math.round(amount);
  };

  // Compute Net Worth by Currency
  let totalLAK = 0;
  let totalTHB = 0;
  let totalUSD = 0;
  let totalCNY = 0;

  wallets.forEach((w) => {
    totalLAK += w.balanceLAK;
  });

  totalTHB = Math.round(totalLAK / rates.thbToLak);
  totalUSD = Math.round(totalLAK / rates.usdToLak);
  totalCNY = Math.round(totalLAK / rates.cnyToLak);

  // Compute Live Monthly Income, Expense, and Savings
  let totalIncomeLAK = 0;
  let totalExpenseLAK = 0;

  transactions.forEach((tx) => {
    const lakEq = convert3ToLAK(tx.amount, tx.currency);
    if (tx.type === 'INCOME') totalIncomeLAK += lakEq;
    if (tx.type === 'EXPENSE') totalExpenseLAK += lakEq;
  });

  const netSavingsLAK = totalIncomeLAK - totalExpenseLAK;
  const profitMarginPercent = totalIncomeLAK > 0 ? Math.round((netSavingsLAK / totalIncomeLAK) * 100) : 0;

  // Filtered Transactions
  const filteredTransactions = transactions.filter((tx) => {
    if (activeTypeFilter !== 'ALL' && tx.type !== activeTypeFilter) return false;

    const matchSearch =
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerName && tx.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.tags && tx.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchSearch;
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

  const handleExportData = (format) => {
    alert(`ລະບົບກຳລັງສ້າງ ແລະ ສົ່ງອອກໄຟລ໌ລາຍງານລາຍຮັບ-ລາຍຈ່າຍ (.${format}) ໃຫ້ຮຽບຮ້ອຍ!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. 4-Currency Exchange Rate Engine Banner */}
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

          <button
            className="icon-btn-xs"
            style={{ width: 'auto', padding: '5px 12px', fontSize: '0.8rem', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}
            onClick={() => handleExportData('xlsx')}
          >
            <FileSpreadsheet size={14} /> Export Excel/PDF
          </button>
        </div>
      </div>

      {/* 📊 1.1 MODULE: ຍອດເງິນລວມແຍກ 4 ສະກຸນເງິນ (Total Net Worth) & Monthly Summary */}
      <div className="preview-grid" style={{ margin: 0 }}>
        {/* Total Net Worth Box */}
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))', borderColor: 'rgba(168,85,247,0.3)' }}>
          <div className="kpi-info">
            <p>💎 ຍອດເງິນລວມທຸກບັນຊີ (Total Net Worth)</p>
            <h3 style={{ color: '#a855f7', fontSize: '1.45rem' }}>₭ {totalLAK.toLocaleString()}</h3>
            <div style={{ display: 'flex', gap: '10px', marginTop: '8px', fontSize: '0.78rem', fontWeight: 700, flexWrap: 'wrap' }}>
              <span style={{ color: '#38bdf8' }}>฿ {totalTHB.toLocaleString()}</span>
              <span style={{ color: '#34d399' }}>$ {totalUSD.toLocaleString()}</span>
              <span style={{ color: '#facc15' }}>¥ {totalCNY.toLocaleString()}</span>
            </div>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc' }}>
            <Wallet size={26} />
          </div>
        </div>

        {/* Total Income */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບທັງໝົດ (Total Income)</p>
            <h3 style={{ color: '#34d399' }}>₭ {totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowUpRight size={15} /> ເງິນເດືອນ, ດອກເບ້ຍ & ຄ່າທຳນຽມ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }}>
            <TrendingUp size={24} />
          </div>
        </div>

        {/* Total Expense */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍທັງໝົດ (Total Expense)</p>
            <h3 style={{ color: '#f87171' }}>₭ {totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px' }}>
              <ArrowDownRight size={15} /> ອາຫານ, Ads, ເຊົ່າ, IT Server
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171' }}>
            <TrendingDown size={24} />
          </div>
        </div>

        {/* Net Savings */}
        <div className="glass-panel kpi-card">
          <div className="kpi-info">
            <p>💰 ເງິນເຫຼືອ/ເງິນອອມສຸດທິ (Net Savings)</p>
            <h3 style={{ color: netSavingsLAK >= 0 ? '#38bdf8' : '#f87171' }}>₭ {netSavingsLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.82rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາເງິນອອມ: {profitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8' }}>
            <Target size={24} />
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`filter-pill-btn ${activeSubTab === 'DASHBOARD' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('DASHBOARD')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📊 1.1 ພາບລວມ & ທຸລະກຳ ({transactions.length})
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'WALLETS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('WALLETS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          💳 1.2 ຈັດການບັນຊີ & ກະເປົາເງິນ ({wallets.length})
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'BUDGETS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('BUDGETS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          🎯 1.5 ງົບປະມານ & ເປົ້າໝາຍ
        </button>

        <button
          className={`filter-pill-btn ${activeSubTab === 'REPORTS' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('REPORTS')}
          style={{ padding: '8px 18px', fontSize: '0.88rem' }}
        >
          📈 1.6 ລາຍງານ & Export (.xlsx / PDF)
        </button>
      </div>

      {/* SUB-TAB 1: 📊 DASHBOARD & TRANSACTIONS */}
      {activeSubTab === 'DASHBOARD' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Action Buttons & Filters */}
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

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
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
                  <button
                    className={`filter-pill-btn ${activeTypeFilter === 'TRANSFER' ? 'active' : ''}`}
                    onClick={() => setActiveTypeFilter('TRANSFER')}
                    style={activeTypeFilter === 'TRANSFER' ? { background: '#6366f1', borderColor: '#6366f1' } : {}}
                  >
                    🔄 ໂອນຍ້າຍ
                  </button>
                </div>

                <div className="search-bar-gold" style={{ width: '220px' }}>
                  <Search size={16} color="var(--text-muted)" />
                  <input
                    type="text"
                    placeholder="ຄົ້ນຫາ, ແທັກ (#ໂຄງການA)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Transactions Table */}
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
                    const isTransfer = tx.type === 'TRANSFER';
                    const convertedLAK = convert3ToLAK(tx.amount, tx.currency);

                    return (
                      <tr key={tx.id}>
                        <td style={{ fontSize: '0.82rem' }}>{tx.date}</td>

                        <td>
                          <span
                            className="status-badge-pill"
                            style={{
                              background: isIncome ? 'rgba(16,185,129,0.2)' : isExpense ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)',
                              color: isIncome ? '#34d399' : isExpense ? '#f87171' : '#818cf8',
                              border: `1px solid ${isIncome ? '#10b981' : isExpense ? '#ef4444' : '#6366f1'}44`
                            }}
                          >
                            {isIncome ? '🟢 ລາຍຮັບ' : isExpense ? '🔴 ລາຍຈ່າຍ' : '🔄 ໂອນຍ້າຍ'}
                          </span>
                        </td>

                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{tx.category}</div>
                          {tx.tags && tx.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: '4px', marginTop: '4px', flexWrap: 'wrap' }}>
                              {tx.tags.map((t, idx) => (
                                <span key={idx} className="tag tag-purple" style={{ fontSize: '0.7rem' }}>
                                  {t}
                                </span>
                              ))}
                            </div>
                          )}
                        </td>

                        <td>
                          {isTransfer ? (
                            <span style={{ fontSize: '0.8rem', color: '#c084fc' }}>
                              {tx.walletName} ➔ {tx.targetWalletName}
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.85rem' }}>{tx.walletName}</span>
                          )}
                        </td>

                        <td>{tx.customerName || '-'}</td>

                        <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : isExpense ? '#f87171' : '#818cf8' }}>
                          {tx.currency === 'LAK'
                            ? `₭ ${tx.amount.toLocaleString()}`
                            : tx.currency === 'THB'
                            ? `฿ ${tx.amount.toLocaleString()}`
                            : tx.currency === 'USD'
                            ? `$ ${tx.amount.toLocaleString()}`
                            : `¥ ${tx.amount.toLocaleString()}`}
                        </td>

                        <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : isExpense ? '#f87171' : '#818cf8' }}>
                          ₭ {convertedLAK.toLocaleString()}
                        </td>

                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <button className="table-link-btn" onClick={() => setActiveReceiptTx(tx)} title="ພິມໃບສຳຄັນ">
                              <Printer size={13} /> ໃບສຳຄັນ
                            </button>
                            {tx.slipUrl && (
                              <button className="table-link-btn" onClick={() => setSelectedSlipUrl(tx.slipUrl)} title="ເບິ່ງສະລິບ">
                                <ImageIcon size={13} /> ສະລິບ
                              </button>
                            )}
                          </div>
                        </td>

                        <td style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{tx.note || '-'}</td>

                        <td>
                          <button className="icon-btn-xs" style={{ color: '#f87171' }} onClick={() => onDeleteTransaction(tx.id)} title="ລຶບ">
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

      {/* SUB-TAB 2: 💳 1.2 ACCOUNTS & WALLETS (ຈັດການບັນຊີ & ກະເປົາເງິນ) */}
      {activeSubTab === 'WALLETS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>💳 ບັນຊີທະນາຄານ, ກະເປົາເງິນດິຈິຕອນ & ຕູ້ເງິນສົດ</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ບໍລິຫານຈັດການຍອດເງິນຄົງເຫຼືອແຕ່ລະບັນຊີ ແລະ ໂອນຍ້າຍລະຫວ່າງບັນຊີ</p>
              </div>

              <button
                className="btn-primary-emerald"
                style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
                onClick={() => onAddTransaction('TRANSFER')}
              >
                <ArrowRightLeft size={18} /> 🔄 ໂອນຍ້າຍລະຫວ່າງບັນຊີ
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
              {wallets.map((w) => (
                <div key={w.id} className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.25)', borderLeft: `4px solid ${w.color}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '1.4rem' }}>{w.icon}</span>
                    <span className="tag tag-purple" style={{ fontSize: '0.7rem' }}>{w.type}</span>
                  </div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '10px 0 4px', color: 'var(--text-primary)' }}>{w.name}</h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ເລກບັນຊີ: {w.accountNo}</div>
                  <h3 style={{ fontSize: '1.25rem', color: w.balanceLAK >= 0 ? w.color : '#f87171', margin: '12px 0 0', fontWeight: 800 }}>
                    ₭ {w.balanceLAK.toLocaleString()}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: 🎯 1.5 BUDGETING & SAVINGS GOALS */}
      {activeSubTab === 'BUDGETS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Monthly Budget Ceiling & Status Indicators */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '6px' }}>
              🎯 ງົບປະມານລາຍເດືອນຕາມໝວດໝູ່ (Monthly Budgeting)
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              ກຳນົດເພດານລາຍຈ່າຍແຕ່ລະໝວດໝູ່ ພ້ອມແຈ້ງເຕືອນສະຖານະ: 🟢 ປົກກະຕິ (&lt;70%), 🟡 ເຝົ້າລະວັງ (70%-90%), 🔴 ເກີນງົບ (&gt;100%)
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {expenseCategories.map((cat) => {
                // Calculate used amount for category
                const usedLAK = transactions
                  .filter((t) => t.type === 'EXPENSE' && t.category === cat.name)
                  .reduce((sum, t) => sum + convert3ToLAK(t.amount, t.currency), 0);

                const percent = Math.min(100, Math.round((usedLAK / (cat.budgetLAK || 1)) * 100));
                const isOver = percent >= 100;
                const isWarning = percent >= 70 && percent < 100;

                return (
                  <div key={cat.id} className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.2)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{cat.name}</span>
                      <span
                        className="status-badge-pill"
                        style={{
                          background: isOver ? 'rgba(239,68,68,0.2)' : isWarning ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)',
                          color: isOver ? '#f87171' : isWarning ? '#fbbf24' : '#34d399'
                        }}
                      >
                        {isOver ? '🔴 ເກີນງົບ' : isWarning ? '🟡 ເຝົ້າລະວັງ' : '🟢 ປົກກະຕິ'} ({percent}%)
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', margin: '10px 0 6px', color: 'var(--text-muted)' }}>
                      <span>ໃຊ້ໄປ: ₭ {usedLAK.toLocaleString()}</span>
                      <span>ງົບ: ₭ {cat.budgetLAK.toLocaleString()}</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${percent}%`,
                          height: '100%',
                          background: isOver ? '#ef4444' : isWarning ? '#f59e0b' : '#10b981',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Savings Goals with Progress Bar */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
              🎯 ເປົ້າໝາຍເງິນອອມ (Savings Goals & Progress)
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {savingsGoals.map((g) => {
                const progressPercent = Math.min(100, Math.round((g.currentLAK / g.targetLAK) * 100));

                return (
                  <div key={g.id} className="glass-panel" style={{ padding: '18px', background: 'rgba(0,0,0,0.2)', borderLeft: `4px solid ${g.color}` }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{g.name}</span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: g.color }}>{progressPercent}%</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', margin: '12px 0 6px', color: 'var(--text-muted)' }}>
                      <span>ອອມແລ້ວ: ₭ {g.currentLAK.toLocaleString()}</span>
                      <span>ເປົ້າໝາຍ: ₭ {g.targetLAK.toLocaleString()}</span>
                    </div>

                    <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                      <div style={{ width: `${progressPercent}%`, height: '100%', background: g.color, borderRadius: '5px' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: 📈 1.6 REPORTS & EXPORT */}
      {activeSubTab === 'REPORTS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700 }}>📈 ລາຍງານການເງິນ & ສົ່ງອອກຂໍ້ມູນ (Financial Reports & Export)</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ລາຍງານກະແສເງິນສົດ (Cashflow) ແລະ ລາຍງານກຳໄລ-ຂາດທຶນ (P&L)</p>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button className="btn-primary-emerald" onClick={() => handleExportData('xlsx')}>
                  <FileSpreadsheet size={16} /> Export Excel (.xlsx)
                </button>
                <button className="icon-btn-xs" style={{ width: 'auto', padding: '8px 14px' }} onClick={() => handleExportData('pdf')}>
                  <Download size={16} /> Export PDF
                </button>
              </div>
            </div>

            {/* Profit & Loss Statement (P&L Summary Table) */}
            <div className="table-responsive-wrapper">
              <table className="customer-full-table">
                <thead>
                  <tr>
                    <th>ລາຍການ (Item)</th>
                    <th>ຈຳນວນເງິນ (LAK Equivalent)</th>
                    <th>ສັດສ່ວນ (%)</th>
                    <th>ສະຖານະ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#34d399' }}>🟢 ລາຍຮັບລວມ (Total Revenue)</td>
                    <td style={{ fontWeight: 700, color: '#34d399' }}>₭ {totalIncomeLAK.toLocaleString()}</td>
                    <td>100%</td>
                    <td><span className="tag tag-emerald">ລາຍຮັບ</span></td>
                  </tr>
                  <tr>
                    <td style={{ fontWeight: 700, color: '#f87171' }}>🔴 ລາຍຈ່າຍລວມ (Total Expenses)</td>
                    <td style={{ fontWeight: 700, color: '#f87171' }}>₭ {totalExpenseLAK.toLocaleString()}</td>
                    <td>{totalIncomeLAK > 0 ? Math.round((totalExpenseLAK / totalIncomeLAK) * 100) : 0}%</td>
                    <td><span className="tag tag-pink">ຄ່າໃຊ້ຈ່າຍ</span></td>
                  </tr>
                  <tr style={{ background: 'rgba(56, 189, 248, 0.1)' }}>
                    <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1rem' }}>💰 ກຳໄລ/ເງິນອອມສຸດທິ (Net Profit / Savings)</td>
                    <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1rem' }}>₭ {netSavingsLAK.toLocaleString()}</td>
                    <td style={{ fontWeight: 800, color: '#38bdf8' }}>{profitMarginPercent}%</td>
                    <td><span className="tag tag-blue">ກຳໄລສຸດທິ</span></td>
                  </tr>
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
