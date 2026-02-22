// ============================================
// BUDGETWISE - VERSIONE BASE CON TRADUZIONE
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
        
        // DIZIONARIO TRADUZIONI
        this.translations = {
            it: {
                budget: 'Budget giornaliero',
                remaining: 'Rimanenza',
                days: 'Giorni rimasti',
                period: 'Periodo',
                incomes: '🏦 Entrate del periodo',
                fixed: '📌 Spese fisse mensili',
                variable: '🧾 Spese variabili',
                chart: '📊 Distribuzione spese',
                assistant: '🤖 Assistente Finanziario',
                savings: '🎯 Obiettivo risparmio',
                settings: '⚙️ Impostazioni',
                badge: 'multiplo',
                addIncome: '➕ Aggiungi entrata',
                addFixed: '➕ Aggiungi spesa fissa',
                addExpense: '➕ Aggiungi spesa',
                resetDay: '🗑️ Cancella spese del giorno',
                apply: 'Applica risparmio',
                backup: '💾 Scarica backup',
                restore: '📂 Ripristina',
                reset: '⚠️ Reset completo',
                export: '📅 Esporta in Calendar',
                send: 'Invia',
                threshold: '🔔 Soglia avviso (€)',
                language: '🌍 Lingua / Language',
                descPlaceholder: 'Descrizione (es. Stipendio)',
                amountPlaceholder: 'Importo €',
                namePlaceholder: 'Nome (es. Mutuo)',
                dayPlaceholder: 'Giorno (es. 27)',
                expensePlaceholder: 'Cosa hai comprato?',
                dateLabel: 'Seleziona data:',
                micFixed: '🎤 Tocca e di\' tutto in una frase',
                micVariable: '🎤 Tocca per parlare',
                noIncome: 'Nessuna entrata',
                noFixed: 'Nessuna spesa fissa',
                noVariable: 'Nessuna spesa in questo giorno',
                chartNote: 'Aggiungi spese per vedere il grafico',
                helpFixed: '⏰ Verrà conteggiata automaticamente ogni mese fino alla scadenza',
                welcome: 'Ciao! Chiedimi qualsiasi cosa sul tuo budget!',
                chatPlaceholder: 'Es. Quanto posso risparmiare?',
                suggestion1: '💶 Risparmia 100€',
                suggestion2: '🔮 Simula aumento',
                percentLabel: 'Percentuale su entrate (%)',
                goalLabel: 'Obiettivo (€)',
                backupLabel: '📅 Backup dati'
            },
            en: {
                budget: 'Daily budget',
                remaining: 'Remaining',
                days: 'Days left',
                period: 'Period',
                incomes: '🏦 Period income',
                fixed: '📌 Monthly fixed expenses',
                variable: '🧾 Variable expenses',
                chart: '📊 Expense distribution',
                assistant: '🤖 Financial Assistant',
                savings: '🎯 Savings goal',
                settings: '⚙️ Settings',
                badge: 'multiple',
                addIncome: '➕ Add income',
                addFixed: '➕ Add fixed expense',
                addExpense: '➕ Add expense',
                resetDay: '🗑️ Clear day expenses',
                apply: 'Apply savings',
                backup: '💾 Download backup',
                restore: '📂 Restore',
                reset: '⚠️ Full reset',
                export: '📅 Export to Calendar',
                send: 'Send',
                threshold: '🔔 Alert threshold (€)',
                language: '🌍 Language',
                descPlaceholder: 'Description (e.g. Salary)',
                amountPlaceholder: 'Amount €',
                namePlaceholder: 'Name (e.g. Mortgage)',
                dayPlaceholder: 'Day (e.g. 27)',
                expensePlaceholder: 'What did you buy?',
                dateLabel: 'Select date:',
                micFixed: '🎤 Say everything in one phrase',
                micVariable: '🎤 Tap to speak',
                noIncome: 'No income',
                noFixed: 'No fixed expenses',
                noVariable: 'No expenses on this day',
                chartNote: 'Add expenses to see chart',
                helpFixed: '⏰ Automatically counted each month until expiry',
                welcome: 'Hi! Ask me anything about your budget!',
                chatPlaceholder: 'E.g. How much can I save?',
                suggestion1: '💶 Save 100€',
                suggestion2: '🔮 Simulate increase',
                percentLabel: 'Percentage of income (%)',
                goalLabel: 'Goal (€)',
                backupLabel: '📅 Data backup'
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
        this.applyLanguage(); // Applica lingua all'avvio
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
        document.getElementById('sendChatBtn').addEventListener('click', () => this.handleChat());
        document.getElementById('chatInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleChat();
        });

        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                document.getElementById('chatInput').value = chip.dataset.question;
                this.handleChat();
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

        // EVENTO LINGUA - VERSIONE SEMPLICE
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.data.language = e.target.value;
            this.saveData();
            this.applyLanguage();
            alert('Lingua cambiata a: ' + e.target.value); // Feedback visivo
        });
    }

    // ========== TRADUZIONE ==========
    t(key) {
        return this.translations[this.data.language][key] || key;
    }

    applyLanguage() {
        console.log('Cambio lingua a:', this.data.language);
        
        // Imposta il select
        document.getElementById('languageSelect').value = this.data.language;
        
        // SUMMARY
        const labels = document.querySelectorAll('.summary-label');
        if (labels.length >= 3) {
            labels[0].textContent = this.t('budget');
            labels[1].textContent = this.t('remaining');
            labels[2].textContent = this.t('days');
        }
        
        // TITOLI SEZIONI
        document.getElementById('incomesTitle').innerHTML = this.t('incomes');
        document.getElementById('fixedTitle').innerHTML = this.t('fixed');
        document.getElementById('variableTitle').innerHTML = this.t('variable');
        document.getElementById('chartTitle').innerHTML = this.t('chart');
        document.getElementById('assistantTitle').innerHTML = this.t('assistant');
        document.getElementById('savingsTitle').innerHTML = this.t('savings');
        document.getElementById('settingsTitle').innerHTML = this.t('settings');
        
        // BADGE
        document.getElementById('badge').textContent = this.t('badge');
        
        // PULSANTI PRINCIPALI
        document.getElementById('addIncomeBtn').innerHTML = this.t('addIncome');
        document.getElementById('addFixedBtn').innerHTML = this.t('addFixed');
        document.getElementById('addExpenseBtn').innerHTML = this.t('addExpense');
        document.getElementById('resetDayBtn').innerHTML = this.t('resetDay');
        document.getElementById('applySaveBtn').textContent = this.t('apply');
        document.getElementById('backupBtn').innerHTML = this.t('backup');
        document.getElementById('restoreBtn').innerHTML = this.t('restore');
        document.getElementById('resetAllBtn').innerHTML = this.t('reset');
        document.getElementById('exportCalendarBtn').textContent = this.t('export');
        document.getElementById('sendChatBtn').textContent = this.t('send');
        
        // LABEL IMPOSTAZIONI
        document.getElementById('thresholdLabel').innerHTML = this.t('threshold');
        document.getElementById('languageLabel').innerHTML = this.t('language');
        document.getElementById('backupLabel').textContent = this.t('backupLabel');
        
        // PLACEHOLDER
        document.getElementById('incomeDesc').placeholder = this.t('descPlaceholder');
        document.getElementById('incomeAmount').placeholder = this.t('amountPlaceholder');
        document.getElementById('fixedName').placeholder = this.t('namePlaceholder');
        document.getElementById('fixedAmount').placeholder = this.t('amountPlaceholder');
        document.getElementById('fixedDay').placeholder = this.t('dayPlaceholder');
        document.getElementById('expenseName').placeholder = this.t('expensePlaceholder');
        
        // ETICHETTE
        document.getElementById('dateLabel').textContent = this.t('dateLabel');
        document.getElementById('fixedVoiceStatus').textContent = this.t('micFixed');
        document.getElementById('voiceStatus').textContent = this.t('micVariable');
        document.getElementById('chartNote').textContent = this.t('chartNote');
        document.getElementById('fixedHelp').textContent = this.t('helpFixed');
        
        // CHAT
        document.getElementById('welcomeMessage').textContent = this.t('welcome');
        document.getElementById('chatInput').placeholder = this.t('chatPlaceholder');
        document.getElementById('suggestion1').textContent = this.t('suggestion1');
        document.getElementById('suggestion2').textContent = this.t('suggestion2');
        
        // RISPARMIO
        document.getElementById('percentLabel').textContent = this.t('percentLabel');
        document.getElementById('goalLabel').textContent = this.t('goalLabel');
        
        // PERIODO
        document.getElementById('periodInfo').textContent = `📅 ${this.t('period')}: ${this.data.periodStart} → ${this.data.periodEnd}`;
    }

    // ========== FUNZIONI BASE ==========
    calculateTotalIncome() {
        return this.data.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    }

    addIncome() {
        const desc = document.getElementById('incomeDesc').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        if (!desc || !amount) return alert('Compila i campi');
        this.data.incomes.push({desc, amount, date: new Date().toISOString().split('T')[0], id: Date.now()});
        this.saveData();
        this.updateUI();
        document.getElementById('incomeDesc').value = '';
        document.getElementById('incomeAmount').value = '';
        alert('Entrata aggiunta!');
    }

    deleteIncome(id) {
        this.data.incomes = this.data.incomes.filter(i => i.id !== id);
        this.saveData();
        this.updateUI();
    }

    addFixedExpense() {
        const name = document.getElementById('fixedName').value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount').value);
        const day = parseInt(document.getElementById('fixedDay').value);
        const endDate = document.getElementById('fixedEndDate').value;
        if (!name || !amount || !day || !endDate) return alert('Compila tutti i campi');
        this.data.fixedExpenses.push({name, amount, day, endDate, id: Date.now()});
        this.saveData();
        this.updateUI();
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
        alert('Spesa fissa aggiunta!');
    }

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(e => e.id !== id);
        this.saveData();
        this.updateUI();
    }

    addVariableExpense() {
        const date = document.getElementById('expenseDate').value;
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;
        if (!name || !amount) return alert('Inserisci nome e importo');
        if (!this.data.variableExpenses[date]) this.data.variableExpenses[date] = [];
        this.data.variableExpenses[date].push({name, amount, category, id: Date.now()});
        this.saveData();
        this.updateUI();
        this.updateChart();
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        alert('Spesa aggiunta!');
    }

    deleteVariableExpense(date, id) {
        if (this.data.variableExpenses[date]) {
            this.data.variableExpenses[date] = this.data.variableExpenses[date].filter(e => e.id !== id);
            if (this.data.variableExpenses[date].length === 0) delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
        }
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            alert('Spese del giorno cancellate');
        }
    }

    applySavings() {
        const percent = parseFloat(document.getElementById('savePercent').value) || 0;
        const goal = parseFloat(document.getElementById('saveGoal').value) || 0;
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        alert('Risparmio applicato!');
    }

    calculateTotalFixedExpenses() {
        return this.data.fixedExpenses.reduce((s, e) => s + e.amount, 0);
    }

    calculateTotalVariableExpenses() {
        let total = 0;
        Object.values(this.data.variableExpenses).forEach(d => d.forEach(e => total += e.amount));
        return total;
    }

    calculateRemaining() {
        return this.calculateTotalIncome() - this.calculateTotalFixedExpenses() - this.calculateTotalVariableExpenses();
    }

    calculateDailyBudget() {
        const days = this.getDaysLeft();
        return days > 0 ? this.calculateRemaining() / days : 0;
    }

    getDaysLeft() {
        const diff = new Date(this.data.periodEnd) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    updateUI() {
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();
        document.getElementById('periodInfo').textContent = `📅 Periodo: ${this.data.periodStart} → ${this.data.periodEnd}`;
        this.updateIncomeList();
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();
        document.getElementById('savePercent').value = this.data.savingsPercent;
        document.getElementById('saveGoal').value = this.data.savingsGoal;
        document.getElementById('thresholdInput').value = this.data.threshold;
    }

    updateIncomeList() {
        const container = document.getElementById('incomeList');
        if (!container) return;
        if (this.data.incomes.length === 0) {
            container.innerHTML = '<p class="chart-note">Nessuna entrata</p>';
            return;
        }
        container.innerHTML = this.data.incomes.map(i => `
            <div class="expense-item">
                <div><span class="expense-name">${i.desc}</span><div class="expense-date">${i.date}</div></div>
                <span class="expense-amount" style="color:var(--success)">+${this.formatCurrency(i.amount)}</span>
                <div class="expense-actions"><button onclick="app.deleteIncome(${i.id})">🗑️</button></div>
            </div>
        `).join('');
        document.getElementById('totalIncomeDisplay').textContent = this.formatCurrency(this.calculateTotalIncome());
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (this.data.fixedExpenses.length === 0) {
            container.innerHTML = '<p class="chart-note">Nessuna spesa fissa</p>';
            return;
        }
        container.innerHTML = this.data.fixedExpenses.map(e => `
            <div class="expense-item">
                <div><span class="expense-name">${e.name}</span><div class="expense-date">Giorno ${e.day}</div></div>
                <span class="expense-amount">${this.formatCurrency(e.amount)}</span>
                <div class="expense-actions"><button onclick="app.deleteFixedExpense(${e.id})">🗑️</button></div>
            </div>
        `).join('');
    }

    updateVariableExpensesList() {
        const date = document.getElementById('expenseDate').value;
        const container = document.getElementById('variableExpensesList');
        const expenses = this.data.variableExpenses[date] || [];
        if (expenses.length === 0) {
            container.innerHTML = '<p class="chart-note">Nessuna spesa in questo giorno</p>';
            return;
        }
        container.innerHTML = expenses.map(e => `
            <div class="expense-item">
                <div><span class="expense-name">${e.name}</span><div class="expense-date">${e.category}</div></div>
                <span class="expense-amount">${this.formatCurrency(e.amount)}</span>
                <div class="expense-actions"><button onclick="app.deleteVariableExpense('${date}', ${e.id})">🗑️</button></div>
            </div>
        `).join('');
    }

    updateChart() {
        const cats = {};
        Object.values(this.data.variableExpenses).forEach(d => d.forEach(e => cats[e.category] = (cats[e.category] || 0) + e.amount));
        if (Object.keys(cats).length === 0) {
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
                labels: Object.keys(cats),
                datasets: [{data: Object.values(cats), backgroundColor: ['#4361ee', '#4895ef', '#2dc653', '#ff9e00', '#ef233c', '#7209b7']}]
            }
        });
    }

    formatCurrency(amount) {
        return amount.toFixed(2).replace('.', ',') + ' €';
    }

    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
        document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('budgetwise-theme', isDark ? 'light' : 'dark');
    }

    applyTheme() {
        if (localStorage.getItem('budgetwise-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) this.data = JSON.parse(saved);
    }

    backupData() {
        const data = JSON.stringify(this.data, null, 2);
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(data);
        link.download = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        alert('Backup scaricato!');
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
                alert('Dati ripristinati!');
            } catch {
                alert('File non valido');
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm('Cancellare TUTTI i dati?')) {
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
            alert('Reset completato');
        }
    }

    handleChat() {
        const input = document.getElementById('chatInput');
        const q = input.value.trim();
        if (!q) return;
        const div = document.getElementById('chatMessages');
        div.innerHTML += `<div class="chat-message user"><span class="message-sender">👤 ${this.t('tu') || 'Tu'}:</span> <span class="message-text">${q}</span></div>`;
        input.value = '';
        setTimeout(() => {
            div.innerHTML += `<div class="chat-message bot"><span class="message-sender">🤖 ${this.t('assistantNome') || 'Assistente'}:</span> <span class="message-text">Funzione chat base</span></div>`;
        }, 500);
    }

    exportToCalendar() {
        alert('Calendario esportato!');
    }
}

// Avvio
const app = new BudgetWise();
window.app = app;
