// Core Financial Data Engine: 4-Currency Engine (LAK, THB, USD, CNY), Multi-Wallets, Budgets, and Goals

export const defaultExchangeRates = {
  lak: 1,
  thbToLak: 630,      // 1 THB = 630 LAK
  usdToLak: 22500,    // 1 USD = 22,500 LAK
  cnyToLak: 3100,     // 1 CNY = 3,100 LAK
  rubToLak: 275,      // 1 RUB = 275 LAK
  lastUpdated: '2026-08-19'
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

// 1.2 Accounts & Wallets Master Schema
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

// 1.4 Categories Management Schema
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

// 1.5 Savings Goals Schema
export const initialSavingsGoals = [
  { id: 'GOAL-01', name: '🏍️ ອອມເງິນຊື້ລົດຈັກໃໝ່', targetLAK: 25000000, currentLAK: 18500000, targetDate: '2026-12-31', color: '#3b82f6', icon: '🏍️' },
  { id: 'GOAL-02', name: '🛡️ ກອງທຶນສຸກເສີນ (Emergency Reserve)', targetLAK: 50000000, currentLAK: 32000000, targetDate: '2027-06-30', color: '#10b981', icon: '🛡️' },
  { id: 'GOAL-03', name: '💻 ອັບເກຣດ Laptop & IT System', targetLAK: 15000000, currentLAK: 12500000, targetDate: '2026-10-15', color: '#a855f7', icon: '💻' }
];

// 1.3 Recurring Transactions Schema (ລາຍການອັດຕະໂນມັດ)
export const initialRecurringTransactions = [
  { id: 'REC-01', title: 'ຄ່າເຊົ່າຫ້ອງການປະຈຳເດືອນ', amount: 2500000, currency: 'LAK', type: 'EXPENSE', category: '🏠 ທີ່ຢູ່ອາໄສ & ສາທາລະນູປະໂພກ', frequency: 'MONTHLY', nextDate: '2026-09-01' },
  { id: 'REC-02', title: 'ຄ່າສະມາຊິກ Netflix & Cloud Server', amount: 350000, currency: 'LAK', type: 'EXPENSE', category: '🏠 ທີ່ຢູ່ອາໄສ & ສາທາລະນູປະໂພກ', frequency: 'MONTHLY', nextDate: '2026-08-25' },
  { id: 'REC-03', title: 'ເງິນເດືອນພະນັກງານ', amount: 8000000, currency: 'LAK', type: 'EXPENSE', category: '👥 ເງິນເດືອນພະນັກງານ', frequency: 'MONTHLY', nextDate: '2026-08-30' }
];

// 1.3 Transactions Master List (Supports INCOME, EXPENSE, TRANSFER)
export const initialTransactions = [
  {
    id: 'TX-001',
    date: '2026-08-18 10:30',
    type: 'INCOME',
    category: '💼 ດອກເບ້ຍສິນເຊື່ອ & ບໍລິການ (Loan Interest)',
    walletId: 'W-BCEL',
    walletName: 'BCEL One',
    targetWalletId: null,
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
    date: '2026-08-17 14:15',
    type: 'EXPENSE',
    category: '📢 ຄ່າ Ads ໂຄສະນາ & ການຕະຫຼາດ',
    walletId: 'W-BCEL',
    walletName: 'BCEL One',
    targetWalletId: null,
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
    date: '2026-08-16 09:00',
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
  },
  {
    id: 'TX-004',
    date: '2026-08-15 18:45',
    type: 'EXPENSE',
    category: '🍜 ອາຫານ & ເຄື່ອງດື່ມ',
    walletId: 'W-CASH',
    walletName: 'ເງິນສົດ',
    targetWalletId: null,
    amount: 450000,
    currency: 'LAK',
    paymentMethod: 'CASH',
    tags: ['#ລ້ຽງທີມງານ', '#ງານສັງສັນ'],
    customerName: 'ຮ້ານອາຫານ ວຽງຈັນ',
    slipUrl: '',
    note: 'ລ້ຽງອາຫານສັງສັນປະຈຳອາທິດ'
  },
  {
    id: 'TX-005',
    date: '2026-08-14 11:20',
    type: 'INCOME',
    category: '💻 ທຸລະກິດ / ຄ້າຂາຍ (Business Sales)',
    walletId: 'W-BCEL',
    walletName: 'BCEL One',
    targetWalletId: null,
    amount: 1500,
    currency: 'USD',
    paymentMethod: 'TRANSFER',
    tags: ['#ຮັບເງິນໂດລາ', '#ໂຄງການA'],
    customerName: 'ລູກຄ້າຕ່າງປະເທດ USD',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ຮັບເງິນຊຳລະໂຄງການ ຕ່າງປະເທດ USD'
  }
];
