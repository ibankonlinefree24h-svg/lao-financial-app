import React, { useState } from 'react';
import {
  Search,
  Filter,
  FileSpreadsheet,
  Printer,
  X,
  ImageIcon,
  PlusCircle,
  MinusCircle,
  ArrowRightLeft,
  CheckCircle,
  Clock,
  RotateCcw,
  ShieldAlert,
  Sliders,
  Download
} from 'lucide-react';
import ReceiptModal from './ReceiptModal';

export default function AllTransactionsView({
  transactions,
  onAddTransaction,
  onDeleteTransaction,
  exchangeRate
}) {
  const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');
  const [activeStatusFilter, setActiveStatusFilter] = useState('ALL');
  const [activeCurrencyFilter, setActiveCurrencyFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSlipUrl, setSelectedSlipUrl] = useState(null);
  const [activeReceiptTx, setActiveReceiptTx] = useState(null);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'THB') return Math.round(amount * 630);
    if (c === 'USD') return Math.round(amount * 22500);
    if (c === 'CNY') return Math.round(amount * 3100);
    if (c === 'RUB') return Math.round(amount * 275);
    return Math.round(amount);
  };

  const filteredTransactions = transactions.filter((tx) => {
    if (activeTypeFilter !== 'ALL' && tx.type !== activeTypeFilter) return false;
    if (activeCurrencyFilter !== 'ALL' && tx.currency !== activeCurrencyFilter) return false;
    if (activeStatusFilter !== 'ALL' && (tx.status || 'APPROVED') !== activeStatusFilter) return false;

    const matchSearch =
      tx.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.customerName && tx.customerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.tags && tx.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));

    return matchSearch;
  });

  const handleExport = (fmt) => {
    alert(`ລະບົບກຳລັງ Export ຂໍ້ມູນທຸລະກຳທັງໝົດເປັນໄຟລ໌ .${fmt} ຮຽບຮ້ອຍ!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header & Actions */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📋 ບັນຊີທຸລະກຳທັງໝົດ (All Financial Transactions Ledger)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              ຄຸ້ມຄອງ, ກວດສອບ, ອະນຸມັດ, ແລະ ສົ່ງອອກຂໍ້ມູນທຸລະກຳ 4 ສະກຸນເງິນ (LAK, THB, USD, CNY)
            </p>
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
                gap: '8px'
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
                gap: '8px'
              }}
              onClick={() => onAddTransaction('TRANSFER')}
            >
              <ArrowRightLeft size={18} /> 🔄 ໂອນຍ້າຍ
            </button>
          </div>
        </div>

        {/* Filter Pills Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '18px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <div className="filter-pill-buttons">
              <button className={`filter-pill-btn ${activeTypeFilter === 'ALL' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('ALL')}>
                ທັງໝົດ ({transactions.length})
              </button>
              <button className={`filter-pill-btn ${activeTypeFilter === 'INCOME' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('INCOME')} style={activeTypeFilter === 'INCOME' ? { background: '#10b981' } : {}}>
                🟢 ລາຍຮັບ
              </button>
              <button className={`filter-pill-btn ${activeTypeFilter === 'EXPENSE' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('EXPENSE')} style={activeTypeFilter === 'EXPENSE' ? { background: '#ef4444' } : {}}>
                🔴 ລາຍຈ່າຍ
              </button>
              <button className={`filter-pill-btn ${activeTypeFilter === 'TRANSFER' ? 'active' : ''}`} onClick={() => setActiveTypeFilter('TRANSFER')} style={activeTypeFilter === 'TRANSFER' ? { background: '#6366f1' } : {}}>
                🔄 ໂອນຍ້າຍ
              </button>
            </div>

            <div className="month-select-box">
              <select value={activeCurrencyFilter} onChange={(e) => setActiveCurrencyFilter(e.target.value)}>
                <option value="ALL">ທຸກສະກຸນເງິນ</option>
                <option value="LAK">₭ LAK</option>
                <option value="THB">฿ THB</option>
                <option value="USD">$ USD</option>
                <option value="CNY">¥ CNY</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <div className="search-bar-gold" style={{ width: '220px' }}>
              <Search size={16} color="var(--text-muted)" />
              <input
                type="text"
                placeholder="ຄົ້ນຫາ, ແທັກ (#ໂຄງການA)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button className="icon-btn-xs" style={{ width: 'auto', padding: '6px 12px', background: 'rgba(16, 185, 129, 0.2)', color: '#34d399' }} onClick={() => handleExport('xlsx')}>
              <FileSpreadsheet size={15} /> Export
            </button>
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
                <th>ສະຖານະອະນຸມັດ</th>
                <th>ໃບສຳຄັນ / ສະລິບ</th>
                <th>ຈັດການ</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => {
                const isIncome = tx.type === 'INCOME';
                const isExpense = tx.type === 'EXPENSE';
                const isTransfer = tx.type === 'TRANSFER';
                const convertedLAK = convert3ToLAK(tx.amount, tx.currency);
                const status = tx.status || 'APPROVED';

                return (
                  <tr key={tx.id}>
                    <td style={{ fontSize: '0.82rem' }}>{tx.date}</td>

                    <td>
                      <span
                        className="status-badge-pill"
                        style={{
                          background: isIncome ? 'rgba(16,185,129,0.2)' : isExpense ? 'rgba(239,68,68,0.2)' : 'rgba(99,102,241,0.2)',
                          color: isIncome ? '#34d399' : isExpense ? '#f87171' : '#818cf8'
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
                      <span className="status-badge-pill green" style={{ fontSize: '0.75rem' }}>
                        ✅ {status}
                      </span>
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

                    <td>
                      <button className="icon-btn-xs" style={{ color: '#f87171' }} onClick={() => onDeleteTransaction(tx.id)} title="ລຶບແບບມີປະຫວັດ (Soft Delete)">
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

      {/* Official Receipt Modal */}
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
