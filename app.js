// ============================================
// BUDGETWISE - VERSIONE CON MICROFONO FUNZIONANTE
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
            periodStart: this.getDefaultPeriodStart(),
            periodEnd: this.getDefaultPeriodEnd()
        };
        
        this.chart = null;
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.updateUI();
        this.updateChart();
        this.setupVoice();
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
    }

    // ========== ENTRATE ==========
    calculateTotalIncome() {
        return this.data.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    }

    addIncome() {
        const desc = document.getElementById('incomeDesc').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        
        if (!desc || !amount) {
            this.showToast('⚠️ Inserisci descrizione e importo', 'error');
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
        this.showToast('✅ Entrata aggiunta!');
        
        document.getElementById('incomeDesc').value = '';
        document.getElementById('incomeAmount').value = '';
    }

    deleteIncome(id) {
        this.data.incomes = this.data.incomes.filter(inc => inc.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast('🗑️ Entrata eliminata');
    }

    // ========== SPESE FISSE ==========
    addFixedExpense() {
        const name = document.getElementById('fixedName').value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount').value);
        const day = parseInt(document.getElementById('fixedDay').value);
        const endDate = document.getElementById('fixedEndDate').value;

        if (!name || !amount || !day || !endDate) {
            this.showToast('⚠️ Compila tutti i campi', 'error');
            return;
        }

        if (day < 1 || day > 31) {
            this.showToast('⚠️ Giorno non valido', 'error');
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
        this.showToast('✅ Spesa fissa aggiunta!');
        
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(exp => exp.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast('🗑️ Spesa eliminata');
    }

    // ========== SPESE VARIABILI ==========
    addVariableExpense() {
        const date = document.getElementById('expenseDate').value;
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

        if (!name || !amount) {
            this.showToast('⚠️ Inserisci nome e importo', 'error');
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
        this.showToast('✅ Spesa aggiunta!');
        
        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        
        this.checkThreshold(date);
    }

    deleteVariableExpense(date, id) {
        if (this.data.variableExpenses[date]) {
            this.data.variableExpenses[date] = this.data.variableExpenses[date].filter(exp => exp.id !== id);
            if (this.data.variableExpenses[date].length === 0) delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast('🗑️ Spesa eliminata');
        }
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast('🗑️ Spese del giorno cancellate');
        }
    }

    checkThreshold(date) {
        const today = new Date().toISOString().split('T')[0];
        if (date !== today) return;
        
        const totalSpent = this.calculateTotalVariableExpenses();
        if (totalSpent > this.data.threshold) {
            this.showToast(`⚠️ Superata soglia di ${this.formatCurrency(this.data.threshold)}`, 'error');
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
        this.showToast('💰 Risparmio applicato!');
    }

    // ========== CALCOLI ==========
    calculateTotalFixedExpenses() {
        const today = new Date();
        return this.data.fixedExpenses.reduce((sum, exp) => {
            if (new Date(exp.endDate) < today) return sum;
            return sum + exp.amount;
        }, 0);
    }

    calculateTotalVariableExpenses() {
        let total = 0;
        Object.values(this.data.variableExpenses).forEach(day => {
            day.forEach(exp => total += exp.amount);
        });
        return total;
    }

    calculateRemaining() {
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpenses();
        const savings = (totalIncome * this.data.savingsPercent) / 100;
        const budget = totalIncome - totalFixed - savings;
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
        const diff = Math.ceil((end - today) / (1000 * 60 * 60 * 24));
        return Math.max(0, diff);
    }

    calculateSavingsProgress() {
        if (!this.data.savingsGoal) return 0;
        const totalIncome = this.calculateTotalIncome();
        const saved = (totalIncome * this.data.savingsPercent) / 100;
        return (saved / this.data.savingsGoal) * 100;
    }

    // ========== UI ==========
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

        const progress = this.calculateSavingsProgress();
        if (progress > 0 && this.data.savingsGoal) {
            document.getElementById('progressContainer').style.display = 'block';
            document.getElementById('progressBar').style.width = Math.min(progress, 100) + '%';
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
            container.innerHTML = '<p class="chart-note">Nessuna entrata</p>';
            return;
        }
        
        container.innerHTML = this.data.incomes.map(inc => `
            <div class="expense-item">
                <div>
                    <span class="expense-name">${inc.desc}</span>
                    <div class="expense-date">${inc.date}</div>
                </div>
                <span class="expense-amount" style="color: var(--success)">+${this.formatCurrency(inc.amount)}</span>
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
            container.innerHTML = '<p class="chart-note">Nessuna spesa fissa</p>';
            return;
        }

        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const isActive = new Date(exp.endDate) >= new Date();
            return `
                <div class="expense-item">
                    <div>
                        <span class="expense-name">${exp.name}</span>
                        <div class="expense-date">
                            Giorno ${exp.day} · Scadenza: ${exp.endDate} ${isActive ? '🟢' : '🔴'}
                        </div>
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
            container.innerHTML = '<p class="chart-note">Nessuna spesa in questo giorno</p>';
            return;
        }

        container.innerHTML = expenses.map(exp => `
            <div class="expense-item">
                <div>
                    <span class="expense-name">${exp.name}</span>
                    <div class="expense-date">${exp.category}</div>
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
            day.forEach(exp => {
                categories[exp.category] = (categories[exp.category] || 0) + exp.amount;
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
                    backgroundColor: ['#4361ee', '#4895ef', '#2dc653', '#ff9e00', '#ef233c', '#7209b7']
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

    formatCurrency(amount) {
        return amount.toFixed(2).replace('.', ',') + ' €';
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = type === 'success' ? '#2dc653' : '#ef233c';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    // ========== TEMA ==========
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

    // ========== PERSISTENZA ==========
    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.income !== undefined && !parsed.incomes) {
                parsed.incomes = [{
                    desc: 'Stipendio',
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
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        link.download = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        this.showToast('💾 Backup scaricato!');
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
                this.showToast('📂 Dati ripristinati!');
            } catch {
                this.showToast('❌ File non valido', 'error');
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
                periodStart: this.getDefaultPeriodStart(),
                periodEnd: this.getDefaultPeriodEnd()
            };
            this.updateUI();
            this.updateChart();
            this.showToast('🔄 Reset completato');
        }
    }

    // ========== CHAT ==========
    handleChat() {
        const input = document.getElementById('chatInput');
        const question = input.value.trim();
        if (!question) return;

        this.addChatMessage('👤 Tu', question);
        input.value = '';

        setTimeout(() => {
            const answer = this.generateAnswer(question);
            this.addChatMessage('🤖 Assistente', answer);
        }, 500);
    }

    addChatMessage(sender, text) {
        const container = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = `chat-message ${sender === '👤 Tu' ? 'user' : 'bot'}`;
        div.innerHTML = `<span class="message-sender">${sender}:</span> <span class="message-text">${text}</span>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    generateAnswer(question) {
        const q = question.toLowerCase();
        const remaining = this.calculateRemaining();
        const totalIncome = this.formatCurrency(this.calculateTotalIncome());
        const totalExpenses = this.formatCurrency(this.calculateTotalFixedExpenses() + this.calculateTotalVariableExpenses());
        
        if (q.includes('entrate') || q.includes('guadagni')) {
            return `💰 Totale entrate: ${totalIncome}`;
        }
        if (q.includes('spese') || q.includes('speso')) {
            return `📉 Totale spese: ${totalExpenses}`;
        }
        if (q.includes('risparmi') || q.includes('risparmiare')) {
            return `💪 Puoi risparmiare ${this.formatCurrency(remaining)} entro fine mese.`;
        }
        if (remaining < 0) {
            return "⚠️ Sei in rosso! Rivedi le spese.";
        }
        return `💪 Hai ancora ${this.formatCurrency(remaining)} disponibili.`;
    }

    // ========== ESPORTAZIONE CALENDARIO ==========
    exportToCalendar() {
        let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        
        this.data.fixedExpenses.forEach(exp => {
            if (new Date(exp.endDate) >= new Date()) {
                ics += "BEGIN:VEVENT\n";
                ics += `SUMMARY:💰 ${exp.name}\n`;
                ics += `DESCRIPTION:€${exp.amount} - giorno ${exp.day}\n`;
                ics += `DTSTART;VALUE=DATE:${exp.endDate.replace(/-/g, '')}\n`;
                ics += "END:VEVENT\n";
            }
        });

        Object.entries(this.data.variableExpenses).forEach(([date, expenses]) => {
            expenses.forEach(exp => {
                ics += "BEGIN:VEVENT\n";
                ics += `SUMMARY:🛒 ${exp.name}\n`;
                ics += `DESCRIPTION:${exp.category} - ${this.formatCurrency(exp.amount)}\n`;
                ics += `DTSTART;VALUE=DATE:${date.replace(/-/g, '')}\n`;
                ics += "END:VEVENT\n";
            });
        });

        ics += "END:VCALENDAR";
        
        const blob = new Blob([ics], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `budgetwise-${this.data.periodStart}.ics`;
        a.click();
        this.showToast('📅 Calendario esportato!');
    }

    // ========== VOCE ==========
    setupVoice() {
        console.log('Setup voice...');
        
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.log('❌ Riconoscimento vocale non supportato');
            this.disableVoiceButtons();
            return;
        }
        
        console.log('✅ Riconoscimento vocale supportato');
        
        // Microfono entrate - descrizione
        const micIncomeDesc = document.getElementById('micIncomeDescBtn');
        if (micIncomeDesc) {
            micIncomeDesc.addEventListener('click', () => this.startVoice('micIncomeDescBtn'));
        }
        
        // Microfono entrate - importo
        const micIncomeAmount = document.getElementById('micIncomeAmountBtn');
        if (micIncomeAmount) {
            micIncomeAmount.addEventListener('click', () => this.startVoice('micIncomeAmountBtn'));
        }
        
        // Microfono spese fisse
        const micFixed = document.getElementById('micFixedBtn');
        if (micFixed) {
            micFixed.addEventListener('click', () => this.startVoice('micFixedBtn'));
        }
        
        // Microfono spese variabili
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.startVoice('voiceBtn'));
        }
        
        // Microfono chat
        const chatVoice = document.getElementById('chatVoiceBtn');
        if (chatVoice) {
            chatVoice.addEventListener('click', () => this.startVoice('chatVoiceBtn'));
        }
    }

    disableVoiceButtons() {
        document.querySelectorAll('.mic-icon-btn, .voice-btn, .chat-voice-btn, .voice-fixed-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.title = 'Microfono non supportato';
        });
    }

    startVoice(buttonId) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'it-IT';
        recognition.interimResults = false;

        const button = document.getElementById(buttonId);
        if (!button) return;
        
        button.classList.add('listening');
        
        let timeoutSeconds = 5;
        let message = '🎤 Ascolto...';
        
        if (buttonId === 'micFixedBtn') {
            timeoutSeconds = 15;
            message = '🎤 Parla con calma (15 secondi)...';
        } else if (buttonId === 'voiceBtn') {
            timeoutSeconds = 8;
            message = '🎤 Parla ora (8 secondi)...';
        } else if (buttonId === 'chatVoiceBtn') {
            timeoutSeconds = 10;
            message = '🎤 Fai la tua domanda...';
        } else if (buttonId === 'micIncomeDescBtn' || buttonId === 'micIncomeAmountBtn') {
            timeoutSeconds = 5;
            message = '🎤 Parla ora...';
        }
        
        this.showToast(message, 'success');

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            console.log('Riconosciuto:', text);
            
            switch(buttonId) {
                case 'micIncomeDescBtn':
                    document.getElementById('incomeDesc').value = text;
                    this.showToast('✅ Descrizione inserita');
                    break;
                    
                case 'micIncomeAmountBtn':
                    const numbers = text.match(/(\d+[.,]?\d*)/);
                    if (numbers) {
                        document.getElementById('incomeAmount').value = parseFloat(numbers[0].replace(',', '.'));
                        this.showToast('✅ Importo inserito');
                    }
                    break;
                    
                case 'micFixedBtn':
                    this.parseFixedExpense(text);
                    break;
                    
                case 'voiceBtn':
                    this.parseVariableExpense(text);
                    break;
                    
                case 'chatVoiceBtn':
                    document.getElementById('chatInput').value = text;
                    this.handleChat();
                    break;
            }
            
            button.classList.remove('listening');
        };

        recognition.onerror = (event) => {
            console.error('Errore microfono:', event.error);
            this.showToast('❌ Errore microfono', 'error');
            button.classList.remove('listening');
        };

        recognition.onend = () => {
            button.classList.remove('listening');
        };

        recognition.start();

        setTimeout(() => {
            recognition.stop();
            button.classList.remove('listening');
        }, timeoutSeconds * 1000);
    }

    parseFixedExpense(text) {
        const words = text.split(' ');
        let name = words[0] || 'Spesa';
        if (name.length > 20) name = name.substring(0, 20);
        
        const amountMatch = text.match(/(\d+[.,]?\d*)/);
        const amount = amountMatch ? parseFloat(amountMatch[0].replace(',', '.')) : 0;
        
        const dayMatch = text.match(/(\d{1,2})/g);
        let day = 1;
        if (dayMatch && dayMatch.length > 0) {
            for (let d of dayMatch) {
                const candidate = parseInt(d);
                if (candidate >= 1 && candidate <= 31 && candidate !== Math.round(amount)) {
                    day = candidate;
                    break;
                }
            }
        }
        
        const dateMatch = text.match(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/);
        let endDate = '';
        if (dateMatch) {
            endDate = `${dateMatch[3]}-${dateMatch[2].padStart(2,'0')}-${dateMatch[1].padStart(2,'0')}`;
        } else {
            const d = new Date();
            d.setFullYear(d.getFullYear() + 10);
            endDate = d.toISOString().split('T')[0];
        }
        
        document.getElementById('fixedName').value = name;
        document.getElementById('fixedAmount').value = amount;
        document.getElementById('fixedDay').value = day;
        document.getElementById('fixedEndDate').value = endDate;
        
        this.showToast('✅ Campi compilati');
    }

    parseVariableExpense(text) {
        const amountMatch = text.match(/(\d+[.,]?\d*)/);
        if (!amountMatch) {
            this.showToast('❌ Importo non trovato', 'error');
            return;
        }
        
        const amount = parseFloat(amountMatch[0].replace(',', '.'));
        let description = text.replace(amountMatch[0], '').replace(/euro|€/gi, '').trim();
        
        document.getElementById('expenseName').value = description || 'Spesa';
        document.getElementById('expenseAmount').value = amount;
        
        this.showToast('✅ Spesa inserita');
    }
}

// ============================================
// AVVIO
// ============================================

const app = new BudgetWise();
window.app = app;
