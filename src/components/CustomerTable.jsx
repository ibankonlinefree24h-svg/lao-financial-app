import React, { useState, useRef } from 'react';
import {
  Search,
  UserPlus,
  FileText,
  MessageSquare,
  ExternalLink,
  MapPin,
  Phone,
  Folder,
  Edit,
  Eye,
  Sliders,
  ChevronDown,
  Sparkles,
  CheckCircle,
  Filter
} from 'lucide-react';
import { calculateCustomerStatuses } from '../data/mockCustomers';

// Custom SVG Icons for Facebook and Drive
const FacebookIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const DriveIcon = ({ size = 14, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

export default function CustomerTable({
  customers,
  onAddCustomer,
  onEditCustomer,
  onViewCustomerDetail,
  onOpenContract,
  onUpdateManualStatus
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [autocompleteOpen, setAutocompleteOpen] = useState(false);
  const [highlightedCustId, setHighlightedCustId] = useState(null);
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [zoomPercent, setZoomPercent] = useState(100); // 50% to 150% dynamic slider

  const rowRefs = useRef({});

  // Filtered customer list for autocomplete search
  const autocompleteSuggestions = searchTerm.trim()
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          c.code.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSelectSearchResult = (cust) => {
    setSearchTerm(cust.name);
    setAutocompleteOpen(false);
    triggerGoldHighlight(cust.id);
  };

  const triggerGoldHighlight = (id) => {
    setHighlightedCustId(id);
    const element = rowRefs.current[id];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Filtered customer list for main table display
  const displayedCustomers = customers.filter((cust) => {
    const matchesSearch =
      cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.occupation.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (filterStatus === 'ALL') return true;
    const statuses = calculateCustomerStatuses(cust);
    return statuses.some((st) => st.type === filterStatus || st.color === filterStatus);
  });

  return (
    <div className="glass-panel" style={{ padding: '28px' }}>
      {/* Top Controls Header */}
      <div className="table-top-header">
        <div className="search-autocomplete-wrapper">
          <div className="search-bar-gold">
            <Search size={18} color="var(--accent-purple)" />
            <input
              type="text"
              placeholder="ຄົ້ນຫາລາຍຊື່/ລະຫັດລູກຄ້າ..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setAutocompleteOpen(true);
              }}
              onFocus={() => setAutocompleteOpen(true)}
            />
            {searchTerm && (
              <button
                style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}
                onClick={() => {
                  setSearchTerm('');
                  setAutocompleteOpen(false);
                }}
              >
                Clear
              </button>
            )}
          </div>

          {/* Autocomplete Dropdown List */}
          {autocompleteOpen && autocompleteSuggestions.length > 0 && (
            <ul className="autocomplete-dropdown">
              {autocompleteSuggestions.map((cust) => (
                <li key={cust.id} onClick={() => handleSelectSearchResult(cust)}>
                  <img src={cust.photo} alt={cust.name} className="avatar-xs" />
                  <div style={{ flex: 1 }}>
                    <span className="auto-name">{cust.name}</span>
                    <span className="auto-code"> ({cust.code})</span>
                  </div>
                  <span className="auto-hint">ກົດເພື່ອໄປຫາແຖວ <Sparkles size={12} color="#f59e0b" /></span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Filter & Add New Customer */}
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div className="filter-dropdown">
            <Filter size={16} color="var(--text-muted)" />
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="ALL">ສະຖານະທັງໝົດ (All Statuses)</option>
              <option value="ກຳລັງກູ້">ກຳລັງກູ້ (Green)</option>
              <option value="ອອບໄລນ໌">ອອບໄລນ໌ (Grey)</option>
              <option value="ຖືກແບນ">ຖືກແບນ (Purple)</option>
              <option value="ເລີ່ມມີບັນຫາ">ເລີ່ມມີບັນຫາ (Pink)</option>
              <option value="ປະຈານ">ປະຈານ (Orange)</option>
              <option value="ຈຳນວນໜີ້ຫຼາຍ">ຈຳນວນໜີ້ຫຼາຍ (Red)</option>
            </select>
          </div>

          {/* Interactive Zoom Slider & Fit Controls */}
          <div className="zoom-controls-group" style={{ gap: '8px' }}>
            <button
              type="button"
              className={`zoom-btn ${zoomPercent === 65 ? 'active' : ''}`}
              onClick={() => setZoomPercent(65)}
              title="ປັບຂະໜາດໃຫ້ເຫັນທຸກຄໍລຳໃນໜ້າຈໍ"
            >
              👁️ ເຫັນທັງໝົດ
            </button>
            <button
              type="button"
              className={`zoom-btn ${zoomPercent === 100 ? 'active' : ''}`}
              onClick={() => setZoomPercent(100)}
              title="ຂະໜາດມາດຕະຖານ 100%"
            >
              📐 ເຫັນພໍດີ
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', paddingLeft: '4px' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>🎚️ ປັບ:</span>
              <input
                type="range"
                min="50"
                max="150"
                value={zoomPercent}
                onChange={(e) => setZoomPercent(Number(e.target.value))}
                style={{ width: '90px', cursor: 'pointer' }}
              />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-purple)', minWidth: '38px' }}>
                {zoomPercent}%
              </span>
            </div>
          </div>

          <button className="btn-primary-emerald" onClick={onAddCustomer}>
            <UserPlus size={18} /> ເພີ່ມລູກຄ້າໃໝ່
          </button>
        </div>
      </div>

      {/* Responsive Data Table */}
      <div className="table-responsive-wrapper" style={{ marginTop: '24px', overflowX: 'auto' }}>
        <table
          className="customer-full-table"
          style={{
            transform: `scale(${zoomPercent / 100})`,
            transformOrigin: 'top left',
            width: `${100 / (zoomPercent / 100)}%`
          }}
        >
          <thead>
            <tr>
              <th>#</th>
              <th className="sticky-name-col">📌 ຮູບພາບ & ຊື່ລູກຄ້າ</th>
              <th>ລະຫັດ</th>
              <th>ໃບແຈ້ງໜີ້</th>
              <th>ດອກເບ້ຍ (%)</th>
              <th>ສະຖານະຂອງລູກຄ້າ</th>
              <th>ອາຍຸ</th>
              <th>ອາຊີບ</th>
              <th>ທີ່ຢູ່ປະຈຸບັນ</th>
              <th>ໂຮງຮຽນ / ບ່ອນທຳງານ</th>
              <th>ທີ່ຢູ່ ໂຮງຮຽນ/ບ່ອນທຳງານ</th>
              <th>Google Maps</th>
              <th>ສາຂາ/ຂະແໜງ</th>
              <th>ປີເລີ່ມ</th>
              <th>ປີຈົບ</th>
              <th>ຍອດກູ້ (ກີບ)</th>
              <th>ຍອດກູ້ (ຣູບລ໌)</th>
              <th>ຄັ້ງກູ້ (ກີບ)</th>
              <th>ຄັ້ງກູ້ (ຣູບລ໌)</th>
              <th>ຂາດຊຳລະ (ກີບ)</th>
              <th>ຂາດຊຳລະ (ຣູບລ໌)</th>
              <th>ຍອດກູ້ລວມ (ກີບ)</th>
              <th>ຍອດກູ້ລວມ (ຣູບລ໌)</th>
              <th>ກຳໄລລວມ (ກີບ)</th>
              <th>ກຳໄລລວມ (ຣູບລ໌)</th>
              <th>FB ຜູ້ກູ້</th>
              <th>FB ຜູ້ຄ້ຳ 1</th>
              <th>FB ຜູ້ຄ້ຳ 2</th>
              <th>FB ຜູ້ຄ້ຳ 3</th>
              <th>WhatsApp</th>
              <th>Drive ບັດ/ເອກະສານ</th>
              <th>ສັນຍາກູ້ຢືມ (Word)</th>
              <th>ປະຫວັດແຊັດ</th>
              <th>ຈັດການ</th>
            </tr>
          </thead>
          <tbody>
            {displayedCustomers.map((cust, index) => {
              const statuses = calculateCustomerStatuses(cust);
              const isGoldHighlighted = highlightedCustId === cust.id;

              // Statistics calculation
              const countLAK = cust.loanHistory?.filter((h) => h.amountLAK > 0).length || 0;
              const countRUB = cust.loanHistory?.filter((h) => h.amountRUB > 0).length || 0;
              const unpaidLAK = cust.loanHistory?.filter((h) => h.status === 'UNPAID' && h.amountLAK > 0).length || 0;
              const unpaidRUB = cust.loanHistory?.filter((h) => h.status === 'UNPAID' && h.amountRUB > 0).length || 0;
              const totalLAK = cust.loanHistory?.reduce((s, h) => s + (h.amountLAK || 0), 0) || 0;
              const totalRUB = cust.loanHistory?.reduce((s, h) => s + (h.amountRUB || 0), 0) || 0;
              const profitLAK = cust.loanHistory?.reduce((s, h) => s + (h.profitLAK || 0), 0) || 0;
              const profitRUB = cust.loanHistory?.reduce((s, h) => s + (h.profitRUB || 0), 0) || 0;

              return (
                <tr
                  key={cust.id}
                  ref={(el) => (rowRefs.current[cust.id] = el)}
                  className={isGoldHighlighted ? 'highlight-gold-row' : ''}
                >
                  {/* Row number */}
                  <td style={{ fontWeight: 600, color: 'var(--text-muted)' }}>{index + 1}</td>

                  {/* Photo & Name */}
                  <td className="sticky-name-col">
                    <div className="customer-name-cell">
                      <img src={cust.photo} alt={cust.name} className="avatar-compact" />
                      <div>
                        <span className="customer-title-name">{cust.name}</span>
                      </div>
                    </div>
                  </td>

                  {/* Code */}
                  <td>
                    <span className="code-pill">{cust.code}</span>
                  </td>

                  {/* Invoice Link */}
                  <td>
                    {cust.invoiceLink ? (
                      <a href={cust.invoiceLink} target="_blank" rel="noreferrer" className="table-link-btn">
                        <FileText size={14} /> ໃບແຈ້ງໜີ້
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* Interest Rate */}
                  <td style={{ fontWeight: 700, color: 'var(--accent-purple)' }}>{cust.interestRate}%</td>

                  {/* Statuses Column */}
                  <td>
                    <div className="status-tags-cell">
                      {statuses.map((st, i) => (
                        <span key={i} className={`status-badge-pill ${st.color}`}>
                          {st.label}
                        </span>
                      ))}

                      {/* Dropdown for Manual Overrides */}
                      <select
                        className="status-override-select"
                        value={cust.manualStatus || ''}
                        onChange={(e) => onUpdateManualStatus(cust.id, e.target.value || null)}
                        title="ກຳນົດສະຖານະ Dropdown ເອງ"
                      >
                        <option value="">-- ກຳນົດສະຖານະ --</option>
                        <option value="ຖືກແບນ">ຖືກແບນ (ສີມ່ວງ)</option>
                        <option value="ປະຈານ">ປະຈານ (ສີສົ້ມ)</option>
                        <option value="RESET">ອັດໂຕໂນມັດ</option>
                      </select>
                    </div>
                  </td>

                  {/* Age */}
                  <td>{cust.age} ປີ</td>

                  {/* Occupation */}
                  <td>{cust.occupation}</td>

                  {/* Current Address */}
                  <td>
                    {cust.currentAddress?.village}, {cust.currentAddress?.district}, {cust.currentAddress?.province}
                  </td>

                  {/* School or Workplace */}
                  <td>{cust.schoolOrWorkplace}</td>

                  {/* School/Workplace Address */}
                  <td>
                    {cust.schoolOrWorkplaceAddress?.village}, {cust.schoolOrWorkplaceAddress?.district},{' '}
                    {cust.schoolOrWorkplaceAddress?.province}
                  </td>

                  {/* Google Maps Link */}
                  <td>
                    {cust.googleMapsUrl ? (
                      <a href={cust.googleMapsUrl} target="_blank" rel="noreferrer" className="table-link-btn">
                        <MapPin size={14} /> Maps
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* Major */}
                  <td>{cust.major}</td>

                  {/* Start Year */}
                  <td>{cust.startYear}</td>

                  {/* Graduation Year */}
                  <td>{cust.graduationYear}</td>

                  {/* Active Loan LAK */}
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>
                    ₭ {cust.currentActiveLoanLAK?.toLocaleString() || 0}
                  </td>

                  {/* Active Loan RUB */}
                  <td style={{ fontWeight: 700, color: '#fbbf24' }}>
                    {cust.currentActiveLoanRUB?.toLocaleString() || 0} RUB
                  </td>

                  {/* LAK Loans Count */}
                  <td>{countLAK} ຄັ້ງ</td>

                  {/* RUB Loans Count */}
                  <td>{countRUB} ຄັ້ງ</td>

                  {/* Unpaid LAK Count */}
                  <td style={{ color: unpaidLAK > 0 ? '#f87171' : 'inherit', fontWeight: unpaidLAK > 0 ? 700 : 400 }}>
                    {unpaidLAK} ຄັ້ງ
                  </td>

                  {/* Unpaid RUB Count */}
                  <td style={{ color: unpaidRUB > 0 ? '#f87171' : 'inherit', fontWeight: unpaidRUB > 0 ? 700 : 400 }}>
                    {unpaidRUB} ຄັ້ງ
                  </td>

                  {/* Cumulative Loan LAK */}
                  <td>₭ {totalLAK.toLocaleString()}</td>

                  {/* Cumulative Loan RUB */}
                  <td>{totalRUB.toLocaleString()} RUB</td>

                  {/* Total Profit LAK */}
                  <td style={{ color: '#34d399', fontWeight: 700 }}>₭ {profitLAK.toLocaleString()}</td>

                  {/* Total Profit RUB */}
                  <td style={{ color: '#34d399', fontWeight: 700 }}>{profitRUB.toLocaleString()} RUB</td>

                  {/* FB Borrower */}
                  <td>
                    {cust.facebookBorrower ? (
                      <a href={cust.facebookBorrower} target="_blank" rel="noreferrer" className="table-link-btn">
                        <FacebookIcon size={14} /> FB
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* FB Guarantor 1 */}
                  <td>
                    {cust.facebookGuarantor1 ? (
                      <a href={cust.facebookGuarantor1} target="_blank" rel="noreferrer" className="table-link-btn">
                        <FacebookIcon size={14} /> ຜູ້ຄ້ຳ 1
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* FB Guarantor 2 */}
                  <td>
                    {cust.facebookGuarantor2 ? (
                      <a href={cust.facebookGuarantor2} target="_blank" rel="noreferrer" className="table-link-btn">
                        <FacebookIcon size={14} /> ຜູ້ຄ້ຳ 2
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* FB Guarantor 3 */}
                  <td>
                    {cust.facebookGuarantor3 ? (
                      <a href={cust.facebookGuarantor3} target="_blank" rel="noreferrer" className="table-link-btn">
                        <FacebookIcon size={14} /> ຜູ້ຄ້ຳ 3
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* WhatsApp */}
                  <td>
                    <span className="text-highlight">
                      <Phone size={13} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
                      {cust.whatsappNumber}
                    </span>
                  </td>

                  {/* Google Drive Link */}
                  <td>
                    {cust.driveDocumentsUrl ? (
                      <a
                        href={cust.driveDocumentsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="table-link-btn drive-btn"
                      >
                        <DriveIcon size={14} /> Drive
                      </a>
                    ) : (
                      <span className="text-muted">-</span>
                    )}
                  </td>

                  {/* Contract Word Editor */}
                  <td>
                    <button className="table-action-word-btn" onClick={() => onOpenContract(cust)}>
                      <FileText size={14} /> ສັນຍາ Word
                    </button>
                  </td>

                  {/* Chat Log History */}
                  <td>
                    <button className="table-action-chat-btn" onClick={() => onViewCustomerDetail(cust, 'chat')}>
                      <MessageSquare size={14} /> ແຊັດ ({cust.chatHistory?.length || 0})
                    </button>
                  </td>

                  {/* Quick Actions */}
                  <td>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        className="icon-btn-xs"
                        onClick={() => onViewCustomerDetail(cust, 'personal')}
                        title="ເບິ່ງຂໍ້ມູນລະອຽດ"
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="icon-btn-xs"
                        onClick={() => onEditCustomer(cust)}
                        title="ແກ້ໄຂ"
                      >
                        <Edit size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
