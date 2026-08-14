// Income & Expense Data, Exchange Rate Engine, and Smart Financial Allocator

export const defaultExchangeRate = {
  rubToLak: 275, // 1 RUB = 275 LAK
  lastUpdated: '2026-08-13'
};

export function convertToLAK(amount, currency, rubToLakRate = 275) {
  if (currency === 'RUB') {
    return Math.round(amount * rubToLakRate);
  }
  return amount;
}

// Financial Planning & Smart Budget Allocation Calculator (50/30/20 Rule adapted for Lending Business)
export function calculateSmartFinancialBudget(netProfitLAK, totalIncomeLAK) {
  const baseAmount = netProfitLAK > 0 ? netProfitLAK : totalIncomeLAK;

  // Recommended Budget Distribution:
  // 1. Operating & Living Expense (ງົບໃຊ້ຈ່າຍປະຈຳ): 35%
  // 2. Investment & Loan Capital Expansion (ເກັບລົງທຶນປ່ອຍກູ້ຕໍ່): 45%
  // 3. Emergency Reserve Savings (ເງິນອອມສຳຮອງ): 20%

  const operatingExpenseBudget = Math.round(baseAmount * 0.35);
  const investmentBudget = Math.round(baseAmount * 0.45);
  const emergencySavingsBudget = Math.round(baseAmount * 0.20);

  return {
    baseAmount,
    operatingExpenseBudget,
    investmentBudget,
    emergencySavingsBudget
  };
}

export const initialTransactions = [
  {
    id: 'TX-001',
    date: '2026-08-10',
    type: 'INCOME', // 'INCOME' or 'EXPENSE'
    category: 'ດອກເບ້ຍສິນເຊື່ອ (Interest Profit)',
    customerId: 'CUST-001',
    customerName: 'ສົມໄຊ ພິມມະສອນ',
    currency: 'LAK',
    amount: 225000,
    paymentMethod: 'TRANSFER', // 'TRANSFER' or 'CASH'
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ຊຳລະດອກເບ້ຍປະຈຳເດືອນ 8'
  },
  {
    id: 'TX-002',
    date: '2026-08-08',
    type: 'INCOME',
    category: 'ດອກເບ້ຍສິນເຊື່ອ ຣັດເຊຍ',
    customerId: 'CUST-001',
    customerName: 'ສົມໄຊ ພິມມະສອນ',
    currency: 'RUB',
    amount: 800,
    paymentMethod: 'TRANSFER',
    slipUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300&auto=format&fit=crop&q=80',
    note: 'ຊຳລະດອກເບ້ຍ RUB'
  },
  {
    id: 'TX-003',
    date: '2026-08-05',
    type: 'EXPENSE',
    category: 'ຄ່າເຊົ່າອຸປະກອນ & ລະບົບ',
    customerId: null,
    customerName: 'ບໍລິສັດ ໄອທີ',
    currency: 'LAK',
    amount: 1500000,
    paymentMethod: 'TRANSFER',
    slipUrl: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=300&auto=format&fit=crop&q=80',
    note: 'ຄ່າເຊົ່າ Server & Cloud Database'
  },
  {
    id: 'TX-004',
    date: '2026-08-03',
    type: 'EXPENSE',
    category: 'ຄ່າການຕະຫຼາດ & ໂຄສະນາ',
    customerId: null,
    customerName: 'Facebook Ads',
    currency: 'RUB',
    amount: 2000,
    paymentMethod: 'TRANSFER',
    slipUrl: '',
    note: 'ໂຄສະນາຫາລູກຄ້າກູ້ ຕ່າງປະເທດ'
  },
  {
    id: 'TX-005',
    date: '2026-08-01',
    type: 'EXPENSE',
    category: 'ຄ່າໃຊ້ຈ່າຍເງິນສົດທົ່ວໄປ',
    customerId: null,
    customerName: 'ພະນັກງານ',
    currency: 'LAK',
    amount: 500000,
    paymentMethod: 'CASH',
    slipUrl: '',
    note: 'ເງິນສົດ ຄ່ານ້ຳມັນ & ພາຫະນະຕິດຕາມໜີ້'
  }
];
