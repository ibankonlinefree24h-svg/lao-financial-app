import React, { useState } from 'react';
import {
  Printer,
  Send,
  Edit3,
  Plus,
  Trash2,
  FileText,
  Building2,
  User,
  Phone,
  Mail,
  Share2,
  Download,
  CheckCircle2,
  Sparkles,
  Eye,
  Check
} from 'lucide-react';

export default function CanvaInvoiceView({ customers = [], loans = [] }) {
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUSTOM_SOMHAK');
  const [isEditing, setIsEditing] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Exact data from Canva template (https://canva.link/1axku7zbxwjlvpp)
  const [invoiceData, setInvoiceData] = useState({
    docTitle: 'ໃບແຈ້ງໜີ້',
    subBrand: 'IBank online free 24 h',
    brandName: 'Intelligent Bank',

    // Left Column: ຂໍ້ມູນລູກຄ້າ
    customerName: 'ສົມຮັກ ໄຊຍະສອນ',
    customerCode: 'R012345',
    occupation: 'ທະຫານ',
    studyPeriod: '2020 - 2026',
    customerWhatsapp: '+7 916 379-01-19',
    customerAddress: 'Москва / Санкт-Петербург',

    // Right Column: ຜູ້ອອກໃບແຈ້ງໜີ້
    issuerBrand: 'Intelligent Bank',
    issuerSubBrand: 'IBank online free 24 h',
    issuerEmail: 'ibankonlinefree24h@gmail.com',
    issuerFacebook: 'https://www.facebook.com/share/19M2uuNYKe/?mibextid=wwXIfr',
    issuerWhatsapp: '+7 993 271-09-27',
    issuerPhone: '+7 993 271-09-27',
    issuerBank: 'Т-Банк ( Тинькофф ). (СБЕРБАНК).',
    issuerAccountName: 'Камвиенчан Ф.',

    // Items list (matching exact rows in Canva)
    items: [
      {
        id: 1,
        principal: 1000000,
        interest: 200000,
        loanDate: '01/08/26',
        dueDate: '28/08/26',
        paidAmount: 600000
      },
      {
        id: 2,
        principal: 500000,
        interest: 100000,
        loanDate: '12/08/26',
        dueDate: '28/08/26',
        paidAmount: 200000
      }
    ]
  });

  // Calculate Totals
  const totalPrincipal = invoiceData.items.reduce((sum, i) => sum + (Number(i.principal) || 0), 0);
  const totalInterest = invoiceData.items.reduce((sum, i) => sum + (Number(i.interest) || 0), 0);
  const totalCombined = totalPrincipal + totalInterest;
  const totalPaid = invoiceData.items.reduce((sum, i) => sum + (Number(i.paidAmount) || 0), 0);
  const totalRemaining = Math.max(0, totalCombined - totalPaid);

  // Lao Money Words
  const getLaoWords = (amount) => {
    if (amount === 1000000) return '(ໜື່ງລ້ານກີບ)';
    if (amount === 1500000) return '(ໜື່ງລ້ານຫ້າແສນກີບ)';
    if (amount === 1800000) return '(ໜື່ງລ້ານແປດແສນກີບ)';
    if (amount === 2000000) return '(ສອງລ້ານກີບ)';
    return `(ລວມຄົງເຫຼືອ ${amount.toLocaleString()} k)`;
  };

  // Format currency numbers as Canva format (e.g. 1.000.000 k)
  const formatCanvaK = (val) => {
    const num = Number(val) || 0;
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' k';
  };

  // Customer Selector Handler
  const handleCustomerSelect = (e) => {
    const val = e.target.value;
    setSelectedCustomerId(val);
    if (val === 'CUSTOM_SOMHAK') {
      setInvoiceData((prev) => ({
        ...prev,
        customerName: 'ສົມຮັກ ໄຊຍະສອນ',
        customerCode: 'R012345',
        occupation: 'ທະຫານ',
        studyPeriod: '2020 - 2026',
        customerWhatsapp: '+7 916 379-01-19',
        customerAddress: 'Москва / Санкт-Петербург'
      }));
    } else {
      const found = customers.find((c) => c.id === val);
      if (found) {
        setInvoiceData((prev) => ({
          ...prev,
          customerName: found.name,
          customerCode: found.id || 'R0999',
          occupation: found.occupation || 'ນັກສຶກສາ / ພະນັກງານ',
          studyPeriod: '2022 - 2026',
          customerWhatsapp: found.phone || '+7 999 000-00-00',
          customerAddress: found.address || 'Vientiane, Laos'
        }));
      }
    }
  };

  // Add Item Row
  const handleAddItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        {
          id: Date.now(),
          principal: 500000,
          interest: 100000,
          loanDate: '15/08/26',
          dueDate: '28/08/26',
          paidAmount: 0
        }
      ]
    });
  };

  // Remove Item
  const handleRemoveItem = (id) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((it) => it.id !== id)
    });
  };

  // Update Item Field
  const handleItemChange = (id, field, value) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((it) => (it.id === id ? { ...it, [field]: value } : it))
    });
  };

  // Send WhatsApp
  const whatsappMsg = encodeURIComponent(
    `ສະບາຍດີ ${invoiceData.customerName},\nນີ້ແມ່ນໃບແຈ້ງໜີ້ (INVOICE) ຈາກ ${invoiceData.brandName} (${invoiceData.subBrand}):\n` +
    `• ຍອດລວມຕົ້ນ-ດອກ: ${formatCanvaK(totalCombined)}\n` +
    `• ຍອດລວມຊຳລະແລ້ວ: ${formatCanvaK(totalPaid)}\n` +
    `• ຍັງເຫຼືອຕ້ອງຊຳລະ: ${formatCanvaK(totalRemaining)} ${getLaoWords(totalRemaining)}\n` +
    `• ບັນຊີຊຳລະ: ${invoiceData.issuerBank} (${invoiceData.issuerAccountName})`
  );
  const whatsappUrl = `https://wa.me/${invoiceData.customerWhatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto', fontFamily: "'Inter', 'Noto Sans Lao', 'Phetsarath OT', sans-serif" }}>
      {/* 🌟 TOP CONTROL TOOLBAR (NON-PRINTABLE) */}
      <div
        className="glass-panel no-print"
        style={{
          padding: '18px 24px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          marginBottom: '24px',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="tag tag-blue" style={{ fontSize: '0.78rem', fontWeight: 800 }}>Canva Design Replica</span>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: '#38bdf8' }}>
              📜 ໃບແຈ້ງໜີ້ (Canva Visual Design 100%)
            </h2>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            ຕົ້ນສະບັບ: <a href="https://canva.link/1axku7zbxwjlvpp" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>https://canva.link/1axku7zbxwjlvpp</a>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={selectedCustomerId}
            onChange={handleCustomerSelect}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              background: 'rgba(0,0,0,0.5)',
              color: '#fff',
              border: '1px solid var(--border-color)',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            <option value="CUSTOM_SOMHAK">👤 ສົມຮັກ ໄຊຍະສອນ (Canva Template Default)</option>
            {customers.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.id})
              </option>
            ))}
          </select>

          <button
            className="icon-btn-xs"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem',
              borderRadius: '8px',
              background: isEditing ? '#f59e0b' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontWeight: 700
            }}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={14} /> {isEditing ? '✓ ເສັດສິ້ນ' : '✏️ ແກ້ໄຂຂໍ້ມູນ'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '8px 14px',
              borderRadius: '8px',
              fontWeight: 700,
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <Send size={14} /> WhatsApp
          </a>

          <button
            className="btn-primary-emerald"
            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => window.print()}
          >
            <Printer size={15} /> 🖨️ ພິມ A4 PDF
          </button>
        </div>
      </div>

      {/* 🌟 CANVA VISUAL DESIGN A4 PAPER CONTAINER */}
      <div
        className="canva-visual-wrapper"
        style={{
          background: '#090d16',
          padding: '40px 20px',
          borderRadius: '24px',
          display: 'flex',
          justify: 'center'
        }}
      >
        <div
          className="canva-a4-sheet"
          style={{
            background: '#ffffff',
            color: '#111827',
            width: '100%',
            maxWidth: '820px',
            minHeight: '1080px',
            padding: '48px 52px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.7)',
            borderRadius: '4px',
            border: '1px solid #e5e7eb',
            boxSizing: 'border-box',
            position: 'relative'
          }}
        >
          {/* TOP ACCENT LINE (BLACK BAR AS IN CANVA) */}
          <div style={{ height: '6px', background: '#111827', margin: '-48px -52px 36px -52px' }} />

          {/* HEADER SECTION (IBank online free 24 h & Title ໃບແຈ້ງໜີ້) */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #111827', paddingBottom: '16px', marginBottom: '28px' }}>
            <div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#111827', margin: 0, lineHeight: 1.1, letterSpacing: '-0.5px' }}>
                {invoiceData.subBrand}
              </h2>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#374151', marginTop: '4px' }}>
                {invoiceData.brandName}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#111827', margin: 0, letterSpacing: '1px' }}>
                {invoiceData.docTitle}
              </h1>
            </div>
          </div>

          {/* 2-COLUMN GRID (ຂໍ້ມູນລູກຄ້າ vs ຜູ້ອອກໃບແຈ້ງໜີ້) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '32px' }}>
            {/* LEFT: ຂໍ້ມູນລູກຄ້າ */}
            <div style={{ border: '1px solid #111827', borderRadius: '10px', padding: '18px 22px', background: '#f9fafb' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#111827', margin: '0 0 12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px' }}>
                ຂໍ້ມູນລູກຄ້າ:
              </h3>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
                  <label>ຊື່ລູກຄ້າ: <input type="text" value={invoiceData.customerName} onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>ລະຫັດ: <input type="text" value={invoiceData.customerCode} onChange={(e) => setInvoiceData({ ...invoiceData, customerCode: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>ອາຊີບ: <input type="text" value={invoiceData.occupation} onChange={(e) => setInvoiceData({ ...invoiceData, occupation: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>ປີຮຽນ-ຈົບ: <input type="text" value={invoiceData.studyPeriod} onChange={(e) => setInvoiceData({ ...invoiceData, studyPeriod: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>whatsApp: <input type="text" value={invoiceData.customerWhatsapp} onChange={(e) => setInvoiceData({ ...invoiceData, customerWhatsapp: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>ທີ່ຢູ່: <input type="text" value={invoiceData.customerAddress} onChange={(e) => setInvoiceData({ ...invoiceData, customerAddress: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.94rem', color: '#111827', lineHeight: 1.5 }}>
                  <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#000000' }}>{invoiceData.customerName}</div>
                  <div><strong>ລະຫັດ :</strong> <span style={{ fontWeight: 800 }}>{invoiceData.customerCode}</span></div>
                  <div><strong>ອາຊີບ:</strong> {invoiceData.occupation}</div>
                  <div><strong>ປີຮຽນ-ຈົບ:</strong> {invoiceData.studyPeriod}</div>
                  <div><strong>whatsApp:</strong> {invoiceData.customerWhatsapp}</div>
                  <div><strong>ທີ່ຢູ່:</strong> {invoiceData.customerAddress}</div>
                </div>
              )}
            </div>

            {/* RIGHT: ຜູ້ອອກໃບແຈ້ງໜີ້ */}
            <div style={{ border: '1px solid #111827', borderRadius: '10px', padding: '18px 22px', background: '#f9fafb' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 900, color: '#111827', margin: '0 0 12px', borderBottom: '1px solid #e5e7eb', paddingBottom: '6px' }}>
                ຜູ້ອອກໃບແຈ້ງໜີ້:
              </h3>
              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem' }}>
                  <label>Brand: <input type="text" value={invoiceData.issuerBrand} onChange={(e) => setInvoiceData({ ...invoiceData, issuerBrand: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>Email: <input type="text" value={invoiceData.issuerEmail} onChange={(e) => setInvoiceData({ ...invoiceData, issuerEmail: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>WhatsApp: <input type="text" value={invoiceData.issuerWhatsapp} onChange={(e) => setInvoiceData({ ...invoiceData, issuerWhatsapp: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>Bank: <input type="text" value={invoiceData.issuerBank} onChange={(e) => setInvoiceData({ ...invoiceData, issuerBank: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                  <label>Name: <input type="text" value={invoiceData.issuerAccountName} onChange={(e) => setInvoiceData({ ...invoiceData, issuerAccountName: e.target.value })} style={{ width: '100%', padding: '4px' }} /></label>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.92rem', color: '#111827', lineHeight: 1.5 }}>
                  <div style={{ fontWeight: 900, color: '#000000', fontSize: '1.05rem' }}>{invoiceData.issuerBrand}</div>
                  <div>{invoiceData.issuerSubBrand}</div>
                  <div><strong>email:</strong> {invoiceData.issuerEmail}</div>
                  <div style={{ wordBreak: 'break-all' }}><strong>Facebook:</strong> <span style={{ fontSize: '0.82rem', color: '#2563eb' }}>{invoiceData.issuerFacebook}</span></div>
                  <div><strong>WhatsApp:</strong> {invoiceData.issuerWhatsapp}</div>
                  <div><strong>Номер:</strong> {invoiceData.issuerPhone}</div>
                  <div><strong>Банк :</strong> <span style={{ fontWeight: 800, color: '#111827' }}>{invoiceData.issuerBank}</span></div>
                  <div><strong>Имя :</strong> <span style={{ fontWeight: 800, color: '#111827' }}>{invoiceData.issuerAccountName}</span></div>
                </div>
              )}
            </div>
          </div>

          {/* FINANCIAL TABLE (EXACT CANVA FORMAT) */}
          <div style={{ marginBottom: '32px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: '#111827', color: '#ffffff', textAlign: 'center', fontWeight: 900 }}>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ຈຳນວນກູ້</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ຈຳນວນດອກ</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ວັນທີກູ້</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ວັນທີຊຳລະ</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ຊຳລະແລ້ວ</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ຈຳນວນທີ່ຍັງເຫຼືອ</th>
                  <th style={{ padding: '14px 10px', border: '1px solid #111827' }}>ລວມ</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, idx) => {
                  const itemTotal = (Number(item.principal) || 0) + (Number(item.interest) || 0);
                  const itemRemaining = Math.max(0, itemTotal - (Number(item.paidAmount) || 0));

                  return (
                    <tr key={item.id} style={{ textAlign: 'center', background: idx % 2 === 0 ? '#ffffff' : '#f9fafb' }}>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 800 }}>
                        {isEditing ? (
                          <input type="number" value={item.principal} onChange={(e) => handleItemChange(item.id, 'principal', e.target.value)} style={{ width: '95px', padding: '4px', textAlign: 'center' }} />
                        ) : (
                          formatCanvaK(item.principal)
                        )}
                      </td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 800 }}>
                        {isEditing ? (
                          <input type="number" value={item.interest} onChange={(e) => handleItemChange(item.id, 'interest', e.target.value)} style={{ width: '85px', padding: '4px', textAlign: 'center' }} />
                        ) : (
                          formatCanvaK(item.interest)
                        )}
                      </td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db' }}>{item.loanDate}</td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 800 }}>{item.dueDate}</td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 800, color: '#16a34a' }}>
                        {isEditing ? (
                          <input type="number" value={item.paidAmount} onChange={(e) => handleItemChange(item.id, 'paidAmount', e.target.value)} style={{ width: '95px', padding: '4px', textAlign: 'center' }} />
                        ) : (
                          formatCanvaK(item.paidAmount)
                        )}
                      </td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 900, color: itemRemaining > 0 ? '#dc2626' : '#16a34a' }}>
                        {formatCanvaK(itemRemaining)}
                      </td>
                      <td style={{ padding: '14px 10px', border: '1px solid #d1d5db', fontWeight: 900 }}>
                        {formatCanvaK(itemTotal)}
                        {isEditing && (
                          <button onClick={() => handleRemoveItem(item.id)} style={{ marginLeft: '6px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>
                            <Trash2 size={14} />
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {isEditing && (
              <button className="icon-btn-xs" style={{ marginTop: '10px', background: '#111827', color: '#fff', padding: '6px 14px' }} onClick={handleAddItem}>
                <Plus size={14} /> ເພີ່ມລາຍການ
              </button>
            )}
          </div>

          {/* SUMMARY TOTAL CARDS GRID (EXACT CANVA CARDS) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '36px' }}>
            {/* Card 1: ຍອດລວມຕົ້ນ */}
            <div style={{ border: '1.5px solid #111827', borderRadius: '8px', padding: '14px 14px', background: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#111827' }}>ຍອດລວມຕົ້ນ:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111827', marginTop: '6px' }}>
                {formatCanvaK(totalPrincipal)}
              </div>
            </div>

            {/* Card 2: ຍອດລວມດອກ */}
            <div style={{ border: '1.5px solid #111827', borderRadius: '8px', padding: '14px 14px', background: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#111827' }}>ຍອດລວມດອກ:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111827', marginTop: '6px' }}>
                {formatCanvaK(totalInterest)}
              </div>
            </div>

            {/* Card 3: ຍອດລວມຊຳລະ */}
            <div style={{ border: '1.5px solid #111827', borderRadius: '8px', padding: '14px 14px', background: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#111827' }}>ຍອດລວມຊຳລະ:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#16a34a', marginTop: '6px' }}>
                {formatCanvaK(totalPaid)}
              </div>
            </div>

            {/* Card 4: ຍອດລວມຕົ້ນ-ດອກ */}
            <div style={{ border: '1.5px solid #111827', borderRadius: '8px', padding: '14px 14px', background: '#ffffff', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#111827' }}>ຍອດລວມຕົ້ນ-ດອກ:</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#111827', marginTop: '6px' }}>
                {formatCanvaK(totalCombined)}
              </div>
            </div>

            {/* Card 5: ຍັງເຫຼືອ */}
            <div style={{ border: '2px solid #dc2626', borderRadius: '8px', padding: '14px 14px', background: '#fff5f5', textAlign: 'left' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#dc2626' }}>ຍັງເຫຼືອ:</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#dc2626', marginTop: '6px' }}>
                {formatCanvaK(totalRemaining)}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 900, color: '#991b1b', marginTop: '4px' }}>
                {getLaoWords(totalRemaining)}
              </div>
            </div>
          </div>

          {/* BOTTOM CANVA STAMP / BUTTON FOOTER */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#16a34a' }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#111827' }}>{invoiceData.subBrand}</span>
            </div>

            <div
              style={{
                padding: '10px 28px',
                borderRadius: '24px',
                background: '#111827',
                color: '#ffffff',
                fontWeight: 900,
                fontSize: '0.92rem',
                letterSpacing: '0.5px'
              }}
            >
              ບັນທຶກຂໍ້ມູນ
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
