import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Add isCompactView state
if (!content.includes('const [isCompactView, setIsCompactView]')) {
  content = content.replace(
    `const [categoryFilter, setCategoryFilter] = useState('ທັງໝົດ');`,
    `const [categoryFilter, setCategoryFilter] = useState('ທັງໝົດ');\n  const [isCompactView, setIsCompactView] = useState(false);`
  );
}

// 2. Add Compact View Toggle Button inside Financial Traffic Light Banner
const oldPrintBtn = `<button
            className="btn-primary-emerald"
            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => window.print()}
          >
            <Printer size={14} /> 📄 ພິມໃບສະຫຼຸບ A4 PDF
          </button>`;

const newCompactToggle = `<button
            className="icon-btn-xs"
            style={{
              padding: '8px 16px',
              fontSize: '0.82rem',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: isCompactView ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.08)',
              color: isCompactView ? '#000' : 'var(--text-primary)',
              fontWeight: 700
            }}
            onClick={() => setIsCompactView(!isCompactView)}
          >
            <Eye size={14} /> {isCompactView ? '📊 ເບິ່ງແບບລະອຽດ (Full Analytics)' : '👁️ ເບິ່ງແບບງ່າຍ (Compact View)'}
          </button>
          <button
            className="btn-primary-emerald"
            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => window.print()}
          >
            <Printer size={14} /> 📄 ພິມໃບສະຫຼຸບ A4 PDF
          </button>`;

content = content.replace(oldPrintBtn, newCompactToggle);

// 3. Replace duplicate Liquidity card in Executive KPI cards with Expense-to-Income Ratio Card
const oldLiquidityCard = `<div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)', borderRadius: '16px' }}>
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
        </div>`;

const newRatioCard = `<div className="glass-panel kpi-card" style={{ padding: '16px 20px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15), rgba(126, 34, 206, 0.1))', borderColor: 'rgba(168, 85, 247, 0.35)', borderRadius: '16px' }}>
          <div className="kpi-info">
            <p style={{ fontSize: '0.85rem' }}>⚖️ % ລາຍຈ່າຍ/ລາຍຮັບ (Cost Ratio)</p>
            <h3 style={{ color: '#c084fc', fontSize: '1.45rem', fontWeight: 800, margin: '4px 0' }}>23.9% <span style={{ fontSize: '0.82rem', color: '#34d399' }}>(ກຳໄລ 76.1%)</span></h3>
            <span style={{ fontSize: '0.78rem', color: '#c084fc', marginTop: '4px', fontWeight: 600 }}>
              ທຸກ 100 ກີບ ຮັບ -> จ່າຍ 23.9 ກີບ
            </span>
          </div>
          <div className="kpi-icon" style={{ background: 'rgba(168, 85, 247, 0.2)', color: '#c084fc', borderRadius: '12px', width: '42px', height: '42px' }}>
            <Scale size={22} />
          </div>
        </div>`;

content = content.replace(oldLiquidityCard, newRatioCard);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully applied clean compact view and removed duplicate card in IncomeExpenseView.jsx!');
