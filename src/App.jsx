import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Banknote,
  TrendingUp,
  Settings,
  Menu,
  X,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Database,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  Clock,
  Sliders,
  UserPlus,
  Palette,
  Check
} from 'lucide-react';
import { initialCustomers } from './data/mockCustomers';
import { initialMonthlyLoans } from './data/mockMonthlyLoans';
import { initialTransactions, defaultExchangeRate } from './data/mockIncomeExpenses';
import CustomerTable from './components/CustomerTable';
import CustomerDetailModal from './components/CustomerDetailModal';
import CustomerFormModal from './components/CustomerFormModal';
import ContractEditorModal from './components/ContractEditorModal';
import MonthlyLoanTable from './components/MonthlyLoanTable';
import InvoiceModal from './components/InvoiceModal';
import WhatsformModal from './components/WhatsformModal';
import IncomeExpenseView from './components/IncomeExpenseView';
import TransactionFormModal from './components/TransactionFormModal';
import CanvaInvoiceView from './components/CanvaInvoiceView';

export default function App() {
  const [activeMenuId, setActiveMenuId] = useState(5); // Default to Menu 5: ໃບແຈ້ງໜີ້ (Canva Template)
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Customer Management States
  const [customers, setCustomers] = useState(initialCustomers);
  const [activeDetailCustomer, setActiveDetailCustomer] = useState(null);
  const [activeContractCustomer, setActiveContractCustomer] = useState(null);
  const [activeFormCustomer, setActiveFormCustomer] = useState(null);

  // Monthly Loan Management States
  const [monthlyLoans, setMonthlyLoans] = useState(initialMonthlyLoans);
  const [activeInvoiceLoan, setActiveInvoiceLoan] = useState(null);
  const [activeInvoiceCurrency, setActiveInvoiceCurrency] = useState('LAK');
  const [isWhatsformOpen, setIsWhatsformOpen] = useState(false);

  // Income & Expense Management States
  const [transactions, setTransactions] = useState(initialTransactions);
  const [exchangeRate, setExchangeRate] = useState(defaultExchangeRate);
  const [activeTransactionFormType, setActiveTransactionFormType] = useState(null); // null, 'INCOME', 'EXPENSE'

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const menuItems = [
    {
      id: 1,
      title: 'ພາບລວມ',
      subtitle: 'Dashboard Overview',
      icon: LayoutDashboard,
      color: '#8b5cf6',
      gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
      badge: 'II.1'
    },
    {
      id: 2,
      title: 'ຖານຂໍ້ມູນລູກຄ້າ',
      subtitle: 'Customer Database & CRM',
      icon: Users,
      color: '#10b981',
      gradient: 'linear-gradient(135deg, #10b981, #059669)',
      badge: 'II.2'
    },
    {
      id: 3,
      title: 'ຖານກູ້ປະຈຳເດືອນ',
      subtitle: 'Monthly Credit & Loans',
      icon: Banknote,
      color: '#f59e0b',
      gradient: 'linear-gradient(135deg, #f59e0b, #d97706)',
      badge: 'II.3'
    },
    {
      id: 4,
      title: 'ລາຍຮັບ-ລາຍຈ່າຍ',
      subtitle: 'Financial Cashflow Track',
      icon: TrendingUp,
      color: '#06b6d4',
      gradient: 'linear-gradient(135deg, #06b6d4, #0284c7)',
      badge: 'II.4'
    },
    {
      id: 5,
      title: 'ໃບແຈ້ງໜີ້ (Invoice)',
      subtitle: 'Official Canva Invoice',
      icon: FileText,
      color: '#38bdf8',
      gradient: 'linear-gradient(135deg, #0284c7, #38bdf8)',
      badge: 'II.5'
    },
    {
      id: 6,
      title: 'ຖານປັບແຕ່ງການຕັ້ງຄ່າ',
      subtitle: 'System Configuration',
      icon: Settings,
      color: '#ec4899',
      gradient: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
      badge: 'II.6'
    }
  ];

  const currentMenu = menuItems.find((item) => item.id === activeMenuId);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Customer Management Handlers
  const handleUpdateManualStatus = (custId, statusValue) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === custId) {
          return {
            ...c,
            manualStatus: statusValue === 'RESET' ? null : statusValue
          };
        }
        return c;
      })
    );
  };

  const handleSaveCustomer = (customerData) => {
    setCustomers((prev) => {
      const exists = prev.some((c) => c.id === customerData.id);
      if (exists) {
        return prev.map((c) => (c.id === customerData.id ? customerData : c));
      }
      return [customerData, ...prev];
    });
    setActiveFormCustomer(null);
  };

  const handleUpdateCustomer = (updatedCustomer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)));
    if (activeDetailCustomer?.id === updatedCustomer.id) {
      setActiveDetailCustomer(updatedCustomer);
    }
  };

  // Monthly Loan Handlers
  const handleUpdatePaidAmount = (loanId, newPaidAmount, currency) => {
    setMonthlyLoans((prev) => {
      const copy = { ...prev };
      for (const monthKey in copy) {
        const list = copy[monthKey][currency];
        if (list) {
          copy[monthKey][currency] = list.map((item) => {
            if (item.id === loanId) {
              return { ...item, paidAmount: newPaidAmount };
            }
            return item;
          });
        }
      }
      return copy;
    });
  };

  const handleUpdateInterestRate = (loanId, newRate, currency) => {
    setMonthlyLoans((prev) => {
      const copy = { ...prev };
      for (const monthKey in copy) {
        const list = copy[monthKey][currency];
        if (list) {
          copy[monthKey][currency] = list.map((item) => {
            if (item.id === loanId) {
              return { ...item, interestRate: newRate };
            }
            return item;
          });
        }
      }
      return copy;
    });
  };

  const handleCarryoverMonth = (fromMonthStr, currency) => {
    const [year, month] = fromMonthStr.split('-').map(Number);
    let nextYear = year;
    let nextMonth = month + 1;
    if (nextMonth > 12) {
      nextMonth = 1;
      nextYear += 1;
    }
    const nextMonthStr = `${nextYear}-${nextMonth < 10 ? '0' + nextMonth : nextMonth}`;

    setMonthlyLoans((prev) => {
      const copy = { ...prev };
      if (!copy[nextMonthStr]) {
        copy[nextMonthStr] = { LAK: [], RUB: [] };
      }

      const sourceList = copy[fromMonthStr]?.[currency] || [];
      const carriedOverItems = [];

      sourceList.forEach((loan) => {
        const principal = currency === 'LAK' ? loan.amountLAK : loan.amountRUB;
        const interest = Math.round((principal * loan.interestRate) / 100);
        const total = principal + interest;
        const remaining = Math.max(0, total - (loan.paidAmount || 0));

        if (remaining > 0) {
          const carriedItem = {
            ...loan,
            id: `ML-${currency}-${Date.now()}-${Math.floor(Math.random() * 100)}`,
            loanDate: `${nextMonthStr}-01`,
            dueDate: `${nextMonthStr}-28`,
            paidAmount: 0,
            loanHistoryLines: [
              { dateTaken: `${nextMonthStr}-01`, amount: remaining, dueDate: `${nextMonthStr}-28` }
            ]
          };
          if (currency === 'LAK') carriedItem.amountLAK = remaining;
          if (currency === 'RUB') carriedItem.amountRUB = remaining;

          carriedOverItems.push(carriedItem);
        }
      });

      copy[nextMonthStr][currency] = [...(copy[nextMonthStr][currency] || []), ...carriedOverItems];
      return copy;
    });

    alert(`ເພີ່ມເດືອນໃໝ່ ${nextMonthStr} ແລະ ດຶງລາຍຊື່ຍັງເຫຼືອໄປໃສ່ເດືອນໃໝ່ອັດໂຕໂນມັດແລ້ວ!`);
  };

  const handleAddLoan = (currency) => {
    const custName = prompt('ກະລຸນາປ້ອນຊື່ລູກຄ້າ ຫຼື ລະຫັດລູກຄ້າ:');
    if (!custName) return;

    const amountStr = prompt(`ກະລຸນາປ້ອນຈຳນວນເງິນກູ້ (${currency}):`, '1000000');
    if (!amountStr) return;
    const amount = Number(amountStr);

    const monthKey = '2026-08';
    setMonthlyLoans((prev) => {
      const copy = { ...prev };
      const list = copy[monthKey][currency] || [];
      const existing = list.find((item) => item.customerName.includes(custName));

      if (existing) {
        copy[monthKey][currency] = list.map((item) => {
          if (item.id === existing.id) {
            const oldAmt = currency === 'LAK' ? item.amountLAK : item.amountRUB;
            const updatedAmt = oldAmt + amount;
            const updatedLines = [
              ...(item.loanHistoryLines || []),
              { dateTaken: '2026-08-12', amount, dueDate: '2026-09-12' }
            ];
            return {
              ...item,
              [currency === 'LAK' ? 'amountLAK' : 'amountRUB']: updatedAmt,
              loanHistoryLines: updatedLines
            };
          }
          return item;
        });
      } else {
        const newRecord = {
          id: `ML-${currency}-${Date.now()}`,
          customerId: `CUST-${Date.now().toString().slice(-3)}`,
          customerName: custName,
          customerPhoto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          phone: '+856 20 5500 1122',
          pin: '1234',
          interestRate: 5.0,
          loanDate: '2026-08-12',
          dueDate: '2026-09-12',
          paidAmount: 0,
          isVipCare: false,
          loanHistoryLines: [
            { dateTaken: '2026-08-12', amount, dueDate: '2026-09-12' }
          ]
        };
        if (currency === 'LAK') newRecord.amountLAK = amount;
        if (currency === 'RUB') newRecord.amountRUB = amount;

        copy[monthKey][currency] = [newRecord, ...list];
      }

      return copy;
    });

    alert(`ເພີ່ມການກູ້ຢືມ ${currency} ສຳເລັດ! ຂໍ້ມູນຖືກລິ້ງເຂົ້າໃບແຈ້ງໜີ້ອັດໂຕໂນມັດ.`);
  };

  const handleWhatsformSubmit = (formData) => {
    setIsWhatsformOpen(false);

    const newCust = {
      id: `CUST-${Date.now().toString().slice(-3)}`,
      code: `L-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: formData.name,
      photo: formData.passportUrl,
      invoiceLink: '',
      interestRate: 5.0,
      manualStatus: null,
      age: 24,
      occupation: 'ລູກຄ້າໃໝ່ (Online App)',
      currentAddress: { village: 'ໂພນໄຊ', district: 'ໄຊເສດຖາ', province: 'ນະຄອນຫຼວງວຽງຈັນ' },
      schoolOrWorkplace: '-',
      schoolOrWorkplaceAddress: { village: '-', district: '-', province: '-' },
      googleMapsUrl: '',
      major: '-',
      startYear: 2026,
      graduationYear: 2030,
      currentActiveLoanLAK: formData.currency === 'LAK' ? formData.amount : 0,
      currentActiveLoanRUB: formData.currency === 'RUB' ? formData.amount : 0,
      whatsappNumber: formData.phone,
      driveDocumentsUrl: 'https://drive.google.com/drive/folders/new-app-docs',
      loanHistory: [],
      chatHistory: []
    };

    setCustomers((prev) => [newCust, ...prev]);

    const newLoan = {
      id: `ML-${formData.currency}-${Date.now()}`,
      customerId: newCust.id,
      customerName: formData.name,
      customerPhoto: formData.passportUrl,
      phone: formData.phone,
      pin: '1234',
      interestRate: 5.0,
      loanDate: formData.loanDate,
      dueDate: formData.dueDate,
      paidAmount: 0,
      isVipCare: false,
      loanHistoryLines: [
        { dateTaken: formData.loanDate, amount: formData.amount, dueDate: formData.dueDate }
      ]
    };
    if (formData.currency === 'LAK') newLoan.amountLAK = formData.amount;
    if (formData.currency === 'RUB') newLoan.amountRUB = formData.amount;

    setMonthlyLoans((prev) => {
      const copy = { ...prev };
      copy['2026-08'][formData.currency] = [newLoan, ...copy['2026-08'][formData.currency]];
      return copy;
    });

    setActiveInvoiceCurrency(formData.currency);
    setActiveInvoiceLoan(newLoan);
  };

  // Income & Expense Handlers
  const handleSaveTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    setActiveTransactionFormType(null);
  };

  const handleDeleteTransaction = (txId) => {
    setTransactions((prev) => prev.filter((t) => t.id !== txId));
  };

  const handleUpdateExchangeRate = (newRate) => {
    setExchangeRate((prev) => ({
      ...prev,
      rubToLak: newRate,
      lastUpdated: new Date().toISOString().split('T')[0]
    }));
  };

  return (
    <div className="app-container">
      {/* Mobile Drawer Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.65)',
            backdropFilter: 'blur(4px)',
            zIndex: 45
          }}
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-badge">
            <Sparkles size={22} />
          </div>
          <div className="logo-text">
            <h1>FINANCIAL APP</h1>
            <span>ລະບົບຈັດການເວັບແອັບ</span>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-title">II. ເມນູຫຼັກ (Navigation Menu)</div>
          <ul className="menu-list">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeMenuId === item.id;
              return (
                <li key={item.id}>
                  <button
                    className={`menu-item-btn ${isActive ? 'active' : ''}`}
                    onClick={() => {
                      setActiveMenuId(item.id);
                      setIsSidebarOpen(false);
                    }}
                    style={
                      isActive
                        ? {
                            borderColor: `${item.color}66`,
                            background: `linear-gradient(135deg, ${item.color}22, rgba(255,255,255,0.03))`
                          }
                        : {}
                    }
                  >
                    <div className="menu-item-content">
                      <div
                        className="menu-number-badge"
                        style={isActive ? { background: item.gradient, color: '#fff' } : {}}
                      >
                        {item.id}
                      </div>
                      <Icon size={19} style={{ color: isActive ? item.color : 'inherit' }} />
                      <span>{item.title}</span>
                    </div>
                    {isActive && <ChevronRight size={16} style={{ color: item.color }} />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="sidebar-footer">
          <div className="status-pill">
            <span className="status-dot"></span>
            <span>4. ລາຍຮັບ-ລາຍຈ່າຍ: ສຳເລັດ</span>
          </div>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Topbar Header */}
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="mobile-toggle"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="breadcrumb">
              <span>II. ເມນູ</span>
              <ChevronRight size={14} />
              <span className="active-crumb">{currentMenu.id}. {currentMenu.title}</span>
            </div>
          </div>

          <div className="topbar-right">
            <button
              className="icon-btn"
              onClick={toggleTheme}
              title={theme === 'dark' ? 'ປ່ຽນເປັນ Theme ແຈ້ງ' : 'ປ່ຽນເປັນ Theme ມືດ'}
            >
              {theme === 'dark' ? <Sun size={19} color="#fbbf24" /> : <Moon size={19} color="#6366f1" />}
            </button>

            <button className="icon-btn" title="ການແຈ້ງເຕືອນ">
              <Bell size={19} />
              <span
                style={{
                  position: 'absolute',
                  top: '9px',
                  right: '9px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentMenu.color,
                  boxShadow: `0 0 8px ${currentMenu.color}`
                }}
              />
            </button>

            <div className="user-profile">
              <div className="avatar" style={{ background: currentMenu.gradient }}>AD</div>
              <div className="user-info">
                <span className="user-name">ຜູ້ດູແລລະບົບ</span>
                <span className="user-role">Administrator</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body Area */}
        <main className="content-wrapper">
          {/* Header Banner */}
          <div
            className="content-banner"
            style={{
              '--banner-color': currentMenu.color,
              '--banner-accent': currentMenu.color,
              borderColor: `${currentMenu.color}40`
            }}
          >
            <div className="banner-accent-bg" />
            <div className="banner-header">
              <div
                className="banner-icon-box"
                style={{
                  background: `linear-gradient(135deg, ${currentMenu.color}33, rgba(255,255,255,0.03))`,
                  borderColor: `${currentMenu.color}66`
                }}
              >
                {React.createElement(currentMenu.icon, { size: 30, color: currentMenu.color })}
              </div>
              <div className="banner-title-group">
                <h2>
                  {currentMenu.id}. {currentMenu.title}
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '999px',
                      background: `${currentMenu.color}22`,
                      color: currentMenu.color,
                      border: `1px solid ${currentMenu.color}44`
                    }}
                  >
                    {currentMenu.subtitle}
                  </span>
                </h2>
                <p>ລະບົບບັນທຶກ ແລະ ວິເຄາະລາຍຮັບ-ລາຍຈ່າຍ, ອັດຕາແລກປ່ຽນ ຣູບລ໌-ກີບ, ສະລິບການໂອນ & ງົບປະມານການເງິນອັດໂຕໂນມັດ</p>
              </div>
            </div>

            <div
              className="step-tag"
              style={{
                background: `${currentMenu.color}18`,
                borderColor: `${currentMenu.color}40`,
                color: currentMenu.color
              }}
            >
              <Sparkles size={15} />
              <span>ຂັ້ນຕອນທີ 4: ລາຍຮັບ-ລາຍຈ່າຍ ພ້ອມໃຊ້ງານ | ຖ້າສວຍງາມ ແລະ ຖືກຕ້ອງ ສາມາດສົ່ງຂັ້ນຕອນຕໍ່ໄປໄດ້</span>
            </div>
          </div>

          {/* Dynamic Views */}
          {activeMenuId === 1 && <DashboardPreview />}
          {activeMenuId === 2 && (
            <CustomerTable
              customers={customers}
              onAddCustomer={() => setActiveFormCustomer('NEW')}
              onEditCustomer={(cust) => setActiveFormCustomer(cust)}
              onViewCustomerDetail={(cust) => setActiveDetailCustomer(cust)}
              onOpenContract={(cust) => setActiveContractCustomer(cust)}
              onUpdateManualStatus={handleUpdateManualStatus}
            />
          )}
          {activeMenuId === 3 && (
            <MonthlyLoanTable
              monthlyLoans={monthlyLoans}
              customers={customers}
              onAddLoan={handleAddLoan}
              onOpenInvoice={(loan, currency) => {
                setActiveInvoiceCurrency(currency);
                setActiveInvoiceLoan(loan);
              }}
              onOpenWhatsform={() => setIsWhatsformOpen(true)}
              onUpdatePaidAmount={handleUpdatePaidAmount}
              onUpdateInterestRate={handleUpdateInterestRate}
              onCarryoverMonth={handleCarryoverMonth}
            />
          )}
          {activeMenuId === 4 && (
            <IncomeExpenseView
              transactions={transactions}
              onAddTransaction={(type) => setActiveTransactionFormType(type)}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
              onUpdateExchangeRate={handleUpdateExchangeRate}
            />
          )}
          {activeMenuId === 5 && (
            <CanvaInvoiceView
              customers={customers}
              loans={monthlyLoans}
            />
          )}
          {activeMenuId === 6 && <SettingsPreview />}
        </main>
      </div>

      {/* Customer Detail Profile Modal */}
      {activeDetailCustomer && (
        <CustomerDetailModal
          customer={activeDetailCustomer}
          onClose={() => setActiveDetailCustomer(null)}
          onOpenContract={(cust) => {
            setActiveDetailCustomer(null);
            setActiveContractCustomer(cust);
          }}
          onUpdateCustomer={handleUpdateCustomer}
        />
      )}

      {/* Customer Form Modal (Add / Edit) */}
      {activeFormCustomer && (
        <CustomerFormModal
          customer={activeFormCustomer === 'NEW' ? null : activeFormCustomer}
          onClose={() => setActiveFormCustomer(null)}
          onSave={handleSaveCustomer}
        />
      )}

      {/* Loan Contract Word Editor Modal */}
      {activeContractCustomer && (
        <ContractEditorModal
          customer={activeContractCustomer}
          onClose={() => setActiveContractCustomer(null)}
          onSaveContract={(contractData) => {
            handleUpdateCustomer({
              ...activeContractCustomer,
              contractData
            });
            setActiveContractCustomer(null);
          }}
        />
      )}

      {/* Invoice & Contract Preview Modal */}
      {activeInvoiceLoan && (
        <InvoiceModal
          loan={activeInvoiceLoan}
          currency={activeInvoiceCurrency}
          onClose={() => setActiveInvoiceLoan(null)}
        />
      )}

      {/* Whatsform Online Application Modal */}
      {isWhatsformOpen && (
        <WhatsformModal
          onClose={() => setIsWhatsformOpen(false)}
          onSubmitForm={handleWhatsformSubmit}
        />
      )}

      {/* Transaction Add Form Modal (Income or Expense) */}
      {activeTransactionFormType && (
        <TransactionFormModal
          defaultType={activeTransactionFormType}
          onClose={() => setActiveTransactionFormType(null)}
          onSave={handleSaveTransaction}
        />
      )}
    </div>
  );
}

/* --- Placeholder Previews for Menu 1 & 5 --- */

function DashboardPreview() {
  return (
    <div className="glass-panel placeholder-box">
      <div className="placeholder-icon">
        <LayoutDashboard size={36} />
      </div>
      <h3>1. ພາບລວມ (Dashboard)</h3>
      <p>ໂຄງຮ່າງໜ້າພາບລວມພ້ອມແລ້ວ. ທ່ານສາມາດສົ່ງຂໍ້ມູນລາຍລະອຽດຂັ້ນຕອນ Dashboard ໃຫ້ພວກເຮົາໄດ້ໃນຂັ້ນຕອນຕໍ່ໄປ.</p>
    </div>
  );
}

function SettingsPreview() {
  return (
    <div className="glass-panel placeholder-box">
      <div className="placeholder-icon">
        <Settings size={36} />
      </div>
      <h3>5. ຖານປັບແຕ່ງການຕັ້ງຄ່າ (Settings)</h3>
      <p>ໂຄງຮ່າງໜ້າຕັ້ງຄ່າພ້ອມແລ້ວ. ລໍຖ້າຂໍ້ມູນລາຍລະອຽດຂັ້ນຕອນທີ 5 ຈາກທ່ານ.</p>
    </div>
  );
}
