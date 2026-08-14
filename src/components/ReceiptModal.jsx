import React from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck } from 'lucide-react';

export default function ReceiptModal({ transaction, exchangeRate, onClose }) {
  if (!transaction) return null;

  const isIncome = transaction.type === 'INCOME';
  const receiptNo = `VOUCHER-${transaction.id}`;

  return (
    <div className="customer-modal-backdrop" style={{ zIndex: 100 }}>
      <div
        className="glass-panel"
        style={{
          maxWidth: '680px',
          width: '95%',
          padding: '30px',
          background: '#ffffff',
          color: '#1e293b',
          borderRadius: '16px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          fontFamily: "'Noto Sans Lao', sans-serif"
        }}
      >
        {/* Top Actions */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 700, fontSize: '1rem', color: isIncome ? '#059669' : '#dc2626' }}>
              {isIncome ? '🟢 ໃບສຳຄັນຮັບເງິນ (Receipt Voucher)' : '🔴 ໃບສຳຄັນຈ່າຍເງິນ (Payment Voucher)'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => window.print()}
              style={{
                background: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: 'pointer'
              }}
            >
              <Printer size={15} /> ພິມໃບສຳຄັນ (Print)
            </button>
            <button
              onClick={onClose}
              style={{
                background: '#e2e8f0',
                color: '#475569',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '8px',
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              <X size={16} /> ປິດ
            </button>
          </div>
        </div>

        {/* Printable Receipt Canvas */}
        <div style={{ border: '2px solid #0f172a', padding: '24px', borderRadius: '12px', background: '#fff' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#475569' }}>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h4>
            <h4 style={{ margin: '2px 0 12px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>ສັນຕິພາບ ເອກະລາດ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</h4>
            <div style={{ height: '2px', background: '#0f172a', width: '120px', margin: '0 auto 16px' }} />
            
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: isIncome ? '#047857' : '#b91c1c', letterSpacing: '1px' }}>
              {isIncome ? 'ໃບສຳຄັນຮັບເງິນ (RECEIPT VOUCHER)' : 'ໃບສຳຄັນຈ່າຍເງິນ (PAYMENT VOUCHER)'}
            </h2>
            <p style={{ fontSize: '0.82rem', color: '#64748b', margin: '4px 0 0' }}>ລະຫັດເອກະສານ: {receiptNo} | ວັນທີ: {transaction.date}</p>
          </div>

          {/* Details Table */}
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.9rem' }}>
            <tbody>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', width: '30%', fontWeight: 700, background: '#f8fafc' }}>
                  {isIncome ? 'ໄດ້ຮັບເງິນຈາກ (Received From):' : 'ຈ່າຍເງິນໃຫ້ (Paid To):'}
                </td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 600 }}>
                  {transaction.customerName || 'ລູກຄ້າ / ບໍລິສັດ'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700, background: '#f8fafc' }}>ໝວດໝູ່ (Category):</td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{transaction.category}</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700, background: '#f8fafc' }}>ຮູບແບບການຊຳລະ:</td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>
                  {transaction.paymentMethod === 'TRANSFER' ? '💳 ໂອນຜ່ານທະນາຄານ (Bank Transfer)' : '💵 ເງິນສົດ (Cash)'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700, background: '#f8fafc' }}>ຈຳນວນເງິນ (Amount):</td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontSize: '1.2rem', fontWeight: 800, color: isIncome ? '#047857' : '#b91c1c' }}>
                  {transaction.currency === 'LAK' ? `₭ ${transaction.amount.toLocaleString()}` : `${transaction.amount.toLocaleString()} ${transaction.currency}`}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1', fontWeight: 700, background: '#f8fafc' }}>ເນື້ອໃນ / ໝາຍເຫດ:</td>
                <td style={{ padding: '8px', border: '1px solid #cbd5e1' }}>{transaction.note || '-'}</td>
              </tr>
            </tbody>
          </table>

          {/* Signatures */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', textAlign: 'center', marginTop: '30px', fontSize: '0.82rem' }}>
            <div>
              <p style={{ fontWeight: 700, margin: 0 }}>ຜູ້ອະນຸມັດ (Approver)</p>
              <div style={{ height: '50px' }} />
              <p style={{ color: '#94a3b8', margin: 0 }}>( ເຊັນ & ຊື່ແທ້ )</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: 0 }}>{isIncome ? 'ຜູ້ຮັບເງິນ (Cashier)' : 'ຜູ້ຈ່າຍເງິນ (Payer)'}</p>
              <div style={{ height: '50px' }} />
              <p style={{ color: '#94a3b8', margin: 0 }}>( ເຊັນ & ຊື່ແທ້ )</p>
            </div>
            <div>
              <p style={{ fontWeight: 700, margin: 0 }}>{isIncome ? 'ຜູ້ຈ່າຍເງິນ (Payer)' : 'ຜູ້ຮັບເງິນ (Receiver)'}</p>
              <div style={{ height: '50px' }} />
              <p style={{ color: '#94a3b8', margin: 0 }}>( ເຊັນ & ຊື່ແທ້ )</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
