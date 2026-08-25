import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';
let content = fs.readFileSync(filepath, 'utf8');

const oldKpiSection = `      {/* 4. Executive KPI Cards */}
      <div className="preview-grid" style={{ margin: 0 }}>
        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))', borderColor: 'rgba(16, 185, 129, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>🟢 ລາຍຮັບລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowUpRight size={15} /> ດອກເບ້ຍສິນເຊື່ອ (Loan Interest Revenue)
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '14px' }}>
            <TrendingUp size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.12), rgba(185, 28, 28, 0.08))', borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>🔴 ລາຍຈ່າຍລວມຕັ້ງແຕ່ເລີ່ມກໍ່ຕັ້ງ (2025 - 2026)</p>
            <h3 style={{ color: '#f87171', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '6px', fontWeight: 600 }}>
              <ArrowDownRight size={15} /> Ads ໂຄສະນາ, ເງິນເດືອນ, IT Server
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '14px' }}>
            <TrendingDown size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(2, 132, 199, 0.1))', borderColor: 'rgba(6, 182, 212, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>💰 ກຳໄລສຸດທິລວມ (Net Profit)</p>
            <h3 style={{ color: '#38bdf8', fontSize: '1.5rem', fontWeight: 800 }}>₭ {allTimeSummary.netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-cyan)', marginTop: '6px', fontWeight: 700 }}>
              ອັດຕາກຳໄລລວມ: {allTimeSummary.overallProfitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', borderRadius: '14px' }}>
            <Wallet size={26} />
          </div>
        </div>

        <div className="glass-panel kpi-card" style={{ background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)', borderRadius: '18px' }}>
          <div className="kpi-info">
            <p>💳 ເງິນສົດ & ບັນຊີຄົງເຫຼືອລວມ (Liquidity)</p>
            <h3 style={{ color: '#c084fc', fontSize: '1.5rem', fontWeight: 800 }}>₭ {multiCurrencyRealBalances.totalCombinedLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '6px', fontWeight: 600 }}>
              ລວມ ₭, ฿, $, ¥ ເປັນເງິນກີບ LAK
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', borderRadius: '14px' }}>
            <Building2 size={26} />
          </div>
        </div>
      </div>`;

const newKpiSection = `      {/* 4. Executive KPI Cards (Compact 4-Column Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '16px', margin: 0 }}>
        {/* Income Card */}
        <div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1))', borderColor: 'rgba(16, 185, 129, 0.35)', borderRadius: '16px' }}>
          <div className="kpi-info">
            <p style={{ fontSize: '0.85rem' }}>🟢 ລາຍຮັບລວມ (2025 - 2026)</p>
            <h3 style={{ color: '#34d399', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>₭ {allTimeSummary.totalIncomeLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
              <ArrowUpRight size={14} /> ດອກເບ້ຍສິນເຊື່ອ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#34d399', borderRadius: '12px', width: '42px', height: '42px' }}>
            <TrendingUp size={22} />
          </div>
        </div>

        {/* Expense Card */}
        <div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'rgba(239, 68, 68, 0.12)', borderColor: 'rgba(239, 68, 68, 0.3)', borderRadius: '16px' }}>
          <div className="kpi-info">
            <p style={{ fontSize: '0.85rem' }}>🔴 ລາຍຈ່າຍລວມ (2025 - 2026)</p>
            <h3 style={{ color: '#f87171', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>₭ {allTimeSummary.totalExpenseLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: '#f87171', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px', fontWeight: 600 }}>
              <ArrowDownRight size={14} /> Ads, ເງິນເດືອນ, IT Server
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#f87171', borderRadius: '12px', width: '42px', height: '42px' }}>
            <TrendingDown size={22} />
          </div>
        </div>

        {/* Net Profit Card */}
        <div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(2, 132, 199, 0.1))', borderColor: 'rgba(6, 182, 212, 0.35)', borderRadius: '16px' }}>
          <div className="kpi-info">
            <p style={{ fontSize: '0.85rem' }}>💰 ກຳໄລສຸດທິລວມ (Net Profit)</p>
            <h3 style={{ color: '#38bdf8', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>₭ {allTimeSummary.netProfitLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', marginTop: '4px', fontWeight: 700 }}>
              ອັດຕາກຳໄລ: {allTimeSummary.overallProfitMarginPercent}%
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#38bdf8', borderRadius: '12px', width: '42px', height: '42px' }}>
            <Wallet size={22} />
          </div>
        </div>

        {/* Liquidity Card */}
        <div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)', borderRadius: '16px' }}>
          <div className="kpi-info">
            <p style={{ fontSize: '0.85rem' }}>💳 ເງິນສົດ & ບັນຊີຄົງເຫຼືອລວມ</p>
            <h3 style={{ color: '#c084fc', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>₭ {multiCurrencyRealBalances.totalCombinedLAK.toLocaleString()}</h3>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', fontWeight: 600 }}>
              ລວມ ₭ LAK & ₽ RUB ເປັນເງິນກີບ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', borderRadius: '12px', width: '42px', height: '42px' }}>
            <Building2 size={22} />
          </div>
        </div>
      </div>`;

content = content.replace(oldKpiSection, newKpiSection);
fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully updated Executive KPI Cards to 4-column compact grid!');
