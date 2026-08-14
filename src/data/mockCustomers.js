// Helper to compute automatic customer statuses based on user specifications
export function calculateCustomerStatuses(customer) {
  const statuses = [];

  // Check manual override statuses first
  if (customer.manualStatus === 'ຖືກແບນ') {
    statuses.push({ type: 'ຖືກແບນ', label: 'ຖືກແບນ', color: 'purple', badgeBg: '#a855f7', isManual: true });
  }
  if (customer.manualStatus === 'ປະຈານ') {
    statuses.push({ type: 'ປະຈານ', label: 'ປະຈານ', color: 'orange', badgeBg: '#f97316', isManual: true });
  }

  const currentMonthLoan = customer.loanHistory?.find((h) => h.month === '2026-08');
  const hasActiveCurrentLoan = currentMonthLoan && currentMonthLoan.amountLAK > 0;

  // 1. <ກຳລັງກູ້>: Green (Active loan in current month 08/2026)
  if (hasActiveCurrentLoan && !customer.manualStatus) {
    statuses.push({ type: 'ກຳລັງກູ້', label: 'ກຳລັງກູ້', color: 'green', badgeBg: '#10b981' });
  }

  // 2. <ອອບໄລນ໌>: Grey (Offline for X months after loan ended without taking new loan)
  if (!hasActiveCurrentLoan && !customer.manualStatus) {
    // calculate months offline from last active loan month
    const monthsOffline = customer.monthsOffline || 3;
    statuses.push({ type: 'ອອບໄລນ໌', label: `ອອບໄລນ໌ (${monthsOffline} ເດືອນ)`, color: 'grey', badgeBg: '#64748b' });
  }

  // 3. <ເລີ່ມມີບັນຫາ>: Pink (Unpaid for 2 consecutive months or more, e.g. Month 7 & Month 8)
  const unpaidConsecutiveMonths = customer.unpaidConsecutiveMonths || 0;
  if (unpaidConsecutiveMonths >= 2) {
    statuses.push({
      type: 'ເລີ່ມມີບັນຫາ',
      label: `ເລີ່ມມີບັນຫາ (${unpaidConsecutiveMonths} ເດືອນ)`,
      color: 'pink',
      badgeBg: '#ec4899'
    });
  }

  // 4. <ຈຳນວນໜີ້ຫຼາຍ>: Red (Current month loan amount >= 4,000,000 LAK or >= 15,000 RUB)
  const lak = currentMonthLoan ? currentMonthLoan.amountLAK : customer.currentActiveLoanLAK || 0;
  const rub = currentMonthLoan ? currentMonthLoan.amountRUB : customer.currentActiveLoanRUB || 0;

  if (lak >= 4000000 || rub >= 15000) {
    statuses.push({
      type: 'ຈຳນວນໜີ້ຫຼາຍ',
      label: 'ຈຳນວນໜີ້ຫຼາຍ',
      color: 'red',
      badgeBg: '#ef4444'
    });
  }

  return statuses;
}

export const initialCustomers = [
  {
    id: 'CUST-001',
    code: 'L-2026-001',
    name: 'ສົມໄຊ ພິມມະສອນ',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    invoiceLink: 'https://drive.google.com/file/d/1_invoice_001_lak/view',
    interestRate: 5.0,
    manualStatus: null, // Options: null, 'ຖືກແບນ', 'ປະຈານ'
    age: 24,
    occupation: 'ນັກສຶກສາ ມະຫາວິທະຍາໄລ',
    currentAddress: {
      village: 'ໂພນໄຊ',
      district: 'ໄຊເສດຖາ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    schoolOrWorkplace: 'ມະຫາວິທະຍາໄລແຫ່ງຊາດ (ດົງໂດກ)',
    schoolOrWorkplaceAddress: {
      village: 'ດົງໂດກ',
      district: 'ໄຊທານີ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    googleMapsUrl: 'https://maps.google.com/?q=17.9757,102.6331',
    major: 'ເຕັກໂນໂລຊີສາລະສານ (IT)',
    startYear: 2023,
    graduationYear: 2027,
    currentActiveLoanLAK: 4500000,
    currentActiveLoanRUB: 16000,
    unpaidConsecutiveMonths: 2, // Trigger Pink <ເລີ່ມມີບັນຫາ>
    monthsOffline: 0,
    loanHistory: [
      { month: '2026-08', status: 'ACTIVE', paid: false, amountLAK: 4500000, amountRUB: 16000, profitLAK: 225000, profitRUB: 800 },
      { month: '2026-07', status: 'UNPAID', paid: false, amountLAK: 4500000, amountRUB: 16000, profitLAK: 225000, profitRUB: 800 },
      { month: '2026-06', status: 'PAID', paid: true, amountLAK: 3000000, amountRUB: 10000, profitLAK: 150000, profitRUB: 500 },
      { month: '2026-05', status: 'PAID', paid: true, amountLAK: 3000000, amountRUB: 10000, profitLAK: 150000, profitRUB: 500 }
    ],
    facebookBorrower: 'https://facebook.com/somxai.pimmason',
    facebookGuarantor1: 'https://facebook.com/guarantor1.somxai',
    facebookGuarantor2: 'https://facebook.com/guarantor2.somxai',
    facebookGuarantor3: 'https://facebook.com/guarantor3.somxai',
    whatsappNumber: '+856 20 5551 2345',
    driveDocumentsUrl: 'https://drive.google.com/drive/folders/somxai-docs-001',
    contractUrl: 'CONTRACT-001',
    contractData: {
      title: 'ສັນຍາກູ້ຢືມເງິນປະຈຳເດືອນ',
      fontFamily: 'Phetsarath OT',
      fontSize: 12,
      watermarkOpacity: 0.15,
      showStamp: true,
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      content: `ສັນຍາສະບັບນີ້ເຮັດຂຶ້ນຢູ່ ນະຄອນຫຼວງວຽງຈັນ, ສປປ ລາວ.
ລະຫວ່າງ ຝ່າຍຜູ້ໃຫ້ກູ້ (ລະບົບການເງິນ) ແລະ ຝ່າຍຜູ້ກູ້: ທ້າວ ສົມໄຊ ພິມມະສອນ, ລະຫັດ L-2026-001.

1. ຈຳນວນເງິນກູ້: 4,500,000 ກີບ (ສີ່ລ້ານຫ້າແສນກີບ) ແລະ 16,000 ຣູບລ໌.
2. ອັດຕາດອກເບ້ຍ: 5.0% ຕໍ່ເດືອນ.
3. ກຳນົດເວລາຊຳລະ: ທຸກໆວັນທີ 30 ຂອງເດືອນ.
4. ຜູ້ຄ້ຳປະກັນ: ໄດ້ຮັບການຢືນຢັນເອກະສານ ແລະ ໂຊຊຽວມີເດຍຄົບຖ້ວນ.

ຜູ້ກູ້ໄດ້ອ່ານ ແລະ ຍອມຮັບເງື່ອນໄຂທັງໝົດໃນສັນຍາສະບັບນີ້ຢ່າງສົມບູນ.`
    },
    chatHistory: [
      { id: 1, date: '2026-08-10 14:30', sender: 'Admin', text: 'ແຈ້ງເຕືອນຄ່າງວດປະຈຳເດືອນ 8' },
      { id: 2, date: '2026-08-10 14:45', sender: 'ສົມໄຊ', text: 'ຂໍຜ່ອນຜັນຊຳລະວັນທີ 15 ໄດ້ບໍ່ครับ' },
      { id: 3, date: '2026-08-11 09:15', sender: 'Admin', text: 'ອະນຸມັດຜ່ອນຜັນເຖິງວັນທີ 15 ກະລຸນາຊຳລະຕາມນັດ' }
    ]
  },
  {
    id: 'CUST-002',
    code: 'L-2026-002',
    name: 'ຈັນທະສອນ ວົງສາ',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    invoiceLink: 'https://drive.google.com/file/d/2_invoice_002_lak/view',
    interestRate: 6.0,
    manualStatus: null,
    age: 27,
    occupation: 'ພະນັກງານບໍລິສັດເອກະຊົນ',
    currentAddress: {
      village: 'ໜອງບອນ',
      district: 'ໄຊເສດຖາ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    schoolOrWorkplace: 'ບໍລິສັດ ໄອທີ ໂຊລູຊັນ ຈຳກັດ',
    schoolOrWorkplaceAddress: {
      village: 'ທາດຫຼວງ',
      district: 'ໄຊເສດຖາ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    googleMapsUrl: 'https://maps.google.com/?q=17.968,102.625',
    major: 'ບໍລິຫານທຸລະກິດ (BBA)',
    startYear: 2021,
    graduationYear: 2025,
    currentActiveLoanLAK: 2500000,
    currentActiveLoanRUB: 8000,
    unpaidConsecutiveMonths: 0,
    monthsOffline: 0,
    loanHistory: [
      { month: '2026-08', status: 'ACTIVE', paid: true, amountLAK: 2500000, amountRUB: 8000, profitLAK: 150000, profitRUB: 480 },
      { month: '2026-07', status: 'PAID', paid: true, amountLAK: 2500000, amountRUB: 8000, profitLAK: 150000, profitRUB: 480 }
    ],
    facebookBorrower: 'https://facebook.com/chanthasone.vongsah',
    facebookGuarantor1: 'https://facebook.com/guarantor1.chan',
    facebookGuarantor2: 'https://facebook.com/guarantor2.chan',
    facebookGuarantor3: '',
    whatsappNumber: '+856 20 9988 7766',
    driveDocumentsUrl: 'https://drive.google.com/drive/folders/chanthasone-docs-002',
    contractUrl: 'CONTRACT-002',
    contractData: {
      title: 'ສັນຍາກູ້ຢືມເງິນປະຈຳເດືອນ',
      fontFamily: 'Phetsarath OT',
      fontSize: 12,
      watermarkOpacity: 0.12,
      showStamp: true,
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      content: `ສັນຍາກູ້ຢືມເງິນ ລະຫັດ L-2026-002.
ຜູ້ກູ້: ນາງ ຈັນທະສອນ ວົງສາ.
ຍອດກູ້ປະຈຳເດືອນ: 2,500,000 ກີບ ແລະ 8,000 ຣູບລ໌.
ດອກເບ້ຍ 6.0% ຕໍ່ເດືອນ.`
    },
    chatHistory: [
      { id: 1, date: '2026-08-01 10:00', sender: 'Admin', text: 'ສ່ງໃບແຈ້ງໜີ້ປະຈຳເດືອນ 8' },
      { id: 2, date: '2026-08-02 11:30', sender: 'ຈັນທະສອນ', text: 'ໂອນແລ້ວເດີ້ ຫຼັກຖານໃນສະລິບ' }
    ]
  },
  {
    id: 'CUST-003',
    code: 'L-2026-003',
    name: 'ບຸນມີ ໄຊຍະວົງ',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    invoiceLink: 'https://drive.google.com/file/d/3_invoice_003_lak/view',
    interestRate: 7.5,
    manualStatus: 'ຖືກແບນ', // Trigger Purple <ຖືກແບນ>
    age: 29,
    occupation: 'ທຸລະກິດສ່ວນຕົວ',
    currentAddress: {
      village: 'ສີໂຮມ',
      district: 'ຈັນທະບູລີ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    schoolOrWorkplace: 'ຮ້ານຄ້າ ບຸນມີ ການຄ້າ',
    schoolOrWorkplaceAddress: {
      village: 'ສີໂຮມ',
      district: 'ຈັນທະບູລີ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    googleMapsUrl: 'https://maps.google.com/?q=17.971,102.612',
    major: 'ການເງິນ-ການທະນາຄານ',
    startYear: 2018,
    graduationYear: 2022,
    currentActiveLoanLAK: 0,
    currentActiveLoanRUB: 0,
    unpaidConsecutiveMonths: 3,
    monthsOffline: 4,
    loanHistory: [
      { month: '2026-04', status: 'UNPAID', paid: false, amountLAK: 5000000, amountRUB: 18000, profitLAK: 375000, profitRUB: 1350 }
    ],
    facebookBorrower: 'https://facebook.com/bounmee.xaiyavong',
    facebookGuarantor1: 'https://facebook.com/guarantor1.bounmee',
    facebookGuarantor2: '',
    facebookGuarantor3: '',
    whatsappNumber: '+856 20 2233 4455',
    driveDocumentsUrl: 'https://drive.google.com/drive/folders/bounmee-docs-003',
    contractUrl: 'CONTRACT-003',
    contractData: {
      title: 'ສັນຍາກູ້ຢືມເງິນ (ຍົກເລີກ/ຖືກແບນ)',
      fontFamily: 'Phetsarath OT',
      fontSize: 12,
      watermarkOpacity: 0.2,
      showStamp: true,
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
      photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      content: `ສັນຍາກູ້ຢືມເງິນ ລະຫັດ L-2026-003.
ຜູ້ກູ້: ທ້າວ ບຸນມີ ໄຊຍະວົງ (ສະຖານະ: ຖືກແບນ ເນື່ອງຈາກຂາດຊຳລະຕິດຕໍ່ກັນ).`
    },
    chatHistory: [
      { id: 1, date: '2026-05-10', sender: 'Admin', text: 'ຕິດຕາມໜີ້ຄ້າງຊຳລະ ບໍ່ສາມາດຕິດຕໍ່ໄດ້' }
    ]
  },
  {
    id: 'CUST-004',
    code: 'L-2026-004',
    name: 'ມະລີວອນ ສຸລິຍາ',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    invoiceLink: 'https://drive.google.com/file/d/4_invoice_004_lak/view',
    interestRate: 5.5,
    manualStatus: 'ປະຈານ', // Trigger Orange <ປະຈານ>
    age: 22,
    occupation: 'ນັກສຶກສາ ຕ່າງປະເທດ (ຣັດເຊຍ)',
    currentAddress: {
      village: 'Moscow State Univ Campus',
      district: 'Moscow',
      province: 'Russia / ຣັດເຊຍ'
    },
    schoolOrWorkplace: 'Moscow State University (MSU)',
    schoolOrWorkplaceAddress: {
      village: 'Leninskie Gory',
      district: 'Moscow',
      province: 'Russia'
    },
    googleMapsUrl: 'https://maps.google.com/?q=55.703,37.531',
    major: 'ພາສາຣັດເຊຍ ເພື່ອການທ່ອງທ່ຽວ',
    startYear: 2024,
    graduationYear: 2028,
    currentActiveLoanLAK: 6000000,
    currentActiveLoanRUB: 20000,
    unpaidConsecutiveMonths: 2,
    monthsOffline: 0,
    loanHistory: [
      { month: '2026-08', status: 'ACTIVE', paid: false, amountLAK: 6000000, amountRUB: 20000, profitLAK: 330000, profitRUB: 1100 },
      { month: '2026-07', status: 'UNPAID', paid: false, amountLAK: 6000000, amountRUB: 20000, profitLAK: 330000, profitRUB: 1100 }
    ],
    facebookBorrower: 'https://facebook.com/maleevon.suliya',
    facebookGuarantor1: 'https://facebook.com/guarantor1.malee',
    facebookGuarantor2: 'https://facebook.com/guarantor2.malee',
    facebookGuarantor3: 'https://facebook.com/guarantor3.malee',
    whatsappNumber: '+7 999 123 4567',
    driveDocumentsUrl: 'https://drive.google.com/drive/folders/maleevon-docs-004',
    contractUrl: 'CONTRACT-004',
    contractData: {
      title: 'ສັນຍາກູ້ຢືມເງິນ ຕ່າງປະເທດ',
      fontFamily: 'Phetsarath OT',
      fontSize: 12,
      watermarkOpacity: 0.18,
      showStamp: true,
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
      photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      content: `ສັນຍາກູ້ຢືມເງິນປະຈຳເດືອນ ຣັດເຊຍ.
ຜູ້ກູ້: ນາງ ມະລີວອນ ສຸລິຍາ.
ຍອດກູ້: 6,000,000 ກີບ / 20,000 RUB (ສະຖານະ ປະຈານ / ຈຳນວນໜີ້ຫຼາຍ).`
    },
    chatHistory: [
      { id: 1, date: '2026-08-05', sender: 'Admin', text: 'ແຈ້ງເຕືອນຄ່າງວດ ບໍ່ຕອບແຊັດ' }
    ]
  },
  {
    id: 'CUST-005',
    code: 'L-2026-005',
    name: 'ຄຳຜ່ານ ພູມມີ',
    photo: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    invoiceLink: 'https://drive.google.com/file/d/5_invoice_005_lak/view',
    interestRate: 4.5,
    manualStatus: null,
    age: 31,
    occupation: 'ວິສະວະກອນ ກໍ່ສ້າງ',
    currentAddress: {
      village: 'ດົງປ່າແຫຼບ',
      district: 'ຈັນທະບູລີ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    schoolOrWorkplace: 'ບໍລິສັດ ກໍ່ສ້າງ ແລະ ຂົວທາງ',
    schoolOrWorkplaceAddress: {
      village: 'ໂພນພະເນົາ',
      district: 'ໄຊເສດຖາ',
      province: 'ນະຄອນຫຼວງວຽງຈັນ'
    },
    googleMapsUrl: 'https://maps.google.com/?q=17.982,102.638',
    major: 'ວິສະວະກຳໂຍທາ',
    startYear: 2017,
    graduationYear: 2021,
    currentActiveLoanLAK: 0,
    currentActiveLoanRUB: 0,
    unpaidConsecutiveMonths: 0,
    monthsOffline: 5, // Trigger Grey <ອອບໄລນ໌ 5 ເດືອນ>
    loanHistory: [
      { month: '2026-03', status: 'PAID', paid: true, amountLAK: 1500000, amountRUB: 5000, profitLAK: 67500, profitRUB: 225 }
    ],
    facebookBorrower: 'https://facebook.com/khamphan.phoummy',
    facebookGuarantor1: 'https://facebook.com/guarantor1.khamphan',
    facebookGuarantor2: '',
    facebookGuarantor3: '',
    whatsappNumber: '+856 20 7711 2233',
    driveDocumentsUrl: 'https://drive.google.com/drive/folders/khamphan-docs-005',
    contractUrl: 'CONTRACT-005',
    contractData: {
      title: 'ສັນຍາກູ້ຢືມເງິນ',
      fontFamily: 'Phetsarath OT',
      fontSize: 12,
      watermarkOpacity: 0.15,
      showStamp: true,
      logoUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
      stampUrl: 'https://cdn-icons-png.flaticon.com/512/9638/9638706.png',
      photoUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
      content: `ສັນຍາກູ້ຢືມເງິນ L-2026-005 ທ້າວ ຄຳຜ່ານ ພູມມີ. ສະຖານະ ຊຳລະຄົບແລ້ວ (ອອບໄລນ໌ 5 ເດືອນ).`
    },
    chatHistory: [
      { id: 1, date: '2026-03-25', sender: 'Admin', text: 'ໄດ້ຮັບການຊຳລະຄົບຖ້ວນ ຂອບໃຈ' }
    ]
  }
];
