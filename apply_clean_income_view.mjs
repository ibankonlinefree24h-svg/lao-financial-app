import fs from 'fs';

const filepath = 'F:/app/src/components/IncomeExpenseView.jsx';
let content = fs.readFileSync(filepath, 'utf8');

// 1. Rates state
const oldState = `  // Exchange Rates State
  const [rates, setRates] = useState(defaultExchangeRates);
  const [tempThbRate, setTempThbRate] = useState(rates.thbToLak);
  const [tempUsdRate, setTempUsdRate] = useState(rates.usdToLak);
  const [tempCnyRate, setTempCnyRate] = useState(rates.cnyToLak);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'THB') return Math.round(amount * rates.thbToLak);
    if (c === 'USD') return Math.round(amount * rates.usdToLak);
    if (c === 'CNY') return Math.round(amount * rates.cnyToLak);
    if (c === 'RUB') return Math.round(amount * rates.rubToLak);
    return Math.round(amount);
  };`;

const newState = `  // Exchange Rates State
  const [rates, setRates] = useState(defaultExchangeRates);
  const [tempRubRate, setTempRubRate] = useState(rates.rubToLak || 275);

  const convert3ToLAK = (amount, currency) => {
    const c = (currency || 'LAK').toUpperCase();
    if (c === 'RUB') return Math.round(amount * (rates.rubToLak || 275));
    return Math.round(amount);
  };`;

content = content.replace(oldState, newState);

// 2. handleSaveRates
const oldSaveRates = `  const handleSaveRates = () => {
    setRates({
      ...rates,
      thbToLak: Number(tempThbRate),
      usdToLak: Number(tempUsdRate),
      cnyToLak: Number(tempCnyRate)
    });
    setIsEditingRate(false);
  };`;

const newSaveRates = `  const handleSaveRates = () => {
    const updated = {
      ...rates,
      rubToLak: Number(tempRubRate) || 275,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setRates(updated);
    if (onUpdateExchangeRate) onUpdateExchangeRate(updated.rubToLak);
    setIsEditingRate(false);
  };`;

content = content.replace(oldSaveRates, newSaveRates);

// 3. Exchange Rate Banner HTML
const oldBanner = `          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
            ອັດຕາແລກປ່ຽນ 4 ສະກຸນ: <strong>1 THB = {rates.thbToLak} ₭</strong> | <strong>1 USD = {rates.usdToLak.toLocaleString()} ₭</strong> | <strong>1 CNY = {rates.cnyToLak.toLocaleString()} ₭</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isEditingRate ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem' }}>THB:</span>
              <input
                type="number"
                value={tempThbRate}
                onChange={(e) => setTempThbRate(e.target.value)}
                style={{ width: '65px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem' }}>USD:</span>
              <input
                type="number"
                value={tempUsdRate}
                onChange={(e) => setTempUsdRate(e.target.value)}
                style={{ width: '80px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <span style={{ fontSize: '0.78rem' }}>CNY:</span>
              <input
                type="number"
                value={tempCnyRate}
                onChange={(e) => setTempCnyRate(e.target.value)}
                style={{ width: '70px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <button className="icon-btn-xs" style={{ width: 'auto', padding: '4px 10px' }} onClick={handleSaveRates}>
                ບັນທຶກ
              </button>
            </div>
          ) : (`;

const newBanner = `          <span style={{ fontWeight: 600, fontSize: '0.88rem' }}>
            ອັດຕາແລກປ່ຽນສະກຸນເງິນ: <strong>1 RUB (ຣູບລ໌ ລັດເຊຍ) = {rates.rubToLak || 275} ₭ LAK</strong>
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {isEditingRate ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span style={{ fontSize: '0.78rem' }}>RUB (ຣູບລ໌):</span>
              <input
                type="number"
                value={tempRubRate}
                onChange={(e) => setTempRubRate(e.target.value)}
                style={{ width: '85px', padding: '4px 6px', borderRadius: '6px', fontSize: '0.82rem' }}
              />
              <button className="icon-btn-xs" style={{ width: 'auto', padding: '4px 10px' }} onClick={handleSaveRates}>
                ບັນທຶກ
              </button>
            </div>
          ) : (`;

content = content.replace(oldBanner, newBanner);

// 4. Subtitle text
content = content.replace(
  `ສະແດງຍອດເງິນສົດປະຈຸບັນຂອງ ₭ LAK, ฿ THB, $ USD, ¥ CNY ແລະ ສະຫຼຸບລວມເປັນເງິນກີບ LAK`,
  `ສະແດງຍອດເງິນສົດປະຈຸບັນຂອງ 🇱🇦 ₭ LAK (ເງິນກີບ) & 🇷🇺 ₽ RUB (ເງິນລັດເຊຍ) ແລະ ສະຫຼຸບລວມເປັນເງິນກີບ LAK`
);

// 5. 4 Currency Cards Grid -> 2 Currency Cards Grid
const oldGrid = `        {/* 4 Currency Real Balance Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* LAK Card */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #34d399', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{multiCurrencyRealBalances.lak.flag} ເງິນກີບ LAK</span>
              <span className="tag tag-emerald" style={{ fontSize: '0.72rem' }}>{multiCurrencyRealBalances.lak.percentOfTotal}% ຂອງຍອດລວມ</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#34d399', margin: '8px 0 2px', fontWeight: 800 }}>
              ₭ {multiCurrencyRealBalances.lak.amount.toLocaleString()}
            </h3>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.lak.lakEquivalent.toLocaleString()}</div>
          </div>

          {/* THB Card */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #38bdf8', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{multiCurrencyRealBalances.thb.flag} ເງິນບາດ THB</span>
              <span className="tag tag-blue" style={{ fontSize: '0.72rem' }}>1 THB = {rates.thbToLak} ₭</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#38bdf8', margin: '8px 0 2px', fontWeight: 800 }}>
              ฿ {multiCurrencyRealBalances.thb.amount.toLocaleString()}
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700 }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.thb.lakEquivalent.toLocaleString()} LAK</div>
          </div>

          {/* USD Card */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #a855f7', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{multiCurrencyRealBalances.usd.flag} ເງິນໂດລາ USD</span>
              <span className="tag tag-purple" style={{ fontSize: '0.72rem' }}>1 USD = {rates.usdToLak.toLocaleString()} ₭</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#c084fc', margin: '8px 0 2px', fontWeight: 800 }}>
              $ {multiCurrencyRealBalances.usd.amount.toLocaleString()}
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#c084fc', fontWeight: 700 }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.usd.lakEquivalent.toLocaleString()} LAK</div>
          </div>

          {/* CNY Card */}
          <div className="glass-panel" style={{ padding: '16px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #fbbf24', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.2rem', fontWeight: 800 }}>{multiCurrencyRealBalances.cny.flag} ເງິນຢວນ CNY</span>
              <span className="tag tag-gold" style={{ fontSize: '0.72rem' }}>1 CNY = {rates.cnyToLak.toLocaleString()} ₭</span>
            </div>
            <h3 style={{ fontSize: '1.4rem', color: '#fbbf24', margin: '8px 0 2px', fontWeight: 800 }}>
              ¥ {multiCurrencyRealBalances.cny.amount.toLocaleString()}
            </h3>
            <div style={{ fontSize: '0.78rem', color: '#fbbf24', fontWeight: 700 }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.cny.lakEquivalent.toLocaleString()} LAK</div>
          </div>
        </div>`;

const newGrid = `        {/* 2 Currency Real Balance Cards Grid (LAK & Russian RUB) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* LAK Card */}
          <div className="glass-panel" style={{ padding: '20px', background: 'rgba(0,0,0,0.25)', borderLeft: '4px solid #34d399', borderRadius: '18px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>{multiCurrencyRealBalances.lak.flag} ເງິນກີບ LAK</span>
              <span className="tag tag-emerald" style={{ fontSize: '0.78rem' }}>{multiCurrencyRealBalances.lak.percentOfTotal}% ຂອງຍອດລວມ</span>
            </div>
            <h3 style={{ fontSize: '1.6rem', color: '#34d399', margin: '10px 0 4px', fontWeight 800 }}>
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
            <h3 style={{ fontSize: '1.6rem', color: '#38bdf8', margin: '10px 0 4px', fontWeight 800 }}>
              ₽ {multiCurrencyRealBalances.rub.amount.toLocaleString()} RUB
            </h3>
            <div style={{ fontSize: '0.82rem', color: '#38bdf8', fontWeight: 700 }}>ມູນຄ່າເປັນກີບ: ₭ {multiCurrencyRealBalances.rub.lakEquivalent.toLocaleString()} LAK</div>
          </div>
        </div>`;

content = content.replace(oldGrid, newGrid);

fs.writeFileSync(filepath, content, 'utf8');
console.log('Applied clean IncomeExpenseView update to F:/app');
