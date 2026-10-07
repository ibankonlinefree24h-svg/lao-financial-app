import React, { useState } from 'react';
import {
  Search,
  Plus,
  FileSpreadsheet,
  FileText,
  MapPin,
  Folder,
  Edit2,
  Eye,
  Trash2,
  Copy,
  Check,
  ChevronDown,
  User,
  ZoomIn,
  ZoomOut,
  Moon,
  Grid,
  Menu,
  Briefcase
} from 'lucide-react';

export default function CustomerTable({
  customers = [],
  onAddCustomer,
  onEditCustomer,
  onViewCustomerDetail,
  onOpenContract,
  onDeleteCustomer,
  onToggleSidebar,
  onToggleTheme,
  theme = 'dark'
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [zoomLevel, setZoomLevel] = useState(50); // Default to 50% as in screenshot!
  const [copiedId, setCopiedId] = useState(null);

  // Filter customers
  const filteredCustomers = customers.filter((cust) => {
    const matchesSearch =
      !searchTerm ||
      cust.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.occupation?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cust.currentAddress?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || cust.status === statusFilter;

    const matchesRole =
      roleFilter === 'ALL' || cust.role === roleFilter;

    return matchesSearch && matchesStatus && matchesRole;
  });

  const handleCopyLink = (cust) => {
    const link = `${window.location.origin}/?customer=${cust.code}`;
    navigator.clipboard?.writeText(link);
    setCopiedId(cust.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportExcel = () => {
    // Generate CSV format with BOM for Lao language support in Excel
    const headers = [
      'ສະຖານະ',
      'ຊື່ລູກຄ້າ',
      'ID',
      'ອາຍຸ',
      'ອາຊີບ',
      'ທີ່ຢູ່ປະຈຸບັນ',
      'ໂຮງຮຽນ ແລະ ທີ່ຢູ່',
      'ບ່ອນເຮັດວຽກ ແລະ ທີ່ຢູ່',
      'ສາຂາ / ຂະແໜງ',
      'ປີເລີ່ມຮຽນ',
      'ປີຈົບ',
      'ບົດບາດ',
      'ປະເທດ',
      'ຍອດເງິນກູ້ (ກີບ)',
      'ຍອດເງິນກູ້ (RUB)',
      'ຄັ້ງຊຳລະ (ກີບ)',
      'ຄັ້ງຊຳລະ (ຣູບີ)',
      'ຍອດກູ້ລວມ (ກີບ)',
      'ຍອດກູ້ລວມ (ຣູບີ)',
      'ກຳໄລລວມ (ກີບ)',
      'ກຳໄລລວມ (ຣູບີ)',
      'ຍອດຄົງເຫຼືອ (LAK)',
      'ຍອດຄົງເຫຼືອ (RUB)',
      'WHATSAPP'
    ];

    const rows = filteredCustomers.map((c) => [
      `"${c.status || ''}"`,
      `"${c.name || ''}"`,
      `"${c.code || ''}"`,
      `"${c.age || '-'}"`,
      `"${c.occupation || '-'}"`,
      `"${c.currentAddress || '-'}"`,
      `"${c.school || '-'}"`,
      `"${c.workplace || '-'}"`,
      `"${c.major || '-'}"`,
      `"${c.startYear || '-'}"`,
      `"${c.graduationYear || '-'}"`,
      `"${c.role || '-'}"`,
      `"${c.country || '-'}"`,
      `"${c.currentLoanLAK || 0}"`,
      `"${c.currentLoanRUB || 0}"`,
      `"${c.repaymentCountLAK || '-'}"`,
      `"${c.repaymentCountRUB || '-'}"`,
      `"${c.totalLoanLAK || 0}"`,
      `"${c.totalLoanRUB || 0}"`,
      `"${c.totalProfitLAK || 0}"`,
      `"${c.totalProfitRUB || 0}"`,
      `"${c.remainingBalanceLAK || 0}"`,
      `"${c.remainingBalanceRUB || 0}"`,
      `"${c.whatsapp || ''}"`
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `customer_database_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const changeZoom = (delta) => {
    setZoomLevel((prev) => {
      const next = prev + delta;
      if (next < 40) return 40;
      if (next > 120) return 120;
      return next;
    });
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#0b0f19', color: '#f1f5f9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* 🌟 1. TOP NAVIGATION BAR (As shown in screenshot) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '12px 24px',
          background: 'rgba(11, 15, 25, 0.95)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          gap: '16px',
          flexWrap: 'wrap'
        }}
      >
        {/* Left: Hamburger & Search Input */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '18px', flex: '1', maxWidth: '580px' }}>
          <button
            onClick={onToggleSidebar}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '6px'
            }}
            title="Toggle Menu"
          >
            <Menu size={22} />
          </button>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#161f30',
              borderRadius: '9999px',
              padding: '8px 18px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              width: '100%',
              gap: '10px'
            }}
          >
            <Search size={18} color="#64748b" />
            <input
              type="text"
              placeholder="ຄົ້ນຫາຂໍ້ມູນ ຫຼື ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#f8fafc',
                fontSize: '0.92rem',
                width: '100%'
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Right: Currency / Theme / Language / Zoom / User */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Currency Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 14px',
              background: '#161f30',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#e2e8f0',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Briefcase size={15} color="#94a3b8" />
            <span>LAK K</span>
          </div>

          {/* Dark Mode Moon */}
          <button
            onClick={onToggleTheme}
            style={{
              background: '#161f30',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme === 'dark' ? '#fbbf24' : '#38bdf8',
              cursor: 'pointer'
            }}
            title="Toggle Theme"
          >
            <Moon size={17} />
          </button>

          {/* Language Flag Selector */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '6px 12px',
              background: '#161f30',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 600,
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <span style={{ fontSize: '1rem' }}>🇱🇦</span>
            <span>LA</span>
            <ChevronDown size={14} color="#94a3b8" />
          </div>

          {/* Grid Icon */}
          <div
            style={{
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94a3b8',
              background: '#161f30',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <Grid size={18} />
          </div>

          {/* Zoom Controls (50% with - and +) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#161f30',
              borderRadius: '10px',
              padding: '3px 6px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              gap: '4px'
            }}
          >
            <button
              onClick={() => changeZoom(-10)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
              title="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '0 6px', color: '#f1f5f9' }}>{zoomLevel}%</span>
            <button
              onClick={() => changeZoom(10)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '4px', display: 'flex', alignItems: 'center' }}
              title="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
          </div>

          {/* User Avatar with red notification badge */}
          <div style={{ position: 'relative' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #ef4444, #f97316)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                color: 'white',
                fontSize: '0.9rem',
                border: '2px solid rgba(255,255,255,0.2)'
              }}
            >
              1
            </div>
            <span
              style={{
                position: 'absolute',
                top: '-2px',
                right: '-2px',
                width: '12px',
                height: '12px',
                background: '#ef4444',
                borderRadius: '50%',
                border: '2px solid #0b0f19'
              }}
            />
          </div>
        </div>
      </div>

      {/* 🌟 2. PAGE TITLE & ACTION HEADER */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 28px 18px',
          flexWrap: 'wrap',
          gap: '18px'
        }}
      >
        {/* Title: ຈັດການຜູ້ໃຊ້ */}
        <h1
          style={{
            fontSize: '2.4rem',
            fontWeight: 800,
            margin: 0,
            color: '#f8fafc',
            fontFamily: "'Phetsarath OT', 'Noto Sans Lao', system-ui, sans-serif",
            letterSpacing: '0.5px'
          }}
        >
          ຈັດການຜູ້ໃຊ້
        </h1>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Dropdown 1: ທຸກສະຖານະ */}
          <div style={{ position: 'relative' }}>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                appearance: 'none',
                background: '#161f30',
                color: '#f1f5f9',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '10px 38px 10px 18px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '150px'
              }}
            >
              <option value="ALL">ທຸກສະຖານະ</option>
              <option value="ລໍຖ້າກວດສອບ">🟡 ລໍຖ້າກວດສອບ (ໃໝ່)</option>
              <option value="ກຳລັງກູ້">ກຳລັງກູ້</option>
              <option value="ອະນຸມັດ">ອະນຸມັດ</option>
            </select>
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', display: 'flex', flexDirection: 'column', color: '#64748b' }}>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Dropdown 2: ທັງໝົດ */}
          <div style={{ position: 'relative' }}>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{
                appearance: 'none',
                background: '#161f30',
                color: '#f1f5f9',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                padding: '10px 38px 10px 18px',
                fontSize: '0.95rem',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '120px'
              }}
            >
              <option value="ALL">ທັງໝົດ</option>
              <option value="Group A">Group A</option>
              <option value="Group B">Group B</option>
            </select>
            <div style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Button 1: ບັນທຶກເປັນ Excel */}
          <button
            onClick={handleExportExcel}
            style={{
              background: '#e6f9f0',
              color: '#059669',
              border: 'none',
              borderRadius: '12px',
              padding: '11px 22px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 2px 10px rgba(5, 150, 105, 0.15)',
              transition: 'transform 0.15s ease'
            }}
          >
            <span>ບັນທຶກເປັນ Excel</span>
          </button>

          {/* Button 2: + ເພີ່ມຜູ້ໃຊ້ */}
          <button
            onClick={onAddCustomer}
            style={{
              background: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '12px',
              padding: '11px 24px',
              fontSize: '0.95rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
              transition: 'transform 0.15s ease'
            }}
          >
            <Plus size={18} />
            <span>+ ເພີ່ມຜູ້ໃຊ້</span>
          </button>
        </div>
      </div>

      {/* 🌟 3. MAIN TABLE WITH SCROLL & SCALE */}
      <div
        style={{
          padding: '0 24px 30px',
          overflowX: 'auto',
          width: '100%'
        }}
      >
        <div
          style={{
            transformOrigin: 'top left',
            zoom: `${zoomLevel}%`,
            minWidth: '3200px',
            background: 'rgba(15, 23, 42, 0.7)',
            borderRadius: '16px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden'
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '0.9rem'
            }}
          >
            {/* TABLE HEADER (37 COLUMNS) */}
            <thead>
              <tr
                style={{
                  background: '#0d1527',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  whiteSpace: 'nowrap'
                }}
              >
                <th style={{ padding: '16px 14px' }}>ສະຖານະ</th>
                <th style={{ padding: '16px 10px', textAlign: 'center' }}>ໂປຣໄຟລ໌</th>
                <th style={{ padding: '16px 14px' }}>ຊື່ລູກຄ້າ</th>
                <th style={{ padding: '16px 12px' }}>ID</th>
                <th style={{ padding: '16px 10px', textAlign: 'center' }}>ໃບຢັ້ງຢືນ</th>
                <th style={{ padding: '16px 12px' }}>ດອກເບ້ຍ (%)</th>
                <th style={{ padding: '16px 10px', textAlign: 'center' }}>ອາຍຸ</th>
                <th style={{ padding: '16px 14px' }}>ອາຊີບ</th>
                <th style={{ padding: '16px 14px' }}>ທີ່ຢູ່ປະຈຸບັນ</th>
                <th style={{ padding: '16px 14px' }}>ໂຮງຮຽນ ແລະ ທີ່ຢູ່</th>
                <th style={{ padding: '16px 14px' }}>ບ່ອນເຮັດວຽກ ແລະ ທີ່ຢູ່</th>
                <th style={{ padding: '16px 14px' }}>ສາຂາ / ຂະແໜງ</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ປີເລີ່ມຮຽນ</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ປີຈົບ</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ບົດບາດ</th>
                <th style={{ padding: '16px 10px', textAlign: 'center' }}>ປະເທດ</th>
                <th style={{ padding: '16px 14px' }}>ຍອດເງິນກູ້</th>
                <th style={{ padding: '16px 14px' }}>ຍອດເງິນກູ້ (RUB)</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ຄັ້ງຊຳລະ (ກີບ)</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ຄັ້ງຊຳລະ (ຣູບີ)</th>
                <th style={{ padding: '16px 14px' }}>ຍອດກູ້ລວມ (ກີບ)</th>
                <th style={{ padding: '16px 14px' }}>ຍອດກູ້ລວມ (ຣູບີ)</th>
                <th style={{ padding: '16px 14px' }}>ກຳໄລລວມ (ກີບ)</th>
                <th style={{ padding: '16px 14px' }}>ກຳໄລລວມ (ຣູບີ)</th>
                <th style={{ padding: '16px 14px' }}>ຍອດຄົງເຫຼືອ (LAK)</th>
                <th style={{ padding: '16px 14px' }}>ຍອດຄົງເຫຼືອ (RUB)</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>FB ຜູ້ກູ້</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>FB ຜູ້ຄໍ້າ 1</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>FB ຜູ້ຄໍ້າ 2</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>FB ຜູ້ຄໍ້າ 3</th>
                <th style={{ padding: '16px 16px' }}>WHATSAPP</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ແຜນທີ່ (Map)</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>DRIVE ບັດ/ເອກະສານ</th>
                <th style={{ padding: '16px 14px', textAlign: 'center' }}>ສັນຍາກູ້ຢືມ</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ປະຫວັດແຊັດ</th>
                <th style={{ padding: '16px 12px', textAlign: 'center' }}>ລິ້ງລູກຄ້າ</th>
                <th style={{ padding: '16px 14px', textAlign: 'center' }}>ຈັດການ</th>
              </tr>
            </thead>

            {/* TABLE ROWS */}
            <tbody>
              {filteredCustomers.map((cust, idx) => {
                const isApproved = cust.status === 'ອະນຸມັດ';
                return (
                  <tr
                    key={cust.id || idx}
                    style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                      background: idx % 2 === 0 ? 'rgba(15, 23, 42, 0.35)' : 'rgba(20, 29, 47, 0.5)',
                      transition: 'background 0.15s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(30, 41, 59, 0.8)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = idx % 2 === 0 ? 'rgba(15, 23, 42, 0.35)' : 'rgba(20, 29, 47, 0.5)';
                    }}
                  >
                    {/* 1. ສະຖານະ */}
                    <td style={{ padding: '14px 14px' }}>
                      {cust.status === 'ລໍຖ້າກວດສອບ' ? (
                        <span
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '5px 12px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            background: 'rgba(245, 158, 11, 0.2)',
                            color: '#fbbf24',
                            border: '1px solid rgba(245, 158, 11, 0.45)',
                            boxShadow: '0 0 10px rgba(245, 158, 11, 0.25)'
                          }}
                        >
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }}></span>
                          ລໍຖ້າກວດສອບ
                        </span>
                      ) : (
                        <span
                          style={{
                            display: 'inline-block',
                            padding: '5px 14px',
                            borderRadius: '9999px',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            background: isApproved ? 'rgba(16, 185, 129, 0.15)' : 'rgba(56, 189, 248, 0.12)',
                            color: isApproved ? '#34d399' : '#e2e8f0',
                            border: `1px solid ${isApproved ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.15)'}`
                          }}
                        >
                          {cust.status}
                        </span>
                      )}
                    </td>

                    {/* 2. ໂປຣໄຟລ໌ */}
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      {cust.photo ? (
                        <img
                          src={cust.photo}
                          alt={cust.name}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            border: '1px solid rgba(255, 255, 255, 0.2)'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            background: '#1e293b',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#64748b',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}
                        >
                          <User size={18} />
                        </div>
                      )}
                    </td>

                    {/* 3. ຊື່ລູກຄ້າ */}
                    <td style={{ padding: '14px 14px', fontWeight: 600, color: '#f8fafc', whiteSpace: 'nowrap' }}>
                      {cust.name}
                    </td>

                    {/* 4. ID */}
                    <td style={{ padding: '14px 12px', color: '#94a3b8', fontFamily: 'monospace', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.code}
                    </td>

                    {/* 5. ໃບຢັ້ງຢືນ */}
                    <td style={{ padding: '14px 10px', textAlign: 'center' }}>
                      <button
                        onClick={() => onViewCustomerDetail && onViewCustomerDetail(cust)}
                        style={{
                          background: '#1e3a8a',
                          border: 'none',
                          borderRadius: '8px',
                          width: '30px',
                          height: '30px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#60a5fa',
                          cursor: 'pointer'
                        }}
                        title="ເບິ່ງໃບຢັ້ງຢືນ"
                      >
                        <FileText size={15} />
                      </button>
                    </td>

                    {/* 6. ດອກເບ້ຍ (%) */}
                    <td style={{ padding: '14px 12px', whiteSpace: 'nowrap' }}>
                      {cust.interestRates && cust.interestRates.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '0.82rem', fontWeight: 600 }}>
                          {cust.interestRates.map((r, i) => (
                            <span key={i} style={{ color: r.code === 'K' ? '#38bdf8' : '#fbbf24' }}>
                              {r.code} {r.rate}%
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span style={{ color: '#64748b' }}>-</span>
                      )}
                    </td>

                    {/* 7. ອາຍຸ */}
                    <td style={{ padding: '14px 10px', textAlign: 'center', color: '#cbd5e1' }}>
                      {cust.age !== null && cust.age !== undefined ? cust.age : '-'}
                    </td>

                    {/* 8. ອາຊີບ */}
                    <td style={{ padding: '14px 14px', color: '#94a3b8', whiteSpace: 'nowrap' }}>
                      {cust.occupation || '-'}
                    </td>

                    {/* 9. ທີ່ຢູ່ປະຈຸບັນ */}
                    <td style={{ padding: '14px 14px', color: '#94a3b8', whiteSpace: 'nowrap', maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {cust.currentAddress || '-'}
                    </td>

                    {/* 10. ໂຮງຮຽນ ແລະ ທີ່ຢູ່ */}
                    <td style={{ padding: '14px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {cust.school || '-'}
                    </td>

                    {/* 11. ບ່ອນເຮັດວຽກ ແລະ ທີ່ຢູ່ */}
                    <td style={{ padding: '14px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {cust.workplace || '-'}
                    </td>

                    {/* 12. ສາຂາ / ຂະແໜງ */}
                    <td style={{ padding: '14px 14px', color: '#64748b', whiteSpace: 'nowrap' }}>
                      {cust.major || '-'}
                    </td>

                    {/* 13. ປີເລີ່ມຮຽນ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center', color: '#64748b' }}>
                      {cust.startYear || '-'}
                    </td>

                    {/* 14. ປີຈົບ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center', color: '#64748b' }}>
                      {cust.graduationYear || '-'}
                    </td>

                    {/* 15. ບົດບາດ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          background: 'rgba(59, 130, 246, 0.15)',
                          color: '#60a5fa',
                          border: '1px solid rgba(59, 130, 246, 0.3)'
                        }}
                      >
                        {cust.role || 'Group A'}
                      </span>
                    </td>

                    {/* 16. ປະເທດ */}
                    <td style={{ padding: '14px 10px', textAlign: 'center', fontSize: '1.2rem' }}>
                      {cust.country || '🇱🇦'}
                    </td>

                    {/* 17. ຍອດເງິນກູ້ (ກີບ) */}
                    <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                      {cust.currentLoanLAK ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#38bdf8', fontWeight: 700 }}>
                            ₭ {cust.currentLoanLAK.toLocaleString()}
                          </span>
                          {cust.currentLoanLAKCount && (
                            <span
                              style={{
                                background: '#1e293b',
                                color: '#94a3b8',
                                fontSize: '0.72rem',
                                padding: '2px 6px',
                                borderRadius: '9999px',
                                border: '1px solid rgba(255,255,255,0.1)'
                              }}
                            >
                              {cust.currentLoanLAKCount}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: '#64748b' }}>0</span>
                      )}
                    </td>

                    {/* 18. ຍອດເງິນກູ້ (RUB) */}
                    <td style={{ padding: '14px 14px', whiteSpace: 'nowrap' }}>
                      {cust.currentLoanRUB ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ color: '#fbbf24', fontWeight: 700 }}>
                            {cust.currentLoanRUB.toLocaleString()} RUB
                          </span>
                          {cust.currentLoanRUBCount && (
                            <span
                              style={{
                                background: 'rgba(251, 191, 36, 0.15)',
                                color: '#fbbf24',
                                fontSize: '0.72rem',
                                padding: '2px 6px',
                                borderRadius: '9999px',
                                border: '1px solid rgba(251, 191, 36, 0.3)'
                              }}
                            >
                              {cust.currentLoanRUBCount}
                            </span>
                          )}
                        </div>
                      ) : (
                        <span style={{ color: '#64748b' }}>-</span>
                      )}
                    </td>

                    {/* 19. ຄັ້ງຊຳລະ (ກີບ) */}
                    <td style={{ padding: '14px 12px', textAlign: 'center', color: '#cbd5e1' }}>
                      {cust.repaymentCountLAK ? `${cust.repaymentCountLAK} ຄັ້ງ` : '-'}
                    </td>

                    {/* 20. ຄັ້ງຊຳລະ (ຣູບີ) */}
                    <td style={{ padding: '14px 12px', textAlign: 'center', color: '#cbd5e1' }}>
                      {cust.repaymentCountRUB ? `${cust.repaymentCountRUB} ຄັ້ງ` : '-'}
                    </td>

                    {/* 21. ຍອດກູ້ລວມ (ກີບ) */}
                    <td style={{ padding: '14px 14px', color: '#f1f5f9', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.totalLoanLAK ? `₭ ${cust.totalLoanLAK.toLocaleString()}` : '0'}
                    </td>

                    {/* 22. ຍອດກູ້ລວມ (ຣູບີ) */}
                    <td style={{ padding: '14px 14px', color: '#fbbf24', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.totalLoanRUB ? `${cust.totalLoanRUB.toLocaleString()} RUB` : '-'}
                    </td>

                    {/* 23. ກຳໄລລວມ (ກີບ) */}
                    <td style={{ padding: '14px 14px', color: '#34d399', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.totalProfitLAK ? `₭ ${cust.totalProfitLAK.toLocaleString()}` : '0'}
                    </td>

                    {/* 24. ກຳໄລລວມ (ຣູບີ) */}
                    <td style={{ padding: '14px 14px', color: '#fbbf24', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.totalProfitRUB ? `${cust.totalProfitRUB.toLocaleString()} RUB` : '-'}
                    </td>

                    {/* 25. ຍອດຄົງເຫຼືອ (LAK) */}
                    <td style={{ padding: '14px 14px', color: '#f87171', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.remainingBalanceLAK ? `₭ ${cust.remainingBalanceLAK.toLocaleString()}` : '0'}
                    </td>

                    {/* 26. ຍອດຄົງເຫຼືອ (RUB) */}
                    <td style={{ padding: '14px 14px', color: '#fbbf24', fontWeight: 600, whiteSpace: 'nowrap' }}>
                      {cust.remainingBalanceRUB ? `${cust.remainingBalanceRUB.toLocaleString()} RUB` : '-'}
                    </td>

                    {/* 27. FB ຜູ້ກູ້ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        - <Edit2 size={13} style={{ cursor: 'pointer' }} />
                      </span>
                    </td>

                    {/* 28. FB ຜູ້ຄໍ້າ 1 */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        - <Edit2 size={13} style={{ cursor: 'pointer' }} />
                      </span>
                    </td>

                    {/* 29. FB ຜູ້ຄໍ້າ 2 */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        - <Edit2 size={13} style={{ cursor: 'pointer' }} />
                      </span>
                    </td>

                    {/* 30. FB ຜູ້ຄໍ້າ 3 */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: '#64748b' }}>
                        - <Edit2 size={13} style={{ cursor: 'pointer' }} />
                      </span>
                    </td>

                    {/* 31. WHATSAPP */}
                    <td style={{ padding: '14px 16px', whiteSpace: 'nowrap' }}>
                      {cust.whatsapp ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#22c55e', fontSize: '1.1rem' }}>💬</span>
                          <a
                            href={`https://wa.me/${cust.whatsapp.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: '#e2e8f0', textDecoration: 'none', fontSize: '0.86rem' }}
                          >
                            {cust.whatsapp}
                          </a>
                          <Edit2 size={13} color="#64748b" style={{ cursor: 'pointer' }} />
                        </div>
                      ) : (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ color: '#22c55e' }}>💬</span>
                          <Edit2 size={13} color="#64748b" style={{ cursor: 'pointer' }} />
                        </div>
                      )}
                    </td>

                    {/* 32. ແຜນທີ່ (Map) */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <a
                          href={cust.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(cust.currentAddress || '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: '#ffffff',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                          }}
                        >
                          <MapPin size={16} color="#ef4444" />
                        </a>
                        <Edit2 size={13} color="#64748b" style={{ cursor: 'pointer' }} />
                      </div>
                    </td>

                    {/* 33. DRIVE ບັດ/ເອກະສານ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <a
                        href={cust.driveUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'rgba(30, 58, 138, 0.4)',
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                          color: '#60a5fa',
                          textDecoration: 'none',
                          fontSize: '0.82rem',
                          fontWeight: 600
                        }}
                      >
                        <Folder size={14} />
                        <span>Drive</span>
                      </a>
                    </td>

                    {/* 34. ສັນຍາກູ້ຢືມ */}
                    <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                      <button
                        onClick={() => onOpenContract && onOpenContract(cust)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'rgba(30, 58, 138, 0.4)',
                          border: '1px solid rgba(59, 130, 246, 0.4)',
                          color: '#60a5fa',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        <FileText size={14} />
                        <span>ສັນຍາກູ້ຢືມ ({cust.contractsCount || 1})</span>
                      </button>
                    </td>

                    {/* 35. ປະຫວັດແຊັດ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <button
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '8px',
                            background: 'rgba(30, 58, 138, 0.4)',
                            border: '1px solid rgba(59, 130, 246, 0.4)',
                            color: '#60a5fa',
                            fontSize: '0.82rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          <span>💬 ແຊັດ ({cust.chatCount || 0})</span>
                        </button>
                        <Edit2 size={13} color="#64748b" style={{ cursor: 'pointer' }} />
                      </div>
                    </td>

                    {/* 36. ລິ້ງລູກຄ້າ */}
                    <td style={{ padding: '14px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => handleCopyLink(cust)}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          padding: '6px 14px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.08)',
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          color: copiedId === cust.id ? '#34d399' : '#f1f5f9',
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          cursor: 'pointer'
                        }}
                      >
                        {copiedId === cust.id ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedId === cust.id ? 'Copied!' : 'Copy Link'}</span>
                      </button>
                    </td>

                    {/* 37. ຈັດການ (Actions) */}
                    <td style={{ padding: '14px 14px', textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => onViewCustomerDetail && onViewCustomerDetail(cust)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="ເບິ່ງລາຍລະອຽດ"
                        >
                          <Eye size={17} />
                        </button>
                        <button
                          onClick={() => onEditCustomer && onEditCustomer(cust)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#94a3b8',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="ແກ້ໄຂ"
                        >
                          <Edit2 size={17} />
                        </button>
                        <button
                          onClick={() => onDeleteCustomer && onDeleteCustomer(cust.id)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                          title="ລຶບ"
                        >
                          <Trash2 size={17} />
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
    </div>
  );
}
