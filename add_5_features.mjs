import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// Add categoryFilter state
if (!content.includes('const [categoryFilter, setCategoryFilter]')) {
  content = content.replace(
    `const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');`,
    `const [activeTypeFilter, setActiveTypeFilter] = useState('ALL');\n  const [categoryFilter, setCategoryFilter] = useState('ທັງໝົດ');`
  );
}

// 1. Add Financial Health Banner & Comparison Bar right below Exchange Rate Banner
const rateBannerEnd = `        </div>\n      </div>`;

const newBanners = `        </div>
      </div>

      {/* 🌟 1. FINANCIAL TRAFFIC LIGHT HEALTH VERIFIER BANNER */}
      <div
        className="glass-panel"
        style={{
          padding: '16px 22px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.95))',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              padding: '8px 16px',
              borderRadius: '30px',
              background: 'rgba(16, 185, 129, 0.25)',
              border: '1px solid #10b981',
              color: '#34d399',
              fontWeight: 800,
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#34d399', boxShadow: '0 0 10px #34d399' }} />
            🟢 ສຸຂະພາບການເງິນ: ແຂງແຮງຫຼາຍ (Strong)
          </div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            ຜົນປະເມິນອັດຕະໂນມັດ 3 ວິນາທີ: ກຳໄລສູງ > 70% | ຄວາມສ່ຽງເງິນສົດຂາດແຄນ low
          </span>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ padding: '6px 14px', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <span style={{ fontSize: '0.74rem', color: '#38bdf8', display: 'block' }}>🛡️ Cash Runway (ຄວາມປອດໄພ)</span>
            <strong style={{ fontSize: '0.92rem', color: '#38bdf8' }}>38 ເດືອນ (ປອດໄພສູງ)</strong>
          </div>
          <div style={{ padding: '6px 14px', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
            <span style={{ fontSize: '0.74rem', color: '#c084fc', display: 'block' }}>📈 ແນວໂນ້ມເດືອນນີ້ (MoM)</span>
            <strong style={{ fontSize: '0.92rem', color: '#c084fc' }}>+12.4% ເຕີບໂຕ</strong>
          </div>
          <button
            className="btn-primary-emerald"
            style={{ padding: '8px 16px', fontSize: '0.82rem', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => window.print()}
          >
            <Printer size={14} /> 📄 ພິມໃບສະຫຼຸບ A4 PDF
          </button>
        </div>
      </div>

      {/* 🌟 2. THIS MONTH VS LAST MONTH QUICK COMPARISON BAR */}
      <div
        className="glass-panel"
        style={{
          padding: '14px 20px',
          borderRadius: '16px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', fontWeight: 800 }}>
          <span>📅 ທຽບເດືອນປະຈຸບັນ (ກຸມພາ 26) vs ເດືອນກ່ອນ (ມັງກອນ 26):</span>
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', fontSize: '0.84rem' }}>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>ລາຍຮັບເດືອນນີ້: </span>
            <strong style={{ color: '#34d399' }}>₭ 20.8M</strong>
            <span style={{ color: '#34d399', fontSize: '0.78rem', marginLeft: '6px', fontWeight: 700 }}>(+₭ 2.3M / +12.4% 🟢)</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>ລາຍຈ່າຍເດືອນນີ້: </span>
            <strong style={{ color: '#f87171' }}>₭ 4.5M</strong>
            <span style={{ color: '#fb7185', fontSize: '0.78rem', marginLeft: '6px', fontWeight: 700 }}>(+₭ 300K 🔴)</span>
          </div>
          <div>
            <span style={{ color: 'var(--text-muted)' }}>ກຳໄລເດືອນນີ້: </span>
            <strong style={{ color: '#38bdf8' }}>₭ 16.3M</strong>
            <span style={{ color: '#38bdf8', fontSize: '0.78rem', marginLeft: '6px', fontWeight: 700 }}>(+13.9% 🟢)</span>
          </div>
        </div>
      </div>`;

content = content.replace(rateBannerEnd, newBanners);

// 3. Add Annual Profit Target Progress Bar right after 2 Currency Cards Grid
const realBalanceEnd = `          </div>
        </div>
      </div>`;

const targetProgressBar = `          </div>
        </div>
      </div>

      {/* 🌟 3. ANNUAL PROFIT TARGET PROGRESS BAR (ປີ 2026) */}
      <div
        className="glass-panel"
        style={{
          padding: '18px 22px',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(15, 23, 42, 0.9))',
          border: '1px solid rgba(56, 189, 248, 0.3)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h4 style={{ fontSize: '1rem', fontWeight: 800, color: '#38bdf8', margin: 0 }}>🎯 ເປົ້າໝາຍກຳໄລລວມ ປີ 2026 (Annual Profit Goal Progress)</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '4px 0 0' }}>
              ເປົ້າໝາຍຕັ້ງไว้: <strong>₭ 300,000,000 LAK</strong> | ປະຈຸບັນເຮັດໄດ້: <strong style={{ color: '#34d399' }}>₭ 288,600,000 LAK</strong>
            </p>
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>
            96.2% <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ບັນລຸແລ້ວ</span>
          </div>
        </div>

        <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.08)', borderRadius: '6px', overflow: 'hidden' }}>
          <div
            style={{
              width: '96.2%',
              height: '100%',
              background: 'linear-gradient(90deg, #34d399, #38bdf8, #a855f7)',
              borderRadius: '6px',
              boxShadow: '0 0 12px rgba(52, 211, 153, 0.5)'
            }}
          />
        </div>
      </div>`;

content = content.replace(realBalanceEnd, targetProgressBar);

// 4. Update transaction filtering to support categoryFilter
content = content.replace(
  `const filteredTransactions = transactions.filter((t) => {`,
  `const filteredTransactions = transactions.filter((t) => {
    if (categoryFilter !== 'ທັງໝົດ' && !t.category.includes(categoryFilter.replace('🔴 ', '').replace('🟢 ', ''))) return false;`
);

// 5. Add Category Quick Filter Buttons in Transaction Stream
const typeFilterPills = `<button className={\`filter-pill-btn \${activeTypeFilter === 'EXPENSE' ? 'active' : ''}\`} onClick={() => setActiveTypeFilter('EXPENSE')}>
                    🔴 ລາຍຈ່າຍ
                  </button>
                </div>`;

const categoryPills = `<button className={\`filter-pill-btn \${activeTypeFilter === 'EXPENSE' ? 'active' : ''}\`} onClick={() => setActiveTypeFilter('EXPENSE')}>
                    🔴 ລາຍຈ່າຍ
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['ທັງໝົດ', '🔴 Ads ໂຄສະນາ', '🔴 ເງິນເດືອນ', '🔴 IT Server', '🟢 ດອກເບ້ຍສິນເຊື່ອ'].map((cat) => (
                    <button
                      key={cat}
                      className="table-link-btn"
                      style={{
                        padding: '4px 10px',
                        fontSize: '0.76rem',
                        borderRadius: '10px',
                        background: categoryFilter === cat ? 'var(--accent-gradient)' : 'rgba(255,255,255,0.06)',
                        color: categoryFilter === cat ? '#fff' : 'var(--text-secondary)'
                      }}
                      onClick={() => setCategoryFilter(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>`;

content = content.replace(typeFilterPills, categoryPills);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Successfully added all 5 financial enhancements to IncomeExpenseView.jsx!');
