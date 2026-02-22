// ============================================
// BUDGETWISE 2.0 - VERSIONE COMPLETA CON TRADUZIONE
// ============================================

class BudgetWise {
    constructor() {
        this.data = {
            incomes: [],
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
        
        // ========== SISTEMA DI TRADUZIONE COMPLETO ==========
        this.translations = {
            it: {
                // Generali
                budget: 'Budget giornaliero',
                remaining: 'Rimanenza',
                days: 'Giorni rimasti',
                period: 'Periodo',
                totalIncome: 'Totale entrate',
                startGuide: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
                
                // Sezioni
                incomes: '🏦 Entrate del periodo',
                fixed: '📌 Spese fisse mensili',
                variable: '🧾 Spese variabili',
                chart: '📊 Distribuzione spese',
                assistant: '🤖 Assistente Finanziario AI',
                savings: '🎯 Obiettivo risparmio',
                settings: '⚙️ Impostazioni',
                
                // Badge
                badge: 'multiplo',
                
                // Pulsanti
                addIncome: '➕ Aggiungi entrata',
                addFixed: '➕ Aggiungi spesa fissa',
                addExpense: '➕ Aggiungi spesa',
                resetDay: '🗑️ Cancella spese del giorno',
                applySavings: 'Applica risparmio',
                backup: '💾 Scarica backup',
                restore: '📂 Ripristina',
                resetAll: '⚠️ Reset completo',
                export: '📅 Esporta in Calendar',
                send: 'Invia',
                
                // Placeholder e testi form
                incomeDesc: 'Descrizione (es. Stipendio)',
                incomeAmount: 'Importo €',
                fixedName: 'Nome (es. Mutuo)',
                fixedAmount: 'Importo €',
                fixedDay: 'Giorno (es. 27)',
                expenseName: 'Cosa hai comprato?',
                expenseAmount: '€',
                chatPlaceholder: 'Es. Quanto posso risparmiare questo mese?',
                
                // Etichette
                dateLabel: 'Seleziona data:',
                dayLabel: 'Giorno del mese',
                endDateLabel: 'Data scadenza (fine)',
                percentLabel: 'Percentuale su entrate (%)',
                goalLabel: 'Obiettivo (€)',
                thresholdLabel: '🔔 Soglia avviso (€)',
                languageLabel: '🌍 Lingua',
                backupLabel: '📅 Backup dati',
                
                // Testi informativi
                micFixed: '🎤 Tocca e di\' tutto in una frase',
                micVariable: '🎤 Tocca per parlare',
                helpFixed: '⏰ Verrà conteggiata automaticamente ogni mese fino alla scadenza',
                chartNote: 'Aggiungi spese per vedere il grafico',
                noIncome: 'Nessuna entrata',
                noFixed: 'Nessuna spesa fissa',
                noVariable: 'Nessuna spesa in questo giorno',
                
                // Chat
                welcomeMessage: 'Ciao! Sono il tuo assistente finanziario. Chiedimi qualsiasi cosa sul tuo budget!',
                suggestion1: '💶 Risparmia 100€',
                suggestion2: '🔮 Simula aumento',
                suggestion3: '🎯 Obiettivo',
                suggestion4: '📊 Top categoria',
                assistantName: 'Assistente',
                
                // Toast messages
                incomeAdded: '✅ Entrata aggiunta!',
                incomeDeleted: '🗑️ Entrata eliminata',
                fixedAdded: '✅ Spesa fissa aggiunta!',
                fixedDeleted: '🗑️ Spesa eliminata',
                expenseAdded: '✅ Spesa aggiunta!',
                expenseDeleted: '🗑️ Spesa eliminata',
                dayReset: '🗑️ Spese del giorno cancellate',
                savingsApplied: '💰 Risparmio applicato!',
                backupDownloaded: '💾 Backup scaricato!',
                dataRestored: '📂 Dati ripristinati!',
                resetCompleted: '🔄 Reset completato',
                calendarExported: '📅 Calendario esportato!',
                
                // Errori
                fillFields: '⚠️ Compila tutti i campi',
                invalidDay: '⚠️ Giorno non valido (1-31)',
                thresholdExceeded: '⚠️ Attenzione! Hai superato la soglia di ',
                
                // Stati spese fisse
                active: '🟢 Attivo',
                expired: '🔴 Scaduto',
                
                // Conferme
                confirmReset: 'Sei sicuro di voler cancellare TUTTI i dati?',
                
                // Risposte chat
                noGoal: 'Non hai ancora impostato un obiettivo di risparmio. Vai nella sezione 🎯 e impostalo!',
                noExpenses: 'Non hai ancora spese registrate. Aggiungine qualcuna per avere un\'analisi!',
                
                // Footer
                footerText: 'BudgetWise 2.0 — Gestione intelligente delle tue finanze',
                footerFeatures: '✨ Assistente AI integrato • Riconoscimento vocale • Tema scuro',
                
                // Testi aggiuntivi
                fixedVoiceButton: '🎤 Inserisci spesa fissa con voce',
                variableVoiceButton: '🎤 Inserisci con voce',
                
                // Categorie
                categoryAlimentari: '🍎 Alimentari',
                categoryTrasporti: '🚗 Trasporti',
                categorySvago: '🎮 Svago',
                categorySalute: '💊 Salute',
                categoryAbbigliamento: '👕 Abbigliamento',
                categoryAltro: '📦 Altro'
            },
            en: {
                // General
                budget: 'Daily budget',
                remaining: 'Remaining',
                days: 'Days left',
                period: 'Period',
                totalIncome: 'Total income',
                startGuide: '👋 Start by adding your income below!',
                
                // Sections
                incomes: '🏦 Period income',
                fixed: '📌 Monthly fixed expenses',
                variable: '🧾 Variable expenses',
                chart: '📊 Expense distribution',
                assistant: '🤖 AI Financial Assistant',
                savings: '🎯 Savings goal',
                settings: '⚙️ Settings',
                
                // Badge
                badge: 'multiple',
                
                // Buttons
                addIncome: '➕ Add income',
                addFixed: '➕ Add fixed expense',
                addExpense: '➕ Add expense',
                resetDay: '🗑️ Clear day expenses',
                applySavings: 'Apply savings',
                backup: '💾 Download backup',
                restore: '📂 Restore',
                resetAll: '⚠️ Full reset',
                export: '📅 Export to Calendar',
                send: 'Send',
                
                // Placeholders and form texts
                incomeDesc: 'Description (e.g. Salary)',
                incomeAmount: 'Amount €',
                fixedName: 'Name (e.g. Mortgage)',
                fixedAmount: 'Amount €',
                fixedDay: 'Day (e.g. 27)',
                expenseName: 'What did you buy?',
                expenseAmount: '€',
                chatPlaceholder: 'E.g. How much can I save this month?',
                
                // Labels
                dateLabel: 'Select date:',
                dayLabel: 'Day of month',
                endDateLabel: 'Expiry date',
                percentLabel: 'Percentage of income (%)',
                goalLabel: 'Goal (€)',
                thresholdLabel: '🔔 Alert threshold (€)',
                languageLabel: '🌍 Language',
                backupLabel: '📅 Data backup',
                
                // Info texts
                micFixed: '🎤 Say everything in one phrase',
                micVariable: '🎤 Tap to speak',
                helpFixed: '⏰ Automatically counted each month until expiry',
                chartNote: 'Add expenses to see chart',
                noIncome: 'No income',
                noFixed: 'No fixed expenses',
                noVariable: 'No expenses on this day',
                
                // Chat
                welcomeMessage: 'Hi! I\'m your financial assistant. Ask me anything about your budget!',
                suggestion1: '💶 Save 100€',
                suggestion2: '🔮 Simulate increase',
                suggestion3: '🎯 Goal',
                suggestion4: '📊 Top category',
                assistantName: 'Assistant',
                
                // Toast messages
                incomeAdded: '✅ Income added!',
                incomeDeleted: '🗑️ Income deleted',
                fixedAdded: '✅ Fixed expense added!',
                fixedDeleted: '🗑️ Expense deleted',
                expenseAdded: '✅ Expense added!',
                expenseDeleted: '🗑️ Expense deleted',
                dayReset: '🗑️ Day expenses cleared',
                savingsApplied: '💰 Savings applied!',
                backupDownloaded: '💾 Backup downloaded!',
                dataRestored: '📂 Data restored!',
                resetCompleted: '🔄 Reset completed',
                calendarExported: '📅 Calendar exported!',
                
                // Errors
                fillFields: '⚠️ Fill all fields',
                invalidDay: '⚠️ Invalid day (1-31)',
                thresholdExceeded: '⚠️ Warning! You exceeded the threshold of ',
                
                // Fixed expense status
                active: '🟢 Active',
                expired: '🔴 Expired',
                
                // Confirmations
                confirmReset: 'Are you sure you want to delete ALL data?',
                
                // Chat responses
                noGoal: 'You haven\'t set a savings goal yet. Go to the 🎯 section and set one!',
                noExpenses: 'You haven\'t recorded any expenses yet. Add some to get an analysis!',
                
                // Footer
                footerText: 'BudgetWise 2.0 — Smart financial management',
                footerFeatures: '✨ AI Assistant • Voice recognition • Dark theme',
                
                // Additional texts
                fixedVoiceButton: '🎤 Add fixed expense with voice',
                variableVoiceButton: '🎤 Add with voice',
                
                // Categories
                categoryAlimentari: '🍎 Groceries',
                categoryTrasporti: '🚗 Transport',
                categorySvago: '🎮 Leisure',
                categorySalute: '💊 Health',
                categoryAbbigliamento: '👕 Clothing',
                categoryAltro: '📦 Other'
            }
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.updateUI();
        this.updateChart();
        this.setupVoice();
        this.applyLanguage();
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
        document.getElementById('themeToggle').addEventListener('click', () => this.toggleTheme());
        document.getElementById('addIncomeBtn').addEventListener('click', () => this.addIncome());
        document.getElementById('addFixedBtn').addEventListener('click', () => this.addFixedExpense());
        document.getElementById('addExpenseBtn').addEventListener('click', () => this.addVariableExpense());
        document.getElementById('resetDayBtn').addEventListener('click', () => this.resetDay());
        document.getElementById('expenseDate').valueAsDate = new Date();
        document.getElementById('applySaveBtn').addEventListener('click', () => this.applySavings());
        document.getElementById('backupBtn').addEventListener('click', () => this.backupData());
        document.getElementById('restoreBtn').addEventListener('click', () => document.getElementById('restoreFile').click());
        document.getElementById('restoreFile').addEventListener('change', (e) => this.restoreData(e));
        document.getElementById('resetAllBtn').addEventListener('click', () => this.resetAll());
        document.getElementById('exportCalendarBtn').addEventListener('click', () => this.exportToCalendar());
        document.getElementById('sendChatBtn').addEventListener('click', () => this.handleChatInput());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleChatInput();
        });

        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('chatInput').value = chip.dataset.question;
                this.handleChatInput();
            });
        });

        document.getElementById('thresholdInput').addEventListener('change', (e) => {
            this.data.threshold = parseFloat(e.target.value) || 50;
            this.saveData();
        });

        document.getElementById('savePercent').addEventListener('input', (e) => {
            this.data.savingsPercent = parseFloat(e.target.value) || 0;
            this.saveData();
        });

        document.getElementById('saveGoal').addEventListener('input', (e) => {
            this.data.savingsGoal = parseFloat(e.target.value) || 0;
            this.saveData();
        });

        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.data.language = e.target.value;
            this.saveData();
            this.applyLanguage();
        });
    }

    // ========== TRADUZIONE ==========
    t(key) {
        return this.translations[this.data.language][key] || key;
    }

    applyLanguage() {
        console.log('🌐 Cambio lingua a:', this.data.language);
        
        document.getElementById('languageSelect').value = this.data.language;
        
        document.querySelector('.subtitle').textContent = this.data.language === 'it' 
            ? 'Stipendio a stipendio — gestione intelligente con AI'
            : 'Paycheck to paycheck — smart management with AI';
        
        const summaryLabels = document.querySelectorAll('.summary-label');
        if (summaryLabels.length >= 3) {
            summaryLabels[0].textContent = this.t('budget');
            summaryLabels[1].textContent = this.t('remaining');
            summaryLabels[2].textContent = this.t('days');
        }
        
        const h2s = document.querySelectorAll('h2');
        h2s.forEach(h2 => {
            const text = h2.textContent;
            if (text.includes('🏦')) h2.innerHTML = this.t('incomes');
            else if (text.includes('📌')) h2.innerHTML = this.t('fixed');
            else if (text.includes('🧾')) h2.innerHTML = this.t('variable');
            else if (text.includes('📊')) h2.innerHTML = this.t('chart');
            else if (text.includes('🤖')) h2.innerHTML = this.t('assistant');
            else if (text.includes('🎯')) h2.innerHTML = this.t('savings');
            else if (text.includes('⚙️')) h2.innerHTML = this.t('settings');
        });
        
        const badge = document.querySelector('.badge');
        if (badge) badge.textContent = this.t('badge');
        
        document.getElementById('addIncomeBtn').innerHTML = this.t('addIncome');
        document.getElementById('addFixedBtn').innerHTML = this.t('addFixed');
        document.getElementById('addExpenseBtn').innerHTML = this.t('addExpense');
        document.getElementById('resetDayBtn').innerHTML = this.t('resetDay');
        document.getElementById('applySaveBtn').textContent = this.t('applySavings');
        document.getElementById('backupBtn').innerHTML = this.t('backup');
        document.getElementById('restoreBtn').innerHTML = this.t('restore');
        document.getElementById('resetAllBtn').innerHTML = this.t('resetAll');
        document.getElementById('exportCalendarBtn').textContent = this.t('export');
        document.getElementById('sendChatBtn').textContent = this.t('send');
        
        document.getElementById('incomeDesc').placeholder = this.t('incomeDesc');
        document.getElementById('incomeAmount').placeholder = this.t('incomeAmount');
        document.getElementById('fixedName').placeholder = this.t('fixedName');
        document.getElementById('fixedAmount').placeholder = this.t('fixedAmount');
        document.getElementById('fixedDay').placeholder = this.t('fixedDay');
        document.getElementById('expenseName').placeholder = this.t('expenseName');
        document.getElementById('expenseAmount').placeholder = this.t('expenseAmount');
        document.getElementById('chatInput').placeholder = this.t('chatPlaceholder');
        
        const dateLabel = document.querySelector('.date-selector label');
        if (dateLabel) dateLabel.textContent = this.t('dateLabel');
        
        const dayLabel = document.querySelector('.input-group.half label');
        if (dayLabel) dayLabel.textContent = this.t('dayLabel');
        
        const endDateLabel = document.querySelectorAll('.input-group.half label')[1];
        if (endDateLabel) endDateLabel.textContent = this.t('endDateLabel');
        
        document.getElementById('fixedVoiceStatus').textContent = this.t('micFixed');
        document.getElementById('voiceStatus').textContent = this.t('micVariable');
        
        const helpText = document.querySelector('.section-card:nth-child(6) .help-text');
        if (helpText) helpText.textContent = this.t('helpFixed');
        
        document.getElementById('chartNote').textContent = this.t('chartNote');
        
        const percentLabel = document.querySelector('.input-group label[for="savePercent"]');
        if (percentLabel) percentLabel.textContent = this.t('percentLabel');
        
        const goalLabel = document.querySelector('.input-group label[for="saveGoal"]');
        if (goalLabel) goalLabel.textContent = this.t('goalLabel');
        
        const settingLabels = document.querySelectorAll('.setting-item label');
        if (settingLabels.length >= 3) {
            settingLabels[0].innerHTML = this.t('thresholdLabel');
            settingLabels[1].innerHTML = this.t('languageLabel');
            settingLabels[2].innerHTML = this.t('backupLabel');
        }
        
        const welcomeMessage = document.querySelector('.chat-message.bot .message-text');
        if (welcomeMessage) welcomeMessage.textContent = this.t('welcomeMessage');
        
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        if (suggestionChips.length >= 4) {
            suggestionChips[0].textContent = this.t('suggestion1');
            suggestionChips[1].textContent = this.t('suggestion2');
            suggestionChips[2].textContent = this.t('suggestion3');
            suggestionChips[3].textContent = this.t('suggestion4');
        }
        
        document.getElementById('guideMessage').textContent = this.t('startGuide');
        
        // ===== NUOVE TRADUZIONI AGGIUNTE =====
        
        // Traduci i testi dei pulsanti microfono
        const micFixedSpan = document.getElementById('micFixedText');
        if (micFixedSpan) micFixedSpan.textContent = this.t('fixedVoiceButton');

        const voiceBtnSpan = document.getElementById('voiceBtnText');
        if (voiceBtnSpan) voiceBtnSpan.textContent = this.t('variableVoiceButton');

        // Traduci l'etichetta "Totale entrate"
        const totalIncomeLabel = document.getElementById('totalIncomeLabel');
        if (totalIncomeLabel) totalIncomeLabel.textContent = this.t('totalIncome');

        // Traduci il footer
        const footerText = document.getElementById('footerText');
        if (footerText) footerText.textContent = this.t('footerText');

        const footerFeatures = document.getElementById('footerFeatures');
        if (footerFeatures) footerFeatures.textContent = this.t('footerFeatures');

        // Traduci le etichette del summary
        const budgetLabel = document.getElementById('budgetLabel');
        if (budgetLabel) budgetLabel.textContent = this.t('budget');
        
        const remainingLabel = document.getElementById('remainingLabel');
        if (remainingLabel) remainingLabel.textContent = this.t('remaining');
        
        const daysLabel = document.getElementById('daysLabel');
        if (daysLabel) daysLabel.textContent = this.t('days');
        
        // Traduci le categorie nel select
        const categorySelect = document.getElementById('expenseCategory');
        if (categorySelect) {
            const options = categorySelect.options;
            options[0].text = this.t('categoryAlimentari');
            options[1].text = this.t('categoryTrasporti');
            options[2].text = this.t('categorySvago');
            options[3].text = this.t('categorySalute');
            options[4].text = this.t('categoryAbbigliamento');
            options[5].text = this.t('categoryAltro');
        }
        
        this.updatePeriodInfo();
    }

    updatePeriodInfo() {
        document.getElementById('periodInfo').textContent = `📅 ${this.t('period')}: ${this.data.periodStart} → ${this.data.periodEnd}`;
    }

    // ========== ENTRATE MULTIPLE ==========
    calculateTotalIncome() {
        return this.data.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    }

    addIncome() {
        const desc = document.getElementById('incomeDesc').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        
        if (!desc || !amount) {
            alert(this.t('fillFields'));
            return;
        }
        
        this.data.incomes.push({
            desc,
            amount,
            date: new Date().toISOString().split('T')[0],
            id: Date.now()
        });
        
        this.saveData();
        this.updateUI();
        alert(this.t('incomeAdded'));
        
        document.getElementById('incomeDesc').value = '';
        document.getElementById('incomeAmount').value = '';
    }

    deleteIncome(id) {
        this.data.incomes = this.data.incomes.filter(inc => inc.id !== id);
        this.saveData();
        this.updateUI();
        alert(this.t('incomeDeleted'));
    }

    // ========== SPESE FISSE ==========
    addFixedExpense() {
        const name = document.getElementById('fixedName').value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount').value);
        const day = parseInt(document.getElementById('fixedDay').value);
        const endDate = document.getElementById('fixedEndDate').value;

        if (!name || !amount || !day || !endDate) {
            alert(this.t('fillFields'));
            return;
        }

        if (day < 1 || day > 31) {
            alert(this.t('invalidDay'));
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
        alert(this.t('fixedAdded'));
        
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(exp => exp.id !== id);
        this.saveData();
        this.updateUI();
        alert(this.t('fixedDeleted'));
    }

    // ========== SPESE VARIABILI ==========
    addVariableExpense() {
        const date = document.getElementById('expenseDate').value;
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

        if (!name || !amount) {
            alert(this.t('fillFields'));
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
        alert(this.t('expenseAdded'));
        
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        
        this.checkThreshold(date);
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
            alert(this.t('expenseDeleted'));
        }
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            alert(this.t('dayReset'));
        }
    }

    checkThreshold(date) {
        const today = new Date().toISOString().split('T')[0];
        if (date !== today) return;

        const totalSpent = this.calculateTotalVariableExpenses();
        if (totalSpent > this.data.threshold) {
            alert(this.t('thresholdExceeded') + this.formatCurrency(this.data.threshold));
        }
    }

    // ========== RISPARMIO ==========
    applySavings() {
        const percent = parseFloat(document.getElementById('savePercent').value) || 0;
        const goal = parseFloat(document.getElementById('saveGoal').value) || 0;
        
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        alert(this.t('savingsApplied'));
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
            const endDate = new Date(exp.endDate);
            if (endDate < today) return sum;
            
            const paymentDate = new Date(currentYear, currentMonth, exp.day);
            if (paymentDate > today) return sum;
            
            return sum + exp.amount;
        }, 0);
    }

    calculateRemaining() {
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpenses();
        const savingsAmount = (totalIncome * this.data.savingsPercent) / 100;
        const budget = totalIncome - totalFixed - savingsAmount;
        return budget - this.calculateTotalVariableExpenses();
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
        const totalIncome = this.calculateTotalIncome();
        const saved = (totalIncome * this.data.savingsPercent) / 100;
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

    // ========== UI ==========
    updateUI() {
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();
        
        this.updatePeriodInfo();

        this.updateIncomeList();
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();
        
        document.getElementById('savePercent').value = this.data.savingsPercent;
        document.getElementById('saveGoal').value = this.data.savingsGoal;
        document.getElementById('thresholdInput').value = this.data.threshold;

        const progress = this.calculateSavingsProgress();
        if (progress > 0 && this.data.savingsGoal) {
            document.getElementById('progressContainer').style.display = 'block';
            document.getElementById('progressBar').style.width = progress + '%';
            document.getElementById('progressBar').textContent = Math.round(progress) + '%';
        } else {
            document.getElementById('progressContainer').style.display = 'none';
        }

        document.getElementById('guideMessage').style.display = this.data.incomes.length === 0 ? 'block' : 'none';
    }

    updateIncomeList() {
        const container = document.getElementById('incomeList');
        if (!container) return;
        
        if (this.data.incomes.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noIncome')}</p>`;
            return;
        }
        
        container.innerHTML = this.data.incomes.map(inc => `
            <div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${inc.desc}</span>
                    <span class="expense-category">${inc.date}</span>
                </div>
                <span class="expense-amount" style="color: var(--secondary)">+${this.formatCurrency(inc.amount)}</span>
                <div class="expense-actions">
                    <button onclick="app.deleteIncome(${inc.id})">🗑️</button>
                </div>
            </div>
        `).join('');
        
        document.getElementById('totalIncomeDisplay').textContent = this.formatCurrency(this.calculateTotalIncome());
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (this.data.fixedExpenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noFixed')}</p>`;
            return;
        }

        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const today = new Date();
            const endDate = new Date(exp.endDate);
            const isActive = endDate >= today;
            const status = isActive ? this.t('active') : this.t('expired');
            
            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <span class="expense-name">${exp.name}</span>
                        <span class="expense-category">
                            📅 ${this.t('dayLabel')} ${exp.day} · ${this.t('endDateLabel')}: ${exp.endDate} ${status}
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
            container.innerHTML = `<p class="chart-note">${this.t('noVariable')}</p>`;
            return;
        }

        container.innerHTML = expenses.map(exp => `
            <div class="expense-item">
                <div class="expense-info">
                    <span class="expense-name">${exp.name}</span>
                    <span class="expense-category">${this.t('category' + exp.category)}</span>
                </div>
                <span class="expense-amount">${this.formatCurrency(exp.amount)}</span>
                <div class="expense-actions">
                    <button onclick="app.deleteVariableExpense('${date}', ${exp.id})">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    updateChart() {
        const categories = {};
        
        Object.values(this.data.variableExpenses).forEach(day => {
            day.forEach(expense => {
                const catName = this.t('category' + expense.category);
                categories[catName] = (categories[catName] || 0) + expense.amount;
            });
        });

        if (Object.keys(categories).length === 0) {
            document.getElementById('chartNote').style.display = 'block';
            if (this.chart) this.chart.destroy();
            return;
        }

        document.getElementById('chartNote').style.display = 'none';

        if (this.chart) this.chart.destroy();

        const ctx = document.getElementById('expenseChart').getContext('2d');
        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(categories),
                datasets: [{
                    data: Object.values(categories),
                    backgroundColor: [
                        '#6366f1', '#818cf8', '#10b981', '#34d399', '#f59e0b', '#ef4444'
                    ]
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary')
                        }
                    }
                }
            }
        });
    }

    formatCurrency(amount) {
        return amount.toFixed(2).replace('.', ',') + ' €';
    }

    // ========== CHAT ASSISTANT ==========
    handleChatInput() {
        const input = document.getElementById('chatInput');
        const question = input.value.trim();
        if (!question) return;

        this.addChatMessage('user', question);
        input.value = '';

        setTimeout(() => {
            const answer = this.generateAnswer(question);
            this.addChatMessage('bot', answer);
        }, 500);
    }

    addChatMessage(sender, text) {
        const container = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${sender}`;
        messageDiv.innerHTML = `
            <span class="message-sender">${sender === 'bot' ? '🤖 ' + this.t('assistantName') : '👤 ' + (this.data.language === 'it' ? 'Tu' : 'You')}:</span>
            <span class="message-text">${text}</span>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    }

    generateAnswer(question) {
        const q = question.toLowerCase();
        const remaining = this.calculateRemaining();
        const dailyBudget = this.calculateDailyBudget();
        const totalSpent = this.calculateTotalVariableExpenses();
        const totalFixed = this.calculateTotalFixedExpenses();
        const daysLeft = this.getDaysLeft();

        if (q.includes('risparmi') || q.includes('risparmiare') || q.includes('save')) {
            const match = q.match(/(\d+)/);
            if (match) {
                const target = parseInt(match[0]);
                const daily = dailyBudget;
                if (daily * daysLeft >= target) {
                    return `✅ ${this.data.language === 'it' ? 'Sì! Puoi risparmiare' : 'Yes! You can save'} ${target}€. ${this.data.language === 'it' ? 'Ti basterebbe risparmiare' : 'You would need to save'} ${(target/daysLeft).toFixed(2)}€ ${this.data.language === 'it' ? 'al giorno' : 'per day'}.`;
                } else {
                    return `⚠️ ${this.data.language === 'it' ? 'Con l\'attuale budget' : 'With your current budget'} ${this.formatCurrency(daily)} ${this.data.language === 'it' ? 'al giorno' : 'per day'}, ${this.data.language === 'it' ? 'in' : 'in'} ${daysLeft} ${this.data.language === 'it' ? 'giorni avrai' : 'days you\'ll have'} ${this.formatCurrency(daily * daysLeft)}.`;
                }
            }
        }

        if (q.includes('categoria') || q.includes('category') || q.includes('spendo di più') || q.includes('spend most')) {
            const categories = {};
            Object.values(this.data.variableExpenses).forEach(day => {
                day.forEach(exp => {
                    const catName = this.t('category' + exp.category);
                    categories[catName] = (categories[catName] || 0) + exp.amount;
                });
            });
            
            if (Object.keys(categories).length === 0) {
                return this.t('noExpenses');
            }
            
            const top = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];
            return `📊 ${this.data.language === 'it' ? 'La categoria in cui spendi di più è' : 'The category where you spend the most is'} "${top[0]}" ${this.data.language === 'it' ? 'con' : 'with'} ${this.formatCurrency(top[1])}.`;
        }

        if (q.includes('obiettivo') || q.includes('goal')) {
            const goal = this.data.savingsGoal;
            const percent = this.data.savingsPercent;
            const income = this.calculateTotalIncome();
            
            if (!goal || !percent) {
                return this.t('noGoal');
            }
            
            const savedPerMonth = (income * percent) / 100;
            const monthsNeeded = Math.ceil(goal / savedPerMonth);
            
            return `🎯 ${this.data.language === 'it' ? 'Raggiungerai l\'obiettivo in' : 'You\'ll reach your goal in'} ${monthsNeeded} ${this.data.language === 'it' ? 'mesi' : 'months'}.`;
        }

        return this.getContextualAdvice();
    }

    getContextualAdvice() {
        const remaining = this.calculateRemaining();
        const dailyBudget = this.calculateDailyBudget();
        
        if (remaining < 0) {
            return this.data.language === 'it' 
                ? "⚠️ Sei in rosso! Rivedi le spese."
                : "⚠️ You're in the red! Review your expenses.";
        } else if (remaining < dailyBudget * 7) {
            return this.data.language === 'it'
                ? `⚠️ Attenzione: ti rimangono solo ${this.formatCurrency(remaining)} per i prossimi giorni.`
                : `⚠️ Warning: you only have ${this.formatCurrency(remaining)} left for the coming days.`;
        } else {
            return this.data.language === 'it'
                ? `💪 Vai bene! Hai ancora ${this.formatCurrency(remaining)} di margine.`
                : `💪 You're doing well! You still have ${this.formatCurrency(remaining)} left.`;
        }
    }

    // ========== TEMA ==========
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
        this.updateChart();
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

    // ========== PERSISTENZA DATI ==========
    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.income !== undefined && !parsed.incomes) {
                parsed.incomes = [{
                    desc: this.data.language === 'it' ? 'Stipendio' : 'Salary',
                    amount: parsed.income,
                    date: new Date().toISOString().split('T')[0],
                    id: Date.now()
                }];
                delete parsed.income;
            }
            this.data = parsed;
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
        
        alert(this.t('backupDownloaded'));
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
                this.applyLanguage();
                alert(this.t('dataRestored'));
            } catch (error) {
                alert('❌ File non valido');
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm(this.t('confirmReset'))) {
            localStorage.clear();
            this.data = {
                incomes: [],
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
            this.applyLanguage();
            alert(this.t('resetCompleted'));
        }
    }

    // ========== ESPORTAZIONE CALENDARIO ==========
    exportToCalendar() {
        let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        
        this.data.fixedExpenses.forEach(exp => {
            const endDate = new Date(exp.endDate);
            if (endDate >= new Date()) {
                icsContent += "BEGIN:VEVENT\n";
                icsContent += `SUMMARY:💰 ${exp.name}\n`;
                icsContent += `DESCRIPTION:${this.data.language === 'it' ? 'Spesa fissa' : 'Fixed expense'} ${this.formatCurrency(exp.amount)} - ${this.data.language === 'it' ? 'Ogni giorno' : 'Every day'} ${exp.day}\n`;
                const nextDate = this.getNextPaymentDate(exp.day);
                icsContent += `DTSTART;VALUE=DATE:${nextDate.replace(/-/g, '')}\n`;
                icsContent += `RRULE:FREQ=MONTHLY;UNTIL=${exp.endDate.replace(/-/g, '')}\n`;
                icsContent += "END:VEVENT\n";
            }
        });

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
        
        alert(this.t('calendarExported'));
    }

    // ========== VOCE ==========
    setupVoice() {
        console.log('Setup voice...');
        
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.warn('Riconoscimento vocale non supportato');
            const voiceBtn = document.getElementById('voiceBtn');
            if (voiceBtn) {
                voiceBtn.disabled = true;
                voiceBtn.innerHTML = '🎤 ' + (this.data.language === 'it' ? 'Non supportato' : 'Not supported');
            }
            return;
        }

        console.log('✅ Riconoscimento vocale supportato');
        
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.startVoiceInput());
        }
    }

    startVoiceInput() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = this.data.language === 'it' ? 'it-IT' : 'en-US';
        recognition.interimResults = true;

        const voiceBtn = document.getElementById('voiceBtn');
        const voiceStatus = document.getElementById('voiceStatus');
        
        voiceBtn.classList.add('listening');
        voiceStatus.textContent = '🎤 ' + (this.data.language === 'it' ? 'Parlare...' : 'Speak...');

        recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript.trim();
            
            if (result.isFinal) {
                this.processVoiceCommand(transcript);
                voiceStatus.textContent = '🎤 ' + (this.data.language === 'it' ? 'Tocca per parlare' : 'Tap to speak');
            } else {
                voiceStatus.textContent = `🔊 ${transcript}...`;
            }
        };

        recognition.onerror = () => {
            voiceBtn.classList.remove('listening');
            voiceStatus.textContent = '❌ ' + (this.data.language === 'it' ? 'Errore' : 'Error');
            setTimeout(() => {
                voiceStatus.textContent = '🎤 ' + (this.data.language === 'it' ? 'Tocca per parlare' : 'Tap to speak');
            }, 2000);
        };

        recognition.onend = () => {
            voiceBtn.classList.remove('listening');
        };

        recognition.start();
    }

    processVoiceCommand(transcript) {
        const amountMatch = transcript.match(/(\d+[.,]?\d*)/);
        if (amountMatch) {
            const amount = parseFloat(amountMatch[0].replace(',', '.'));
            let description = transcript.replace(amountMatch[0], '').replace(/euro|€|euros/gi, '').trim();
            
            document.getElementById('expenseName').value = description || (this.data.language === 'it' ? 'Spesa' : 'Expense');
            document.getElementById('expenseAmount').value = amount;
            
            alert(this.data.language === 'it' 
                ? `✅ Rilevato: ${description || 'Spesa'} €${amount}`
                : `✅ Detected: ${description || 'Expense'} €${amount}`);
        }
    }
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

const app = new BudgetWise();
window.app = app;
