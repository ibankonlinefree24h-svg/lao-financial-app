import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Users,
  Banknote,
  TrendingUp,
  TrendingDown,
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
  Check,
  ArrowRightLeft,
  PieChart,
  Bot,
  Building2,
  Lock,
  LogOut,
  Layers,
  FileSpreadsheet,
  ShieldAlert,
  Activity
} from 'lucide-react';

import { initialCustomers } from './data/mockCustomers';
import { initialMonthlyLoans } from './data/mockMonthlyLoans';
import { initialTransactions, defaultExchangeRates, initialWallets } from './data/mockIncomeExpenses';

import CustomerTable from './components/CustomerTable';
import CustomerDetailModal from './components/CustomerDetailModal';
import CustomerFormModal from './components/CustomerFormModal';
import ContractEditorModal from './components/ContractEditorModal';
import MonthlyLoanTable from './components/MonthlyLoanTable';
import InvoiceModal from './components/InvoiceModal';
import WhatsformModal from './components/WhatsformModal';
import IncomeExpenseView from './components/IncomeExpenseView';
import TransactionFormModal from './components/TransactionFormModal';

// New Enterprise Components
import ManagerAuthModal from './components/ManagerAuthModal';
import ExecutiveDashboardView from './components/ExecutiveDashboardView';
import AllTransactionsView from './components/AllTransactionsView';
import LoansDebtsView from './components/LoansDebtsView';
import BranchesStaffView from './components/BranchesStaffView';
import FinancialReportsView from './components/FinancialReportsView';
import AiAnalystView from './components/AiAnalystView';
import AuditLogView from './components/AuditLogView';
import NotificationsView from './components/NotificationsView';

export default function App() {
  // Authentication State (Default: Show Login Screen upon website load)
  const [currentUser, setCurrentUser] = useState(null);

  // Active Menu State (Default: Menu 1 Executive Dashboard)
  const [activeMenuId, setActiveMenuId] = useState(1);
  const [theme, setTheme] = useState('dark');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core Data States
  const [customers, setCustomers] = useState(initialCustomers);
  const [monthlyLoans, setMonthlyLoans] = useState(initialMonthlyLoans);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [wallets, setWallets] = useState(initialWallets);
  const [exchangeRate, setExchangeRate] = useState(defaultExchangeRates);

  // Modals & Active State Handlers
  const [activeDetailCustomer, setActiveDetailCustomer] = useState(null);
  const [activeContractCustomer, setActiveContractCustomer] = useState(null);
  const [activeFormCustomer, setActiveFormCustomer] = useState(null);
  const [activeInvoiceLoan, setActiveInvoiceLoan] = useState(null);
  const [activeInvoiceCurrency, setActiveInvoiceCurrency] = useState('LAK');
  const [isWhatsformOpen, setIsWhatsformOpen] = useState(false);
  const [activeTransactionFormType, setActiveTransactionFormType] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Master 14 Sidebar Items Catalogue
  const menuItems = [
    { id: 1, title: 'ພາບລວມການເງິນ', subtitle: 'Executive Dashboard', icon: LayoutDashboard, color: '#8b5cf6', badge: '1' },
    { id: 2, title: 'ລາຍຮັບ', subtitle: 'Income Management', icon: TrendingUp, color: '#10b981', badge: '2' },
    { id: 3, title: 'ລາຍຈ່າຍ', subtitle: 'Expense Management', icon: TrendingDown, color: '#ef4444', badge: '3' },
    { id: 4, title: 'ທຸລະກຳທັງໝົດ', subtitle: 'All Transactions Ledger', icon: Layers, color: '#06b6d4', badge: '4' },
    { id: 5, title: 'ບັນຊີ / Wallet', subtitle: 'Accounts & Wallets', icon: Wallet, color: '#a855f7', badge: '5' },
    { id: 6, title: 'ໜີ້ສິນ - ເງິນກູ້', subtitle: 'Loans & Credit Portfolio', icon: Banknote, color: '#f59e0b', badge: '6' },
    { id: 7, title: 'ງົບປະມານ & ເປົ້າໝາຍ', subtitle: 'Budgets & Savings Goals', icon: Sliders, color: '#ec4899', badge: '7' },
    { id: 8, title: 'ລູກຄ້າ / CRM', subtitle: 'Customer Database & CRM', icon: Users, color: '#38bdf8', badge: '8' },
    { id: 9, title: 'ສາຂາ & ພະນັກງານ', subtitle: 'Branches & Staff Performance', icon: Building2, color: '#34d399', badge: '9' },
    { id: 10, title: 'ລາຍງານການເງິນ', subtitle: 'P&L, Cash Flow & Export', icon: FileSpreadsheet, color: '#f97316', badge: '10' },
    { id: 11, title: 'AI Financial Analyst', subtitle: 'Lao AI Decision Assistant', icon: Bot, color: '#c084fc', badge: '11' },
    { id: 12, title: 'ການແຈ້ງເຕືອນ', subtitle: 'Alerts & Notifications', icon: Bell, color: '#fbbf24', badge: '12' },
    { id: 13, title: 'Audit Log', subtitle: 'Security Audit Trail', icon: ShieldCheck, color: '#6366f1', badge: '13' },
    { id: 14, title: 'ການຕັ້ງຄ່າ', subtitle: 'System Configuration', icon: Settings, color: '#94a3b8', badge: '14' }
  ];

  const currentMenu = menuItems.find((item) => item.id === activeMenuId) || menuItems[0];

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLoginSuccess = (userProfile) => {
    setCurrentUser(userProfile);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Transaction Actions
  const handleSaveNewTransaction = (newTx) => {
    setTransactions((prev) => [newTx, ...prev]);
    setActiveTransactionFormType(null);
  };

  const handleDeleteTransaction = (txId) => {
    if (confirm('ທ່ານແນ່ໃຈບໍ່ວ່າຕ້ອງການລຶບລາຍການທຸລະກຳນີ້ (Soft Delete)?')) {
      setTransactions((prev) => prev.filter((t) => t.id !== txId));
    }
  };

  // If user is not logged in, render Manager Authentication Screen directly
  if (!currentUser) {
    return <ManagerAuthModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="app-container">
      {/* Mobile Drawer Backdrop */}
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
            <h1>IBANK MANAGER</h1>
            <span>{currentUser.branchName || 'ສາຂາ ໃຫຍ່ນະຄອນຫຼວງ'}</span>
          </div>
        </div>

        <div className="menu-section">
          <div className="menu-title">II. ເມນູອົງກອນ (Enterprise Modules)</div>
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
                        style={isActive ? { background: item.color, color: '#fff' } : {}}
                      >
                        {item.badge}
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

        <div className="sidebar-footer" style={{ padding: '16px' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px',
              borderRadius: '10px',
              background: 'rgba(239, 68, 68, 0.15)',
              color: '#f87171',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            <LogOut size={16} /> ອອກຈາກລະບົບ (Logout)
          </button>
        </div>
      </aside>

      {/* Main Layout Area */}
      <div className="main-layout">
        {/* Topbar Header */}
        <header className="topbar">
          <div className="topbar-left">
            <button className="mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="breadcrumb">
              <span>IBank Manager</span>
              <ChevronRight size={14} />
              <span className="active-crumb">{currentMenu.badge}. {currentMenu.title}</span>
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

            <button className="icon-btn" title="ການແຈ້ງເຕືອນ" onClick={() => setActiveMenuId(12)}>
              <Bell size={19} />
              <span
                style={{
                  position: 'absolute',
                  top: '9px',
                  right: '9px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#ef4444'
                }}
              />
            </button>

            <div className="user-profile-badge">
              <div className="avatar">
                {currentUser.username ? currentUser.username[0].toUpperCase() : 'M'}
              </div>
              <div className="user-info">
                <span className="user-name">{currentUser.username}</span>
                <span className="user-role">{currentUser.role}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content Body View Switching */}
        <main className="content-wrapper">
          {/* Banner Header */}
          <div className="content-banner" style={{ '--banner-color': currentMenu.color }}>
            <div className="banner-accent-bg" />
            <div className="banner-header">
              <div className="banner-icon-box">
                <currentMenu.icon size={28} />
              </div>
              <div className="banner-title-group">
                <h2>{currentMenu.title}</h2>
                <p>{currentMenu.subtitle}</p>
              </div>
            </div>
          </div>

          {/* Render Active View Component */}
          {activeMenuId === 1 && (
            <ExecutiveDashboardView
              transactions={transactions}
              customers={customers}
              monthlyLoans={monthlyLoans}
              wallets={wallets}
            />
          )}

          {activeMenuId === 2 && (
            <IncomeExpenseView
              transactions={transactions.filter((t) => t.type === 'INCOME')}
              onAddTransaction={(type) => setActiveTransactionFormType(type || 'INCOME')}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
              onUpdateExchangeRate={(r) => setExchangeRate({ ...exchangeRate, rubToLak: r })}
            />
          )}

          {activeMenuId === 3 && (
            <IncomeExpenseView
              transactions={transactions.filter((t) => t.type === 'EXPENSE')}
              onAddTransaction={(type) => setActiveTransactionFormType(type || 'EXPENSE')}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
              onUpdateExchangeRate={(r) => setExchangeRate({ ...exchangeRate, rubToLak: r })}
            />
          )}

          {activeMenuId === 4 && (
            <AllTransactionsView
              transactions={transactions}
              onAddTransaction={(type) => setActiveTransactionFormType(type)}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
            />
          )}

          {activeMenuId === 5 && (
            <IncomeExpenseView
              transactions={transactions}
              onAddTransaction={(type) => setActiveTransactionFormType(type)}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
              onUpdateExchangeRate={(r) => setExchangeRate({ ...exchangeRate, rubToLak: r })}
            />
          )}

          {activeMenuId === 6 && (
            <LoansDebtsView monthlyLoans={monthlyLoans} setMonthlyLoans={setMonthlyLoans} />
          )}

          {activeMenuId === 7 && (
            <IncomeExpenseView
              transactions={transactions}
              onAddTransaction={(type) => setActiveTransactionFormType(type)}
              onDeleteTransaction={handleDeleteTransaction}
              exchangeRate={exchangeRate}
              onUpdateExchangeRate={(r) => setExchangeRate({ ...exchangeRate, rubToLak: r })}
            />
          )}

          {activeMenuId === 8 && (
            <CustomerTable
              customers={customers}
              onViewDetail={(c) => setActiveDetailCustomer(c)}
              onEditContract={(c) => setActiveContractCustomer(c)}
              onEditCustomer={(c) => setActiveFormCustomer(c)}
              onAddCustomer={() => setActiveFormCustomer({})}
              onUpdateManualStatus={(id, st) =>
                setCustomers((prev) =>
                  prev.map((c) => (c.id === id ? { ...c, manualStatus: st === 'RESET' ? null : st } : c))
                )
              }
            />
          )}

          {activeMenuId === 9 && <BranchesStaffView />}

          {activeMenuId === 10 && <FinancialReportsView transactions={transactions} />}

          {activeMenuId === 11 && <AiAnalystView transactions={transactions} />}

          {activeMenuId === 12 && <NotificationsView />}

          {activeMenuId === 13 && <AuditLogView />}

          {activeMenuId === 14 && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '14px' }}>⚙️ ການຕັ້ງຄ່າລະບົບ (System Configurations)</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                ກຳນົດສິດການໃຊ້ງານ RBAC, ອັດຕາແລກປ່ຽນ 4 ສະກຸນເງິນ, ແລະ ເຊື່ອມຕໍ່ API Backend
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Transaction Add Form Modal */}
      {activeTransactionFormType && (
        <TransactionFormModal
          defaultType={activeTransactionFormType}
          onClose={() => setActiveTransactionFormType(null)}
          onSave={handleSaveNewTransaction}
        />
      )}

      {/* Customer Modals */}
      {activeDetailCustomer && (
        <CustomerDetailModal
          customer={activeDetailCustomer}
          onClose={() => setActiveDetailCustomer(null)}
        />
      )}

      {activeContractCustomer && (
        <ContractEditorModal
          customer={activeContractCustomer}
          onClose={() => setActiveContractCustomer(null)}
        />
      )}

      {activeFormCustomer && (
        <CustomerFormModal
          customer={activeFormCustomer}
          onClose={() => setActiveFormCustomer(null)}
          onSave={(cData) => {
            setCustomers((prev) => {
              const idx = prev.findIndex((c) => c.id === cData.id);
              if (idx >= 0) {
                const copy = [...prev];
                copy[idx] = cData;
                return copy;
              }
              return [cData, ...prev];
            });
            setActiveFormCustomer(null);
          }}
        />
      )}
    </div>
  );
}
