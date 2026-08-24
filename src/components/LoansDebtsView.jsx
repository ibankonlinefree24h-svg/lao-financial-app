import React, { useState } from 'react';
import { Banknote, ShieldAlert, TrendingUp, Users, Calendar, ArrowUpRight, Search, PlusCircle, FileText } from 'lucide-react';
import MonthlyLoanTable from './MonthlyLoanTable';

export default function LoansDebtsView({ monthlyLoans, setMonthlyLoans }) {
  const [activeCurrency, setActiveCurrency] = useState('LAK');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>🏦 ບໍລິຫານໜີ້ສິນ - ເງິນກູ້ (Loans & Credit Portfolio)</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ຕິດຕາມສິນເຊື່ອ, ດອກເບ້ຍ, NPL Ratio (0.7%), ແລະ ວຽກຕິດຕາມໜີ້ປະຈຳເດືອນ
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <span style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700 }}>
            🟢 NPL Ratio: 0.7% (ຕ່ຳກວ່າເກນຄວາມສ່ຽງ)
          </span>
        </div>
      </div>

      {/* Render Monthly Loans Management */}
      <MonthlyLoanTable monthlyLoans={monthlyLoans} setMonthlyLoans={setMonthlyLoans} />
    </div>
  );
}
