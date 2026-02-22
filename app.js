// ============================================
// BUDGETWISE - VERSIONE CON TRADUZIONE FUNZIONANTE
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
            language: 'it', // Lingua predefinita
            periodStart: this.getDefaultPeriodStart(),
            periodEnd: this.getDefaultPeriodEnd()
        };
        
        this.chart = null;
        this.translations = {
            it: {
                // Generali
                budgetGiornaliero: 'Budget giornaliero',
                rimanenza: 'Rimanenza',
                giorniRimasti: 'Giorni rimasti',
                periodo: 'Periodo',
                totEntrate: 'Totale entrate',
                
                // Messaggi
                iniziaEntrate: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
                operazioneOk: '✅ Operazione completata',
                
                // Sezioni
                entrate: '🏦 Entrate del periodo',
                speseFisse: '📌 Spese fisse mensili',
                speseVariabili: '🧾 Spese variabili',
                grafico: '📊 Distribuzione spese',
                assistente: '🤖 Assistente Finanziario',
                risparmio: '🎯 Obiettivo risparmio',
                impostazioni: '⚙️ Impostazioni',
                
                // Etichette form
                descrizione: 'Descrizione (es. Stipendio)',
                importo: 'Importo €',
                nomeSpesa: 'Nome (es. Mutuo)',
                giorno: 'Giorno (es. 27)',
                scadenza: 'Data scadenza',
                categoria: 'Categoria',
                selezionaData: 'Seleziona data',
                cosaAcquistato: 'Cosa hai comprato?',
                
                // Pulsanti
                aggiungiEntrata: '➕ Aggiungi entrata',
                aggiungiSpesaFissa: '➕ Aggiungi spesa fissa',
                aggiungiSpesa: '➕ Aggiungi spesa',
                cancellaGiorno: '🗑️ Cancella spese del giorno',
                applicaRisparmio: 'Applica risparmio',
                scaricaBackup: '💾 Scarica backup',
                ripristina: '📂 Ripristina',
                resetCompleto: '⚠️ Reset completo',
                esportaCalendario: '📅 Esporta in Calendar',
                
                // Testi informativi
                nessunaEntrata: 'Nessuna entrata',
                nessunaSpesaFissa: 'Nessuna spesa fissa',
                nessunaSpesaGiorno: 'Nessuna spesa in questo giorno',
                aggiungiSpeseGrafico: 'Aggiungi spese per vedere il grafico',
                verraConteggiata: '⏰ Verrà conteggiata automaticamente ogni mese fino alla scadenza',
                microfonoFisso: '🎤 Tocca e di\' tutto in una frase (es. "Mutuo 500 euro giorno 27 scadenza 31 12 2030")',
                microfonoVariabile: '🎤 Tocca per parlare',
                
                // Chat
                chiedimi: 'Ciao! Chiedimi qualsiasi cosa sul tuo budget!',
                invia: 'Invia',
                placeholderChat: 'Es. Quanto posso risparmiare?',
                suggerimento1: '💶 Risparmia 100€',
                suggerimento2: '🔮 Simula aumento',
                
                // Risparmio
                percentuale: 'Percentuale su entrate (%)',
                obiettivo: 'Obiettivo (€)',
                
                // Soglia
                sogliaAvviso: '🔔 Soglia avviso (€)',
                
                // Lingua
                lingua: '🌍 Lingua / Language',
                
                // Toast
                entrataAggiunta: '✅ Entrata aggiunta!',
                entrataEliminata: '🗑️ Entrata eliminata',
                spesaFissaAggiunta: '✅ Spesa fissa aggiunta!',
                spesaEliminata: '🗑️ Spesa eliminata',
                spesaAggiunta: '✅ Spesa aggiunta!',
                risparmioApplicato: '💰 Risparmio applicato!',
                backupScaricato: '💾 Backup scaricato!',
                datiRipristinati: '📂 Dati ripristinati!',
                resetCompletato: '🔄 Reset completato',
                calendarioEsportato: '📅 Calendario esportato!',
                campiCompilati: '✅ Campi compilati',
                importoTrovato: '✅ Importo inserito',
                descrizioneInserita: '✅ Descrizione inserita',
                superataSoglia: '⚠️ Superata soglia di ',
                erroreMicrofono: '❌ Errore microfono',
                compilaCampi: '⚠️ Compila tutti i campi',
                giornoNonValido: '⚠️ Giorno non valido',
                importoNonTrovato: '❌ Importo non trovato',
                
                // Chat responses
                totaleEntrate: '💰 Totale entrate: ',
                totaleSpese: '📉 Totale spese: ',
                puoiRisparmiare: '💪 Puoi risparmiare ',
                entroMese: ' entro fine mese.',
                seiInRosso: '⚠️ Sei in rosso! Rivedi le spese.',
                haiAncora: '💪 Hai ancora ',
                disponibili: ' disponibili.',
                
                // Conferme
                cancellareDati: 'Cancellare TUTTI i dati?'
            },
            en: {
                // General
                budgetGiornaliero: 'Daily budget',
                rimanenza: 'Remaining',
                giorniRimasti: 'Days left',
                periodo: 'Period',
                totEntrate: 'Total income',
                
                // Messages
                iniziaEntrate: '👋 Start by adding your income below!',
                operazioneOk: '✅ Operation completed',
                
                // Sections
                entrate: '🏦 Period income',
                speseFisse: '📌 Monthly fixed expenses',
                speseVariabili: '🧾 Variable expenses',
                grafico: '📊 Expense distribution',
                assistente: '🤖 Financial Assistant',
                risparmio: '🎯 Savings goal',
                impostazioni: '⚙️ Settings',
                
                // Form labels
                descrizione: 'Description (e.g. Salary)',
                importo: 'Amount €',
                nomeSpesa: 'Name (e.g. Mortgage)',
                giorno: 'Day (e.g. 27)',
                scadenza: 'Expiry date',
                categoria: 'Category',
                selezionaData: 'Select date',
                cosaAcquistato: 'What did you buy?',
                
                // Buttons
                aggiungiEntrata: '➕ Add income',
                aggiungiSpesaFissa: '➕ Add fixed expense',
                aggiungiSpesa: '➕ Add expense',
                cancellaGiorno: '🗑️ Clear day expenses',
                applicaRisparmio: 'Apply savings',
                scaricaBackup: '💾 Download backup',
                ripristina: '📂 Restore',
                resetCompleto: '⚠️ Full reset',
                esportaCalendario: '📅 Export to Calendar',
                
                // Info texts
                nessunaEntrata: 'No income',
                nessunaSpesaFissa: 'No fixed expenses',
                nessunaSpesaGiorno: 'No expenses on this day',
                aggiungiSpeseGrafico: 'Add expenses to see chart',
                verraConteggiata: '⏰ Automatically counted each month until expiry',
                microfonoFisso: '🎤 Say everything in one phrase (e.g. "Mortgage 500 euro day 27 expiry 31 12 2030")',
                microfonoVariabile: '🎤 Tap to speak',
                
                // Chat
                chiedimi: 'Hi! Ask me anything about your budget!',
                invia: 'Send',
                placeholderChat: 'E.g. How much can I save?',
                suggerimento1: '💶 Save 100€',
                suggerimento2: '🔮 Simulate increase',
                
                // Savings
                percentuale: 'Percentage of income (%)',
                obiettivo: 'Goal (€)',
                
                // Threshold
                sogliaAvviso: '🔔 Alert threshold (€)',
                
                // Language
                lingua: '🌍 Language',
                
                // Toast
                entrataAggiunta: '✅ Income added!',
                entrataEliminata: '🗑️ Income deleted',
                spesaFissaAggiunta: '✅ Fixed expense added!',
                spesaEliminata: '🗑️ Expense deleted',
                spesaAggiunta: '✅ Expense added!',
                risparmioApplicato: '💰 Savings applied!',
                backupScaricato: '💾 Backup downloaded!',
                datiRipristinati: '📂 Data restored!',
                resetCompletato: '🔄 Reset completed',
                calendarioEsportato: '📅 Calendar exported!',
                campiCompilati: '✅ Fields filled',
                importoTrovato: '✅ Amount entered',
                descrizioneInserita: '✅ Description entered',
                superataSoglia: '⚠️ Threshold exceeded ',
                erroreMicrofono: '❌ Microphone error',
                compilaCampi: '⚠️ Fill all fields',
                giornoNonValido: '⚠️ Invalid day',
                importoNonTrovato: '❌ Amount not found',
                
                // Chat responses
                totaleEntrate: '💰 Total income: ',
                totaleSpese: '📉 Total expenses: ',
                puoiRisparmiare: '💪 You can save ',
                entroMese: ' by end of month.',
                seiInRosso: '⚠️ You are in the red! Review your expenses.',
                haiAncora: '💪 You still have ',
                disponibili: ' available.',
                
                // Confirmations
                cancellareDati: 'Delete ALL data?'
            }
        };
        
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.applyTheme();
        this.applyLanguage(); // Applica lingua al caricamento
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

        // Event listener per cambio lingua (FIXATO)
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.addEventListener('change', (e) => {
                console.log('Lingua cambiata a:', e.target.value);
                this.data.language = e.target.value;
                this.saveData();
                this.applyLanguage();
            });
        }
    }

    // ========== TRADUZIONE (FIXATA) ==========
    t(key) {
        return this.translations[this.data.language][key] || key;
    }

    applyLanguage() {
        console.log('Applico lingua:', this.data.language);
        
        // Imposta il valore del select
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) languageSelect.value = this.data.language;
        
        // Testi fissi
        document.querySelector('.subtitle').textContent = this.data.language === 'it' 
            ? 'Stipendio a stipendio — gestione intelligente' 
            : 'Paycheck to paycheck — smart management';
        
        // Sezioni (usando gli ID o classi specifiche)
        const sectionTitles = document.querySelectorAll('.section-card h2');
        if (sectionTitles.length >= 7) {
            sectionTitles[0].innerHTML = this.t('entrate');
            sectionTitles[1].innerHTML = this.t('speseFisse');
            sectionTitles[2].innerHTML = this.t('speseVariabili');
            sectionTitles[3].innerHTML = this.t('grafico');
            sectionTitles[4].innerHTML = this.t('assistente');
            sectionTitles[5].innerHTML = this.t('risparmio');
            sectionTitles[6].innerHTML = this.t('impostazioni');
        }
        
        // Badge
        const badge = document.querySelector('.badge');
        if (badge) badge.textContent = this.data.language === 'it' ? 'multiplo' : 'multiple';
        
        // Placeholder e testi form
        const incomeDesc = document.getElementById('incomeDesc');
        if (incomeDesc) incomeDesc.placeholder = this.t('descrizione');
        
        const incomeAmount = document.getElementById('incomeAmount');
        if (incomeAmount) incomeAmount.placeholder = this.t('importo');
        
        const addIncomeBtn = document.getElementById('addIncomeBtn');
        if (addIncomeBtn) addIncomeBtn.innerHTML = `➕ ${this.t('aggiungiEntrata')}`;
        
        const totalIncomeDisplay = document.getElementById('totalIncomeDisplay');
        if (totalIncomeDisplay) {
            const helpText = document.querySelector('#incomeList + .input-group-row + .btn-secondary + .help-text');
            if (helpText) {
                helpText.innerHTML = `📊 ${this.t('totEntrate')}: <span id="totalIncomeDisplay">${this.formatCurrency(this.calculateTotalIncome())}</span>`;
            }
        }
        
        const fixedName = document.getElementById('fixedName');
        if (fixedName) fixedName.placeholder = this.t('nomeSpesa');
        
        const fixedAmount = document.getElementById('fixedAmount');
        if (fixedAmount) fixedAmount.placeholder = this.t('importo');
        
        const fixedDay = document.getElementById('fixedDay');
        if (fixedDay) fixedDay.placeholder = this.t('giorno');
        
        const addFixedBtn = document.getElementById('addFixedBtn');
        if (addFixedBtn) addFixedBtn.innerHTML = `➕ ${this.t('aggiungiSpesaFissa')}`;
        
        const fixedVoiceStatus = document.getElementById('fixedVoiceStatus');
        if (fixedVoiceStatus) fixedVoiceStatus.textContent = this.t('microfonoFisso');
        
        const helpText = document.querySelector('.section-card:nth-child(6) .help-text');
        if (helpText) helpText.textContent = this.t('verraConteggiata');
        
        const dateLabel = document.querySelector('.date-selector label');
        if (dateLabel) dateLabel.textContent = this.t('selezionaData');
        
        const expenseName = document.getElementById('expenseName');
        if (expenseName) expenseName.placeholder = this.t('cosaAcquistato');
        
        const addExpenseBtn = document.getElementById('addExpenseBtn');
        if (addExpenseBtn) addExpenseBtn.innerHTML = `➕ ${this.t('aggiungiSpesa')}`;
        
        const resetDayBtn = document.getElementById('resetDayBtn');
        if (resetDayBtn) resetDayBtn.innerHTML = `🗑️ ${this.t('cancellaGiorno')}`;
        
        const voiceBtnSpan = document.querySelector('#voiceBtn span');
        if (voiceBtnSpan) voiceBtnSpan.textContent = this.t('aggiungiSpesa');
        
        const voiceStatus = document.getElementById('voiceStatus');
        if (voiceStatus) voiceStatus.textContent = this.t('microfonoVariabile');
        
        const chartNote = document.getElementById('chartNote');
        if (chartNote) chartNote.textContent = this.t('aggiungiSpeseGrafico');
        
        const firstChatMessage = document.querySelector('.chat-message.bot .message-text');
        if (firstChatMessage) firstChatMessage.textContent = this.t('chiedimi');
        
        const chatInput = document.getElementById('chatInput');
        if (chatInput) chatInput.placeholder = this.t('placeholderChat');
        
        const sendChatBtn = document.getElementById('sendChatBtn');
        if (sendChatBtn) sendChatBtn.textContent = this.t('invia');
        
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        if (suggestionChips.length >= 2) {
            suggestionChips[0].textContent = this.t('suggerimento1');
            suggestionChips[1].textContent = this.t('suggerimento2');
        }
        
        const savePercentLabel = document.querySelector('.input-group label[for="savePercent"]');
        if (savePercentLabel) savePercentLabel.textContent = this.t('percentuale');
        
        const saveGoalLabel = document.querySelector('.input-group label[for="saveGoal"]');
        if (saveGoalLabel) saveGoalLabel.textContent = this.t('obiettivo');
        
        const applySaveBtn = document.getElementById('applySaveBtn');
        if (applySaveBtn) applySaveBtn.textContent = this.t('applicaRisparmio');
        
        const thresholdLabel = document.querySelector('.setting-item label[for="thresholdInput"]');
        if (thresholdLabel) thresholdLabel.innerHTML = this.t('sogliaAvviso');
        
        const languageLabel = document.querySelector('.setting-item label[for="languageSelect"]');
        if (languageLabel) languageLabel.innerHTML = this.t('lingua');
        
        const backupBtn = document.getElementById('backupBtn');
        if (backupBtn) backupBtn.innerHTML = this.t('scaricaBackup');
        
        const restoreBtn = document.getElementById('restoreBtn');
        if (restoreBtn) restoreBtn.innerHTML = this.t('ripristina');
        
        const resetAllBtn = document.getElementById('resetAllBtn');
        if (resetAllBtn) resetAllBtn.innerHTML = this.t('resetCompleto');
        
        const exportCalendarBtn = document.getElementById('exportCalendarBtn');
        if (exportCalendarBtn) exportCalendarBtn.textContent = this.t('esportaCalendario');
        
        const guideMessage = document.getElementById('guideMessage');
        if (guideMessage) guideMessage.textContent = this.t('iniziaEntrate');
        
        // Aggiorna i placeholder delle opzioni del select categoria (non traducibili direttamente)
        // ma lasciamo le icone
    }

    // ========== ENTRATE ==========
    calculateTotalIncome() {
        return this.data.incomes.reduce((sum, inc) => sum + inc.amount, 0);
    }

    addIncome() {
        const desc = document.getElementById('incomeDesc').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        
        if (!desc || !amount) {
            this.showToast(this.t('compilaCampi'), 'error');
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
        this.showToast(this.t('entrataAggiunta'));
        
        document.getElementById('incomeDesc').value = '';
        document.getElementById('incomeAmount').value = '';
    }

    deleteIncome(id) {
        this.data.incomes = this.data.incomes.filter(inc => inc.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast(this.t('entrataEliminata'));
    }

    // ========== SPESE FISSE ==========
    addFixedExpense() {
        const name = document.getElementById('fixedName').value.trim();
        const amount = parseFloat(document.getElementById('fixedAmount').value);
        const day = parseInt(document.getElementById('fixedDay').value);
        const endDate = document.getElementById('fixedEndDate').value;

        if (!name || !amount || !day || !endDate) {
            this.showToast(this.t('compilaCampi'), 'error');
            return;
        }

        if (day < 1 || day > 31) {
            this.showToast(this.t('giornoNonValido'), 'error');
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
        this.showToast(this.t('spesaFissaAggiunta'));
        
        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    deleteFixedExpense(id) {
        this.data.fixedExpenses = this.data.fixedExpenses.filter(exp => exp.id !== id);
        this.saveData();
        this.updateUI();
        this.showToast(this.t('spesaEliminata'));
    }

    // ========== SPESE VARIABILI ==========
    addVariableExpense() {
        const date = document.getElementById('expenseDate').value;
        const name = document.getElementById('expenseName').value.trim();
        const amount = parseFloat(document.getElementById('expenseAmount').value);
        const category = document.getElementById('expenseCategory').value;

        if (!name || !amount) {
            this.showToast(this.t('compilaCampi'), 'error');
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
        this.showToast(this.t('spesaAggiunta'));
        
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
            this.showToast(this.t('spesaEliminata'));
        }
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses[date]) {
            delete this.data.variableExpenses[date];
            this.saveData();
            this.updateUI();
            this.updateChart();
            this.showToast(this.t('cancellaGiorno'));
        }
    }

    checkThreshold(date) {
        const today = new Date().toISOString().split('T')[0];
        if (date !== today) return;
        
        const totalSpent = this.calculateTotalVariableExpenses();
        if (totalSpent > this.data.threshold) {
            this.showToast(this.t('superataSoglia') + this.formatCurrency(this.data.threshold), 'error');
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
        this.showToast(this.t('risparmioApplicato'));
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
        document.getElementById('periodInfo').textContent = `📅 ${this.t('periodo')}: ${this.data.periodStart} → ${this.data.periodEnd}`;
        
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
        document.getElementById('guideMessage').textContent = this.t('iniziaEntrate');
    }

    updateIncomeList() {
        const container = document.getElementById('incomeList');
        if (!container) return;
        
        if (this.data.incomes.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('nessunaEntrata')}</p>`;
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
            container.innerHTML = `<p class="chart-note">${this.t('nessunaSpesaFissa')}</p>`;
            return;
        }

        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const isActive = new Date(exp.endDate) >= new Date();
            return `
                <div class="expense-item">
                    <div>
                        <span class="expense-name">${exp.name}</span>
                        <div class="expense-date">
                            ${this.t('giorno')} ${exp.day} · ${this.t('scadenza')}: ${exp.endDate} ${isActive ? '🟢' : '🔴'}
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
            container.innerHTML = `<p class="chart-note">${this.t('nessunaSpesaGiorno')}</p>`;
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
        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        link.download = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        this.showToast(this.t('backupScaricato'));
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
                this.showToast(this.t('datiRipristinati'));
            } catch {
                this.showToast(this.t('erroreMicrofono'), 'error');
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm(this.t('cancellareDati'))) {
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
            this.showToast(this.t('resetCompletato'));
        }
    }

    // ========== CHAT ==========
    handleChat() {
        const input = document.getElementById('chatInput');
        const question = input.value.trim();
        if (!question) return;

        this.addChatMessage('👤 ' + (this.data.language === 'it' ? 'Tu' : 'You'), question);
        input.value = '';

        setTimeout(() => {
            const answer = this.generateAnswer(question);
            this.addChatMessage('🤖 ' + (this.data.language === 'it' ? 'Assistente' : 'Assistant'), answer);
        }, 500);
    }

    addChatMessage(sender, text) {
        const container = document.getElementById('chatMessages');
        const div = document.createElement('div');
        div.className = `chat-message ${sender.includes('Tu') || sender.includes('You') ? 'user' : 'bot'}`;
        div.innerHTML = `<span class="message-sender">${sender}:</span> <span class="message-text">${text}</span>`;
        container.appendChild(div);
        container.scrollTop = container.scrollHeight;
    }

    generateAnswer(question) {
        const q = question.toLowerCase();
        const remaining = this.calculateRemaining();
        const totalIncome = this.formatCurrency(this.calculateTotalIncome());
        const totalExpenses = this.formatCurrency(this.calculateTotalFixedExpenses() + this.calculateTotalVariableExpenses());
        
        if (q.includes('income') || q.includes('earn') || q.includes('entrate') || q.includes('guadagni')) {
            return this.t('totaleEntrate') + totalIncome;
        }
        if (q.includes('spese') || q.includes('expenses') || q.includes('speso') || q.includes('spent')) {
            return this.t('totaleSpese') + totalExpenses;
        }
        if (q.includes('save') || q.includes('risparmi')) {
            return this.t('puoiRisparmiare') + this.formatCurrency(remaining) + this.t('entroMese');
        }
        if (remaining < 0) {
            return this.t('seiInRosso');
        }
        return this.t('haiAncora') + this.formatCurrency(remaining) + this.t('disponibili');
    }

    // ========== ESPORTAZIONE CALENDARIO ==========
    exportToCalendar() {
        let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        
        this.data.fixedExpenses.forEach(exp => {
            if (new Date(exp.endDate) >= new Date()) {
                ics += "BEGIN:VEVENT\n";
                ics += `SUMMARY:💰 ${exp.name}\n`;
                ics += `DESCRIPTION:€${exp.amount} - ${this.t('giorno')} ${exp.day}\n`;
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
        this.showToast(this.t('calendarioEsportato'));
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
        
        const micIncomeDesc = document.getElementById('micIncomeDescBtn');
        if (micIncomeDesc) {
            micIncomeDesc.addEventListener('click', () => this.startVoice('micIncomeDescBtn'));
        }
        
        const micIncomeAmount = document.getElementById('micIncomeAmountBtn');
        if (micIncomeAmount) {
            micIncomeAmount.addEventListener('click', () => this.startVoice('micIncomeAmountBtn'));
        }
        
        const micFixed = document.getElementById('micFixedBtn');
        if (micFixed) {
            micFixed.addEventListener('click', () => this.startVoice('micFixedBtn'));
        }
        
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.startVoice('voiceBtn'));
        }
        
        const chatVoice = document.getElementById('chatVoiceBtn');
        if (chatVoice) {
            chatVoice.addEventListener('click', () => this.startVoice('chatVoiceBtn'));
        }
    }

    disableVoiceButtons() {
        document.querySelectorAll('.mic-icon-btn, .voice-btn, .chat-voice-btn, .voice-fixed-btn').forEach(btn => {
            btn.disabled = true;
            btn.style.opacity = '0.5';
            btn.title = this.t('microfonoNonSupportato');
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
        let message = this.t('ascolto');
        
        if (buttonId === 'micFixedBtn') {
            timeoutSeconds = 15;
            message = this.t('parlaCalma');
        } else if (buttonId === 'voiceBtn') {
            timeoutSeconds = 8;
            message = this.t('parlaOra');
        } else if (buttonId === 'chatVoiceBtn') {
            timeoutSeconds = 10;
            message = this.t('faiDomanda');
        }
        
        this.showToast(message, 'success');

        recognition.onresult = (event) => {
            const text = event.results[0][0].transcript;
            console.log('Riconosciuto:', text);
            
            switch(buttonId) {
                case 'micIncomeDescBtn':
                    document.getElementById('incomeDesc').value = text;
                    this.showToast(this.t('descrizioneInserita'));
                    break;
                    
                case 'micIncomeAmountBtn':
                    const numbers = text.match(/(\d+[.,]?\d*)/);
                    if (numbers) {
                        document.getElementById('incomeAmount').value = parseFloat(numbers[0].replace(',', '.'));
                        this.showToast(this.t('importoTrovato'));
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
            this.showToast(this.t('erroreMicrofono'), 'error');
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
        let name = words[0] || (this.data.language === 'it' ? 'Spesa' : 'Expense');
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
        
        this.showToast(this.t('campiCompilati'));
    }

    parseVariableExpense(text) {
        const amountMatch = text.match(/(\d+[.,]?\d*)/);
        if (!amountMatch) {
            this.showToast(this.t('importoNonTrovato'), 'error');
            return;
        }
        
        const amount = parseFloat(amountMatch[0].replace(',', '.'));
        let description = text.replace(amountMatch[0], '').replace(/euro|€/gi, '').trim();
        
        document.getElementById('expenseName').value = description || (this.data.language === 'it' ? 'Spesa' : 'Expense');
        document.getElementById('expenseAmount').value = amount;
        
        this.showToast(this.t('spesaAggiunta'));
    }
}

// ============================================
// AVVIO
// ============================================

const app = new BudgetWise();
window.app = app;
