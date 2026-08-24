// Multi-Year Financial Dataset with Real 4-Currency Balances & Combined LAK Net Worth Summary

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

// Actual Multi-Currency Cash & Bank Balances (4 Currencies)
export const multiCurrencyRealBalances = {
  lak: {
    symbol: '₭',
    currency: 'LAK',
    amount: 45200000,
    lakEquivalent: 45200000,
    percentOfTotal: 14.4,
    color: '#34d399',
    flag: '🇱🇦'
  },
  thb: {
    symbol: '฿',
    currency: 'THB',
    amount: 150000,
    lakEquivalent: 94500000, // 150,000 * 630
    percentOfTotal: 30.1,
    color: '#38bdf8',
    flag: '🇹🇭'
  },
  usd: {
    symbol: '$',
    currency: 'USD',
    amount: 5000,
    lakEquivalent: 112500000, // 5,000 * 22,500
    percentOfTotal: 35.8,
    color: '#a855f7',
    flag: '🇺🇸'
  },
  cny: {
    symbol: '¥',
    currency: 'CNY',
    amount: 20000,
    lakEquivalent: 62000000, // 20,000 * 3,100
    percentOfTotal: 19.7,
    color: '#fbbf24',
    flag: '🇨🇳'
  },
  totalCombinedLAK: 314200000 // 45.2M + 94.5M + 112.5M + 62M
};

// AI Tax & Financial Health Advisor Data
export const aiTaxAndHealthData = {
  healthScore: 98,
  financialRating: '🟢 ແຂງແຮງດີເລີດ (AAA Financial Health)',
  totalNetProfitLAK: 358200000,
  estimatedLaoTaxPercent: 5,
  estimatedTaxLAK: 17910000,
  recommendedReserveRatePercent: 15,
  recommendedReserveLAK: 53730000,
  aiAdvicePoints: [
    '💡 ກຳໄລສຸດທິ 76.1% ສູງກວ່າສະເລ່ຍອົງກອນສິນເຊື່ອທົ່ວໄປ (ສະເລ່ຍ 45-50%).',
    '📊 ຄວນຈັດສັນເງິນອອມສຳຮອງສຸກເສີນ 15% (₭ 53.7M) ເພື່ອຮອງຮັບຄວາມສ່ຽງ NPL ໃນອະນາຄົດ.',
    '🧾 ປະມານການອາກອນກຳໄລ 5% ປະມານ ₭ 17,910,000 LAK ຄວນກຽມສຳຮອງຈ່າຍໃນທ້າຍປີ.'
  ]
};

// Seasonal Peak & Off-Peak Trends
export const seasonalTrendsData = [
  { season: '🌸 ປີໃໝ່ລາວ (ເມສາ - April Peak)', trendType: 'HIGH_DEMAND', demandIncrease: '+25%', description: 'ລູກຄ້າຕ້ອງການເງິນດ່ວນເພື່ອທ່ອງທ່ຽວ & ບຸນປີໃໝ່' },
  { season: '🌧️ ฤດູຝົນ/ກະສິກຳ (ມິຖຸນາ - ສິງຫາ)', trendType: 'STABLE_GROWTH', demandIncrease: '+12%', description: 'ລູກຄ້າກູ້ຢືມເພື່ອການກະເສດ & ທຸລະກິດປະຈຳ' },
  { season: '🌾 ບຸນອອກພັນສາ & ທາດຫຼວງ (ຕຸລາ - ພະຈິກ)', trendType: 'HIGH_TURNOVER', demandIncrease: '+18%', description: 'ການໝູນວຽນເງິນສົດສູງໃນທຸລະກິດການຄ້າ' },
  { season: '🎄 ທ້າຍປີ / ປີໃໝ່ສາກົນ (ທັນວາ Year-End)', trendType: 'MAX_REVENUE', demandIncrease: '+30%', description: 'ຍອດຊຳລະຄືນດອກເບ້ຍ & ເຄຍສັນຍາສູງສຸດ' }
];

// Strategic Savings & Investment Funds
export const investmentPlanningFunds = [
  { id: 'FUND-EMERGENCY', name: '🛡️ ກອງທຶນສຳຮອງສຸກເສີນ (Emergency Reserve Fund)', targetLAK: 50000000, currentLAK: 35000000, color: '#f59e0b', status: '🟢 70.0% ສຳເລັດ' },
  { id: 'FUND-LOAN-EXP', name: '📈 ກອງທຶນຂະຫຍາຍສິນເຊື່ອໃໝ່ (Loan Expansion Fund)', targetLAK: 150000000, currentLAK: 110000000, color: '#34d399', status: '🟢 73.3% ສຳເລັດ' },
  { id: 'FUND-PROPERTY', name: '🏢 ກອງທຶນລົງທຶນຊື້ສິນຊັບ & ອາຄານ (Asset & Property Fund)', targetLAK: 300000000, currentLAK: 180000000, color: '#38bdf8', status: '🟢 60.0% ສຳເລັດ' },
  { id: 'FUND-TECH', name: '🚀 ກອງທຶນພັດທະນາລະບົບ IT & AI (Tech Innovation Fund)', targetLAK: 40000000, currentLAK: 32000000, color: '#a855f7', status: '🟢 80.0% ສຳເລັດ' }
];

export const breakEvenAnalysisData = {
  monthlyFixedExpenseLAK: 6800000,
  avgInterestPerLoanLAK: 500000,
  contractsToBreakEven: 14,
  currentActiveLoans: 56,
  breakEvenSafetyMarginPercent: 300,
};

export const financialForecastData = [
  { month: 'ກັນຍາ 26 (ຄາດກາ)', projectedIncome: 35000000, projectedExpense: 6200000, projectedProfit: 28800000, confidence: '95%' },
  { month: 'ຕຸລາ 26 (ຄາດກາ)', projectedIncome: 38000000, projectedExpense: 6400000, projectedProfit: 31600000, confidence: '92%' },
  { month: 'ພະຈິກ 26 (ຄາດກາ)', projectedIncome: 41000000, projectedExpense: 6600000, projectedProfit: 34400000, confidence: '88%' }
];

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
  continuous24Months: [
    // 2025
    { month: 'ມັງກອນ 25', shortMonth: 'ມ.ກ 25', year: '2025', interestIncome: 11200000, income: 11200000, adsExpense: 1500000, salaryExpense: 1200000, officeExpense: 800000, expense: 3500000, profit: 7700000, margin: 68.8, growthMoM: 'ເລີ່ມຕົ້ນ' },
    { month: 'ກຸມພາ 25', shortMonth: 'ກ.ພ 25', year: '2025', interestIncome: 12400000, income: 12400000, adsExpense: 1600000, salaryExpense: 1300000, officeExpense: 800000, expense: 3700000, profit: 8700000, margin: 70.2, growthMoM: '+10.7%' },
    { month: 'ມີນາ 25', shortMonth: 'ມີ.ນ 25', year: '2025', interestIncome: 13200000, income: 13200000, adsExpense: 1700000, salaryExpense: 1300000, officeExpense: 800000, expense: 3800000, profit: 9400000, margin: 71.2, growthMoM: '+6.4%' },
    { month: 'ເມສາ 25', shortMonth: 'ເມ.ສ 25', year: '2025', interestIncome: 14800000, income: 14800000, adsExpense: 1800000, salaryExpense: 1400000, officeExpense: 900000, expense: 4100000, profit: 10700000, margin: 72.3, growthMoM: '+12.1%' },
    { month: 'ພຶດສະພາ 25', shortMonth: 'ພ.ສ 25', year: '2025', interestIncome: 13900000, income: 13900000, adsExpense: 1900000, salaryExpense: 1400000, officeExpense: 900000, expense: 4200000, profit: 9700000, margin: 69.8, growthMoM: '-6.0%' },
    { month: 'ມິຖຸນາ 25', shortMonth: 'ມິ.ຖ 25', year: '2025', interestIncome: 15500000, income: 15500000, adsExpense: 1700000, salaryExpense: 1400000, officeExpense: 900000, expense: 4000000, profit: 11500000, margin: 74.2, growthMoM: '+11.5%' },
    { month: 'ກໍລະກົດ 25', shortMonth: 'ກ.ລ 25', year: '2025', interestIncome: 16800000, income: 16800000, adsExpense: 1900000, salaryExpense: 1500000, officeExpense: 900000, expense: 4300000, profit: 12500000, margin: 74.4, growthMoM: '+8.3%' },
    { month: 'ສິງຫາ 25', shortMonth: 'ສ.ຫ 25', year: '2025', interestIncome: 18500000, income: 18500000, adsExpense: 2000000, salaryExpense: 1500000, officeExpense: 900000, expense: 4400000, profit: 14100000, margin: 76.2, growthMoM: '+10.1%' },
    { month: 'ກັນຍາ 25', shortMonth: 'ກ.ຍ 25', year: '2025', interestIncome: 17200000, income: 17200000, adsExpense: 1900000, salaryExpense: 1500000, officeExpense: 900000, expense: 4300000, profit: 12900000, margin: 75.0, growthMoM: '-7.0%' },
    { month: 'ຕຸລາ 25', shortMonth: 'ຕ.ລ 25', year: '2025', interestIncome: 18900000, income: 18900000, adsExpense: 2000000, salaryExpense: 1600000, officeExpense: 900000, expense: 4500000, profit: 14400000, margin: 76.2, growthMoM: '+9.8%' },
    { month: 'ພະຈິກ 25', shortMonth: 'ພ.ຈ 25', year: '2025', interestIncome: 19800000, income: 19800000, adsExpense: 2000000, salaryExpense: 1700000, officeExpense: 900000, expense: 4600000, profit: 15200000, margin: 76.8, growthMoM: '+4.7%' },
    { month: 'ທັນວາ 25', shortMonth: 'ທ.ວ 25', year: '2025', interestIncome: 21500000, income: 21500000, adsExpense: 2100000, salaryExpense: 1800000, officeExpense: 900000, expense: 4800000, profit: 16700000, margin: 77.7, growthMoM: '+8.5%' },

    // 2026
    { month: 'ມັງກອນ 26', shortMonth: 'ມ.ກ 26', year: '2026', interestIncome: 18500000, income: 18500000, adsExpense: 1900000, salaryExpense: 1500000, officeExpense: 800000, expense: 4200000, profit: 14300000, margin: 77.3, growthMoM: '-13.9%' },
    { month: 'ກຸມພາ 26', shortMonth: 'ກ.ພ 26', year: '2026', interestIncome: 20800000, income: 20800000, adsExpense: 2000000, salaryExpense: 1600000, officeExpense: 900000, expense: 4500000, profit: 16300000, margin: 78.4, growthMoM: '+12.4%' },
    { month: 'ມີນາ 26', shortMonth: 'ມີ.ນ 26', year: '2026', interestIncome: 19900000, income: 19900000, adsExpense: 2100000, salaryExpense: 1800000, officeExpense: 900000, expense: 4800000, profit: 15100000, margin: 75.9, growthMoM: '-4.3%' },
    { month: 'ເມສາ 26', shortMonth: 'ເມ.ສ 26', year: '2026', interestIncome: 23200000, income: 23200000, adsExpense: 2300000, salaryExpense: 2000000, officeExpense: 1000000, expense: 5300000, profit: 17900000, margin: 77.2, growthMoM: '+16.5%' },
    { month: 'ພຶດສະພາ 26', shortMonth: 'ພ.ສ 26', year: '2026', interestIncome: 21800000, income: 21800000, adsExpense: 2200000, salaryExpense: 1900000, officeExpense: 1000000, expense: 5100000, profit: 16700000, margin: 76.6, growthMoM: '-6.0%' },
    { month: 'ມິຖຸນາ 26', shortMonth: 'ມິ.ຖ 26', year: '2026', interestIncome: 25500000, income: 25500000, adsExpense: 2300000, salaryExpense: 2100000, officeExpense: 1000000, expense: 5400000, profit: 20100000, margin: 78.8, growthMoM: '+16.9%' },
    { month: 'ກໍລະກົດ 26', shortMonth: 'ກ.ລ 26', year: '2026', interestIncome: 27800000, income: 27800000, adsExpense: 2400000, salaryExpense: 2200000, officeExpense: 1100000, expense: 5700000, profit: 22100000, margin: 79.5, growthMoM: '+9.0%' },
    { month: 'ສິງຫາ 26', shortMonth: 'ສ.ຫ 26', year: '2026', interestIncome: 31400000, income: 31400000, adsExpense: 2500000, salaryExpense: 2300000, officeExpense: 1100000, expense: 5900000, profit: 25500000, margin: 81.2, growthMoM: '+12.9%' },
    { month: 'ກັນຍາ 26', shortMonth: 'ກ.ຍ 26', year: '2026', interestIncome: 33500000, income: 33500000, adsExpense: 2600000, salaryExpense: 2400000, officeExpense: 1100000, expense: 6100000, profit: 27400000, margin: 81.8, growthMoM: '+6.6%' },
    { month: 'ຕຸລາ 26', shortMonth: 'ຕ.ລ 26', year: '2026', interestIncome: 35800000, income: 35800000, adsExpense: 2700000, salaryExpense: 2500000, officeExpense: 1100000, expense: 6300000, profit: 29500000, margin: 82.4, growthMoM: '+6.8%' },
    { month: 'ພະຈິກ 26', shortMonth: 'ພ.ຈ 26', year: '2026', interestIncome: 38200000, income: 38200000, adsExpense: 2800000, salaryExpense: 2600000, officeExpense: 1100000, expense: 6500000, profit: 31700000, margin: 83.0, growthMoM: '+6.7%' },
    { month: 'ທັນວາ 26', shortMonth: 'ທ.ວ 26', year: '2026', interestIncome: 42200000, income: 42200000, adsExpense: 2900000, salaryExpense: 2700000, officeExpense: 1200000, expense: 6800000, profit: 35400000, margin: 83.9, growthMoM: '+10.4%' }
  ]
};

export const initialWallets = [
  { id: 'W-CASH', name: 'ເງິນສົດ (Cash Vault)', type: 'CASH', icon: '💵', balanceLAK: 8400000, color: '#f59e0b', accountNo: 'CASH-VAULT', status: '✅ Reconciled ຕົງ 100%' },
  { id: 'W-BCEL', name: 'BCEL One (ທະນາຄານການຄ້າ)', type: 'BANK', icon: '🏦', balanceLAK: 45200000, color: '#6366f1', accountNo: '160-12-0001234-001', status: '✅ Statement Verified' },
  { id: 'W-LDB', name: 'LDB Trust (ທະນາຄານພັດທະນາລາວ)', type: 'BANK', icon: '🏬', balanceLAK: 12000000, color: '#06b6d4', accountNo: '020-55-0011223-001', status: '✅ Statement Verified' },
  { id: 'W-JDB', name: 'JDB (ທະນາຄານ ຈອມເພັດ/ຈອຍທ໌)', type: 'BANK', icon: '🏛️', balanceLAK: 18500000, color: '#a855f7', accountNo: '550-10-8889911-002', status: '✅ Statement Verified' },
  { id: 'W-APB', name: 'APB (ທະນາຄານສົ່ງເສີມກorigິກຳ)', type: 'BANK', icon: '🌾', balanceLAK: 6800000, color: '#10b981', accountNo: '880-99-223311-001', status: '✅ Statement Verified' }
];

export const expenseCategories = [
  { id: 'EXP-ADS', name: '📢 ຄ່າ Ads ໂຄສະນາ (Facebook/TikTok)', icon: '📢', color: '#ef4444', budgetLAK: 4000000, totalSpentLAK: 2900000, status: '🟢 Safe (72.5%)' },
  { id: 'EXP-SALARY', name: '👥 ເງິນເດືອນພະນັກງານ', icon: '👥', color: '#6366f1', budgetLAK: 8000000, totalSpentLAK: 2700000, status: '🟢 Safe (33.7%)' },
  { id: 'EXP-SERVER', name: '🏠 ຄ່າເຊົ່າ & IT Server Cloud', icon: '🏠', color: '#8b5cf6', budgetLAK: 2500000, totalSpentLAK: 1200000, status: '🟢 Safe (48.0%)' },
  { id: 'EXP-FUEL', name: '🚗 ຄ່ານ້ຳມັນ & ຕິດຕາມໜີ້', icon: '🚗', color: '#3b82f6', budgetLAK: 1800000, totalSpentLAK: 850000, status: '🟢 Safe (47.2%)' },
  { id: 'EXP-FOOD', name: '🍜 ອາຫານ & ຮັບຮອງລູກຄ້າ', icon: '🍜', color: '#f97316', budgetLAK: 3500000, totalSpentLAK: 1100000, status: '🟢 Safe (31.4%)' }
];

export const incomeCategories = [
  { id: 'INC-INTEREST', name: '💼 ດອກເບ້ຍສິນເຊື່ອ (Loan Interest)', icon: '💼', color: '#34d399', totalLAK: 37100000 }
];

export const initialTransactions = [
  {
    id: 'TX-001',
    date: '2026-08-24 10:30',
    type: 'INCOME',
    category: '💼 ດອກເບ້ຍສິນເຊື່ອ (Loan Interest)',
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
    category: '📢 ຄ່າ Ads ໂຄສະນາ (Facebook/TikTok)',
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
