import React, { useState } from 'react';
import { X, Send, Upload, CheckCircle, FileText, Lock, Globe, ExternalLink } from 'lucide-react';

export default function WhatsformModal({ onClose, onSubmitForm }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    passportUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    currency: 'LAK',
    amount: 3000000,
    loanDate: '2026-08-12',
    dueDate: '2026-09-12'
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onSubmitForm(formData);
    }, 1500);
  };

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '650px' }}>
        <div className="customer-modal-header" style={{ background: 'linear-gradient(135deg, #4f46e5, #06b6d4)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
            <Globe size={22} />
            <div>
              <h3 style={{ color: 'white' }}>ແບບຟອມກອກຂໍ້ມູນລູກຄ້າໃໝ່ (Online Application Form)</h3>
              <span style={{ fontSize: '0.8rem', opacity: 0.9 }}>
                https://whatsform.com/fleysr Clone | ຂໍ້ມູນຈະລິ້ງເຂົ້າສູ່ຖານຂໍ້ມູນ & ສັນຍາອັດໂຕໂນມັດ
              </span>
            </div>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ color: 'white' }}>
            <X size={18} />
          </button>
        </div>

        {submitted ? (
          <div style={{ padding: '60px 30px', textAlign: 'center' }}>
            <CheckCircle size={56} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700 }}>ກອກຂໍ້ມູນກູ້ຢືມສຳເລັດແລ້ວ!</h3>
            <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
              ລະບົບກຳລັງສ້າງໃບແຈ້ງໜີ້ ແລະ ສັນຍາກູ້ຢືມອັດໂຕໂນມັດ...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="form-body">
            <div className="form-section-title">1. ຂໍ້ມູນຜູ້ກູ້ & ເອກະສານ</div>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>ຊື່ ແລະ ນາມສະກຸນ *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="ຕົວຢ່າງ: ນາງ ດາວວີ ສຸລິຍະວົງ"
                />
              </div>

              <div className="form-group">
                <label>ເບີໂທ WhatsApp *</label>
                <input
                  type="text"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+856 20 5500 1122"
                />
              </div>

              <div className="form-group">
                <label>ສະກຸນເງິນທີ່ຕ້ອງການກູ້ *</label>
                <select
                  value={formData.currency}
                  onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                >
                  <option value="LAK">₭ ເງິນກີບ (LAK)</option>
                  <option value="RUB">₽ ເງິນຣູບລ໌ (RUB)</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>ອັບໂຫຼດ ຮູບພາບບັດປະຈຳຕົວ / ພາດສະປອດ (Mockup Upload)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.passportUrl}
                    onChange={(e) => setFormData({ ...formData, passportUrl: e.target.value })}
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="icon-btn-xs" style={{ width: '40px', height: '40px' }}>
                    <Upload size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="form-section-title" style={{ marginTop: '20px' }}>2. ຂໍ້ມູນການກູ້ຢືມ</div>
            <div className="form-grid">
              <div className="form-group">
                <label>ຈຳນວນເງິນກູ້ *</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>ວັນທີກູ້ *</label>
                <input
                  type="date"
                  required
                  value={formData.loanDate}
                  onChange={(e) => setFormData({ ...formData, loanDate: e.target.value })}
                />
              </div>

              <div className="form-group full-width">
                <label>ວັນທີກຳນົດຊຳລະ *</label>
                <input
                  type="date"
                  required
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                />
              </div>
            </div>

            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button type="button" className="icon-btn" style={{ padding: '10px 20px', width: 'auto' }} onClick={onClose}>
                ຍົກເລີກ
              </button>
              <button
                type="submit"
                style={{
                  background: 'linear-gradient(135deg, #4f46e5, #06b6d4)',
                  color: 'white',
                  padding: '10px 24px',
                  borderRadius: '12px',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Send size={18} /> ສົ່ງຂໍ້ມູນ & ສ້າງສັນຍາ
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
