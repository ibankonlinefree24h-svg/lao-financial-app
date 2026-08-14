import React, { useState } from 'react';
import { X, Save, User, DollarSign, MapPin, GraduationCap, Phone, FileText, Smartphone, ExternalLink, Sparkles } from 'lucide-react';

export default function CustomerFormModal({ customer, onClose, onSave }) {
  const [formData, setFormData] = useState(
    customer || {
      id: `CUST-${Date.now().toString().slice(-3)}`,
      code: `L-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      invoiceLink: '',
      interestRate: 5.0,
      manualStatus: '',
      age: 25,
      occupation: 'ນັກສຶກສາ',
      currentAddress: { village: '', district: '', province: 'ນະຄອນຫຼວງວຽງຈັນ' },
      schoolOrWorkplace: '',
      schoolOrWorkplaceAddress: { village: '', district: '', province: 'ນະຄອນຫຼວງວຽງຈັນ' },
      googleMapsUrl: '',
      major: '',
      startYear: 2024,
      graduationYear: 2028,
      currentActiveLoanLAK: 0,
      currentActiveLoanRUB: 0,
      facebookBorrower: '',
      facebookGuarantor1: '',
      facebookGuarantor2: '',
      facebookGuarantor3: '',
      whatsappNumber: '+856 20 5500 1122',
      whatsappLink: '',
      driveDocumentsUrl: '',
      loanHistory: [],
      chatHistory: []
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleTestWhatsApp = () => {
    const raw = formData.whatsappLink || formData.whatsappNumber || '';
    if (!raw) {
      alert('ກະລຸນາປ້ອນເບີໂທ ຫຼື ລິ້ງ WhatsApp ກ່ອນ!');
      return;
    }

    let url = raw;
    if (!raw.startsWith('http')) {
      const cleanPhone = raw.replace(/[^0-9]/g, '');
      const phoneWithCountry = cleanPhone.startsWith('856') ? cleanPhone : `856${cleanPhone.replace(/^0/, '')}`;
      url = `https://wa.me/${phoneWithCountry}`;
    }
    window.open(url, '_blank');
  };

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel" style={{ maxWidth: '850px' }}>
        <div className="customer-modal-header">
          <h3>{customer ? 'ແກ້ໄຂຂໍ້ມູນລູກຄ້າ' : 'ເພີ່ມລູກຄ້າໃໝ່ (Customer Form)'}</h3>
          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form-body">
          <div className="form-section-title">1. ຂໍ້ມູນພື້ນຖານ</div>
          <div className="form-grid">
            <div className="form-group">
              <label>ຊື່ ແລະ ນາມສະກຸນລູກຄ້າ *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>ລະຫັດລູກຄ້າ</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>ອາຍຸ (ປີ)</label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>ອາຊີບ</label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
              />
            </div>
          </div>

          <div className="form-section-title" style={{ marginTop: '20px' }}>
            2. ເບີໂທ & ລິ້ງ WhatsApp ສຳລັບສົ່ງໃບແຈ້ງໜີ້
          </div>

          {/* WhatsApp Recommendation Banner */}
          <div
            className="glass-panel"
            style={{
              padding: '12px 16px',
              marginBottom: '16px',
              background: 'rgba(37, 211, 102, 0.12)',
              borderColor: 'rgba(37, 211, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justify: 'space-between',
              flexWrap: 'wrap',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}>
              <Smartphone size={18} color="#25D366" />
              <span>
                💡 <strong>ຄຳແນະນຳ:</strong> ກອກພຽງ <strong>"ເບີໂທ WhatsApp"</strong> (ເຊັ່ນ: <code>020 5500 1122</code>), ລະບົບຈະສ້າງລິ້ງ WhatsApp ສົ່ງໃບບິນໃຫ້ອັດໂຕໂນມັດ!
              </span>
            </div>

            <button
              type="button"
              className="icon-btn-xs"
              style={{
                width: 'auto',
                padding: '4px 12px',
                background: '#25D366',
                color: 'white',
                fontSize: '0.78rem'
              }}
              onClick={handleTestWhatsApp}
            >
              <ExternalLink size={13} /> ທົດລອງທັກ WhatsApp
            </button>
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label>ເບີໂທ WhatsApp ຜູ້ກູ້ (ແນະນຳປ້ອນເລກເບີໂທ) *</label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="+856 20 5500 1122"
              />
            </div>

            <div className="form-group">
              <label>ລິ້ງ WhatsApp ພິເສດ (ຖ້າມີ)</label>
              <input
                type="text"
                value={formData.whatsappLink || ''}
                onChange={(e) => setFormData({ ...formData, whatsappLink: e.target.value })}
                placeholder="https://wa.me/8562055001122"
              />
            </div>

            <div className="form-group">
              <label>ເປີເຊັນດອກເບ້ຍ (%)</label>
              <input
                type="number"
                step="0.1"
                value={formData.interestRate}
                onChange={(e) => setFormData({ ...formData, interestRate: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>ສະຖານະກຳນົດເອງ (Manual Override)</label>
              <select
                value={formData.manualStatus || ''}
                onChange={(e) => setFormData({ ...formData, manualStatus: e.target.value })}
              >
                <option value="">ປົກກະຕິ (ຄຳນວນອັດໂຕໂນມັດ)</option>
                <option value="ຖືກແບນ">ຖືກແບນ (Purple Tag)</option>
                <option value="ປະຈານ">ປະຈານ (Orange Tag)</option>
              </select>
            </div>

            <div className="form-group">
              <label>ຍອດກູ້ປະຈຸບັນ (ເງິນກີບ)</label>
              <input
                type="number"
                value={formData.currentActiveLoanLAK}
                onChange={(e) => setFormData({ ...formData, currentActiveLoanLAK: Number(e.target.value) })}
              />
            </div>

            <div className="form-group">
              <label>ຍອດກູ້ປະຈຸບັນ (ຣູບລ໌)</label>
              <input
                type="number"
                value={formData.currentActiveLoanRUB}
                onChange={(e) => setFormData({ ...formData, currentActiveLoanRUB: Number(e.target.value) })}
              />
            </div>

            <div className="form-group full-width">
              <label>ລິ້ງໃບແຈ້ງໜີ້ (Invoice Link)</label>
              <input
                type="text"
                value={formData.invoiceLink}
                onChange={(e) => setFormData({ ...formData, invoiceLink: e.target.value })}
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>

          <div className="form-section-title" style={{ marginTop: '20px' }}>3. ໂຊຊຽວ & Google Drive</div>
          <div className="form-grid">
            <div className="form-group">
              <label>Google Drive ໄຟລ໌ເອກະສານ</label>
              <input
                type="text"
                value={formData.driveDocumentsUrl}
                onChange={(e) => setFormData({ ...formData, driveDocumentsUrl: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Facebook ຜູ້ກູ້</label>
              <input
                type="text"
                value={formData.facebookBorrower}
                onChange={(e) => setFormData({ ...formData, facebookBorrower: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Facebook ຄ້ຳປະກັນ 1</label>
              <input
                type="text"
                value={formData.facebookGuarantor1}
                onChange={(e) => setFormData({ ...formData, facebookGuarantor1: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Facebook ຄ້ຳປະກັນ 2</label>
              <input
                type="text"
                value={formData.facebookGuarantor2}
                onChange={(e) => setFormData({ ...formData, facebookGuarantor2: e.target.value })}
              />
            </div>
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button type="button" className="icon-btn" style={{ padding: '10px 20px', width: 'auto' }} onClick={onClose}>
              ຍົກເລີກ
            </button>
            <button type="submit" className="btn-primary-emerald" style={{ padding: '10px 24px' }}>
              <Save size={18} /> ບັນທຶກຂໍ້ມູນລູກຄ້າ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
