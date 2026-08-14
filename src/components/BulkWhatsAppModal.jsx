import React, { useState, useEffect } from 'react';
import { X, Send, CheckCircle2, Clock, ShieldCheck, AlertTriangle, Pause, Play, Smartphone } from 'lucide-react';

export default function BulkWhatsAppModal({ targetList, currency, filterName, onClose }) {
  const [delaySeconds, setDelaySeconds] = useState(5); // Default 5 seconds for Anti-Ban humanized delay
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sentLogs, setSentLogs] = useState([]);
  const [countdown, setCountdown] = useState(0);

  const totalCount = targetList.length;

  useEffect(() => {
    let timer;
    if (isSending && !isPaused && currentIndex < totalCount) {
      if (countdown > 0) {
        timer = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        // Dispatch WhatsApp message for current customer
        const currentLoan = targetList[currentIndex];
        dispatchWhatsAppMessage(currentLoan);

        // Record log
        setSentLogs((prev) => [
          ...prev,
          {
            id: currentLoan.id,
            name: currentLoan.customerName,
            phone: currentLoan.phone,
            time: new Date().toLocaleTimeString(),
            status: 'SUCCESS'
          }
        ]);

        // Move to next customer or finish
        if (currentIndex + 1 < totalCount) {
          setCurrentIndex((prev) => prev + 1);
          setCountdown(delaySeconds);
        } else {
          setIsSending(false);
          alert('🎉 ສົ່ງໃບແຈ້ງໜີ້ຜ່ານ WhatsApp ທັງໝົດຄົບຕາມລາຍຊື່ຮຽບຮ້ອຍແລ້ວ!');
        }
      }
    }
    return () => clearTimeout(timer);
  }, [isSending, isPaused, countdown, currentIndex, totalCount, delaySeconds]);

  const dispatchWhatsAppMessage = (loan) => {
    const principal = currency === 'LAK' ? loan.amountLAK : loan.amountRUB;
    const interest = Math.round((principal * loan.interestRate) / 100);
    const total = principal + interest;
    const remaining = Math.max(0, total - (loan.paidAmount || 0));

    const cleanPhone = loan.phone.replace(/[^0-9]/g, '');
    const phoneWithCountry = cleanPhone.startsWith('856') ? cleanPhone : `856${cleanPhone.replace(/^0/, '')}`;

    const text = encodeURIComponent(
      `ສະບາຍດີ ທ່ານ ${loan.customerName}\n` +
      `📌 ໃບແຈ້ງໜີ້ປະຈຳເດືອນ (${currency})\n` +
      `• ຍອດເງິນກູ້: ${currency === 'LAK' ? '₭ ' + principal.toLocaleString() : principal.toLocaleString() + ' RUB'}\n` +
      `• ດອກເບ້ຍ (${loan.interestRate}%): ${currency === 'LAK' ? '₭ ' + interest.toLocaleString() : interest.toLocaleString() + ' RUB'}\n` +
      `• ຍອດລວມ: ${currency === 'LAK' ? '₭ ' + total.toLocaleString() : total.toLocaleString() + ' RUB'}\n` +
      `• ຍັງເຫຼືອຕ້ອງຊຳລະ: ${currency === 'LAK' ? '₭ ' + remaining.toLocaleString() : remaining.toLocaleString() + ' RUB'}\n` +
      `• ວັນທີກຳນົດຊຳລະ: ${loan.dueDate}\n\n` +
      `🔗 ເຂົ້າເບິ່ງໃບແຈ້ງໜີ້ & ສັນຍາອອນໄລນ໌: https://strong-crepe-bee45f.netlify.app/invoice/${loan.id}\n` +
      `🔑 ລະຫັດ PIN 4 ຕົວ: ${loan.pin || '1234'}\n\n` +
      `ຂອບໃຈທີ່ໃຊ້ບໍລິການ!`
    );

    const whatsappUrl = `https://wa.me/${phoneWithCountry}?text=${text}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleStartBulkSend = () => {
    if (totalCount === 0) {
      alert('ບໍ່ມີລາຍຊື່ໃນກຸ່ມນີ້!');
      return;
    }
    setIsSending(true);
    setIsPaused(false);
    setCountdown(1); // Start immediately for 1st item
  };

  const handleTogglePause = () => {
    setIsPaused(!isPaused);
  };

  const progressPercent = totalCount > 0 ? Math.round((sentLogs.length / totalCount) * 100) : 0;

  return (
    <div className="customer-modal-backdrop" style={{ zIndex: 90 }}>
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '680px' }}>
        {/* Header */}
        <div
          className="customer-modal-header"
          style={{
            background: 'linear-gradient(135deg, #25D366, #128C7E)',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Smartphone size={22} />
            <h3 style={{ color: 'white' }}>
              📲 ລະບົບສົ່ງໃບແຈ້ງໜີ້ WhatsApp ທັງໝົດ (Auto Bulk Sender)
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ color: 'white' }}>
            <X size={18} />
          </button>
        </div>

        <div className="form-body">
          {/* Info Banner */}
          <div
            className="glass-panel"
            style={{
              padding: '16px',
              marginBottom: '20px',
              background: 'rgba(37, 211, 102, 0.1)',
              borderColor: 'rgba(37, 211, 102, 0.3)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div>
                <span className="tag tag-emerald" style={{ fontSize: '0.8rem', marginBottom: '4px', display: 'inline-block' }}>
                  ກຸ່ມເປົ້າໝາຍ: {filterName || 'ທັງໝົດ'}
                </span>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                  ຈຳນວນລູກຄ້າທີ່ຈະສົ່ງ: <span style={{ color: '#25D366' }}>{totalCount} ລາຍຊື່</span> ({currency})
                </h4>
              </div>

              {/* Anti-Ban Safety Delay Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShieldCheck size={18} color="#25D366" />
                <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>ໄລຍະຫ່າງຄວາມປອດໄພ:</span>
                <select
                  value={delaySeconds}
                  onChange={(e) => setDelaySeconds(Number(e.target.value))}
                  disabled={isSending}
                  style={{
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '0.82rem',
                    background: 'var(--surface-color)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <option value={3}>3 ວິນາທີ (ໄວ)</option>
                  <option value={5}>5 ວິນາທີ (ແນະນຳ ປ້ອງກັນຖືກລັອກ)</option>
                  <option value={8}>8 ວິນາທີ (ປອດໄພສູງສຸດ)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Progress Bar & Status */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
              <span>ຄວາມຄືບໜ້າການສົ່ງ: <strong>{sentLogs.length} / {totalCount} ຄົນ</strong></span>
              <strong style={{ color: '#25D366' }}>{progressPercent}%</strong>
            </div>
            <div className="progress-bar-bg" style={{ height: '10px' }}>
              <div
                className="progress-bar-fill"
                style={{
                  width: `${progressPercent}%`,
                  background: 'linear-gradient(90deg, #25D366, #128C7E)'
                }}
              />
            </div>

            {isSending && (
              <div
                style={{
                  marginTop: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  background: 'rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                  <Clock size={16} className="spin-icon" color="#25D366" />
                  <span>
                    ກຳລັງສົ່ງຫາ: <strong>{targetList[currentIndex]?.customerName}</strong> ({targetList[currentIndex]?.phone})
                  </span>
                </div>
                <span className="tag tag-amber">ຖ້າອີກ {countdown} ວິນາທີ...</span>
              </div>
            )}
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
            {!isSending ? (
              <button
                className="btn-primary-emerald"
                style={{ flex: 1, padding: '12px', justifyContent: 'center', fontSize: '0.95rem' }}
                onClick={handleStartBulkSend}
              >
                <Send size={18} /> 🚀 ເລີ່ມສົ່ງບິນອັດໂຕໂນມັດທັງໝົດ ({totalCount} ຄົນ)
              </button>
            ) : (
              <button
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '12px',
                  background: isPaused ? '#10b981' : '#f59e0b',
                  color: 'white',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justify: 'center',
                  gap: '8px'
                }}
                onClick={handleTogglePause}
              >
                {isPaused ? <Play size={18} /> : <Pause size={18} />}
                {isPaused ? 'ສືບຕໍ່ການສົ່ງ (Resume)' : 'ພັກຊົ່ວຄາວ (Pause)'}
              </button>
            )}
          </div>

          {/* Dispatch Logs Table */}
          <div style={{ maxHeight: '220px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: '10px' }}>
            <table className="customer-full-table" style={{ margin: 0, fontSize: '0.82rem' }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>ຊື່ລູກຄ້າ</th>
                  <th>ເບີ WhatsApp</th>
                  <th>ເວລາສົ່ງ</th>
                  <th>ສະຖານະ</th>
                </tr>
              </thead>
              <tbody>
                {sentLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)' }}>
                      ກົດປຸ່ມ "ເລີ່ມສົ່ງບິນອັດໂຕໂນມັດ" ເພື່ອເລີ່ມການສົ່ງບິນ
                    </td>
                  </tr>
                ) : (
                  sentLogs.map((log, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td style={{ fontWeight: 600 }}>{log.name}</td>
                      <td>{log.phone}</td>
                      <td>{log.time}</td>
                      <td>
                        <span className="tag tag-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <CheckCircle2 size={12} /> ສົ່ງແລ້ວ
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
