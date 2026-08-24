import React, { useState } from 'react';
import { Building2, Users, Award, TrendingUp, ShieldCheck, CheckCircle, PlusCircle, Search } from 'lucide-react';

export default function BranchesStaffView() {
  const branches = [
    { id: 'BR-01', name: '🏢 ສາຂາ ໃຫຍ່ນະຄອນຫຼວງວຽງຈັນ (HQ)', manager: 'ສົມໄຊ ພິມມະສອນ', staffCount: 14, revenueLAK: 145000000, npl: '0.5%', status: 'ACTIVE' },
    { id: 'BR-02', name: '🏬 ສາຂາ ຫຼວງພະບາງ (Luang Prabang)', manager: 'ຈັນທະສອນ ວົງສາ', staffCount: 8, revenueLAK: 68000000, npl: '0.8%', status: 'ACTIVE' },
    { id: 'BR-03', name: '🌾 ສາຂາ ຈຳປາສັກ (Champasak)', manager: 'ມະລີວອນ ສຸລິຍາ', staffCount: 6, revenueLAK: 52000000, npl: '0.9%', status: 'ACTIVE' }
  ];

  const staffList = [
    { id: 'ST-001', name: 'ສົມໄຊ ພິມມະສອນ', role: 'Branch Manager', branch: 'ນະຄອນຫຼວງວຽງຈັນ', targetPercent: 115, status: 'TOP_PERFORMER' },
    { id: 'ST-002', name: 'ຈັນທະສອນ ວົງສາ', role: 'Senior Accountant', branch: 'ຫຼວງພະບາງ', targetPercent: 98, status: 'NORMAL' },
    { id: 'ST-003', name: 'ມະລີວອນ ສຸລິຍາ', role: 'Credit Officer', branch: 'ຈຳປາສັກ', targetPercent: 105, status: 'NORMAL' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>🏢 ຈັດການສາຂາ & ປະສິດທິພາບພະນັກງານ (Branches & Staff Performance)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ຕິດຕາມຍອດລາຍຮັບແຕ່ລະສາຂາ, KPI ພະນັກງານ, ແລະ ການກວດສອບສິດການໃຊ້ງານ
          </p>
        </div>

        <button className="btn-primary-emerald">
          <PlusCircle size={18} /> + ເພີ່ມສາຂາ/ພະນັກງານ
        </button>
      </div>

      {/* Branches Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {branches.map((b) => (
          <div key={b.id} className="glass-panel" style={{ padding: '20px', borderLeft: '4px solid #6366f1' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>{b.name}</span>
              <span className="tag tag-emerald">ACTIVE</span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '8px 0' }}>
              👨‍💼 ຜູ້ຈັດການ: <strong>{b.manager}</strong> ({b.staffCount} ພະນັກງານ)
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              NPL Ratio: <strong style={{ color: '#34d399' }}>{b.npl}</strong>
            </div>
            <h3 style={{ fontSize: '1.25rem', color: '#38bdf8', marginTop: '12px', fontWeight: 800 }}>
              ₭ {b.revenueLAK.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      {/* Staff Performance Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '14px' }}>👥 ລາຍຊື່ພະນັກງານ & KPI Target</h4>
        <div className="table-responsive-wrapper">
          <table className="customer-full-table">
            <thead>
              <tr>
                <th>ຊື່ພະນັກງານ</th>
                <th>ຕຳແໜ່ງ (Role)</th>
                <th>ສາຂາ (Branch)</th>
                <th>KPI Performance</th>
                <th>ສະຖານະ</th>
              </tr>
            </thead>
            <tbody>
              {staffList.map((s) => (
                <tr key={s.id}>
                  <td style={{ fontWeight: 700 }}>{s.name}</td>
                  <td>{s.role}</td>
                  <td>{s.branch}</td>
                  <td>
                    <span style={{ fontWeight: 800, color: s.targetPercent >= 100 ? '#34d399' : '#fbbf24' }}>
                      {s.targetPercent}%
                    </span>
                  </td>
                  <td>
                    <span className="status-badge-pill green">
                      {s.status === 'TOP_PERFORMER' ? '🏆 Top Performer' : '🟢 Normal'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
