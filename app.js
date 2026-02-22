// ============================================
// BUDGETWISE 2.0 - APP COMPLETA CON TRADUZIONI FUNZIONANTI
// ============================================

const translations = {
    it: {
        appTitle: '💰 BudgetWise',
        appSubtitle: 'Stipendio a stipendio — gestione intelligente con AI',
        version: '2.0',
        periodInfo: '📅 Periodo: {start} → {end}',
        dailyBudget: 'Budget giornaliero',
        remaining: 'Rimanenza',
        daysLeft: 'Giorni rimasti',
        incomeSection: '🏦 Entrate del periodo',
        fixedExpensesSection: '📌 Spese fisse mensili',
        variableExpensesSection: '🧾 Spese variabili',
        chartSection: '📊 Distribuzione spese',
        assistantSection: '🤖 Assistente Finanziario AI',
        savingsSection: '🎯 Obiettivo risparmio',
        settingsSection: '⚙️ Impostazioni',
        guideMessage: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
        noFixedExpenses: 'Nessuna spesa fissa',
        noVariableExpenses: 'Nessuna spesa in questo giorno',
        noChartData: 'Aggiungi spese per vedere il grafico',
        fixedExpenseDetail: '📅 Giorno {day} di ogni mese · Scadenza: {endDate} {status}',
        statusActive: '🟢 Attivo',
        statusExpired: '🔴 Scaduto',
        fixedHelpText: '⏰ Verrà conteggiata automaticamente ogni mese fino alla scadenza',
        labelTotalIncome: 'Totale entrate (€)',
        labelDayOfMonth: 'Giorno del mese',
        labelEndDate: 'Data scadenza (fine)',
        labelSelectDate: 'Seleziona data:',
        labelThreshold: '🔔 Soglia avviso (€)',
        labelLanguage: '🌍 Lingua',
        labelBackup: '📅 Backup dati',
        labelSavingsPercent: 'Percentuale su entrate (%)',
        labelSavingsGoal: 'Obiettivo (€)',
        placeholderName: 'es. Mutuo',
        placeholderAmount: '0,00',
        placeholderDay: 'es. 27',
        placeholderWhatBought: 'Caffè...',
        placeholderAskAssistant: 'Es. Quanto posso risparmiare questo mese?',
        btnSaveIncome: 'Salva entrate',
        btnAddFixedExpense: '➕ Aggiungi spesa fissa ricorrente',
        btnAddExpense: '➕ Aggiungi spesa',
        btnResetDay: '🗑️ Cancella spese del giorno',
        btnApplySavings: 'Applica risparmio',
        btnDownloadBackup: '💾 Scarica backup',
        btnRestoreBackup: '📂 Ripristina',
        btnResetAll: '⚠️ Reset completo',
        btnExportCalendar: '📅 Esporta in Google Calendar',
        btnSend: 'Invia',
        btnVoice: '🎤 Inserisci con voce',
        categoryGrocery: '🍎 Alimentari',
        categoryTransport: '🚗 Trasporti',
        categoryEntertainment: '🎮 Svago',
        categoryHealth: '💊 Salute',
        categoryClothing: '👕 Abbigliamento',
        categoryOther: '📦 Altro',
        assistantWelcome: 'Ciao! Sono il tuo assistente finanziario. Chiedimi qualsiasi cosa sul tuo budget o chiedimi di simulare scenari futuri!',
        suggestionSave100: '💶 Risparmia 100€',
        suggestionSimulate: '🔮 Simula aumento',
        suggestionGoal: '🎯 Obiettivo',
        suggestionTopCategory: '📊 Top categoria',
        statusListening: '🎤 Parlare...',
        statusTapToSpeak: '🎤 Tocca per parlare',
        statusHeard: '🔊 Sento: {text}...',
        statusRecognized: '✓ Riconosciuto: "{text}"',
        statusError: '❌ Errore',
        statusMicrophoneDenied: '❌ Permesso microfono negato',
        statusNoSpeech: '❌ Nessun parlato rilevato',
        statusNetworkError: '❌ Errore di rete',
        statusEditBeforeAdd: '✏️ Puoi modificare prima di aggiungere',
        toastIncomeSaved: '✅ Entrate salvate!',
        toastFixedAdded: '✅ Spesa fissa ricorrente aggiunta!',
        toastExpenseAdded: '✅ Spesa aggiunta!',
        toastDayReset: '🗑️ Spese del giorno cancellate',
        toastSavingsApplied: '💰 Risparmio applicato!',
        toastBackupDownloaded: '💾 Backup scaricato!',
        toastDataRestored: '📂 Dati ripristinati!',
        toastResetCompleted: '🔄 Reset completato',
        toastExpenseDeleted: '🗑️ Spesa eliminata',
        toastCalendarExported: '📅 Calendario esportato!',
        toastThresholdExceeded: '⚠️ Attenzione! Hai superato la soglia di {amount}',
        toastFillAllFields: '⚠️ Compila tutti i campi',
        toastInvalidDay: '⚠️ Il giorno deve essere tra 1 e 31',
        toastInvalidFile: '❌ File non valido',
        stopListening: '⏹️ Ferma ascolto',
        footerText: 'BudgetWise 2.0 — Gestione intelligente delle tue finanze',
        footerFeatures: '✨ Assistente AI integrato • Riconoscimento vocale • Tema scuro',
        badgeNew: 'nuovo',
    },
    en: {
        appTitle: '💰 BudgetWise',
        appSubtitle: 'Paycheck to paycheck — smart management with AI',
        version: '2.0',
        periodInfo: '📅 Period: {start} → {end}',
        dailyBudget: 'Daily budget',
        remaining: 'Remaining',
        daysLeft: 'Days left',
        incomeSection: '🏦 Period Income',
        fixedExpensesSection: '📌 Monthly Fixed Expenses',
        variableExpensesSection: '🧾 Variable Expenses',
        chartSection: '📊 Expense Distribution',
        assistantSection: '🤖 AI Financial Assistant',
        savingsSection: '🎯 Savings Goal',
        settingsSection: '⚙️ Settings',
        guideMessage: '👋 Start by entering your income in the section below!',
        noFixedExpenses: 'No fixed expenses',
        noVariableExpenses: 'No expenses on this day',
        noChartData: 'Add expenses to see the chart',
        fixedExpenseDetail: '📅 Day {day} of each month · Expires: {endDate} {status}',
        statusActive: '🟢 Active',
        statusExpired: '🔴 Expired',
        fixedHelpText: '⏰ It will be automatically counted every month until expiration',
        labelTotalIncome: 'Total income (€)',
        labelDayOfMonth: 'Day of month',
        labelEndDate: 'End date',
        labelSelectDate: 'Select date:',
        labelThreshold: '🔔 Alert threshold (€)',
        labelLanguage: '🌍 Language',
        labelBackup: '📅 Data backup',
        labelSavingsPercent: 'Percentage of income (%)',
        labelSavingsGoal: 'Goal (€)',
        placeholderName: 'e.g., Mortgage',
        placeholderAmount: '0.00',
        placeholderDay: 'e.g., 27',
        placeholderWhatBought: 'Coffee...',
        placeholderAskAssistant: 'E.g., How much can I save this month?',
        btnSaveIncome: 'Save income',
        btnAddFixedExpense: '➕ Add recurring fixed expense',
        btnAddExpense: '➕ Add expense',
        btnResetDay: '🗑️ Clear day expenses',
        btnApplySavings: 'Apply savings',
        btnDownloadBackup: '💾 Download backup',
        btnRestoreBackup: '📂 Restore',
        btnResetAll: '⚠️ Full reset',
        btnExportCalendar: '📅 Export to Google Calendar',
        btnSend: 'Send',
        btnVoice: '🎤 Voice input',
        categoryGrocery: '🍎 Groceries',
        categoryTransport: '🚗 Transport',
        categoryEntertainment: '🎮 Entertainment',
        categoryHealth: '💊 Health',
        categoryClothing: '👕 Clothing',
        categoryOther: '📦 Other',
        assistantWelcome: 'Hi! I am your financial assistant. Ask me anything about your budget or ask me to simulate future scenarios!',
        suggestionSave100: '💶 Save 100€',
        suggestionSimulate: '🔮 Simulate increase',
        suggestionGoal: '🎯 Goal',
        suggestionTopCategory: '📊 Top category',
        statusListening: '🎤 Listening...',
        statusTapToSpeak: '🎤 Tap to speak',
        statusHeard: '🔊 Hearing: {text}...',
        statusRecognized: '✓ Recognized: "{text}"',
        statusError: '❌ Error',
        statusMicrophoneDenied: '❌ Microphone permission denied',
        statusNoSpeech: '❌ No speech detected',
        statusNetworkError: '❌ Network error',
        statusEditBeforeAdd: '✏️ You can edit before adding',
        toastIncomeSaved: '✅ Income saved!',
        toastFixedAdded: '✅ Recurring fixed expense added!',
        toastExpenseAdded: '✅ Expense added!',
        toastDayReset: '🗑️ Day expenses cleared',
        toastSavingsApplied: '💰 Savings applied!',
        toastBackupDownloaded: '💾 Backup downloaded!',
        toastDataRestored: '📂 Data restored!',
        toastResetCompleted: '🔄 Reset completed',
        toastExpenseDeleted: '🗑️ Expense deleted',
        toastCalendarExported: '📅 Calendar exported!',
        toastThresholdExceeded: '⚠️ Warning! You have exceeded the threshold of {amount}',
        toastFillAllFields: '⚠️ Please fill in all fields',
        toastInvalidDay: '⚠️ Day must be between 1 and 31',
        toastInvalidFile: '❌ Invalid file',
        stopListening: '⏹️ Stop listening',
        footerText: 'BudgetWise 2.0 — Intelligent management of your finances',
        footerFeatures: '✨ Integrated AI Assistant • Voice Recognition • Dark Theme',
        badgeNew: 'new',
    }
};

class BudgetWise {
    constructor() {
        this.data = {
            income: 0,
            fixedExpenses: [],
            variableExpenses: {},
            savingsPercent: 0,
            savingsGoal: 0,
            threshold: 50,
            language: 'it',
            periodStart: this.getDefaultPeriodStart(),
            periodEnd: this.getDefaultPeriodEnd()
        };
        this.chart = null;
        this.init();
    }

    t(key, params = {}) {
        try {
            const lang = this.data.language || 'it';
            const langData = translations[lang] || translations.it;
            let text = langData[key] || key;
            for (const [param, value] of Object.entries(params)) {
                text = text.replace(new RegExp(`{${param}}`, 'g'), value);
            }
            return text;
        } catch (e) {
            console.warn('Errore traduzione:', e);
            return key;
        }
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.updateUI();
        this.updateChart();
    }

    getDefaultPeriodStart() {
        return new Date().toISOString().split('T')[0];
    }

    getDefaultPeriodEnd() {
        const end = new Date();
        end.setDate(end.getDate() + 28);
        return end.toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Income
        const saveIncomeBtn = document.getElementById('saveIncomeBtn');
        if (saveIncomeBtn) {
            saveIncomeBtn.addEventListener('click', () => this.saveIncome());
        }

        // Fixed expenses
        const addFixedBtn = document.getElementById('addFixedBtn');
        if (addFixedBtn) {
            addFixedBtn.addEventListener('click', () => this.addFixedExpense());
        }

        // Variable expenses
        const addExpenseBtn = document.getElementById('addExpenseBtn');
        if (addExpenseBtn) {
            addExpenseBtn.addEventListener('click', () => this.addVariableExpense());
        }

        const resetDayBtn = document.getElementById('resetDayBtn');
        if (resetDayBtn) {
            resetDayBtn.addEventListener('click', () => this.resetDay());
        }

        const expenseDate = document.getElementById('expenseDate');
        if (expenseDate) {
            expenseDate.valueAsDate = new Date();
        }

        // Savings
        const applySaveBtn = document.getElementById('applySaveBtn');
        if (applySaveBtn) {
            applySaveBtn.addEventListener('click', () => this.applySavings());
        }

        // Backup
        const backupBtn = document.getElementById('backupBtn');
        if (backupBtn) {
            backupBtn.addEventListener('click', () => this.backupData());
        }

        const restoreBtn = document.getElementById('restoreBtn');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => {
                const restoreFile = document.getElementById('restoreFile');
                if (restoreFile) restoreFile.click();
            });
        }

        const restoreFile = document.getElementById('restoreFile');
        if (restoreFile) {
            restoreFile.addEventListener('change', (e) => this.restoreData(e));
        }

        // Reset all
        const resetAllBtn = document.getElementById('resetAllBtn');
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', () => this.resetAll());
        }

        // Export calendar
        const exportCalendarBtn = document.getElementById('exportCalendarBtn');
        if (exportCalendarBtn) {
            exportCalendarBtn.addEventListener('click', () => this.exportToCalendar());
        }

        // Threshold
        const thresholdInput = document.getElementById('thresholdInput');
        if (thresholdInput) {
            thresholdInput.addEventListener('change', (e) => {
                this.data.threshold = parseFloat(e.target.value) || 50;
                this.saveData();
            });
        }

        // LANGUAGE SELECT - Versione garantita
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            // Imposta il valore iniziale
            languageSelect.value = this.data.language;
            
            // Usa sia addEventListener che onchange per sicurezza
            languageSelect.addEventListener('change', (e) => {
                console.log('Lingua cambiata a:', e.target.value);
                this.data.language = e.target.value;
                this.saveData();
                this.updateUI();
                this.updateChart();
            });
            
            // Backup con attributo onchange diretto
            languageSelect.onchange = (e) => {
                console.log('ONCHANGE: Lingua cambiata a:', e.target.value);
                this.data.language = e.target.value;
                this.saveData();
                this.updateUI();
                this.updateChart();
            };
        }

        // Savings percent
        const savePercent = document.getElementById('savePercent');
        if (savePercent) {
            savePercent.addEventListener('input', (e) => {
                this.data.savingsPercent = parseFloat(e.target.value) || 0;
                this.saveData();
            });
        }

        // Savings goal
        const saveGoal = document.getElementById('saveGoal');
        if (saveGoal) {
            saveGoal.addEventListener('input', (e) => {
                this.data.savingsGoal = parseFloat(e.target.value) || 0;
                this.saveData();
            });
        }

        // Voice button
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                if (window.voiceAssistant) {
                    window.voiceAssistant.toggleListening();
                }
            });
        }
    }

    // ========== FUNZIONI PRINCIPALI ==========

    saveIncome() {
        const incomeInput = document.getElementById('incomeInput');
        if (!incomeInput) return;
        
        const income = parseFloat(incomeInput.value) || 0;
        this.data.income = income;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastIncomeSaved'));
    }

    addFixedExpense() {
        const nameInput = document.getElementById('fixedName');
        const amountInput = document.getElementById('fixedAmount');
        const dayInput = document.getElementById('fixedDay');
        const endDateInput = document.getElementById('fixedEndDate');
        
        if (!nameInput || !amountInput || !dayInput || !endDateInput) return;
        
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const day = parseInt(dayInput.value);
        const endDate = endDateInput.value;

        if (!name || !amount || !day || !endDate) {
            this.showToast(this.t('toastFillAllFields'), 'error');
            return;
        }

        if (day < 1 || day > 31) {
            this.showToast(this.t('toastInvalidDay'), 'error');
            return;
        }

        this.data.fixedExpenses.push({ 
            name, 
            amount, 
            day,
            endDate,
            id: Date.now()
        });
        
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastFixedAdded'));
        
        nameInput.value = '';
        amountInput.value = '';
        dayInput.value = '';
        endDateInput.value = '';
    }

    addVariableExpense() {
        const dateInput = document.getElementById('expenseDate');
        const nameInput = document.getElementById('expenseName');
        const amountInput = document.getElementById('expenseAmount');
        const categorySelect = document.getElementById('expenseCategory');
        
        if (!dateInput || !nameInput || !amountInput || !categorySelect) return;
        
        const date = dateInput.value;
        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const category = categorySelect.value;

        if (!name || !amount) {
            this.showToast(this.t('toastFillAllFields'), 'error');
            return;
        }

        if (!this.data.variableExpenses[date]) {
            this.data.variableExpenses[date] = [];
        }

        this.data.variableExpenses[date].push({
            name,
            amount,
            category,
            id: Date.now()
        });

        this.saveData();
        this.updateUI();
        this.updateChart();
        this.showToast(this.t('toastExpenseAdded'));
        
        nameInput.value = '';
        amountInput.value = '';
        
        this.checkThreshold(date);
    }

    resetDay() {
        const dateInput = document.getElementById('expenseDate');
        if (!dateInput) return;
        
        const date = dateInput.value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastDayReset'));
        }
    }

    applySavings() {
        const savePercent = document.getElementById('savePercent');
        const saveGoal = document.getElementById('saveGoal');
        
        if (!savePercent || !saveGoal) return;
        
        const percent = parseFloat(savePercent.value) || 0;
        const goal = parseFloat(saveGoal.value) || 0;
        
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastSavingsApplied'));
    }

    // ========== CALCOLI ==========

    calculateTotalVariableExpenses() {
        let total = 0;
        Object.values(this.data.variableExpenses || {}).forEach(day => {
            (day || []).forEach(expense => {
                total += expense.amount || 0;
            });
        });
        return total;
    }

    calculateTotalFixedExpenses() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return (this.data.fixedExpenses || []).reduce((sum, exp) => {
            const endDate = new Date(exp.endDate);
            if (endDate < today) return sum;
            
            const paymentDate = new Date(currentYear, currentMonth, exp.day);
            if (paymentDate > today) return sum;
            
            return sum + (exp.amount || 0);
        }, 0);
    }

    calculateBudget() {
        const totalFixed = this.calculateTotalFixedExpenses();
        const savingsAmount = (this.data.income * this.data.savingsPercent) / 100;
        return this.data.income - totalFixed - savingsAmount;
    }

    calculateRemaining() {
        const budget = this.calculateBudget();
        const spent = this.calculateTotalVariableExpenses();
        return budget - spent;
    }

    calculateDailyBudget() {
        const remaining = this.calculateRemaining();
        const daysLeft = this.getDaysLeft();
        return daysLeft > 0 ? remaining / daysLeft : 0;
    }

    getDaysLeft() {
        const today = new Date();
        const end = new Date(this.data.periodEnd);
        const diffTime = end - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return Math.max(0, diffDays);
    }

    calculateSavingsProgress() {
        if (!this.data.savingsGoal) return 0;
        const saved = (this.data.income * this.data.savingsPercent) / 100;
        return (saved / this.data.savingsGoal) * 100;
    }

    getNextPaymentDate(day) {
        const today = new Date();
        let nextDate = new Date(today.getFullYear(), today.getMonth(), day);
        if (nextDate < today) {
            nextDate = new Date(today.getFullYear(), today.getMonth() + 1, day);
        }
        return nextDate.toISOString().split('T')[0];
    }

    // ========== UI UPDATES ==========

    updateUI() {
        console.log('Aggiornamento UI, lingua:', this.data.language);
        
        // TITOLI
        const appTitle = document.getElementById('appTitle');
        if (appTitle) {
            appTitle.innerHTML = `${this.t('appTitle')} <span class="version">${this.t('version')}</span>`;
        }
        
        const appSubtitle = document.getElementById('appSubtitle');
        if (appSubtitle) {
            appSubtitle.textContent = this.t('appSubtitle');
        }
        
        const badgeNew = document.getElementById('badgeNew');
        if (badgeNew) {
            badgeNew.textContent = this.t('badgeNew');
        }

        // RIEPILOGO
        const labelDailyBudget = document.getElementById('labelDailyBudget');
        if (labelDailyBudget) {
            labelDailyBudget.textContent = this.t('dailyBudget');
        }
        
        const labelRemaining = document.getElementById('labelRemaining');
        if (labelRemaining) {
            labelRemaining.textContent = this.t('remaining');
        }
        
        const labelDaysLeft = document.getElementById('labelDaysLeft');
        if (labelDaysLeft) {
            labelDaysLeft.textContent = this.t('daysLeft');
        }
        
        const dailyBudget = document.getElementById('dailyBudget');
        if (dailyBudget) {
            dailyBudget.textContent = this.formatCurrency(this.calculateDailyBudget());
        }
        
        const remaining = document.getElementById('remaining');
        if (remaining) {
            remaining.textContent = this.formatCurrency(this.calculateRemaining());
        }
        
        const daysLeft = document.getElementById('daysLeft');
        if (daysLeft) {
            daysLeft.textContent = this.getDaysLeft();
        }
        
        const periodInfo = document.getElementById('periodInfo');
        if (periodInfo) {
            periodInfo.textContent = this.t('periodInfo', { 
                start: this.data.periodStart, 
                end: this.data.periodEnd 
            });
        }

        // SEZIONI
        const sectionIncome = document.getElementById('sectionIncome');
        if (sectionIncome) {
            sectionIncome.textContent = this.t('incomeSection');
        }
        
        const sectionFixedExpenses = document.getElementById('sectionFixedExpenses');
        if (sectionFixedExpenses) {
            sectionFixedExpenses.textContent = this.t('fixedExpensesSection');
        }
        
        const sectionVariableExpenses = document.getElementById('sectionVariableExpenses');
        if (sectionVariableExpenses) {
            sectionVariableExpenses.textContent = this.t('variableExpensesSection');
        }
        
        const sectionChart = document.getElementById('sectionChart');
        if (sectionChart) {
            sectionChart.textContent = this.t('chartSection');
        }
        
        const sectionAssistant = document.getElementById('sectionAssistant');
        if (sectionAssistant) {
            sectionAssistant.textContent = this.t('assistantSection');
        }
        
        const sectionSavings = document.getElementById('sectionSavings');
        if (sectionSavings) {
            sectionSavings.textContent = this.t('savingsSection');
        }
        
        const sectionSettings = document.getElementById('sectionSettings');
        if (sectionSettings) {
            sectionSettings.textContent = this.t('settingsSection');
        }

        // LABEL FORM
        const labelTotalIncome = document.getElementById('labelTotalIncome');
        if (labelTotalIncome) {
            labelTotalIncome.textContent = this.t('labelTotalIncome');
        }
        
        const labelDayOfMonth = document.getElementById('labelDayOfMonth');
        if (labelDayOfMonth) {
            labelDayOfMonth.textContent = this.t('labelDayOfMonth');
        }
        
        const labelEndDate = document.getElementById('labelEndDate');
        if (labelEndDate) {
            labelEndDate.textContent = this.t('labelEndDate');
        }
        
        const labelSelectDate = document.getElementById('labelSelectDate');
        if (labelSelectDate) {
            labelSelectDate.textContent = this.t('labelSelectDate');
        }
        
        const labelThreshold = document.getElementById('labelThreshold');
        if (labelThreshold) {
            labelThreshold.textContent = this.t('labelThreshold');
        }
        
        const labelLanguage = document.getElementById('labelLanguage');
        if (labelLanguage) {
            labelLanguage.textContent = this.t('labelLanguage');
        }
        
        const labelBackup = document.getElementById('labelBackup');
        if (labelBackup) {
            labelBackup.textContent = this.t('labelBackup');
        }
        
        const labelSavingsPercent = document.getElementById('labelSavingsPercent');
        if (labelSavingsPercent) {
            labelSavingsPercent.textContent = this.t('labelSavingsPercent');
        }
        
        const labelSavingsGoal = document.getElementById('labelSavingsGoal');
        if (labelSavingsGoal) {
            labelSavingsGoal.textContent = this.t('labelSavingsGoal');
        }

        // PLACEHOLDER
        const incomeInput = document.getElementById('incomeInput');
        if (incomeInput) {
            incomeInput.placeholder = this.t('placeholderAmount');
        }
        
        const fixedName = document.getElementById('fixedName');
        if (fixedName) {
            fixedName.placeholder = this.t('placeholderName');
        }
        
        const fixedAmount = document.getElementById('fixedAmount');
        if (fixedAmount) {
            fixedAmount.placeholder = this.t('placeholderAmount');
        }
        
        const fixedDay = document.getElementById('fixedDay');
        if (fixedDay) {
            fixedDay.placeholder = this.t('placeholderDay');
        }
        
        const expenseName = document.getElementById('expenseName');
        if (expenseName) {
            expenseName.placeholder = this.t('placeholderWhatBought');
        }
        
        const expenseAmount = document.getElementById('expenseAmount');
        if (expenseAmount) {
            expenseAmount.placeholder = this.t('placeholderAmount');
        }
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.placeholder = this.t('placeholderAskAssistant');
        }

        // HELP TEXT
        const fixedHelpText = document.getElementById('fixedHelpText');
        if (fixedHelpText) {
            fixedHelpText.textContent = this.t('fixedHelpText');
        }

        // BOTTONI
        const saveIncomeBtn = document.getElementById('saveIncomeBtn');
        if (saveIncomeBtn) {
            saveIncomeBtn.textContent = this.t('btnSaveIncome');
        }
        
        const addFixedBtn = document.getElementById('addFixedBtn');
        if (addFixedBtn) {
            addFixedBtn.textContent = this.t('btnAddFixedExpense');
        }
        
        const addExpenseBtn = document.getElementById('addExpenseBtn');
        if (addExpenseBtn) {
            addExpenseBtn.textContent = this.t('btnAddExpense');
        }
        
        const resetDayBtn = document.getElementById('resetDayBtn');
        if (resetDayBtn) {
            resetDayBtn.textContent = this.t('btnResetDay');
        }
        
        const applySaveBtn = document.getElementById('applySaveBtn');
        if (applySaveBtn) {
            applySaveBtn.textContent = this.t('btnApplySavings');
        }
        
        const backupBtn = document.getElementById('backupBtn');
        if (backupBtn) {
            backupBtn.textContent = this.t('btnDownloadBackup');
        }
        
        const restoreBtn = document.getElementById('restoreBtn');
        if (restoreBtn) {
            restoreBtn.textContent = this.t('btnRestoreBackup');
        }
        
        const resetAllBtn = document.getElementById('resetAllBtn');
        if (resetAllBtn) {
            resetAllBtn.textContent = this.t('btnResetAll');
        }
        
        const exportCalendarBtn = document.getElementById('exportCalendarBtn');
        if (exportCalendarBtn) {
            exportCalendarBtn.textContent = this.t('btnExportCalendar');
        }
        
        const sendChatBtn = document.getElementById('sendChatBtn');
        if (sendChatBtn) {
            sendChatBtn.textContent = this.t('btnSend');
        }
        
        const voiceBtnText = document.getElementById('voiceBtnText');
        if (voiceBtnText) {
            voiceBtnText.textContent = this.t('btnVoice');
        }

        // CATEGORIE
        const categorySelect = document.getElementById('expenseCategory');
        if (categorySelect && categorySelect.options) {
            const options = categorySelect.options;
            if (options.length >= 6) {
                options[0].text = this.t('categoryGrocery');
                options[1].text = this.t('categoryTransport');
                options[2].text = this.t('categoryEntertainment');
                options[3].text = this.t('categoryHealth');
                options[4].text = this.t('categoryClothing');
                options[5].text = this.t('categoryOther');
            }
        }

        // FOOTER
        const footerText = document.getElementById('footerText');
        if (footerText) {
            footerText.textContent = this.t('footerText');
        }
        
        const footerFeatures = document.getElementById('footerFeatures');
        if (footerFeatures) {
            footerFeatures.textContent = this.t('footerFeatures');
        }

        // SUGGERIMENTI ASSISTENTE
        const suggestion1 = document.getElementById('suggestion1');
        if (suggestion1) {
            suggestion1.textContent = this.t('suggestionSave100');
            suggestion1.setAttribute('data-question', this.data.language === 'it' ? 'Come posso risparmiare 100€ questo mese?' : 'How can I save 100€ this month?');
        }
        
        const suggestion2 = document.getElementById('suggestion2');
        if (suggestion2) {
            suggestion2.textContent = this.t('suggestionSimulate');
            suggestion2.setAttribute('data-question', this.data.language === 'it' ? 'Cosa succede se aumento le spese del 20%?' : 'What happens if I increase expenses by 20%?');
        }
        
        const suggestion3 = document.getElementById('suggestion3');
        if (suggestion3) {
            suggestion3.textContent = this.t('suggestionGoal');
            suggestion3.setAttribute('data-question', this.data.language === 'it' ? 'Quando raggiungerò il mio obiettivo?' : 'When will I reach my goal?');
        }
        
        const suggestion4 = document.getElementById('suggestion4');
        if (suggestion4) {
            suggestion4.textContent = this.t('suggestionTopCategory');
            suggestion4.setAttribute('data-question', this.data.language === 'it' ? 'Qual è la categoria dove spendo di più?' : 'What is the category where I spend the most?');
        }

        // MESSAGGIO BENVENUTO ASSISTENTE
        const assistantWelcomeMessage = document.getElementById('assistantWelcomeMessage');
        if (assistantWelcomeMessage) {
            assistantWelcomeMessage.textContent = this.t('assistantWelcome');
        }

        // LISTE
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();

        // INPUT VALORI
        const savePercentInput = document.getElementById('savePercent');
        if (savePercentInput) {
            savePercentInput.value = this.data.savingsPercent;
        }
        
        const saveGoalInput = document.getElementById('saveGoal');
        if (saveGoalInput) {
            saveGoalInput.value = this.data.savingsGoal;
        }
        
        const thresholdInput = document.getElementById('thresholdInput');
        if (thresholdInput) {
            thresholdInput.value = this.data.threshold;
        }
        
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.data.language;
        }

        // PROGRESS
        const progress = this.calculateSavingsProgress();
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        
        if (progressContainer && progressBar) {
            if (progress > 0 && this.data.savingsGoal) {
                progressContainer.style.display = 'block';
                progressBar.style.width = progress + '%';
                progressBar.textContent = Math.round(progress) + '%';
            } else {
                progressContainer.style.display = 'none';
            }
        }

        // GUIDA
        this.showGuideMessage();
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (!container) return;
        
        if (!this.data.fixedExpenses || this.data.fixedExpenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noFixedExpenses')}</p>`;
            return;
        }

        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const today = new Date();
            const endDate = new Date(exp.endDate);
            const isActive = endDate >= today;
            const status = isActive ? this.t('statusActive') : this.t('statusExpired');
            
            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <span class="expense-name">${exp.name || ''}</span>
                        <span class="fixed-expense-detail">
                            ${this.t('fixedExpenseDetail', { day: exp.day || '', endDate: exp.endDate || '', status: status })}
                        </span>
                    </div>
                    <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                    <div class="expense-actions">
                        <button onclick="app.deleteFixedExpense(${exp.id})">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateVariableExpensesList() {
        const dateInput = document.getElementById('expenseDate');
        if (!dateInput) return;
        
        const date = dateInput.value;
        const container = document.getElementById('variableExpensesList');
        if (!container) return;
        
        const expenses = (this.data.variableExpenses && this.data.variableExpenses[date]) || [];

        if (expenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noVariableExpenses')}</p>`;
            return;
        }

        container.innerHTML = expenses.map(exp => {
            let categoryKey = 'categoryOther';
            if (exp.category === 'Alimentari') categoryKey = 'categoryGrocery';
            else if (exp.category === 'Trasporti') categoryKey = 'categoryTransport';
            else if (exp.category === 'Svago') categoryKey = 'categoryEntertainment';
            else if (exp.category === 'Salute') categoryKey = 'categoryHealth';
            else if (exp.category === 'Abbigliamento') categoryKey = 'categoryClothing';
            
            const translatedCategory = this.t(categoryKey);
            
            return `
            <div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${exp.name || ''}</span>
                    <span class="expense-category">${translatedCategory}</span>
                </div>
                <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                <div class="expense-actions">
                    <button onclick="app.deleteVariableExpense('${date}', ${exp.id})">🗑️</button>
                </div>
            </div>
        `}).join('');
    }

    updateChart() {
        try {
            const categories = {};
            
            Object.values(this.data.variableExpenses || {}).forEach(day => {
                (day || []).forEach(expense => {
                    const cat = expense.category || 'Altro';
                    categories[cat] = (categories[cat] || 0) + (expense.amount || 0);
                });
            });

            const chartNote = document.getElementById('chartNote');
            
            if (Object.keys(categories).length === 0) {
                if (chartNote) {
                    chartNote.style.display = 'block';
                    chartNote.textContent = this.t('noChartData');
                }
                if (this.chart) {
                    this.chart.destroy();
                    this.chart = null;
                }
                return;
            }

            if (chartNote) {
                chartNote.style.display = 'none';
            }

            if (this.chart) {
                this.chart.destroy();
            }

            const translatedLabels = Object.keys(categories).map(cat => {
                if (cat === 'Alimentari') return this.t('categoryGrocery');
                if (cat === 'Trasporti') return this.t('categoryTransport');
                if (cat === 'Svago') return this.t('categoryEntertainment');
                if (cat === 'Salute') return this.t('categoryHealth');
                if (cat === 'Abbigliamento') return this.t('categoryClothing');
                return this.t('categoryOther');
            });

            const ctx = document.getElementById('expenseChart')?.getContext('2d');
            if (!ctx) return;
            
            this.chart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: translatedLabels,
                    datasets: [{
                        data: Object.values(categories),
                        backgroundColor: [
                            '#4361ee', '#4895ef', '#2dc653', '#ff9e00', '#ef233c', '#7209b7'
                        ]
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        } catch (e) {
            console.error('Errore in updateChart:', e);
        }
    }

    // ========== UTILITY ==========

    formatCurrency(amount) {
        return (amount || 0).toFixed(2).replace('.', ',') + ' €';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        toast.textContent = message;
        toast.style.background = type === 'success' ? '#2dc653' : '#ef233c';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    showGuideMessage() {
        const guideMsg = document.getElementById('guideMessage');
        if (!guideMsg) return;
        
        if (this.data.income === 0) {
            guideMsg.style.display = 'block';
            guideMsg.textContent = this.t('guideMessage');
        } else {
            guideMsg.style.display = 'none';
        }
    }

    checkThreshold(date) {
        const today = new Date().toISOString().split('T')[0];
        if (date !== today) return;

        const totalSpent = this.calculateTotalVariableExpenses();
        if (totalSpent > this.data.threshold) {
            this.showToast(this.t('toastThresholdExceeded', { amount: this.formatCurrency(this.data.threshold) }), 'error');
        }
    }

    toggleTheme() {
        const html = document.documentElement;
        const themeToggle = document.getElementById('themeToggle');
        
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            if (themeToggle) themeToggle.textContent = '🌙';
        } else {
            html.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        }
        this.saveTheme();
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('budgetwise-theme');
        const themeToggle = document.getElementById('themeToggle');
        
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            if (themeToggle) themeToggle.textContent = '☀️';
        }
    }

    saveTheme() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        localStorage.setItem('budgetwise-theme', theme);
    }

    // ========== DATA PERSISTENCE ==========

    saveData() {
        try {
            localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
        } catch (e) {
            console.error('Errore salvataggio dati:', e);
        }
    }

    loadData() {
        try {
            const saved = localStorage.getItem('budgetwise-data');
            if (saved) {
                this.data = JSON.parse(saved);
            }
        } catch (e) {
            console.error('Errore caricamento dati:', e);
        }
    }

    backupData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        this.showToast(this.t('toastBackupDownloaded'));
    }

    restoreData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                this.data = JSON.parse(e.target.result);
                this.saveData();
                this.updateUI();
                this.updateChart();
                this.showToast(this.t('toastDataRestored'));
            } catch (error) {
                this.showToast(this.t('toastInvalidFile'), 'error');
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm(this.data.language === 'it' ? 'Sei sicuro di voler cancellare TUTTI i dati?' : 'Are you sure you want to delete ALL data?')) {
            localStorage.clear();
            this.data = {
                income: 0,
                fixedExpenses: [],
                variableExpenses: {},
                savingsPercent: 0,
                savingsGoal: 0,
                threshold: 50,
                language: this.data.language,
                periodStart: this.getDefaultPeriodStart(),
                periodEnd: this.getDefaultPeriodEnd()
            };
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastResetCompleted'));
        }
    }

    // ========== DELETE FUNCTIONS ==========

    deleteFixedExpense(id) {
        this.data.fixedExpenses = (this.data.fixedExpenses || []).filter(exp => exp.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastExpenseDeleted'));
    }

    deleteVariableExpense(date, id) {
        if (this.data.variableExpenses && this.data.variableExpenses[date]) {
            this.data.variableExpenses[date] = this.data.variableExpenses[date].filter(exp => exp.id !== id);
            if (this.data.variableExpenses[date].length === 0) {
                delete this.data.variableExpenses[date];
            }
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastExpenseDeleted'));
        }
    }

    // ========== EXPORT ==========

    exportToCalendar() {
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        
        (this.data.fixedExpenses || []).forEach(exp => {
            const endDate = new Date(exp.endDate);
            if (endDate >= new Date()) {
                icsContent += "BEGIN:VEVENT\n";
                icsContent += `SUMMARY:💰 ${exp.name || ''}\n`;
                icsContent += `DESCRIPTION:${this.data.language === 'it' ? 'Spesa fissa di' : 'Fixed expense of'} ${this.formatCurrency(exp.amount || 0)} - ${this.data.language === 'it' ? 'Ogni giorno' : 'Every day'} ${exp.day || ''}\n`;
                const nextDate = this.getNextPaymentDate(exp.day || 1);
                icsContent += `DTSTART;VALUE=DATE:${nextDate.replace(/-/g, '')}\n`;
                icsContent += `RRULE:FREQ=MONTHLY;UNTIL=${(exp.endDate || '').replace(/-/g, '')}\n`;
                icsContent += "END:VEVENT\n";
            }
        });

        Object.entries(this.data.variableExpenses || {}).forEach(([date, expenses]) => {
            (expenses || []).forEach(exp => {
                icsContent += "BEGIN:VEVENT\n";
                icsContent += `SUMMARY:🛒 ${exp.name || ''}\n`;
                icsContent += `DESCRIPTION:${exp.category || ''} - ${this.formatCurrency(exp.amount || 0)}\n`;
                icsContent += `DTSTART;VALUE=DATE:${(date || '').replace(/-/g, '')}\n`;
                icsContent += `DTEND;VALUE=DATE:${(date || '').replace(/-/g, '')}\n`;
                icsContent += "END:VEVENT\n";
            });
        });

        icsContent += "END:VCALENDAR";

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `budgetwise-${this.data.periodStart || 'backup'}.ics`;
        a.click();
        
        this.showToast(this.t('toastCalendarExported'));
    }
}

// ============================================
// ASSISTENTE FINANZIARIO
// ============================================
class FinancialAssistant {
    constructor(app) {
        this.app = app;
        this.init();
    }

    init() {
        const sendChatBtn = document.getElementById('sendChatBtn');
        if (sendChatBtn) {
            sendChatBtn.addEventListener('click', () => this.handleUserInput());
        }
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleUserInput();
            });
        }
        
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const chatInput = document.getElementById('chatInput');
                if (chatInput) {
                    chatInput.value = chip.dataset.question;
                    this.handleUserInput();
                }
            });
        });
    }

    handleUserInput() {
        const input = document.getElementById('chatInput');
        if (!input) return;
        
        const question = input.value.trim();
        if (!question) return;

        this.addMessage(question, 'user');
        input.value = '';

        setTimeout(() => {
            const answer = this.generateAnswer(question);
            this.addMessage(answer, 'bot');
        }, 500);
    }

    addMessage(text, sender) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        const senderName = sender === 'bot' ? (this.app.data.language === 'it' ? '🤖 Assistente' : '🤖 Assistant') : '👤 Tu';
        messageDiv.innerHTML = `
            <span class="message-sender">${senderName}:</span>
            <span class="message-text">${text}</span>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    generateAnswer(question) {
        const q = question.toLowerCase();
        const data = this.app.data;
        const remaining = this.app.calculateRemaining();
        const dailyBudget = this.app.calculateDailyBudget();
        const totalSpent = this.app.calculateTotalVariableExpenses();
        const daysLeft = this.app.getDaysLeft();
        const lang = this.app.data.language;

        if (q.includes('risparmi') || q.includes('risparmiare') || q.includes('save') || q.includes('saving')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                const daily = dailyBudget;
                if (daily * daysLeft >= target) {
                    return `✅ ${lang === 'it' ? 'Sì! Puoi risparmiare' : 'Yes! You can save'} ${target}€ ${lang === 'it' ? 'entro fine mese. Ti basterebbe risparmiare' : 'by the end of the month. You would need to save'} ${(target/daysLeft).toFixed(2)}€ ${lang === 'it' ? 'al giorno. Il tuo budget giornaliero attuale è' : 'per day. Your current daily budget is'} ${this.app.formatCurrency(daily)}.`;
                } else {
                    return `⚠️ ${lang === 'it' ? 'Con l\'attuale budget di' : 'With the current budget of'} ${this.app.formatCurrency(daily)} ${lang === 'it' ? 'al giorno, in' : 'per day, in'} ${daysLeft} ${lang === 'it' ? 'giorni avrai' : 'days you will have'} ${this.app.formatCurrency(daily * daysLeft)}. ${lang === 'it' ? 'Per risparmiare' : 'To save'} ${target}€, ${lang === 'it' ? 'dovresti ridurre le spese giornaliere di' : 'you should reduce daily expenses by'} ${((target - (daily * daysLeft))/daysLeft).toFixed(2)}€.`;
                }
            }
            return this.getGenericSavingsAdvice();
        }

        if (q.includes('simul') || q.includes('cosa succede se') || q.includes('what if') || q.includes('simulate')) {
            return this.handleSimulation(q);
        }

        if (q.includes('quando raggiunger') || q.includes('obiettivo') || q.includes('when will') || q.includes('goal')) {
            return this.handleGoalPrediction();
        }

        if (q.includes('categoria') || q.includes('spendo di più') || q.includes('category') || q.includes('spend the most')) {
            return this.getTopCategory();
        }

        if (q.includes('quanto ho speso') || q.includes('how much did i spend')) {
            return this.handleExpenseQuery(q);
        }

        return this.getContextualAdvice();
    }

    getGenericSavingsAdvice() {
        const totalSpent = this.app.calculateTotalVariableExpenses();
        const dailyBudget = this.app.calculateDailyBudget();
        const daysLeft = this.app.getDaysLeft();
        const lang = this.app.data.language;
        
        if (totalSpent > this.app.data.threshold) {
            return `⚠️ ${lang === 'it' ? 'Attenzione: hai già superato la soglia di' : 'Warning: you have already exceeded the threshold of'} ${this.app.formatCurrency(this.app.data.threshold)}. ${lang === 'it' ? 'Ti consiglio di ridurre le spese non essenziali per i prossimi giorni. Il budget giornaliero è di' : 'I recommend reducing non-essential expenses for the next few days. The daily budget is'} ${this.app.formatCurrency(dailyBudget)}.`;
        }
        
        return `📊 ${lang === 'it' ? 'Analisi: al momento hai speso' : 'Analysis: you have spent so far'} ${this.app.formatCurrency(totalSpent)}. ${lang === 'it' ? 'Hai ancora' : 'You still have'} ${this.app.formatCurrency(this.app.calculateRemaining())} ${lang === 'it' ? 'disponibili fino al' : 'available until'} ${this.app.data.periodEnd}.`;
    }

    handleSimulation(q) {
        const dailyBudget = this.app.calculateDailyBudget();
        const daysLeft = this.app.getDaysLeft();
        const lang = this.app.data.language;
        
        if (q.includes('aument') || q.includes('+') || q.includes('increase')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const percent = parseInt(match[0]);
                const newDaily = dailyBudget * (1 + percent/100);
                const totalIncrease = (newDaily - dailyBudget) * daysLeft;
                return `🔮 ${lang === 'it' ? 'Se aumenti le spese del' : 'If you increase expenses by'} ${percent}%, ${lang === 'it' ? 'il budget giornaliero diventerebbe' : 'the daily budget would become'} ${this.app.formatCurrency(newDaily)}. ${lang === 'it' ? 'Alla fine del periodo avrai' : 'At the end of the period you will have'} ${this.app.formatCurrency(this.app.calculateRemaining() - totalIncrease)} ${lang === 'it' ? 'invece di' : 'instead of'} ${this.app.formatCurrency(this.app.calculateRemaining())}. ${lang === 'it' ? 'Sei sicuro?' : 'Are you sure?'}`;
            }
        }
        
        if (q.includes('riduc') || q.includes('-') || q.includes('reduce')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const percent = parseInt(match[0]);
                const newDaily = dailyBudget * (1 - percent/100);
                const totalSave = (dailyBudget - newDaily) * daysLeft;
                return `💡 ${lang === 'it' ? 'Riducendo le spese del' : 'By reducing expenses by'} ${percent}%, ${lang === 'it' ? 'risparmieresti' : 'you would save'} ${this.app.formatCurrency(totalSave)} ${lang === 'it' ? 'entro fine mese! Il nuovo budget giornaliero sarebbe' : 'by the end of the month! The new daily budget would be'} ${this.app.formatCurrency(newDaily)}.`;
            }
        }
        
        return lang === 'it' ? "Dimmi cosa vuoi simulare (es. 'cosa succede se aumento le spese del 20%?')" : "Tell me what you want to simulate (e.g., 'what if I increase expenses by 20%?')";
    }

    handleGoalPrediction() {
        const goal = this.app.data.savingsGoal;
        const percent = this.app.data.savingsPercent;
        const income = this.app.data.income;
        const lang = this.app.data.language;
        
        if (!goal || !percent) {
            return lang === 'it' ? "Non hai ancora impostato un obiettivo di risparmio. Vai nella sezione 🎯 e impostalo!" : "You haven't set a savings goal yet. Go to the 🎯 section and set it!";
        }
        
        const savedPerMonth = (income * percent) / 100;
        const monthsNeeded = Math.ceil(goal / savedPerMonth);
        
        if (monthsNeeded < 12) {
            return `🎯 ${lang === 'it' ? 'Al ritmo attuale, raggiungerai l\'obiettivo di' : 'At the current rate, you will reach the goal of'} ${this.app.formatCurrency(goal)} ${lang === 'it' ? 'in' : 'in'} ${monthsNeeded} ${lang === 'it' ? 'mesi' : 'months'}.`;
        } else {
            const years = Math.floor(monthsNeeded/12);
            const months = monthsNeeded % 12;
            return `🎯 ${lang === 'it' ? 'Raggiungerai l\'obiettivo in' : 'You will reach the goal in'} ${years} ${lang === 'it' ? 'anni e' : 'years and'} ${months} ${lang === 'it' ? 'mesi' : 'months'}. ${lang === 'it' ? 'Se aumentassi il risparmio al' : 'If you increased savings to'} ${percent+5}%, ${lang === 'it' ? 'ci impiegheresti meno!' : 'it would take less time!'}`;
        }
    }

    getTopCategory() {
        const categories = {};
        Object.values(this.app.data.variableExpenses || {}).forEach(day => {
            (day || []).forEach(exp => {
                const cat = exp.category || 'Altro';
                categories[cat] = (categories[cat] || 0) + (exp.amount || 0);
            });
        });
        
        if (Object.keys(categories).length === 0) {
            return this.app.data.language === 'it' ? "Non hai ancora spese registrate. Aggiungine qualcuna per avere un'analisi!" : "You haven't recorded any expenses yet. Add some to get an analysis!";
        }
        
        const top = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];
        
        let categoryKey = 'categoryOther';
        if (top[0] === 'Alimentari') categoryKey = 'categoryGrocery';
        else if (top[0] === 'Trasporti') categoryKey = 'categoryTransport';
        else if (top[0] === 'Svago') categoryKey = 'categoryEntertainment';
        else if (top[0] === 'Salute') categoryKey = 'categoryHealth';
        else if (top[0] === 'Abbigliamento') categoryKey = 'categoryClothing';
        
        const translatedCategory = this.app.t(categoryKey);
        
        return `📊 ${this.app.data.language === 'it' ? 'La categoria in cui spendi di più è' : 'The category where you spend the most is'} "${translatedCategory}" ${this.app.data.language === 'it' ? 'con' : 'with'} ${this.app.formatCurrency(top[1])}. ${this.app.data.language === 'it' ? 'Vuoi qualche consiglio su come ridurre queste spese?' : 'Do you want some advice on how to reduce these expenses?'}`;
    }

    handleExpenseQuery(q) {
        const lang = this.app.data.language;
        
        if (q.includes('questo mese') || q.includes('this month')) {
            const total = this.app.calculateTotalVariableExpenses();
            return `📊 ${lang === 'it' ? 'In questo periodo (dal' : 'In this period (from'} ${this.app.data.periodStart} ${lang === 'it' ? 'a oggi) hai speso' : 'to today) you spent'} ${this.app.formatCurrency(total)}.`;
        }
        
        const categories = ['alimentari', 'trasporti', 'svago', 'salute', 'abbigliamento', 'altro'];
        for (let cat of categories) {
            if (q.includes(cat)) {
                let total = 0;
                Object.values(this.app.data.variableExpenses || {}).forEach(day => {
                    (day || []).forEach(exp => {
                        let italianCat = '';
                        if (cat === 'alimentari') italianCat = 'Alimentari';
                        else if (cat === 'trasporti') italianCat = 'Trasporti';
                        else if (cat === 'svago') italianCat = 'Svago';
                        else if (cat === 'salute') italianCat = 'Salute';
                        else if (cat === 'abbigliamento') italianCat = 'Abbigliamento';
                        else italianCat = 'Altro';
                        
                        if (exp.category === italianCat) total += exp.amount || 0;
                    });
                });
                return total > 0 
                    ? `${lang === 'it' ? 'In' : 'In'} ${cat} ${lang === 'it' ? 'hai speso' : 'you spent'} ${this.app.formatCurrency(total)}.`
                    : `${lang === 'it' ? 'Non hai spese in' : 'You have no expenses in'} ${cat} ${lang === 'it' ? 'in questo periodo' : 'in this period'}.`;
            }
        }
        
        return null;
    }

    getContextualAdvice() {
        const remaining = this.app.calculateRemaining();
        const dailyBudget = this.app.calculateDailyBudget();
        const lang = this.app.data.language;
        
        if (remaining < 0) {
            return lang === 'it' ? "⚠️ Sei in rosso! Hai speso più del budget. Ti consiglio di rivedere le spese fisse o trovare fonti di risparmio immediate." : "⚠️ You're in the red! You've spent more than your budget. I recommend reviewing fixed expenses or finding immediate savings.";
        } else if (remaining < dailyBudget * 7) {
            return `⚠️ ${lang === 'it' ? 'Attenzione: ti rimangono solo' : 'Warning: you only have'} ${this.app.formatCurrency(remaining)} ${lang === 'it' ? 'per i prossimi giorni. Forse è meglio ridurre le spese variabili.' : 'for the next few days. Maybe it\'s better to reduce variable expenses.'}`;
        } else {
            return `💪 ${lang === 'it' ? 'Vai bene! Hai ancora' : 'You\'re doing well! You still have'} ${this.app.formatCurrency(remaining)} ${lang === 'it' ? 'di margine. Ricorda che puoi sempre chiedermi simulazioni o consigli personalizzati.' : 'of margin. Remember you can always ask me for simulations or personalized advice.'}`;
        }
    }
}

// ============================================
// ASSISTENTE VOCALE
// ============================================
class VoiceAssistant {
    constructor(app) {
        this.app = app;
        this.isListening = false;
        this.recognition = null;
        this.init();
    }

    init() {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Riconoscimento vocale non supportato');
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.disabled = true;
                voiceBtn.innerHTML = '🎤 ' + (this.app.data.language === 'it' ? 'Non supportato' : 'Not supported');
            }
            return;
        }

        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'it-IT';
        this.recognition.maxAlternatives = 1;

        this.setupListeners();
        this.addVoiceSuggestions();
    }

    setupListeners() {
        const voiceBtn = document.getElementById('voiceBtn');
        if (!voiceBtn) return;

        voiceBtn.addEventListener('click', () => this.toggleListening());

        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI('listening', this.app.t('statusListening'));
        };

        this.recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript.trim().toLowerCase();
            
            if (result.isFinal) {
                this.processCommand(transcript);
                this.updateUI('success', this.app.t('statusRecognized', { text: transcript }));
            } else {
                this.updateUI('listening', this.app.t('statusHeard', { text: transcript }));
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Errore riconoscimento vocale:', event.error);
            let messageKey = 'statusError';
            
            if (event.error === 'not-allowed') messageKey = 'statusMicrophoneDenied';
            else if (event.error === 'no-speech') messageKey = 'statusNoSpeech';
            else if (event.error === 'network') messageKey = 'statusNetworkError';
            
            this.updateUI('error', this.app.t(messageKey));
            this.isListening = false;
        };

        this.recognition.onend = () => {
            if (this.isListening) {
                setTimeout(() => {
                    if (this.isListening) {
                        this.recognition.start();
                    }
                }, 100);
            } else {
                this.updateUI('idle', this.app.t('statusTapToSpeak'));
            }
        };
    }

    toggleListening() {
        if (this.isListening) {
            this.isListening = false;
            this.recognition.stop();
        } else {
            try {
                this.recognition.start();
            } catch (error) {
                console.error('Errore avvio:', error);
                this.updateUI('error', this.app.t('statusError'));
            }
        }
    }

    updateUI(state, message) {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        const voiceBtnText = document.getElementById('voiceBtnText');
        
        if (!voiceBtn || !voiceStatus) return;

        voiceBtn.classList.remove('listening', 'success', 'error');
        
        if (state === 'listening') {
            voiceBtn.classList.add('listening');
            if (voiceBtnText) voiceBtnText.textContent = this.app.t('stopListening');
        } else {
            if (voiceBtnText) voiceBtnText.textContent = this.app.t('btnVoice');
            if (state === 'success') voiceBtn.classList.add('success');
            else if (state === 'error') voiceBtn.classList.add('error');
        }
        
        voiceStatus.textContent = message;
        
        if (state !== 'listening') {
            setTimeout(() => {
                if (!this.isListening) {
                    voiceStatus.textContent = this.app.t('statusTapToSpeak');
                }
            }, 3000);
        }
    }

    processCommand(transcript) {
        console.log('Comando vocale:', transcript);
        
        let name = '';
        let amount = 0;
        let category = 'Altro';
        
        const amountMatch = transcript.match(/(\d+[.,]?\d*)/);
        if (!amountMatch) {
            this.updateUI('error', '❌ ' + (this.app.data.language === 'it' ? 'Importo non riconosciuto' : 'Amount not recognized'));
            return;
        }
        
        amount = parseFloat(amountMatch[1].replace(',', '.'));
        
        let remainingText = transcript
            .replace(amountMatch[1], '')
            .replace(/euro?|€/gi, '')
            .trim();
        
        const categories = ['alimentari', 'trasporti', 'svago', 'salute', 'abbigliamento', 'altro'];
        for (let cat of categories) {
            if (remainingText.includes(cat)) {
                if (cat === 'alimentari') category = 'Alimentari';
                else if (cat === 'trasporti') category = 'Trasporti';
                else if (cat === 'svago') category = 'Svago';
                else if (cat === 'salute') category = 'Salute';
                else if (cat === 'abbigliamento') category = 'Abbigliamento';
                
                remainingText = remainingText.replace(cat, '').trim();
                break;
            }
        }
        
        name = remainingText || (this.app.data.language === 'it' ? 'Spesa vocale' : 'Voice expense');
        
        const expenseName = document.getElementById('expenseName');
        const expenseAmount = document.getElementById('expenseAmount');
        const expenseCategory = document.getElementById('expenseCategory');
        
        if (expenseName) expenseName.value = name;
        if (expenseAmount) expenseAmount.value = amount;
        if (expenseCategory) expenseCategory.value = category;
        
        this.highlightFields();
        
        setTimeout(() => {
            if (confirm(`✅ ${this.app.data.language === 'it' ? 'Aggiungere' : 'Add'} "${name}" ${this.app.data.language === 'it' ? 'da' : 'for'} €${amount} ${this.app.data.language === 'it' ? 'in categoria' : 'in category'} ${category}?`)) {
                const addExpenseBtn = document.getElementById('addExpenseBtn');
                if (addExpenseBtn) addExpenseBtn.click();
                this.updateUI('success', `✓ ${this.app.data.language === 'it' ? 'Aggiunto' : 'Added'}: ${name} ${amount}€`);
            } else {
                this.updateUI('idle', this.app.t('statusEditBeforeAdd'));
            }
        }, 500);
    }

    highlightFields() {
        const fields = ['expenseName', 'expenseAmount', 'expenseCategory'];
        fields.forEach(id => {
            const field = document.getElementById(id);
            if (!field) return;
            
            field.style.transition = 'all 0.3s';
            field.style.backgroundColor = '#d4edda';
            field.style.borderColor = '#28a745';
            setTimeout(() => {
                field.style.backgroundColor = '';
                field.style.borderColor = '';
            }, 1000);
        });
    }

    addVoiceSuggestions() {
        const voiceRow = document.querySelector('.voice-row');
        if (!voiceRow) return;
        
        if (document.querySelector('.voice-suggestions')) return;
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'voice-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="voice-suggestions-title">💡 ${this.app.data.language === 'it' ? 'Prova a dire' : 'Try saying'}:</div>
            <div class="voice-suggestion-chips">
                <span class="voice-chip" data-voice="caffè 1.50">☕ caffè 1.50</span>
                <span class="voice-chip" data-voice="pranzo 12.50 alimentari">🍝 pranzo 12.50</span>
                <span class="voice-chip" data-voice="benzina 40 euro trasporti">⛽ benzina 40€</span>
                <span class="voice-chip" data-voice="cinema 15 euro svago">🎬 cinema 15€</span>
            </div>
        `;
        
        voiceRow.parentNode.insertBefore(suggestionsDiv, voiceRow.nextSibling);
        
        document.querySelectorAll('.voice-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const voiceText = chip.dataset.voice;
                const voiceStatus = document.getElementById('voiceStatus');
                if (voiceStatus) {
                    voiceStatus.textContent = `🔊 ${this.app.data.language === 'it' ? 'Simulo' : 'Simulating'}: "${voiceText}"`;
                }
                this.processCommand(voiceText);
            });
        });
    }
}

// ============================================
// AVVIO
// ============================================
let app, assistant, voiceAssistant;

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM caricato, avvio app...');
    
    app = new BudgetWise();
    assistant = new FinancialAssistant(app);
    voiceAssistant = new VoiceAssistant(app);
    
    window.app = app;
    window.assistant = assistant;
    window.voiceAssistant = voiceAssistant;
    
    console.log('✅ App inizializzata');
});
