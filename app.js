// ============================================
// BUDGETWISE 2.0 - APP COMPLETA CON ASSISTENTE E VOCE
// ============================================

// ---- SISTEMA DI TRADUZIONE ----
const translations = {
    it: {
        // Generali
        appTitle: '💰 BudgetWise',
        appSubtitle: 'Stipendio a stipendio — gestione intelligente con AI',
        version: '2.0',
        periodInfo: '📅 Periodo: {start} → {end}',

        // Riepilogo
        dailyBudget: 'Budget giornaliero',
        remaining: 'Rimanenza',
        daysLeft: 'Giorni rimasti',

        // Sezioni
        incomeSection: '🏦 Entrate del periodo',
        fixedExpensesSection: '📌 Spese fisse mensili',
        variableExpensesSection: '🧾 Spese variabili',
        chartSection: '📊 Distribuzione spese',
        assistantSection: '🤖 Assistente Finanziario AI',
        savingsSection: '🎯 Obiettivo risparmio',
        settingsSection: '⚙️ Impostazioni',

        // Guide e Messaggi
        guideMessage: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
        noFixedExpenses: 'Nessuna spesa fissa',
        noVariableExpenses: 'Nessuna spesa in questo giorno',
        noChartData: 'Aggiungi spese per vedere il grafico',
        fixedExpenseDetail: '📅 Giorno {day} di ogni mese · Scadenza: {endDate} {status}',
        statusActive: '🟢 Attivo',
        statusExpired: '🔴 Scaduto',

        // Etichette Form
        labelTotalIncome: 'Totale entrate (€)',
        labelName: 'Nome (es. Mutuo)',
        labelAmount: 'Importo €',
        labelDayOfMonth: 'Giorno del mese',
        labelEndDate: 'Data scadenza (fine)',
        labelSelectDate: 'Seleziona data:',
        labelWhatBought: 'Cosa hai comprato?',
        labelCategory: 'Categoria',
        labelThreshold: '🔔 Soglia avviso (€)',
        labelLanguage: '🌍 Lingua',
        labelBackup: '📅 Backup dati',
        labelSavingsPercent: 'Percentuale su entrate (%)',
        labelSavingsGoal: 'Obiettivo (€)',

        // Placeholder
        placeholderName: 'es. Mutuo',
        placeholderAmount: '0,00',
        placeholderDay: 'es. 27',
        placeholderWhatBought: 'Caffè...',
        placeholderAskAssistant: 'Es. Quanto posso risparmiare questo mese?',

        // Bottoni
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

        // Categorie
        categoryGrocery: '🍎 Alimentari',
        categoryTransport: '🚗 Trasporti',
        categoryEntertainment: '🎮 Svago',
        categoryHealth: '💊 Salute',
        categoryClothing: '👕 Abbigliamento',
        categoryOther: '📦 Altro',

        // Assistente - Messaggi
        assistantWelcome: 'Ciao! Sono il tuo assistente finanziario. Chiedimi qualsiasi cosa sul tuo budget o chiedimi di simulare scenari futuri!',
        suggestionSave100: '💶 Risparmia 100€',
        suggestionSimulate: '🔮 Simula aumento',
        suggestionGoal: '🎯 Obiettivo',
        suggestionTopCategory: '📊 Top categoria',

        // Stati e messaggi vari
        statusListening: '🎤 Parlare...',
        statusTapToSpeak: '🎤 Tocca per parlare',
        statusHeard: '🔊 Sento: {text}...',
        statusRecognized: '✓ Riconosciuto: "{text}"',
        statusError: '❌ Errore',
        statusMicrophoneDenied: '❌ Permesso microfono negato',
        statusNoSpeech: '❌ Nessun parlato rilevato',
        statusNetworkError: '❌ Errore di rete',
        statusEditBeforeAdd: '✏️ Puoi modificare prima di aggiungere',

        // Toast
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
    },
    en: {
        // General
        appTitle: '💰 BudgetWise',
        appSubtitle: 'Paycheck to paycheck — smart management with AI',
        version: '2.0',
        periodInfo: '📅 Period: {start} → {end}',

        // Summary
        dailyBudget: 'Daily budget',
        remaining: 'Remaining',
        daysLeft: 'Days left',

        // Sections
        incomeSection: '🏦 Period Income',
        fixedExpensesSection: '📌 Monthly Fixed Expenses',
        variableExpensesSection: '🧾 Variable Expenses',
        chartSection: '📊 Expense Distribution',
        assistantSection: '🤖 AI Financial Assistant',
        savingsSection: '🎯 Savings Goal',
        settingsSection: '⚙️ Settings',

        // Guides & Messages
        guideMessage: '👋 Start by entering your income in the section below!',
        noFixedExpenses: 'No fixed expenses',
        noVariableExpenses: 'No expenses on this day',
        noChartData: 'Add expenses to see the chart',
        fixedExpenseDetail: '📅 Day {day} of each month · Expires: {endDate} {status}',
        statusActive: '🟢 Active',
        statusExpired: '🔴 Expired',

        // Form Labels
        labelTotalIncome: 'Total income (€)',
        labelName: 'Name (e.g., Mortgage)',
        labelAmount: 'Amount €',
        labelDayOfMonth: 'Day of month',
        labelEndDate: 'End date',
        labelSelectDate: 'Select date:',
        labelWhatBought: 'What did you buy?',
        labelCategory: 'Category',
        labelThreshold: '🔔 Alert threshold (€)',
        labelLanguage: '🌍 Language',
        labelBackup: '📅 Data backup',
        labelSavingsPercent: 'Percentage of income (%)',
        labelSavingsGoal: 'Goal (€)',

        // Placeholders
        placeholderName: 'e.g., Mortgage',
        placeholderAmount: '0.00',
        placeholderDay: 'e.g., 27',
        placeholderWhatBought: 'Coffee...',
        placeholderAskAssistant: 'E.g., How much can I save this month?',

        // Buttons
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

        // Categories
        categoryGrocery: '🍎 Groceries',
        categoryTransport: '🚗 Transport',
        categoryEntertainment: '🎮 Entertainment',
        categoryHealth: '💊 Health',
        categoryClothing: '👕 Clothing',
        categoryOther: '📦 Other',

        // Assistant - Messages
        assistantWelcome: 'Hi! I am your financial assistant. Ask me anything about your budget or ask me to simulate future scenarios!',
        suggestionSave100: '💶 Save 100€',
        suggestionSimulate: '🔮 Simulate increase',
        suggestionGoal: '🎯 Goal',
        suggestionTopCategory: '📊 Top category',

        // Status and various messages
        statusListening: '🎤 Listening...',
        statusTapToSpeak: '🎤 Tap to speak',
        statusHeard: '🔊 Hearing: {text}...',
        statusRecognized: '✓ Recognized: "{text}"',
        statusError: '❌ Error',
        statusMicrophoneDenied: '❌ Microphone permission denied',
        statusNoSpeech: '❌ No speech detected',
        statusNetworkError: '❌ Network error',
        statusEditBeforeAdd: '✏️ You can edit before adding',

        // Toast
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
            language: 'it', // Lingua predefinita
            periodStart: this.getDefaultPeriodStart(),
            periodEnd: this.getDefaultPeriodEnd()
        };
        
        this.chart = null;
        this.init();
    }

    // Funzione di traduzione
    t(key, params = {}) {
        const lang = this.data.language || 'it';
        const langData = translations[lang] || translations.it;
        let text = langData[key] || key; // Fallback alla chiave se non trovata

        // Sostituisci i parametri (es. {start})
        for (const [param, value] of Object.entries(params)) {
            text = text.replace(`{${param}}`, value);
        }
        return text;
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.updateUI();
        this.showGuideMessage();
        this.updateChart();
    }

    getDefaultPeriodStart() {
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    getDefaultPeriodEnd() {
        const end = new Date();
        end.setDate(end.getDate() + 28);
        return end.toISOString().split('T')[0];
    }

    setupEventListeners() {
        // Tema
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());

        // Entrate
        document.getElementById('saveIncomeBtn').addEventListener('click', () => this.saveIncome());

        // Spese fisse
        document.getElementById('addFixedBtn').addEventListener('click', () => this.addFixedExpense());

        // Spese variabili
        document.getElementById('addExpenseBtn').addEventListener('click', () => this.addVariableExpense());
        document.getElementById('resetDayBtn').addEventListener('click', () => this.resetDay());
        document.getElementById('expenseDate').valueAsDate = new Date();

        // Risparmio
        document.getElementById('applySaveBtn').addEventListener('click', () => this.applySavings());

        // Backup
        document.getElementById('backupBtn').addEventListener('click', () => this.backupData());
        document.getElementById('restoreBtn').addEventListener('click', () => document.getElementById('restoreFile').click());
        document.getElementById('restoreFile').addEventListener('change', (e) => this.restoreData(e));

        // Reset
        document.getElementById('resetAllBtn').addEventListener('click', () => this.resetAll());

        // Esportazione calendario
        document.getElementById('exportCalendarBtn').addEventListener('click', () => this.exportToCalendar());

        // Soglia
        document.getElementById('thresholdInput').addEventListener('change', (e) => {
            this.data.threshold = parseFloat(e.target.value) || 50;
            this.saveData();
        });

        // Lingua
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.data.language = e.target.value;
            this.saveData();
            this.updateUI(); // <-- Questo ora tradurrà tutta l'interfaccia
            this.updateChart(); // Per tradurre eventuali testi nel grafico (se ce ne fossero)
        });

        // Salvataggio automatico
        document.getElementById('savePercent').addEventListener('input', (e) => {
            this.data.savingsPercent = parseFloat(e.target.value) || 0;
            this.saveData();
        });
    }

    // ========== FUNZIONI PRINCIPALI ==========

    saveIncome() {
        const income = parseFloat(document.getElementById('incomeInput').value) || 0;
        this.data.income = income;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastIncomeSaved'));
    }

    addFixedExpense() {
        const name = document.getElementById('fixedName').value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount').value);
        const day = parseInt(document.getElementById('fixedDay').value);
        const endDate = document.getElementById('fixedEndDate').value;

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
        
        // Reset campi
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    addVariableExpense() {
        const date = document.getElementById('expenseDate').value;
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

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
        
        // Reset campi
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        
        // Controllo soglia
        this.checkThreshold(date);
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastDayReset'));
        }
    }

    applySavings() {
        const percent = parseFloat(document.getElementById('savePercent').value) || 0;
        const goal = parseFloat(document.getElementById('saveGoal').value) || 0;
        
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastSavingsApplied'));
    }

    // ========== CALCOLI ==========

    calculateTotalVariableExpenses() {
        let total = 0;
        Object.values(this.data.variableExpenses).forEach(day => {
            day.forEach(expense => {
                total += expense.amount;
            });
        });
        return total;
    }

    calculateTotalFixedExpenses() {
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return this.data.fixedExpenses.reduce((sum, exp) => {
            // Verifica se la spesa è ancora attiva (non scaduta)
            const endDate = new Date(exp.endDate);
            if (endDate < today) return sum; // Spesa scaduta, non la contare
            
            // Verifica se il giorno di pagamento è già passato questo mese
            const paymentDate = new Date(currentYear, currentMonth, exp.day);
            if (paymentDate > today) return sum; // Deve ancora venire, non contarla ora
            
            return sum + exp.amount;
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
        // Aggiorna titoli e testi statici con le traduzioni
        document.querySelector('h1').innerHTML = `${this.t('appTitle')} <span class="version">${this.t('version')}</span>`;
        document.querySelector('.subtitle').textContent = this.t('appSubtitle');
        
        // Aggiorna valori principali
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();
        
        // Aggiorna info periodo
        document.getElementById('periodInfo').textContent = this.t('periodInfo', { 
            start: this.data.periodStart, 
            end: this.data.periodEnd 
        });

        // Aggiorna intestazioni delle sezioni
        document.querySelector('.section-card:nth-of-type(1) h2').textContent = this.t('incomeSection');
        document.querySelector('.section-card:nth-of-type(2) h2').textContent = this.t('fixedExpensesSection');
        document.querySelector('.section-card:nth-of-type(3) h2').textContent = this.t('variableExpensesSection');
        document.querySelector('.section-card:nth-of-type(4) h2').textContent = this.t('chartSection');
        document.querySelector('.section-card:nth-of-type(5) h2').textContent = this.t('assistantSection');
        document.querySelector('.section-card:nth-of-type(6) h2').textContent = this.t('savingsSection');
        document.querySelector('.section-card:nth-of-type(7) h2').textContent = this.t('settingsSection');

        // Aggiorna labels e placeholder
        document.querySelector('label[for="incomeInput"]').textContent = this.t('labelTotalIncome');
        document.getElementById('incomeInput').placeholder = this.t('placeholderAmount');
        
        document.getElementById('fixedName').placeholder = this.t('placeholderName');
        document.getElementById('fixedAmount').placeholder = this.t('placeholderAmount');
        document.querySelector('label[for="fixedDay"]').textContent = this.t('labelDayOfMonth');
        document.getElementById('fixedDay').placeholder = this.t('placeholderDay');
        document.querySelector('label[for="fixedEndDate"]').textContent = this.t('labelEndDate');
        
        document.querySelector('label[for="expenseDate"]').textContent = this.t('labelSelectDate');
        document.getElementById('expenseName').placeholder = this.t('placeholderWhatBought');
        document.getElementById('expenseAmount').placeholder = this.t('placeholderAmount');
        
        // Aggiorna opzioni del select delle categorie
        const categorySelect = document.getElementById('expenseCategory');
        categorySelect.options[0].text = this.t('categoryGrocery');
        categorySelect.options[1].text = this.t('categoryTransport');
        categorySelect.options[2].text = this.t('categoryEntertainment');
        categorySelect.options[3].text = this.t('categoryHealth');
        categorySelect.options[4].text = this.t('categoryClothing');
        categorySelect.options[5].text = this.t('categoryOther');
        
        document.querySelector('label[for="thresholdInput"]').textContent = this.t('labelThreshold');
        document.querySelector('label[for="languageSelect"]').textContent = this.t('labelLanguage');
        
        document.querySelector('label[for="savePercent"]').textContent = this.t('labelSavingsPercent');
        document.querySelector('label[for="saveGoal"]').textContent = this.t('labelSavingsGoal');
        
        // Aggiorna testi dei bottoni
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
        
        const voiceBtnSpan = document.querySelector('#voiceBtn span');
        if (voiceBtnSpan) voiceBtnSpan.textContent = this.t('btnVoice');
        
        // Aggiorna placeholder della chat
        document.getElementById('chatInput').placeholder = this.t('placeholderAskAssistant');
        
        // Aggiorna chip dei suggerimenti
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        if (suggestionChips.length >= 4) {
            suggestionChips[0].textContent = this.t('suggestionSave100');
            suggestionChips[1].textContent = this.t('suggestionSimulate');
            suggestionChips[2].textContent = this.t('suggestionGoal');
            suggestionChips[3].textContent = this.t('suggestionTopCategory');
        }

        // Aggiorna lista spese fisse
        this.updateFixedExpensesList();
        
        // Aggiorna lista spese variabili per data selezionata
        this.updateVariableExpensesList();
        
        // Aggiorna input con valori correnti
        document.getElementById('savePercent').value = this.data.savingsPercent;
        document.getElementById('saveGoal').value = this.data.savingsGoal;
        document.getElementById('thresholdInput').value = this.data.threshold;
        document.getElementById('languageSelect').value = this.data.language;

        // Aggiorna progress bar risparmio
        const progress = this.calculateSavingsProgress();
        if (progress > 0 && this.data.savingsGoal) {
            document.getElementById('progressContainer').style.display = 'block';
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressBar').textContent = Math.round(progress) + '%';
        } else {
            document.getElementById('progressContainer').style.display = 'none';
        }

        // Aggiorna messaggio guida
        this.showGuideMessage();
        
        // Aggiorna il messaggio di benvenuto dell'assistente se è il primo messaggio
        this.updateAssistantWelcome();
    }
    
    updateAssistantWelcome() {
        const chatMessages = document.getElementById('chatMessages');
        // Se c'è solo il messaggio di benvenuto (e nessun altro messaggio)
        if (chatMessages.children.length === 1) {
            const welcomeMessage = chatMessages.querySelector('.chat-message.bot .message-text');
            if (welcomeMessage) {
                welcomeMessage.textContent = this.t('assistantWelcome');
            }
        }
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (this.data.fixedExpenses.length === 0) {
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
                        <span class="expense-name">${exp.name}</span>
                        <span class="fixed-expense-detail">
                            ${this.t('fixedExpenseDetail', { day: exp.day, endDate: exp.endDate, status: status })}
                        </span>
                    </div>
                    <span class="expense-amount">${this.formatCurrency(exp.amount)}</span>
                    <div class="expense-actions">
                        <button onclick="app.deleteFixedExpense(${exp.id})">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updateVariableExpensesList() {
        const date = document.getElementById('expenseDate').value;
        const container = document.getElementById('variableExpensesList');
        const expenses = this.data.variableExpenses[date] || [];

        if (expenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noVariableExpenses')}</p>`;
            return;
        }

        container.innerHTML = expenses.map(exp => {
            // Traduci la categoria per visualizzarla
            let categoryKey = 'categoryOther';
            switch(exp.category) {
                case 'Alimentari': categoryKey = 'categoryGrocery'; break;
                case 'Trasporti': categoryKey = 'categoryTransport'; break;
                case 'Svago': categoryKey = 'categoryEntertainment'; break;
                case 'Salute': categoryKey = 'categoryHealth'; break;
                case 'Abbigliamento': categoryKey = 'categoryClothing'; break;
                default: categoryKey = 'categoryOther';
            }
            const translatedCategory = this.t(categoryKey);
            
            return `
            <div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${exp.name}</span>
                    <span class="expense-category">${translatedCategory}</span>
                </div>
                <span class="expense-amount">${this.formatCurrency(exp.amount)}</span>
                <div class="expense-actions">
                    <button onclick="app.deleteVariableExpense('${date}', ${exp.id})">🗑️</button>
                </div>
            </div>
        `}).join('');
    }

    updateChart() {
        const categories = {};
        
        Object.values(this.data.variableExpenses).forEach(day => {
            day.forEach(expense => {
                // Raggruppa per categoria originale, ma per il grafico useremo le chiavi tradotte
                categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
            });
        });

        if (Object.keys(categories).length === 0) {
            document.getElementById('chartNote').style.display = 'block';
            document.getElementById('chartNote').textContent = this.t('noChartData');
            if (this.chart) this.chart.destroy();
            return;
        }

        document.getElementById('chartNote').style.display = 'none';

        if (this.chart) this.chart.destroy();

        // Prepara le etichette tradotte per il grafico
        const translatedLabels = Object.keys(categories).map(cat => {
            switch(cat) {
                case 'Alimentari': return this.t('categoryGrocery');
                case 'Trasporti': return this.t('categoryTransport');
                case 'Svago': return this.t('categoryEntertainment');
                case 'Salute': return this.t('categoryHealth');
                case 'Abbigliamento': return this.t('categoryClothing');
                default: return this.t('categoryOther');
            }
        });

        const ctx = document.getElementById('expenseChart').getContext('2d');
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
    }

    // ========== UTILITY ==========

    formatCurrency(amount) {
        return amount.toFixed(2).replace('.', ',') + ' €';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = type === 'success' ? '#2dc653' : '#ef233c';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    showGuideMessage() {
        const guideMsg = document.getElementById('guideMessage');
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
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            document.getElementById('themeToggle').textContent = '🌙';
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
        this.saveTheme();
    }

    applyTheme() {
        const savedTheme = localStorage.getItem('budgetwise-theme');
        if (savedTheme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    saveTheme() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        localStorage.setItem('budgetwise-theme', theme);
    }

    // ========== DATA PERSISTENCE ==========

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            this.data = JSON.parse(saved);
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
        if (confirm('Sei sicuro di voler cancellare TUTTI i dati?')) {
            localStorage.clear();
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
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('toastResetCompleted'));
        }
    }

    // ========== DELETE FUNCTIONS ==========

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(exp => exp.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast(this.t('toastExpenseDeleted'));
    }

    deleteVariableExpense(date, id) {
        if (this.data.variableExpenses[date]) {
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
        
        // Aggiungi spese fisse (solo quelle attive con ricorrenza)
        this.data.fixedExpenses.forEach(exp => {
            const endDate = new Date(exp.endDate);
            if (endDate >= new Date()) { // Solo spese non scadute
                icsContent += "BEGIN:VEVENT\n";
                icsContent += `SUMMARY:💰 ${exp.name}\n`;
                icsContent += `DESCRIPTION:Spesa fissa di ${this.formatCurrency(exp.amount)} - Ogni giorno ${exp.day}\n`;
                // Crea un evento il prossimo giorno di pagamento
                const nextDate = this.getNextPaymentDate(exp.day);
                icsContent += `DTSTART;VALUE=DATE:${nextDate.replace(/-/g, '')}\n`;
                icsContent += `RRULE:FREQ=MONTHLY;UNTIL=${exp.endDate.replace(/-/g, '')}\n`;
                icsContent += "END:VEVENT\n";
            }
        });

        // Aggiungi spese variabili
        Object.entries(this.data.variableExpenses).forEach(([date, expenses]) => {
            expenses.forEach(exp => {
                icsContent += "BEGIN:VEVENT\n";
                icsContent += `SUMMARY:🛒 ${exp.name}\n`;
                icsContent += `DESCRIPTION:${exp.category} - ${this.formatCurrency(exp.amount)}\n`;
                icsContent += `DTSTART;VALUE=DATE:${date.replace(/-/g, '')}\n`;
                icsContent += `DTEND;VALUE=DATE:${date.replace(/-/g, '')}\n`;
                icsContent += "END:VEVENT\n";
            });
        });

        icsContent += "END:VCALENDAR";

        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `budgetwise-${this.data.periodStart}.ics`;
        a.click();
        
        this.showToast(this.t('toastCalendarExported'));
    }
}

// ============================================
// ASSISTENTE FINANZIARIO INTELLIGENTE
// ============================================

class FinancialAssistant {
    constructor(app) {
        this.app = app;
        this.context = [];
        this.init();
    }

    init() {
        document.getElementById('sendChatBtn').addEventListener('click', () => this.handleUserInput());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });
        
        // Chip suggerimenti
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('chatInput').value = chip.dataset.question;
                this.handleUserInput();
            });
        });
    }

    handleUserInput() {
        const input = document.getElementById('chatInput');
        const question = input.value.trim();
        if (!question) return;

        this.addMessage(question, 'user');
        input.value = '';

        // Simula "thinking"
        setTimeout(() => {
            const answer = this.generateAnswer(question);
            this.addMessage(answer, 'bot');
        }, 500);
    }

    addMessage(text, sender) {
        const container = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `
            <span class="message-sender">${sender === 'bot' ? '🤖 Assistente' : '👤 Tu'}:</span>
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
        const totalFixed = this.app.calculateTotalFixedExpenses();
        const daysLeft = this.app.getDaysLeft();

        // Risposte intelligenti basate sui dati reali
        if (q.includes('risparmi') || q.includes('risparmiare')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                const daily = dailyBudget;
                if (daily * daysLeft >= target) {
                    return `✅ Sì! Puoi risparmiare ${target}€ entro fine mese. Ti basterebbe risparmiare ${(target/daysLeft).toFixed(2)}€ al giorno. Il tuo budget giornaliero attuale è ${this.app.formatCurrency(daily)}.`;
                } else {
                    return `⚠️ Con l'attuale budget di ${this.app.formatCurrency(daily)} al giorno, in ${daysLeft} giorni avrai ${this.app.formatCurrency(daily * daysLeft)}. Per risparmiare ${target}€, dovresti ridurre le spese giornaliere di ${((target - (daily * daysLeft))/daysLeft).toFixed(2)}€.`;
                }
            }
            return this.getGenericSavingsAdvice();
        }

        if (q.includes('simul') || q.includes('cosa succede se')) {
            return this.handleSimulation(q);
        }

        if (q.includes('quando raggiunger') || q.includes('obiettivo')) {
            return this.handleGoalPrediction();
        }

        if (q.includes('categoria') || q.includes('spendo di più')) {
            return this.getTopCategory();
        }

        if (q.includes('quanto ho speso')) {
            return this.handleExpenseQuery(q);
        }

        // Risposte contestuali generali
        return this.getContextualAdvice();
    }

    getGenericSavingsAdvice() {
        const totalSpent = this.app.calculateTotalVariableExpenses();
        const dailyBudget = this.app.calculateDailyBudget();
        const daysLeft = this.app.getDaysLeft();
        
        if (totalSpent > this.app.data.threshold) {
            return `⚠️ Attenzione: hai già superato la soglia di ${this.app.formatCurrency(this.app.data.threshold)}. Ti consiglio di ridurre le spese non essenziali per i prossimi giorni. Il budget giornaliero è di ${this.app.formatCurrency(dailyBudget)}.`;
        }
        
        return `📊 Analisi: al momento hai speso ${this.app.formatCurrency(totalSpent)}. Hai ancora ${this.app.formatCurrency(this.app.calculateRemaining())} disponibili fino al ${this.app.data.periodEnd}.`;
    }

    handleSimulation(q) {
        const dailyBudget = this.app.calculateDailyBudget();
        const daysLeft = this.app.getDaysLeft();
        
        if (q.includes('aument') || q.includes('+')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const percent = parseInt(match[0]);
                const newDaily = dailyBudget * (1 + percent/100);
                const totalIncrease = (newDaily - dailyBudget) * daysLeft;
                return `🔮 Se aumenti le spese del ${percent}%, il budget giornaliero diventerebbe ${this.app.formatCurrency(newDaily)}. Alla fine del periodo avrai ${this.app.formatCurrency(this.app.calculateRemaining() - totalIncrease)} invece di ${this.app.formatCurrency(this.app.calculateRemaining())}. Sei sicuro?`;
            }
        }
        
        if (q.includes('riduc') || q.includes('-')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const percent = parseInt(match[0]);
                const newDaily = dailyBudget * (1 - percent/100);
                const totalSave = (dailyBudget - newDaily) * daysLeft;
                return `💡 Riducendo le spese del ${percent}%, risparmieresti ${this.app.formatCurrency(totalSave)} entro fine mese! Il nuovo budget giornaliero sarebbe ${this.app.formatCurrency(newDaily)}.`;
            }
        }
        
        return "Dimmi cosa vuoi simulare (es. 'cosa succede se aumento le spese del 20%?')";
    }

    handleGoalPrediction() {
        const goal = this.app.data.savingsGoal;
        const percent = this.app.data.savingsPercent;
        const income = this.app.data.income;
        
        if (!goal || !percent) {
            return "Non hai ancora impostato un obiettivo di risparmio. Vai nella sezione 🎯 e impostalo!";
        }
        
        const savedPerMonth = (income * percent) / 100;
        const monthsNeeded = Math.ceil(goal / savedPerMonth);
        
        if (monthsNeeded < 12) {
            return `🎯 Al ritmo attuale, raggiungerai l'obiettivo di ${this.app.formatCurrency(goal)} in ${monthsNeeded} mesi.`;
        } else {
            const years = Math.floor(monthsNeeded/12);
            const months = monthsNeeded % 12;
            return `🎯 Raggiungerai l'obiettivo in ${years} anni e ${months} mesi. Se aumentassi il risparmio al ${percent+5}%, ci impiegheresti meno!`;
        }
    }

    getTopCategory() {
        const categories = {};
        Object.values(this.app.data.variableExpenses).forEach(day => {
            day.forEach(exp => {
                categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
            });
        });
        
        if (Object.keys(categories).length === 0) {
            return "Non hai ancora spese registrate. Aggiungine qualcuna per avere un'analisi!";
        }
        
        const top = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];
        
        // Traduci la categoria per il messaggio
        let categoryKey = 'categoryOther';
        switch(top[0]) {
            case 'Alimentari': categoryKey = 'categoryGrocery'; break;
            case 'Trasporti': categoryKey = 'categoryTransport'; break;
            case 'Svago': categoryKey = 'categoryEntertainment'; break;
            case 'Salute': categoryKey = 'categoryHealth'; break;
            case 'Abbigliamento': categoryKey = 'categoryClothing'; break;
        }
        const translatedCategory = this.app.t(categoryKey);
        
        return `📊 La categoria in cui spendi di più è "${translatedCategory}" con ${this.app.formatCurrency(top[1])}. Vuoi qualche consiglio su come ridurre queste spese?`;
    }

    handleExpenseQuery(q) {
        if (q.includes('questo mese')) {
            const total = this.app.calculateTotalVariableExpenses();
            return `📊 In questo periodo (dal ${this.app.data.periodStart} a oggi) hai speso ${this.app.formatCurrency(total)}.`;
        }
        
        // Cerca menzione di categoria
        const categories = ['alimentari', 'trasporti', 'svago', 'salute', 'abbigliamento', 'altro'];
        for (let cat of categories) {
            if (q.includes(cat)) {
                let total = 0;
                Object.values(this.app.data.variableExpenses).forEach(day => {
                    day.forEach(exp => {
                        // Confronta con la categoria in italiano
                        let italianCat = '';
                        switch(cat) {
                            case 'alimentari': italianCat = 'Alimentari'; break;
                            case 'trasporti': italianCat = 'Trasporti'; break;
                            case 'svago': italianCat = 'Svago'; break;
                            case 'salute': italianCat = 'Salute'; break;
                            case 'abbigliamento': italianCat = 'Abbigliamento'; break;
                            default: italianCat = 'Altro';
                        }
                        if (exp.category === italianCat) total += exp.amount;
                    });
                });
                return total > 0 
                    ? `In ${cat} hai speso ${this.app.formatCurrency(total)}.`
                    : `Non hai spese in ${cat} in questo periodo.`;
            }
        }
        
        return null;
    }

    getContextualAdvice() {
        const remaining = this.app.calculateRemaining();
        const dailyBudget = this.app.calculateDailyBudget();
        
        if (remaining < 0) {
            return "⚠️ Sei in rosso! Hai speso più del budget. Ti consiglio di rivedere le spese fisse o trovare fonti di risparmio immediate.";
        } else if (remaining < dailyBudget * 7) {
            return `⚠️ Attenzione: ti rimangono solo ${this.app.formatCurrency(remaining)} per i prossimi giorni. Forse è meglio ridurre le spese variabili.`;
        } else {
            return `💪 Vai bene! Hai ancora ${this.app.formatCurrency(remaining)} di margine. Ricorda che puoi sempre chiedermi simulazioni o consigli personalizzati.`;
        }
    }
}

// ============================================
// ASSISTENTE VOCALE
// ============================================

class VoiceAssistant {
    constructor(app) {
        this.app = app;
        this.recognition = null;
        this.isListening = false;
        this.init();
    }

    init() {
        // Verifica supporto browser
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Riconoscimento vocale non supportato');
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.disabled = true;
                voiceBtn.innerHTML = '🎤 Non supportato';
            }
            return;
        }

        // Inizializza riconoscimento vocale
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Configurazione 
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'it-IT'; // Mantieni italiano per il riconoscimento
        this.recognition.maxAlternatives = 1;

        // Setup eventi
        this.setupEventListeners();
        
        // Aggiungi suggerimenti vocali
        this.addVoiceSuggestions();
    }

    setupEventListeners() {
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
                this.processVoiceCommand(transcript);
                this.updateUI('success', this.app.t('statusRecognized', { text: transcript }));
            } else {
                this.updateUI('listening', this.app.t('statusHeard', { text: transcript }));
            }
        };

        this.recognition.onerror = (event) => {
            console.error('Errore riconoscimento vocale:', event.error);
            let messageKey = 'statusError';
            
            switch(event.error) {
                case 'not-allowed':
                    messageKey = 'statusMicrophoneDenied';
                    break;
                case 'no-speech':
                    messageKey = 'statusNoSpeech';
                    break;
                case 'network':
                    messageKey = 'statusNetworkError';
                    break;
            }
            
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
            this.stopListening();
        } else {
            this.startListening();
        }
    }

    startListening() {
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Errore avvio:', error);
            this.updateUI('error', this.app.t('statusError'));
        }
    }

    stopListening() {
        this.isListening = false;
        this.recognition.stop();
        this.updateUI('idle', this.app.t('statusTapToSpeak'));
    }

    updateUI(state, message) {
        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        
        if (!voiceBtn || !voiceStatus) return;

        voiceBtn.classList.remove('listening', 'success', 'error');
        
        switch(state) {
            case 'listening':
                voiceBtn.classList.add('listening');
                voiceBtn.innerHTML = '⏹️ <span>' + (this.app.data.language === 'it' ? 'Ferma ascolto' : 'Stop listening') + '</span>';
                break;
            case 'success':
                voiceBtn.classList.add('success');
                voiceBtn.innerHTML = '🎤 <span>' + this.app.t('btnVoice') + '</span>';
                break;
            case 'error':
                voiceBtn.classList.add('error');
                voiceBtn.innerHTML = '🎤 <span>' + this.app.t('btnVoice') + '</span>';
                break;
            default:
                voiceBtn.innerHTML = '🎤 <span>' + this.app.t('btnVoice') + '</span>';
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

    processVoiceCommand(transcript) {
        console.log('Comando vocale:', transcript);
        
        let name = '';
        let amount = 0;
        let category = 'Altro';
        
        // Estrai importo
        const amountMatch = transcript.match(/(\d+[.,]?\d*)/);
        if (amountMatch) {
            amount = parseFloat(amountMatch[1].replace(',', '.'));
        }
        
        if (amount === 0) {
            this.updateUI('error', '❌ Importo non riconosciuto');
            return;
        }
        
        // Rimuovi l'importo e "euro" dal testo
        let remainingText = transcript
            .replace(amountMatch[1], '')
            .replace(/euro?|€/gi, '')
            .trim();
        
        // Controlla se c'è una categoria
        const categories = ['alimentari', 'trasporti', 'svago', 'salute', 'abbigliamento', 'altro'];
        for (let cat of categories) {
            if (remainingText.includes(cat)) {
                // Mappa al valore italiano per la categoria
                switch(cat) {
                    case 'alimentari': category = 'Alimentari'; break;
                    case 'trasporti': category = 'Trasporti'; break;
                    case 'svago': category = 'Svago'; break;
                    case 'salute': category = 'Salute'; break;
                    case 'abbigliamento': category = 'Abbigliamento'; break;
                    default: category = 'Altro';
                }
                remainingText = remainingText.replace(cat, '').trim();
                break;
            }
        }
        
        name = remainingText || 'Spesa vocale';
        
        // Compila i campi
        document.getElementById('expenseName').value = name;
        document.getElementById('expenseAmount').value = amount;
        document.getElementById('expenseCategory').value = category;
        
        this.highlightFields();
        
        setTimeout(() => {
            if (confirm(`✅ Aggiungere "${name}" da €${amount} in categoria ${category}?`)) {
                document.getElementById('addExpenseBtn').click();
                this.updateUI('success', `✓ Aggiunto: ${name} ${amount}€`);
            } else {
                this.updateUI('idle', this.app.t('statusEditBeforeAdd'));
            }
        }, 500);
    }

    highlightFields() {
        const fields = ['expenseName', 'expenseAmount', 'expenseCategory'];
        fields.forEach(id => {
            const field = document.getElementById(id);
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
        
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'voice-suggestions';
        suggestionsDiv.innerHTML = `
            <div class="voice-suggestions-title">💡 Prova a dire:</div>
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
                document.getElementById('voiceStatus').textContent = `🔊 Simulo: "${voiceText}"`;
                this.processVoiceCommand(voiceText);
            });
        });
    }
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

const app = new BudgetWise();
const assistant = new FinancialAssistant(app);
const voiceAssistant = new VoiceAssistant(app);

// Esponi le istanze globalmente
window.app = app;
window.assistant = assistant;
window.voiceAssistant = voiceAssistant;
