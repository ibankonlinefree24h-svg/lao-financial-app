import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Clock, FileText, Search, Filter } from 'lucide-react';

export default function AuditLogView() {
  const [searchTerm, setSearchTerm] = useState('');

  const logs = [
    { id: 'LOG-001', timestamp: '2026-08-24 08:15:22', user: 'manager', action: 'LOGIN_SUCCESS', details: 'ເຂົ້າສູ່ລະບົບຜູ້ຈັດການ ຈາກ IP 172.20.10.4', status: 'SUCCESS' },
    { id: 'LOG-002', timestamp: '2026-08-24 08:10:05', user: 'accountant', action: 'CREATE_TRANSACTION', details: 'ບັນທຶກລາຍຮັບ TX-001 ມູນຄ່າ 3,500,000 LAK', status: 'SUCCESS' },
    { id: 'LOG-003', timestamp: '2026-08-23 16:45:10', user: 'manager', action: 'APPROVE_TRANSACTION', details: 'ອະນຸມັດລາຍຈ່າຍ TX-002 ມູນຄ່າ 2,500 THB', status: 'SUCCESS' },
    { id: 'LOG-004', timestamp: '2026-08-23 14:20:00', user: 'accountant', action: 'UPDATE_EXCHANGE_RATE', details: 'ປັບອັດຕາແລກປ່ຽນ 1 USD = 22,500 LAK', status: 'SUCCESS' },
    { id: 'LOG-005', timestamp: '2026-08-22 11:05:44', user: 'auditor', action: 'EXPORT_REPORT', details: 'Export ລາຍງານ P&L ເປັນໄຟລ໌ Excel', status: 'SUCCESS' }
  ];

  const filteredLogs = logs.filter(
    (l) =>
      l.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>🛡️ Audit Trail & Log ຄວາມປອດໄພ (Security Audit Logs)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ບັນທຶກປະຫວັດການເຂົ້າລະບົບ, ການສ້າງ, ການອະນຸມັດ, ແລະ ການແກ້ໄຂຂໍ້ມູນແບບ Immutable
          </p>
        </div>

        <div className="search-bar-gold" style={{ width: '240px' }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="ຄົ້ນຫາ Log, IP, User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Logs Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div className="table-responsive-wrapper">
          <table className="customer-full-table">
            <thead>
              <tr>
                <th>ວັນທີ / ເວລາ</th>
                <th>ຜູ້ໃຊ້ (User)</th>
                <th>ການກະທຳ (Action)</th>
                <th>ລາຍລະອຽດ (Details)</th>
                <th>ສະຖານະ</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.82rem' }}>{log.timestamp}</td>
                  <td style={{ fontWeight: 700, color: '#c084fc' }}>👤 {log.user}</td>
                  <td><span className="tag tag-purple">{log.action}</span></td>
                  <td style={{ fontSize: '0.85rem' }}>{log.details}</td>
                  <td><span className="status-badge-pill green">🟢 {log.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
