// ============================================
// BUDGETWISE - VERSIONE PROFESSIONALE CON I18N COMPLETO
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
        
        // ========== SISTEMA DI TRADUZIONE PROFESSIONALE ==========
        // Organizzato come nelle migliori app finanziarie [citation:5]
        this.translations = {
            it: {
                // Generali
                appName: 'BudgetWise',
                appSubtitle: 'Stipendio a stipendio — gestione intelligente',
                budgetGiornaliero: 'Budget giornaliero',
                rimanenza: 'Rimanenza',
                giorniRimasti: 'Giorni rimasti',
                periodo: 'Periodo',
                totEntrate: 'Totale entrate',
                iniziaEntrate: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
                operazioneOk: '✅ Operazione completata',
                attenzione: '⚠️ Attenzione',
                errore: '❌ Errore',
                multiplo: 'multiplo',
                
                // Sezioni
                entrate: '🏦 Entrate del periodo',
                speseFisse: '📌 Spese fisse mensili',
                speseVariabili: '🧾 Spese variabili',
                grafico: '📊 Distribuzione spese',
                assistente: '🤖 Assistente Finanziario',
                risparmio: '🎯 Obiettivo risparmio',
                impostazioni: '⚙️ Impostazioni',
                
                // Form
                descrizione: 'Descrizione (es. Stipendio)',
                importo: 'Importo €',
                nomeSpesa: 'Nome (es. Mutuo)',
                giorno: 'Giorno (es. 27)',
                scadenza: 'Data scadenza',
                categoria: 'Categoria',
                selezionaData: 'Seleziona data',
                cosaAcquistato: 'Cosa hai comprato?',
                
                // Categorie
                categorie: {
                    Alimentari: '🍎 Alimentari',
                    Trasporti: '🚗 Trasporti',
                    Svago: '🎮 Svago',
                    Salute: '💊 Salute',
                    Abbigliamento: '👕 Abbigliamento',
                    Altro: '📦 Altro'
                },
                
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
                invia: 'Invia',
                
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
                placeholderChat: 'Es. Quanto posso risparmiare?',
                suggerimento1: '💶 Risparmia 100€',
                suggerimento2: '🔮 Simula aumento',
                tu: 'Tu',
                assistenteNome: 'Assistente',
                
                // Risparmio
                percentuale: 'Percentuale su entrate (%)',
                obiettivo: 'Obiettivo (€)',
                
                // Impostazioni
                sogliaAvviso: '🔔 Soglia avviso (€)',
                lingua: '🌍 Lingua / Language',
                backup: '📅 Backup dati',
                
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
                fileNonValido: '❌ File non valido',
                
                // Risposte chat
                totaleEntrate: '💰 Totale entrate: ',
                totaleSpese: '📉 Totale spese: ',
                puoiRisparmiare: '💪 Puoi risparmiare ',
                entroMese: ' entro fine mese.',
                seiInRosso: '⚠️ Sei in rosso! Rivedi le spese.',
                haiAncora: '💪 Hai ancora ',
                disponibili: ' disponibili.',
                
                // Conferme
                cancellareDati: 'Cancellare TUTTI i dati?',
                
                // Stati spese fisse
                attivo: '🟢 Attivo',
                scaduto: '🔴 Scaduto'
            },
            en: {
                // General
                appName: 'BudgetWise',
                appSubtitle: 'Paycheck to paycheck — smart management',
                budgetGiornaliero: 'Daily budget',
                rimanenza: 'Remaining',
                giorniRimasti: 'Days left',
                periodo: 'Period',
                totEntrate: 'Total income',
                iniziaEntrate: '👋 Start by adding your income below!',
                operazioneOk: '✅ Operation completed',
                attenzione: '⚠️ Warning',
                errore: '❌ Error',
                multiplo: 'multiple',
                
                // Sections
                entrate: '🏦 Period income',
                speseFisse: '📌 Monthly fixed expenses',
                speseVariabili: '🧾 Variable expenses',
                grafico: '📊 Expense distribution',
                assistente: '🤖 Financial Assistant',
                risparmio: '🎯 Savings goal',
                impostazioni: '⚙️ Settings',
                
                // Form
                descrizione: 'Description (e.g. Salary)',
                importo: 'Amount €',
                nomeSpesa: 'Name (e.g. Mortgage)',
                giorno: 'Day (e.g. 27)',
                scadenza: 'Expiry date',
                categoria: 'Category',
                selezionaData: 'Select date',
                cosaAcquistato: 'What did you buy?',
                
                // Categories
                categorie: {
                    Alimentari: '🍎 Groceries',
                    Trasporti: '🚗 Transport',
                    Svago: '🎮 Leisure',
                    Salute: '💊 Health',
                    Abbigliamento: '👕 Clothing',
                    Altro: '📦 Other'
                },
                
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
                invia: 'Send',
                
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
                placeholderChat: 'E.g. How much can I save?',
                suggerimento1: '💶 Save 100€',
                suggerimento2: '🔮 Simulate increase',
                tu: 'You',
                assistenteNome: 'Assistant',
                
                // Savings
                percentuale: 'Percentage of income (%)',
                obiettivo: 'Goal (€)',
                
                // Settings
                sogliaAvviso: '🔔 Alert threshold (€)',
                lingua: '🌍 Language',
                backup: '📅 Data backup',
                
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
                fileNonValido: '❌ Invalid file',
                
                // Chat responses
                totaleEntrate: '💰 Total income: ',
                totaleSpese: '📉 Total expenses: ',
                puoiRisparmiare: '💪 You can save ',
                entroMese: ' by end of month.',
                seiInRosso: '⚠️ You are in the red! Review your expenses.',
                haiAncora: '💪 You still have ',
                disponibili: ' available.',
                
                // Confirmations
                cancellareDati: 'Delete ALL data?',
                
                // Fixed expense status
                attivo: '🟢 Active',
                scaduto: '🔴 Expired'
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

        // Event listener cambio lingua
        document.getElementById('languageSelect').addEventListener('change', (e) => {
            this.data.language = e.target.value;
            this.saveData();
            this.applyLanguage();
            this.updateUI(); // Aggiorna liste con le traduzioni
        });
    }

    // ========== SISTEMA DI TRADUZIONE PROFESSIONALE ==========
    t(key, params = {}) {
        let translation = this.translations[this.data.language];
        
        // Supporto per chiavi annidate (es. 'categorie.Alimentari')
        const keys = key.split('.');
        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                console.warn(`Translation key not found: ${key}`);
                return key;
            }
        }
        
        // Sostituisci parametri se presenti
        if (typeof translation === 'string') {
            return translation.replace(/\{\{(\w+)\}\}/g, (match, param) => {
                return params[param] !== undefined ? params[param] : match;
            });
        }
        
        return translation || key;
    }

    applyLanguage() {
        console.log('🌍 Applico lingua:', this.data.language);
        
        // Imposta il valore del select
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) languageSelect.value = this.data.language;
        
        // Traduci testi statici [citation:6]
        document.querySelector('.subtitle').textContent = this.t('appSubtitle');
        document.getElementById('guideMessage').textContent = this.t('iniziaEntrate');
        
        // Traduci titoli sezioni
        const h2s = document.querySelectorAll('h2');
        h2s.forEach(h2 => {
            const text = h2.textContent;
            if (text.includes('🏦')) h2.innerHTML = this.t('entrate');
            else if (text.includes('📌')) h2.innerHTML = this.t('speseFisse');
            else if (text.includes('🧾')) h2.innerHTML = this.t('speseVariabili');
            else if (text.includes('📊')) h2.innerHTML = this.t('grafico');
            else if (text.includes('🤖')) h2.innerHTML = this.t('assistente');
            else if (text.includes('🎯')) h2.innerHTML = this.t('risparmio');
            else if (text.includes('⚙️')) h2.innerHTML = this.t('impostazioni');
        });
        
        // Badge
        const badge = document.querySelector('.badge');
        if (badge) badge.textContent = this.t('multiplo');
        
        // Placeholder form
        document.getElementById('incomeDesc').placeholder = this.t('descrizione');
        document.getElementById('incomeAmount').placeholder = this.t('importo');
        document.getElementById('addIncomeBtn').innerHTML = this.t('aggiungiEntrata');
        
        document.getElementById('fixedName').placeholder = this.t('nomeSpesa');
        document.getElementById('fixedAmount').placeholder = this.t('importo');
        document.getElementById('fixedDay').placeholder = this.t('giorno');
        document.getElementById('addFixedBtn').innerHTML = this.t('aggiungiSpesaFissa');
        document.getElementById('fixedVoiceStatus').textContent = this.t('microfonoFisso');
        
        const dateLabel = document.querySelector('.date-selector label');
        if (dateLabel) dateLabel.textContent = this.t('selezionaData');
        
        document.getElementById('expenseName').placeholder = this.t('cosaAcquistato');
        
        // Traduci opzioni select categoria
        const categorySelect = document.getElementById('expenseCategory');
        if (categorySelect) {
            const options = categorySelect.options;
            for (let i = 0; i < options.length; i++) {
                const value = options[i].value;
                options[i].text = this.t(`categorie.${value}`);
            }
        }
        
        document.getElementById('addExpenseBtn').innerHTML = this.t('aggiungiSpesa');
        document.getElementById('resetDayBtn').innerHTML = this.t('cancellaGiorno');
        
        const voiceBtnSpan = document.querySelector('#voiceBtn span');
        if (voiceBtnSpan) voiceBtnSpan.textContent = this.t('aggiungiSpesa');
        
        document.getElementById('voiceStatus').textContent = this.t('microfonoVariabile');
        document.getElementById('chartNote').textContent = this.t('aggiungiSpeseGrafico');
        
        // Chat
        const firstChatMessage = document.querySelector('.chat-message.bot .message-text');
        if (firstChatMessage) firstChatMessage.textContent = this.t('chiedimi');
        
        document.getElementById('chatInput').placeholder = this.t('placeholderChat');
        document.getElementById('sendChatBtn').textContent = this.t('invia');
        
        const suggestionChips = document.querySelectorAll('.suggestion-chip');
        if (suggestionChips.length >= 2) {
            suggestionChips[0].textContent = this.t('suggerimento1');
            suggestionChips[1].textContent = this.t('suggerimento2');
        }
        
        // Risparmio
        const savePercentLabel = document.querySelector('.input-group label[for="savePercent"]');
        if (savePercentLabel) savePercentLabel.textContent = this.t('percentuale');
        
        const saveGoalLabel = document.querySelector('.input-group label[for="saveGoal"]');
        if (saveGoalLabel) saveGoalLabel.textContent = this.t('obiettivo');
        
        document.getElementById('applySaveBtn').textContent = this.t('applicaRisparmio');
        
        // Impostazioni
        const settingLabels = document.querySelectorAll('.setting-item label');
        if (settingLabels.length >= 3) {
            settingLabels[0].innerHTML = this.t('sogliaAvviso');
            settingLabels[1].innerHTML = this.t('lingua');
            settingLabels[2].innerHTML = this.t('backup');
        }
        
        document.getElementById('backupBtn').innerHTML = this.t('scaricaBackup');
        document.getElementById('restoreBtn').innerHTML = this.t('ripristina');
        document.getElementById('resetAllBtn').innerHTML = this.t('resetCompleto');
        document.getElementById('exportCalendarBtn').textContent = this.t('esportaCalendario');
        
        const helpText = document.querySelector('.section-card:nth-child(6) .help-text');
        if (helpText) helpText.textContent = this.t('verraConteggiata');
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
            const status = isActive ? this.t('attivo') : this.t('scaduto');
            return `
                <div class="expense-item">
                    <div>
                        <span class="expense-name">${exp.name}</span>
                        <div class="expense-date">
                            ${this.t('giorno')} ${exp.day} · ${this.t('scadenza')}: ${exp.endDate} ${status}
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
                    <div class="expense-date">${this.t(`categorie.${exp.category}`)}</div>
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
                const catName = this.t(`categorie.${exp.category}`);
                categories[catName] = (categories[catName] || 0) + exp.amount;
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
                        position: 'bottom',
                        labels: {
                            color: 'var(--text-primary)'
                        }
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
        link.href = 'data:application/json;charset=utf-
