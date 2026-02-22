// ============================================
// BUDGETWISE 2.0 - VERSIONE TEST TRADUZIONI
// ============================================

const translations = {
    it: {
        appTitle: '💰 BudgetWise ITALIANO',
        appSubtitle: 'Test traduzioni - IT',
        dailyBudget: 'Budget giornaliero IT',
        remaining: 'Rimanenza IT',
        daysLeft: 'Giorni rimasti IT',
        btnSaveIncome: 'Salva entrate IT',
        categoryGrocery: '🍎 Alimentari IT',
    },
    en: {
        appTitle: '💰 BudgetWise ENGLISH',
        appSubtitle: 'Test translations - EN',
        dailyBudget: 'Daily budget EN',
        remaining: 'Remaining EN',
        daysLeft: 'Days left EN',
        btnSaveIncome: 'Save income EN',
        categoryGrocery: '🍎 Groceries EN',
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
        
        this.init();
    }

    t(key) {
        try {
            const lang = this.data?.language || 'it';
            return translations[lang][key] || key;
        } catch (e) {
            return key;
        }
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.updateUI();
        
        // Mostra un avviso per debug
        console.log('App inizializzata, lingua:', this.data.language);
        alert('App avviata! Lingua corrente: ' + this.data.language);
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
        // Lingua
        const languageSelect = document.getElementById('languageSelect');
        if (languageSelect) {
            languageSelect.value = this.data.language;
            
            languageSelect.addEventListener('change', (e) => {
                this.data.language = e.target.value;
                this.saveData();
                this.updateUI();
                alert('Lingua cambiata a: ' + this.data.language);
            });
        }
        
        // Altri listener minimi
        const saveIncomeBtn = document.getElementById('saveIncomeBtn');
        if (saveIncomeBtn) {
            saveIncomeBtn.addEventListener('click', () => {
                alert('Clicked: ' + this.t('btnSaveIncome'));
            });
        }
    }

    updateUI() {
        try {
            // Aggiorna TITOLO PRINCIPALE (dovrebbe cambiare)
            const appTitle = document.getElementById('appTitle');
            if (appTitle) {
                appTitle.innerHTML = this.t('appTitle') + ' <span class="version">2.0</span>';
            }
            
            // Aggiorna SUBTITLE
            const appSubtitle = document.getElementById('appSubtitle');
            if (appSubtitle) {
                appSubtitle.textContent = this.t('appSubtitle');
            }
            
            // Aggiorna LABEL del riepilogo
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
            
            // Aggiorna BOTTONE
            const saveIncomeBtn = document.getElementById('saveIncomeBtn');
            if (saveIncomeBtn) {
                saveIncomeBtn.textContent = this.t('btnSaveIncome');
            }
            
            // Aggiorna CATEGORIA
            const categorySelect = document.getElementById('expenseCategory');
            if (categorySelect && categorySelect.options[0]) {
                categorySelect.options[0].text = this.t('categoryGrocery');
            }
            
            console.log('UI aggiornata a:', this.data.language);
        } catch (e) {
            console.error('Errore updateUI:', e);
        }
    }

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            this.data = JSON.parse(saved);
        }
    }
}

// Avvia tutto quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    window.app = new BudgetWise();
});
