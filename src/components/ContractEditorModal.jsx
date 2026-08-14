import React, { useState } from 'react';
import {
  X,
  Printer,
  Image as ImageIcon,
  Sliders,
  Type,
  FileText,
  Stamp,
  CheckCircle,
  Download,
  Eye,
  Edit3
} from 'lucide-react';

export default function ContractEditorModal({ customer, onClose, onSaveContract }) {
  const defaultContract = customer?.contractData || {
    title: 'ສັນຍາກູ້ຢືມເງິນປະຈຳເດືອນ',
    fontFamily: 'Phetsarath OT',
    fontSize: 12,
    watermarkOpacity: 0.15,
    showStamp: true,
    showLogo: true,
    showPhoto: true,
    logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
    photoUrl: customer?.photo,
    content: `ສັນຍາສະບັບນີ້ເຮັດຂຶ້ນຢູ່ ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ.
ລະຫວ່າງ ຝ່າຍຜູ້ໃຫ້ກູ້ (ລະບົບການເງິນ) ແລະ ຝ່າຍຜູ້ກູ້: ${customer?.name || ''}, ລະຫັດ ${customer?.code || ''}.

1. ຈຳນວນເງິນກູ້: ${customer?.currentActiveLoanLAK?.toLocaleString() || 0} ກີບ ແລະ ${customer?.currentActiveLoanRUB?.toLocaleString() || 0} ຣູບລ໌.
2. ອັດຕາດອກເບ້ຍ: ${customer?.interestRate || 5.0}% ຕໍ່ເດືອນ.
3. ກຳນົດເວລາຊຳລະ: ທຸກໆວັນທີ 30 ຂອງເດືອນ.
4. ຜູ້ຄ້ຳປະກັນ: ໄດ້ຮັບການຢືນຢັນເອກະສານ ແລະ ໂຊຊຽວມີເດຍຄົບຖ້ວນ.

ຜູ້ກູ້ໄດ້ອ່ານ ແລະ ຍອມຮັບເງື່ອນໄຂທັງໝົດໃນສັນຍາສະບັບນີ້ຢ່າງສົມບູນ.`
  };

  const [fontFamily, setFontFamily] = useState(defaultContract.fontFamily || 'Phetsarath OT');
  const [fontSize, setFontSize] = useState(defaultContract.fontSize || 12);
  const [watermarkOpacity, setWatermarkOpacity] = useState(defaultContract.watermarkOpacity || 0.15);
  const [showStamp, setShowStamp] = useState(defaultContract.showStamp ?? true);
  const [showLogo, setShowLogo] = useState(defaultContract.showLogo ?? true);
  const [showPhoto, setShowPhoto] = useState(defaultContract.showPhoto ?? true);
  const [content, setContent] = useState(defaultContract.content);
  const [isEditing, setIsEditing] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="contract-modal-backdrop">
      <div className="contract-modal-container">
        {/* Modal Header */}
        <div className="contract-modal-header">
          <div className="modal-title-group">
            <FileText size={22} color="var(--accent-purple)" />
            <div>
              <h3>ສັນຍາກູ້ຢືມເງິນ Word Document</h3>
              <span>ລູກຄ້າ: {customer?.name} ({customer?.code})</span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              className="icon-btn"
              onClick={() => setIsEditing(!isEditing)}
              title={isEditing ? 'ສະແດງຕົວຢ່າງ (Preview)' : 'ແກ້ໄຂຂໍ້ຄວາມ (Edit)'}
              style={isEditing ? { background: 'var(--accent-indigo)', color: 'white' } : {}}
            >
              {isEditing ? <Eye size={18} /> : <Edit3 size={18} />}
            </button>
            <button className="icon-btn" onClick={handlePrint} title="ພິມ/ບັນທຶກ PDF">
              <Printer size={18} />
            </button>
            <button className="icon-btn" onClick={onClose} title="ອັດ">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Word Toolbar */}
        <div className="word-toolbar">
          {/* Font Picker */}
          <div className="toolbar-item">
            <Type size={16} color="var(--text-muted)" />
            <select value={fontFamily} onChange={(e) => setFontFamily(e.target.value)}>
              <option value="Phetsarath OT">Phetsarath OT (ເຟັດສະລາດ)</option>
              <option value="Noto Serif Lao">Noto Serif Lao (ປົກກະຕິ)</option>
              <option value="Noto Sans Lao">Noto Sans Lao (ສາມັນ)</option>
            </select>
          </div>

          {/* Font Size Adjuster */}
          <div className="toolbar-item">
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>ຂະໜາດ:</span>
            <input
              type="number"
              min="8"
              max="36"
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              style={{ width: '55px', padding: '4px 6px', borderRadius: '6px' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>pt</span>
          </div>

          {/* Watermark Opacity Slider */}
          <div className="toolbar-item">
            <ImageIcon size={16} color="var(--text-muted)" />
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ໂລໂກ້ພື້ນຫຼັງ (ຈາງ):</span>
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={watermarkOpacity}
              onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
              style={{ width: '90px' }}
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{Math.round(watermarkOpacity * 100)}%</span>
          </div>

          {/* Toggles */}
          <div className="toolbar-item" style={{ gap: '12px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showStamp} onChange={(e) => setShowStamp(e.target.checked)} />
              <Stamp size={15} /> ຕາປະທັບ PNG
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={showPhoto} onChange={(e) => setShowPhoto(e.target.checked)} />
              ຮູບ 3x4
            </label>
          </div>
        </div>

        {/* Word Document A4 Canvas Area */}
        <div className="word-canvas-wrapper">
          <div
            className="a4-page"
            style={{
              fontFamily: fontFamily === 'Phetsarath OT' ? "'Noto Serif Lao', 'Phetsarath OT', serif" : `'${fontFamily}', serif`,
              fontSize: `${fontSize}pt`
            }}
          >
            {/* Background Watermark Image */}
            {watermarkOpacity > 0 && (
              <div
                className="watermark-overlay"
                style={{
                  backgroundImage: `url(${defaultContract.logoUrl})`,
                  opacity: watermarkOpacity
                }}
              />
            )}

            {/* Document Header Bar */}
            <div className="doc-header">
              {showLogo && (
                <img src={defaultContract.logoUrl} alt="Logo" className="doc-logo" />
              )}
              <div className="doc-header-text">
                <h1 style={{ fontSize: `${fontSize * 1.5}pt` }}>ສາທາລະນະລັດ ປະຊາທິປະໄຕ ປະຊາຊົນລາວ</h1>
                <h2 style={{ fontSize: `${fontSize * 1.2}pt` }}>ສັນຕິພາບ ອິດສະຫຼະພາບ ປະຊາທິປະໄຕ ເອກະພາບ ວັດທະນາຖາວອນ</h2>
                <div className="doc-header-divider" />
                <h3 style={{ fontSize: `${fontSize * 1.3}pt`, marginTop: '15px' }}>{defaultContract.title}</h3>
              </div>

              {showPhoto && (
                <div className="customer-3x4-box">
                  <img src={customer?.photo} alt={customer?.name} className="photo-3x4" />
                  <span>ຮູບ 3x4</span>
                </div>
              )}
            </div>

            {/* Document Body Text */}
            <div className="doc-content">
              {isEditing ? (
                <textarea
                  className="doc-textarea"
                  style={{
                    fontFamily: 'inherit',
                    fontSize: `${fontSize}pt`
                  }}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={14}
                />
              ) : (
                <div className="doc-text-preview" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.8' }}>
                  {content}
                </div>
              )}
            </div>

            {/* Document Signatures & PNG Stamp */}
            <div className="doc-signatures">
              <div className="sig-box">
                <p><strong>ຝ່າຍຜູ້ໃຫ້ກູ້</strong></p>
                <div className="sig-space" />
                <p>(ລາຍເຊັນ & ຊື່ແຈ້ງ)</p>
              </div>

              <div className="sig-box stamp-container">
                <p><strong>ຝ່າຍຜູ້ກູ້</strong></p>
                <div className="sig-space">
                  {showStamp && (
                    <img src={defaultContract.stampUrl} alt="Stamp" className="png-stamp" />
                  )}
                </div>
                <p><strong>{customer?.name}</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
