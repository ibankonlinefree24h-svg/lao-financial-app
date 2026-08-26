import React, { useState } from 'react';
import {
  FileText,
  Printer,
  Send,
  UserCheck,
  Building2,
  Phone,
  Mail,
  CreditCard,
  Calendar,
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  CheckCircle,
  Download,
  Share2,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export default function CanvaInvoiceView({ customers = [], loans = [] }) {
  // Select Customer
  const [selectedCustomerId, setSelectedCustomerId] = useState('CUSTOM_SOMHAK');
  const [isEditing, setIsEditing] = useState(false);

  // Default Invoice Data matching Canva template (https://canva.link/1axku7zbxwjlvpp)
  const [invoiceData, setInvoiceData] = useState({
    docNo: 'INV-2026-0801',
    issueDate: '26/08/2026',
    currency: 'LAK',

    // Customer Information (ຂໍ້ມູນລູກຄ້າ)
    customerName: 'ສົມຮັກ ໄຊຍະສອນ',
    customerCode: 'R012345',
    occupation: 'ທະຫານ',
    studyPeriod: '2020 - 2026',
    customerWhatsapp: '+7 916 379-01-19',
    customerAddress: 'Москва / Санкт-Петербург',

    // Issuer & Payment Channels (ຜູ້ອອກໃບແຈ້ງໜີ້ & ຊ່ອງທາງຊຳລະ)
    issuerBrand: 'Intelligent Bank',
    issuerSub: 'IBank online free 24h',
    issuerEmail: 'ibankonlinefree24h@gmail.com',
    issuerFacebook: 'https://www.facebook.com/share/19M2uuNYKe/?mibextid=wwXIfr',
    issuerWhatsapp: '+7 993 271-09-27',
    issuerPhone: '+7 993 271-09-27',
    issuerBank: 'Т-Банк ( Тинькофф ) / (СБЕРБАНК)',
    issuerAccountName: 'Камвиенчан Ф.',

    // Items (ລາຍການກູ້ & ຊຳລະ)
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

  // Calculate Summary Totals
  const totalPrincipal = invoiceData.items.reduce((sum, item) => sum + (Number(item.principal) || 0), 0);
  const totalInterest = invoiceData.items.reduce((sum, item) => sum + (Number(item.interest) || 0), 0);
  const totalCombined = totalPrincipal + totalInterest;
  const totalPaid = invoiceData.items.reduce((sum, item) => sum + (Number(item.paidAmount) || 0), 0);
  const totalRemaining = Math.max(0, totalCombined - totalPaid);

  // Convert numbers to Lao Words
  const getLaoMoneyWords = (amount) => {
    if (amount === 1000000) return '(ໜຶ່ງລ້ານກີບ)';
    if (amount === 1500000) return '(ໜຶ່ງລ້ານຫ້າແສນກີບ)';
    if (amount === 1800000) return '(ໜຶ່ງລ້ານແປດແສນກີບ)';
    if (amount === 2000000) return '(ສອງລ້ານກີບ)';
    return `(ລວມຄົງເຫຼືອ ${amount.toLocaleString()} ₭)`;
  };

  // Switch Selected Customer
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
          customerCode: found.id || 'CST-001',
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
    const newItem = {
      id: Date.now(),
      principal: 500000,
      interest: 100000,
      loanDate: new Date().toLocaleDateString('en-GB'),
      dueDate: new Date().toLocaleDateString('en-GB'),
      paidAmount: 0
    };
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, newItem] });
  };

  // Remove Item Row
  const handleRemoveItem = (id) => {
    setInvoiceData({ ...invoiceData, items: invoiceData.items.filter((it) => it.id !== id) });
  };

  // Item Change Handler
  const handleItemChange = (id, field, value) => {
    const updated = invoiceData.items.map((it) => (it.id === id ? { ...it, [field]: value } : it));
    setInvoiceData({ ...invoiceData, items: updated });
  };

  // Print Invoice
  const handlePrint = () => {
    window.print();
  };

  // Send WhatsApp
  const whatsappMsg = encodeURIComponent(
    `ສະບາຍດີ ${invoiceData.customerName},\nນີ້ແມ່ນໃບແຈ້ງໜີ້ (INVOICE) ຈາກ ${invoiceData.issuerBrand}:\n- ຍອດຕົ້ນ+ດອກ: ₭ ${totalCombined.toLocaleString()}\n- ຊຳລະແລ້ວ: ₭ ${totalPaid.toLocaleString()}\n- ຍັງເຫຼືອຕ້ອງຊຳລະ: ₭ ${totalRemaining.toLocaleString()}\nລາຍລະອຽດບັນຊີຊຳລະ: ${invoiceData.issuerBank} (${invoiceData.issuerAccountName})`
  );
  const whatsappUrl = `https://wa.me/${invoiceData.customerWhatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMsg}`;

  return (
    <div style={{ padding: '24px', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 🌟 TOP CONTROL PANEL */}
      <div
        className="glass-panel no-print"
        style={{
          padding: '20px 24px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, rgba(2, 132, 199, 0.15), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(56, 189, 248, 0.35)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #0284c7, #38bdf8)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white'
            }}
          >
            <FileText size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>📜 ໃບແຈ້ງໜີ້ (Formal Invoice Template)</h2>
            <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              ອອກແບບຕາມແບບຟອມ Canva Standard: <strong>https://canva.link/1axku7zbxwjlvpp</strong>
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Select Customer */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)' }}>ເລືອກລູກຄ້າ:</span>
            <select
              value={selectedCustomerId}
              onChange={handleCustomerSelect}
              style={{
                padding: '8px 14px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.4)',
                color: '#fff',
                border: '1px solid var(--border-color)',
                fontSize: '0.86rem',
                fontWeight: 600
              }}
            >
              <option value="CUSTOM_SOMHAK">👤 ສົມຮັກ ໄຊຍະສອນ (ຕາມ Canva Demo)</option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.id})
                </option>
              ))}
            </select>
          </div>

          <button
            className="icon-btn-xs"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem',
              borderRadius: '10px',
              background: isEditing ? '#f59e0b' : 'rgba(255,255,255,0.08)',
              color: '#fff',
              fontWeight: 700
            }}
            onClick={() => setIsEditing(!isEditing)}
          >
            <Edit3 size={15} /> {isEditing ? '✓ ເສັດສິ້ນການແກ້ໄຂ' : '✏️ ແກ້ໄຂຂໍ້ມູນ'}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              background: '#25D366',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none'
            }}
          >
            <Send size={15} /> ສົ່ງ WhatsApp
          </a>

          <button
            className="btn-primary-emerald"
            style={{ padding: '8px 18px', fontSize: '0.84rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={handlePrint}
          >
            <Printer size={16} /> 🖨️ ພິມ A4 PDF
          </button>
        </div>
      </div>

      {/* 🌟 CANVA MATCHING A4 INVOICE SHEET */}
      <div
        className="invoice-a4-sheet"
        style={{
          background: '#ffffff',
          color: '#1e293b',
          borderRadius: '16px',
          padding: '40px 48px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          fontFamily: "'Inter', 'Phetsarath OT', sans-serif",
          border: '1px solid #cbd5e1',
          position: 'relative'
        }}
      >
        {/* BRAND HEADER */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '3px solid #0f172a', pb: '16px', paddingBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#0f172a', color: '#38bdf8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem' }}>
                IB
              </div>
              <div>
                <h1 style={{ fontSize: '1.5rem', fontWeight: 900, color: '#0f172a', margin: 0, letterSpacing: '-0.5px' }}>
                  {invoiceData.issuerSub}
                </h1>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 700 }}>{invoiceData.issuerBrand}</div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#0284c7', margin: 0, textTransform: 'uppercase' }}>
              ໃບແຈ້ງໜີ້
            </h2>
            <div style={{ fontSize: '0.9rem', color: '#475569', fontWeight: 700, marginTop: '4px' }}>
              INVOICE #{invoiceData.docNo}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
              ວັນທີ: <strong>{invoiceData.issueDate}</strong>
            </div>
          </div>
        </div>

        {/* 2 COLUMNS HEADER (CUSTOMER INFO vs ISSUER/BANK INFO) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', margin: '24px 0' }}>
          {/* LEFT: ຂໍ້ມູນລູກຄ້າ */}
          <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #0284c7', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0284c7', margin: '0 0 10px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              👤 ຂໍ້ມູນລູກຄ້າ (CUSTOMER DETAILS)
            </h3>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
                <input type="text" value={invoiceData.customerName} onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" value={invoiceData.customerCode} onChange={(e) => setInvoiceData({ ...invoiceData, customerCode: e.target.value })} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" value={invoiceData.occupation} onChange={(e) => setInvoiceData({ ...invoiceData, occupation: e.target.value })} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
                <input type="text" value={invoiceData.customerWhatsapp} onChange={(e) => setInvoiceData({ ...invoiceData, customerWhatsapp: e.target.value })} style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1' }} />
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.88rem', color: '#334155' }}>
                <div><strong>ຊື່ ແລະ ນາມສະກຸນ:</strong> {invoiceData.customerName}</div>
                <div><strong>ລະຫັດລູກຄ້າ:</strong> <span style={{ background: '#e0f2fe', color: '#0369a1', padding: '2px 8px', borderRadius: '6px', fontWeight: 700 }}>{invoiceData.customerCode}</span></div>
                <div><strong>ອາຊີບ:</strong> {invoiceData.occupation}</div>
                <div><strong>ປີຮຽນ-ຈົບ:</strong> {invoiceData.studyPeriod}</div>
                <div><strong>WhatsApp:</strong> {invoiceData.customerWhatsapp}</div>
                <div><strong>ທີ່ຢູ່:</strong> {invoiceData.customerAddress}</div>
              </div>
            )}
          </div>

          {/* RIGHT: ຜູ້ອອກໃບແຈ້ງໜີ້ & ຊ່ອງທາງຊຳລະ */}
          <div style={{ background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', borderLeft: '4px solid #10b981', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#10b981', margin: '0 0 10px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
              🏦 ຜູ້ອອກ & ຊ່ອງທາງການຊຳລະເງິນ (PAYMENT DETAILS)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: '#334155' }}>
              <div><strong>ຜູ້ອອກໃບແຈ້ງໜີ້:</strong> {invoiceData.issuerBrand} ({invoiceData.issuerSub})</div>
              <div><strong>Email:</strong> {invoiceData.issuerEmail}</div>
              <div><strong>WhatsApp:</strong> {invoiceData.issuerWhatsapp}</div>
              <div><strong>Банк:</strong> <span style={{ color: '#047857', fontWeight: 800 }}>{invoiceData.issuerBank}</span></div>
              <div><strong>Имя ບັນຊີ:</strong> <span style={{ color: '#047857', fontWeight: 800 }}>{invoiceData.issuerAccountName}</span></div>
            </div>
          </div>
        </div>

        {/* FINANCIAL ITEMS TABLE */}
        <div style={{ margin: '20px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ background: '#0f172a', color: '#ffffff', textAlign: 'left' }}>
                <th style={{ padding: '10px 12px', borderRadius: '6px 0 0 0' }}>ຈຳນວນກູ້ (Principal)</th>
                <th style={{ padding: '10px 12px' }}>ຈຳນວນດອກ (Interest)</th>
                <th style={{ padding: '10px 12px' }}>ວັນທີກູ້ (Loan Date)</th>
                <th style={{ padding: '10px 12px' }}>ວັນທີຊຳລະ (Due Date)</th>
                <th style={{ padding: '10px 12px' }}>ຊຳລະແລ້ວ (Paid)</th>
                <th style={{ padding: '10px 12px' }}>ຈຳນວນທີ່ຍັງເຫຼືອ (Remaining)</th>
                <th style={{ padding: '10px 12px', textAlign: 'right', borderRadius: '0 6px 0 0' }}>ລວມ (Total)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, idx) => {
                const itemTotal = (Number(item.principal) || 0) + (Number(item.interest) || 0);
                const itemRemaining = Math.max(0, itemTotal - (Number(item.paidAmount) || 0));

                return (
                  <tr key={item.id} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '12px', fontWeight: 700, color: '#0f172a' }}>
                      {isEditing ? (
                        <input type="number" value={item.principal} onChange={(e) => handleItemChange(item.id, 'principal', e.target.value)} style={{ width: '100px', padding: '4px' }} />
                      ) : (
                        `₭ ${Number(item.principal).toLocaleString()}`
                      )}
                    </td>
                    <td style={{ padding: '12px', color: '#0284c7', fontWeight: 600 }}>
                      {isEditing ? (
                        <input type="number" value={item.interest} onChange={(e) => handleItemChange(item.id, 'interest', e.target.value)} style={{ width: '80px', padding: '4px' }} />
                      ) : (
                        `₭ ${Number(item.interest).toLocaleString()}`
                      )}
                    </td>
                    <td style={{ padding: '12px', color: '#64748b' }}>{item.loanDate}</td>
                    <td style={{ padding: '12px', color: '#d97706', fontWeight: 600 }}>{item.dueDate}</td>
                    <td style={{ padding: '12px', color: '#16a34a', fontWeight: 700 }}>
                      {isEditing ? (
                        <input type="number" value={item.paidAmount} onChange={(e) => handleItemChange(item.id, 'paidAmount', e.target.value)} style={{ width: '90px', padding: '4px' }} />
                      ) : (
                        `₭ ${Number(item.paidAmount).toLocaleString()}`
                      )}
                    </td>
                    <td style={{ padding: '12px', color: itemRemaining > 0 ? '#dc2626' : '#16a34a', fontWeight: 800 }}>
                      ₭ {itemRemaining.toLocaleString()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', fontWeight: 800, color: '#0f172a' }}>
                      ₭ {itemTotal.toLocaleString()}
                      {isEditing && (
                        <button onClick={() => handleRemoveItem(item.id)} style={{ marginLeft: '8px', color: '#dc2626', background: 'none', border: 'none', cursor: 'pointer' }}>
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
            <button className="icon-btn-xs" style={{ marginTop: '10px', background: '#0284c7', color: '#fff', padding: '6px 12px' }} onClick={handleAddItem}>
              <Plus size={14} /> ເພີ່ມລາຍການ
            </button>
          )}
        </div>

        {/* SUMMARY CARDS GRID (MATCHING CANVA TEMPLATE) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', margin: '24px 0' }}>
          <div style={{ background: '#f1f5f9', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #64748b' }}>
            <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 700 }}>ຍອດລວມຕົ້ນ</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#1e293b', marginTop: '2px' }}>
              ₭ {totalPrincipal.toLocaleString()}
            </div>
          </div>

          <div style={{ background: '#e0f2fe', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #0284c7' }}>
            <div style={{ fontSize: '0.78rem', color: '#0369a1', fontWeight: 700 }}>ຍອດລວມດອກ</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0284c7', marginTop: '2px' }}>
              ₭ {totalInterest.toLocaleString()}
            </div>
          </div>

          <div style={{ background: '#dcfce7', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #16a34a' }}>
            <div style={{ fontSize: '0.78rem', color: '#15803d', fontWeight: 700 }}>ຍອດລວມຊຳລະແລ້ວ</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#16a34a', marginTop: '2px' }}>
              ₭ {totalPaid.toLocaleString()}
            </div>
          </div>

          <div style={{ background: '#fee2e2', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #dc2626' }}>
            <div style={{ fontSize: '0.78rem', color: '#b91c1c', fontWeight: 700 }}>ຍັງເຫຼືອຕ້ອງຊຳລະ</div>
            <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#dc2626', marginTop: '2px' }}>
              ₭ {totalRemaining.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#991b1b', fontWeight: 700, marginTop: '2px' }}>
              {getLaoMoneyWords(totalRemaining)}
            </div>
          </div>

          <div style={{ background: '#0f172a', color: '#ffffff', padding: '14px', borderRadius: '10px', borderLeft: '4px solid #38bdf8' }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700 }}>ຍອດລວມຕົ້ນ-ດອກ</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#38bdf8', marginTop: '2px' }}>
              ₭ {totalCombined.toLocaleString()}
            </div>
          </div>
        </div>

        {/* SIGNATURE SECTION */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '48px', paddingTop: '24px', borderTop: '1px dashed #cbd5e1' }}>
          <div style={{ textAlign: 'center', width: '200px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '50px' }}>ລາຍເຊັນລູກຄ້າ (Customer)</div>
            <div style={{ borderBottom: '1px solid #94a3b8', width: '100%' }} />
            <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>{invoiceData.customerName}</div>
          </div>

          <div style={{ textAlign: 'center', width: '220px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', marginBottom: '50px' }}>ຜູ້ອອກໃບແຈ້ງໜີ້ (Authorized Officer)</div>
            <div style={{ borderBottom: '1px solid #94a3b8', width: '100%' }} />
            <div style={{ fontSize: '0.8rem', color: '#0284c7', fontWeight: 700, marginTop: '4px' }}>{invoiceData.issuerBrand}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
