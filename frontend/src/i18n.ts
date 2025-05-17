import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // Common UI
      "common.submit": "Submit",
      "common.cancel": "Cancel",
      "common.save": "Save",
      "common.delete": "Delete",
      "common.edit": "Edit",
      "common.close": "Close",

      // Form Labels
      "form.email": "Email",
      "form.password": "Password",
      "form.firstName": "First name",
      "form.lastName": "Last name",
      "form.amount": "Amount",
      "form.currency": "Currency",
      "form.type": "Type",
      "form.description": "Description",
      "form.category": "Category",
      "form.receiver": "Receiver",

      // Transaction Form
      "transaction.addNew": "Add new transaction",
      "transaction.selectCurrency": "Select currency",
      "transaction.types": {
        income: "Income",
        expense: "Expense",
      },
      "transaction.categories": {
        food: "Food",
        transport: "Transport",
        salary: "Salary",
      },
      "transaction.currencies": {
        eur: "EUR",
        usd: "USD",
      },

      // Validation Messages
      "validation.required": "This field is required",
      "validation.email": "Please enter a valid email address",
      "validation.password": "Password must be at least 8 characters",
      "validation.amount": "Please enter a valid amount",
      "validation.amountPositive": "Amount must be positive",
      "validation.descriptionRequired": "Description is required",
      "validation.receiverRequired": "Account receiver is required",

      // Dashboard
      "dashboard.totalRevenue": "Total Revenue",
      "dashboard.trendingUp": "Trending up this month",
      "dashboard.configureSettings": "Configure settings",
      "dashboard.pushNotifications":
        "Do you want to receive push notifications?",
      "dashboard.inAppNotifications":
        "Do you want to receive in app notifications?",
      "dashboard.register": "Register",

      // Language Switcher
      "language.select": "Select language",
      "language.english": "English",
      "language.polish": "Polish",

      // Navigation
      "nav.dashboard": "Dashboard",
      "nav.transactions": "Transactions",
      "nav.logout": "Logout",
      "nav.appName": "Financial Management App",

      // Header
      "header.notifications": "Notifications",
      "header.toggleTheme": "Toggle theme",
      "header.toggleSidebar": "Toggle sidebar",

      // Transaction list
      "transactionList.searchPlaceholder": "Search by description...",
      "transactionList.addTransaction": "Add Transaction",
    },
  },
  pl: {
    translation: {
      // Common UI
      "common.submit": "Wyślij",
      "common.cancel": "Anuluj",
      "common.save": "Zapisz",
      "common.delete": "Usuń",
      "common.edit": "Edytuj",
      "common.close": "Zamknij",

      // Form Labels
      "form.email": "Email",
      "form.password": "Hasło",
      "form.firstName": "Imię",
      "form.lastName": "Nazwisko",
      "form.amount": "Kwota",
      "form.currency": "Waluta",
      "form.type": "Typ",
      "form.description": "Opis",
      "form.category": "Kategoria",
      "form.receiver": "Odbiorca",

      // Transaction Form
      "transaction.addNew": "Dodaj nową transakcję",
      "transaction.selectCurrency": "Wybierz walutę",
      "transaction.types": {
        income: "Przychód",
        expense: "Wydatek",
      },
      "transaction.categories": {
        food: "Żywność",
        transport: "Transport",
        salary: "Wynagrodzenie",
      },
      "transaction.currencies": {
        eur: "EUR",
        usd: "USD",
      },

      // Validation Messages
      "validation.required": "To pole jest wymagane",
      "validation.email": "Wprowadź poprawny adres email",
      "validation.password": "Hasło musi mieć co najmniej 8 znaków",
      "validation.amount": "Wprowadź poprawną kwotę",
      "validation.amountPositive": "Kwota musi być dodatnia",
      "validation.descriptionRequired": "Opis jest wymagany",
      "validation.receiverRequired": "Odbiorca jest wymagany",

      // Dashboard
      "dashboard.totalRevenue": "Całkowity przychód",
      "dashboard.trendingUp": "Wzrost w tym miesiącu",
      "dashboard.configureSettings": "Konfiguracja ustawień",
      "dashboard.pushNotifications":
        "Czy chcesz otrzymywać powiadomienia push?",
      "dashboard.inAppNotifications":
        "Czy chcesz otrzymywać powiadomienia w aplikacji?",
      "dashboard.register": "Zarejestruj się",

      // Language Switcher
      "language.select": "Wybierz język",
      "language.english": "Angielski",
      "language.polish": "Polski",

      // Navigation
      "nav.dashboard": "Panel główny",
      "nav.transactions": "Transakcje",
      "nav.logout": "Wyloguj",
      "nav.appName": "Aplikacja do zarządzania finansami",

      // Header
      "header.notifications": "Powiadomienia",
      "header.toggleTheme": "Przełącz motyw",
      "header.toggleSidebar": "Przełącz pasek boczny",

      // Transaction list
      "transactionList.searchPlaceholder": "Szukaj po opisie...",
      "transactionList.addTransaction": "Dodaj transakcję",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
