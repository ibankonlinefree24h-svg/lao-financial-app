// Multi-Year Loan Business Financial Dataset (2024, 2025, 2026)

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

// Full Lifetime & Multi-Year Financial Dataset (2024 - 2026)
export const lifetimeFinancialData = {
  allTimeSummary: {
    totalIncomeLAK: 599500000,
    totalExpenseLAK: 154800000,
    netProfitLAK: 444700000,
    overallProfitMarginPercent: 74.2,
    totalLoansIssued: 148,
    startYear: '2024'
  },
  yearlyHistory: [
    {
      year: '2024',
      income: 128500000,
      expense: 42000000,
      profit: 86500000,
      marginPercent: 67.3,
      growthRateYoY: 'ເລີ່ມຕົ້ນ',
      loanCount: 38
    },
    {
      year: '2025',
      income: 182400000,
      expense: 49600000,
      profit: 132800000,
      marginPercent: 72.8,
      growthRateYoY: '+41.9%',
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
  monthlyDetails: {
    '2026': [
      { month: 'ມັງກອນ', income: 18500000, expense: 4200000, profit: 14300000, growthMoM: '+12.5%' },
      { month: 'ກຸມພາ', income: 20800000, expense: 4500000, profit: 16300000, growthMoM: '+12.4%' },
      { month: 'ມີນາ', income: 19900000, expense: 4800000, profit: 15100000, growthMoM: '-4.3%' },
      { month: 'ເມສາ', income: 23200000, expense: 5300000, profit: 17900000, growthMoM: '+16.5%' },
      { month: 'ພຶດສະພາ', income: 21800000, expense: 5100000, profit: 16700000, growthMoM: '-6.0%' },
      { month: 'ມິຖຸນາ', income: 25500000, expense: 5400000, profit: 20100000, growthMoM: '+16.9%' },
      { month: 'ກໍລະກົດ', income: 27800000, expense: 5700000, profit: 22100000, growthMoM: '+9.0%' },
      { month: 'ສິງຫາ', income: 31400000, expense: 5900000, profit: 25500000, growthMoM: '+12.9%' },
      { month: 'ກັນຍາ', income: 33500000, expense: 6100000, profit: 27400000, growthMoM: '+6.6%' },
      { month: 'ຕຸລາ', income: 35800000, expense: 6300000, profit: 29500000, growthMoM: '+6.8%' },
      { month: 'ພະຈິກ', income: 38200000, expense: 6500000, profit: 31700000, growthMoM: '+6.7%' },
      { month: 'ທັນວາ', income: 42200000, expense: 6800000, profit: 35400000, growthMoM: '+10.4%' }
    ],
    '2025': [
      { month: 'ມັງກອນ', income: 11200000, expense: 3500000, profit: 7700000, growthMoM: '+5.0%' },
      { month: 'ກຸມພາ', income: 12400000, expense: 3700000, profit: 8700000, growthMoM: '+10.7%' },
      { month: 'ມີນາ', income: 13200000, expense: 3800000, profit: 9400000, growthMoM: '+6.4%' },
      { month: 'ເມສາ', income: 14800000, expense: 4100000, profit: 10700000, growthMoM: '+12.1%' },
      { month: 'ພຶດສະພາ', income: 13900000, expense: 4200000, profit: 9700000, growthMoM: '-6.0%' },
      { month: 'ມິຖຸນາ', income: 15500000, expense: 4000000, profit: 11500000, growthMoM: '+11.5%' },
      { month: 'ກໍລະກົດ', income: 16800000, expense: 4300000, profit: 12500000, growthMoM: '+8.3%' },
      { month: 'ສິງຫາ', income: 18500000, expense: 4400000, profit: 14100000, growthMoM: '+10.1%' },
      { month: 'ກັນຍາ', income: 17200000, expense: 4300000, profit: 12900000, growthMoM: '-7.0%' },
      { month: 'ຕຸລາ', income: 18900000, expense: 4500000, profit: 14400000, growthMoM: '+9.8%' },
      { month: 'ພະຈິກ', income: 19800000, expense: 4600000, profit: 15200000, growthMoM: '+4.7%' },
      { month: 'ທັນວາ', income: 21500000, expense: 4800000, profit: 16700000, growthMoM: '+8.5%' }
    ],
    '2024': [
      { month: 'ມັງກອນ', income: 7500000, expense: 2800000, profit: 4700000, growthMoM: 'ເລີ່ມຕົ້ນ' },
      { month: 'ກຸມພາ', income: 8200000, expense: 3000000, profit: 5200000, growthMoM: '+9.3%' },
      { month: 'ມີນາ', income: 8800000, expense: 3100000, profit: 5700000, growthMoM: '+7.3%' },
      { month: 'ເມສາ', income: 9800000, expense: 3400000, profit: 6400000, growthMoM: '+11.3%' },
      { month: 'ພຶດສະພາ', income: 9100000, expense: 3300000, profit: 5800000, growthMoM: '-7.1%' },
      { month: 'ມິຖຸນາ', income: 10500000, expense: 3500000, profit: 7000000, growthMoM: '+15.3%' },
      { month: 'ກໍລະກົດ', income: 11200000, expense: 3600000, profit: 7600000, growthMoM: '+6.6%' },
      { month: 'ສິງຫາ', income: 12500000, expense: 3800000, profit: 8700000, growthMoM: '+11.6%' },
      { month: 'ກັນຍາ', income: 11800000, expense: 3700000, profit: 8100000, growthMoM: '-5.6%' },
      { month: 'ຕຸລາ', income: 12900000, expense: 3900000, profit: 9000000, growthMoM: '+9.3%' },
      { month: 'ພະຈິກ', income: 13500000, expense: 4000000, profit: 9500000, growthMoM: '+4.6%' },
      { month: 'ທັນວາ', income: 14700000, expense: 4200000, profit: 10500000, growthMoM: '+8.8%' }
    ]
  }
};

export const initialWallets = [
  { id: 'W-CASH', name: 'ເງິນສົດ (Cash Wallet)', type: 'CASH', icon: '💵', balanceLAK: 8400000, color: '#f59e0b', accountNo: 'CASH-VAULT' },
  { id: 'W-BCEL', name: 'BCEL One (ທະນາຄານການຄ້າ)', type: 'BANK', icon: '🏦', balanceLAK: 45200000, color: '#6366f1', accountNo: '160-12-0001234-001' },
  { id: 'W-LDB', name: 'LDB Trust (ທະນາຄານພັດທະນາລາວ)', type: 'BANK', icon: '🏬', balanceLAK: 12000000, color: '#06b6d4', accountNo: '020-55-0011223-001' },
  { id: 'W-JDB', name: 'JDB (ທະນາຄານ ຈອມເພັດ/ຈອຍທ໌)', type: 'BANK', icon: '🏛️', balanceLAK: 18500000, color: '#a855f7', accountNo: '550-10-8889911-002' },
  { id: 'W-APB', name: 'APB (ທະນາຄານສົ່ງເສີມກorigິກຳ)', type: 'BANK', icon: '🌾', balanceLAK: 6800000, color: '#10b981', accountNo: '880-99-223311-001' },
  { id: 'W-MMONEY', name: 'M-Money (M-Unitel Wallet)', type: 'WALLET', icon: '📱', balanceLAK: 3500000, color: '#ef4444', accountNo: '020 9988 7766' },
  { id: 'W-UMONEY', name: 'U-Money (LTC Wallet)', type: 'WALLET', icon: '📲', balanceLAK: 2100000, color: '#f97316', accountNo: '020 5566 7788' },
  { id: 'W-SAVINGS', name: 'ບັນຊີເງິນຝາກປະຢັດ (Savings / Fund)', type: 'SAVINGS', icon: '📈', balanceLAK: 25000000, color: '#3b82f6', accountNo: 'FIXED-DEP-99' },
  { id: 'W-CREDIT', name: 'ບັດເຄຣດິດ / ໜີ້ສິນ (Credit Card)', type: 'DEBT', icon: '💳', balanceLAK: -4500000, color: '#ec4899', accountNo: 'VISA-GOLD-8822' }
];

export const expenseCategories = [
  { id: 'EXP-FOOD', name: '🍜 ອາຫານ & ເຄື່ອງດື່ມ', icon: '🍜', color: '#f97316', budgetLAK: 3500000 },
  { id: 'EXP-TRANS', name: '🚗 ການເດີນທາງ & ນ້ຳມັນ', icon: '🚗', color: '#3b82f6', budgetLAK: 1800000 },
  { id: 'EXP-HOUSING', name: '🏠 ທີ່ຢູ່ອາໄສ & ສາທາລະນູປະໂພກ', icon: '🏠', color: '#8b5cf6', budgetLAK: 2500000 },
  { id: 'EXP-SHOPPING', name: '🛍️ ຊັອບປິ້ງ & ຂອງໃຊ້', icon: '🛍️', color: '#ec4899', budgetLAK: 1500000 },
  { id: 'EXP-HEALTH', name: '💊 ສຸຂະພາບ & ຄວາມງາມ', icon: '💊', color: '#10b981', budgetLAK: 1000000 },
  { id: 'EXP-EDU', name: '📚 ການສຶກສາ & ພັດທະນາຕົນເອງ', icon: '📚', color: '#06b6d4', budgetLAK: 1200000 },
  { id: 'EXP-FAMILY', name: '🎁 ຄອບຄົວ & ສັງຄົມ (ງານດອງ/ງານບຸນ)', icon: '🎁', color: '#f59e0b', budgetLAK: 2000000 },
  { id: 'EXP-ADS', name: '📢 ຄ່າ Ads ໂຄສະນາ & ການຕະຫຼາດ', icon: '📢', color: '#ef4444', budgetLAK: 4000000 },
  { id: 'EXP-SALARY', name: '👥 ເງິນເດືອນພະນັກງານ', icon: '👥', color: '#6366f1', budgetLAK: 8000000 }
];

export const incomeCategories = [
  { id: 'INC-SALARY', name: '💵 ເງິນເດືອນ (Salary)', icon: '💵', color: '#10b981' },
  { id: 'INC-INTEREST', name: '💼 ດອກເບ້ຍສິນເຊື່ອ & ບໍລິການ (Loan Interest)', icon: '💼', color: '#34d399' },
  { id: 'INC-BIZ', name: '💻 ທຸລະກິດ / ຄ້າຂາຍ (Business Sales)', icon: '💻', color: '#38bdf8' },
  { id: 'INC-FREELANCE', name: '🛠️ ວຽກເສີມ / Freelance', icon: '🛠️', color: '#c084fc' },
  { id: 'INC-DIVIDEND', name: '📈 ດອກເບ້ຍ / ເງິນປັນຜົນ (Dividends)', icon: '📈', color: '#facc15' },
  { id: 'INC-BONUS', name: '🎁 ຂອງຂວັນ / ໂບນັດ (Bonus & Gifts)', icon: '🎁', color: '#f472b6' }
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
  },
  {
    id: 'TX-003',
    date: '2026-08-22 09:00',
    type: 'TRANSFER',
    category: '🔄 ໂອນຍ້າຍລະຫວ່າງບັນຊີ',
    walletId: 'W-BCEL',
    walletName: 'BCEL One (ທະນາຄານການຄ້າ)',
    targetWalletId: 'W-CASH',
    targetWalletName: 'ເງິນສົດ (Cash Wallet)',
    amount: 2000000,
    currency: 'LAK',
    paymentMethod: 'TRANSFER',
    tags: ['#ຖອນເງິນສົດ'],
    customerName: 'ຖອນເງິນສົດໃສ່ຕູ້',
    slipUrl: '',
    note: 'ຖອນເງິນຈາກ BCEL ເຂົ້າຕູ້ເງິນສົດຫ້ອງການ'
  }
];
