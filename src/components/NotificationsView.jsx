import React from 'react';
import { Bell, AlertTriangle, CheckCircle, Info, Clock, ArrowRight } from 'lucide-react';

export default function NotificationsView() {
  const alerts = [
    { id: 'ALT-01', title: '🟡 ເຄື່ອງໝາຍເຝົ້າລະວັງງົບປະມານ Ads ໂຄສະນາ', desc: 'ງົບປະມານ Ads ໃຊ້ໄປແລ້ວ 67% ຂອງເພດານ 4,000,000 ກີບ', type: 'WARNING', time: '10 ນາທີກ່ອນ' },
    { id: 'ALT-02', title: '🟢 ຮັບຊຳລະດອກເບ້ຍສິນເຊື່ອ 3,500,000 ກີບ', desc: 'ສົມໄຊ ພິມມະສອນ ໂອນຊຳລະຜ່ານ BCEL One ຮຽບຮ້ອຍ', type: 'SUCCESS', time: '1 ຊົ່ວໂມງກ່ອນ' },
    { id: 'ALT-03', title: '🛡️ ລະບົບປົກປ້ອງຄວາມປອດໄພ Active', desc: 'ກວດບໍ່ພົບການເຂົ້າລະບົບທີ່ຜິດປົກກະຕິໃນ 24 ຊົ່ວໂມງ', type: 'INFO', time: '3 ຊົ່ວໂມງກ່ອນ' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '16px' }}>🔔 ການແຈ້ງເຕືອນ & ການແຈ້ງເຕືອນຄວາມສ່ຽງ (Notifications & Alerts)</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {alerts.map((a) => (
            <div
              key={a.id}
              className="glass-panel"
              style={{
                padding: '16px',
                background: a.type === 'WARNING' ? 'rgba(245,158,11,0.1)' : a.type === 'SUCCESS' ? 'rgba(16,185,129,0.1)' : 'rgba(99,102,241,0.1)',
                borderLeft: `4px solid ${a.type === 'WARNING' ? '#f59e0b' : a.type === 'SUCCESS' ? '#10b981' : '#6366f1'}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{a.title}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{a.time}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '6px 0 0' }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
