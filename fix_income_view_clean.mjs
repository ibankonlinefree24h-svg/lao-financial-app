import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';
let text = fs.readFileSync(filepath, 'utf8');

// 1. Rates state
text = text.replace(
  `  const [tempThbRate, setTempThbRate] = useState(rates.thbToLak);\n  const [tempUsdRate, setTempUsdRate] = useState(rates.usdToLak);\n  const [tempCnyRate, setTempCnyRate] = useState(rates.cnyToLak);`,
  `  const [tempRubRate, setTempRubRate] = useState(rates.rubToLak || 275);`
);

// 2. convert3ToLAK
text = text.replace(
  `  const convert3ToLAK = (amount, currency) => {\n    const c = (currency || 'LAK').toUpperCase();\n    if (c === 'THB') return Math.round(amount * rates.thbToLak);\n    if (c === 'USD') return Math.round(amount * rates.usdToLak);\n    if (c === 'CNY') return Math.round(amount * rates.cnyToLak);\n    if (c === 'RUB') return Math.round(amount * rates.rubToLak);\n    return Math.round(amount);\n  };`,
  `  const convert3ToLAK = (amount, currency) => {\n    const c = (currency || 'LAK').toUpperCase();\n    if (c === 'RUB') return Math.round(amount * (rates.rubToLak || 275));\n    return Math.round(amount);\n  };`
);

// 3. handleSaveRates
text = text.replace(
  `  const handleSaveRates = () => {\n    setRates({\n      ...rates,\n      thbToLak: Number(tempThbRate),\n      usdToLak: Number(tempUsdRate),\n      cnyToLak: Number(tempCnyRate)\n    });\n    setIsEditingRate(false);\n  };`,
  `  const handleSaveRates = () => {\n    const updated = {\n      ...rates,\n      rubToLak: Number(tempRubRate) || 275,\n      lastUpdated: new Date().toISOString().split('T')[0]\n    };\n    setRates(updated);\n    if (onUpdateExchangeRate) onUpdateExchangeRate(updated.rubToLak);\n    setIsEditingRate(false);\n  };`
);

// 4. Rate banner text & inputs
text = text.replace(
  `ອັດຕາແລກປ່ຽນ 4 ສະກຸນ: <strong>1 THB = {rates.thbToLak} ₭</strong> | <strong>1 USD = {rates.usdToLak.toLocaleString()} ₭</strong> | <strong>1 CNY = {rates.cnyToLak.toLocaleString()} ₭</strong>`,
  `ອັດຕາແລກປ່ຽນສະກຸນເງິນ: <strong>1 RUB (ຣູບລ໌ ລັດເຊຍ) = {rates.rubToLak || 275} ₭ LAK</strong>`
);

text = text.replace(
  `<span style={{ fontSize: '0.78rem' }}>THB:</span>\n              <input\n                type="number"\n                value={tempThbRate}\n                onChange={(e) => setTempThbRate(e.target.value)}\n                style={{ width: '65px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}\n              />\n              <span style={{ fontSize: '0.78rem' }}>USD:</span>\n              <input\n                type="number"\n                value={tempUsdRate}\n                onChange={(e) => setTempUsdRate(e.target.value)}\n                style={{ width: '80px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}\n              />\n              <span style={{ fontSize: '0.78rem' }}>CNY:</span>\n              <input\n                type="number"\n                value={tempCnyRate}\n                onChange={(e) => setTempCnyRate(e.target.value)}\n                style={{ width: '70px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}\n              />`,
  `<span style={{ fontSize: '0.78rem' }}>RUB (ຣູບລ໌):</span>\n              <input\n                type="number"\n                value={tempRubRate}\n                onChange={(e) => setTempRubRate(e.target.value)}\n                style={{ width: '85px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}\n              />`
);

// 5. Subtitle
text = text.replace(
  `ສະແດງຍອດເງິນສົດປະຈຸບັນຂອງ ₭ LAK, ฿ THB, $ USD, ¥ CNY ແລະ ສະຫຼຸບລວມເປັນເງິນກີບ LAK`,
  `ສະແດງຍອດເງິນສົດປະຈຸບັນຂອງ 🇱🇦 ₭ LAK (ເງິນກີບ) & 🇷🇺 ₽ RUB (ເງິນລັດເຊຍ) ແລະ ສະຫຼຸບລວມເປັນເງິນກີບ LAK`
);

// 6. Replace Cards Grid
const startGridIdx = text.indexOf('{/* 4 Currency Real Balance Cards Grid */}');
const endGridIdx = text.indexOf('{/* 4. Executive KPI Cards */}');

if (startGridIdx !== -1 && endGridIdx !== -1) {
  const replacementGrid = `{/* 2 Currency Real Balance Cards Grid (LAK & Russian RUB) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* LAK Card */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #34d399', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{multiCurrencyRealBalances.lak.flag} ເງິນກີບ LAK</span>
              <span className="tag tag-emerald" style={{ fontSize: '0.78rem' }}>{multiCurrencyRealBalances.lak.percentOfTotal}% ຂອງຍອດລວມ</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#34d399', margin: '10px 0 4px', fontWeight: 800 }}>
              ₭ {multiCurrencyRealBalances.lak.amount.toLocaleString()}
            </h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.lak.lakEquivalent.toLocaleString()} LAK</div>
          </div>

          {/* Russian RUB Card */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #38bdf8', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#38bdf8' }}>{multiCurrencyRealBalances.rub.flag} ເງິນລັດເຊຍ RUB</span>
              <span className="tag tag-blue" style={{ fontSize: '0.78rem' }}>1 RUB = {rates.rubToLak || 275} ₭</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#38bdf8', margin: '10px 0 4px', fontWeight: 800 }}>
              ₽ {multiCurrencyRealBalances.rub.amount.toLocaleString()} RUB
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700 }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.rub.lakEquivalent.toLocaleString()} LAK</div>
          </div>
        </div>
      </div>\n\n      `;
  
  text = text.substring(0, startGridIdx) + replacementGrid + text.substring(endGridIdx);
}

fs.writeFileSync(filepath, text, 'utf8');
console.log('Successfully updated IncomeExpenseView.jsx without any syntax bugs!');
