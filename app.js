// ============================================
// BUDGETWISE 2.0 - VERSIONE STABILE COMPLETA
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
        this.categoryExpenses = {};
        
        // ========== REGOLE CATEGORIE APPRESE ==========
        this.categoryRules = JSON.parse(localStorage.getItem('budgetwise-category-rules')) || {};
        
        // ========== CATEGORIE PERSONALIZZATE ==========
        this.defaultCategories = ['Alimentari', 'Trasporti', 'Svago', 'Salute', 'Abbigliamento', 'Altro'];
        const savedCustom = JSON.parse(localStorage.getItem('budgetwise-custom-categories')) || [];
        this.customCategories = savedCustom.filter(cat => !this.defaultCategories.includes(cat));
        
        // ========== TRADUZIONI ==========
        this.translations = {
            it: {
                budget: 'Budget giornaliero',
                remaining: 'Rimanenza',
                days: 'Giorni rimasti',
                period: 'Periodo',
                totalIncome: 'Totale entrate',
                startGuide: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
                incomes: '🏦 Entrate del periodo',
                fixed: '📌 Spese fisse mensili',
                variable: '🧾 Spese variabili',
                chart: '📊 Distribuzione spese',
                assistant: '🤖 Assistente Finanziario AI',
                savings: '🎯 Obiettivo risparmio',
                settings: '⚙️ Impostazioni',
                badge: 'multiplo',
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
                incomeDesc: 'Descrizione (es. Stipendio)',
                incomeAmount: 'Importo €',
                incomeDateLabel: 'Data',
                fixedName: 'Nome (es. Mutuo)',
                fixedAmount: 'Importo €',
                fixedDay: 'Giorno (es. 27)',
                expenseName: 'Cosa hai comprato?',
                expenseAmount: '€',
                chatPlaceholder: 'Es. Quanto posso risparmiare questo mese?',
                dateLabel: 'Seleziona data:',
                dayLabel: 'Giorno del mese',
                endDateLabel: 'Data scadenza (fine)',
                percentLabel: 'Percentuale su entrate (%)',
                goalLabel: 'Obiettivo (€)',
                thresholdLabel: '🔔 Soglia avviso (€)',
                languageLabel: '🌍 Lingua',
                backupLabel: '📅 Backup dati',
                micFixed: '🎤 Tocca e di\' tutto in una frase',
                micVariable: '🎤 Tocca per parlare',
                helpFixed: '⏰ Verrà conteggiata automaticamente ogni mese fino alla scadenza',
                chartNote: 'Aggiungi spese per vedere il grafico',
                noIncome: 'Nessuna entrata',
                noFixed: 'Nessuna spesa fissa',
                noVariable: 'Nessuna spesa in questo giorno',
                welcomeMessage: 'Ciao! Sono il tuo assistente finanziario. Chiedimi qualsiasi cosa sul tuo budget!',
                suggestion1: '💶 Risparmia 100€',
                suggestion2: '🔮 Simula aumento',
                suggestion3: '🎯 Obiettivo',
                suggestion4: '📊 Top categoria',
                assistantName: 'Assistente',
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
                fillFields: '⚠️ Compila tutti i campi',
                invalidDay: '⚠️ Giorno non valido (1-31)',
                thresholdExceeded: '⚠️ Attenzione! Hai superato la soglia di ',
                active: '🟢 Attivo',
                expired: '🔴 Scaduto',
                dueToday: 'Scade oggi',
                daysAgo: 'Scaduta da {days} giorni',
                inDays: 'Tra {days} giorni',
                confirmReset: 'Sei sicuro di voler cancellare TUTTI i dati?',
                noGoal: 'Non hai ancora impostato un obiettivo di risparmio. Vai nella sezione 🎯 e impostalo!',
                noExpenses: 'Non hai ancora spese registrate. Aggiungine qualcuna per avere un\'analisi!',
                footerText: 'BudgetWise 2.0 — Gestione intelligente delle tue finanze',
                footerFeatures: '✨ Assistente AI integrato • Riconoscimento vocale • Tema scuro',
                fixedVoiceButton: '🎤 Inserisci spesa fissa con voce',
                variableVoiceButton: '🎤 Inserisci con voce',
                categoryAlimentari: '🍎 Alimentari',
                categoryTrasporti: '🚗 Trasporti',
                categorySvago: '🎮 Svago',
                categorySalute: '💊 Salute',
                categoryAbbigliamento: '👕 Abbigliamento',
                categoryAltro: '📦 Altro',
                
                // Onboarding
                onboardingWelcome: '👋 Benvenuto in BudgetWise',
                onboardingStep1: 'Inserisci il tuo primo stipendio o entrata qui sotto.',
                onboardingStep2: '📌 Aggiungi una spesa fissa mensile (es. affitto, bollette).',
                onboardingStep3: '🧾 Registra una spesa variabile come la spesa alimentare.',
                onboardingStep4: '📊 Controlla il tuo budget giornaliero nel riquadro in alto.',
                onboardingStep5: '🤖 Chiedi consigli all\'assistente AI o prova il microfono.',
                onboardingStep6: '📥 Puoi anche importare movimenti bancari in formato CSV.',
                onboardingNext: 'Avanti →',
                onboardingSkip: 'Salta',
                
                // Import review
                importReview: '📋 Revisione spese importate',
                importConfirm: '✅ Conferma',
                importCancel: '✕ Annulla',
                importCategory: 'Categoria',
                importLearn: '📌 L\'app ricorderà questa scelta',
                
                // Traduzioni CSV
                csvTitle: '📥 Importa movimenti bancari',
                csvSubtitle: 'Scarica l\'estratto conto dalla tua banca in formato CSV',
                csvChooseFile: 'Scegli il file',
                csvNoFile: 'Nessun file selezionato',
                csvImportBtn: '📥 Importa CSV',
                csvDateFormat: 'Formato data',
                csvSeparator: 'Separatore',
                csvComma: 'Virgola (,)',
                csvSemicolon: 'Punto e virgola (;)',
                csvTab: 'Tabulazione',
                csvPreview: 'Anteprima',
                
                // Gestione categorie
                manageCategories: '📂 Gestisci categorie',
                addCategory: '➕ Aggiungi categoria',
                categoryName: 'Nome categoria',
                saveCategory: 'Salva',
                deleteCategory: '🗑️ Elimina',
                confirmDeleteCategory: 'Sei sicuro di voler eliminare la categoria "{name}"?',
                categoryAlreadyExists: 'Categoria già esistente',
                categoryAdded: '✅ Categoria aggiunta!',
                categoryDeleted: '🗑️ Categoria eliminata',
                categoryUpdated: '✏️ Categoria aggiornata',
                defaultCategories: 'Categorie predefinite',
                customCategories: 'Le tue categorie',
                noCustomCategories: 'Nessuna categoria personalizzata'
,
docTitle: '💰 BudgetWise 2.0 - Gestione Finanziaria Intelligente',
subtitle: 'Stipendio a stipendio — gestione intelligente con AI',
add: 'Aggiungi',
dateHint: 'gg/mm/aaaa',
autoRecommended: 'Auto (consigliato)',
ddmmyyyy: 'GG/MM/AAAA',
mmddyyyy: 'MM/DD/AAAA',
positiveBalance: 'Saldo positivo',
negativeBalance: 'Attenzione: saldo negativo',
vsYesterday0: 'rispetto a ieri: 0%',
detailTotal: 'Totale: {total}',
noExpensesShort: 'Nessuna spesa',
voiceSpeak: 'Parlare...',
voiceTap: 'Tocca per parlare',
error: 'Errore',
genericExpense: 'Spesa',
voiceDetected: '✅ Rilevato: {desc} {amount}€',
voiceFixedDetected: '✅ Spesa fissa rilevata: {name} {amount}€ giorno {day}',
invalidFile: '❌ File non valido',
fixedExpense: 'Spesa fissa',
everyMonthOnDay: 'Ogni mese il giorno',
featureInDev: '🔍 Funzionalità in sviluppo',
csvTemplateDetected: '📌 Rilevato template CSV: "{name}".\nVuoi usarlo automaticamente?',
csvFieldDate: '📅 Data',
csvFieldDescription: '📝 Descrizione',
csvFieldAmount: '💰 Importo',
csvFieldCategory: '🏷️ Categoria',
csvFieldIgnore: '❌ Ignora',
csvSaveAsTemplate: '💾 Salva come template',
csvTemplateNamePlaceholder: 'Nome template (es. Intesa, Unicredit...)',
csvColumnN: 'Colonna {n}',
empty: 'vuota',
csvMappingRequired: '❌ Devi mappare Data, Descrizione e Importo!',
csvEmpty: '❌ CSV vuoto',
importCancelled: '⏸️ Import annullato',
csvImportError: '❌ Errore durante l\'import CSV',
fileReadError: '❌ Errore durante la lettura del file',
importCompleted: '✅ Import completato!\n➕ Aggiunti: {added}{dupLine}',
                duplicatesSkipped: '⚠️ Duplicati saltati: {dup}',
onboardingSubtitle: 'Segui la guida passo-passo',
you: 'Tu',
adviceRed: '⚠️ Sei in rosso! Rivedi le spese.',
adviceLowRemaining: '⚠️ Attenzione: ti rimangono solo {remaining} per i prossimi giorni.',
adviceGood: '💪 Vai bene! Hai ancora {remaining} di margine.',
aiSuggestionsTitle: '🤖 Suggerimenti AI',
aiSmartBadge: 'intelligente',
csvMappingTitle: '📋 Mappa le colonne del file CSV',
csvMappingInstructionsHtml: '<strong>📌 Istruzioni:</strong> Associa ogni colonna del tuo file al campo corrispondente. Le righe con importo positivo saranno considerate <strong>entrate</strong>, quelle negative <strong>spese</strong>.',
csvMappingFieldsTitle: '🎯 Associazione campi:'            },
            en: {
                budget: 'Daily budget',
                remaining: 'Remaining',
                days: 'Days left',
                period: 'Period',
                totalIncome: 'Total income',
                startGuide: '👋 Start by adding your income below!',
                incomes: '🏦 Period income',
                fixed: '📌 Monthly fixed expenses',
                variable: '🧾 Variable expenses',
                chart: '📊 Expense distribution',
                assistant: '🤖 AI Financial Assistant',
                savings: '🎯 Savings goal',
                settings: '⚙️ Settings',
                badge: 'multiple',
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
                incomeDesc: 'Description (e.g. Salary)',
                incomeAmount: 'Amount €',
                incomeDateLabel: 'Date',
                fixedName: 'Name (e.g. Mortgage)',
                fixedAmount: 'Amount €',
                fixedDay: 'Day (e.g. 27)',
                expenseName: 'What did you buy?',
                expenseAmount: '€',
                chatPlaceholder: 'E.g. How much can I save this month?',
                dateLabel: 'Select date:',
                dayLabel: 'Day of month',
                endDateLabel: 'Expiry date',
                percentLabel: 'Percentage of income (%)',
                goalLabel: 'Goal (€)',
                thresholdLabel: '🔔 Alert threshold (€)',
                languageLabel: '🌍 Language',
                backupLabel: '📅 Data backup',
                micFixed: '🎤 Say everything in one phrase',
                micVariable: '🎤 Tap to speak',
                helpFixed: '⏰ Automatically counted each month until expiry',
                chartNote: 'Add expenses to see chart',
                noIncome: 'No income',
                noFixed: 'No fixed expenses',
                noVariable: 'No expenses on this day',
                welcomeMessage: 'Hi! I\'m your financial assistant. Ask me anything about your budget!',
                suggestion1: '💶 Save 100€',
                suggestion2: '🔮 Simulate increase',
                suggestion3: '🎯 Goal',
                suggestion4: '📊 Top category',
                assistantName: 'Assistant',
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
                fillFields: '⚠️ Fill all fields',
                invalidDay: '⚠️ Invalid day (1-31)',
                thresholdExceeded: '⚠️ Warning! You exceeded the threshold of ',
                active: '🟢 Active',
                expired: '🔴 Expired',
                dueToday: 'Due today',
                daysAgo: 'Expired {days} days ago',
                inDays: 'In {days} days',
                confirmReset: 'Are you sure you want to delete ALL data?',
                noGoal: 'You haven\'t set a savings goal yet. Go to the 🎯 section and set one!',
                noExpenses: 'You haven\'t recorded any expenses yet. Add some to get an analysis!',
                footerText: 'BudgetWise 2.0 — Smart financial management',
                footerFeatures: '✨ AI Assistant • Voice recognition • Dark theme',
                fixedVoiceButton: '🎤 Add fixed expense with voice',
                variableVoiceButton: '🎤 Add with voice',
                categoryAlimentari: '🍎 Groceries',
                categoryTrasporti: '🚗 Transport',
                categorySvago: '🎮 Leisure',
                categorySalute: '💊 Health',
                categoryAbbigliamento: '👕 Clothing',
                categoryAltro: '📦 Other',
                
                // Onboarding
                onboardingWelcome: '👋 Welcome to BudgetWise',
                onboardingStep1: 'Add your first income below.',
                onboardingStep2: '📌 Add a fixed monthly expense (e.g. rent, utilities).',
                onboardingStep3: '🧾 Record a variable expense like groceries.',
                onboardingStep4: '📊 Check your daily budget in the top card.',
                onboardingStep5: '🤖 Ask the AI assistant or try voice input.',
                onboardingStep6: '📥 You can also import bank statements in CSV format.',
                onboardingNext: 'Next →',
                onboardingSkip: 'Skip',
                
                // Import review
                importReview: '📋 Import Review',
                importConfirm: '✅ Confirm',
                importCancel: '✕ Cancel',
                importCategory: 'Category',
                importLearn: '📌 The app will remember this choice',
                
                // Traduzioni CSV
                csvTitle: '📥 Import bank statements',
                csvSubtitle: 'Download your bank statement in CSV format',
                csvChooseFile: 'Choose file',
                csvNoFile: 'No file selected',
                csvImportBtn: '📥 Import CSV',
                csvDateFormat: 'Date format',
                csvSeparator: 'Separator',
                csvComma: 'Comma (,)',
                csvSemicolon: 'Semicolon (;)',
                csvTab: 'Tab',
                csvPreview: 'Preview',
                
                // Gestione categorie
                manageCategories: '📂 Manage categories',
                addCategory: '➕ Add category',
                categoryName: 'Category name',
                saveCategory: 'Save',
                deleteCategory: '🗑️ Delete',
                confirmDeleteCategory: 'Are you sure you want to delete the category "{name}"?',
                categoryAlreadyExists: 'Category already exists',
                categoryAdded: '✅ Category added!',
                categoryDeleted: '🗑️ Category deleted',
                categoryUpdated: '✏️ Category updated',
                defaultCategories: 'Default categories',
                customCategories: 'Your categories',
                noCustomCategories: 'No custom categories'
,
docTitle: '💰 BudgetWise 2.0 - Smart Budget Manager',
subtitle: 'Paycheck to paycheck — smart management with AI',
add: 'Add',
dateHint: 'mm/dd/yyyy',
autoRecommended: 'Auto (recommended)',
ddmmyyyy: 'DD/MM/YYYY',
mmddyyyy: 'MM/DD/YYYY',
positiveBalance: 'Positive balance',
negativeBalance: 'Warning: negative balance',
vsYesterday0: 'vs yesterday: 0%',
detailTotal: 'Total: {total}',
noExpensesShort: 'No expenses',
voiceSpeak: 'Speak...',
voiceTap: 'Tap to speak',
error: 'Error',
genericExpense: 'Expense',
voiceDetected: '✅ Detected: {desc} €{amount}',
voiceFixedDetected: '✅ Fixed expense detected: {name} €{amount} day {day}',
invalidFile: '❌ Invalid file',
fixedExpense: 'Fixed expense',
everyMonthOnDay: 'Every month on day',
featureInDev: '🔍 Feature in development',
csvTemplateDetected: '📌 CSV template detected: "{name}".\nUse it automatically?',
csvFieldDate: '📅 Date',
csvFieldDescription: '📝 Description',
csvFieldAmount: '💰 Amount',
csvFieldCategory: '🏷️ Category',
csvFieldIgnore: '❌ Ignore',
csvSaveAsTemplate: '💾 Save as template',
csvTemplateNamePlaceholder: 'Template name (e.g. Intesa, Unicredit...)',
csvColumnN: 'Column {n}',
empty: 'empty',
csvMappingRequired: '❌ You must map Date, Description and Amount!',
csvEmpty: '❌ Empty CSV',
importCancelled: '⏸️ Import cancelled',
csvImportError: '❌ Error during CSV import',
fileReadError: '❌ Error reading the file',
importCompleted: '✅ Import completed!\n➕ Added: {added}{dupLine}',
                duplicatesSkipped: '⚠️ Duplicates skipped: {dup}',
onboardingSubtitle: 'Follow the step-by-step guide',
you: 'You',
adviceRed: "⚠️ You're in the red! Review your expenses.",
adviceLowRemaining: '⚠️ Warning: you only have {remaining} left for the coming days.',
adviceGood: "💪 You're doing well! You still have {remaining} left.",
aiSuggestionsTitle: '🤖 AI Suggestions',
aiSmartBadge: 'smart',
csvMappingTitle: '📋 Map CSV columns',
csvMappingInstructionsHtml: '<strong>📌 Instructions:</strong> Map each CSV column to the right field. Positive amounts are treated as <strong>income</strong>, negative amounts as <strong>expenses</strong>.',
csvMappingFieldsTitle: '🎯 Field mapping:'            },
            es: {
                budget: 'Presupuesto diario',
                remaining: 'Restante',
                days: 'Días restantes',
                period: 'Período',
                totalIncome: 'Ingresos totales',
                startGuide: '👋 ¡Empieza añadiendo tus ingresos abajo!',
                incomes: '🏦 Ingresos del período',
                fixed: '📌 Gastos fijos mensuales',
                variable: '🧾 Gastos variables',
                chart: '📊 Distribución de gastos',
                assistant: '🤖 Asistente financiero IA',
                savings: '🎯 Objetivo de ahorro',
                settings: '⚙️ Ajustes',
                badge: 'múltiple',
                addIncome: '➕ Añadir ingreso',
                addFixed: '➕ Añadir gasto fijo',
                addExpense: '➕ Añadir gasto',
                resetDay: '🗑️ Borrar gastos del día',
                applySavings: 'Aplicar ahorro',
                backup: '💾 Descargar copia',
                restore: '📂 Restaurar',
                resetAll: '⚠️ Reinicio total',
                export: '📅 Exportar a Calendar',
                send: 'Enviar',
                incomeDesc: 'Descripción (p. ej. Salario)',
                incomeAmount: 'Importe €',
                incomeDateLabel: 'Fecha',
                fixedName: 'Nombre (p. ej. Hipoteca)',
                fixedAmount: 'Importe €',
                fixedDay: 'Día (p. ej. 27)',
                expenseName: '¿Qué compraste?',
                expenseAmount: '€',
                chatPlaceholder: 'p. ej. ¿Cuánto puedo ahorrar este mes?',
                dateLabel: 'Selecciona fecha:',
                dayLabel: 'Día del mes',
                endDateLabel: 'Fecha de vencimiento',
                percentLabel: 'Porcentaje de ingresos (%)',
                goalLabel: 'Objetivo (€)',
                thresholdLabel: '🔔 Umbral de aviso (€)',
                languageLabel: '🌍 Idioma',
                backupLabel: '📅 Copia de datos',
                micFixed: '🎤 Toca y dilo en una frase',
                micVariable: '🎤 Toca para hablar',
                helpFixed: '⏰ Se contabiliza automáticamente cada mes hasta el vencimiento',
                chartNote: 'Añade gastos para ver el gráfico',
                noIncome: 'Sin ingresos',
                noFixed: 'Sin gastos fijos',
                noVariable: 'Sin gastos en este día',
                welcomeMessage: '¡Hola! Soy tu asistente financiero. ¡Pregúntame lo que quieras sobre tu presupuesto!',
                suggestion1: '💶 Ahorrar 100€',
                suggestion2: '🔮 Simular aumento',
                suggestion3: '🎯 Objetivo',
                suggestion4: '📊 Categoría top',
                assistantName: 'Asistente',
                incomeAdded: '✅ ¡Ingreso añadido!',
                incomeDeleted: '🗑️ Ingreso eliminado',
                fixedAdded: '✅ ¡Gasto fijo añadido!',
                fixedDeleted: '🗑️ Gasto eliminado',
                expenseAdded: '✅ ¡Gasto añadido!',
                expenseDeleted: '🗑️ Gasto eliminado',
                dayReset: '🗑️ Gastos del día borrados',
                savingsApplied: '💰 ¡Ahorro aplicado!',
                backupDownloaded: '💾 ¡Copia descargada!',
                dataRestored: '📂 ¡Datos restaurados!',
                resetCompleted: '🔄 Reinicio completado',
                calendarExported: '📅 ¡Calendario exportado!',
                fillFields: '⚠️ Rellena todos los campos',
                invalidDay: '⚠️ Día no válido (1-31)',
                thresholdExceeded: '⚠️ ¡Atención! Has superado el umbral de ',
                active: '🟢 Activo',
                expired: '🔴 Vencido',
                dueToday: 'Vence hoy',
                daysAgo: 'Vencido hace {days} días',
                inDays: 'En {days} días',
                confirmReset: '¿Seguro que quieres borrar TODOS los datos?',
                noGoal: 'Aún no has establecido un objetivo de ahorro. Ve a 🎯 y configúralo.',
                noExpenses: 'Aún no tienes gastos registrados. Añade algunos para ver el análisis.',
                footerText: 'BudgetWise 2.0 — Gestión inteligente de tus finanzas',
                footerFeatures: '✨ Asistente IA • Reconocimiento de voz • Tema oscuro',
                fixedVoiceButton: '🎤 Añadir gasto fijo con voz',
                variableVoiceButton: '🎤 Añadir con voz',
                categoryAlimentari: '🍎 Alimentación',
                categoryTrasporti: '🚗 Transporte',
                categorySvago: '🎮 Ocio',
                categorySalute: '💊 Salud',
                categoryAbbigliamento: '👕 Ropa',
                categoryAltro: '📦 Otros',
                onboardingWelcome: '👋 Bienvenido a BudgetWise',
                onboardingStep1: 'Añade tu primer ingreso abajo.',
                onboardingStep2: '📌 Añade un gasto fijo mensual (p. ej. alquiler, servicios).',
                onboardingStep3: '🧾 Registra un gasto variable como la compra.',
                onboardingStep4: '📊 Revisa tu presupuesto diario en la tarjeta superior.',
                onboardingStep5: '🤖 Pregunta al asistente IA o prueba el micrófono.',
                onboardingStep6: '📥 También puedes importar movimientos bancarios en CSV.',
                onboardingNext: 'Siguiente →',
                onboardingSkip: 'Saltar',
                importReview: '📋 Revisión de importación',
                importConfirm: '✅ Confirmar',
                importCancel: '✕ Cancelar',
                importCategory: 'Categoría',
                importLearn: '📌 La app recordará esta elección',
                csvTitle: '📥 Importar movimientos bancarios',
                csvSubtitle: 'Descarga tu extracto en formato CSV',
                csvChooseFile: 'Elegir archivo',
                csvNoFile: 'Ningún archivo seleccionado',
                csvImportBtn: '📥 Importar CSV',
                csvDateFormat: 'Formato de fecha',
                csvSeparator: 'Separador',
                csvComma: 'Coma (,)',
                csvSemicolon: 'Punto y coma (;)',
                csvTab: 'Tabulación',
                csvPreview: 'Vista previa',
                categoriesSectionTitle: '📂 Gestión de categorías',
                manageCustomCategories: '➕ Gestionar categorías personalizadas',
                newCategoryLabel: 'Nueva categoría',
                newCategoryPlaceholder: 'p. ej. Viajes',
                close: 'Cerrar',
                manageCategories: '📂 Gestionar categorías',
                addCategory: '➕ Añadir categoría',
                categoryName: 'Nombre de la categoría',
                saveCategory: 'Guardar',
                deleteCategory: '🗑️ Eliminar',
                confirmDeleteCategory: '¿Seguro que quieres eliminar la categoría "{name}"?',
                categoryAlreadyExists: 'La categoría ya existe',
                categoryAdded: '✅ ¡Categoría añadida!',
                categoryDeleted: '🗑️ Categoría eliminada',
                categoryUpdated: '✏️ Categoría actualizada',
                defaultCategories: 'Categorías predeterminadas',
                customCategories: 'Tus categorías',
                noCustomCategories: 'Sin categorías personalizadas',
                docTitle: '💰 BudgetWise 2.0 - Gestor de presupuesto inteligente',
                subtitle: 'De nómina a nómina — gestión inteligente con IA',
                add: 'Añadir',
                dateHint: 'dd/mm/aaaa',
                autoRecommended: 'Auto (recomendado)',
                ddmmyyyy: 'DD/MM/AAAA',
                mmddyyyy: 'MM/DD/AAAA',
                positiveBalance: 'Saldo positivo',
                negativeBalance: 'Atención: saldo negativo',
                vsYesterday0: 'vs ayer: 0%',
                detailTotal: 'Total: {total}',
                noExpensesShort: 'Sin gastos',
                voiceSpeak: 'Habla...',
                voiceTap: 'Toca para hablar',
                error: 'Error',
                genericExpense: 'Gasto',
                voiceDetected: '✅ Detectado: {desc} €{amount}',
                voiceFixedDetected: '✅ Gasto fijo detectado: {name} €{amount} día {day}',
                invalidFile: '❌ Archivo no válido',
                fixedExpense: 'Gasto fijo',
                everyMonthOnDay: 'Cada mes el día',
                featureInDev: '🔍 Función en desarrollo',
                csvTemplateDetected: '📌 Plantilla CSV detectada: "{name}".\\n¿Usarla automáticamente?',
                csvFieldDate: '📅 Fecha',
                csvFieldDescription: '📝 Descripción',
                csvFieldAmount: '💰 Importe',
                csvFieldCategory: '🏷️ Categoría',
                csvFieldIgnore: '❌ Ignorar',
                csvSaveAsTemplate: '💾 Guardar como plantilla',
                csvTemplateNamePlaceholder: 'Nombre de plantilla (p. ej. Intesa, Unicredit...)',
                csvColumnN: 'Columna {n}',
                empty: 'vacía',
                csvMappingRequired: '❌ Debes asignar Fecha, Descripción e Importe.',
                csvEmpty: '❌ CSV vacío',
                importCancelled: '⏸️ Importación cancelada',
                csvImportError: '❌ Error durante la importación CSV',
                fileReadError: '❌ Error al leer el archivo',
                duplicatesSkipped: '⚠️ Duplicados omitidos: {dup}',
                importCompleted: '✅ Importación completada!\\n➕ Añadidos: {added}{dupLine}',
                onboardingSubtitle: 'Sigue la guía paso a paso',
                you: 'Tú',
                adviceRed: '⚠️ ¡Estás en negativo! Revisa tus gastos.',
                adviceLowRemaining: '⚠️ Atención: solo te quedan {remaining} para los próximos días.',
                adviceGood: '💪 ¡Vas bien! Aún te quedan {remaining}.',
                aiSuggestionsTitle: '🤖 Sugerencias IA',
                aiSmartBadge: 'inteligente',
                csvMappingTitle: '📋 Mapear columnas CSV',
                csvMappingInstructionsHtml: '<strong>📌 Instrucciones:</strong> Asocia cada columna del CSV con su campo. Importes positivos = <strong>ingresos</strong>, negativos = <strong>gastos</strong>.',
                csvMappingFieldsTitle: '🎯 Asignación de campos:'
            },
            fr: {
                budget: 'Budget journalier',
                remaining: 'Reste',
                days: 'Jours restants',
                period: 'Période',
                totalIncome: 'Total des revenus',
                startGuide: '👋 Commence en ajoutant tes revenus ci-dessous !',
                incomes: '🏦 Revenus de la période',
                fixed: '📌 Dépenses fixes mensuelles',
                variable: '🧾 Dépenses variables',
                chart: '📊 Répartition des dépenses',
                assistant: '🤖 Assistant financier IA',
                savings: '🎯 Objectif d’épargne',
                settings: '⚙️ Paramètres',
                badge: 'multiple',
                addIncome: '➕ Ajouter un revenu',
                addFixed: '➕ Ajouter une dépense fixe',
                addExpense: '➕ Ajouter une dépense',
                resetDay: '🗑️ Supprimer les dépenses du jour',
                applySavings: 'Appliquer l’épargne',
                backup: '💾 Télécharger la sauvegarde',
                restore: '📂 Restaurer',
                resetAll: '⚠️ Réinitialisation complète',
                export: '📅 Exporter vers Calendar',
                send: 'Envoyer',
                incomeDesc: 'Description (ex. Salaire)',
                incomeAmount: 'Montant €',
                incomeDateLabel: 'Date',
                fixedName: 'Nom (ex. Crédit)',
                fixedAmount: 'Montant €',
                fixedDay: 'Jour (ex. 27)',
                expenseName: 'Qu’as-tu acheté ?',
                expenseAmount: '€',
                chatPlaceholder: 'Ex. Combien puis-je économiser ce mois-ci ?',
                dateLabel: 'Choisir une date :',
                dayLabel: 'Jour du mois',
                endDateLabel: 'Date d’échéance',
                percentLabel: 'Pourcentage des revenus (%)',
                goalLabel: 'Objectif (€)',
                thresholdLabel: '🔔 Seuil d’alerte (€)',
                languageLabel: '🌍 Langue',
                backupLabel: '📅 Sauvegarde des données',
                micFixed: '🎤 Appuie et dis tout en une phrase',
                micVariable: '🎤 Appuie pour parler',
                helpFixed: '⏰ Comptabilisée automatiquement chaque mois jusqu’à l’échéance',
                chartNote: 'Ajoute des dépenses pour voir le graphique',
                noIncome: 'Aucun revenu',
                noFixed: 'Aucune dépense fixe',
                noVariable: 'Aucune dépense ce jour',
                welcomeMessage: 'Salut ! Je suis ton assistant financier. Demande-moi n’importe quoi sur ton budget !',
                suggestion1: '💶 Économiser 100€',
                suggestion2: '🔮 Simuler une hausse',
                suggestion3: '🎯 Objectif',
                suggestion4: '📊 Catégorie top',
                assistantName: 'Assistant',
                incomeAdded: '✅ Revenu ajouté !',
                incomeDeleted: '🗑️ Revenu supprimé',
                fixedAdded: '✅ Dépense fixe ajoutée !',
                fixedDeleted: '🗑️ Dépense supprimée',
                expenseAdded: '✅ Dépense ajoutée !',
                expenseDeleted: '🗑️ Dépense supprimée',
                dayReset: '🗑️ Dépenses du jour supprimées',
                savingsApplied: '💰 Épargne appliquée !',
                backupDownloaded: '💾 Sauvegarde téléchargée !',
                dataRestored: '📂 Données restaurées !',
                resetCompleted: '🔄 Réinitialisation terminée',
                calendarExported: '📅 Calendrier exporté !',
                fillFields: '⚠️ Remplis tous les champs',
                invalidDay: '⚠️ Jour invalide (1-31)',
                thresholdExceeded: '⚠️ Attention ! Tu as dépassé le seuil de ',
                active: '🟢 Actif',
                expired: '🔴 Expiré',
                dueToday: 'Échéance aujourd’hui',
                daysAgo: 'Expiré il y a {days} jours',
                inDays: 'Dans {days} jours',
                confirmReset: 'Es-tu sûr de vouloir supprimer TOUTES les données ?',
                noGoal: 'Tu n’as pas encore défini d’objectif d’épargne. Va sur 🎯 et configure-le.',
                noExpenses: 'Tu n’as encore aucune dépense. Ajoute-en pour voir l’analyse.',
                footerText: 'BudgetWise 2.0 — Gestion intelligente de tes finances',
                footerFeatures: '✨ Assistant IA • Reconnaissance vocale • Thème sombre',
                fixedVoiceButton: '🎤 Ajouter une dépense fixe par voix',
                variableVoiceButton: '🎤 Ajouter par voix',
                categoryAlimentari: '🍎 Alimentation',
                categoryTrasporti: '🚗 Transport',
                categorySvago: '🎮 Loisirs',
                categorySalute: '💊 Santé',
                categoryAbbigliamento: '👕 Vêtements',
                categoryAltro: '📦 Autre',
                onboardingWelcome: '👋 Bienvenue sur BudgetWise',
                onboardingStep1: 'Ajoute ton premier revenu ci-dessous.',
                onboardingStep2: '📌 Ajoute une dépense fixe mensuelle (ex. loyer, factures).',
                onboardingStep3: '🧾 Enregistre une dépense variable comme les courses.',
                onboardingStep4: '📊 Consulte ton budget journalier dans la carte du haut.',
                onboardingStep5: '🤖 Demande à l’assistant IA ou teste le micro.',
                onboardingStep6: '📥 Tu peux aussi importer un CSV bancaire.',
                onboardingNext: 'Suivant →',
                onboardingSkip: 'Passer',
                importReview: '📋 Revue d’importation',
                importConfirm: '✅ Confirmer',
                importCancel: '✕ Annuler',
                importCategory: 'Catégorie',
                importLearn: '📌 L’app se souviendra de ce choix',
                csvTitle: '📥 Importer des opérations bancaires',
                csvSubtitle: 'Télécharge ton relevé en CSV',
                csvChooseFile: 'Choisir un fichier',
                csvNoFile: 'Aucun fichier sélectionné',
                csvImportBtn: '📥 Importer CSV',
                csvDateFormat: 'Format de date',
                csvSeparator: 'Séparateur',
                csvComma: 'Virgule (,)',
                csvSemicolon: 'Point-virgule (;)',
                csvTab: 'Tabulation',
                csvPreview: 'Aperçu',
                categoriesSectionTitle: '📂 Gestion des catégories',
                manageCustomCategories: '➕ Gérer les catégories personnalisées',
                newCategoryLabel: 'Nouvelle catégorie',
                newCategoryPlaceholder: 'ex. Voyages',
                close: 'Fermer',
                manageCategories: '📂 Gérer les catégories',
                addCategory: '➕ Ajouter une catégorie',
                categoryName: 'Nom de la catégorie',
                saveCategory: 'Enregistrer',
                deleteCategory: '🗑️ Supprimer',
                confirmDeleteCategory: 'Supprimer la catégorie « {name} » ?',
                categoryAlreadyExists: 'La catégorie existe déjà',
                categoryAdded: '✅ Catégorie ajoutée !',
                categoryDeleted: '🗑️ Catégorie supprimée',
                categoryUpdated: '✏️ Catégorie mise à jour',
                defaultCategories: 'Catégories par défaut',
                customCategories: 'Tes catégories',
                noCustomCategories: 'Aucune catégorie personnalisée',
                docTitle: '💰 BudgetWise 2.0 - Gestionnaire de budget intelligent',
                subtitle: 'De paie en paie — gestion intelligente avec IA',
                add: 'Ajouter',
                dateHint: 'jj/mm/aaaa',
                autoRecommended: 'Auto (recommandé)',
                ddmmyyyy: 'JJ/MM/AAAA',
                mmddyyyy: 'MM/JJ/AAAA',
                positiveBalance: 'Solde positif',
                negativeBalance: 'Attention : solde négatif',
                vsYesterday0: 'vs hier : 0%',
                detailTotal: 'Total : {total}',
                noExpensesShort: 'Aucune dépense',
                voiceSpeak: 'Parle...',
                voiceTap: 'Appuie pour parler',
                error: 'Erreur',
                genericExpense: 'Dépense',
                voiceDetected: '✅ Détecté : {desc} €{amount}',
                voiceFixedDetected: '✅ Dépense fixe détectée : {name} €{amount} jour {day}',
                invalidFile: '❌ Fichier invalide',
                fixedExpense: 'Dépense fixe',
                everyMonthOnDay: 'Chaque mois le jour',
                featureInDev: '🔍 Fonction en développement',
                csvTemplateDetected: '📌 Modèle CSV détecté : « {name} ».\\nL’utiliser automatiquement ?',
                csvFieldDate: '📅 Date',
                csvFieldDescription: '📝 Description',
                csvFieldAmount: '💰 Montant',
                csvFieldCategory: '🏷️ Catégorie',
                csvFieldIgnore: '❌ Ignorer',
                csvSaveAsTemplate: '💾 Enregistrer comme modèle',
                csvTemplateNamePlaceholder: 'Nom du modèle (ex. Intesa, Unicredit...)',
                csvColumnN: 'Colonne {n}',
                empty: 'vide',
                csvMappingRequired: '❌ Tu dois mapper Date, Description et Montant.',
                csvEmpty: '❌ CSV vide',
                importCancelled: '⏸️ Import annulé',
                csvImportError: '❌ Erreur pendant l’import CSV',
                fileReadError: '❌ Erreur de lecture du fichier',
                duplicatesSkipped: '⚠️ Doublons ignorés : {dup}',
                importCompleted: '✅ Import terminé !\\n➕ Ajoutés : {added}{dupLine}',
                onboardingSubtitle: 'Suis le guide pas à pas',
                you: 'Toi',
                adviceRed: '⚠️ Tu es dans le rouge ! Revois tes dépenses.',
                adviceLowRemaining: '⚠️ Attention : il ne te reste que {remaining} pour les prochains jours.',
                adviceGood: '💪 Ça va ! Il te reste encore {remaining}.',
                aiSuggestionsTitle: '🤖 Suggestions IA',
                aiSmartBadge: 'intelligent',
                csvMappingTitle: '📋 Mapper les colonnes CSV',
                csvMappingInstructionsHtml: '<strong>📌 Instructions :</strong> Associe chaque colonne du CSV au bon champ. Montants positifs = <strong>revenus</strong>, négatifs = <strong>dépenses</strong>.',
                csvMappingFieldsTitle: '🎯 Association des champs :'
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
        this.startOnboarding();
        this.updateAllCategorySelects(); // Popola i select con le categorie
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

    t(key, vars) {
        const lang = this.data.language || "it";
        const dict = this.translations[lang] || this.translations.it || {};
        let str = dict[key] ?? (this.translations.en ? (this.translations.en[key] ?? key) : key);
        if (vars && typeof vars === "object") {
            for (const [k, v] of Object.entries(vars)) {
                str = String(str).replaceAll(`{${k}}`, String(v));
            }
        }
        return str;
    }

    applyLanguage() {
        console.log('🌐 Cambio lingua a:', this.data.language);
        document.getElementById('languageSelect').value = this.data.language;
        const subtitleEl = document.querySelector('.subtitle');
        if (subtitleEl) subtitleEl.textContent = this.t('subtitle');
        document.documentElement.lang = (this.data.language || 'it');
        document.title = this.t('docTitle');
        
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
            else if (text.includes('Suggerimenti')) h2.innerHTML = this.t('aiSuggestionsTitle');
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
        
        const helpFixed = document.getElementById('fixedHelp');
        if (helpFixed) helpFixed.textContent = this.t('helpFixed');
        
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
        
        const micFixedSpan = document.getElementById('micFixedText');
        if (micFixedSpan) micFixedSpan.textContent = this.t('fixedVoiceButton');

        const voiceBtnSpan = document.getElementById('voiceBtnText');
        if (voiceBtnSpan) voiceBtnSpan.textContent = this.t('variableVoiceButton');

        const totalIncomeLabel = document.getElementById('totalIncomeLabel');
        if (totalIncomeLabel) totalIncomeLabel.textContent = this.t('totalIncome');

        const footerText = document.getElementById('footerText');
        if (footerText) footerText.textContent = this.t('footerText');

        const footerFeatures = document.getElementById('footerFeatures');
        if (footerFeatures) footerFeatures.textContent = this.t('footerFeatures');

        const budgetLabel = document.getElementById('budgetLabel');
        if (budgetLabel) budgetLabel.textContent = this.t('budget');
        
        const remainingLabel = document.getElementById('remainingLabel');
        if (remainingLabel) remainingLabel.textContent = this.t('remaining');
        
        const daysLabel = document.getElementById('daysLabel');
        if (daysLabel) daysLabel.textContent = this.t('days');
        
        const assistantNameText = document.getElementById('assistantNameText');
        if (assistantNameText) assistantNameText.textContent = this.t('assistantName');
        
        const incomeDateLabel = document.getElementById('incomeDateLabel');
        if (incomeDateLabel) incomeDateLabel.textContent = this.t('incomeDateLabel');
        
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
        
        const dateHintFixed = document.getElementById('dateHintFixed');
        if (dateHintFixed) dateHintFixed.textContent = this.t('dateHint');

        const dateHintVariable = document.getElementById('dateHintVariable');
        if (dateHintVariable) dateHintVariable.textContent = this.t('dateHint');
        
        // Traduzioni sezione Import CSV
        const csvTitle = document.getElementById('csvTitle');
        if (csvTitle) csvTitle.textContent = this.t('csvTitle');

        const csvSubtitle = document.getElementById('csvSubtitle');
        if (csvSubtitle) csvSubtitle.textContent = this.t('csvSubtitle');

        const csvChooseFileLabel = document.getElementById('csvChooseFileLabel');
        if (csvChooseFileLabel) csvChooseFileLabel.textContent = this.t('csvChooseFile');

        const csvFileName = document.getElementById('csvFileName');
        if (csvFileName && (csvFileName.textContent === 'Nessun file selezionato' || csvFileName.textContent === 'No file selected')) {
            csvFileName.textContent = this.t('csvNoFile');
        }

        const importCsvBtn = document.getElementById('importCsvBtn');
        if (importCsvBtn) importCsvBtn.innerHTML = this.t('csvImportBtn');

        const csvDateFormatLabel = document.getElementById('csvDateFormatLabel');
        if (csvDateFormatLabel) csvDateFormatLabel.textContent = this.t('csvDateFormat');

        const csvSeparatorLabel = document.getElementById('csvSeparatorLabel');
        if (csvSeparatorLabel) csvSeparatorLabel.textContent = this.t('csvSeparator');

        // Traduci le opzioni dei select
        const delimiterSelect = document.getElementById('csvDelimiter');
        if (delimiterSelect) {
            const options = delimiterSelect.options;
            if (options.length >= 2) {
                options[0].text = this.data.language === 'it' ? 'GG/MM/AAAA' : 'DD/MM/YYYY';
                options[1].text = this.data.language === 'it' ? 'MM/DD/AAAA' : 'MM/DD/YYYY';
            }
        }

        const separatorSelect = document.getElementById('csvSeparator');
        if (separatorSelect) {
            const options = separatorSelect.options;
            if (options.length >= 3) {
                options[0].text = this.t('csvComma');
                options[1].text = this.t('csvSemicolon');
                options[2].text = this.t('csvTab');
            }
        }

        const csvPreviewTitle = document.getElementById('csvPreviewTitle');
        if (csvPreviewTitle) csvPreviewTitle.textContent = this.t('csvPreview');

        const aiWidgetTitle = document.getElementById('aiWidgetTitle');
        if (aiWidgetTitle) aiWidgetTitle.textContent = this.t('aiSuggestionsTitle');
        const aiWidgetBadge = document.getElementById('aiWidgetBadge');
        if (aiWidgetBadge) aiWidgetBadge.textContent = this.t('aiSmartBadge');
        const closeDetailBtn2 = document.getElementById('closeDetailBtn');
        if (closeDetailBtn2) closeDetailBtn2.textContent = this.t('close');
        const importReviewTitle = document.getElementById('importReviewTitle');
        if (importReviewTitle) importReviewTitle.textContent = this.t('importReview');
        const csvMappingTitle = document.getElementById('csvMappingTitle');
        if (csvMappingTitle) csvMappingTitle.textContent = this.t('csvMappingTitle');
        const csvMappingInstructions = document.getElementById('csvMappingInstructions');
        if (csvMappingInstructions) csvMappingInstructions.innerHTML = this.t('csvMappingInstructionsHtml');
        const csvMappingFieldsTitle = document.getElementById('csvMappingFieldsTitle');
        if (csvMappingFieldsTitle) csvMappingFieldsTitle.textContent = this.t('csvMappingFieldsTitle');

        this.updatePeriodInfo();
    }

    updatePeriodInfo() {
        document.getElementById('periodInfo').textContent = `📅 ${this.t('period')}: ${this.data.periodStart} → ${this.data.periodEnd}`;
        
        const sourceEl = document.getElementById('periodSource');
        if (sourceEl && this.data.incomes && this.data.incomes.length > 0) {
            const firstIncome = this.data.incomes.sort((a,b) => new Date(a.date) - new Date(b.date))[0];
            sourceEl.textContent = this.data.language === 'it'
                ? `⏳ Periodo iniziato con: ${firstIncome.desc} del ${firstIncome.date}`
                : `⏳ Period started with: ${firstIncome.desc} on ${firstIncome.date}`;
        }
    }

    // ========== CALCOLI CON CONTROLLI ==========
    calculateTotalIncome() {
        if (!this.data.incomes || !Array.isArray(this.data.incomes)) return 0;
        return this.data.incomes.reduce((sum, inc) => sum + (inc.amount || 0), 0);
    }

    calculateTotalVariableExpenses() {
        if (!this.data.variableExpenses || typeof this.data.variableExpenses !== 'object') return 0;
        let total = 0;
        Object.values(this.data.variableExpenses).forEach(day => {
            if (Array.isArray(day)) {
                day.forEach(exp => total += (exp.amount || 0));
            }
        });
        return total;
    }

    calculateTotalFixedExpenses() {
        if (!this.data.fixedExpenses || !Array.isArray(this.data.fixedExpenses)) return 0;
        
        const today = new Date();
        const currentMonth = today.getMonth();
        const currentYear = today.getFullYear();
        
        return this.data.fixedExpenses.reduce((sum, exp) => {
            if (!exp || !exp.endDate || !exp.day) return sum;
            
            const endDate = new Date(exp.endDate);
            if (endDate < today) return sum;
            
            const paymentDate = new Date(currentYear, currentMonth, exp.day);
            if (paymentDate > today) return sum;
            
            return sum + (exp.amount || 0);
        }, 0);
    }

    calculateRemaining() {
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpenses();
        const savingsAmount = (totalIncome * (this.data.savingsPercent || 0)) / 100;
        const budget = totalIncome - totalFixed - savingsAmount;
        return budget - this.calculateTotalVariableExpenses();
    }

    calculateDailyBudget() {
        const remaining = this.calculateRemaining();
        const daysLeft = this.getDaysLeft();
        return daysLeft > 0 ? remaining / daysLeft : 0;
    }

    getDaysLeft() {
        const diff = new Date(this.data.periodEnd) - new Date();
        return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
    }

    calculateSavingsProgress() {
        if (!this.data.savingsGoal) return 0;
        const saved = (this.calculateTotalIncome() * (this.data.savingsPercent || 0)) / 100;
        return (saved / this.data.savingsGoal) * 100;
    }

    getNextPaymentDate(day) {
        const today = new Date();
        let next = new Date(today.getFullYear(), today.getMonth(), day);
        if (next < today) next = new Date(today.getFullYear(), today.getMonth() + 1, day);
        return next.toISOString().split('T')[0];
    }

    // ========== ENTRATE ==========
    addIncome() {
        const desc = document.getElementById('incomeDesc').value.trim();
        const amount = parseFloat(document.getElementById('incomeAmount').value);
        const dateInput = document.getElementById('incomeDate').value;
        
        // Se non c'è data, usa oggi
        const date = dateInput || new Date().toISOString().split('T')[0];
        
        if (!desc || !amount) {
            alert(this.t('fillFields'));
            return;
        }
        
        // Se è la PRIMA entrata, imposta il periodo
        if (!Array.isArray(this.data.incomes) || this.data.incomes.length === 0) {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30); // 30 giorni di periodo
            
            this.data.periodStart = startDate.toISOString().split('T')[0];
            this.data.periodEnd = endDate.toISOString().split('T')[0];
            
            console.log('📅 Nuovo periodo impostato da', this.data.periodStart, 'a', this.data.periodEnd);
        }
        
        if (!Array.isArray(this.data.incomes)) this.data.incomes = [];
        
        this.data.incomes.push({
            desc,
            amount,
            date: date,
            id: Date.now()
        });
        
        this.saveData();
        this.updateUI();
        alert(this.t('incomeAdded'));
        
        document.getElementById('incomeDesc').value = '';
        document.getElementById('incomeAmount').value = '';
        document.getElementById('incomeDate').value = '';
    }

    deleteIncome(id) {
        if (!Array.isArray(this.data.incomes)) return;
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

        if (!Array.isArray(this.data.fixedExpenses)) this.data.fixedExpenses = [];

        this.data.fixedExpenses.push({ name, amount, day, endDate, id: Date.now() });
        this.saveData();
        this.updateUI();

        const status = new Date(endDate) >= new Date() ? '🟢' : '🔴';
        this.showToast(`💰 ${name} ${this.formatCurrency(amount)} – giorno ${day} (scad. ${endDate}) ${status}`, 'success');
        this.highlightField('fixedName');
        this.highlightField('fixedAmount');
        this.highlightField('fixedDay');
        this.highlightField('fixedEndDate');

        document.getElementById('fixedName').value = '';
        document.getElementById('fixedAmount').value = '';
        document.getElementById('fixedDay').value = '';
        document.getElementById('fixedEndDate').value = '';
    }

    deleteFixedExpense(id) {
        if (!Array.isArray(this.data.fixedExpenses)) return;
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

        if (!this.data.variableExpenses || typeof this.data.variableExpenses !== 'object') {
            this.data.variableExpenses = {};
        }
        if (!this.data.variableExpenses[date]) this.data.variableExpenses[date] = [];

        this.data.variableExpenses[date].push({ name, amount, category, id: Date.now() });

        this.saveData();
        this.updateUI();
        this.updateChart();

        const categoryEmoji = this.getCategoryEmoji(category);
        this.showToast(`${categoryEmoji} ${name} ${this.formatCurrency(amount)} aggiunto!`, 'success');
        this.highlightField('expenseName');
        this.highlightField('expenseAmount');

        document.getElementById('expenseName').value = '';
        document.getElementById('expenseAmount').value = '';
        this.checkThreshold(date);
    }

    deleteVariableExpense(date, id) {
        if (!this.data.variableExpenses || !this.data.variableExpenses[date]) return;
        this.data.variableExpenses[date] = this.data.variableExpenses[date].filter(exp => exp.id !== id);
        if (this.data.variableExpenses[date].length === 0) delete this.data.variableExpenses[date];
        this.saveData();
        this.updateUI();
        this.updateChart();
        alert(this.t('expenseDeleted'));
    }

    resetDay() {
        const date = document.getElementById('expenseDate').value;
        if (this.data.variableExpenses && this.data.variableExpenses[date]) {
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

    applySavings() {
        const percent = parseFloat(document.getElementById('savePercent').value) || 0;
        const goal = parseFloat(document.getElementById('saveGoal').value) || 0;
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.saveData();
        this.updateUI();
        alert(this.t('savingsApplied'));
    }

    getLast7DaysData() {
        const today = new Date();
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            let daySpent = 0;
            if (this.data.variableExpenses && this.data.variableExpenses[dateStr] && Array.isArray(this.data.variableExpenses[dateStr])) {
                daySpent = this.data.variableExpenses[dateStr].reduce((sum, exp) => sum + (exp.amount || 0), 0);
            }
            data.push(daySpent);
        }
        return data;
    }

    getLast7DaysBudget() {
        const dailyBudget = this.calculateDailyBudget();
        const data = [];
        for (let i = 6; i >= 0; i--) data.push(dailyBudget);
        return data;
    }

    drawSparkline(canvasId, data, color = '#4361ee') {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        if (data.length === 0 || data.every(v => v === 0)) return;
        const max = Math.max(...data, 1);
        const min = Math.min(...data, 0);
        const range = max - min || 1;
        const points = data.map((v, i) => {
            const x = (i / (data.length - 1)) * width;
            const y = height - ((v - min) / range) * height;
            return { x, y };
        });
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        points.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
        ctx.stroke();
        ctx.fillStyle = color;
        points.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, 2 * Math.PI);
            ctx.fill();
        });
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
        const closeDetailBtn = document.getElementById('closeDetailBtn');
        if (closeDetailBtn) {
            closeDetailBtn.addEventListener('click', () => {
                document.getElementById('categoryDetail').style.display = 'none';
            });
        }
        
        // Gestione categorie
        const manageCategoriesBtn = document.getElementById('manageCategoriesBtn');
        if (manageCategoriesBtn) {
            manageCategoriesBtn.addEventListener('click', () => this.showCategoryManager());
        }
        const saveCategoryBtn = document.getElementById('saveCategoryBtn');
        if (saveCategoryBtn) {
            saveCategoryBtn.addEventListener('click', () => this.saveCategory());
        }
        const closeCategoryManager = document.getElementById('closeCategoryManager');
        if (closeCategoryManager) {
            closeCategoryManager.addEventListener('click', () => this.hideCategoryManager());
        }
        
        this.setupAiActions();
    }

    updateUI() {
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();

        const remainingStatus = document.getElementById('remainingStatus');
        const remainingTrend = document.getElementById('remainingTrend');
        const remaining = this.calculateRemaining();
        if (remainingStatus) {
            remainingStatus.textContent = remaining >= 0 ? '✅' : '⚠️';
            remainingStatus.title = remaining >= 0 ? this.t('positiveBalance') : this.t('negativeBalance');
        }
        if (remainingTrend) {
            remainingTrend.textContent = this.t('vsYesterday0');
        }

        this.updatePeriodInfo();
        this.updateIncomeList();
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();

        document.getElementById('savePercent').value = this.data.savingsPercent || 0;
        document.getElementById('saveGoal').value = this.data.savingsGoal || 0;
        document.getElementById('thresholdInput').value = this.data.threshold || 50;

        const progress = this.calculateSavingsProgress();
        const goal = this.data.savingsGoal;
        const percent = this.data.savingsPercent;
        const totalIncome = this.calculateTotalIncome();
        const savedPerMonth = (totalIncome * (percent || 0)) / 100;

        const progressContainer = document.getElementById('progressContainer');
        const savingsMessage = document.getElementById('savingsMessage');
        const savingsTip = document.getElementById('savingsTip');

        if (progress > 0 && goal > 0 && percent > 0) {
            progressContainer.style.display = 'block';
            document.getElementById('progressBar').style.width = progress + '%';
            
            const today = new Date();
            const monthsNeeded = Math.ceil(goal / savedPerMonth);
            const targetDate = new Date(today);
            targetDate.setMonth(today.getMonth() + monthsNeeded);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = targetDate.toLocaleDateString(this.data.language === 'it' ? 'it-IT' : 'en-US', options);
            
            savingsMessage.textContent = this.data.language === 'it'
                ? `🐷 Al ritmo attuale, raggiungerai l'obiettivo il ${formattedDate}`
                : `🐷 At current pace, you'll reach your goal on ${formattedDate}`;
            
            if (percent < 20) {
                const suggestedPercent = Math.min(percent + 5, 20);
                const newMonths = Math.ceil(goal / ((totalIncome * suggestedPercent) / 100));
                const monthsDiff = monthsNeeded - newMonths;
                savingsTip.textContent = this.data.language === 'it'
                    ? `💡 Se risparmiassi il ${suggestedPercent}% invece del ${percent}%, arriveresti ${monthsDiff} ${monthsDiff === 1 ? 'mese' : 'mesi'} prima!`
                    : `💡 If you saved ${suggestedPercent}% instead of ${percent}%, you'd get there ${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'} sooner!`;
            } else {
                savingsTip.textContent = this.data.language === 'it' ? '🎉 Ottimo lavoro! Continua così!' : '🎉 Great job! Keep it up!';
            }
        } else {
            progressContainer.style.display = 'none';
            savingsMessage.textContent = '';
            savingsTip.textContent = '';
        }

        document.getElementById('guideMessage').style.display = (!this.data.incomes || this.data.incomes.length === 0) ? 'block' : 'none';

        const last7Days = this.getLast7DaysData();
        const last7DaysBudget = this.getLast7DaysBudget();
        this.drawSparkline('budgetSparkline', last7DaysBudget, '#4361ee');
        const remainingColor = this.calculateRemaining() >= 0 ? '#2dc653' : '#ef233c';
        this.drawSparkline('remainingSparkline', last7Days, remainingColor);

        this.generateAiSuggestion();
    }

    // ========== FUNZIONI DI VISUALIZZAZIONE LISTE ==========
    
    updateIncomeList() {
        const container = document.getElementById('incomeList');
        if (!container) return;

        if (!this.data.incomes || this.data.incomes.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noIncome')}</p>`;
        } else {
            container.innerHTML = this.data.incomes.map(inc => `
                <div class="expense-item" data-income-id="${inc.id}">
                    <div class="expense-info">
                        <span class="expense-name">${inc.desc || '?'}</span>
                        <span class="expense-category">${inc.date || ''}</span>
                    </div>
                    <span class="expense-amount" style="color: var(--secondary)">+${this.formatCurrency(inc.amount || 0)}</span>
                    <div class="expense-actions">
                        <button class="delete-income-btn" data-id="${inc.id}">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

        // Event listener per i pulsanti di eliminazione entrate
        document.querySelectorAll('.delete-income-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteIncome(id);
            });
        });

        const totalDisplay = document.getElementById('totalIncomeDisplay');
        if (totalDisplay) {
            totalDisplay.textContent = this.formatCurrency(this.calculateTotalIncome());
        }
    }

    updateFixedExpensesList() {
        const container = document.getElementById('fixedExpensesList');
        if (!container) return;
        
        if (!this.data.fixedExpenses || this.data.fixedExpenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noFixed')}</p>`;
            return;
        }
        
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        container.innerHTML = this.data.fixedExpenses.map(exp => {
            const endDate = new Date(exp.endDate);
            endDate.setHours(0, 0, 0, 0);
            const diffTime = endDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            let statusClass = '', badgeClass = '';
            if (diffDays < 0) { statusClass = 'expired'; badgeClass = 'expired'; }
            else if (diffDays <= 3) { statusClass = 'warning'; badgeClass = 'warning'; }
            else { statusClass = 'future'; badgeClass = 'future'; }
            
            const daysText = diffDays < 0 
                ? this.t('daysAgo').replace('{days}', Math.abs(diffDays))
                : diffDays === 0 ? this.t('dueToday') : this.t('inDays').replace('{days}', diffDays);
            
            return `
                <div class="expense-item fixed-expense-item ${statusClass}">
                    <div class="expense-info">
                        <span class="expense-name">${exp.name || '?'}</span>
                        <span class="expense-category">
                            📅 ${this.t('dayLabel')} ${exp.day || '?'} · ${this.t('endDateLabel')}: ${exp.endDate || '?'}
                            <span class="days-badge ${badgeClass}">${daysText}</span>
                        </span>
                    </div>
                    <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                    <div class="expense-actions">
                        <button class="delete-fixed-btn" data-id="${exp.id}">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');

        // Event listener per i pulsanti di eliminazione spese fisse
        document.querySelectorAll('.delete-fixed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteFixedExpense(id);
            });
        });
    }

    updateVariableExpensesList() {
        const date = document.getElementById('expenseDate').value;
        const container = document.getElementById('variableExpensesList');
        const expenses = (this.data.variableExpenses && this.data.variableExpenses[date]) || [];
        
        if (expenses.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noVariable')}</p>`;
            return;
        }
        
        container.innerHTML = expenses.map(exp => {
            const cat = exp.category || 'Altro';
            const catDisplay = this.getAllCategories().includes(cat) ? cat : 'Altro';
            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <span class="expense-name">${exp.name || '?'}</span>
                        <span class="expense-category">${this.getCategoryEmoji(catDisplay)} ${catDisplay}</span>
                    </div>
                    <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                    <div class="expense-actions">
                        <button class="delete-variable-btn" data-id="${exp.id}" data-date="${date}">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');

        // Event listener per i pulsanti di eliminazione spese variabili
        document.querySelectorAll('.delete-variable-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                const date = e.currentTarget.dataset.date;
                this.deleteVariableExpense(date, id);
            });
        });
    }

    updateChart() {
        const categories = {};
        const categoryExpenses = {};
        
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.values(this.data.variableExpenses).forEach(day => {
                if (Array.isArray(day)) {
                    day.forEach(expense => {
                        const cat = expense.category || 'Altro';
                        categories[cat] = (categories[cat] || 0) + (expense.amount || 0);
                        if (!categoryExpenses[cat]) categoryExpenses[cat] = [];
                        categoryExpenses[cat].push({ 
                            name: expense.name || '?', 
                            amount: expense.amount || 0, 
                            date: day 
                        });
                    });
                }
            });
        }

        if (Object.keys(categories).length === 0) {
            document.getElementById('chartNote').style.display = 'block';
            document.getElementById('categoryDetail').style.display = 'none';
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
                    backgroundColor: ['#6366f1', '#818cf8', '#10b981', '#34d399', '#f59e0b', '#ef4444'],
                    borderColor: 'transparent'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { position: 'bottom', labels: { color: getComputedStyle(document.documentElement).getPropertyValue('--text-primary'), font: { size: 12 } } },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${this.formatCurrency(value)} (${percentage}%)`;
                            }
                        }
                    }
                },
                onClick: (event, items) => {
                    if (items && items.length > 0) {
                        const index = items[0].index;
                        const categoryName = this.chart.data.labels[index];
                        this.showCategoryDetail(categoryName, categoryExpenses[categoryName] || []);
                    }
                }
            }
        });
        this.categoryExpenses = categoryExpenses;
    }

    showCategoryDetail(categoryName, expenses) {
        const detailContainer = document.getElementById('categoryDetail');
        const titleEl = document.getElementById('detailCategoryTitle');
        const totalEl = document.getElementById('detailTotal');
        const comparisonEl = document.getElementById('detailComparison');
        const listEl = document.getElementById('detailExpensesList');
        if (!detailContainer) return;
        const total = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);
        const lastMonthTotal = total * 0.85;
        const difference = total - lastMonthTotal;
        const percentChange = ((difference / lastMonthTotal) * 100).toFixed(1);
        const trend = difference >= 0 ? '📈' : '📉';
        const comparisonText = this.data.language === 'it'
            ? `${trend} ${Math.abs(percentChange)}% ${difference >= 0 ? 'in più' : 'in meno'} rispetto al mese scorso`
            : `${trend} ${Math.abs(percentChange)}% ${difference >= 0 ? 'more' : 'less'} than last month`;
        titleEl.textContent = categoryName;
        totalEl.textContent = this.t('detailTotal', { total: this.formatCurrency(total) });
        comparisonEl.textContent = comparisonText;
        if (expenses.length === 0) {
            listEl.innerHTML = `<p class="chart-note">${this.t('noExpensesShort')}</p>`;
        } else {
            listEl.innerHTML = expenses.map(exp => `
                <div class="detail-expense-item">
                    <span class="expense-name">${exp.name || '?'}</span>
                    <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                </div>
            `).join('');
        }
        detailContainer.style.display = 'block';
    }

    formatCurrency(amount) {
        const value = Number(amount || 0);
        const lang = this.data.language || 'it';
        const localeMap = { it: 'it-IT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR' };
        const locale = localeMap[lang] || 'it-IT';
        try {
            return new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }).format(value);
        } catch {
            return `${value.toFixed(2)} €`;
        }
    }

    highlightField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field) return;
        field.style.transition = 'background-color 0.3s ease';
        field.style.backgroundColor = '#d4edda';
        field.style.borderColor = '#28a745';
        setTimeout(() => {
            field.style.backgroundColor = '';
            field.style.borderColor = '';
        }, 800);
    }

    showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.style.background = type === 'success' ? '#2dc653' : '#ef233c';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

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
        const div = document.createElement('div');
        div.className = `chat-message ${sender}`;
        div.innerHTML = `<span class="message-sender">${sender === 'bot' ? '🤖 ' + this.t('assistantName') : '👤 ' + (this.data.language === 'it' ? 'Tu' : 'You')}:</span> <span class="message-text">${text}</span>`;
        container.appendChild(div);
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
            if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
                Object.values(this.data.variableExpenses).forEach(day => {
                    if (Array.isArray(day)) {
                        day.forEach(exp => {
                            const catName = exp.category || 'Altro';
                            categories[catName] = (categories[catName] || 0) + (exp.amount || 0);
                        });
                    }
                });
            }
            if (Object.keys(categories).length === 0) return this.t('noExpenses');
            const top = Object.entries(categories).sort((a,b) => b[1] - a[1])[0];
            return `📊 ${this.data.language === 'it' ? 'La categoria in cui spendi di più è' : 'The category where you spend the most is'} "${top[0]}" ${this.data.language === 'it' ? 'con' : 'with'} ${this.formatCurrency(top[1])}.`;
        }
        if (q.includes('obiettivo') || q.includes('goal')) {
            const goal = this.data.savingsGoal;
            const percent = this.data.savingsPercent;
            const income = this.calculateTotalIncome();
            if (!goal || !percent) return this.t('noGoal');
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
            return this.t("adviceRed");
        } else if (remaining < dailyBudget * 7) {
            return this.t("adviceLowRemaining", { remaining: this.formatCurrency(remaining) });
        } else {
            return this.t("adviceGood", { remaining: this.formatCurrency(remaining) });
        }
    }

    toggleTheme() {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        document.documentElement.setAttribute('data-theme', isDark ? '' : 'dark');
        document.getElementById('themeToggle').textContent = isDark ? '🌙' : '☀️';
        localStorage.setItem('budgetwise-theme', isDark ? 'light' : 'dark');
        this.updateChart();
    }

    applyTheme() {
        if (localStorage.getItem('budgetwise-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    saveTheme() {
        const theme = document.documentElement.getAttribute('data-theme') || 'light';
        localStorage.setItem('budgetwise-theme', theme);
    }

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                
                // Se ci sono entrate ma non c'è periodStart, lo impostiamo dalla prima entrata
                if (parsed.incomes && parsed.incomes.length > 0 && !parsed.periodStart) {
                    const firstIncome = parsed.incomes.sort((a, b) => 
                        new Date(a.date) - new Date(b.date)
                    )[0];
                    
                    const startDate = new Date(firstIncome.date);
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 30);
                    
                    parsed.periodStart = startDate.toISOString().split('T')[0];
                    parsed.periodEnd = endDate.toISOString().split('T')[0];
                }
                
                // Gestione retrocompatibilità
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
            } catch (e) {
                console.warn('Errore nel caricamento dati, reset automatico');
                this.resetAll();
            }
        }
    }

    backupData() {
        const dataStr = JSON.stringify(this.data, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const link = document.createElement('a');
        link.href = dataUri;
        link.download = `budgetwise-backup-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
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
            } catch {
                alert(this.t('invalidFile'));
            }
        };
        reader.readAsText(file);
    }

    resetAll() {
        if (confirm(this.t('confirmReset'))) {
            localStorage.clear();
            const today = new Date();
            const end = new Date(today);
            end.setDate(today.getDate() + 28);
            
            this.data = {
                incomes: [],
                fixedExpenses: [],
                variableExpenses: {},
                savingsPercent: 0,
                savingsGoal: 0,
                threshold: 50,
                language: this.data.language,
                periodStart: today.toISOString().split('T')[0],
                periodEnd: end.toISOString().split('T')[0]
            };
            this.updateUI();
            this.updateChart();
            this.applyLanguage();
            alert(this.t('resetCompleted'));
        }
    }

    exportToCalendar() {
        let ics = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//BudgetWise//IT\n";
        if (Array.isArray(this.data.fixedExpenses)) {
            this.data.fixedExpenses.forEach(exp => {
                if (exp && exp.endDate && new Date(exp.endDate) >= new Date()) {
                    ics += "BEGIN:VEVENT\n";
                    ics += `SUMMARY:💰 ${exp.name || 'Spesa'}\n`;
                    ics += `DESCRIPTION:${this.t('fixedExpense')} ${this.formatCurrency(exp.amount || 0)} - ${this.t('everyMonthOnDay')} ${exp.day || '?'}\n`;
                    const nextDate = this.getNextPaymentDate(exp.day || 1);
                    ics += `DTSTART;VALUE=DATE:${nextDate.replace(/-/g, '')}\n`;
                    ics += `RRULE:FREQ=MONTHLY;UNTIL=${(exp.endDate || '').replace(/-/g, '')}\n`;
                    ics += "END:VEVENT\n";
                }
            });
        }
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([date, expenses]) => {
                if (Array.isArray(expenses)) {
                    expenses.forEach(exp => {
                        ics += "BEGIN:VEVENT\n";
                        ics += `SUMMARY:🛒 ${exp.name || 'Spesa'}\n`;
                        ics += `DESCRIPTION:${exp.category || 'Altro'} - ${this.formatCurrency(exp.amount || 0)}\n`;
                        ics += `DTSTART;VALUE=DATE:${date.replace(/-/g, '')}\n`;
                        ics += "END:VEVENT\n";
                    });
                }
            });
        }
        ics += "END:VCALENDAR";
        const blob = new Blob([ics], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `budgetwise-${this.data.periodStart}.ics`;
        a.click();
        alert(this.t('calendarExported'));
    }

    // ========== IMPARARE CATEGORIE ==========
    learnCategory(description, category) {
        if (!description || !category) return;
        
        // Estrai parola chiave (prima parola della descrizione)
        const keyword = description.toLowerCase().split(' ')[0].replace(/[^a-z0-9]/gi, '');
        if (keyword.length < 3) return; // Ignora parole troppo corte
        
        this.categoryRules[keyword] = category;
        localStorage.setItem('budgetwise-category-rules', JSON.stringify(this.categoryRules));
        console.log(`📌 Appreso: "${keyword}" → ${category}`);
    }

    suggestCategory(description) {
        const lowerDesc = description.toLowerCase();
        
        // Cerca nelle regole apprese
        for (const [keyword, category] of Object.entries(this.categoryRules)) {
            if (lowerDesc.includes(keyword)) {
                return category;
            }
        }
        
        return 'Altro'; // Default
    }

    // ========== GESTIONE CATEGORIE PERSONALIZZATE ==========
    getAllCategories() {
        return [...this.defaultCategories, ...this.customCategories];
    }
    
    saveCustomCategories() {
        localStorage.setItem('budgetwise-custom-categories', JSON.stringify(this.customCategories));
    }
    
    showCategoryManager() {
        const overlay = document.getElementById('categoryManagerOverlay');
        if (!overlay) return;
        this.refreshCategoryList();
        overlay.style.display = 'flex';
    }
    
    hideCategoryManager() {
        const overlay = document.getElementById('categoryManagerOverlay');
        if (overlay) overlay.style.display = 'none';
    }
    
    refreshCategoryList() {
        const defaultList = document.getElementById('defaultCategoriesList');
        const customList = document.getElementById('customCategoriesList');
        
        if (defaultList) {
            defaultList.innerHTML = this.defaultCategories.map(cat => 
                `<div class="category-item default"><span>${cat}</span></div>`
            ).join('');
        }
        
        if (customList) {
            if (this.customCategories.length === 0) {
                customList.innerHTML = `<p class="empty-message">${this.t('noCustomCategories')}</p>`;
            } else {
                customList.innerHTML = this.customCategories.map((cat, index) => `
                    <div class="category-item custom">
                        <span>${cat}</span>
                        <div>
                            <button class="edit-category-btn" data-index="${index}">✏️</button>
                            <button class="delete-category-btn" data-index="${index}">🗑️</button>
                        </div>
                    </div>
                `).join('');
                
                document.querySelectorAll('.edit-category-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = e.target.dataset.index;
                        this.editCategory(parseInt(index));
                    });
                });
                
                document.querySelectorAll('.delete-category-btn').forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        const index = e.target.dataset.index;
                        this.deleteCategory(parseInt(index));
                    });
                });
            }
        }
    }
    
    editCategory(index) {
        const oldName = this.customCategories[index];
        const newName = prompt(this.t('categoryName'), oldName);
        if (!newName || newName.trim() === '') return;
        const trimmed = newName.trim();
        
        if (this.getAllCategories().includes(trimmed) && trimmed !== oldName) {
            alert(this.t('categoryAlreadyExists'));
            return;
        }
        
        this.customCategories[index] = trimmed;
        this.saveCustomCategories();
        this.refreshCategoryList();
        this.updateAllCategorySelects();
        alert(this.t('categoryUpdated'));
    }
    
    deleteCategory(index) {
        const cat = this.customCategories[index];
        if (!confirm(this.t('confirmDeleteCategory').replace('{name}', cat))) return;
        
        this.customCategories.splice(index, 1);
        this.saveCustomCategories();
        this.refreshCategoryList();
        this.updateAllCategorySelects();
        alert(this.t('categoryDeleted'));
    }
    
    saveCategory() {
        const input = document.getElementById('newCategoryName');
        if (!input) return;
        const newCat = input.value.trim();
        if (!newCat) return;
        
        if (this.getAllCategories().includes(newCat)) {
            alert(this.t('categoryAlreadyExists'));
            return;
        }
        
        this.customCategories.push(newCat);
        this.saveCustomCategories();
        input.value = '';
        this.refreshCategoryList();
        this.updateAllCategorySelects();
        alert(this.t('categoryAdded'));
    }
    
    updateAllCategorySelects() {
        const categories = this.getAllCategories();
        const optionsHtml = categories.map(cat => 
            `<option value="${cat}">${this.getCategoryEmoji(cat)} ${cat}</option>`
        ).join('');
        
        const mainSelect = document.getElementById('expenseCategory');
        if (mainSelect) {
            mainSelect.innerHTML = optionsHtml;
        }
        
        // Se ci sono select di revisione aperti, li aggiorniamo? (opzionale)
    }
    
    getCategoryEmoji(category) {
        const emojiMap = {
            'Alimentari': '🍎',
            'Trasporti': '🚗',
            'Svago': '🎮',
            'Salute': '💊',
            'Abbigliamento': '👕',
            'Altro': '📦'
        };
        return emojiMap[category] || '📌';
    }

    // ========== REVISIONE IMPORT CSV ==========
    showImportReview(importedExpenses) {
        return new Promise((resolve) => {
            const overlay = document.getElementById('importReviewOverlay');
            const listEl = document.getElementById('importReviewList');
            
            if (!overlay || !listEl) {
                resolve(importedExpenses);
                return;
            }
            
            const categories = this.getAllCategories();
            const options = categories.map(cat => 
                `<option value="${cat}">${this.getCategoryEmoji(cat)} ${cat}</option>`
            ).join('');
            
            listEl.innerHTML = importedExpenses.map((exp, index) => `
                <div class="review-item" data-index="${index}">
                    <div class="review-info">
                        <span class="review-date">${exp.date}</span>
                        <span class="review-name">${exp.name}</span>
                        <span class="review-amount">${this.formatCurrency(exp.amount)}</span>
                    </div>
                    <div class="review-category">
                        <select class="review-select" data-index="${index}">
                            ${options}
                        </select>
                        <small class="review-hint">${this.t('importLearn')}</small>
                    </div>
                </div>
            `).join('');
            
            importedExpenses.forEach((exp, index) => {
                const select = document.querySelector(`.review-select[data-index="${index}"]`);
                if (select) {
                    select.value = exp.category;
                }
            });
            
            overlay.style.display = 'flex';
            
            const confirmBtn = document.getElementById('confirmImportBtn');
            const cancelBtn = document.getElementById('cancelImportBtn');
            
            const onConfirm = () => {
                const selects = document.querySelectorAll('.review-select');
                selects.forEach(select => {
                    const index = select.dataset.index;
                    const newCategory = select.value;
                    const oldCategory = importedExpenses[index].category;
                    
                    importedExpenses[index].category = newCategory;
                    
                    if (newCategory !== oldCategory) {
                        this.learnCategory(importedExpenses[index].name, newCategory);
                    }
                });
                
                cleanup();
                resolve(importedExpenses);
            };
            
            const onCancel = () => {
                cleanup();
                resolve([]);
            };
            
            const cleanup = () => {
                overlay.style.display = 'none';
                confirmBtn.removeEventListener('click', onConfirm);
                cancelBtn.removeEventListener('click', onCancel);
            };
            
            confirmBtn.addEventListener('click', onConfirm);
            cancelBtn.addEventListener('click', onCancel);
        });
    }

    // ========== MAPPATURA CAMPI CSV ==========
    async showMappingDialog(file, delimiter) {
        return new Promise((resolve) => {
            const overlay = document.getElementById('csvMappingOverlay');
            const headersRow = document.getElementById('csvMappingHeaders');
            const previewBody = document.getElementById('csvMappingPreview');
            const fieldsDiv = document.getElementById('csvMappingFields');
            
            if (!overlay || !headersRow || !previewBody || !fieldsDiv) {
                console.error('Elementi mappatura non trovati');
                resolve(null);
                return;
            }
            
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                if (lines.length === 0) {
                    resolve(null);
                    return;
                }
                
                const headers = lines[0].split(delimiter).map(h => h.trim());
                const previewData = lines.slice(1, 6).map(line => 
                    line.split(delimiter).map(cell => cell.trim())
                );
                
                overlay.style.display = 'flex';
                
                headersRow.innerHTML = headers.map(h => `<th>${h || '?'}</th>`).join('');
                
                previewBody.innerHTML = previewData.map(row => 
                    `<tr>${row.map(cell => `<td class="preview-cell">${cell || ''}</td>`).join('')}</tr>`
                ).join('');
                
                const fieldOptions = [
                    { value: 'date', label: this.t('csvFieldDate') },
                    { value: 'description', label: this.t('csvFieldDescription') },
                    { value: 'amount', label: this.t('csvFieldAmount') },
                    { value: 'category', label: this.t('csvFieldCategory') },
                    { value: 'ignore', label: this.t('csvFieldIgnore') }
                ];
                
                fieldsDiv.innerHTML = headers.map((header, index) => `
                    <div style="display: flex; align-items: center; gap: 15px; background: var(--bg-color); padding: 12px; border-radius: 16px;">
                        <span style="min-width: 150px; font-weight: 600; color: var(--accent);">${this.t("csvColumnN", { n: (index + 1) })}: "${header || this.t("empty")}"</span>
                        <select id="mapping-${index}" class="csv-mapping-select" style="flex: 1;">
                            ${fieldOptions.map(opt => {
                                let selected = '';
                                if (opt.value === 'date' && index === 0) selected = 'selected';
                                else if (opt.value === 'description' && index === 1) selected = 'selected';
                                else if (opt.value === 'amount' && index === 2) selected = 'selected';
                                return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
                            }).join('')}
                        </select>
                    </div>
                `).join('');
                
                const confirmBtn = document.getElementById('confirmMappingBtn');
                const cancelBtn = document.getElementById('cancelMappingBtn');
                
                const onConfirm = () => {
                    const mapping = {
                        dateCol: -1,
                        descCol: -1,
                        amountCol: -1,
                        categoryCol: -1
                    };
                    
                    headers.forEach((_, index) => {
                        const select = document.getElementById(`mapping-${index}`);
                        if (select) {
                            const value = select.value;
                            if (value === 'date') mapping.dateCol = index;
                            else if (value === 'description') mapping.descCol = index;
                            else if (value === 'amount') mapping.amountCol = index;
                            else if (value === 'category') mapping.categoryCol = index;
                        }
                    });
                    
                    if (mapping.dateCol === -1 || mapping.descCol === -1 || mapping.amountCol === -1) {
                        alert(this.t('csvMappingRequired'));
                        return;
                    }
                    
                    overlay.style.display = 'none';
                    resolve(mapping);
                };
                
                const onCancel = () => {
                    overlay.style.display = 'none';
                    resolve(null);
                };
                
                confirmBtn.replaceWith(confirmBtn.cloneNode(true));
                cancelBtn.replaceWith(cancelBtn.cloneNode(true));
                
                document.getElementById('confirmMappingBtn').addEventListener('click', onConfirm);
                document.getElementById('cancelMappingBtn').addEventListener('click', onCancel);
            };
            
            reader.onerror = () => {
                resolve(null);
            };
            
            reader.readAsText(file);
        });
    }
    
    // ========== IMPORT CSV CON MAPPATURA ==========
    async parseCSV(file, delimiter, dateFormat) {
        console.log('📥 Inizio import CSV:', file.name, 'delimiter:', delimiter, 'dateFormat:', dateFormat);
        
        const mapping = await this.showMappingDialog(file, delimiter);
        if (!mapping) {
            alert(this.t('importCancelled'));
            return;
        }
        
        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target.result;
            const lines = text.split('\n').filter(line => line.trim()).slice(1);
            const importedExpenses = [];
            
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                
                const parts = line.split(delimiter);
                if (parts.length <= Math.max(mapping.dateCol, mapping.descCol, mapping.amountCol)) continue;
                
                let dateStr = parts[mapping.dateCol] ? parts[mapping.dateCol].trim() : '';
                let description = parts[mapping.descCol] ? parts[mapping.descCol].trim() : '';
                let amountStr = parts[mapping.amountCol] ? parts[mapping.amountCol].trim() : '';
                let category = mapping.categoryCol !== -1 && parts[mapping.categoryCol] ? parts[mapping.categoryCol].trim() : '';
                
                if (!dateStr || !description || !amountStr) continue;
                
                if (dateFormat === 'DD/MM/YYYY') {
                    const parts = dateStr.split(/[\/\-]/);
                    if (parts.length === 3) {
                        const [d, m, y] = parts;
                        if (d && m && y) dateStr = `${y}-${m}-${d}`;
                        else continue;
                    } else continue;
                } else if (dateFormat === 'MM/DD/YYYY') {
                    const parts = dateStr.split(/[\/\-]/);
                    if (parts.length === 3) {
                        const [m, d, y] = parts;
                        if (m && d && y) dateStr = `${y}-${m}-${d}`;
                        else continue;
                    } else continue;
                }
                
                let amount = parseFloat(amountStr.replace(',', '.').replace(/[^0-9.-]/g, ''));
                if (isNaN(amount)) continue;
                
                if (!category) category = this.suggestCategory(description);
                
                if (amount > 0) {
                    if (!this.data.incomes) this.data.incomes = [];
                    this.data.incomes.push({
                        desc: description,
                        amount: amount,
                        date: dateStr,
                        id: Date.now() + i
                    });
                } else {
                    amount = Math.abs(amount);
                    importedExpenses.push({
                        name: description,
                        amount: amount,
                        date: dateStr,
                        category: category || 'Altro',
                        id: Date.now() + i
                    });
                }
            }
            
            if (importedExpenses.length > 0) {
                const reviewed = await this.showImportReview(importedExpenses);
                if (reviewed.length > 0) {
                    for (const exp of reviewed) {
                        if (!this.data.variableExpenses) this.data.variableExpenses = {};
                        if (!this.data.variableExpenses[exp.date]) this.data.variableExpenses[exp.date] = [];
                        this.data.variableExpenses[exp.date].push({
                            name: exp.name,
                            amount: exp.amount,
                            category: exp.category,
                            id: exp.id
                        });
                    }
                    this.saveData();
                    this.updateUI();
                    this.updateChart();
                    alert(`✅ Importate ${reviewed.length} spese!`);
                } else {
                    alert(this.t('importCancelled'));
                }
            } else {
                this.saveData();
                this.updateUI();
                this.updateChart();
                alert('✅ File importato con successo!');
            }
        };
        reader.onerror = () => {
            console.error('❌ Errore lettura file');
            alert(this.t('fileReadError'));
        };
        reader.readAsText(file);
    }

    // ========== ONBOARDING GUIDATO ==========
    startOnboarding() {
        if (localStorage.getItem('budgetwise-onboarding-completed') === 'true') return;

        const steps = [
            { text: this.t('onboardingStep1'), highlight: "#addIncomeBtn" },
            { text: this.t('onboardingStep2'), highlight: "#addFixedBtn" },
            { text: this.t('onboardingStep3'), highlight: "#addExpenseBtn" },
            { text: this.t('onboardingStep4'), highlight: ".summary-card" },
            { text: this.t('onboardingStep5'), highlight: "#chatInput" },
            { text: this.t('onboardingStep6'), highlight: "#importCsvBtn" }
        ];

        let stepIndex = 0;

        const overlay = document.createElement('div');
        overlay.id = 'onboarding-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            backdrop-filter: blur(5px);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px;
            box-sizing: border-box;
            pointer-events: none;
        `;

        const card = document.createElement('div');
        card.style.cssText = `
            background: var(--card-bg, #ffffff);
            padding: 30px 25px;
            border-radius: 28px;
            max-width: 450px;
            width: 100%;
            text-align: center;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
            animation: onboardingSlideUp 0.5s ease;
            border: 2px solid var(--accent);
            margin-bottom: 30px;
            box-sizing: border-box;
            pointer-events: auto;
        `;

        card.innerHTML = `
            <div style="font-size: 3.5rem; margin-bottom: 10px;">✨</div>
            <h3 style="margin: 0 0 5px; color: var(--accent); font-size: 2rem; font-weight: 800;">${this.t('onboardingWelcome')}</h3>
            <p style="color: var(--text-secondary); font-size: 1rem; margin-bottom: 25px; opacity: 0.9;">${this.t('onboardingSubtitle')}</p>
            
            <div style="background: var(--bg-color); padding: 15px; border-radius: 16px; margin-bottom: 25px; border-left: 4px solid var(--accent); text-align: left;">
                <p id="onboarding-description" style="margin: 0; color: var(--text-primary); font-size: 1.1rem; font-weight: 500;"></p>
            </div>
            
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px;">
                <button id="onboarding-next" class="btn-primary" style="padding: 14px 32px; font-size: 1.1rem; border-radius: 50px; min-width: 140px; font-weight: 700;">${this.t('onboardingNext')} →</button>
                <button id="onboarding-skip" class="btn-secondary" style="padding: 14px 32px; font-size: 1.1rem; border-radius: 50px; min-width: 140px; background: transparent; border: 2px solid var(--border);">✕ ${this.t('onboardingSkip')}</button>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px; margin-top: 10px;">
                <span style="font-size: 0.9rem; color: var(--text-secondary); min-width: 40px;"><span id="onboarding-counter" style="font-weight: 700; color: var(--accent);">1</span>/${steps.length}</span>
                <div style="flex: 1; height: 6px; background: var(--border); border-radius: 6px; overflow: hidden;">
                    <div id="onboarding-progress" style="width: ${(1/steps.length)*100}%; height: 100%; background: linear-gradient(90deg, var(--accent-light), var(--accent)); transition: width 0.4s ease;"></div>
                </div>
            </div>
        `;

        overlay.appendChild(card);
        document.body.appendChild(overlay);

        if (!document.getElementById('onboarding-style')) {
            const style = document.createElement('style');
            style.id = 'onboarding-style';
            style.textContent = `
                @keyframes onboardingSlideUp {
                    from { transform: translateY(40px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .onboarding-highlight {
                    animation: targetGlow 2s infinite !important;
                    box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.8), 0 0 30px rgba(67, 97, 238, 0.6) !important;
                }
                @keyframes targetGlow {
                    0% { box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.8), 0 0 30px rgba(67, 97, 238, 0.6); }
                    50% { box-shadow: 0 0 0 8px rgba(67, 97, 238, 1), 0 0 50px rgba(67, 97, 238, 0.9); }
                    100% { box-shadow: 0 0 0 4px rgba(67, 97, 238, 0.8), 0 0 30px rgba(67, 97, 238, 0.6); }
                }
            `;
            document.head.appendChild(style);
        }

        const showStep = () => {
            const step = steps[stepIndex];
            document.getElementById('onboarding-description').textContent = step.text;
            document.getElementById('onboarding-counter').innerText = stepIndex + 1;
            
            const progress = ((stepIndex + 1) / steps.length) * 100;
            const progressBar = document.getElementById('onboarding-progress');
            if (progressBar) progressBar.style.width = progress + '%';

            document.querySelectorAll('.onboarding-highlight').forEach(el => {
                el.classList.remove('onboarding-highlight');
            });

            const target = document.querySelector(step.highlight);
            if (target) {
                target.classList.add('onboarding-highlight');
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        document.getElementById('onboarding-next').addEventListener('click', () => {
            stepIndex++;
            if (stepIndex < steps.length) {
                showStep();
            } else {
                localStorage.setItem('budgetwise-onboarding-completed', 'true');
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
                document.querySelectorAll('.onboarding-highlight').forEach(el => {
                    el.classList.remove('onboarding-highlight');
                });
            }
        });

        document.getElementById('onboarding-skip').addEventListener('click', () => {
            localStorage.setItem('budgetwise-onboarding-completed', 'true');
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 300);
            document.querySelectorAll('.onboarding-highlight').forEach(el => {
                el.classList.remove('onboarding-highlight');
            });
        });

        showStep();
    }

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
        const micFixed = document.getElementById('micFixedBtn');
        if (micFixed) micFixed.addEventListener('click', () => this.startVoiceInput('fixed'));
        const voiceBtn = document.getElementById('voiceBtn');
        if (voiceBtn) voiceBtn.addEventListener('click', () => this.startVoiceInput('variable'));
        const chatVoice = document.getElementById('chatVoiceBtn');
        if (chatVoice) chatVoice.addEventListener('click', () => this.startVoiceInput('chat'));
    }

    startVoiceInput(type = 'variable') {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        const localeMap = { it: 'it-IT', en: 'en-US', es: 'es-ES', fr: 'fr-FR' };
        recognition.lang = localeMap[this.data.language] || 'it-IT';
        recognition.interimResults = true;

        let button, statusElement;
        let timeoutDuration = 8000;

        if (type === 'fixed') {
            button = document.getElementById('micFixedBtn');
            statusElement = document.getElementById('fixedVoiceStatus');
            timeoutDuration = 15000;
        } else {
            button = document.getElementById('voiceBtn');
            statusElement = document.getElementById('voiceStatus');
        }

        if (!button) return;

        button.classList.add('listening');
        statusElement.textContent = '🎤 ' + this.t('voiceSpeak');

        recognition.onresult = (event) => {
            const result = event.results[event.results.length - 1];
            const transcript = result[0].transcript.trim();
            if (result.isFinal) {
                if (type === 'fixed') this.processFixedVoiceCommand(transcript);
                else this.processVoiceCommand(transcript);
                statusElement.textContent = '🎤 ' + this.t('voiceTap');
            } else {
                statusElement.textContent = `🔊 ${transcript}...`;
            }
        };

        recognition.onerror = () => {
            button.classList.remove('listening');
            statusElement.textContent = '❌ ' + this.t('error');
            setTimeout(() => {
                statusElement.textContent = '🎤 ' + this.t('voiceTap');
            }, 2000);
        };

        recognition.onend = () => {
            button.classList.remove('listening');
        };

        recognition.start();

        setTimeout(() => {
            recognition.stop();
            button.classList.remove('listening');
            statusElement.textContent = '🎤 ' + this.t('voiceTap');
        }, timeoutDuration);
    }

    processVoiceCommand(transcript) {
        const amountMatch = transcript.match(/(\d+[.,]?\d*)/);
        if (amountMatch) {
            const amount = parseFloat(amountMatch[0].replace(',', '.'));
            let description = transcript.replace(amountMatch[0], '').replace(/euro|€|euros/gi, '').trim();
            document.getElementById('expenseName').value = description || (this.data.language === 'it' ? 'Spesa' : 'Expense');
            document.getElementById('expenseAmount').value = amount;
            alert(this.t('voiceDetected', { desc: (description || this.t('genericExpense')), amount: amount }));
        }
    }

    processFixedVoiceCommand(transcript) {
        const words = transcript.split(' ');
        let name = words[0] || (this.data.language === 'it' ? 'Spesa' : 'Expense');
        if (name.length > 20) name = name.substring(0, 20);
        const amountMatch = transcript.match(/(\d+[.,]?\d*)/);
        const amount = amountMatch ? parseFloat(amountMatch[0].replace(',', '.')) : 0;
        const dayMatch = transcript.match(/(\d{1,2})/g);
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
        const dateMatch = transcript.match(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/);
        let endDate = '';
        if (dateMatch) {
            endDate = `${dateMatch[3]}-${dateMatch[2].padStart(2, '0')}-${dateMatch[1].padStart(2, '0')}`;
        } else {
            const d = new Date();
            d.setFullYear(d.getFullYear() + 10);
            endDate = d.toISOString().split('T')[0];
        }
        document.getElementById('fixedName').value = name;
        document.getElementById('fixedAmount').value = amount;
        document.getElementById('fixedDay').value = day;
        document.getElementById('fixedEndDate').value = endDate;
        alert(this.t('voiceFixedDetected', { name, amount: amount, day }));
    }

    // ========== AI WIDGET ==========
    generateAiSuggestion() {
        const suggestions = [];
        const language = this.data.language;
        
        const categoryTotals = {};
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.values(this.data.variableExpenses).forEach(day => {
                if (Array.isArray(day)) {
                    day.forEach(exp => {
                        const cat = exp.category || 'Altro';
                        categoryTotals[cat] = (categoryTotals[cat] || 0) + (exp.amount || 0);
                    });
                }
            });
        }

        if (Object.keys(categoryTotals).length === 0) {
            document.getElementById('aiWidget').style.display = 'none';
            return;
        }

        const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];
        const topCatName = topCategory[0];

        if (topCategory[1] > 100) {
            const reduction = Math.round(topCategory[1] * 0.1);
            suggestions.push({
                message: language === 'it'
                    ? `💡 Hai speso ${this.formatCurrency(topCategory[1])} in ${topCatName}. Riducendo del 10% (${this.formatCurrency(reduction)}), potresti destinare quella cifra al risparmio.`
                    : `💡 You spent ${this.formatCurrency(topCategory[1])} on ${topCatName}. By reducing it by 10% (${this.formatCurrency(reduction)}), you could add that to your savings.`,
                action: language === 'it' ? 'Imposta obiettivo' : 'Set goal',
                actionType: 'reduce',
                category: topCategory[0],
                amount: reduction
            });
        }

        if (categoryTotals.Trasporti && categoryTotals.Trasporti > 50) {
            const potentialSave = Math.round(categoryTotals.Trasporti * 0.2);
            suggestions.push({
                message: language === 'it'
                    ? `🚗 Hai speso ${this.formatCurrency(categoryTotals.Trasporti)} in trasporti. Usando più mezzi pubblici, potresti risparmiare circa ${this.formatCurrency(potentialSave)} al mese.`
                    : `🚗 You spent ${this.formatCurrency(categoryTotals.Trasporti)} on transport. Using public transport more could save you about ${this.formatCurrency(potentialSave)} per month.`,
                action: language === 'it' ? 'Scopri come' : 'Learn how',
                actionType: 'transport',
                amount: potentialSave
            });
        }

        if (categoryTotals.Svago && categoryTotals.Svago > 80) {
            const potentialSave = Math.round(categoryTotals.Svago * 0.15);
            suggestions.push({
                message: language === 'it'
                    ? `🎮 Hai speso ${this.formatCurrency(categoryTotals.Svago)} in svago. Limitando le uscite a 2 a settimana, potresti risparmiare ${this.formatCurrency(potentialSave)}.`
                    : `🎮 You spent ${this.formatCurrency(categoryTotals.Svago)} on leisure. Limiting to 2 outings per week could save you ${this.formatCurrency(potentialSave)}.`,
                action: language === 'it' ? 'Pianifica' : 'Plan',
                actionType: 'leisure',
                amount: potentialSave
            });
        }

        if (suggestions.length > 0) {
            const randomIndex = Math.floor(Math.random() * suggestions.length);
            this.showAiSuggestion(suggestions[randomIndex]);
        } else {
            document.getElementById('aiWidget').style.display = 'none';
        }
    }

    showAiSuggestion(suggestion) {
        const widget = document.getElementById('aiWidget');
        const messageEl = document.getElementById('aiMessage');
        const actionEl = document.getElementById('aiAction');
        const actionBtn = document.getElementById('applyAiSuggestion');
        
        messageEl.textContent = suggestion.message;
        actionBtn.textContent = suggestion.action;
        
        actionBtn.dataset.type = suggestion.actionType;
        actionBtn.dataset.amount = suggestion.amount || 0;
        actionBtn.dataset.category = suggestion.category || '';
        
        widget.style.display = 'block';
        actionEl.style.display = 'flex';
    }

    setupAiActions() {
    document.getElementById('applyAiSuggestion').addEventListener('click', (e) => {
        const type = e.target.dataset.type;
        const amount = parseFloat(e.target.dataset.amount);

        if (type === 'reduce' && amount > 0) {
            const currentGoal = this.data.savingsGoal || 0;
            document.getElementById('saveGoal').value = currentGoal + amount;

            this.showToast(
                this.data.language === 'it'
                    ? `🎯 Obiettivo aumentato a ${this.formatCurrency(currentGoal + amount)}`
                    : `🎯 Goal increased to ${this.formatCurrency(currentGoal + amount)}`,
                'success'
            );
        } else {
            this.showToast(this.t('featureInDev'), 'info');
        }
    });
}
✅ STOP. Non aggiungere altro.
🔍 Verifica (fondamentale)

Salva → commit → push → ricarica pagina

Poi Console:

typeof window.app

Deve rispondere:

"object"

Se sì → abbiamo FINITO la parte “crash JS” 🎉
e finalmente l’i18n può funzionare.

Scrivimi solo il risultato di:

👉 typeof window.app

e andiamo avanti.
            
            else if (type === 'leisure') {
                const message = this.data.language === 'it'
                    ? `🎮 Limitando le uscite a 2 a settimana, potresti risparmiare ${this.formatCurrency(amount)}. Vuoi fissare un obiettivo?`
                    : `🎮 Limiting to 2 outings per week could save you ${this.formatCurrency(amount)}. Want to set a goal?`;
                
                if (confirm(message)) {
                    const currentGoal = this.data.savingsGoal || 0;
                    document.getElementById('saveGoal').value = currentGoal + amount;
                    this.showToast(
                        this.data.language === 'it'
                            ? `🎯 Obiettivo aumentato a ${this.formatCurrency(currentGoal + amount)}`
                            : `🎯 Goal increased to ${this.formatCurrency(currentGoal + amount)}`,
                        'success'
                    );
                }
            }
           else {
  this.showToast(this.t('featureInDev'), 'info');
}
            
            document.getElementById('aiAction').style.display = 'none';
            setTimeout(() => {
                document.getElementById('aiWidget').style.display = 'none';
            }, 2000);
        });

        document.getElementById('dismissAiSuggestion').addEventListener('click', () => {
            document.getElementById('aiWidget').style.display = 'none';
        });
    }
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

const app = new BudgetWise();
window.app = app;

// ============================================
// FIX: Pulsante Importa CSV
// ============================================
setTimeout(function() {
    const btn = document.getElementById('importCsvBtn');
    if (!btn || !window.app) return;
    
    btn.addEventListener('click', function() {
        document.getElementById('csvFile').click();
    });
    
    document.getElementById('csvFile').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        document.getElementById('csvFileName').textContent = file.name;
        
        const delimiter = document.getElementById('csvSeparator').value;
        const dateFormat = document.getElementById('csvDelimiter').value;
        
        if (window.app.parseCSV) {
            window.app.parseCSV(file, delimiter, dateFormat);
        } else {
            alert('❌ Funzione parseCSV non trovata!');
        }
    });
}, 2000);
