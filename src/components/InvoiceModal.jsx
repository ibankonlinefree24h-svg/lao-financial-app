import React, { useState } from 'react';
import {
  X,
  Printer,
  Send,
  FileText,
  Lock,
  CheckCircle,
  ExternalLink,
  Phone,
  ShieldCheck,
  Award,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { calculateMonthlyLoanStatus } from '../data/mockMonthlyLoans';

export default function InvoiceModal({ loan, currency, onClose }) {
  const [pinInput, setPinInput] = useState(loan?.pin || '1234');
  const [isPinUnlocked, setIsPinUnlocked] = useState(true);

  if (!loan) return null;

  const isLAK = currency === 'LAK';
  const statusInfo = calculateMonthlyLoanStatus(loan);
  const formattedPhone = loan.phone ? loan.phone.replace(/[^0-9]/g, '') : '';
  
  const invoiceUrl = `http://localhost:5173/invoice/${loan.id}?pin=${loan.pin}`;
  const whatsappMsg = encodeURIComponent(
    `ສະບາຍດີ ${loan.customerName}, ນີ້ແມ່ນລິ້ງໃບແຈ້ງໜີ້ປະຈຳເດືອນ ແລະ ສັນຍາກູ້ຢືມຂອງທ່ານ: ${invoiceUrl} (ລະຫັດ PIN 4 ຕົວເຂົ້າເບິ່ງ: ${loan.pin})`
  );
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${whatsappMsg}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '850px', height: '92vh' }}>
        {/* Header */}
        <div className="customer-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <FileText size={22} color="var(--accent-cyan)" />
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>ໃບແຈ້ງໜີ້ອອນໄລນ໌ & ສັນຍາກູ້ຢືມ</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                ລູກຄ້າ: {loan.customerName} | ສະກຸນເງິນ: {isLAK ? '₭ ເງິນກີບ' : '₽ ເງິນຣູບລ໌'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#25D366',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none'
              }}
            >
              <Send size={16} /> ສົ່ງ WhatsApp ທັນທີ
            </a>

            <button className="icon-btn" onClick={handlePrint} title="ພິມໃບບິນ">
              <Printer size={18} />
            </button>
            <button className="icon-btn" onClick={onClose}>
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PIN Security Portal Preview Notice */}
        <div className="pin-security-bar">
          <Lock size={16} color="#fbbf24" />
          <span>
            ລະບົບຄວາມປອດໄພ: ລູກຄ້າເຂົ້າເບິ່ງຜ່ານລະຫັດ PIN 4 ຕົວ: <strong>[{loan.pin}]</strong>
          </span>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="external-link-btn" style={{ marginLeft: 'auto', fontSize: '0.8rem' }}>
            <ExternalLink size={13} /> ທົດລອງລິ້ງລູກຄ້າ
          </a>
        </div>

        {/* Document Content Wrapper */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px', background: '#0f172a' }}>
          {/* 1. Invoice Document Box */}
          <div className="invoice-paper">
            <div className="invoice-paper-header">
              <div>
                <h2>INVOICE / ໃບແຈ້ງໜີ້ປະຈຳເດືອນ</h2>
                <p>ລະບົບຈັດການການເງິນ (Financial System)</p>
              </div>
              <div style={{ textAlignment: 'right' }}>
                <span className={`status-badge-pill ${statusInfo.color}`} style={{ fontSize: '0.9rem', padding: '6px 14px' }}>
                  {statusInfo.label}
                </span>
                <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '6px' }}>ວັນທີອອກບິນ: {loan.loanDate}</p>
              </div>
            </div>

            <div className="invoice-customer-info">
              <img src={loan.customerPhoto} alt={loan.customerName} className="profile-avatar-lg" />
              <div>
                <h4>{loan.customerName}</h4>
                <p>ເບີໂທ WhatsApp: {loan.phone}</p>
                <p>ກຳນົດຊຳລະ: <strong style={{ color: '#ef4444' }}>{loan.dueDate}</strong></p>
              </div>
            </div>

            {/* Loan Transaction Breakdown Table */}
            <table className="invoice-breakdown-table">
              <thead>
                <tr>
                  <th>ວັນທີກູ້</th>
                  <th>ຈຳນວນກູ້</th>
                  <th>ດອກເບ້ຍ ({loan.interestRate}%)</th>
                  <th>ລວມທັງໝົດ</th>
                  <th>ຊຳລະແລ້ວ</th>
                  <th>ຍັງເຫຼືອ</th>
                  <th>ວັນທີກຳນົດ</th>
                </tr>
              </thead>
              <tbody>
                {(loan.loanHistoryLines || [{ dateTaken: loan.loanDate, amount: statusInfo.principal, dueDate: loan.dueDate }]).map((line, idx) => (
                  <tr key={idx}>
                    <td>{line.dateTaken}</td>
                    <td style={{ fontWeight: 700 }}>
                      {isLAK ? `₭ ${line.amount.toLocaleString()}` : `${line.amount.toLocaleString()} RUB`}
                    </td>
                    <td>
                      {isLAK
                        ? `₭ ${Math.round((line.amount * loan.interestRate) / 100).toLocaleString()}`
                        : `${Math.round((line.amount * loan.interestRate) / 100).toLocaleString()} RUB`}
                    </td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>
                      {isLAK
                        ? `₭ ${(line.amount + Math.round((line.amount * loan.interestRate) / 100)).toLocaleString()}`
                        : `${(line.amount + Math.round((line.amount * loan.interestRate) / 100)).toLocaleString()} RUB`}
                    </td>
                    <td style={{ color: '#34d399' }}>
                      {isLAK ? `₭ ${(loan.paidAmount || 0).toLocaleString()}` : `${(loan.paidAmount || 0).toLocaleString()} RUB`}
                    </td>
                    <td style={{ fontWeight: 700, color: '#f87171' }}>
                      {isLAK ? `₭ ${statusInfo.remaining.toLocaleString()}` : `${statusInfo.remaining.toLocaleString()} RUB`}
                    </td>
                    <td>{line.dueDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="invoice-summary-total">
              <div>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>ໝາຍເຫດ:</p>
                <p style={{ fontSize: '0.85rem', color: '#334155' }}>ກະລຸນາຊຳລະເງິນຕາມກຳນົດເພື່ອຫຼີກເວັ້ນດອກເບ້ຍເພີ່ມ.</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.9rem', color: '#64748b' }}>ຍອດສຸດທິທີ່ຕ້ອງຊຳລະ (Net Due):</p>
                <h3 style={{ fontSize: '1.6rem', color: '#1e293b' }}>
                  {isLAK ? `₭ ${statusInfo.remaining.toLocaleString()}` : `${statusInfo.remaining.toLocaleString()} RUB`}
                </h3>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '24px 0 12px 0', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            <ChevronDown size={20} style={{ display: 'block', margin: '0 auto' }} />
            <span>ເລື່ອນລົງດ້ານລຸ່ມ ເພື່ອເບິ່ງສັນຍາກູ້ຢືມເງິນ</span>
          </div>

          {/* 2. Scrollable Loan Contract Section */}
          <div className="a4-page" style={{ fontFamily: "'Noto Serif Lao', 'Phetsarath OT', serif", margin: '0 auto' }}>
            <div className="doc-header">
              <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Logo" className="doc-logo" />
              <div className="doc-header-text">
                <h1 style={{ fontSize: '14pt' }}>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h1>
                <h2 style={{ fontSize: '11pt' }}>ສັນຕິພາບ ອິດສະຫຼະພາບ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</h2>
                <div className="doc-header-divider" />
                <h3 style={{ fontSize: '13pt', marginTop: '15px' }}>ສັນຍາກູ້ຢືມເງິນ (Loan Contract)</h3>
              </div>
              <div className="customer-3x4-box">
                <img src={loan.customerPhoto} alt={loan.customerName} className="photo-3x4" />
                <span>ຮູບ 3x4</span>
              </div>
            </div>

            <div className="doc-content">
              <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8', fontSize: '12pt' }}>
                ສັນຍາສະບັບນີ້ເຮັດຂຶ້ນລະຫວ່າງ ລະບົບການເງິນ ແລະ ຜູ້ກູ້: {loan.customerName}.
                {'\n'}ຈຳນວນເງິນກູ້: {isLAK ? `₭ ${statusInfo.principal.toLocaleString()}` : `${statusInfo.principal.toLocaleString()} RUB`}.
                {'\n'}ອັດຕາດອກເບ້ຍ: {loan.interestRate}% ຕໍ່ເດືອນ.
                {'\n'}ວັນທີກູ້: {loan.loanDate} | ກຳນົດຊຳລະ: {loan.dueDate}.
                {'\n'}ຜູ້ກູ້ໄດ້ອ່ານ ແລະ ຍອມຮັບເງື່ອນໄຂທັງໝົດໃນສັນຍາສະບັບນີ້ຢ່າງສົມບູນ.
              </p>
            </div>

            <div className="doc-signatures">
              <div className="sig-box">
                <p><strong>ຝ່າຍຜູ້ໃຫ້ກູ້</strong></p>
                <div className="sig-space" />
                <p>(ລາຍເຊັນ & ຊື່ແຈ້ງ)</p>
              </div>

              <div className="sig-box stamp-container">
                <p><strong>ຝ່າຍຜູ້ກູ້</strong></p>
                <div className="sig-space">
                  <img src="https://cdn-icons-png.flaticon.com/512/9638/9638706.png" alt="Stamp" className="png-stamp" />
                </div>
                <p><strong>{loan.customerName}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
