// ============================================
// BUDGETWISE 2.0 - APP COMPLETA CON TRADUZIONI
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
        const lang = this.data.language || 'it';
        const langData = translations[lang] || translations.it;
        let text = langData[key] || key;
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(new RegExp(`{${param}}`, 'g'), value);
        }
        return text;
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
        document.getElementById('themeToggle')?.addEventListener('click', () => this.toggleTheme());
        document.getElementById('saveIncomeBtn')?.addEventListener('click', () => this.saveIncome());
        document.getElementById('addFixedBtn')?.addEventListener('click', () => this.addFixedExpense());
        document.getElementById('addExpenseBtn')?.addEventListener('click', () => this.addVariableExpense());
        document.getElementById('resetDayBtn')?.addEventListener('click', () => this.resetDay());
        document.getElementById('applySaveBtn')?.addEventListener('click', () => this.applySavings());
        document.getElementById('backupBtn')?.addEventListener('click', () => this.backupData());
        document.getElementById('restoreBtn')?.addEventListener('click', () => document.getElementById('restoreFile')?.click());
        document.getElementById('restoreFile')?.addEventListener('change', (e) => this.restoreData(e));
        document.getElementById('resetAllBtn')?.addEventListener('click', () => this.resetAll());
        document.getElementById('exportCalendarBtn')?.addEventListener('click', () => this.exportToCalendar());
        document.getElementById('expenseDate').valueAsDate = new Date();

        document.getElementById('thresholdInput')?.addEventListener('change', (e) => {
            this.data.threshold = parseFloat(e.target.value) || 50;
            this.saveData();
        });

        document.getElementById('languageSelect')?.addEventListener('change', (e) => {
            this.data.language = e.target.value;
            this.saveData();
            this.updateUI();
            this.updateChart();
        });

        document.getElementById('savePercent')?.addEventListener('input', (e) => {
            this.data.savingsPercent = parseFloat(e.target.value) || 0;
            this.saveData();
        });

        document.getElementById('saveGoal')?.addEventListener('input', (e) => {
            this.data.savingsGoal = parseFloat(e.target.value) || 0;
            this.saveData();
        });
    }

    saveIncome() {
        const income = parseFloat(document.getElementById('incomeInput')?.value) || 0;
        this.data.income = income;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastIncomeSaved'));
    }

    addFixedExpense() {
        const name = document.getElementById('fixedName')?.value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount')?.value);
        const day = parseInt(document.getElementById('fixedDay')?.value);
        const endDate = document.getElementById('fixedEndDate')?.value;
        if (!name || !amount || !day || !endDate) {
            this.showToast(this.t('toastFillAllFields'), 'error');
            return;
        }
        if (day < 1 || day > 31) {
            this.showToast(this.t('toastInvalidDay'), 'error');
            return;
        }
        this.data.fixedExpenses.push({ name, amount, day, endDate, id: Date.now() });
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastFixedAdded'));
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    addVariableExpense() {
        const date = document.getElementById('expenseDate')?.value;
        const name = document.getElementById('expenseName')?.value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount')?.value);
        const category = document.getElementById('expenseCategory')?.value;
        if (!name || !amount) {
            this.showToast(this.t('toastFillAllFields'), 'error');
            return;
        }
        if (!this.data.variableExpenses[date]) this.data.variableExpenses[date] = [];
        this.data.variableExpenses[date].push({ name, amount, category, id: Date.now() });
        this.saveData();
        this.updateUI();
        this.updateChart();
        this.showToast(this.t('toastExpenseAdded'));
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        this.checkThreshold(date);
    }

    resetDay() {
        const date = document.getElementById('expenseDate')?.value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastDayReset'));
        }
    }

    applySavings() {
        const percent = parseFloat(document.getElementById('savePercent')?.value) || 0;
        const goal = parseFloat(document.getElementById('saveGoal')?.value) || 0;
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastSavingsApplied'));
    }

    calculateTotalVariableExpenses() {
        let total = 0;
        Object.values(this.data.variableExpenses || {}).forEach(day => (day || []).forEach(exp => total += exp.amount || 0));
        return total;
    }

    calculateTotalFixedExpenses() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        return (this.data.fixedExpenses || []).reduce((sum, exp) => {
            if (new Date(exp.endDate) < today) return sum;
            if (new Date(currentYear, currentMonth, exp.day) > today) return sum;
            return sum + (exp.amount || 0);
        }, 0);
    }

    calculateBudget() {
        return this.data.income - this.calculateTotalFixedExpenses() - (this.data.income * this.data.savingsPercent) / 100;
    }

    calculateRemaining() {
        return this.calculateBudget() - this.calculateTotalVariableExpenses();
    }

    calculateDailyBudget() {
        const daysLeft = this.getDaysLeft();
        return daysLeft > 0 ? this.calculateRemaining() / daysLeft : 0;
    }

    getDaysLeft() {
        const diff = new Date(this.data.periodEnd) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    calculateSavingsProgress() {
        if (!this.data.savingsGoal) return 0;
        return ((this.data.income * this.data.savingsPercent) / 100 / this.data.savingsGoal) * 100;
    }

    getNextPaymentDate(day) {
        const today = new Date();
        let next = new Date(today.getFullYear(), today.getMonth(), day);
        if (next < today) next = new Date(today.getFullYear(), today.getMonth() + 1, day);
        return next.toISOString().split('T')[0];
    }

    updateUI() {
        // TITOLI
        document.getElementById('appTitle').innerHTML = `${this.t('appTitle')} <span class="version">${this.t('version')}</span>`;
        document.getElementById('appSubtitle').textContent = this.t('appSubtitle');
        document.getElementById('badgeNew').textContent = this.t('badgeNew');

        // RIEPILOGO
        document.getElementById('labelDailyBudget').textContent = this.t('dailyBudget');
        document.getElementById('labelRemaining').textContent = this.t('remaining');
        document.getElementById('labelDaysLeft').textContent = this.t('daysLeft');
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();
        document.getElementById('periodInfo').textContent = this.t('periodInfo', { start: this.data.periodStart, end: this.data.periodEnd });

        // SEZIONI
        document.getElementById('sectionIncome').textContent = this.t('incomeSection');
        document.getElementById('sectionFixedExpenses').textContent = this.t('fixedExpensesSection');
        document.getElementById('sectionVariableExpenses').textContent = this.t('variableExpensesSection');
        document.getElementById('sectionChart').textContent = this.t('chartSection');
        document.getElementById('sectionAssistant').textContent = this.t('assistantSection');
        document.getElementById('sectionSavings').textContent = this.t('savingsSection');
        document.getElementById('sectionSettings').textContent = this.t('settingsSection');

        // LABEL
        document.getElementById('labelTotalIncome').textContent = this.t('labelTotalIncome');
        document.getElementById('labelDayOfMonth').textContent = this.t('labelDayOfMonth');
        document.getElementById('labelEndDate').textContent = this.t('labelEndDate');
        document.getElementById('labelSelectDate').textContent = this.t('labelSelectDate');
        document.getElementById('labelThreshold').textContent = this.t('labelThreshold');
        document.getElementById('labelLanguage').textContent = this.t('labelLanguage');
        document.getElementById('labelBackup').textContent = this.t('labelBackup');
        document.getElementById('labelSavingsPercent').textContent = this.t('labelSavingsPercent');
        document.getElementById('labelSavingsGoal').textContent = this.t('labelSavingsGoal');

        // PLACEHOLDER
        document.getElementById('incomeInput').placeholder = this.t('placeholderAmount');
        document.getElementById('fixedName').placeholder = this.t('placeholderName');
        document.getElementById('fixedAmount').placeholder = this.t('placeholderAmount');
        document.getElementById('fixedDay').placeholder = this.t('placeholderDay');
        document.getElementById('expenseName').placeholder = this.t('placeholderWhatBought');
        document.getElementById('expenseAmount').placeholder = this.t('placeholderAmount');
        document.getElementById('chatInput').placeholder = this.t('placeholderAskAssistant');

        // HELP TEXT
        document.getElementById('fixedHelpText').textContent = this.t('fixedHelpText');

        // BOTTONI
        document.getElementById('saveIncomeBtn').textContent = this.t('btnSaveIncome');
        document.getElementById('addFixedBtn').textContent = this.t('btnAddFixedExpense');
        document.getElementById('addExpenseBtn').textContent = this.t('btnAddExpense');
        document.getElementById('resetDayBtn').textContent = this.t('btnResetDay');
        document.getElementById('applySaveBtn').textContent = this.t('btnApplySavings');
        document.getElementById('backupBtn').textContent = this.t('btnDownloadBackup');
        document.getElementById('restoreBtn').textContent = this.t('btnRestoreBackup');
        document.getElementById('resetAllBtn').textContent = this.t('btnResetAll');
        document.getElementById('exportCalendarBtn').textContent = this.t('btnExportCalendar');
        document.getElementById('sendChatBtn').textContent = this.t('btnSend');
        document.getElementById('voiceBtnText').textContent = this.t('btnVoice');

        // CATEGORIE
        const cat = document.getElementById('expenseCategory');
        if (cat) {
            cat.options[0].text = this.t('categoryGrocery');
            cat.options[1].text = this.t('categoryTransport');
            cat.options[2].text = this.t('categoryEntertainment');
            cat.options[3].text = this.t('categoryHealth');
            cat.options[4].text = this.t('categoryClothing');
            cat.options[5].text = this.t('categoryOther');
        }

        // FOOTER
        document.getElementById('footerText').textContent = this.t('footerText');
        document.getElementById('footerFeatures').textContent = this.t('footerFeatures');

        // SUGGERIMENTI ASSISTENTE
        document.getElementById('suggestion1').textContent = this.t('suggestionSave100');
        document.getElementById('suggestion2').textContent = this.t('suggestionSimulate');
        document.getElementById('suggestion3').textContent = this.t('suggestionGoal');
        document.getElementById('suggestion4').textContent = this.t('suggestionTopCategory');

        // MESSAGGIO BENVENUTO ASSISTENTE
        document.getElementById('assistantWelcomeMessage').textContent = this.t('assistantWelcome');

        // LISTE
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();

        // INPUT VALORI
        document.getElementById('savePercent').value = this.data.savingsPercent;
        document.getElementById('saveGoal').value = this.data.savingsGoal;
        document.getElementById('thresholdInput').value = this.data.threshold;
        document.getElementById('languageSelect').value = this.data.language;

        // PROGRESS
        const progress = this.calculateSavingsProgress();
        const pc = document.getElementById('progressContainer');
        const pb = document.getElementById('progressBar');
        if (progress > 0 && this.data.savingsGoal) {
            pc.style.display = 'block';
            pb.style.width = progress + '%';
            pb.textContent = Math.round(progress) + '%';
        } else {
            pc.style.display = 'none';
        }

        this.showGuideMessage();
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (!container) return;
        if (!this.data.fixedExpenses?.length) {
            container.innerHTML = `<p class="chart-note">${this.t('noFixedExpenses')}</p>`;
            return;
        }
        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const active = new Date(exp.endDate) >= new Date();
            const status = active ? this.t('statusActive') : this.t('statusExpired');
            return `<div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${exp.name}</span>
                    <span class="fixed-expense-detail">${this.t('fixedExpenseDetail', { day: exp.day, endDate: exp.endDate, status })}</span>
                </div>
                <span class="expense-amount">${this.formatCurrency(exp.amount)}</span>
                <div class="expense-actions"><button onclick="app.deleteFixedExpense(${exp.id})">🗑️</button></div>
            </div>`;
        }).join('');
    }

    updateVariableExpensesList() {
        const date = document.getElementById('expenseDate')?.value;
        const container = document.getElementById('variableExpensesList');
        if (!container) return;
        const expenses = this.data.variableExpenses?.[date] || [];
        if (!expenses.length) {
            container.innerHTML = `<p class="chart-note">${this.t('noVariableExpenses')}</p>`;
            return;
        }
        container.innerHTML = expenses.map(exp => {
            let catKey = 'categoryOther';
            if (exp.category === 'Alimentari') catKey = 'categoryGrocery';
            else if (exp.category === 'Trasporti') catKey = 'categoryTransport';
            else if (exp.category === 'Svago') catKey = 'categoryEntertainment';
            else if (exp.category === 'Salute') catKey = 'categoryHealth';
            else if (exp.category === 'Abbigliamento') catKey = 'categoryClothing';
            return `<div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${exp.name}</span>
                    <span class="expense-category">${this.t(catKey)}</span>
                </div>
                <span class="expense-amount">${this.formatCurrency(exp.amount)}</span>
                <div class="expense-actions"><button onclick="app.deleteVariableExpense('${date}', ${exp.id})">🗑️</button></div>
            </div>`;
        }).join('');
    }

    updateChart() {
        const cat = {};
        Object.values(this.data.variableExpenses || {}).forEach(d => (d || []).forEach(e => cat[e.category] = (cat[e.category] || 0) + (e.amount || 0)));
        const chartNote = document.getElementById('chartNote');
        if (!Object.keys(cat).length) {
            chartNote.style.display = 'block';
            chartNote.textContent = this.t('noChartData');
            if (this.chart) this.chart.destroy();
            return;
        }
        chartNote.style.display = 'none';
        if (this.chart) this.chart.destroy();
        const labels = Object.keys(cat).map(c => {
            if (c === 'Alimentari') return this.t('categoryGrocery');
            if (c === 'Trasporti') return this.t('categoryTransport');
            if (c === 'Svago') return this.t('categoryEntertainment');
            if (c === 'Salute') return this.t('categoryHealth');
            if (c === 'Abbigliamento') return this.t('categoryClothing');
            return this.t('categoryOther');
        });
        const ctx = document.getElementById('expenseChart')?.getContext('2d');
        if (!ctx) return;
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: { labels, datasets: [{ data: Object.values(cat), backgroundColor: ['#4361ee','#4895ef','#2dc653','#ff9e00','#ef233c','#7209b7'] }] },
            options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
        });
    }

    formatCurrency(amount) {
        return (amount || 0).toFixed(2).replace('.', ',') + ' €';
    }

    showToast(msg, type = 'success') {
        const t = document.getElementById('toast');
        if (!t) return;
        t.textContent = msg;
        t.style.background = type === 'success' ? '#2dc653' : '#ef233c';
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 3000);
    }

    showGuideMessage() {
        const g = document.getElementById('guideMessage');
        if (!g) return;
        if (this.data.income === 0) {
            g.style.display = 'block';
            g.textContent = this.t('guideMessage');
        } else {
            g.style.display = 'none';
        }
    }

    checkThreshold(date) {
        if (date !== new Date().toISOString().split('T')[0]) return;
        if (this.calculateTotalVariableExpenses() > this.data.threshold) {
            this.showToast(this.t('toastThresholdExceeded', { amount: this.formatCurrency(this.data.threshold) }), 'error');
        }
    }

    toggleTheme() {
        const html = document.documentElement;
        const btn = document.getElementById('themeToggle');
        if (html.getAttribute('data-theme') === 'dark') {
            html.removeAttribute('data-theme');
            btn.textContent = '🌙';
        } else {
            html.setAttribute('data-theme', 'dark');
            btn.textContent = '☀️';
        }
        this.saveTheme();
    }

    applyTheme() {
        if (localStorage.getItem('budgetwise-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    saveTheme() {
        localStorage.setItem('budgetwise-theme', document.documentElement.getAttribute('data-theme') || 'light');
    }

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) this.data = JSON.parse(saved);
    }

    backupData() {
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.data));
        link.download = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        this.showToast(this.t('toastBackupDownloaded'));
    }

    restoreData(e) {
        const file = e.target.files[0];
        if (!file) return;
        new FileReader().onload = (e) => {
            try {
                this.data = JSON.parse(e.target.result);
                this.saveData();
                this.updateUI();
                this.updateChart();
                this.showToast(this.t('toastDataRestored'));
            } catch {
                this.showToast(this.t('toastInvalidFile'), 'error');
            }
        }.bind(this).readAsText(file);
    }

    resetAll() {
        if (confirm(this.data.language === 'it' ? 'Sei sicuro di voler cancellare TUTTI i dati?' : 'Are you sure you want to delete ALL data?')) {
            localStorage.clear();
            this.data = {
                income: 0, fixedExpenses: [], variableExpenses: {}, savingsPercent: 0, savingsGoal: 0,
                threshold: 50, language: this.data.language,
                periodStart: this.getDefaultPeriodStart(), periodEnd: this.getDefaultPeriodEnd()
            };
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastResetCompleted'));
        }
    }

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(e => e.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastExpenseDeleted'));
    }

    deleteVariableExpense(date, id) {
        if (this.data.variableExpenses[date]) {
            this.data.variableExpenses[date] = this.data.variableExpenses[date].filter(e => e.id !== id);
            if (!this.data.variableExpenses[date].length) delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastExpenseDeleted'));
        }
    }

    exportToCalendar() {
        let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        (this.data.fixedExpenses || []).forEach(e => {
            if (new Date(e.endDate) >= new Date()) {
                ics += "BEGIN:VEVENT\n";
                ics += `SUMMARY:💰 ${e.name}\n`;
                ics += `DESCRIPTION:${this.data.language === 'it' ? 'Spesa fissa di' : 'Fixed expense of'} ${this.formatCurrency(e.amount)} - ${this.data.language === 'it' ? 'Ogni giorno' : 'Every day'} ${e.day}\n`;
                ics += `DTSTART;VALUE=DATE:${this.getNextPaymentDate(e.day).replace(/-/g, '')}\n`;
                ics += `RRULE:FREQ=MONTHLY;UNTIL=${e.endDate.replace(/-/g, '')}\nEND:VEVENT\n`;
            }
        });
        Object.entries(this.data.variableExpenses || {}).forEach(([d, ex]) => ex.forEach(e => {
            ics += `BEGIN:VEVENT\nSUMMARY:🛒 ${e.name}\nDESCRIPTION:${e.category} - ${this.formatCurrency(e.amount)}\nDTSTART;VALUE=DATE:${d.replace(/-/g, '')}\nDTEND;VALUE=DATE:${d.replace(/-/g, '')}\nEND:VEVENT\n`;
        }));
        ics += "END:VCALENDAR";
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
        a.download = `budgetwise-${this.data.periodStart}.ics`;
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
        document.getElementById('sendChatBtn')?.addEventListener('click', () => this.handleUserInput());
        document.getElementById('chatInput')?.addEventListener('keypress', (e) => e.key === 'Enter' && this.handleUserInput());
        document.querySelectorAll('.suggestion-chip').forEach(c => c.addEventListener('click', () => {
            document.getElementById('chatInput').value = c.dataset.question;
            this.handleUserInput();
        }));
    }

    handleUserInput() {
        const input = document.getElementById('chatInput');
        if (!input?.value.trim()) return;
        this.addMessage(input.value.trim(), 'user');
        const q = input.value.trim().toLowerCase();
        input.value = '';
        setTimeout(() => this.addMessage(this.generateAnswer(q), 'bot'), 500);
    }

    addMessage(text, sender) {
        const container = document.getElementById('chatMessages');
        if (!container) return;
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = `<span class="message-sender">${sender === 'bot' ? (this.app.data.language === 'it' ? '🤖 Assistente' : '🤖 Assistant') : '👤 Tu'}:</span><span class="message-text">${text}</span>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    generateAnswer(q) {
        const d = this.app.data;
        const r = this.app.calculateRemaining();
        const db = this.app.calculateDailyBudget();
        const ts = this.app.calculateTotalVariableExpenses();
        const dl = this.app.getDaysLeft();
        const lang = this.app.data.language;

        if (q.match(/risparmi|save|saving/)) {
            const m = q.match(/(\d+)/);
            if (m) {
                const t = parseInt(m[0]);
                if (db * dl >= t) return `✅ ${lang === 'it' ? 'Sì! Puoi risparmiare' : 'Yes! You can save'} ${t}€ ${lang === 'it' ? 'entro fine mese. Ti basterebbe risparmiare' : 'by month end. You would need to save'} ${(t/dl).toFixed(2)}€/day. ${lang === 'it' ? 'Budget giornaliero' : 'Daily budget'}: ${this.app.formatCurrency(db)}.`;
                return `⚠️ ${lang === 'it' ? 'Con budget' : 'With budget'} ${this.app.formatCurrency(db)}/day, in ${dl} ${lang === 'it' ? 'giorni avrai' : 'days you\'ll have'} ${this.app.formatCurrency(db*dl)}. ${lang === 'it' ? 'Per risparmiare' : 'To save'} ${t}€, ${lang === 'it' ? 'riduci spese di' : 'reduce by'} ${((t - db*dl)/dl).toFixed(2)}€/day.`;
            }
            return ts > d.threshold ? `⚠️ ${lang === 'it' ? 'Hai superato soglia' : 'You exceeded threshold'} ${this.app.formatCurrency(d.threshold)}. ${lang === 'it' ? 'Budget giornaliero' : 'Daily budget'}: ${this.app.formatCurrency(db)}.` : `📊 ${lang === 'it' ? 'Speso' : 'Spent'}: ${this.app.formatCurrency(ts)}. ${lang === 'it' ? 'Rimangono' : 'Remaining'}: ${this.app.formatCurrency(r)}.`;
        }
        if (q.match(/simul|what if/)) {
            const m = q.match(/(\d+)/);
            if (m) {
                const p = parseInt(m[0]);
                if (q.includes('aument') || q.includes('+') || q.includes('increase')) {
                    const nd = db * (1 + p/100);
                    return `🔮 ${lang === 'it' ? 'Aumento' : 'Increase'} ${p}%: ${lang === 'it' ? 'nuovo budget' : 'new budget'} ${this.app.formatCurrency(nd)}/day. ${lang === 'it' ? 'Fine periodo' : 'Period end'}: ${this.app.formatCurrency(r - (nd-db)*dl)}.`;
                }
                if (q.includes('riduc') || q.includes('-') || q.includes('reduce')) {
                    const nd = db * (1 - p/100);
                    return `💡 ${lang === 'it' ? 'Riduzione' : 'Reduction'} ${p}%: ${lang === 'it' ? 'risparmi' : 'save'} ${this.app.formatCurrency((db-nd)*dl)}. ${lang === 'it' ? 'Nuovo budget' : 'New budget'}: ${this.app.formatCurrency(nd)}/day.`;
                }
            }
            return lang === 'it' ? 'Esempio: "cosa succede se aumento spese del 20%?"' : 'Example: "what if I increase expenses by 20%?"';
        }
        if (q.match(/obiettivo|goal|quando raggiunger|when will/)) {
            if (!d.savingsGoal || !d.savingsPercent) return lang === 'it' ? 'Imposta prima un obiettivo nella sezione 🎯' : 'Set a goal first in the 🎯 section';
            const months = Math.ceil(d.savingsGoal / ((d.income * d.savingsPercent)/100));
            return months < 12 ? `🎯 ${lang === 'it' ? 'Obiettivo in' : 'Goal in'} ${months} ${lang === 'it' ? 'mesi' : 'months'}` : `🎯 ${Math.floor(months/12)}y ${months%12}m`;
        }
        if (q.match(/categoria|category|spendo di più|spend most/)) {
            const cats = {};
            Object.values(d.variableExpenses || {}).forEach(day => (day || []).forEach(e => cats[e.category] = (cats[e.category]||0)+e.amount));
            if (!Object.keys(cats).length) return lang === 'it' ? 'Nessuna spesa registrata' : 'No expenses recorded';
            const top = Object.entries(cats).sort((a,b)=>b[1]-a[1])[0];
            let cat = top[0];
            if (cat === 'Alimentari') cat = this.app.t('categoryGrocery');
            else if (cat === 'Trasporti') cat = this.app.t('categoryTransport');
            else if (cat === 'Svago') cat = this.app.t('categoryEntertainment');
            else if (cat === 'Salute') cat = this.app.t('categoryHealth');
            else if (cat === 'Abbigliamento') cat = this.app.t('categoryClothing');
            else cat = this.app.t('categoryOther');
            return `📊 ${cat}: ${this.app.formatCurrency(top[1])}`;
        }
        if (q.includes('quanto ho speso') || q.includes('how much')) {
            return `📊 ${lang === 'it' ? 'Totale speso' : 'Total spent'}: ${this.app.formatCurrency(ts)}`;
        }
        return r < 0 ? `⚠️ ${lang === 'it' ? 'Sei in rosso!' : 'You\'re in the red!'}` : r < db*7 ? `⚠️ ${lang === 'it' ? 'Attenzione: rimangono' : 'Warning: only'} ${this.app.formatCurrency(r)}` : `💪 ${lang === 'it' ? 'Vai bene! Margine' : 'Doing well! Margin'}: ${this.app.formatCurrency(r)}`;
    }
}

// ============================================
// ASSISTENTE VOCALE
// ============================================
class VoiceAssistant {
    constructor(app) {
        this.app = app;
        this.isListening = false;
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            document.getElementById('voiceBtn').disabled = true;
            document.getElementById('voiceBtn').innerHTML = '🎤 ' + (app.data.language === 'it' ? 'Non supportato' : 'Not supported');
            return;
        }
        const rec = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new rec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'it-IT';
        this.setupListeners();
        this.addVoiceSuggestions();
    }

    setupListeners() {
        document.getElementById('voiceBtn')?.addEventListener('click', () => this.toggleListening());
        this.recognition.onstart = () => {
            this.isListening = true;
            this.updateUI('listening', this.app.t('statusListening'));
        };
        this.recognition.onresult = (e) => {
            const r = e.results[e.results.length-1];
            if (r.isFinal) {
                this.processCommand(r[0].transcript.trim().toLowerCase());
                this.updateUI('success', this.app.t('statusRecognized', { text: r[0].transcript }));
            } else {
                this.updateUI('listening', this.app.t('statusHeard', { text: r[0].transcript }));
            }
        };
        this.recognition.onerror = (e) => {
            let key = 'statusError';
            if (e.error === 'not-allowed') key = 'statusMicrophoneDenied';
            else if (e.error === 'no-speech') key = 'statusNoSpeech';
            else if (e.error === 'network') key = 'statusNetworkError';
            this.updateUI('error', this.app.t(key));
            this.isListening = false;
        };
        this.recognition.onend = () => {
            if (this.isListening) setTimeout(() => this.recognition.start(), 100);
            else this.updateUI('idle', this.app.t('statusTapToSpeak'));
        };
    }

    toggleListening() {
        this.isListening ? (this.isListening = false, this.recognition.stop()) : this.recognition.start();
    }

    updateUI(state, msg) {
        const btn = document.getElementById('voiceBtn');
        const status = document.getElementById('voiceStatus');
        const span = document.getElementById('voiceBtnText');
        if (!btn || !status) return;
        btn.classList.remove('listening', 'success', 'error');
        if (state === 'listening') {
            btn.classList.add('listening');
            span.textContent = this.app.t('stopListening');
        } else {
            span.textContent = this.app.t('btnVoice');
            if (state === 'success') btn.classList.add('success');
            else if (state === 'error') btn.classList.add('error');
        }
        status.textContent = msg;
        if (state !== 'listening') setTimeout(() => !this.isListening && (status.textContent = this.app.t('statusTapToSpeak')), 3000);
    }

    processCommand(t) {
        const amountMatch = t.match(/(\d+[.,]?\d*)/);
        if (!amountMatch) return this.updateUI('error', '❌ ' + (this.app.data.language === 'it' ? 'Importo non riconosciuto' : 'Amount not recognized'));
        const amount = parseFloat(amountMatch[1].replace(',', '.'));
        let remaining = t.replace(amountMatch[1], '').replace(/euro?|€/gi, '').trim();
        let category = 'Altro';
        const cats = ['alimentari','trasporti','svago','salute','abbigliamento','altro'];
        for (let c of cats) {
            if (remaining.includes(c)) {
                if (c === 'alimentari') category = 'Alimentari';
                else if (c === 'trasporti') category = 'Trasporti';
                else if (c === 'svago') category = 'Svago';
                else if (c === 'salute') category = 'Salute';
                else if (c === 'abbigliamento') category = 'Abbigliamento';
                remaining = remaining.replace(c, '').trim();
                break;
            }
        }
        const name = remaining || (this.app.data.language === 'it' ? 'Spesa vocale' : 'Voice expense');
        document.getElementById('expenseName').value = name;
        document.getElementById('expenseAmount').value = amount;
        document.getElementById('expenseCategory').value = category;
        this.highlightFields();
        setTimeout(() => {
            if (confirm(`✅ ${this.app.data.language === 'it' ? 'Aggiungere' : 'Add'} "${name}" ${amount}€?`)) {
                document.getElementById('addExpenseBtn')?.click();
                this.updateUI('success', `✓ ${this.app.data.language === 'it' ? 'Aggiunto' : 'Added'}: ${name} ${amount}€`);
            } else {
                this.updateUI('idle', this.app.t('statusEditBeforeAdd'));
            }
        }, 500);
    }

    highlightFields() {
        ['expenseName','expenseAmount','expenseCategory'].forEach(id => {
            const f = document.getElementById(id);
            if (!f) return;
            f.style.transition = 'all 0.3s';
            f.style.backgroundColor = '#d4edda';
            f.style.borderColor = '#28a745';
            setTimeout(() => f.style.backgroundColor = f.style.borderColor = '', 1000);
        });
    }

    addVoiceSuggestions() {
        if (document.querySelector('.voice-suggestions') || !document.querySelector('.voice-row')) return;
        const div = document.createElement('div');
        div.className = 'voice-suggestions';
        div.innerHTML = `<div class="voice-suggestions-title">💡 ${this.app.data.language === 'it' ? 'Prova a dire' : 'Try saying'}:</div>
            <div class="voice-suggestion-chips">
                <span class="voice-chip" data-voice="caffè 1.50">☕ caffè 1.50</span>
                <span class="voice-chip" data-voice="pranzo 12.50 alimentari">🍝 pranzo 12.50</span>
                <span class="voice-chip" data-voice="benzina 40 euro trasporti">⛽ benzina 40€</span>
                <span class="voice-chip" data-voice="cinema 15 euro svago">🎬 cinema 15€</span>
            </div>`;
        document.querySelector('.voice-row').parentNode.insertBefore(div, document.querySelector('.voice-row').nextSibling);
        document.querySelectorAll('.voice-chip').forEach(c => c.addEventListener('click', () => {
            document.getElementById('voiceStatus').textContent = `🔊 ${this.app.data.language === 'it' ? 'Simulo' : 'Simulating'}: "${c.dataset.voice}"`;
            this.processCommand(c.dataset.voice);
        }));
    }
}

// ============================================
// AVVIO
// ============================================
let app, assistant, voiceAssistant;
document.addEventListener('DOMContentLoaded', () => {
    app = new BudgetWise();
    assistant = new FinancialAssistant(app);
    voiceAssistant = new VoiceAssistant(app);
    window.app = app;
});
