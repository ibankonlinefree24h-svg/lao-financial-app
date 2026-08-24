// Multi-Year Loan Business Financial Dataset (2025 - 2026)

export const defaultExchangeRates = {
  lak: 1,
  thbToLak: 630,      // 1 THB = 630 LAK
  usdToLak: 22500,    // 1 USD = 22,500 LAK
  cnyToLak: 3100,     // 1 CNY = 3,100 LAK
  rubToLak: 275,      // 1 RUB = 275 LAK
  lastUpdated: '2026-08-24'
};

export const defaultExchangeRate = defaultExchangeRates;

export function convertToLAK(amount, currency, rates = defaultExchangeRates) {
  const currUpper = (currency || 'LAK').toUpperCase();
  if (currUpper === 'THB') return Math.round(amount * (rates.thbToLak || 630));
  if (currUpper === 'USD') return Math.round(amount * (rates.usdToLak || 22500));
  if (currUpper === 'CNY') return Math.round(amount * (rates.cnyToLak || 3100));
  if (currUpper === 'RUB') return Math.round(amount * (rates.rubToLak || 275));
  return Math.round(amount);
}

// Complete 24-Month Founding-to-Present Financial Dataset (2025 & 2026)
export const lifetimeFinancialData = {
  allTimeSummary: {
    totalIncomeLAK: 471000000,
    totalExpenseLAK: 112800000,
    netProfitLAK: 358200000,
    overallProfitMarginPercent: 76.1,
    totalLoansIssued: 110,
    startYear: '2025'
  },
  yearlyHistory: [
    {
      year: '2025',
      income: 182400000,
      expense: 49600000,
      profit: 132800000,
      marginPercent: 72.8,
      growthRateYoY: 'ປີກໍ່ຕັ້ງ',
      loanCount: 54
    },
    {
      year: '2026',
      income: 288600000,
      expense: 63200000,
      profit: 225400000,
      marginPercent: 78.1,
      growthRateYoY: '+58.2%',
      loanCount: 56
    }
  ],
  // 24 Months Continuous Stream (2025 - 2026)
  continuous24Months: [
    // 2025 (12 Months)
    { month: 'ມັງກອນ 25', shortMonth: 'ມ.ກ 25', year: '2025', income: 11200000, expense: 3500000, profit: 7700000, growthMoM: 'ເລີ່ມຕົ້ນ' },
    { month: 'ກຸມພາ 25', shortMonth: 'ກ.ພ 25', year: '2025', income: 12400000, expense: 3700000, profit: 8700000, growthMoM: '+10.7%' },
    { month: 'ມີນາ 25', shortMonth: 'ມີ.ນ 25', year: '2025', income: 13200000, expense: 3800000, profit: 9400000, growthMoM: '+6.4%' },
    { month: 'ເມສາ 25', shortMonth: 'ເມ.ສ 25', year: '2025', income: 14800000, expense: 4100000, profit: 10700000, growthMoM: '+12.1%' },
    { month: 'ພຶດສະພາ 25', shortMonth: 'ພ.ສ 25', year: '2025', income: 13900000, expense: 4200000, profit: 9700000, growthMoM: '-6.0%' },
    { month: 'ມິຖຸນາ 25', shortMonth: 'ມິ.ຖ 25', year: '2025', income: 15500000, expense: 4000000, profit: 11500000, growthMoM: '+11.5%' },
    { month: 'ກໍລະກົດ 25', shortMonth: 'ກ.ລ 25', year: '2025', income: 16800000, expense: 4300000, profit: 12500000, growthMoM: '+8.3%' },
    { month: 'ສິງຫາ 25', shortMonth: 'ສ.ຫ 25', year: '2025', income: 18500000, expense: 4400000, profit: 14100000, growthMoM: '+10.1%' },
    { month: 'ກັນຍາ 25', shortMonth: 'ກ.ຍ 25', year: '2025', income: 17200000, expense: 4300000, profit: 12900000, growthMoM: '-7.0%' },
    { month: 'ຕຸລາ 25', shortMonth: 'ຕ.ລ 25', year: '2025', income: 18900000, expense: 4500000, profit: 14400000, growthMoM: '+9.8%' },
    { month: 'ພະຈິກ 25', shortMonth: 'ພ.ຈ 25', year: '2025', income: 19800000, expense: 4600000, profit: 15200000, growthMoM: '+4.7%' },
    { month: 'ທັນວາ 25', shortMonth: 'ທ.ວ 25', year: '2025', income: 21500000, expense: 4800000, profit: 16700000, growthMoM: '+8.5%' },

    // 2026 (12 Months)
    { month: 'ມັງກອນ 26', shortMonth: 'ມ.ກ 26', year: '2026', income: 18500000, expense: 4200000, profit: 14300000, growthMoM: '-13.9%' },
    { month: 'ກຸມພາ 26', shortMonth: 'ກ.ພ 26', year: '2026', income: 20800000, expense: 4500000, profit: 16300000, growthMoM: '+12.4%' },
    { month: 'ມີນາ 26', shortMonth: 'ມີ.ນ 26', year: '2026', income: 19900000, expense: 4800000, profit: 15100000, growthMoM: '-4.3%' },
    { month: 'ເມສາ 26', shortMonth: 'ເມ.ສ 26', year: '2026', income: 23200000, expense: 5300000, profit: 17900000, growthMoM: '+16.5%' },
    { month: 'ພຶດສະພາ 26', shortMonth: 'ພ.ສ 26', year: '2026', income: 21800000, expense: 5100000, profit: 16700000, growthMoM: '-6.0%' },
    { month: 'ມິຖຸນາ 26', shortMonth: 'ມິ.ຖ 26', year: '2026', income: 25500000, expense: 5400000, profit: 20100000, growthMoM: '+16.9%' },
    { month: 'ກໍລະກົດ 26', shortMonth: 'ກ.ລ 26', year: '2026', income: 27800000, expense: 5700000, profit: 22100000, growthMoM: '+9.0%' },
    { month: 'ສິງຫາ 26', shortMonth: 'ສ.ຫ 26', year: '2026', income: 31400000, expense: 5900000, profit: 25500000, growthMoM: '+12.9%' },
    { month: 'ກັນຍາ 26', shortMonth: 'ກ.ຍ 26', year: '2026', income: 33500000, expense: 6100000, profit: 27400000, growthMoM: '+6.6%' },
    { month: 'ຕຸລາ 26', shortMonth: 'ຕ.ລ 26', year: '2026', income: 35800000, expense: 6300000, profit: 29500000, growthMoM: '+6.8%' },
    { month: 'ພະຈິກ 26', shortMonth: 'ພ.ຈ 26', year: '2026', income: 38200000, expense: 6500000, profit: 31700000, growthMoM: '+6.7%' },
    { month: 'ທັນວາ 26', shortMonth: 'ທ.ວ 26', year: '2026', income: 42200000, expense: 6800000, profit: 35400000, growthMoM: '+10.4%' }
  ]
};

export const initialWallets = [
  { id: 'W-CASH', name: 'ເງິນສົດ (Cash Wallet)', type: 'CASH', icon: '💵', balanceLAK: 8400000, color: '#f59e0b', accountNo: 'CASH-VAULT' },
  { id: 'W-BCEL', name: 'BCEL One (ທະນາຄານການຄ້າ)', type: 'BANK', icon: '🏦', balanceLAK: 45200000, color: '#6366f1', accountNo: '160-12-0001234-001' },
  { id: 'W-LDB', name: 'LDB Trust (ທະນາຄານພັດທະນາລາວ)', type: 'BANK', icon: '🏬', balanceLAK: 12000000, color: '#06b6d4', accountNo: '020-55-0011223-001' },
  { id: 'W-JDB', name: 'JDB (ທະນາຄານ ຈອມເພັດ/ຈອຍທ໌)', type: 'BANK', icon: '🏛️', balanceLAK: 18500000, color: '#a855f7', accountNo: '550-10-8889911-002' },
  { id: 'W-APB', name: 'APB (ທະນາຄານສົ່ງເສີມກorigິກຳ)', type: 'BANK', icon: '🌾', balanceLAK: 6800000, color: '#10b981', accountNo: '880-99-223311-001' }
];

export const expenseCategories = [
  { id: 'EXP-FOOD', name: '🍜 ອາຫານ & ເຄື່ອງດື່ມ', icon: '🍜', color: '#f97316', budgetLAK: 3500000 },
  { id: 'EXP-TRANS', name: '🚗 ການເດີນທາງ & ນ້ຳມັນ', icon: '🚗', color: '#3b82f6', budgetLAK: 1800000 },
  { id: 'EXP-HOUSING', name: '🏠 ທີ່ຢູ່ອາໄສ & ສາທາລະນູປະໂພກ', icon: '🏠', color: '#8b5cf6', budgetLAK: 2500000 },
  { id: 'EXP-ADS', name: '📢 ຄ່າ Ads ໂຄສະນາ & ການຕະຫຼາດ', icon: '📢', color: '#ef4444', budgetLAK: 4000000 }
];

export const incomeCategories = [
  { id: 'INC-SALARY', name: '💵 ເງິນເດືອນ (Salary)', icon: '💵', color: '#10b981' },
  { id: 'INC-INTEREST', name: '💼 ດອກເບ້ຍສິນເຊື່ອ & ບໍລິການ (Loan Interest)', icon: '💼', color: '#34d399' }
];

export const initialTransactions = [
  {
    id: 'TX-001',
    date: '2026-08-24 10:30',
    type: 'INCOME',
    category: '💼 ດອກເບ້ຍສິນເຊື່ອ & ບໍລິການ (Loan Interest)',
    walletId: 'W-BCEL',
    walletName: 'BCEL One',
    amount: 3500000,
    currency: 'LAK',
    paymentMethod: 'TRANSFER',
    tags: ['#ດອກເບ້ຍເດືອນ8', '#ສົມໄຊ'],
    customerName: 'ສົມໄຊ ພິມມະສອນ',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ຊຳລະດອກເບ້ຍສິນເຊື່ອປະຈຳເດືອນ 8'
  },
  {
    id: 'TX-002',
    date: '2026-08-23 14:15',
    type: 'EXPENSE',
    category: '📢 ຄ່າ Ads ໂຄສະນາ & ການຕະຫຼາດ',
    walletId: 'W-BCEL',
    walletName: 'BCEL One',
    amount: 2500,
    currency: 'THB',
    paymentMethod: 'TRANSFER',
    tags: ['#FacebookAds', '#ໂຄສະນາຫາລູກຄ້າ'],
    customerName: 'Facebook Ads',
    slipUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&auto=format&fit=crop&q=80',
    note: 'ຍິງ Ads ໂຄສະນາຫາລູກຄ້າກູ້ຢືມ'
  }
];
