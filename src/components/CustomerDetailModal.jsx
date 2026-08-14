import React, { useState } from 'react';
import {
  X,
  User,
  GraduationCap,
  Briefcase,
  MapPin,
  FileText,
  MessageSquare,
  Phone,
  Folder,
  ExternalLink,
  Award,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Send,
  Building,
  Calendar,
  Layers
} from 'lucide-react';
import { calculateCustomerStatuses } from '../data/mockCustomers';

const FacebookIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const DriveIcon = ({ size = 16, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function CustomerDetailModal({ customer, onClose, onOpenContract, onUpdateCustomer }) {
  const [activeTab, setActiveTab] = useState('personal');
  const [newChatMessage, setNewChatMessage] = useState('');

  if (!customer) return null;

  const statuses = calculateCustomerStatuses(customer);

  const handleAddChatMessage = (e) => {
    e.preventDefault();
    if (!newChatMessage.trim()) return;

    const newMsg = {
      id: Date.now(),
      date: new Date().toLocaleString('lo-LA', { dateStyle: 'short', timeStyle: 'short' }),
      sender: 'Admin',
      text: newChatMessage.trim()
    };

    const updatedCustomer = {
      ...customer,
      chatHistory: [...(customer.chatHistory || []), newMsg]
    };

    onUpdateCustomer(updatedCustomer);
    setNewChatMessage('');
  };

  // Calculations for cumulative statistics
  const totalLAKLoans = customer.loanHistory?.reduce((sum, h) => sum + (h.amountLAK || 0), 0) || 0;
  const totalRUBLoans = customer.loanHistory?.reduce((sum, h) => sum + (h.amountRUB || 0), 0) || 0;
  const totalLAKProfit = customer.loanHistory?.reduce((sum, h) => sum + (h.profitLAK || 0), 0) || 0;
  const totalRUBProfit = customer.loanHistory?.reduce((sum, h) => sum + (h.profitRUB || 0), 0) || 0;

  const countLAKLoans = customer.loanHistory?.filter((h) => h.amountLAK > 0).length || 0;
  const countRUBLoans = customer.loanHistory?.filter((h) => h.amountRUB > 0).length || 0;

  const countLAKUnpaid = customer.loanHistory?.filter((h) => h.status === 'UNPAID' && h.amountLAK > 0).length || 0;
  const countRUBUnpaid = customer.loanHistory?.filter((h) => h.status === 'UNPAID' && h.amountRUB > 0).length || 0;

  return (
    <div className="customer-modal-backdrop">
      <div className="customer-modal-container glass-panel">
        {/* Modal Header */}
        <div className="customer-modal-header">
          <div className="profile-header-info">
            <img src={customer.photo} alt={customer.name} className="profile-avatar-lg" />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2>{customer.name}</h2>
                <span className="code-badge">{customer.code}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                {customer.occupation} | ອາຍຸ: {customer.age} ປີ
              </p>

              {/* Status Badges */}
              <div className="status-badges-group" style={{ marginTop: '8px' }}>
                {statuses.map((st, i) => (
                  <span key={i} className={`status-badge-pill ${st.color}`}>
                    {st.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button className="icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="modal-tabs">
          <button
            className={`modal-tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            <User size={16} /> ຂໍ້ມູນສ່ວນຕົວ
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            <GraduationCap size={16} /> ການສຶກສາ / ບ່ອນທຳງານ
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'loans' ? 'active' : ''}`}
            onClick={() => setActiveTab('loans')}
          >
            <DollarSign size={16} /> ສິນເຊື່ອ & ດອກເບ້ຍ
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'social' ? 'active' : ''}`}
            onClick={() => setActiveTab('social')}
          >
            <FacebookIcon size={16} /> ໂຊຊຽວ & ໄດຣຟ໌
          </button>
          <button
            className={`modal-tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            <MessageSquare size={16} /> ປະຫວັດແຊັດ ({customer.chatHistory?.length || 0})
          </button>
        </div>

        {/* Modal Body Tab Content */}
        <div className="modal-tab-content">
          {/* 1. Personal Info */}
          {activeTab === 'personal' && (
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">ລະຫັດລູກຄ້າ:</span>
                <span className="detail-value">{customer.code}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ຊື່ ແລະ ນາມສະກຸນ:</span>
                <span className="detail-value">{customer.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ອາຍຸ:</span>
                <span className="detail-value">{customer.age} ປີ</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ອາຊີບ:</span>
                <span className="detail-value">{customer.occupation}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">ທີ່ຢູ່ປະຈຸບັນ:</span>
                <span className="detail-value">
                  ບ້ານ {customer.currentAddress?.village}, ເມືອງ {customer.currentAddress?.district}, ແຂວງ {customer.currentAddress?.province}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ເບີໂທ WhatsApp:</span>
                <span className="detail-value highlight-link">
                  <Phone size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                  {customer.whatsappNumber}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ລິ້ງ Google Maps:</span>
                {customer.googleMapsUrl ? (
                  <a href={customer.googleMapsUrl} target="_blank" rel="noreferrer" className="external-link-btn">
                    <MapPin size={14} /> ເປີດ Google Maps
                  </a>
                ) : (
                  <span className="detail-value">-</span>
                )}
              </div>
            </div>
          )}

          {/* 2. Education & Work */}
          {activeTab === 'education' && (
            <div className="detail-grid">
              <div className="detail-item full-width">
                <span className="detail-label">ຊື່ໂຮງຮຽນ / ບ່ອນທຳງານ (ລາວ-ຕ່າງປະເທດ):</span>
                <span className="detail-value">{customer.schoolOrWorkplace}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">ທີ່ຢູ່ ໂຮງຮຽນ / ບ່ອນທຳງານ:</span>
                <span className="detail-value">
                  ບ້ານ {customer.schoolOrWorkplaceAddress?.village}, ເມືອງ {customer.schoolOrWorkplaceAddress?.district}, ແຂວງ {customer.schoolOrWorkplaceAddress?.province}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ຂະແໜງ / ສາຍທີ່ຮຽນ:</span>
                <span className="detail-value">{customer.major}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ປີເລີ່ມສຶກສາ / ເລີ່ມທຳງານ:</span>
                <span className="detail-value">{customer.startYear}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">ປີຈົບການສຶກສາ:</span>
                <span className="detail-value">{customer.graduationYear}</span>
              </div>
            </div>
          )}

          {/* 3. Loans & Profit Statistics */}
          {activeTab === 'loans' && (
            <div>
              <div className="stat-cards-row">
                <div className="mini-stat-card">
                  <p>ຍອດກູ້ປະຈຸບັນ (ກີບ)</p>
                  <h4>₭ {customer.currentActiveLoanLAK?.toLocaleString() || 0}</h4>
                </div>
                <div className="mini-stat-card">
                  <p>ຍອດກູ້ປະຈຸບັນ (ຣູບລ໌)</p>
                  <h4>{customer.currentActiveLoanRUB?.toLocaleString() || 0} RUB</h4>
                </div>
                <div className="mini-stat-card">
                  <p>ເປີເຊັນດອກເບ້ຍ</p>
                  <h4 style={{ color: 'var(--accent-purple)' }}>{customer.interestRate}%</h4>
                </div>
              </div>

              <div className="detail-grid" style={{ marginTop: '20px' }}>
                <div className="detail-item">
                  <span className="detail-label">ຈຳນວນຄັ້ງໃນການກູ້ (ກີບ):</span>
                  <span className="detail-value">{countLAKLoans} ຄັ້ງ</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ຈຳນວນຄັ້ງໃນການກູ້ (ຣູບລ໌):</span>
                  <span className="detail-value">{countRUBLoans} ຄັ້ງ</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ຂາດຊຳລະ (ກີບ):</span>
                  <span className="detail-value" style={{ color: '#f87171' }}>{countLAKUnpaid} ຄັ້ງ</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ຂາດຊຳລະ (ຣູບລ໌):</span>
                  <span className="detail-value" style={{ color: '#f87171' }}>{countRUBUnpaid} ຄັ້ງ</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ຍອດເງິນທັງໝົດທີ່ກູ້ (ກີບ):</span>
                  <span className="detail-value">₭ {totalLAKLoans.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ຍອດເງິນທັງໝົດທີ່ກູ້ (ຣູບລ໌):</span>
                  <span className="detail-value">{totalRUBLoans.toLocaleString()} RUB</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ໄດ້ກຳໄລທັງໝົດ (ກີບ):</span>
                  <span className="detail-value" style={{ color: '#34d399', fontWeight: 700 }}>₭ {totalLAKProfit.toLocaleString()}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">ໄດ້ກຳໄລທັງໝົດ (ຣູບລ໌):</span>
                  <span className="detail-value" style={{ color: '#34d399', fontWeight: 700 }}>{totalRUBProfit.toLocaleString()} RUB</span>
                </div>
                <div className="detail-item full-width">
                  <span className="detail-label">ລິ້ງໃບແຈ້ງໜີ້:</span>
                  {customer.invoiceLink ? (
                    <a href={customer.invoiceLink} target="_blank" rel="noreferrer" className="external-link-btn">
                      <FileText size={14} /> ເບິ່ງໃບແຈ້ງໜີ້
                    </a>
                  ) : (
                    <span>-</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* 4. Social Links & Drive */}
          {activeTab === 'social' && (
            <div className="detail-grid">
              <div className="detail-item full-width">
                <span className="detail-label">Facebook ຜູ້ກູ້:</span>
                {customer.facebookBorrower ? (
                  <a href={customer.facebookBorrower} target="_blank" rel="noreferrer" className="external-link-btn">
                    <FacebookIcon size={14} /> {customer.facebookBorrower}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Facebook ຜູ້ຄ້ຳປະກັນ 1:</span>
                {customer.facebookGuarantor1 ? (
                  <a href={customer.facebookGuarantor1} target="_blank" rel="noreferrer" className="external-link-btn">
                    <FacebookIcon size={14} /> {customer.facebookGuarantor1}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Facebook ຜູ້ຄ້ຳປະກັນ 2:</span>
                {customer.facebookGuarantor2 ? (
                  <a href={customer.facebookGuarantor2} target="_blank" rel="noreferrer" className="external-link-btn">
                    <FacebookIcon size={14} /> {customer.facebookGuarantor2}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Facebook ຜູ້ຄ້ຳປະກັນ 3:</span>
                {customer.facebookGuarantor3 ? (
                  <a href={customer.facebookGuarantor3} target="_blank" rel="noreferrer" className="external-link-btn">
                    <FacebookIcon size={14} /> {customer.facebookGuarantor3}
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Google Drive ເອກະສານ (ບັດ, ພາດສະປອດ):</span>
                {customer.driveDocumentsUrl ? (
                  <a href={customer.driveDocumentsUrl} target="_blank" rel="noreferrer" className="external-link-btn highlight-drive">
                    <DriveIcon size={14} /> ເປີດ Google Drive Folders
                  </a>
                ) : (
                  <span>-</span>
                )}
              </div>
            </div>
          )}

          {/* 5. Contract & Chat History */}
          {activeTab === 'chat' && (
            <div>
              <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 600 }}>ປະຫວັດການຕິດຕໍ່ & ບັນທຶກແຊັດ</h4>
                <button
                  style={{
                    background: 'var(--accent-purple)',
                    color: 'white',
                    padding: '8px 14px',
                    borderRadius: '10px',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onClick={() => onOpenContract(customer)}
                >
                  <FileText size={16} /> ເປີດສັນຍາກູ້ຢືມ (Word Editor)
                </button>
              </div>

              {/* Chat Log List */}
              <div className="chat-messages-container">
                {customer.chatHistory && customer.chatHistory.length > 0 ? (
                  customer.chatHistory.map((msg) => (
                    <div key={msg.id} className="chat-bubble">
                      <div className="chat-bubble-header">
                        <span className="chat-sender">{msg.sender}</span>
                        <span className="chat-date">{msg.date}</span>
                      </div>
                      <p className="chat-text">{msg.text}</p>
                    </div>
                  ))
                ) : (
                  <p style={{ textAlignment: 'center', color: 'var(--text-muted)', padding: '20px' }}>
                    ຍັງບໍ່ມີປະຫວັດແຊັດ
                  </p>
                )}
              </div>

              {/* Add New Chat Note Form */}
              <form onSubmit={handleAddChatMessage} className="chat-input-form" style={{ marginTop: '16px' }}>
                <input
                  type="text"
                  placeholder="ພິມ ບັນທຶກ/ປະຫວັດແຊັດ ໃໝ່..."
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                />
                <button type="submit">
                  <Send size={16} /> ເພີ່ມບັນທຶກ
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
