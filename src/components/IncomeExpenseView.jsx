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
  CreditCard,
  Banknote,
  PieChart
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
  const [activeTab, setActiveTab] = useState('TRANSACTIONS'); // 'TRANSACTIONS' or 'ANALYTICS'

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

  // Full 12-Month Multi-Year Graphic Enterprise Dataset
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
      { month: 'ສິງຫາ', income: 16500000, expense: 4400000, profit: 12100000, growth: '+18.2%' }
    ]
  };

  const currentYearData = yearlyAnalyticsData[selectedYear] || yearlyAnalyticsData['2026'];

  let peakIncomeMonth = currentYearData[0];
  currentYearData.forEach((item) => {
    if (item.income > peakIncomeMonth.income) peakIncomeMonth = item;
  });

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
    <div>
      {/* 1. Multi-Currency 3-Way Exchange Rate Engine Banner */}
      <div className="exchange-rate-banner" style={{ marginBottom: '20px' }}>
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

      {/* 2. Key Financial Cards (Income, Expense, Net Profit, Total Liquidity) */}
      <div className="preview-grid" style={{ marginBottom: '24px' }}>
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

      {/* 3. Bank Account Balances & Office Cash Vault */}
      <div className="glass-panel" style={{ padding: '20px', marginBottom: '24px' }}>
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

      {/* 4. Sub-Navigation Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', flexWrap: 'wrap' }}>
        <button
          className={`filter-pill-btn ${activeTab === 'TRANSACTIONS' ? 'active' : ''}`}
          onClick={() => setActiveTab('TRANSACTIONS')}
          style={{ padding: '8px 18px', fontSize: '0.9rem' }}
        >
          💳 ລາຍການລາຍຮັບ-ລາຍຈ່າຍ ({transactions.length})
        </button>

        <button
          className={`filter-pill-btn ${activeTab === 'ANALYTICS' ? 'active' : ''}`}
          onClick={() => setActiveTab('ANALYTICS')}
          style={{ padding: '8px 18px', fontSize: '0.9rem' }}
        >
          📊 ກຣາຟຟິກ 12 ເດືອນ & AI Analytics
        </button>
      </div>

      {/* TAB 1: TRANSACTIONS VIEW */}
      {activeTab === 'TRANSACTIONS' && (
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
      )}

      {/* TAB 2: 12-MONTH GRAPHICS & AI FINANCIAL ANALYTICS */}
      {activeTab === 'ANALYTICS' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BarChart3 size={24} color="var(--accent-cyan)" />
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ ຄົບ 12 ເດືອນ (ປີ {selectedYear})</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ວິເຄາະເດືອນໃດລາຍຮັບ/ລາຍຈ່າຍສູງ ແລະ ອັດຕາການເຕີບໂຕ MoM %</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>ເລືອກປີ:</span>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.88rem', background: 'var(--surface-color)', color: 'var(--text-primary)' }}
                >
                  <option value="2026">ປີ 2026 (ປະຈຸບັນ)</option>
                  <option value="2025">ປີ 2025</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '280px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', gap: '8px', overflowX: 'auto' }}>
              {currentYearData.map((d, i) => (
                <div key={i} style={{ flex: 1, minWidth: '55px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: '0.68rem', color: d.growth.startsWith('+') ? '#34d399' : '#f87171', fontWeight: 700, marginBottom: '4px' }}>
                    {d.growth}
                  </span>

                  <div style={{ display: 'flex', gap: '3px', alignItems: 'flex-end', height: '190px', width: '100%', justifyContent: 'center' }}>
                    <div style={{ width: '40%', background: '#10b981', height: `${(d.income / 40000000) * 100}%`, borderRadius: '3px 3px 0 0' }} title={`ລາຍຮັບ: ₭ ${d.income.toLocaleString()}`} />
                    <div style={{ width: '40%', background: '#ef4444', height: `${(d.expense / 40000000) * 100}%`, borderRadius: '3px 3px 0 0' }} title={`ລາຍຈ່າຍ: ₭ ${d.expense.toLocaleString()}`} />
                  </div>
                  <span style={{ fontSize: '0.72rem', marginTop: '8px', color: 'var(--text-secondary)', fontWeight: 600, textAlign: 'center' }}>{d.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AI Executive Summary & Smart Budget Allocator */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <Bot size={24} color="#c084fc" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>🤖 AI ລາຍງານວິເຄາະການເງິນ & ການຈັດສັນເງິນກຳໄລ (Smart Budget Allocator)</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
              <div className="glass-panel" style={{ padding: '16px', background: 'rgba(16, 185, 129, 0.08)', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#34d399', fontSize: '0.92rem', margin: '0 0 6px', fontWeight: 700 }}>
                  📈 1. ຄັງໝູນວຽນສິນເຊື່ອ (Re-investment 45%)
                </h4>
                <h3 style={{ fontSize: '1.2rem', color: '#34d399', margin: '4px 0 2px' }}>₭ {smartBudget.reinvestmentCapital.toLocaleString()}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ຈັດສັນເພີ່ມຍອດສິນເຊື່ອ LAK/RUB ໃຫ້ລູກຄ້າໃໝ່</span>
              </div>

              <div className="glass-panel" style={{ padding: '16px', background: 'rgba(99, 102, 241, 0.08)', borderLeft: '4px solid #6366f1' }}>
                <h4 style={{ color: '#818cf8', fontSize: '0.92rem', margin: '0 0 6px', fontWeight: 700 }}>
                  🏢 2. ຄ່າໃຊ້ຈ່າຍບໍລິຫານ (Operating Expenses 35%)
                </h4>
                <h3 style={{ fontSize: '1.2rem', color: '#818cf8', margin: '4px 0 2px' }}>₭ {smartBudget.operatingExpense.toLocaleString()}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}> Ads ໂຄສະນາ, ເງິນເດືອນ, IT Server</span>
              </div>

              <div className="glass-panel" style={{ padding: '16px', background: 'rgba(245, 158, 11, 0.08)', borderLeft: '4px solid #f59e0b' }}>
                <h4 style={{ color: '#fbbf24', fontSize: '0.92rem', margin: '0 0 6px', fontWeight: 700 }}>
                  🛡️ 3. ຄັງສຳຮອງສຸກເສີນ & ໜີ້ເສຍ (Emergency Reserve 20%)
                </h4>
                <h3 style={{ fontSize: '1.2rem', color: '#fbbf24', margin: '4px 0 2px' }}>₭ {smartBudget.emergencyReserve.toLocaleString()}</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ຄັງສຳຮອງປ້ອງກັນ NPL ແລະ ສະພາບຄ່ອງອົງກອນ</span>
              </div>
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
