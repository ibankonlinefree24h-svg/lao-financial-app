import React, { useState } from 'react';
import {
  Banknote,
  Search,
  Plus,
  FileText,
  Send,
  Calendar,
  ChevronDown,
  ChevronUp,
  Filter,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  UserCheck,
  Percent,
  Edit2,
  Lock,
  Smartphone,
  Eye
} from 'lucide-react';
import { calculateMonthlyLoanStatus } from '../data/mockMonthlyLoans';
import BulkWhatsAppModal from './BulkWhatsAppModal';

export default function MonthlyLoanTable({
  monthlyLoans,
  customers,
  onAddLoan,
  onOpenInvoice,
  onOpenWhatsform,
  onUpdatePaidAmount,
  onUpdateInterestRate,
  onCarryoverMonth
}) {
  const [activeCurrency, setActiveCurrency] = useState('LAK'); // 'LAK' or 'RUB'
  const [activeMonthKey, setActiveMonthKey] = useState('2026-08');
  const [activeFilterPill, setActiveFilterPill] = useState('ALL'); // 'ALL', 'NEAR_DUE', 'DUE_TODAY', 'OVERDUE', 'HIGH_DEBT', 'VIP'
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedRowId, setHighlightedRowId] = useState(null);

  const [isTableVisible, setIsTableVisible] = useState(true);
  const [editingInterestLoanId, setEditingInterestLoanId] = useState(null);
  const [tempInterestRate, setTempInterestRate] = useState('');
  const [zoomPercent, setZoomPercent] = useState(100); // 50% to 150% dynamic slider

  const [isBulkWhatsAppOpen, setIsBulkWhatsAppOpen] = useState(false);

  // Get current active month data
  const currentMonthData = monthlyLoans[activeMonthKey]?.[activeCurrency] || [];

  // Handle Search with Auto Gold Highlight & Scroll
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== '') {
      const match = currentMonthData.find(
        (item) =>
          item.customerName.toLowerCase().includes(term.toLowerCase()) ||
          item.customerId.toLowerCase().includes(term.toLowerCase())
      );

      if (match) {
        setHighlightedRowId(match.id);
        const rowEl = document.getElementById(`loan-row-${match.id}`);
        if (rowEl) {
          rowEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        setHighlightedRowId(null);
      }
    } else {
      setHighlightedRowId(null);
    }
  };

  // Filter Data based on Top Action Pills & Search Term
  const filteredList = currentMonthData.filter((item) => {
    const statusObj = calculateMonthlyLoanStatus(item, '2026-08-12');

    // Apply Filter Pills
    if (activeFilterPill === 'NEAR_DUE') {
      if (!statusObj.label.startsWith('<-') && statusObj.label !== '<ຢູ່ໃນກຳນົດ>') return false;
    } else if (activeFilterPill === 'DUE_TODAY') {
      if (statusObj.label !== '<ຢູ່ໃນກຳນົດ>') return false;
    } else if (activeFilterPill === 'OVERDUE') {
      if (!statusObj.label.startsWith('<+') && statusObj.label !== '<ຄຳນວນດອກຂຶ້ນ>') return false;
    } else if (activeFilterPill === 'HIGH_DEBT') {
      const amount = activeCurrency === 'LAK' ? item.amountLAK : item.amountRUB;
      if (amount < 4000000) return false;
    } else if (activeFilterPill === 'VIP') {
      if (!item.isVipCare) return false;
    }

    // Apply Search Filter
    if (searchTerm.trim() !== '') {
      const matchName = item.customerName.toLowerCase().includes(searchTerm.toLowerCase());
      const matchId = item.customerId.toLowerCase().includes(searchTerm.toLowerCase());
      return matchName || matchId;
    }

    return true;
  });

  const getFilterNameText = () => {
    switch (activeFilterPill) {
      case 'NEAR_DUE': return 'ໃກ້ເຖິງກຳນົດຊຳລະ';
      case 'DUE_TODAY': return 'ເຖິງກຳນົດຊຳລະມື້ນີ້';
      case 'OVERDUE': return 'ເກີນກຳນົດຊຳລະ';
      case 'HIGH_DEBT': return 'ລູກຄ້າໜີ້ຫຼາຍ';
      case 'VIP': return 'ດູແລເປັນພິເສດ';
      default: return 'ລູກຄ້າທັງໝົດ';
    }
  };

  const handleDirectWhatsAppSingle = (item) => {
    const principal = activeCurrency === 'LAK' ? item.amountLAK : item.amountRUB;
    const interest = Math.round((principal * item.interestRate) / 100);
    const total = principal + interest;
    const remaining = Math.max(0, total - (item.paidAmount || 0));

    const cleanPhone = item.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('856') ? cleanPhone : `856${cleanPhone.replace(/^0/, '')}`;

    const text = encodeURIComponent(
      `ສະບາຍດີ ທ່ານ ${item.customerName}\n` +
      `📌 ໃບແຈ້ງໜີ້ປະຈຳເດືອນ (${activeCurrency})\n` +
      `• ຍອດເງິນກູ້: ${activeCurrency === 'LAK' ? '₭ ' + principal.toLocaleString() : principal.toLocaleString() + ' RUB'}\n` +
      `• ດອກເບ້ຍ (${item.interestRate}%): ${activeCurrency === 'LAK' ? '₭ ' + interest.toLocaleString() : interest.toLocaleString() + ' RUB'}\n` +
      `• ຍອດລວມ: ${activeCurrency === 'LAK' ? '₭ ' + total.toLocaleString() : total.toLocaleString() + ' RUB'}\n` +
      `• ຍັງເຫຼືອຕ້ອງຊຳລະ: ${activeCurrency === 'LAK' ? '₭ ' + remaining.toLocaleString() : remaining.toLocaleString() + ' RUB'}\n` +
      `• ວັນທີກຳນົດຊຳລະ: ${item.dueDate}\n\n` +
      `🔗 ເຂົ້າເບິ່ງໃບແຈ້ງໜີ້ & ສັນຍາອອນໄລນ໌: https://strong-crepe-bee45f.netlify.app/invoice/${item.id}\n` +
      `🔑 ລະຫັດ PIN 4 ຕົວ: ${item.pin || '1234'}\n\n` +
      `ຂອບໃຈທີ່ໃຊ້ບໍລິການ!`
    );

    window.open(`https://wa.me/${phoneWithCountry}?text=${text}`, '_blank');
  };

  return (
    <div className="monthly-loans-container">
      {/* 1. Currency Switching Header Bar */}
      <div className="currency-bar-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="currency-pill-switcher">
            <button
              className={`currency-pill-btn ${activeCurrency === 'LAK' ? 'active-lak' : ''}`}
              onClick={() => setActiveCurrency('LAK')}
            >
              ₭ ເງິນກີບ (LAK)
            </button>
            <button
              className={`currency-pill-btn ${activeCurrency === 'RUB' ? 'active-rub' : ''}`}
              onClick={() => setActiveCurrency('RUB')}
            >
              ₽ ເງິນຣູບລ໌ (RUB)
            </button>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Calendar size={18} color="var(--text-muted)" />
            <select
              value={activeMonthKey}
              onChange={(e) => setActiveMonthKey(e.target.value)}
              style={{
                background: 'var(--surface-color)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '0.88rem',
                fontWeight: 600
              }}
            >
              <option value="2026-08">ເດືອນ 8 / 2026 (ປະຈຸບັນ)</option>
              <option value="2026-07">ເດືອນ 7 / 2026</option>
              <option value="2026-06">ເດືອນ 6 / 2026</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            className="icon-btn-xs"
            onClick={() => onCarryoverMonth(activeMonthKey, activeCurrency)}
            title="ເພີ່ມເດືອນໃໝ່ ແລະ ດຶງຍອດເຫຼືອອັດໂຕໂນມັດ"
            style={{ width: 'auto', padding: '6px 14px', background: 'rgba(99, 102, 241, 0.2)', color: '#818cf8' }}
          >
            <Sparkles size={15} /> ເພີ່ມເດືອນໃໝ່ (Auto Carryover)
          </button>
          <button
            className="icon-btn-xs"
            onClick={() => setIsTableVisible(!isTableVisible)}
            style={{ width: 'auto', padding: '6px 12px' }}
          >
            {isTableVisible ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            <span>{isTableVisible ? 'ເຊື່ອງຕາຕະລາງ' : 'ສະແດງຕາຕະລາງ'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Action Filters Bar (7 Buttons + Bulk WhatsApp) */}
      <div className="top-action-bar-grid">
        <button
          className={`action-filter-btn ${activeFilterPill === 'NEAR_DUE' ? 'active' : ''}`}
          onClick={() => setActiveFilterPill(activeFilterPill === 'NEAR_DUE' ? 'ALL' : 'NEAR_DUE')}
        >
          <Clock size={16} color="#fbbf24" />
          <span>1. ໃກ້ເຖິງກຳນົດຊຳລະ</span>
        </button>

        <button
          className={`action-filter-btn ${activeFilterPill === 'DUE_TODAY' ? 'active' : ''}`}
          onClick={() => setActiveFilterPill(activeFilterPill === 'DUE_TODAY' ? 'ALL' : 'DUE_TODAY')}
        >
          <AlertCircle size={16} color="#60a5fa" />
          <span>2. ເຖິງກຳນົດຊຳລະມື້ນີ້</span>
        </button>

        <button
          className={`action-filter-btn ${activeFilterPill === 'OVERDUE' ? 'active' : ''}`}
          onClick={() => setActiveFilterPill(activeFilterPill === 'OVERDUE' ? 'ALL' : 'OVERDUE')}
        >
          <AlertCircle size={16} color="#f87171" />
          <span>3. ເກີນກຳນົດຊຳລະ</span>
        </button>

        <button
          className={`action-filter-btn ${activeFilterPill === 'HIGH_DEBT' ? 'active' : ''}`}
          onClick={() => setActiveFilterPill(activeFilterPill === 'HIGH_DEBT' ? 'ALL' : 'HIGH_DEBT')}
        >
          <Banknote size={16} color="#c084fc" />
          <span>4. ລູກຄ້າໜີ້ຫຼາຍ</span>
        </button>

        <button
          className={`action-filter-btn ${activeFilterPill === 'VIP' ? 'active' : ''}`}
          onClick={() => setActiveFilterPill(activeFilterPill === 'VIP' ? 'ALL' : 'VIP')}
        >
          <UserCheck size={16} color="#34d399" />
          <span>5. ດູແລເປັນພິເສດ</span>
        </button>

        <button
          className="btn-primary-emerald"
          style={{ fontSize: '0.82rem', padding: '8px 12px', borderRadius: '10px' }}
          onClick={() => onAddLoan(activeCurrency)}
        >
          <Plus size={16} /> 6. ກູ້ໃໝ່ ({activeCurrency})
        </button>

        <button
          style={{
            background: 'linear-gradient(135deg, #0284c7, #2563eb)',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            cursor: 'pointer'
          }}
          onClick={onOpenWhatsform}
        >
          <Sparkles size={16} /> 7. ລູກຄ້າໃໝ່ (Whatsform)
        </button>
      </div>

      {/* 3. Search & Bulk WhatsApp Trigger Controls */}
      <div className="search-and-controls-row" style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <div className="search-bar-gold">
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="ຄົ້ນຫາລາຍຊື່ລູກຄ້າ... (Scroll Auto + ໄຮໄລ້ສີທອງ)"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Mass Bulk WhatsApp Trigger Button */}
        <button
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: 'white',
            border: 'none',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: 700,
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 15px rgba(37, 211, 102, 0.35)',
            cursor: 'pointer'
          }}
          onClick={() => setIsBulkWhatsAppOpen(true)}
        >
          <Smartphone size={18} />
          <span>📲 ບລັອດສົ່ງບິນ WhatsApp ທັງໝົດ ({getFilterNameText()}: {filteredList.length} ຄົນ)</span>
        </button>

        {/* Interactive Zoom Slider & Fit Controls */}
        <div className="zoom-controls-group" style={{ gap: '8px' }}>
          <button
            type="button"
            className={`zoom-btn ${zoomPercent === 65 ? 'active' : ''}`}
            onClick={() => setZoomPercent(65)}
            title="ປັບຂະໜາດໃຫ້ເຫັນທຸກຄໍລຳໃນໜ້າຈໍ"
          >
            👁️ ເຫັນທັງໝົດ
          </button>
          <button
            type="button"
            className={`zoom-btn ${zoomPercent === 100 ? 'active' : ''}`}
            onClick={() => setZoomPercent(100)}
            title="ຂະໜາດມາດຕະຖານ 100%"
          >
            📐 ເຫັນພໍດີ
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '4px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>🎚️ ປັບ:</span>
            <input
              type="range"
              min="50"
              max="150"
              value={zoomPercent}
              onChange={(e) => setZoomPercent(Number(e.target.value))}
              style={{ width: '90px', cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-purple)', minWidth: '38px' }}>
              {zoomPercent}%
            </span>
          </div>
        </div>
      </div>

      {/* 4. Monthly Loan Database Table */}
      {isTableVisible && (
        <div className="table-responsive-wrapper" style={{ marginTop: '20px', overflowX: 'auto' }}>
          <table
            className="customer-full-table"
            style={{
              transform: `scale(${zoomPercent / 100})`,
              transformOrigin: 'top left',
              width: `${100 / (zoomPercent / 100)}%`
            }}
          >
            <thead>
              <tr>
                <th>ສະຖານະ (Auto)</th>
                <th>ຮູບ 3x4</th>
                <th className="sticky-name-col">📌 ຊື່ ແລະ ນາມສະກຸນລູກຄ້າ</th>
                <th>ໃບແຈ້ງໜີ້ & WhatsApp</th>
                <th>ຍອດເງິນກູ້ ({activeCurrency})</th>
                <th>% ດອກເບ້ຍ</th>
                <th>ຄິດໄລ່ດອກເບ້ຍ</th>
                <th>ຍອດລວມ (ເງິນຕົ້ນ+ດອກ)</th>
                <th>ວັນທີກຳນົດຊຳລະ</th>
                <th>ຈຳນວນຊຳລະແລ້ວ</th>
                <th>ຍອດເຫຼືອຕ້ອງຊຳລະ</th>
                <th>ລະຫັດ PIN (4 ຕົວ)</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.map((item) => {
                const statusObj = calculateMonthlyLoanStatus(item, '2026-08-12');
                const isGoldHighlight = item.id === highlightedRowId;

                const principalAmount = activeCurrency === 'LAK' ? item.amountLAK : item.amountRUB;
                const interestRate = item.interestRate || 5.0;
                const interestAmount = Math.round((principalAmount * interestRate) / 100);
                const totalAmount = principalAmount + interestAmount;
                const paidAmount = item.paidAmount || 0;
                const remainingBalance = Math.max(0, totalAmount - paidAmount);

                return (
                  <tr
                    key={item.id}
                    id={`loan-row-${item.id}`}
                    className={isGoldHighlight ? 'highlight-gold-row' : ''}
                  >
                    {/* 1. Status Column */}
                    <td>
                      <span
                        className="status-badge-pill"
                        style={{
                          background: statusObj.bg,
                          color: statusObj.color,
                          border: `1px solid ${statusObj.color}44`
                        }}
                      >
                        {statusObj.label}
                      </span>
                    </td>

                    {/* 2. Customer Photo */}
                    <td>
                      <div className="customer-photo-badge">
                        <img src={item.customerPhoto} alt={item.customerName} />
                      </div>
                    </td>

                    {/* 3. Customer Name (Sticky Left) */}
                    <td className="sticky-name-col">
                      <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text-primary)', lineHeight: 1.3 }}>{item.customerName}</div>
                      <div style={{ fontSize: '0.8rem', color: '#a5b4fc', marginTop: '2px' }}>{item.customerId}</div>
                    </td>

                    {/* 4. Invoice & WhatsApp Buttons */}
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="table-link-btn"
                          onClick={() => onOpenInvoice(item, activeCurrency)}
                          title="ເບິ່ງໃບແຈ້ງໜີ້ ແລະ ສັນຍາ"
                        >
                          <FileText size={13} /> ໃບບິນ
                        </button>
                        <button
                          className="table-link-btn"
                          onClick={() => handleDirectWhatsAppSingle(item)}
                          style={{ background: 'rgba(37, 211, 102, 0.15)', color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.3)' }}
                          title="ສົ່ງໃບບິນ WhatsApp ດ່ຽວ"
                        >
                          <Send size={13} /> WA
                        </button>
                      </div>
                    </td>

                    {/* 5. Loan Amount */}
                    <td style={{ fontWeight: 700, color: 'var(--accent-gold)' }}>
                      {activeCurrency === 'LAK'
                        ? `₭ ${principalAmount.toLocaleString()}`
                        : `${principalAmount.toLocaleString()} RUB`}
                    </td>

                    {/* 6. Interest Rate % (Editable) */}
                    <td>
                      {editingInterestLoanId === item.id ? (
                        <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                          <input
                            type="number"
                            step="0.1"
                            value={tempInterestRate}
                            onChange={(e) => setTempInterestRate(e.target.value)}
                            style={{ width: '55px', padding: '2px 4px', fontSize: '0.82rem', borderRadius: '4px' }}
                          />
                          <button
                            className="icon-btn-xs"
                            onClick={() => {
                              onUpdateInterestRate(item.id, Number(tempInterestRate), activeCurrency);
                              setEditingInterestLoanId(null);
                            }}
                          >
                            <CheckCircle2 size={13} color="#10b981" />
                          </button>
                        </div>
                      ) : (
                        <div
                          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => {
                            setEditingInterestLoanId(item.id);
                            setTempInterestRate(item.interestRate);
                          }}
                          title="ກົດເພື່ອປັບເປີເຊັນດອກເບ້ຍ"
                        >
                          <span style={{ fontWeight: 600 }}>{interestRate}%</span>
                          <Edit2 size={12} color="var(--text-muted)" />
                        </div>
                      )}
                    </td>

                    {/* 7. Interest Amount */}
                    <td style={{ color: '#38bdf8' }}>
                      {activeCurrency === 'LAK'
                        ? `₭ ${interestAmount.toLocaleString()}`
                        : `${interestAmount.toLocaleString()} RUB`}
                    </td>

                    {/* 8. Total Amount (Principal + Interest) */}
                    <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      {activeCurrency === 'LAK'
                        ? `₭ ${totalAmount.toLocaleString()}`
                        : `${totalAmount.toLocaleString()} RUB`}
                    </td>

                    {/* 9. Due Date */}
                    <td style={{ fontSize: '0.85rem' }}>{item.dueDate}</td>

                    {/* 10. Paid Amount */}
                    <td>
                      <input
                        type="number"
                        value={paidAmount}
                        onChange={(e) =>
                          onUpdatePaidAmount(item.id, Number(e.target.value), activeCurrency)
                        }
                        style={{
                          width: '100px',
                          padding: '4px 8px',
                          borderRadius: '6px',
                          border: '1px solid var(--border-color)',
                          background: 'rgba(0,0,0,0.2)',
                          color: '#34d399',
                          fontWeight: 700,
                          fontSize: '0.85rem'
                        }}
                      />
                    </td>

                    {/* 11. Remaining Balance */}
                    <td
                      style={{
                        fontWeight: 800,
                        color: remainingBalance > 0 ? '#f87171' : '#10b981'
                      }}
                    >
                      {activeCurrency === 'LAK'
                        ? `₭ ${remainingBalance.toLocaleString()}`
                        : `${remainingBalance.toLocaleString()} RUB`}
                    </td>

                    {/* 12. Security PIN */}
                    <td style={{ fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--text-muted)' }}>
                      🔑 {item.pin || '1234'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Automated WhatsApp Bulk Sender Modal */}
      {isBulkWhatsAppOpen && (
        <BulkWhatsAppModal
          targetList={filteredList}
          currency={activeCurrency}
          filterName={getFilterNameText()}
          onClose={() => setIsBulkWhatsAppOpen(false)}
        />
      )}
    </div>
  );
}
