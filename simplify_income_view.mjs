import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';

const simplifiedContent = `import React, { useState } from 'react';
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
  Coins,
  Table,
  Eye,
  FileText,
  Activity,
  ChevronDown,
  ChevronUp,
  Scale
} from 'lucide-react';
import {
  defaultExchangeRates,
  initialWallets,
  expenseCategories,
  incomeCategories,
  lifetimeFinancialData,
  multiCurrencyRealBalances
} from '../data/mockIncomeExpenses';
import ReceiptModal from './ReceiptModal';

export default function IncomeExpenseView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate,
  onUpdateExchangeRate
}) {
  const [activeMainTab, setActiveMainTab] = useState('TABLE'); // 'TABLE', 'TRANSACTIONS'
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ທັງໝົດ');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [activeReceiptTx, setActiveReceiptTx] = useState(null);
  const [activeDetailTx, setActiveDetailTx] = useState(null);
  const [activeMonthAudit, setActiveMonthAudit] = useState(null);
  const [isEditingRate, setIsEditingRate] = useState(false);

  // Exchange Rates State
  const [rates, setRates] = useState(defaultExchangeRates);
  const [tempRubRate, setTempRubRate] = useState(rates.rubToLak || 275);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'RUB') return Math.round(amount * (rates.rubToLak || 275));
    return Math.round(amount);
  };

  const handleSaveRates = () => {
    const updated = {
      ...rates,
      rubToLak: Number(tempRubRate) || 275,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setRates(updated);
    if (onUpdateExchangeRate) onUpdateExchangeRate(updated.rubToLak);
    setIsEditingRate(false);
  };

  const allTimeSummary = lifetimeFinancialData.summary;
  const continuous24Months = lifetimeFinancialData.continuous24Months;
  const maxIncomeVal = Math.max(...continuous24Months.map((m) => m.income));

  // Filtered transactions
  const filteredTransactions = transactions.filter((t) => {
    if (activeTypeFilter !== 'ALL' && t.type !== activeTypeFilter) return false;
    if (categoryFilter !== 'ທັງໝົດ') {
      const cleanCat = categoryFilter.replace('🔴 ', '').replace('🟢 ', '');
      if (!t.category.includes(cleanCat)) return false;
    }
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchCat = t.category.toLowerCase().includes(term);
      const matchWallet = t.walletName.toLowerCase().includes(term);
      const matchCustomer = (t.customerName || '').toLowerCase().includes(term);
      const matchNote = (t.note || '').toLowerCase().includes(term);
      const matchAmount = t.amount.toString().includes(term);
      return matchCat || matchWallet || matchCustomer || matchNote || matchAmount;
    }
    return true;
  });

  const handleExportData = (type) => {
    alert(\`📥 ກຳລັງດາວໂຫຼດຂໍ້ມູນລາຍຮັບ-ລາຍຈ່າຍ (\${type.toUpperCase()}) 24 ເດືອນ...\`);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 🌟 1. QUICK HEADER & ACTION BUTTONS */}
      <div
        className="glass-panel"
        style={{
          padding: '20px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(6, 182, 212, 0.35)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white',
              boxShadow: '0 6px 20px rgba(6, 182, 212, 0.4)'
            }}
          >
            <TrendingUp size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0, color: '#38bdf8' }}>
              📊 ລະບົບຈັດການລາຍຮັບ-ລາຍຈ່າຍ (Income & Expense)
            </h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              ຕິດຕາມກະແສເງິນສົດ 2 ສະກຸນ (🇱🇦 LAK & 🇷🇺 RUB) ພ້ອມສະຫຼຸບ 24 ເດືອນ
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            className="btn-primary-emerald"
            style={{ padding: '9px 18px', fontSize: '0.85rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => onAddTransaction('INCOME')}
          >
            <PlusCircle size={16} /> 🟢 ບັນທຶກລາຍຮັບ
          </button>
          <button
            style={{
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              color: 'white',
              padding: '9px 18px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => onAddTransaction('EXPENSE')}
          >
            <MinusCircle size={16} /> 🔴 ບັນທຶກລາຍຈ່າຍ
          </button>
          <button
            className="icon-btn-xs"
            style={{ padding: '9px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.08)' }}
            onClick={() => onAddTransaction('TRANSFER')}
          >
            <ArrowRightLeft size={16} /> 🔄 ໂອນຍ້າຍບັນຊີ
          </button>
          <button
            className="icon-btn-xs"
            style={{ padding: '9px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(16,185,129,0.18)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}
            onClick={() => handleExportData('xlsx')}
          >
            <FileSpreadsheet size={15} /> 📄 Export Excel
          </button>
        </div>
      </div>

      {/* 🌟 2. COMPACT METRIC CARDS GRID (4 CARDS HORIZONTAL) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px' }}>
        {/* LAK Card */}
        <div className="glass-panel" style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #34d399', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#34d399' }}>{multiCurrencyRealBalances.lak.flag} ເງິນກີບ LAK</span>
            <span className="tag tag-emerald" style={{ fontSize: '0.72rem' }}>{multiCurrencyRealBalances.lak.percentOfTotal}%</span>
          </div>
          <h3 style={{ fontSize: '1.45rem', color: '#34d399', margin: '6px 0 2px', fontWeight: 800 }}>
            ₭ {multiCurrencyRealBalances.lak.amount.toLocaleString()}
          </h3>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ຍອດເງິນສົດຕົວຈິງ LAK</div>
        </div>

        {/* RUB Card */}
        <div className="glass-panel" style={{ padding: '16px 20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #38bdf8', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8' }}>{multiCurrencyRealBalances.rub.flag} ເງິນລັດເຊຍ RUB</span>
            <span className="tag tag-blue" style={{ fontSize: '0.72rem' }}>1 RUB = {rates.rubToLak || 275} ₭</span>
          </div>
          <h3 style={{ fontSize: '1.45rem', color: '#38bdf8', margin: '6px 0 2px', fontWeight: 800 }}>
            ₽ {multiCurrencyRealBalances.rub.amount.toLocaleString()}
          </h3>
          <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>₭ {multiCurrencyRealBalances.rub.lakEquivalent.toLocaleString()} LAK</div>
        </div>

        {/* Income 2026 Card */}
        <div className="glass-panel" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))', borderColor: 'rgba(16, 185, 129, 0.35)', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🟢 ລາຍຮັບລວມ 2026</div>
          <h3 style={{ color: '#34d399', fontSize: '1.45rem', fontWeight: 800, margin: '6px 0 2px' }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
          <div style={{ fontSize: '0.78rem', color: '#10b981', fontWeight: 600 }}>+58.2% ຈາກປີ 2025</div>
        </div>

        {/* Expense 2026 Card */}
        <div className="glass-panel" style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: '16px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>🔴 ລາຍຈ່າຍລວມ 2026</div>
          <h3 style={{ color: '#f87171', fontSize: '1.45rem', fontWeight: 800, margin: '6px 0 2px' }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
          <div style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 700 }}>ກຳໄລ: ₭ {allTimeSummary.netProfitLAK.toLocaleString()} (78.1%)</div>
        </div>
      </div>

      {/* 🌟 3. MAIN TAB SWITCHER (SIMPLIFIED TO 2 MAIN TABS + ADVANCED TOGGLE) */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className={\`filter-pill-btn \${activeMainTab === 'TABLE' ? 'active' : ''}\`}
            onClick={() => setActiveMainTab('TABLE')}
            style={{ padding: '10px 22px', fontSize: '0.9rem', borderRadius: '12px', fontWeight: 700 }}
          >
            📑 1. ຕາຕະລາງ 24 ເດືອນ (2026 ຢູ່ເທິງ)
          </button>

          <button
            className={\`filter-pill-btn \${activeMainTab === 'TRANSACTIONS' ? 'active' : ''}\`}
            onClick={() => setActiveMainTab('TRANSACTIONS')}
            style={{ padding: '10px 22px', fontSize: '0.9rem', borderRadius: '12px', fontWeight: 700 }}
          >
            ⚡ 2. ລາຍການທຸລະກຳ Real-Time ({transactions.length})
          </button>
        </div>

        <button
          className="icon-btn-xs"
          style={{
            padding: '8px 16px',
            fontSize: '0.82rem',
            borderRadius: '10px',
            background: showAdvanced ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
            color: '#fff',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <BarChart3 size={15} /> {showAdvanced ? '🔼 ຊ່ອນການວິເຄາະລຶກ & ກຣາຟ' : '🔽 📊 ວິເຄາະລຶກ & ກຣາຟ (Advanced Analytics)'}
        </button>
      </div>

      {/* 🌟 COLLAPSIBLE ADVANCED ANALYTICS SECTION */}
      {showAdvanced && (
        <div className="glass-panel" style={{ padding: '20px', borderRadius: '18px', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>
            📊 ກຣາຟຟິກລາຍຮັບ-ລາຍຈ່າຍ 24 ເດືອນ (Continuous Graphic)
          </h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: '240px', padding: '16px 12px 12px', background: 'rgba(0,0,0,0.4)', borderRadius: '12px', gap: '4px', overflowX: 'auto' }}>
            {continuous24Months.map((d, i) => {
              const incomeHeight = Math.max(10, Math.round((d.income / maxIncomeVal) * 100));
              const expenseHeight = Math.max(10, Math.round((d.expense / maxIncomeVal) * 100));
              const is2026 = d.year === '2026';
              return (
                <div key={i} style={{ flex: 1, minWidth: '45px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', width: '100%', justifyContent: 'center', height: '80%' }}>
                    <div style={{ width: '40%', background: is2026 ? '#34d399' : '#38bdf8', height: \`\${incomeHeight}%\`, borderRadius: '3px 3px 0 0' }} title={\`\${d.month}: ₭ \${d.income.toLocaleString()}\`} />
                    <div style={{ width: '40%', background: '#f87171', height: \`\${expenseHeight}%\`, borderRadius: '3px 3px 0 0' }} title={\`\${d.month}: ₭ \${d.expense.toLocaleString()}\`} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: is2026 ? '#34d399' : 'var(--text-muted)', marginTop: '4px', fontWeight: is2026 ? 800 : 500 }}>
                    {d.month}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 🌟 TAB 1: GRANULAR 24-MONTH TABLE (2026 AT TOP) */}
      {activeMainTab === 'TABLE' && (
        <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Table size={24} color="#34d399" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
                📑 ຕາຕະລາງລາຍຮັບ-ລາຍຈ່າຍ 24 ເດືອນ (ປີ 2026 ຢູ່ເທິງສຸດ)
              </h3>
            </div>
            <button
              className="btn-primary-emerald"
              onClick={() => handleExportData('xlsx')}
              style={{ padding: '7px 14px', fontSize: '0.82rem' }}
            >
              <FileSpreadsheet size={15} /> Export Excel
            </button>
          </div>

          <div className="table-responsive-wrapper">
            <table className="customer-full-table" style={{ fontSize: '0.84rem' }}>
              <thead>
                <tr>
                  <th>ເດືອນ/ປີ</th>
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
                {[...continuous24Months].reverse().map((m, idx) => {
                  const is2026 = m.year === '2026';
                  return (
                    <tr key={idx} style={is2026 ? { background: 'rgba(16, 185, 129, 0.05)' } : {}}>
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

      {/* 🌟 TAB 2: REAL-TIME TRANSACTIONS STREAM */}
      {activeMainTab === 'TRANSACTIONS' && (
        <div className="glass-panel" style={{ padding: '20px 24px', borderRadius: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={22} color="#34d399" />
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>⚡ ລາຍການທຸລະກຳ Real-Time ({filteredTransactions.length})</h3>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
              <div className="filter-pill-buttons">
                <button className={\`filter-pill-btn \${activeTypeFilter === 'ALL' ? 'active' : ''}\`} onClick={() => setActiveTypeFilter('ALL')}>
                  ທັງໝົດ
                </button>
                <button className={\`filter-pill-btn \${activeTypeFilter === 'INCOME' ? 'active' : ''}\`} onClick={() => setActiveTypeFilter('INCOME')}>
                  🟢 ລາຍຮັບ
                </button>
                <button className={\`filter-pill-btn \${activeTypeFilter === 'EXPENSE' ? 'active' : ''}\`} onClick={() => setActiveTypeFilter('EXPENSE')}>
                  🔴 ລາຍຈ່າຍ
                </button>
              </div>

              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['ທັງໝົດ', '🔴 Ads ໂຄສະນາ', '🔴 ເງິນເດືອນ', '🔴 IT Server', '🟢 ດອກເບ້ຍສິນເຊື່ອ'].map((cat) => (
                  <button
                    key={cat}
                    className="table-link-btn"
                    style={{
                      padding: '4px 10px',
                      fontSize: '0.76rem',
                      borderRadius: '10px',
                      background: categoryFilter === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
                      color: categoryFilter === cat ? '#fff' : 'var(--text-secondary)'
                    }}
                    onClick={() => setCategoryFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="search-bar-gold" style={{ width: '200px' }}>
                <Search size={15} color="var(--text-muted)" />
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
            <table className="customer-full-table" style={{ fontSize: '0.84rem' }}>
              <thead>
                <tr>
                  <th>ວັນທີ/ເວລາ</th>
                  <th>ປະເພດ</th>
                  <th>ໝວດໝູ່ & ແທັກ</th>
                  <th>ບັນຊີ/ກະເປົາເງິນ</th>
                  <th>ຜູ້ຈ່າຍ / ຜູ້ຮັບ</th>
                  <th>ຈຳນວນເງິນ</th>
                  <th>ມູນຄ່າລວມ (LAK)</th>
                  <th>ໃບສຳຄັນ</th>
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
                        <span className={\`status-badge-pill \${isIncome ? 'green' : 'red'}\`}>
                          {isIncome ? '🟢 ລາຍຮັບ' : '🔴 ລາຍຈ່າຍ'}
                        </span>
                      </td>
                      <td>{tx.category}</td>
                      <td>{tx.walletName}</td>
                      <td>{tx.customerName || '-'}</td>
                      <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                        {tx.currency === 'LAK' ? \`₭ \${tx.amount.toLocaleString()}\` : \`\${tx.amount.toLocaleString()} \${tx.currency}\`}
                      </td>
                      <td style={{ fontWeight: 700, color: isIncome ? '#34d399' : '#f87171' }}>
                        ₭ {convertedLAK.toLocaleString()}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button className="table-link-btn" onClick={() => setActiveDetailTx(tx)}>
                            <Eye size={12} /> ລາຍລະອຽດ
                          </button>
                          <button className="table-link-btn" onClick={() => setActiveReceiptTx(tx)}>
                            <Printer size={12} /> ໃບສຳຄັນ
                          </button>
                        </div>
                      </td>
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
      )}

      {/* 🌟 MONTH AUDIT MODAL */}
      {activeMonthAudit && (
        <div className="customer-modal-backdrop" onClick={() => setActiveMonthAudit(null)}>
          <div className="customer-modal-container glass-panel" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
            <div className="customer-modal-header">
              <h3>🔍 Audit ເດືອນ {activeMonthAudit.month}</h3>
              <button className="icon-btn" onClick={() => setActiveMonthAudit(null)}><X size={18} /></button>
            </div>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>🟢 ລາຍຮັບລວມ: <strong style={{ color: '#34d399' }}>₭ {activeMonthAudit.income.toLocaleString()}</strong></div>
              <div>🔴 ລາຍຈ່າຍລວມ: <strong style={{ color: '#f87171' }}>₭ {activeMonthAudit.expense.toLocaleString()}</strong></div>
              <div>💰 ກຳໄລສຸດທິ: <strong style={{ color: '#38bdf8' }}>₭ {activeMonthAudit.profit.toLocaleString()} ({activeMonthAudit.margin}%)</strong></div>
            </div>
          </div>
        </div>
      )}

      {/* 🌟 TRANSACTION RECEIPT MODAL */}
      {activeReceiptTx && (
        <ReceiptModal transaction={activeReceiptTx} onClose={() => setActiveReceiptTx(null)} />
      )}
    </div>
  );
}
`;

fs.writeFileSync(filepath, simplifiedContent, 'utf8');
console.log('Successfully written streamlined IncomeExpenseView.jsx!');
