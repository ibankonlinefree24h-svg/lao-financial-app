// Monthly Loans Data & Calculation Engine

export function calculateMonthlyLoanStatus(loan, todayDateStr = '2026-08-12') {
  const { amountLAK, amountRUB, interestRate, paidAmount, dueDate } = loan;
  const isLAK = amountLAK !== undefined && amountLAK !== null;
  const principal = isLAK ? amountLAK : amountRUB;

  const interestAmount = Math.round((principal * interestRate) / 100);
  const totalAmount = principal + interestAmount;
  const remaining = Math.max(0, totalAmount - (paidAmount || 0));

  // 1. <ປິດຍອດ>: Fully paid
  if (paidAmount >= totalAmount || remaining === 0) {
    return {
      type: 'ປິດຍອດ',
      label: 'ປິດຍອດ',
      color: 'green',
      badgeBg: '#10b981',
      principal,
      interestAmount,
      totalAmount,
      remaining
    };
  }

  // 2. Interest payment statuses
  if (paidAmount > 0) {
    if (paidAmount === interestAmount) {
      return {
        type: 'ຊຳລະດອກ',
        label: 'ຊຳລະດອກ',
        color: 'emerald',
        badgeBg: '#059669',
        principal,
        interestAmount,
        totalAmount,
        remaining
      };
    } else if (paidAmount > interestAmount && paidAmount < totalAmount) {
      return {
        type: 'ຊຳລະເກີນດອກ',
        label: 'ຊຳລະເກີນດອກ',
        color: 'cyan',
        badgeBg: '#06b6d4',
        principal,
        interestAmount,
        totalAmount,
        remaining
      };
    } else if (paidAmount < interestAmount) {
      return {
        type: 'ຊຳລະບໍ່ເກີນດອກ',
        label: 'ຊຳລະບໍ່ເກີນດອກ',
        color: 'amber',
        badgeBg: '#f59e0b',
        principal,
        interestAmount,
        totalAmount,
        remaining
      };
    }
  }

  // 3. Date countdown / overdue status relative to due date
  const today = new Date(todayDateStr);
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Countdown (-7 to -1) before due date
  if (diffDays > 0 && diffDays <= 7) {
    return {
      type: 'COUNTDOWN',
      label: `-${diffDays}`,
      color: 'indigo',
      badgeBg: '#6366f1',
      diffDays,
      principal,
      interestAmount,
      totalAmount,
      remaining
    };
  }

  // Exactly on due date
  if (diffDays === 0) {
    return {
      type: 'DUE_TODAY',
      label: 'ຢູ່ໃນກຳນົດ',
      color: 'blue',
      badgeBg: '#3b82f6',
      diffDays: 0,
      principal,
      interestAmount,
      totalAmount,
      remaining
    };
  }

  // Overdue (+1 to +7)
  if (diffDays < 0 && Math.abs(diffDays) <= 7) {
    const overdueDays = Math.abs(diffDays);
    return {
      type: 'OVERDUE',
      label: `+${overdueDays}`,
      color: 'pink',
      badgeBg: '#ec4899',
      diffDays,
      principal,
      interestAmount,
      totalAmount,
      remaining
    };
  }

  // Over 7 days overdue without payment -> Recalculate interest UP
  if (diffDays < 0 && Math.abs(diffDays) > 7) {
    return {
      type: 'RECALCULATE_UP',
      label: 'ຄຳນວນດອກຂຶ້ນ',
      color: 'red',
      badgeBg: '#ef4444',
      diffDays,
      principal,
      interestAmount,
      totalAmount,
      remaining
    };
  }

  // Default active loan
  return {
    type: 'ກຳລັງກູ້',
    label: 'ກຳລັງກູ້',
    color: 'emerald',
    badgeBg: '#10b981',
    principal,
    interestAmount,
    totalAmount,
    remaining
  };
}

export const initialMonthlyLoans = {
  '2026-08': {
    LAK: [
      {
        id: 'ML-LAK-001',
        customerId: 'CUST-001',
        customerName: 'ສົມໄຊ ພິມມະສອນ',
        customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: '+856 20 5551 2345',
        pin: '1234',
        amountLAK: 4500000,
        interestRate: 5.0,
        loanDate: '2026-08-01',
        dueDate: '2026-08-30',
        paidAmount: 225000, // Exactly interest amount -> <ຊຳລະດອກ>
        isVipCare: true,
        loanHistoryLines: [
          { dateTaken: '2026-08-01', amount: 4500000, dueDate: '2026-08-30' }
        ]
      },
      {
        id: 'ML-LAK-002',
        customerId: 'CUST-002',
        customerName: 'ຈັນທະສອນ ວົງສາ',
        customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+856 20 9988 7766',
        pin: '5678',
        amountLAK: 2500000,
        interestRate: 6.0,
        loanDate: '2026-08-05',
        dueDate: '2026-08-12', // Due TODAY -> <ຢູ່ໃນກຳນົດ>
        paidAmount: 0,
        isVipCare: false,
        loanHistoryLines: [
          { dateTaken: '2026-08-05', amount: 2500000, dueDate: '2026-08-12' }
        ]
      },
      {
        id: 'ML-LAK-003',
        customerId: 'CUST-004',
        customerName: 'ມະລີວອນ ສຸລິຍາ',
        customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '+7 999 123 4567',
        pin: '9988',
        amountLAK: 6000000, // High debt >= 4M LAK
        interestRate: 5.5,
        loanDate: '2026-08-01',
        dueDate: '2026-08-08', // 4 days overdue -> <+4>
        paidAmount: 0,
        isVipCare: true,
        loanHistoryLines: [
          { dateTaken: '2026-08-01', amount: 6000000, dueDate: '2026-08-08' }
        ]
      }
    ],
    RUB: [
      {
        id: 'ML-RUB-001',
        customerId: 'CUST-001',
        customerName: 'ສົມໄຊ ພິມມະສອນ',
        customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        phone: '+856 20 5551 2345',
        pin: '1234',
        amountRUB: 16000, // High debt >= 15k RUB
        interestRate: 5.0,
        loanDate: '2026-08-01',
        dueDate: '2026-08-15', // 3 days before due -> <-3>
        paidAmount: 800,
        isVipCare: false,
        loanHistoryLines: [
          { dateTaken: '2026-08-01', amount: 16000, dueDate: '2026-08-15' }
        ]
      },
      {
        id: 'ML-RUB-002',
        customerId: 'CUST-004',
        customerName: 'ມະລີວອນ ສຸລິຍາ',
        customerPhoto: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
        phone: '+7 999 123 4567',
        pin: '9988',
        amountRUB: 20000,
        interestRate: 5.5,
        loanDate: '2026-07-20',
        dueDate: '2026-08-01', // Over 7 days overdue -> <ຄຳນວນດອກຂຶ້ນ>
        paidAmount: 0,
        isVipCare: true,
        loanHistoryLines: [
          { dateTaken: '2026-07-20', amount: 20000, dueDate: '2026-08-01' }
        ]
      }
    ]
  },
  '2026-07': {
    LAK: [
      {
        id: 'ML-LAK-0701',
        customerId: 'CUST-002',
        customerName: 'ຈັນທະສອນ ວົງສາ',
        customerPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        phone: '+856 20 9988 7766',
        pin: '5678',
        amountLAK: 2500000,
        interestRate: 6.0,
        loanDate: '2026-07-05',
        dueDate: '2026-07-30',
        paidAmount: 2650000, // <ປິດຍອດ>
        isVipCare: false,
        loanHistoryLines: [
          { dateTaken: '2026-07-05', amount: 2500000, dueDate: '2026-07-30' }
        ]
      }
    ],
    RUB: []
  }
};
