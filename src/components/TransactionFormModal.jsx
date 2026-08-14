import React, { useState } from 'react';
import { X, Save, Upload, DollarSign, Image as ImageIcon, CreditCard, Banknote, Sparkles, CheckCircle, Scan } from 'lucide-react';

export default function TransactionFormModal({ defaultType = 'INCOME', onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: `TX-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().split('T')[0],
    type: defaultType, // 'INCOME' or 'EXPENSE'
    category: defaultType === 'INCOME' ? 'ດອກເບ້ຍສິນເຊື່ອ (Interest Profit)' : 'ຄ່າໃຊ້ຈ່າຍທົ່ວໄປ',
    customerName: 'ສົມໄຊ ພິມມະສອນ',
    currency: 'LAK', // 'LAK' or 'RUB'
    amount: 500000,
    paymentMethod: 'TRANSFER', // 'TRANSFER' or 'CASH'
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ຊຳລະດອກເບ້ຍຜ່ານ BCEL One'
  });

  const [isScanningSlip, setIsScanningSlip] = useState(false);
  const [scanSuccessMsg, setScanSuccessMsg] = useState(null);

  const categoriesIncome = [
    'ດອກເບ້ຍສິນເຊື່ອ (Interest Profit)',
    'ຮັບຊຳລະເງິນຕົ້ນກູ້',
    'ຄ່າທຳນຽມ & ເອກະສານ',
    'ລາຍຮັບອື່ນໆ'
  ];

  const categoriesExpense = [
    'ຄ່າເຊົ່າອຸປະກອນ & ລະບົບ',
    'ຄ່າການຕະຫຼາດ & ໂຄສະນາ (Ads)',
    'ຄ່າພາຫະນະ & ຕິດຕາມໜີ້',
    'ຄ່າໄຟຟ້າ & ອິນເຕີເນັດ',
    'ເງິນເດືອນ & ຄ່າຈ້າງພະນັກງານ',
    'ຄ່າໃຊ້ຈ່າຍອື່ນໆ'
  ];

  // Sample Bank Slips with simulated extracted amounts
  const sampleSlips = [
    {
      name: 'ສະລິບ BCEL One 500,000 ກີບ',
      url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
      amount: 500000,
      currency: 'LAK',
      sender: 'ສົມໄຊ ພິມມະສອນ'
    },
    {
      name: 'ສະລິບ BCEL One 1,200,000 ກີບ',
      url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&auto=format&fit=crop&q=80',
      amount: 1200000,
      currency: 'LAK',
      sender: 'ຈັນທະສອນ ວົງສາ'
    },
    {
      name: 'ສະລິບ ໂອນເງິນ 5,000 ຣູບລ໌ (RUB)',
      url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80',
      amount: 5000,
      currency: 'RUB',
      sender: 'ມະລີວອນ ສຸລິຍາ'
    }
  ];

  const handleSelectSampleSlip = (slip) => {
    setIsScanningSlip(true);
    setScanSuccessMsg(null);

    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        slipUrl: slip.url,
        amount: slip.amount,
        currency: slip.currency,
        customerName: slip.sender,
        paymentMethod: 'TRANSFER'
      }));
      setIsScanningSlip(false);
      setScanSuccessMsg(`✨ AI ອ່ານສະລິບອັດໂຕໂນມັດ: ຈຳນວນເງິນ ${slip.currency === 'LAK' ? '₭ ' + slip.amount.toLocaleString() : slip.amount.toLocaleString() + ' RUB'}`);
    }, 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '680px' }}>
        <div
          className="customer-modal-header"
          style={{
            background:
              formData.type === 'INCOME'
                ? 'linear-gradient(135deg, #10b981, #059669)'
                : 'linear-gradient(135deg, #ef4444, #dc2626)',
            color: 'white'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <DollarSign size={22} />
            <h3 style={{ color: 'white' }}>
              {formData.type === 'INCOME' ? '+ ບັນທຶກລາຍຮັບໃໝ່ (AI Slip Auto-Reader)' : '- ບັນທຶກລາຍຈ່າຍໃໝ່ (Add Expense)'}
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose} style={{ color: 'white' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {/* AI Slip Scanner Section */}
          <div className="glass-panel" style={{ padding: '16px', marginBottom: '20px', background: 'rgba(99, 102, 241, 0.12)', borderColor: 'rgba(99, 102, 241, 0.3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Scan size={18} color="var(--accent-purple)" />
              <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#c084fc' }}>
                📸 AI ອ່ານສະລິບການໂອນເງິນອັດໂຕໂນມັດ (Auto Slip OCR)
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              ເລືອກ ຫຼື ອັບໂຫຼດຮູບສະລິບ ລະບົບ AI ຈະອ່ານຈຳນວນເງິນໃນສະລິບແລ້ວໃສ່ໃນຊ່ອງຈຳນວນເງິນອັດໂຕໂນມັດ!
            </p>

            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {sampleSlips.map((s, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectSampleSlip(s)}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'var(--text-primary)',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Sparkles size={13} color="#f59e0b" />
                  {s.name}
                </button>
              ))}
            </div>

            {isScanningSlip && (
              <div style={{ marginTop: '10px', fontSize: '0.82rem', color: '#38bdf8', fontWeight: 600 }}>
                ⏳ ລະບົບ AI ກຳລັງສະແກນ ແລະ ອ່ານຕົວເລກໃນສະລິບການໂອນ...
              </div>
            )}

            {scanSuccessMsg && (
              <div style={{ marginTop: '10px', fontSize: '0.85rem', color: '#34d399', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle size={16} /> {scanSuccessMsg}
              </div>
            )}
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>ປະເພດລາຍການ *</label>
              <select
                value={formData.type}
                onChange={(e) => {
                  const newType = e.target.value;
                  setFormData({
                    ...formData,
                    type: newType,
                    category: newType === 'INCOME' ? categoriesIncome[0] : categoriesExpense[0]
                  });
                }}
              >
                <option value="INCOME">🟢 ລາຍຮັບ (Income)</option>
                <option value="EXPENSE">🔴 ລາຍຈ່າຍ (Expense)</option>
              </select>
            </div>

            <div className="form-group">
              <label>ໝວດໝູ່ລາຍການ *</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {(formData.type === 'INCOME' ? categoriesIncome : categoriesExpense).map((cat, i) => (
                  <option key={i} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>ສະກຸນເງິນ (ອ່ານຈາກສະລິບ) *</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="LAK">₭ ເງິນກີບ (LAK)</option>
                <option value="RUB">₽ ເງິນຣູບລ໌ (RUB)</option>
              </select>
            </div>

            <div className="form-group">
              <label>ຈຳນວນເງິນ (ອ່ານຈາກສະລິບອັດໂຕໂນມັດ) *</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                style={{ borderColor: scanSuccessMsg ? '#10b981' : 'var(--border-color)', fontWeight: 700 }}
              />
            </div>

            <div className="form-group">
              <label>ວັນທີ *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>ຮູບແບບການຊຳລະ *</label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              >
                <option value="TRANSFER">💳 ໂອນເງິນຜ່ານທະນາຄານ (Bank Transfer)</option>
                <option value="CASH">💵 ເງິນສົດ (Cash)</option>
              </select>
            </div>

            <div className="form-group full-width">
              <label>ຊື່ຜູ້ຈ່າຍ / ຜູ້ຮັບ / ລູກຄ້າ (ອ່ານຈາກສະລິບ)</label>
              <input
                type="text"
                placeholder="ຕົວຢ່າງ: ທ້າວ ສົມໄຊ / ບໍລິສັດ ໄອທີ"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            {formData.paymentMethod === 'TRANSFER' && (
              <div className="form-group full-width">
                <label>ຮູບພາບສະລິບການໂອນເງິນ (Slip Receipt URL)</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.slipUrl}
                    onChange={(e) => setFormData({ ...formData, slipUrl: e.target.value })}
                    placeholder="https://..."
                    style={{ flex: 1 }}
                  />
                  <button type="button" className="icon-btn-xs" style={{ width: '40px', height: '40px' }}>
                    <Upload size={18} />
                  </button>
                </div>
              </div>
            )}

            <div className="form-group full-width">
              <label>ໝາຍເຫດ / ລາຍລະອຽດເພີ່ມເຕີມ</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                placeholder="ລາຍລະອຽດຂອງລາຍການນີ້..."
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
                background:
                  formData.type === 'INCOME'
                    ? 'linear-gradient(135deg, #10b981, #059669)'
                    : 'linear-gradient(135deg, #ef4444, #dc2626)',
                color: 'white',
                padding: '10px 24px',
                borderRadius: '12px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Save size={18} /> ບັນທຶກລາຍການ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
