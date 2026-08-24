import React, { useState } from 'react';
import { FileSpreadsheet, Download, Printer, BarChart3, TrendingUp, TrendingDown, DollarSign, Calendar, Filter } from 'lucide-react';

export default function FinancialReportsView({ transactions }) {
  const [reportType, setReportType] = useState('PNL'); // 'PNL', 'CASHFLOW', 'BALANCE_SHEET', 'COMPARISON'
  const [selectedYear, setSelectedYear] = useState('2026');

  let totalIncomeLAK = 0;
  let totalExpenseLAK = 0;

  transactions.forEach((tx) => {
    if (tx.type === 'INCOME') totalIncomeLAK += tx.amountLAKEquivalent || tx.amount;
    if (tx.type === 'EXPENSE') totalExpenseLAK += tx.amountLAKEquivalent || tx.amount;
  });

  const netProfitLAK = totalIncomeLAK - totalExpenseLAK;
  const profitMargin = totalIncomeLAK > 0 ? Math.round((netProfitLAK / totalIncomeLAK) * 100) : 0;

  const handleExport = (fmt) => {
    alert(`ລະບົບກຳລັງ Export ເອກະສານລາຍງານການເງິນເປັນໄຟລ໌ .${fmt} ໃຫ້ຮຽບຮ້ອຍ!`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner & Export Actions */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📈 ລາຍງານການເງິນ & ສົ່ງອອກຂໍ້ມູນ (Financial Statements & Export)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ລາຍງານກຳໄລ-ຂາດທຶນ (P&L), ລາຍງານກະແສເງິນສົດ (Cash Flow), ງົບດຸນ, ແລະ ການປຽບທຽບ MoM/YoY
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-primary-emerald" onClick={() => handleExport('xlsx')}>
            <FileSpreadsheet size={16} /> Export Excel (.xlsx)
          </button>
          <button className="icon-btn-xs" style={{ width: 'auto', padding: '8px 14px' }} onClick={() => handleExport('pdf')}>
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Sub-Report Type Tabs */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button className={`filter-pill-btn ${reportType === 'PNL' ? 'active' : ''}`} onClick={() => setReportType('PNL')}>
          📊 1. ລາຍງານກຳໄລ-ຂາດທຶນ (Profit & Loss)
        </button>
        <button className={`filter-pill-btn ${reportType === 'CASHFLOW' ? 'active' : ''}`} onClick={() => setReportType('CASHFLOW')}>
          🌊 2. ລາຍງານກະແສເງິນສົດ (Cash Flow Statement)
        </button>
        <button className={`filter-pill-btn ${reportType === 'BALANCE_SHEET' ? 'active' : ''}`} onClick={() => setReportType('BALANCE_SHEET')}>
          ⚖️ 3. ງົບດຸນການເງິນ (Balance Sheet)
        </button>
        <button className={`filter-pill-btn ${reportType === 'COMPARISON' ? 'active' : ''}`} onClick={() => setReportType('COMPARISON')}>
          🗓️ 4. ປຽບທຽບ MoM / YoY Comparison
        </button>
      </div>

      {/* Report Content View */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px' }}>
          {reportType === 'PNL' && '📊 ລາຍງານກຳໄລ-ຂາດທຶນ (Profit & Loss Statement - 2026)'}
          {reportType === 'CASHFLOW' && '🌊 ລາຍງານກະແສເງິນສົດ (Cash Flow Statement)'}
          {reportType === 'BALANCE_SHEET' && '⚖️ ງົບດຸນການເງິນ (Financial Balance Sheet)'}
          {reportType === 'COMPARISON' && '🗓️ ການປຽບທຽບລາຍຮັບ-ລາຍຈ່າຍ (MoM / YoY Comparison)'}
        </h4>

        <div className="table-responsive-wrapper">
          <table className="customer-full-table">
            <thead>
              <tr>
                <th>ລາຍການ (Financial Item)</th>
                <th>ມູນຄ່າລວມເປັນກີບ (LAK Eq.)</th>
                <th>ສັດສ່ວນ (%)</th>
                <th>ຄຳອະທິບາຍ & ສະຖານະ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: '#34d399' }}>🟢 ລາຍຮັບລວມ (Total Revenues)</td>
                <td style={{ fontWeight: 700, color: '#34d399' }}>₭ {totalIncomeLAK.toLocaleString()}</td>
                <td>100%</td>
                <td><span className="tag tag-emerald">ລາຍຮັບ</span></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: '#f87171' }}>🔴 ລາຍຈ່າຍລວມ (Total Operating Expenses)</td>
                <td style={{ fontWeight: 700, color: '#f87171' }}>₭ {totalExpenseLAK.toLocaleString()}</td>
                <td>{totalIncomeLAK > 0 ? Math.round((totalExpenseLAK / totalIncomeLAK) * 100) : 0}%</td>
                <td><span className="tag tag-pink">ຄ່າໃຊ້ຈ່າຍ</span></td>
              </tr>
              <tr style={{ background: 'rgba(56, 189, 248, 0.12)' }}>
                <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1.05rem' }}>💰 ກຳໄລ/ເງິນອອມສຸດທິ (Net Income / Profit)</td>
                <td style={{ fontWeight: 800, color: '#38bdf8', fontSize: '1.05rem' }}>₭ {netProfitLAK.toLocaleString()}</td>
                <td style={{ fontWeight: 800, color: '#38bdf8' }}>{profitMargin}%</td>
                <td><span className="tag tag-blue">ກຳໄລສຸດທິ</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
