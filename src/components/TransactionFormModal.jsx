import React, { useState } from 'react';
import { X, Save, Upload, DollarSign, Image as ImageIcon, CreditCard, Banknote, Sparkles, CheckCircle, Scan, ArrowRightLeft, Tag } from 'lucide-react';
import { initialWallets, expenseCategories, incomeCategories } from '../data/mockIncomeExpenses';

export default function TransactionFormModal({ defaultType = 'INCOME', onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: `TX-${Date.now().toString().slice(-4)}`,
    date: new Date().toISOString().replace('T', ' ').slice(0, 16),
    type: defaultType, // 'INCOME', 'EXPENSE', 'TRANSFER'
    category: defaultType === 'INCOME' ? '💵 ເງິນເດືອນ (Salary)' : defaultType === 'EXPENSE' ? '🍜 ອາຫານ & ເຄື່ອງດື່ມ' : '🔄 ໂອນຍ້າຍລະຫວ່າງບັນຊີ',
    walletId: 'W-BCEL',
    walletName: 'BCEL One (ທະນາຄານການຄ້າ)',
    targetWalletId: 'W-CASH',
    targetWalletName: 'ເງິນສົດ (Cash Wallet)',
    customerName: 'ສົມໄຊ ພິມມະສອນ',
    currency: 'LAK', // 'LAK', 'THB', 'USD', 'CNY'
    amount: 500000,
    paymentMethod: 'TRANSFER',
    tagsStr: '#ທຸລະກິດ, #ອຸປະກອນ',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ບັນທຶກຊ່ວຍຈຳທຸລະກຳ'
  });

  const [isScanningSlip, setIsScanningSlip] = useState(false);
  const [scanSuccessMsg, setScanSuccessMsg] = useState(null);

  const sampleSlips = [
    { name: 'ສະລິບ BCEL One 500,000 ກີບ', url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80', amount: 500000, currency: 'LAK', sender: 'ສົມໄຊ ພິມມະສອນ' },
    { name: 'ສະລິບ ໂອນ 2,500 ບາດ (THB)', url: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&auto=format&fit=crop&q=80', amount: 2500, currency: 'THB', sender: 'Facebook Ads' },
    { name: 'ສະລິບ ໂອນ 1,500 ໂດລາ (USD)', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&auto=format&fit=crop&q=80', amount: 1500, currency: 'USD', sender: 'ລູກຄ້າ ໂດລາ' }
  ];

  const handleSimulateOCR = (slip) => {
    setIsScanningSlip(true);
    setScanSuccessMsg(null);

    setTimeout(() => {
      setFormData((prev) => ({
        ...prev,
        amount: slip.amount,
        currency: slip.currency,
        customerName: slip.sender,
        slipUrl: slip.url
      }));
      setIsScanningSlip(false);
      setScanSuccessMsg(`✨ AI ອ່ານສະລິບເຫັນ: ຈຳນວນ ${slip.amount.toLocaleString()} ${slip.currency} | ຜູ້ໂອນ: ${slip.sender}`);
    }, 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const tags = formData.tagsStr
      ? formData.tagsStr.split(',').map((t) => t.trim()).filter((t) => t.length > 0)
      : [];

    const selectedWalletObj = initialWallets.find((w) => w.id === formData.walletId);
    const targetWalletObj = initialWallets.find((w) => w.id === formData.targetWalletId);

    onSave({
      ...formData,
      walletName: selectedWalletObj ? selectedWalletObj.name : formData.walletName,
      targetWalletName: targetWalletObj ? targetWalletObj.name : formData.targetWalletName,
      tags
    });
  };

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '780px' }}>
        <div className="customer-modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="logo-badge" style={{ background: formData.type === 'INCOME' ? '#10b981' : formData.type === 'EXPENSE' ? '#ef4444' : '#6366f1' }}>
              {formData.type === 'INCOME' ? <DollarSign size={22} /> : formData.type === 'EXPENSE' ? <CreditCard size={22} /> : <ArrowRightLeft size={22} />}
            </div>
            <h3>
              {formData.type === 'INCOME' ? '🟢 ບັນທຶກລາຍຮັບໃໝ່ (Income)' : formData.type === 'EXPENSE' ? '🔴 ບັນທຶກລາຍຈ່າຍໃໝ່ (Expense)' : '🔄 ໂອນຍ້າຍລະຫວ່າງບັນຊີ (Account Transfer)'}
            </h3>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          {/* Mode Selector */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <button
              type="button"
              className={`filter-pill-btn ${formData.type === 'INCOME' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'INCOME', category: '💵 ເງິນເດືອນ (Salary)' })}
              style={{ flex: 1, padding: '10px', background: formData.type === 'INCOME' ? '#10b981' : '' }}
            >
              🟢 1. ລາຍຮັບ (Income)
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${formData.type === 'EXPENSE' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'EXPENSE', category: '🍜 ອາຫານ & ເຄື່ອງດື່ມ' })}
              style={{ flex: 1, padding: '10px', background: formData.type === 'EXPENSE' ? '#ef4444' : '' }}
            >
              🔴 2. ລາຍຈ່າຍ (Expense)
            </button>
            <button
              type="button"
              className={`filter-pill-btn ${formData.type === 'TRANSFER' ? 'active' : ''}`}
              onClick={() => setFormData({ ...formData, type: 'TRANSFER', category: '🔄 ໂອນຍ້າຍລະຫວ່າງບັນຊີ' })}
              style={{ flex: 1, padding: '10px', background: formData.type === 'TRANSFER' ? '#6366f1' : '' }}
            >
              🔄 3. ໂອນຍ້າຍບັນຊີ
            </button>
          </div>

          {/* AI Slip Scanner Section */}
          <div className="glass-panel" style={{ padding: '14px', marginBottom: '20px', background: 'rgba(99,102,241,0.1)', borderColor: 'rgba(99,102,241,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
                <Sparkles size={18} color="#a855f7" />
                <span>🤖 <strong>AI Slip Auto-Reader:</strong> ອ່ານຍອດເງິນ, ສະກຸນເງິນ, ແລະ ຜູ້ໂອນອັດໂຕໂນມັດ!</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              {sampleSlips.map((slip, i) => (
                <button
                  type="button"
                  key={i}
                  className="icon-btn-xs"
                  style={{ width: 'auto', padding: '6px 12px', fontSize: '0.78rem', background: 'rgba(255,255,255,0.06)' }}
                  onClick={() => handleSimulateOCR(slip)}
                >
                  <Scan size={14} color="#34d399" /> {slip.name}
                </button>
              ))}
            </div>

            {isScanningSlip && (
              <div style={{ marginTop: '10px', color: '#c084fc', fontSize: '0.82rem', fontWeight: 600 }}>
                ⏳ ລະບົບ AI ກຳລັງສະແກນອ່ານຂໍ້ມູນໃນສະລິບ...
              </div>
            )}
            {scanSuccessMsg && (
              <div style={{ marginTop: '10px', color: '#34d399', fontSize: '0.82rem', fontWeight: 700 }}>
                {scanSuccessMsg}
              </div>
            )}
          </div>

          <div className="form-grid">
            {/* Amount & Currency */}
            <div className="form-group">
              <label>ຈຳນວນເງິນ *</label>
              <input
                type="number"
                required
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>ເລືອກສະກຸນເງິນ (4 Currencies) *</label>
              <select
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="LAK">₭ LAK (ເງິນກີບ)</option>
                <option value="THB">฿ THB (ເງິນບາດ)</option>
                <option value="USD">$ USD (ເງິນໂດລາ)</option>
                <option value="CNY">¥ CNY (ເງິນຢວນ)</option>
              </select>
            </div>

            {/* Source Account/Wallet */}
            <div className="form-group">
              <label>{formData.type === 'TRANSFER' ? 'ບັນຊີຕົ້ນທາງ (From Account) *' : 'ເລືອກບັນຊີ/ກະເປົາເງິນ *'}</label>
              <select
                value={formData.walletId}
                onChange={(e) => setFormData({ ...formData, walletId: e.target.value })}
              >
                {initialWallets.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.icon} {w.name} (₭ {w.balanceLAK.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            {/* Target Account (Only for TRANSFER mode) */}
            {formData.type === 'TRANSFER' && (
              <div className="form-group">
                <label>ບັນຊີປາຍທາງ (To Account) *</label>
                <select
                  value={formData.targetWalletId}
                  onChange={(e) => setFormData({ ...formData, targetWalletId: e.target.value })}
                >
                  {initialWallets.map((w) => (
                    <option key={w.id} value={w.id}>
                      {w.icon} {w.name} (₭ {w.balanceLAK.toLocaleString()})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Category */}
            {formData.type !== 'TRANSFER' && (
              <div className="form-group">
                <label>ເລືອກໝວດໝູ່ (Category) *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  {formData.type === 'INCOME'
                    ? incomeCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))
                    : expenseCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                </select>
              </div>
            )}

            {/* Customer / Party Name */}
            <div className="form-group">
              <label>ຊື່ຜູ້ຈ່າຍ / ຜູ້ຮັບ / ລູກຄ້າ</label>
              <input
                type="text"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            {/* Date & Time */}
            <div className="form-group">
              <label>ວັນທີ ແລະ ເວລາ *</label>
              <input
                type="text"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>

            {/* Tags (#ທ່ຽວວັງວຽງ, #ໂຄງການA) */}
            <div className="form-group full-width">
              <label>🏷️ ແທັກແຍກໂຄງການ / ກິດຈະກຳ (Tags: ໃສ່ເຄື່ອງໝາຍຈຸດ , ຂັ້ນ)</label>
              <input
                type="text"
                value={formData.tagsStr}
                onChange={(e) => setFormData({ ...formData, tagsStr: e.target.value })}
                placeholder="#ທ່ຽວວັງວຽງ, #ໂຄງການA, #ຊື້ອຸປະກອນ"
              />
            </div>

            {/* Note */}
            <div className="form-group full-width">
              <label>ບັນທຶກຊ່ວຍຈຳ (Note)</label>
              <input
                type="text"
                value={formData.note}
                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              />
            </div>

            {/* Slip URL */}
            <div className="form-group full-width">
              <label>🖼️ ລິ້ງຮູບໃບບິນ/ສະລິບ (Slip/Receipt Image URL)</label>
              <input
                type="text"
                value={formData.slipUrl}
                onChange={(e) => setFormData({ ...formData, slipUrl: e.target.value })}
                placeholder="https://..."
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" className="icon-btn" style={{ padding: '10px 20px', width: 'auto' }} onClick={onClose}>
              ຍົກເລີກ
            </button>
            <button type="submit" className="btn-primary-emerald" style={{ padding: '10px 24px' }}>
              <Save size={18} /> ບັນທຶກທຸລະກຳ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
