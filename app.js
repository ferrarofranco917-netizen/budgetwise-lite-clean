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
            savingsPot: 0,
            threshold: 50,
            language: 'it',
            // Periodo: viene inizializzato dopo l'assegnazione di this.data
            periodStart: '',
            periodEnd: ''
        };

        // Inizializza il periodo di default (oggi/+28) o basato su stipendio, se presente nei dati caricati.
        this.data.periodStart = this.getDefaultPeriodStart();
        this.data.periodEnd = this.getDefaultPeriodEnd();
        
        this.chart = null;
        this.burnChart = null;
        this.categoryExpenses = {};
        
        // ========== REGOLE CATEGORIE APPRESE (chiave -> { category, confidence }) ==========
        this.categoryRules = this.migrateCategoryRules(JSON.parse(localStorage.getItem('budgetwise-category-rules')) || {});
        this.CATEGORY_CONFIDENCE_THRESHOLD = 3; // >= 3 → auto-applica
        
        // ========== CATEGORIE PERSONALIZZATE ==========
        this.defaultCategories = ['Alimentari', 'Trasporti', 'Svago', 'Salute', 'Abbigliamento', 'Altro'];
        const savedCustom = JSON.parse(localStorage.getItem('budgetwise-custom-categories')) || [];
        this.customCategories = savedCustom.filter(cat => !this.defaultCategories.includes(cat));

        // ========== UI STATE ==========
        this.showAllExpenses = localStorage.getItem('budgetwise-show-all-expenses') === 'true';
        
        // ========== COLORI PERSONALIZZATI ==========
        const savedColors = localStorage.getItem('budgetwise-custom-colors');
        if (savedColors) {
            this.customColors = JSON.parse(savedColors);
        } else {
            this.customColors = null;
        }

        
        // Tema associato ai colori personalizzati (per evitare che blocchino la dark mode)
        this.customColorsTheme = localStorage.getItem('budgetwise-custom-colors-theme') || null;
// ========== TRADUZIONI ==========
        this.translations = {
            it: {
                plannedSavingsLabel: 'Risparmio pianificato',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Se porti il risparmio al {p}%, arrivi {m} mesi prima',
                resetColors: 'Ripristina colori predefiniti',
                budget: 'Budget giornaliero',
                weeklyReportTitle: '📝 Report settimanale',
                regenerateReport: 'Rigenera report',
                challengesTitle: '🎮 Sfide',
                challengeReduceDescTpl: 'Spendi {pct}% in meno nelle spese variabili per {weeks} settimane',
                challengeRewardAddTpl: 'Ricompensa: aggiungi {amount} al fondo risparmi',
                claimReward: '🎁 Ritira ricompensa',
                challengeProgressTpl: 'Settimane completate: {done}/{target}',
                remaining: 'Rimanenza',
                days: 'Giorni rimasti',
                period: 'Periodo',
                totalIncome: 'Totale entrate',
                startGuide: '👋 Inizia inserendo le tue entrate nella sezione qui sotto!',
                incomes: '🏦 Entrate del periodo',
                fixed: '📌 Spese fisse mensili',
                variable: '🧾 Spese variabili',
                chart: '📊 Distribuzione spese',
                burnRateTitle: '📈 Burn Rate del periodo',
                burnRateNote: 'Serve almeno un\'entrata per calcolare l\'andamento',
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
                onboardingStep6: '📥 Puoi anche importare movimenti bancari in formato CSV o Excel.',
                onboardingNext: 'Avanti →',
                onboardingSkip: 'Salta',
                
                // Import review
                importReview: '📋 Revisione spese importate',
                importConfirm: '✅ Conferma',
                importCancel: '✕ Annulla',
                importCategory: 'Categoria',
                importLearn: '📌 L\'app ricorderà questa scelta',
                importSuggested: 'Suggerito: {cat} (conferma per imparare)',
                
                // Traduzioni CSV
                csvTitle: '📥 Importa movimenti bancari',
                csvSubtitle: 'Scarica l\'estratto conto dalla tua banca in formato CSV o Excel (.xlsx)',
                csvChooseFile: 'Scegli file CSV o Excel',
                csvNoFile: 'Nessun file selezionato',
                csvImportBtn: '📥 Importa CSV / Excel',
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
                noCustomCategories: 'Nessuna categoria personalizzata',

                // NUOVE CHIAVI PER I TAB
                tabHome: '🏠 Home',
                tabIncomes: '🏦 Entrate',
                tabFixed: '📌 Fisse',
                tabVariable: '🧾 Variabili',
                tabTools: '🛠️ Strumenti',

                // NUOVE CHIAVI PER SKIP ROWS
                skipRowsLabel: 'Salta righe iniziali',
                headerRowManualLabel: 'Riga intestazione',
                skipHelp: '📌 Per file con righe iniziali (es. Fineco): salta le righe fino a trovare le colonne',

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
                onboardingDemo: '✨ Carica dati demo',
                onboardingEmpty: 'Inizia vuoto',
                you: 'Tu',
                adviceRed: '⚠️ Sei in rosso! Rivedi le spese.',
                adviceLowRemaining: '⚠️ Attenzione: ti rimangono solo {remaining} per i prossimi giorni.',
                adviceGood: '💪 Vai bene! Hai ancora {remaining} di margine.',
                aiSuggestionsTitle: '🤖 Suggerimenti AI',
                aiSmartBadge: 'intelligente',
                csvMappingTitle: '📋 Mappa le colonne del file CSV',
                csvMappingInstructionsHtml: '<strong>📌 Istruzioni:</strong> Associa ogni colonna del tuo file al campo corrispondente. Le righe con importo positivo saranno considerate <strong>entrate</strong>, quelle negative <strong>spese</strong>.',
                csvMappingFieldsTitle: '🎯 Associazione campi:',
                showAllExpenses: 'Mostra tutte le spese del periodo',
                edit: 'Modifica',
                categoriesSectionTitle: '📂 Gestione categorie',
                manageCustomCategories: '➕ Gestisci categorie personalizzate',
                newCategoryLabel: 'Nuova categoria',
                newCategoryPlaceholder: 'es. Viaggi',
                defaultCategoriesTitle: 'Categorie predefinite',
                yourCategoriesTitle: 'Le tue categorie',
                close: 'Chiudi',
            
                savingsPotInitial: "Fondo risparmi iniziale (€)",
                advancedOptions: "⚙️ Opzioni avanzate",
                hideOptions: "✕ Nascondi opzioni",
                customizeColorsTitle: "🎨 Personalizza colori",
                customizeColorsSubtitle: "Scegli i tuoi colori preferiti per l'app. Le modifiche sono immediate.",
                colorAccentLabel: "Colore principale (accento)",
                colorAccentLightLabel: "Colore secondario (accent-light)",
                colorCardBgLabel: "Sfondo card",
                colorTextPrimaryLabel: "Testo primario",
                colorTextSecondaryLabel: "Testo secondario",
                colorBgLabel: "Sfondo generale",
                colorSuccessLabel: "Successo (entrate)",
                colorDangerLabel: "Pericolo (spese)",
                colorWarningLabel: "Avviso",
                colorBorderLabel: "Bordi",
                noFixedInPeriod: "Nessuna spesa fissa nel periodo",
                fixedPaid: "✅ Pagata",
                fixedPlanned: "⏳ Prevista",
                loadDemoBtn: "✨ Carica dati demo",},
            de: {
                plannedSavingsLabel: 'Geplante Ersparnis',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Mit {p}% Ersparnis erreichst du das Ziel {m} Monate früher',
                resetColors: 'Standardfarben zurücksetzen',
                budget: 'Tagesbudget',
                weeklyReportTitle: '📝 Wochenbericht',
                regenerateReport: 'Bericht neu erstellen',
                challengesTitle: '🎮 Herausforderungen',
                challengeReduceDescTpl: 'Gib {pct}% weniger für Variable aus über {weeks} Wochen',
                challengeRewardAddTpl: 'Belohnung: {amount} zum Sparkonto hinzufügen',
                claimReward: '🎁 Belohnung abholen',
                challengeProgressTpl: 'Abgeschlossene Wochen: {done}/{target}',
                remaining: 'Verbleibend',
                days: 'Verbleibende Tage',
                period: 'Zeitraum',
                totalIncome: 'Gesamteinnahmen',
                startGuide: '👋 Beginne unten mit dem Hinzufügen deiner Einnahmen!',
                incomes: '🏦 Einnahmen im Zeitraum',
                fixed: '📌 Monatliche Fixkosten',
                variable: '🧾 Variable Ausgaben',
                chart: '📊 Ausgabenverteilung',
                burnRateTitle: '📈 Burn Rate des Zeitraums',
                burnRateNote: 'Füge mindestens eine Einnahme hinzu, um den Verlauf zu berechnen',
                assistant: '🤖 KI-Finanzassistent',
                savings: '🎯 Sparziel',
                settings: '⚙️ Einstellungen',
                languageLabel: '🌍 Sprache',
                thresholdLabel: '🔔 Warnschwelle (€)',
                backupLabel: '📅 Datensicherung',
                badge: 'mehrfach',
                addIncome: '➕ Einnahme hinzufügen',
                addFixed: '➕ Fixkosten hinzufügen',
                addExpense: '➕ Ausgabe hinzufügen',
                resetDay: '🗑️ Tagesausgaben löschen',
                applySavings: 'Sparen anwenden',
                backup: '💾 Backup herunterladen',
                restore: '📂 Wiederherstellen',
                resetAll: '⚠️ Komplett zurücksetzen',
                export: '📅 In Kalender exportieren',
                send: 'Senden',
                docTitle: '💰 BudgetWise 2.0 - Intelligente Finanzverwaltung',
                subtitle: 'Von Gehalt zu Gehalt — intelligente Verwaltung mit KI',
                positiveBalance: 'Positiver Saldo',
                negativeBalance: 'Warnung: negativer Saldo',
                onboardingWelcome: '👋 Willkommen bei BudgetWise',
                onboardingStep1: 'Füge unten dein erstes Gehalt oder Einkommen hinzu.',
                onboardingStep2: '📌 Füge eine monatliche Fixkosten hinzu (z. B. Miete, Rechnungen).',
                onboardingStep3: '🧾 Erfass eine variable Ausgabe wie Einkäufe.',
                onboardingStep4: '📊 Prüfe dein Tagesbudget in der oberen Karte.',
                onboardingStep5: '🤖 Frage den KI-Assistenten oder teste die Spracheingabe.',
                onboardingStep6: '📥 Du kannst auch Bankbewegungen im CSV- oder Excel-Format importieren.',
                onboardingNext: 'Weiter →',
                onboardingSkip: 'Überspringen',
                onboardingSubtitle: 'Folge der Schritt-für-Schritt-Anleitung',
                importReview: '📋 Importprüfung',
                importConfirm: '✅ Bestätigen',
                importCancel: '✕ Abbrechen',
                importCategory: 'Kategorie',
                importLearn: '📌 Die App merkt sich diese Auswahl',
                importSuggested: 'Vorgeschlagen: {cat} (bestätigen zum Lernen)',
                csvMappingTitle: '📋 CSV-Spalten zuordnen',
                csvMappingInstructionsHtml: '<strong>📌 Hinweise:</strong> Ordne jede CSV-Spalte dem passenden Feld zu. Positive Beträge sind <strong>Einnahmen</strong>, negative <strong>Ausgaben</strong>.',
                csvMappingFieldsTitle: '🎯 Feldzuordnung:',
                categoriesSectionTitle: '📂 Kategorienverwaltung',
                manageCustomCategories: '➕ Benutzerdefinierte Kategorien verwalten',
                newCategoryLabel: 'Neue Kategorie',
                newCategoryPlaceholder: 'z. B. Reisen',
                defaultCategoriesTitle: 'Standardkategorien',
                yourCategoriesTitle: 'Deine Kategorien',
                close: 'Schließen',
                manageCategories: '📂 Kategorien verwalten',
                addCategory: '➕ Kategorie hinzufügen',
                categoryName: 'Kategoriename',
                saveCategory: 'Speichern',
                deleteCategory: '🗑️ Löschen',
                confirmDeleteCategory: 'Möchtest du die Kategorie „{name}“ wirklich löschen?',
                categoryAlreadyExists: 'Kategorie bereits vorhanden',
                categoryAdded: '✅ Kategorie hinzugefügt!',
                categoryDeleted: '🗑️ Kategorie gelöscht',
                categoryUpdated: '✏️ Kategorie aktualisiert',
                showAllExpenses: 'Alle Ausgaben des Zeitraums anzeigen',
                edit: 'Bearbeiten',
                aiSuggestionsTitle: '🤖 KI-Vorschläge',
                aiSmartBadge: 'smart',
            
                savingsPotInitial: "Anfangs-Sparbetrag (€)",
                advancedOptions: "⚙️ Erweiterte Optionen",
                hideOptions: "✕ Optionen ausblenden",
                customizeColorsTitle: "🎨 Farben anpassen",
                customizeColorsSubtitle: "Wähle deine bevorzugten App-Farben. Änderungen werden sofort angewendet.",
                colorAccentLabel: "Primärfarbe (Akzent)",
                colorAccentLightLabel: "Sekundärfarbe (Akzent-hell)",
                colorCardBgLabel: "Kartenhintergrund",
                colorTextPrimaryLabel: "Primärer Text",
                colorTextSecondaryLabel: "Sekundärer Text",
                colorBgLabel: "App-Hintergrund",
                colorSuccessLabel: "Erfolg (Einnahmen)",
                colorDangerLabel: "Gefahr (Ausgaben)",
                colorWarningLabel: "Warnung",
                colorBorderLabel: "Rahmen",
                noFixedInPeriod: "Keine Fixkosten im Zeitraum",
                fixedPaid: "✅ Bezahlt",
                fixedPlanned: "⏳ Geplant",
                loadDemoBtn: "✨ Demo-Daten laden",},
            pt: {
                plannedSavingsLabel: 'Poupança planejada',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Com {p}% de poupança, você chega {m} meses antes ao objetivo',
                resetColors: 'Redefinir cores padrão',
                budget: 'Orçamento diário',
                weeklyReportTitle: '📝 Relatório semanal',
                regenerateReport: 'Regenerar relatório',
                challengesTitle: '🎮 Desafios',
                challengeReduceDescTpl: 'Gaste {pct}% menos em variáveis por {weeks} semanas',
                challengeRewardAddTpl: 'Recompensa: adicionar {amount} ao fundo de poupança',
                claimReward: '🎁 Resgatar recompensa',
                challengeProgressTpl: 'Semanas concluídas: {done}/{target}',
                remaining: 'Restante',
                days: 'Dias restantes',
                period: 'Período',
                totalIncome: 'Rendimento total',
                startGuide: '👋 Comece adicionando seus rendimentos abaixo!',
                incomes: '🏦 Rendimentos do período',
                fixed: '📌 Despesas fixas mensais',
                variable: '🧾 Despesas variáveis',
                chart: '📊 Distribuição de despesas',
                burnRateTitle: '📈 Burn Rate do período',
                burnRateNote: 'Adicione pelo menos um rendimento para calcular a tendência',
                assistant: '🤖 Assistente financeiro IA',
                savings: '🎯 Meta de poupança',
                settings: '⚙️ Definições',
                languageLabel: '🌍 Idioma',
                thresholdLabel: '🔔 Limite de alerta (€)',
                backupLabel: '📅 Backup de dados',
                badge: 'múltiplo',
                addIncome: '➕ Adicionar rendimento',
                addFixed: '➕ Adicionar despesa fixa',
                addExpense: '➕ Adicionar despesa',
                resetDay: '🗑️ Limpar despesas do dia',
                applySavings: 'Aplicar poupança',
                backup: '💾 Baixar backup',
                restore: '📂 Restaurar',
                resetAll: '⚠️ Redefinição completa',
                export: '📅 Exportar para o Calendário',
                send: 'Enviar',
                docTitle: '💰 BudgetWise 2.0 - Gestão financeira inteligente',
                subtitle: 'Salário a salário — gestão inteligente com IA',
                positiveBalance: 'Saldo positivo',
                negativeBalance: 'Atenção: saldo negativo',
                onboardingWelcome: '👋 Bem-vindo ao BudgetWise',
                onboardingStep1: 'Adicione abaixo seu primeiro salário ou rendimento.',
                onboardingStep2: '📌 Adicione uma despesa fixa mensal (ex. aluguel, contas).',
                onboardingStep3: '🧾 Registre uma despesa variável como supermercado.',
                onboardingStep4: '📊 Veja seu orçamento diário no cartão superior.',
                onboardingStep5: '🤖 Peça dicas ao assistente IA ou tente a voz.',
                onboardingStep6: '📥 Você também pode importar extratos bancários em CSV ou Excel.',
                onboardingNext: 'Avançar →',
                onboardingSkip: 'Pular',
                onboardingSubtitle: 'Siga o guia passo a passo',
                importReview: '📋 Revisão da importação',
                importConfirm: '✅ Confirmar',
                importCancel: '✕ Cancelar',
                importCategory: 'Categoria',
                importLearn: '📌 O app lembrará desta escolha',
                importSuggested: 'Sugerido: {cat} (confirme para aprender)',
                csvMappingTitle: '📋 Mapear colunas do CSV',
                csvMappingInstructionsHtml: '<strong>📌 Instruções:</strong> Associe cada coluna do CSV ao campo certo. Valores positivos são <strong>rendimentos</strong>, negativos são <strong>despesas</strong>.',
                csvMappingFieldsTitle: '🎯 Associação de campos:',
                categoriesSectionTitle: '📂 Gestão de categorias',
                manageCustomCategories: '➕ Gerir categorias personalizadas',
                newCategoryLabel: 'Nova categoria',
                newCategoryPlaceholder: 'ex. Viagens',
                defaultCategoriesTitle: 'Categorias padrão',
                yourCategoriesTitle: 'Suas categorias',
                close: 'Fechar',
                manageCategories: '📂 Gerir categorias',
                addCategory: '➕ Adicionar categoria',
                categoryName: 'Nome da categoria',
                saveCategory: 'Guardar',
                deleteCategory: '🗑️ Excluir',
                confirmDeleteCategory: 'Tem certeza de excluir a categoria “{name}”?',
                categoryAlreadyExists: 'Categoria já existe',
                categoryAdded: '✅ Categoria adicionada!',
                categoryDeleted: '🗑️ Categoria excluída',
                categoryUpdated: '✏️ Categoria atualizada',
                showAllExpenses: 'Mostrar todas as despesas do período',
                edit: 'Editar',
                aiSuggestionsTitle: '🤖 Sugestões IA',
                aiSmartBadge: 'inteligente',
            
                savingsPotInitial: "Fundo de poupança inicial (€)",
                advancedOptions: "⚙️ Opções avançadas",
                hideOptions: "✕ Ocultar opções",
                customizeColorsTitle: "🎨 Personalizar cores",
                customizeColorsSubtitle: "Escolha as cores preferidas do app. As alterações são imediatas.",
                colorAccentLabel: "Cor principal (acento)",
                colorAccentLightLabel: "Cor secundária (acento claro)",
                colorCardBgLabel: "Fundo do cartão",
                colorTextPrimaryLabel: "Texto principal",
                colorTextSecondaryLabel: "Texto secundário",
                colorBgLabel: "Fundo geral",
                colorSuccessLabel: "Sucesso (entradas)",
                colorDangerLabel: "Perigo (despesas)",
                colorWarningLabel: "Aviso",
                colorBorderLabel: "Bordas",
                noFixedInPeriod: "Nenhuma despesa fixa no período",
                fixedPaid: "✅ Paga",
                fixedPlanned: "⏳ Prevista",
                loadDemoBtn: "✨ Carregar dados de demonstração",},
            nl: {
                plannedSavingsLabel: 'Geplande besparing',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Met {p}% sparen bereik je het doel {m} maanden eerder',
                resetColors: 'Standaardkleuren herstellen',
                budget: 'Dagbudget',
                weeklyReportTitle: '📝 Wekelijks rapport',
                regenerateReport: 'Rapport opnieuw genereren',
                challengesTitle: '🎮 Uitdagingen',
                challengeReduceDescTpl: 'Besteed {pct}% minder in variabelen gedurende {weeks} weken',
                challengeRewardAddTpl: 'Beloning: voeg {amount} toe aan spaarpot',
                claimReward: '🎁 Beloning innen',
                challengeProgressTpl: 'Voltooide weken: {done}/{target}',
                remaining: 'Resterend',
                days: 'Dagen resterend',
                period: 'Periode',
                totalIncome: 'Totaal inkomen',
                startGuide: '👋 Begin hieronder met het toevoegen van je inkomen!',
                incomes: '🏦 Inkomsten van de periode',
                fixed: '📌 Maandelijkse vaste lasten',
                variable: '🧾 Variabele uitgaven',
                chart: '📊 Uitgavenverdeling',
                burnRateTitle: '📈 Burn Rate van de periode',
                burnRateNote: 'Voeg minstens één inkomen toe om de trend te berekenen',
                assistant: '🤖 AI-financiële assistent',
                savings: '🎯 Spaar doel',
                settings: '⚙️ Instellingen',
                languageLabel: '🌍 Taal',
                thresholdLabel: '🔔 Waarschuwingsdrempel (€)',
                backupLabel: '📅 Gegevensbackup',
                badge: 'meervoud',
                addIncome: '➕ Inkomst toevoegen',
                addFixed: '➕ Vaste last toevoegen',
                addExpense: '➕ Uitgave toevoegen',
                resetDay: '🗑️ Daguitgaven wissen',
                applySavings: 'Sparen toepassen',
                backup: '💾 Backup downloaden',
                restore: '📂 Herstellen',
                resetAll: '⚠️ Volledig resetten',
                export: '📅 Exporteren naar Kalender',
                send: 'Verzenden',
                docTitle: '💰 BudgetWise 2.0 - Slim budgetbeheer',
                subtitle: 'Van salaris tot salaris — slim beheer met AI',
                positiveBalance: 'Positief saldo',
                negativeBalance: 'Waarschuwing: negatief saldo',
                onboardingWelcome: '👋 Welkom bij BudgetWise',
                onboardingStep1: 'Voeg hieronder je eerste salaris of inkomen toe.',
                onboardingStep2: '📌 Voeg een maandelijkse vaste last toe (bijv. huur, rekeningen).',
                onboardingStep3: '🧾 Registreer een variabele uitgave zoals boodschappen.',
                onboardingStep4: '📊 Bekijk je dagbudget in de bovenste kaart.',
                onboardingStep5: '🤖 Vraag advies aan de AI-assistent of probeer spraak.',
                onboardingStep6: '📥 Je kunt ook bankafschriften importeren in CSV of Excel.',
                onboardingNext: 'Volgende →',
                onboardingSkip: 'Overslaan',
                onboardingSubtitle: 'Volg de stapsgewijze gids',
                importReview: '📋 Importcontrole',
                importConfirm: '✅ Bevestigen',
                importCancel: '✕ Annuleren',
                importCategory: 'Categorie',
                importLearn: '📌 De app onthoudt deze keuze',
                importSuggested: 'Voorgesteld: {cat} (bevestigen om te leren)',
                csvMappingTitle: '📋 CSV-kolommen koppelen',
                csvMappingInstructionsHtml: '<strong>📌 Instructies:</strong> Koppel elke CSV-kolom aan het juiste veld. Positieve bedragen zijn <strong>inkomsten</strong>, negatieve <strong>uitgaven</strong>.',
                csvMappingFieldsTitle: '🎯 Veldkoppeling:',
                categoriesSectionTitle: '📂 Categoriebeheer',
                manageCustomCategories: '➕ Aangepaste categorieën beheren',
                newCategoryLabel: 'Nieuwe categorie',
                newCategoryPlaceholder: 'bijv. Reizen',
                defaultCategoriesTitle: 'Standaardcategorieën',
                yourCategoriesTitle: 'Jouw categorieën',
                close: 'Sluiten',
                manageCategories: '📂 Categorieën beheren',
                addCategory: '➕ Categorie toevoegen',
                categoryName: 'Categorienaam',
                saveCategory: 'Opslaan',
                deleteCategory: '🗑️ Verwijderen',
                confirmDeleteCategory: 'Categorie “{name}” verwijderen?',
                categoryAlreadyExists: 'Categorie bestaat al',
                categoryAdded: '✅ Categorie toegevoegd!',
                categoryDeleted: '🗑️ Categorie verwijderd',
                categoryUpdated: '✏️ Categorie bijgewerkt',
                showAllExpenses: 'Alle uitgaven van de periode tonen',
                edit: 'Bewerken',
                aiSuggestionsTitle: '🤖 AI-voorstellen',
                aiSmartBadge: 'smart',
            
                savingsPotInitial: "Startspaarpot (€)",
                advancedOptions: "⚙️ Geavanceerde opties",
                hideOptions: "✕ Opties verbergen",
                customizeColorsTitle: "🎨 Kleuren aanpassen",
                customizeColorsSubtitle: "Kies je voorkeurskleuren. Wijzigingen worden direct toegepast.",
                colorAccentLabel: "Hoofdkleur (accent)",
                colorAccentLightLabel: "Secundaire kleur (accent-licht)",
                colorCardBgLabel: "Kaartachtergrond",
                colorTextPrimaryLabel: "Primaire tekst",
                colorTextSecondaryLabel: "Secundaire tekst",
                colorBgLabel: "Achtergrond",
                colorSuccessLabel: "Succes (inkomsten)",
                colorDangerLabel: "Gevaar (uitgaven)",
                colorWarningLabel: "Waarschuwing",
                colorBorderLabel: "Randen",
                noFixedInPeriod: "Geen vaste kosten in deze periode",
                fixedPaid: "✅ Betaald",
                fixedPlanned: "⏳ Gepland",
                loadDemoBtn: "✨ Demodata laden",},
            el: {
                plannedSavingsLabel: 'Προγραμματισμένη αποταμίευση',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Με αποταμίευση {p}%, φτάνεις τον στόχο {m} μήνες νωρίτερα',
                resetColors: 'Επαναφορά προεπιλεγμένων χρωμάτων',
                budget: 'Ημερήσιο προϋπολογισμό',
                weeklyReportTitle: '📝 Εβδομαδιαία αναφορά',
                regenerateReport: 'Επαναδημιουργία αναφοράς',
                challengesTitle: '🎮 Προκλήσεις',
                challengeReduceDescTpl: 'Ξόδεψε {pct}% λιγότερα στα μεταβλητά για {weeks} εβδομάδες',
                challengeRewardAddTpl: 'Επιβράβευση: πρόσθεσε {amount} στο ταμείο αποταμίευσης',
                claimReward: '🎁 Απόκτησε επιβράβευση',
                challengeProgressTpl: 'Ολοκληρωμένες εβδομάδες: {done}/{target}',
                remaining: 'Υπόλοιπο',
                days: 'Μέρες που απομένουν',
                period: 'Περίοδος',
                totalIncome: 'Συνολικά έσοδα',
                startGuide: '👋 Ξεκίνα προσθέτοντας τα έσοδά σου παρακάτω!',
                incomes: '🏦 Έσοδα περιόδου',
                fixed: '📌 Μηνιαία πάγια έξοδα',
                variable: '🧾 Μεταβλητά έξοδα',
                chart: '📊 Κατανομή εξόδων',
                burnRateTitle: '📈 Burn Rate περιόδου',
                burnRateNote: 'Πρόσθεσε τουλάχιστον ένα έσοδο για να υπολογιστεί η τάση',
                assistant: '🤖 Οικονομικός βοηθός AI',
                savings: '🎯 Στόχος αποταμίευσης',
                settings: '⚙️ Ρυθμίσεις',
                languageLabel: '🌍 Γλώσσα',
                thresholdLabel: '🔔 Όριο ειδοποίησης (€)',
                backupLabel: '📅 Αντίγραφο ασφαλείας',
                badge: 'πολλαπλό',
                addIncome: '➕ Προσθήκη εσόδου',
                addFixed: '➕ Προσθήκη πάγιου έξοδου',
                addExpense: '➕ Προσθήκη έξοδου',
                resetDay: '🗑️ Εκκαθάριση εξόδων ημέρας',
                applySavings: 'Εφαρμογή αποταμίευσης',
                backup: '💾 Λήψη αντιγράφου ασφαλείας',
                restore: '📂 Επαναφορά',
                resetAll: '⚠️ Πλήρης επαναφορά',
                export: '📅 Εξαγωγή στο Ημερολόγιο',
                send: 'Αποστολή',
                docTitle: '💰 BudgetWise 2.0 - Έξυπνη οικονομική διαχείριση',
                subtitle: 'Από μισθό σε μισθό — έξυπνη διαχείριση με AI',
                positiveBalance: 'Θετικό υπόλοιπο',
                negativeBalance: 'Προσοχή: αρνητικό υπόλοιπο',
                onboardingWelcome: '👋 Καλώς ήρθες στο BudgetWise',
                onboardingStep1: 'Πρόσθεσε παρακάτω τον πρώτο σου μισθό ή έσοδο.',
                onboardingStep2: '📌 Πρόσθεσε ένα μηνιαίο πάγιο έξοδο (π.χ. ενοίκιο, λογαριασμοί).',
                onboardingStep3: '🧾 Καταχώρησε ένα μεταβλητό έξοδο όπως σούπερ μάρκετ.',
                onboardingStep4: '📊 Δες τον ημερήσιο προϋπολογισμό στην πάνω κάρτα.',
                onboardingStep5: '🤖 Ζήτα συμβουλές από τον βοηθό AI ή δοκίμασε φωνή.',
                onboardingStep6: '📥 Μπορείς επίσης να εισάγεις κινήσεις τράπεζας σε CSV ή Excel.',
                onboardingNext: 'Επόμενο →',
                onboardingSkip: 'Παράλειψη',
                onboardingSubtitle: 'Ακολούθησε τον οδηγό βήμα προς βήμα',
                importReview: '📋 Έλεγχος εισαγωγής',
                importConfirm: '✅ Επιβεβαίωση',
                importCancel: '✕ Ακύρωση',
                importCategory: 'Κατηγορία',
                importLearn: '📌 Η εφαρμογή θα θυμάται αυτή την επιλογή',
                importSuggested: 'Προτείνεται: {cat} (επιβεβαίωσε για εκμάθηση)',
                csvMappingTitle: '📋 Αντιστοίχιση στηλών CSV',
                csvMappingInstructionsHtml: '<strong>📌 Οδηγίες:</strong> Αντιστοίχισε κάθε στήλη CSV στο σωστό πεδίο. Θετικά ποσά = <strong>έσοδα</strong>, αρνητικά = <strong>έξοδα</strong>.',
                csvMappingFieldsTitle: '🎯 Αντιστοίχιση πεδίων:',
                categoriesSectionTitle: '📂 Διαχείριση κατηγοριών',
                manageCustomCategories: '➕ Διαχείριση προσαρμοσμένων κατηγοριών',
                newCategoryLabel: 'Νέα κατηγορία',
                newCategoryPlaceholder: 'π.χ. Ταξίδια',
                defaultCategoriesTitle: 'Προεπιλεγμένες κατηγορίες',
                yourCategoriesTitle: 'Οι κατηγορίες σου',
                close: 'Κλείσιμο',
                manageCategories: '📂 Διαχείριση κατηγοριών',
                addCategory: '➕ Προσθήκη κατηγορίας',
                categoryName: 'Όνομα κατηγορίας',
                saveCategory: 'Αποθήκευση',
                deleteCategory: '🗑️ Διαγραφή',
                confirmDeleteCategory: 'Διαγραφή κατηγορίας «{name}»;',
                categoryAlreadyExists: 'Η κατηγορία υπάρχει ήδη',
                categoryAdded: '✅ Προστέθηκε κατηγορία!',
                categoryDeleted: '🗑️ Διαγράφηκε κατηγορία',
                categoryUpdated: '✏️ Ενημερώθηκε κατηγορία',
                showAllExpenses: 'Εμφάνιση όλων των εξόδων της περιόδου',
                edit: 'Επεξεργασία',
                aiSuggestionsTitle: '🤖 Προτάσεις AI',
                aiSmartBadge: 'έξυπνο',
            
                savingsPotInitial: "Αρχικό ποσό αποταμίευσης (€)",
                advancedOptions: "⚙️ Προχωρημένες επιλογές",
                hideOptions: "✕ Απόκρυψη επιλογών",
                customizeColorsTitle: "🎨 Προσαρμογή χρωμάτων",
                customizeColorsSubtitle: "Διάλεξε τα χρώματα της εφαρμογής. Οι αλλαγές εφαρμόζονται άμεσα.",
                colorAccentLabel: "Κύριο χρώμα (accent)",
                colorAccentLightLabel: "Δευτερεύον χρώμα (accent-light)",
                colorCardBgLabel: "Φόντο κάρτας",
                colorTextPrimaryLabel: "Κύριο κείμενο",
                colorTextSecondaryLabel: "Δευτερεύον κείμενο",
                colorBgLabel: "Γενικό φόντο",
                colorSuccessLabel: "Επιτυχία (έσοδα)",
                colorDangerLabel: "Κίνδυνος (έξοδα)",
                colorWarningLabel: "Προειδοποίηση",
                colorBorderLabel: "Περιγράμματα",
                noFixedInPeriod: "Δεν υπάρχουν πάγια έξοδα στην περίοδο",
                fixedPaid: "✅ Πληρώθηκε",
                fixedPlanned: "⏳ Προγραμματισμένη",
                loadDemoBtn: "✨ Φόρτωση demo δεδομένων",},
            ar: {
                plannedSavingsLabel: 'الادخار المخطط',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'مع ادخار بنسبة {p}% تصل للهدف قبل {m} أشهر',
                resetColors: 'إعادة تعيين الألوان الافتراضية',
                budget: 'الميزانية اليومية',
                weeklyReportTitle: '📝 تقرير أسبوعي',
                regenerateReport: 'إعادة إنشاء التقرير',
                challengesTitle: '🎮 التحديات',
                challengeReduceDescTpl: 'أنفق {pct}% أقل في المتغيرات لمدة {weeks} أسابيع',
                challengeRewardAddTpl: 'المكافأة: أضف {amount} إلى صندوق الادخار',
                claimReward: '🎁 استلام المكافأة',
                challengeProgressTpl: 'الأسابيع المكتملة: {done}/{target}',
                remaining: 'المتبقي',
                days: 'الأيام المتبقية',
                period: 'الفترة',
                totalIncome: 'إجمالي الدخل',
                startGuide: '👋 ابدأ بإضافة دخلك أدناه!',
                incomes: '🏦 دخل الفترة',
                fixed: '📌 المصاريف الثابتة الشهرية',
                variable: '🧾 المصاريف المتغيرة',
                chart: '📊 توزيع المصاريف',
                burnRateTitle: '📈 معدل الاستهلاك للفترة',
                burnRateNote: 'أضف دخلاً واحدًا على الأقل لحساب الاتجاه',
                assistant: '🤖 مساعد مالي بالذكاء الاصطناعي',
                savings: '🎯 هدف الادخار',
                settings: '⚙️ الإعدادات',
                languageLabel: '🌍 اللغة',
                thresholdLabel: '🔔 حدّ التنبيه (€)',
                backupLabel: '📅 النسخة الاحتياطية',
                badge: 'متعدد',
                addIncome: '➕ إضافة دخل',
                addFixed: '➕ إضافة مصروف ثابت',
                addExpense: '➕ إضافة مصروف',
                resetDay: '🗑️ مسح مصاريف اليوم',
                applySavings: 'تطبيق الادخار',
                backup: '💾 تنزيل النسخة الاحتياطية',
                restore: '📂 استعادة',
                resetAll: '⚠️ إعادة تعيين كاملة',
                export: '📅 تصدير إلى التقويم',
                send: 'إرسال',
                docTitle: '💰 BudgetWise 2.0 - إدارة مالية ذكية',
                subtitle: 'من راتب إلى راتب — إدارة ذكية بالذكاء الاصطناعي',
                positiveBalance: 'رصيد إيجابي',
                negativeBalance: 'تحذير: رصيد سلبي',
                onboardingWelcome: '👋 مرحبًا بك في BudgetWise',
                onboardingStep1: 'أضف أول راتب أو دخل لك أدناه.',
                onboardingStep2: '📌 أضف مصروفًا ثابتًا شهريًا (مثل الإيجار والفواتير).',
                onboardingStep3: '🧾 سجّل مصروفًا متغيرًا مثل التسوق.',
                onboardingStep4: '📊 تحقق من ميزانيتك اليومية في البطاقة العلوية.',
                onboardingStep5: '🤖 اطلب نصائح من مساعد الذكاء الاصطناعي أو جرّب الإدخال الصوتي.',
                onboardingStep6: '📥 يمكنك أيضًا استيراد معاملات البنك بصيغة CSV أو Excel.',
                onboardingNext: 'التالي →',
                onboardingSkip: 'تخطي',
                onboardingSubtitle: 'اتّبع الدليل خطوة بخطوة',
                importReview: '📋 مراجعة الاستيراد',
                importConfirm: '✅ تأكيد',
                importCancel: '✕ إلغاء',
                importCategory: 'الفئة',
                importLearn: '📌 سيحفظ التطبيق هذا الاختيار',
                importSuggested: 'مقترح: {cat} (أكد للتعلّم)',
                csvMappingTitle: '📋 ربط أعمدة CSV',
                csvMappingInstructionsHtml: '<strong>📌 تعليمات:</strong> اربط كل عمود CSV بالحقل الصحيح. القيم الإيجابية هي <strong>دخل</strong> والسلبية هي <strong>مصاريف</strong>.',
                csvMappingFieldsTitle: '🎯 ربط الحقول:',
                categoriesSectionTitle: '📂 إدارة الفئات',
                manageCustomCategories: '➕ إدارة الفئات المخصصة',
                newCategoryLabel: 'فئة جديدة',
                newCategoryPlaceholder: 'مثال: سفر',
                defaultCategoriesTitle: 'الفئات الافتراضية',
                yourCategoriesTitle: 'فئاتك',
                close: 'إغلاق',
                manageCategories: '📂 إدارة الفئات',
                addCategory: '➕ إضافة فئة',
                categoryName: 'اسم الفئة',
                saveCategory: 'حفظ',
                deleteCategory: '🗑️ حذف',
                confirmDeleteCategory: 'هل تريد حذف الفئة «{name}»؟',
                categoryAlreadyExists: 'الفئة موجودة بالفعل',
                categoryAdded: '✅ تمت إضافة الفئة!',
                categoryDeleted: '🗑️ تم حذف الفئة',
                categoryUpdated: '✏️ تم تحديث الفئة',
                showAllExpenses: 'عرض جميع مصاريف الفترة',
                edit: 'تحرير',
                aiSuggestionsTitle: '🤖 اقتراحات الذكاء الاصطناعي',
                aiSmartBadge: 'ذكي',
            
                savingsPotInitial: "صندوق الادخار المبدئي (€)",
                advancedOptions: "⚙️ خيارات متقدمة",
                hideOptions: "✕ إخفاء الخيارات",
                customizeColorsTitle: "🎨 تخصيص الألوان",
                customizeColorsSubtitle: "اختر ألوان التطبيق المفضلة لديك. يتم تطبيق التغييرات فورًا.",
                colorAccentLabel: "اللون الأساسي (accent)",
                colorAccentLightLabel: "اللون الثانوي (accent-light)",
                colorCardBgLabel: "خلفية البطاقة",
                colorTextPrimaryLabel: "النص الأساسي",
                colorTextSecondaryLabel: "النص الثانوي",
                colorBgLabel: "خلفية التطبيق",
                colorSuccessLabel: "نجاح (دخل)",
                colorDangerLabel: "خطر (مصاريف)",
                colorWarningLabel: "تحذير",
                colorBorderLabel: "حدود",
                noFixedInPeriod: "لا توجد مصاريف ثابتة في الفترة",
                fixedPaid: "✅ مدفوعة",
                fixedPlanned: "⏳ مخططة",
                loadDemoBtn: "✨ تحميل بيانات تجريبية",},
            en: {
                plannedSavingsLabel: 'Planned savings',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'If you save {p}%, you reach the goal {m} months sooner',
                resetColors: 'Reset default colors',
                budget: 'Daily budget',
                weeklyReportTitle: '📝 Weekly report',
                regenerateReport: 'Regenerate report',
                challengesTitle: '🎮 Challenges',
                challengeReduceDescTpl: 'Spend {pct}% less in variable expenses for {weeks} weeks',
                challengeRewardAddTpl: 'Reward: add {amount} to savings pot',
                claimReward: '🎁 Claim reward',
                challengeProgressTpl: 'Weeks completed: {done}/{target}',
                remaining: 'Remaining',
                days: 'Days left',
                period: 'Period',
                totalIncome: 'Total income',
                startGuide: '👋 Start by adding your income below!',
                incomes: '🏦 Period income',
                fixed: '📌 Monthly fixed expenses',
                variable: '🧾 Variable expenses',
                chart: '📊 Expense distribution',
                burnRateTitle: '📈 Burn Rate of the period',
                burnRateNote: 'Add at least one income to compute the trend',
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
                importSuggested: 'Suggested: {cat} (confirm to learn)',
                
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
                noCustomCategories: 'No custom categories',

                // NUOVE CHIAVI PER I TAB
                tabHome: '🏠 Home',
                tabIncomes: '🏦 Incomes',
                tabFixed: '📌 Fixed',
                tabVariable: '🧾 Variable',
                tabTools: '🛠️ Tools',

                // NUOVE CHIAVI PER SKIP ROWS
                skipRowsLabel: 'Skip initial rows',
                headerRowManualLabel: 'Header row',
                skipHelp: '📌 For files with initial rows (e.g., Fineco): skip rows until you find the columns',

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
                onboardingDemo: '✨ Load demo data',
                onboardingEmpty: 'Start empty',
                you: 'You',
                adviceRed: "⚠️ You're in the red! Review your expenses.",
                adviceLowRemaining: '⚠️ Warning: you only have {remaining} left for the coming days.',
                adviceGood: "💪 You're doing well! You still have {remaining} left.",
                aiSuggestionsTitle: '🤖 AI Suggestions',
                aiSmartBadge: 'smart',
                csvMappingTitle: '📋 Map CSV columns',
                csvMappingInstructionsHtml: '<strong>📌 Instructions:</strong> Map each CSV column to the right field. Positive amounts are treated as <strong>income</strong>, negative amounts as <strong>expenses</strong>.',
                csvMappingFieldsTitle: '🎯 Field mapping:',
                showAllExpenses: 'Show all period expenses',
                edit: 'Edit',
                categoriesSectionTitle: '📂 Category management',
                manageCustomCategories: '➕ Manage custom categories',
                newCategoryLabel: 'New category',
                newCategoryPlaceholder: 'e.g. Travel',
                defaultCategoriesTitle: 'Default categories',
                yourCategoriesTitle: 'Your categories',
                close: 'Close',
            
                savingsPotInitial: "Initial savings pot (€)",
                advancedOptions: "⚙️ Advanced options",
                hideOptions: "✕ Hide options",
                customizeColorsTitle: "🎨 Customize colors",
                customizeColorsSubtitle: "Choose your preferred app colors. Changes apply instantly.",
                colorAccentLabel: "Primary color (accent)",
                colorAccentLightLabel: "Secondary color (accent-light)",
                colorCardBgLabel: "Card background",
                colorTextPrimaryLabel: "Primary text",
                colorTextSecondaryLabel: "Secondary text",
                colorBgLabel: "App background",
                colorSuccessLabel: "Success (income)",
                colorDangerLabel: "Danger (expenses)",
                colorWarningLabel: "Warning",
                colorBorderLabel: "Borders",
                noFixedInPeriod: "No fixed expenses in this period",
                fixedPaid: "✅ Paid",
                fixedPlanned: "⏳ Planned",
                loadDemoBtn: "✨ Load demo data",},
            es: {
                plannedSavingsLabel: 'Ahorro planificado',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Si ahorras {p}%, llegas {m} meses antes a tu objetivo',
                resetColors: 'Restablecer colores predeterminados',
                budget: 'Presupuesto diario',
                weeklyReportTitle: '📝 Informe semanal',
                regenerateReport: 'Regenerar informe',
                challengesTitle: '🎮 Retos',
                challengeReduceDescTpl: 'Gasta {pct}% menos en variables durante {weeks} semanas',
                challengeRewardAddTpl: 'Recompensa: añade {amount} al fondo de ahorro',
                claimReward: '🎁 Reclamar recompensa',
                challengeProgressTpl: 'Semanas completadas: {done}/{target}',
                remaining: 'Restante',
                days: 'Días restantes',
                period: 'Período',
                totalIncome: 'Ingresos totales',
                startGuide: '👋 ¡Empieza añadiendo tus ingresos abajo!',
                incomes: '🏦 Ingresos del período',
                fixed: '📌 Gastos fijos mensuales',
                variable: '🧾 Gastos variables',
                chart: '📊 Distribución de gastos',
                burnRateTitle: '📈 Burn Rate del período',
                burnRateNote: 'Añade al menos un ingreso para calcular la tendencia',
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
                importSuggested: 'Sugerido: {cat} (confirma para aprender)',
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

                // NUOVE CHIAVI PER I TAB
                tabHome: '🏠 Inicio',
                tabIncomes: '🏦 Ingresos',
                tabFixed: '📌 Fijas',
                tabVariable: '🧾 Variables',
                tabTools: '🛠️ Herramientas',

                // NUOVE CHIAVI PER SKIP ROWS
                skipRowsLabel: 'Saltar filas iniciales',
                headerRowManualLabel: 'Fila de encabezado',
                skipHelp: '📌 Para archivos con filas iniciales (ej. Fineco): salta las filas hasta encontrar las columnas',

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
                onboardingDemo: '✨ Cargar datos demo',
                onboardingEmpty: 'Empezar vacío',
                you: 'Tú',
                adviceRed: '⚠️ ¡Estás en negativo! Revisa tus gastos.',
                adviceLowRemaining: '⚠️ Atención: solo te quedan {remaining} para los próximos días.',
                adviceGood: '💪 ¡Vas bien! Aún te quedan {remaining}.',
                aiSuggestionsTitle: '🤖 Sugerencias IA',
                aiSmartBadge: 'inteligente',
                csvMappingTitle: '📋 Mapear columnas CSV',
                csvMappingInstructionsHtml: '<strong>📌 Instrucciones:</strong> Asocia cada columna del CSV con su campo. Importes positivos = <strong>ingresos</strong>, negativos = <strong>gastos</strong>.',
                csvMappingFieldsTitle: '🎯 Asignación de campos:',
                showAllExpenses: 'Mostrar todos los gastos del período',
                edit: 'Editar'
            
                savingsPotInitial: "Fondo de ahorro inicial (€)",
                advancedOptions: "⚙️ Opciones avanzadas",
                hideOptions: "✕ Ocultar opciones",
                customizeColorsTitle: "🎨 Personalizar colores",
                customizeColorsSubtitle: "Elige tus colores preferidos para la app. Los cambios son inmediatos.",
                colorAccentLabel: "Color principal (acento)",
                colorAccentLightLabel: "Color secundario (acento claro)",
                colorCardBgLabel: "Fondo de tarjeta",
                colorTextPrimaryLabel: "Texto principal",
                colorTextSecondaryLabel: "Texto secundario",
                colorBgLabel: "Fondo general",
                colorSuccessLabel: "Éxito (ingresos)",
                colorDangerLabel: "Peligro (gastos)",
                colorWarningLabel: "Aviso",
                colorBorderLabel: "Bordes",
                noFixedInPeriod: "No hay gastos fijos en el período",
                fixedPaid: "✅ Pagada",
                fixedPlanned: "⏳ Prevista",
                loadDemoBtn: "✨ Cargar datos demo",},
            fr: {
                plannedSavingsLabel: 'Épargne planifiée',
                plannedSavingsShortHint: '💡 +{p}%',
                plannedSavingsTooltip: 'Avec {p}% d’épargne, tu atteins l’objectif {m} mois plus tôt',
                resetColors: 'Réinitialiser les couleurs par défaut',
                budget: 'Budget journalier',
                weeklyReportTitle: '📝 Rapport hebdomadaire',
                regenerateReport: 'Régénérer le rapport',
                challengesTitle: '🎮 Défis',
                challengeReduceDescTpl: 'Dépense {pct}% de moins en variables pendant {weeks} semaines',
                challengeRewardAddTpl: 'Récompense : ajoute {amount} à la cagnotte',
                claimReward: '🎁 Récupérer la récompense',
                challengeProgressTpl: 'Semaines terminées : {done}/{target}',
                remaining: 'Reste',
                days: 'Jours restants',
                period: 'Période',
                totalIncome: 'Total des revenus',
                startGuide: '👋 Commence en ajoutant tes revenus ci-dessous !',
                incomes: '🏦 Revenus de la période',
                fixed: '📌 Dépenses fixes mensuelles',
                variable: '🧾 Dépenses variables',
                chart: '📊 Répartition des dépenses',
                burnRateTitle: '📈 Burn Rate de la période',
                burnRateNote: 'Ajoute au moins un revenu pour calculer la tendance',
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
                importSuggested: 'Suggéré: {cat} (confirmer pour apprendre)',
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

                // NUOVE CHIAVI PER I TAB
                tabHome: '🏠 Accueil',
                tabIncomes: '🏦 Revenus',
                tabFixed: '📌 Fixes',
                tabVariable: '🧾 Variables',
                tabTools: '🛠️ Outils',

                // NUOVE CHIAVI PER SKIP ROWS
                skipRowsLabel: 'Ignorer les lignes initiales',
                headerRowManualLabel: 'Ligne d\'en-tête',
                skipHelp: '📌 Pour les fichiers avec lignes initiales (ex. Fineco): ignorez les lignes jusqu\'à trouver les colonnes',

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
                onboardingDemo: '✨ Charger des données démo',
                onboardingEmpty: 'Commencer vide',
                you: 'Toi',
                adviceRed: '⚠️ Tu es dans le rouge ! Revois tes dépenses.',
                adviceLowRemaining: '⚠️ Attention : il ne te reste que {remaining} pour les prochains jours.',
                adviceGood: '💪 Ça va ! Il te reste encore {remaining}.',
                aiSuggestionsTitle: '🤖 Suggestions IA',
                aiSmartBadge: 'intelligent',
                csvMappingTitle: '📋 Mapper les colonnes CSV',
                csvMappingInstructionsHtml: '<strong>📌 Instructions :</strong> Associe chaque colonne du CSV au bon champ. Montants positifs = <strong>revenus</strong>, négatifs = <strong>dépenses</strong>.',
                csvMappingFieldsTitle: '🎯 Association des champs :',
                showAllExpenses: 'Afficher toutes les dépenses de la période',
                edit: 'Modifier'
            }
        };
        
        this.init();
    }

    init() {
        this.loadData();
        if (!this.data.language) {
            const nav = (Array.isArray(navigator.languages) && navigator.languages[0]) || navigator.language || '';
            const code = String(nav).toLowerCase().slice(0, 2);
            const supported = ['it','en','es','fr','de','pt','nl','el','ar'];
            this.data.language = supported.includes(code) ? code : 'it';
            this.saveData();
        }
        this.initChallenges();
        this.setupEventListeners();
        this.applyTheme();
        // NOTE: custom colors should NOT override theme defaults unless the user explicitly saved them.
        // Otherwise we would "freeze" light colors as inline CSS variables and dark mode would barely change.
        if (localStorage.getItem('budgetwise-custom-colors')) {
            this.applyCustomColors();
        } else {
            this.clearThemeInlineOverrides();
        }
        this.setupColorPickers();
        this.updateUI();
        this.updateChart();
        this.updateBurnRateChart();
        this.setupVoice();
        this.applyLanguage();
        this.startOnboarding();
        this.updateAllCategorySelects();
        this.initTabs();

        const toggle = document.getElementById('showAllExpensesToggle');
        if (toggle) toggle.checked = !!this.showAllExpenses;
    }

    getDefaultPeriodStart() {
        // Default: start from last salary income (if available), otherwise today
        const salary = this.findLastSalaryIncome();
        if (salary && salary.date) return this.normalizeIsoDate(salary.date);
        const today = new Date();
        return today.toISOString().split('T')[0];
    }

    getDefaultPeriodEnd() {
        // Default: next salary date (one month after last salary), otherwise +28 days
        const salary = this.findLastSalaryIncome();
        if (salary && salary.date) {
            const start = this.normalizeIsoDate(salary.date);
            const next = this.addMonthsClamp(start, 1);
            return next;
        }
        const end = new Date();
        end.setDate(end.getDate() + 28);
        return end.toISOString().split('T')[0];
    }

    normalizeIsoDate(dateStr) {
        if (!dateStr) return '';
        const s = String(dateStr).trim();
        const m = s.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
        if (m) {
            const y = m[1];
            const mm = String(m[2]).padStart(2, '0');
            const dd = String(m[3]).padStart(2, '0');
            return `${y}-${mm}-${dd}`;
        }
        return s;
    }


    // ==================== PERIODO BASATO SU STIPENDIO ====================
    isSalaryIncome(inc) {
        if (!inc) return false;
        const desc = String(inc.desc || '').toLowerCase();
        // Parole chiave comuni (puoi aggiungerne altre)
        return /stipend|mensilit|payroll|salary|cedolin/.test(desc);
    }

    findLastSalaryIncome() {
        if (!this.data.incomes || !Array.isArray(this.data.incomes)) return null;
        const today = new Date();
        const candidates = this.data.incomes
            .filter(inc => inc && inc.date && this.isSalaryIncome(inc))
            .map(inc => ({ ...inc, _d: new Date(this.normalizeIsoDate(inc.date)) }))
            .filter(inc => !isNaN(inc._d.getTime()) && inc._d <= today)
            .sort((a, b) => a._d - b._d);
        return candidates.length ? candidates[candidates.length - 1] : null;
    }

    // Aggiunge mesi mantenendo il "giorno stipendio"; se il mese non ha quel giorno, usa l'ultimo giorno del mese
    addMonthsClamp(isoDate, monthsToAdd) {
        const d = new Date(this.normalizeIsoDate(isoDate));
        if (isNaN(d.getTime())) return '';
        const y = d.getFullYear();
        const m = d.getMonth();
        const day = d.getDate();
        const targetMonth = m + (monthsToAdd || 0);
        const ty = y + Math.floor(targetMonth / 12);
        const tm = ((targetMonth % 12) + 12) % 12;
        const lastDay = new Date(ty, tm + 1, 0).getDate();
        const dd = Math.min(day, lastDay);
        const out = new Date(ty, tm, dd);
        return out.toISOString().split('T')[0];
    }

    ensureSalaryPeriod() {
        const lastSalary = this.findLastSalaryIncome();
        if (!lastSalary || !lastSalary.date) return;

        const start = this.normalizeIsoDate(lastSalary.date);
        const nextSalary = this.addMonthsClamp(start, 1);

        // Aggiorna solo se non impostato o se ancora in default
        if (!this.data.periodStart || !this.data.periodEnd) {
            this.data.periodStart = start;
            this.data.periodEnd = nextSalary;
            return;
        }

        // Se il periodo attuale non è coerente (es. start==oggi e end==oggi+28), riallinea
        const ps = this.normalizeIsoDate(this.data.periodStart);
        const pe = this.normalizeIsoDate(this.data.periodEnd);

        const looksDefault =
            ps === new Date().toISOString().split('T')[0] &&
            Math.abs((new Date(pe) - new Date(ps)) / (1000 * 60 * 60 * 24) - 28) < 2;

        if (looksDefault || new Date(pe) <= new Date(ps)) {
            this.data.periodStart = start;
            this.data.periodEnd = nextSalary;
        }
    }

    isDateInPeriod(isoDate) {
        const d = new Date(this.normalizeIsoDate(isoDate));
        const start = new Date(this.normalizeIsoDate(this.data.periodStart));
        const end = new Date(this.normalizeIsoDate(this.data.periodEnd));
        if ([d, start, end].some(x => isNaN(x.getTime()))) return false;
        return d >= start && d < end;
    }


    // ==================== FIRST RUN / DEMO DATA ====================
    isFirstRun() {
        return localStorage.getItem('budgetwise-first-run-seen') !== 'true';
    }

    markFirstRunSeen() {
        localStorage.setItem('budgetwise-first-run-seen', 'true');
    }

    getDemoCustomCategories() {
        const lang = this.data.language || 'it';
        const map = {
            it: { home: 'Casa', kids: 'Bambini', work: 'Lavoro' },
            en: { home: 'Home', kids: 'Kids', work: 'Work' },
            es: { home: 'Casa', kids: 'Niños', work: 'Trabajo' },
            fr: { home: 'Maison', kids: 'Enfants', work: 'Travail' }
        };
        return map[lang] || map.it;
    }

    ensureDemoCategories() {
        const dc = this.getDemoCustomCategories();
        const demoCats = [dc.home, dc.kids, dc.work];
        let changed = false;

        demoCats.forEach(cat => {
            if (!this.getAllCategories().includes(cat)) {
                this.customCategories.push(cat);
                changed = true;
            }
        });

        if (changed) {
            this.saveCustomCategories();
            this.updateAllCategorySelects();
        }
    }

    getDemoData() {
        const today = new Date();
        const lang = this.data.language || 'it';
        const demoText = {
            it: {
                income: 'Stipendio',
                rent: 'Affitto',
                phone: 'Telefono',
                grocery: 'Spesa supermercato',
                homeMaint: 'Manutenzione casa',
                fuel: 'Benzina',
                pharmacy: 'Farmacia',
                pizza: 'Pizza',
                daycare: 'Asilo',
                tshirt: 'Maglietta',
                coffee: 'Caffè',
                workLunch: 'Pranzo lavoro'
            },
            en: {
                income: 'Salary',
                rent: 'Rent',
                phone: 'Phone',
                grocery: 'Groceries',
                homeMaint: 'Home maintenance',
                fuel: 'Fuel',
                pharmacy: 'Pharmacy',
                pizza: 'Pizza',
                daycare: 'Daycare',
                tshirt: 'T-shirt',
                coffee: 'Coffee',
                workLunch: 'Work lunch'
            },
            es: {
                income: 'Salario',
                rent: 'Alquiler',
                phone: 'Teléfono',
                grocery: 'Supermercado',
                homeMaint: 'Mantenimiento del hogar',
                fuel: 'Gasolina',
                pharmacy: 'Farmacia',
                pizza: 'Pizza',
                daycare: 'Guardería',
                tshirt: 'Camiseta',
                coffee: 'Café',
                workLunch: 'Almuerzo de trabajo'
            },
            fr: {
                income: 'Salaire',
                rent: 'Loyer',
                phone: 'Téléphone',
                grocery: 'Courses',
                homeMaint: 'Entretien maison',
                fuel: 'Carburant',
                pharmacy: 'Pharmacie',
                pizza: 'Pizza',
                daycare: 'Crèche',
                tshirt: 'T-shirt',
                coffee: 'Café',
                workLunch: 'Déjeuner de travail'
            }
        };
        const T = demoText[lang] || demoText.it;
        const dc = this.getDemoCustomCategories();
        const iso = (d) => d.toISOString().split('T')[0];

        const start = new Date(today);
        const end = new Date(today);
        end.setDate(end.getDate() + 30);

        const makeDate = (offset) => {
            const d = new Date(today);
            d.setDate(d.getDate() - offset);
            return iso(d);
        };

        const now = Date.now();

        const demoVariable = {};
        demoVariable[makeDate(0)] = [
            { name: T.grocery, amount: 23.40, category: 'Alimentari', id: now + 1 },
            { name: T.homeMaint, amount: 30.00, category: dc.home, id: now + 7 }
        ];
        demoVariable[makeDate(1)] = [
            { name: T.fuel, amount: 35.00, category: 'Trasporti', id: now + 2 }
        ];
        demoVariable[makeDate(2)] = [
            { name: T.pharmacy, amount: 12.90, category: 'Salute', id: now + 3 }
        ];
        demoVariable[makeDate(3)] = [
            { name: T.pizza, amount: 18.00, category: 'Svago', id: now + 4 },
            { name: T.daycare, amount: 120.00, category: dc.kids, id: now + 8 }
        ];
        demoVariable[makeDate(4)] = [
            { name: T.tshirt, amount: 19.99, category: 'Abbigliamento', id: now + 5 }
        ];
        demoVariable[makeDate(5)] = [
            { name: T.coffee, amount: 2.20, category: 'Altro', id: now + 6 },
            { name: T.workLunch, amount: 14.00, category: dc.work, id: now + 9 }
        ];

        const farFuture = new Date(today);
        farFuture.setFullYear(farFuture.getFullYear() + 5);

        return {
            incomes: [
                { desc: T.income, amount: 2000, date: iso(today), id: now + 100 }
            ],
            fixedExpenses: [
                { name: T.rent, amount: 650, day: 5, endDate: iso(farFuture), id: now + 200 },
                { name: T.phone, amount: 15, day: 12, endDate: iso(farFuture), id: now + 201 }
            ],
            variableExpenses: demoVariable,
            savingsPercent: 10,
            savingsGoal: 1500,
            threshold: 50,
            language: this.data.language || 'it',
            periodStart: iso(start),
            periodEnd: iso(end)
        };
    }

    loadDemoData() {
        this.ensureDemoCategories();
        this.data = this.getDemoData();
        this.saveData();
        this.updateAllCategorySelects();
        this.updateUI();
        this.updateChart();
        this.applyLanguage();

        localStorage.setItem('budgetwise-demo-loaded', 'true');
        this.showToast(this.t('demoLoaded'), 'success');
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
        document.documentElement.dir = (this.data.language === 'ar') ? 'rtl' : 'ltr';
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
            else if (text.includes('📈')) h2.innerHTML = this.t('burnRateTitle');
            else if (text.includes('Suggerimenti')) h2.innerHTML = this.t('aiSuggestionsTitle');
            else if (text.includes('🤖')) h2.innerHTML = this.t('assistant');
            else if (text.includes('🎯')) h2.innerHTML = this.t('savings');
            else if (text.includes('🎨')) h2.innerHTML = this.t('customizeColorsTitle');
            else if (text.includes('🛠️')) h2.innerHTML = this.t('tabTools');
            else if (text.includes('📥') && text.toLowerCase().includes('import')) h2.innerHTML = this.t('csvTitle');
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

        const loadDemoBtn = document.getElementById('loadDemoBtn');
        if (loadDemoBtn) loadDemoBtn.textContent = this.t('loadDemoBtn');

        const savingsPotLbl = document.getElementById('savingsPotInputLabel');
        if (savingsPotLbl) savingsPotLbl.textContent = this.t('savingsPotInitial');

        const resetColorsBtn = document.getElementById('resetColorsBtn');
        if (resetColorsBtn) resetColorsBtn.textContent = this.t('resetColors');

        // Generic i18n hooks for static HTML
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (key) el.textContent = this.t(key);
        });
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.getAttribute('data-i18n-html');
            if (key) el.innerHTML = this.t(key);
        });
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
        const burnRateNote = document.getElementById('burnRateNote');
        if (burnRateNote) burnRateNote.textContent = this.t('burnRateNote');
        const autoLangLabel = document.getElementById('autoLangLabel');
        if (autoLangLabel) autoLangLabel.textContent = this.t('autoRecommended');
        const autoLangToggle = document.getElementById('autoLangToggle');
        if (autoLangToggle) {
            const auto = localStorage.getItem('budgetwise-language-auto') === 'true';
            autoLangToggle.checked = auto;
            const langSelect = document.getElementById('languageSelect');
            if (langSelect) langSelect.disabled = auto;
        }
        
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
        const plannedBadge = document.getElementById('plannedSavingsBadge');
        if (plannedBadge) {
            const planned = this.calculatePlannedSavings();
            plannedBadge.textContent = planned > 0 ? `${this.t('plannedSavingsLabel')}: ${this.formatCurrency(planned)}` : '';
            if (planned > 0) {
                const percent = this.data.savingsPercent || 0;
                if (percent > 0 && percent < 20) {
                    const suggested = Math.min(percent + 5, 20);
                    const income = this.calculateTotalIncome();
                    const goal = this.data.savingsGoal || 0;
                    let hint = this.t('plannedSavingsShortHint', { p: suggested });
                    if (goal > 0 && income > 0) {
                        const monthsNeeded = Math.ceil(goal / ((income * percent) / 100));
                        const newMonths = Math.ceil(goal / ((income * suggested) / 100));
                        const diff = Math.max(0, monthsNeeded - newMonths);
                        if (diff > 0 && isFinite(diff)) {
                            plannedBadge.title = this.t('plannedSavingsTooltip', { p: suggested, m: diff });
                        } else {
                            plannedBadge.title = this.t('plannedSavingsTooltip', { p: suggested, m: 1 });
                        }
                    }
                    plannedBadge.textContent += ` • ${hint}`;
                } else {
                    plannedBadge.title = '';
                }
                plannedBadge.classList.remove('good','warn');
                if (percent >= 20) {
                    plannedBadge.classList.add('good');
                } else if (percent > 0) {
                    plannedBadge.classList.add('warn');
                }
            } else {
                plannedBadge.title = '';
                plannedBadge.classList.remove('good','warn');
            }
        }
        
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

        const showAllLabel = document.getElementById('showAllExpensesLabel');
        if (showAllLabel) showAllLabel.textContent = this.t('showAllExpenses');
        
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

        const catSectionTitle = Array.from(document.querySelectorAll('h2')).find(h => h.textContent.includes('📂'));
        if (catSectionTitle) catSectionTitle.textContent = this.t('categoriesSectionTitle');

        const manageBtn = document.getElementById('manageCategoriesBtn');
        if (manageBtn) manageBtn.textContent = this.t('manageCustomCategories');

        const catOverlay = document.getElementById('categoryManagerOverlay');
        if (catOverlay) {
            const h3 = catOverlay.querySelector('h3');
            if (h3) h3.textContent = this.t('manageCategories');

            const h4s = catOverlay.querySelectorAll('h4');
            if (h4s.length >= 2) {
                h4s[0].textContent = this.t('defaultCategoriesTitle');
                h4s[1].textContent = this.t('yourCategoriesTitle');
            }

            const newCatLabel = catOverlay.querySelector('label[for="newCategoryName"]');
            if (newCatLabel) newCatLabel.textContent = this.t('newCategoryLabel');

            const newCatInput = document.getElementById('newCategoryName');
            if (newCatInput) newCatInput.placeholder = this.t('newCategoryPlaceholder');

            const saveCatBtn = document.getElementById('saveCategoryBtn');
            if (saveCatBtn) saveCatBtn.textContent = this.t('add');

            const closeCatBtn = document.getElementById('closeCategoryManager');
            if (closeCatBtn) closeCatBtn.textContent = this.t('close');
        }

        // Traduci i bottoni dei tab
        const tabButtons = document.querySelectorAll('.tab-btn');
        if (tabButtons.length >= 5) {
            tabButtons[0].textContent = this.t('tabHome');
            tabButtons[1].textContent = this.t('tabIncomes');
            tabButtons[2].textContent = this.t('tabFixed');
            tabButtons[3].textContent = this.t('tabVariable');
            tabButtons[4].textContent = this.t('tabTools');
        }

        // Traduzioni per skip rows
        const skipRowsLabel = document.getElementById('skipRowsLabel');
        if (skipRowsLabel) skipRowsLabel.textContent = this.t('skipRowsLabel');
        const headerRowManualLabel = document.getElementById('headerRowManualLabel');
        if (headerRowManualLabel) headerRowManualLabel.textContent = this.t('headerRowManualLabel');
        const skipHelp = document.getElementById('skipHelp');
        if (skipHelp) skipHelp.textContent = this.t('skipHelp');

        this.updateIncomeList();
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();
        this.updateFixedStatusHome();
        this.updateChart();

        this.updateAllCategorySelects();
        const catOverlayOpen = document.getElementById('categoryManagerOverlay');
        if (catOverlayOpen && catOverlayOpen.style.display === 'flex') this.refreshCategoryList();

        this.updatePeriodInfo();
    }

    initTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const sections = document.querySelectorAll('.section-card[data-tab]');

        const showTab = (tabId) => {
            sections.forEach(s => {
                s.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
                s.style.opacity = '0';
                s.style.transform = 'translateY(10px)';
            });

            setTimeout(() => {
                sections.forEach(s => s.style.display = 'none');
                const toShow = document.querySelectorAll(`.section-card[data-tab="${tabId}"]`);
                toShow.forEach(s => {
                    s.style.display = 'block';
                    void s.offsetWidth;
                    s.style.opacity = '1';
                    s.style.transform = 'translateY(0)';
                });

                const guide = document.querySelector('.guide-message[data-tab]');
                if (guide) {
                    guide.style.display = (tabId === guide.dataset.tab) ? 'block' : 'none';
                    if (guide.style.display === 'block') {
                        guide.style.opacity = '1';
                        guide.style.transform = 'translateY(0)';
                    }
                }

                tabs.forEach(t => t.classList.remove('active'));
                document.querySelector(`.tab-btn[data-tab="${tabId}"]`).classList.add('active');
            }, 200);
        };

        tabs.forEach(btn => {
            btn.addEventListener('click', () => {
                showTab(btn.dataset.tab);
            });
        });

        showTab('home');
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
        // Somma solo le entrate nel periodo [periodStart, periodEnd]
        return this.data.incomes.reduce((sum, inc) => {
            const d = this.normalizeIsoDate(inc.date);
            if (!d || !this.isDateInPeriod(d)) return sum;
            return sum + (inc.amount || 0);
        }, 0);
    }

    calculateTotalVariableExpenses() {
        if (!this.data.variableExpenses || typeof this.data.variableExpenses !== 'object') return 0;
        let total = 0;
        Object.entries(this.data.variableExpenses).forEach(([date, day]) => {
            const d = this.normalizeIsoDate(date);
            if (!d || !this.isDateInPeriod(d)) return;
            if (Array.isArray(day)) {
                day.forEach(exp => total += (exp.amount || 0));
            }
        });
        return total;
    }

    calculateTotalFixedExpenses() {
        if (!this.data.fixedExpenses || !Array.isArray(this.data.fixedExpenses)) return 0;

        const start = new Date(this.normalizeIsoDate(this.data.periodStart));
        const end = new Date(this.normalizeIsoDate(this.data.periodEnd));
        if ([start, end].some(d => isNaN(d.getTime()))) return 0;

        // Scorre i mesi compresi nel periodo e include le scadenze che cadono nel periodo
        const months = [];
        const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
        const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
        while (cursor <= endMonth) {
            months.push({ y: cursor.getFullYear(), m: cursor.getMonth() });
            cursor.setMonth(cursor.getMonth() + 1);
        }

        let total = 0;

        for (const exp of this.data.fixedExpenses) {
            if (!exp || !exp.day) continue;

            const expEnd = exp.endDate ? new Date(this.normalizeIsoDate(exp.endDate)) : null;

            for (const mm of months) {
                const lastDay = new Date(mm.y, mm.m + 1, 0).getDate();
                const dueDay = Math.min(parseInt(exp.day, 10) || 1, lastDay);
                const dueDate = new Date(mm.y, mm.m, dueDay);

                if (dueDate < start || dueDate >= end) continue;
                if (expEnd && dueDate > expEnd) continue;

                total += (exp.amount || 0);
            }
        }

        return total;
    }


    /**
     * Ritorna la lista "flat" delle spese variabili nel periodo corrente
     */
    getVariableExpensesInPeriodFlat() {
        const out = [];
        if (!this.data.variableExpenses || typeof this.data.variableExpenses !== 'object') return out;
        Object.entries(this.data.variableExpenses).forEach(([date, arr]) => {
            const d = this.normalizeIsoDate(date);
            if (!d || !this.isDateInPeriod(d)) return;
            if (Array.isArray(arr)) {
                arr.forEach(e => {
                    if (!e) return;
                    out.push({
                        id: e.id,
                        date: d,
                        name: (e.name || '').toString(),
                        category: e.category,
                        amount: Number(e.amount || 0)
                    });
                });
            }
        });
        return out;
    }

    normalizeMatchText(s) {
        return (s || '')
            .toString()
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, '') // diacritics
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    /**
     * Verifica se una spesa variabile corrisponde ad una scadenza fissa (per non conteggiarla 2 volte)
     * Matching "robusto ma prudente":
     * - importo simile (tolleranza 1 cent)
     * - data entro +/- 3 giorni
     * - se possibile, match su token del nome
     */
    matchFixedOccurrenceToVariable(occ, vars, consumedIds) {
        const occAmount = Number(occ.amount || 0);
        const occDate = new Date(this.normalizeIsoDate(occ.dueDate));
        if (isNaN(occDate.getTime())) return null;

        const nameNorm = this.normalizeMatchText(occ.name);
        const tokens = nameNorm.split(' ').filter(t => t.length >= 4);

        const candidates = vars.filter(v => {
            if (!v || consumedIds.has(v.id)) return false;
            if (Math.abs(Math.abs(Number(v.amount || 0)) - Math.abs(occAmount)) > 0.01) return false;

            const vd = new Date(this.normalizeIsoDate(v.date));
            if (isNaN(vd.getTime())) return false;
            const diffDays = Math.abs((vd - occDate) / (1000 * 60 * 60 * 24));
            if (diffDays > 3) return false;

            return true;
        });

        if (candidates.length === 0) return null;

        // Se c'è un solo candidato, accettiamo.
        if (candidates.length === 1) return candidates[0];

        // Se più candidati: richiediamo match token sul nome (almeno 1 token)
        if (tokens.length > 0) {
            const best = candidates.find(c => {
                const cn = this.normalizeMatchText(c.name);
                return tokens.some(t => cn.includes(t));
            });
            if (best) return best;
        }

        // Fallback: il più vicino come data
        candidates.sort((a, b) => {
            const ad = new Date(this.normalizeIsoDate(a.date));
            const bd = new Date(this.normalizeIsoDate(b.date));
            return Math.abs(ad - occDate) - Math.abs(bd - occDate);
        });
        return candidates[0];
    }

    /**
     * Calcola il totale delle spese fisse NON già presenti tra le variabili importate/inserite nel periodo.
     * Evita il doppio conteggio: una fissa pagata (presente nel file banca) resta tra le variabili,
     * e viene esclusa dal "forecast" delle fisse.
     */
    calculateTotalFixedExpensesUnpaid() {
        if (!this.data.fixedExpenses || !Array.isArray(this.data.fixedExpenses)) return 0;

        const start = new Date(this.normalizeIsoDate(this.data.periodStart));
        const end = new Date(this.normalizeIsoDate(this.data.periodEnd));
        if ([start, end].some(d => isNaN(d.getTime()))) return 0;

        // mesi nel periodo
        const months = [];
        const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
        const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
        while (cursor <= endMonth) {
            months.push({ y: cursor.getFullYear(), m: cursor.getMonth() });
            cursor.setMonth(cursor.getMonth() + 1);
        }

        const vars = this.getVariableExpensesInPeriodFlat();
        const consumed = new Set();

        let total = 0;

        for (const exp of this.data.fixedExpenses) {
            if (!exp || !exp.day) continue;

            const expEnd = exp.endDate ? new Date(this.normalizeIsoDate(exp.endDate)) : null;

            for (const mm of months) {
                const lastDay = new Date(mm.y, mm.m + 1, 0).getDate();
                const dueDay = Math.min(parseInt(exp.day, 10) || 1, lastDay);
                const dueDate = new Date(mm.y, mm.m, dueDay);

                if (dueDate < start || dueDate >= end) continue;
                if (expEnd && dueDate > expEnd) continue;

                const occ = { name: exp.name, amount: exp.amount, dueDate: dueDate.toISOString().slice(0,10) };
                const match = this.matchFixedOccurrenceToVariable(occ, vars, consumed);

                if (match) {
                    consumed.add(match.id);
                    // già pagata/registrata: NON la sommiamo nelle fisse
                } else {
                    total += (exp.amount || 0);
                }
            }
        }

        return total;
    }

/**
 * Ritorna le occorrenze delle spese fisse nel periodo corrente, marcate come
 * "Pagata" se trovate tra le spese variabili (estratto conto) con match prudente.
 * Regola periodo: start <= data < end
 *
 * @returns {Array<{name:string, amount:number, dueDate:string, paid:boolean, match?:{id:string,date:string,name:string,amount:number}}>}
 */
getFixedOccurrencesInPeriod() {
    if (!this.data.fixedExpenses || !Array.isArray(this.data.fixedExpenses)) return [];

    const start = new Date(this.normalizeIsoDate(this.data.periodStart));
    const end = new Date(this.normalizeIsoDate(this.data.periodEnd));
    if ([start, end].some(d => isNaN(d.getTime()))) return [];

    // mesi nel periodo
    const months = [];
    const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
    const endMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursor <= endMonth) {
        months.push({ y: cursor.getFullYear(), m: cursor.getMonth() });
        cursor.setMonth(cursor.getMonth() + 1);
    }

    const vars = this.getVariableExpensesInPeriodFlat();
    const consumed = new Set();

    const occs = [];

    for (const exp of this.data.fixedExpenses) {
        if (!exp || !exp.day) continue;
        const expEnd = exp.endDate ? new Date(this.normalizeIsoDate(exp.endDate)) : null;

        for (const mm of months) {
            const lastDay = new Date(mm.y, mm.m + 1, 0).getDate();
            const dueDay = Math.min(parseInt(exp.day, 10) || 1, lastDay);
            const dueDateObj = new Date(mm.y, mm.m, dueDay);

            if (dueDateObj < start || dueDateObj >= end) continue;
            if (expEnd && dueDateObj > expEnd) continue;

            const dueDate = dueDateObj.toISOString().slice(0, 10);
            const occ = { name: exp.name, amount: exp.amount, dueDate };
            const match = this.matchFixedOccurrenceToVariable(occ, vars, consumed);

            if (match) consumed.add(match.id);

            occs.push({
                name: (exp.name || '').toString(),
                amount: Number(exp.amount || 0),
                dueDate,
                paid: !!match,
                match: match ? { id: match.id, date: match.date, name: match.name, amount: match.amount } : null
            });
        }
    }

    // sort per data, poi per nome
    occs.sort((a, b) => (a.dueDate || '').localeCompare(b.dueDate || '') || (a.name || '').localeCompare(b.name || ''));
    return occs;
}

updateFixedStatusHome() {
    const listEl = document.getElementById('fixedStatusHomeList');
    if (!listEl) return;

    const esc = (s) => (s ?? '').toString()
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    const occs = this.getFixedOccurrencesInPeriod();
    if (!occs || occs.length === 0) {
        listEl.innerHTML = `<p class="chart-note">${this.t('noFixedInPeriod')}</p>`;
        return;
    }

    const fmtDate = (iso) => {
        try {
            const d = new Date(this.normalizeIsoDate(iso));
            if (isNaN(d.getTime())) return iso;
            return d.toLocaleDateString(this.data.language === 'it' ? 'it-IT' : 'en-US', { day: '2-digit', month: '2-digit' });
        } catch {
            return iso;
        }
    };

    listEl.innerHTML = occs.map(o => {
        const statusTxt = o.paid ? this.t('fixedPaid') : this.t('fixedPlanned');
        const pillClass = o.paid ? 'fixed-pill paid' : 'fixed-pill due';
        const matchTxt = (o.paid && o.match) ? `Trovata: ${fmtDate(o.match.date)} • ${(o.match.name || '')}` : '';

        return `
            <div class="fixed-status-row">
                <div class="fixed-status-left">
                    <div class="fixed-status-name" title="${esc(o.name)}">${esc(o.name)}</div>
                    <div class="fixed-status-sub">Scadenza: ${fmtDate(o.dueDate)}</div>
                </div>
                <div class="fixed-status-right">
                    <div class="fixed-status-amount">${this.formatCurrency(o.amount)}</div>
                    <div class="${pillClass}">${statusTxt}</div>
                    ${matchTxt ? `<div class="fixed-match" title="${esc(matchTxt)}">${esc(matchTxt)}</div>` : ''}
                </div>
            </div>
        `;
    }).join('');
}



    calculatePlannedSavings() {
        const totalIncome = this.calculateTotalIncome();
        const percent = this.data.savingsPercent || 0;
        return (totalIncome * percent) / 100;
    }

    calculateProjectedSavingsEnd() {
        const pot = this.data.savingsPot || 0;
        const planned = this.calculatePlannedSavings();
        const remaining = this.calculateRemaining();
        // Se vai in rosso, non aumentiamo il pot con un valore negativo
        return pot + planned + Math.max(0, remaining);
    }

    calculateRemaining() {
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpensesUnpaid();
        const savingsAmount = this.calculatePlannedSavings();
        const budget = totalIncome - totalFixed - savingsAmount;
        return budget - this.calculateTotalVariableExpenses();
    }

    calculateDailyBudget() {
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpensesUnpaid();
        const budget = totalIncome - totalFixed;
        const remaining = budget - this.calculateTotalVariableExpenses();
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
        
        const date = dateInput || new Date().toISOString().split('T')[0];
        
        if (!desc || !amount) {
            alert(this.t('fillFields'));
            return;
        }
        
        if (!Array.isArray(this.data.incomes) || this.data.incomes.length === 0) {
            const startDate = new Date(date);
            const endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 30);
            
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
        const date = this.normalizeIsoDate(document.getElementById('expenseDate').value);
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
        this.learnCategory(name, category);

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
        const pot = parseFloat(document.getElementById('savingsPotInput')?.value) || 0;
        this.data.savingsPercent = percent;
        this.data.savingsGoal = goal;
        this.data.savingsPot = pot;
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

    drawSparkline(canvasId, data, color = '#0ea5e9') {
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
        document.getElementById('expenseDate').addEventListener('change', () => this.updateVariableExpensesList());

        const showAllToggle = document.getElementById('showAllExpensesToggle');
        if (showAllToggle) {
            showAllToggle.checked = !!this.showAllExpenses;
            showAllToggle.addEventListener('change', (e) => {
                this.showAllExpenses = !!e.target.checked;
                localStorage.setItem('budgetwise-show-all-expenses', this.showAllExpenses ? 'true' : 'false');
                this.updateVariableExpensesList();
            });
        }
        document.getElementById('applySaveBtn').addEventListener('click', () => this.applySavings());

        const loadDemoBtn = document.getElementById('loadDemoBtn');
        if (loadDemoBtn) loadDemoBtn.addEventListener('click', () => this.loadDemoData());
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
        const autoLangToggle = document.getElementById('autoLangToggle');
        if (autoLangToggle) {
            const auto = localStorage.getItem('budgetwise-language-auto') === 'true';
            autoLangToggle.checked = auto;
            document.getElementById('languageSelect').disabled = auto;
            autoLangToggle.addEventListener('change', (e) => {
                const enabled = !!e.target.checked;
                localStorage.setItem('budgetwise-language-auto', enabled ? 'true' : 'false');
                document.getElementById('languageSelect').disabled = enabled;
                if (enabled) {
                    const nav = (Array.isArray(navigator.languages) && navigator.languages[0]) || navigator.language || '';
                    const code = String(nav).toLowerCase().slice(0, 2);
                    const supported = ['it','en','es','fr','de','pt','nl','el','ar'];
                    const chosen = supported.includes(code) ? code : 'it';
                    this.data.language = chosen;
                    this.saveData();
                    this.applyLanguage();
                    this.updateUI();
                    this.updateChart();
                }
            });
        }
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
            this.updateUI();
            this.updateChart();
        });
        const closeDetailBtn = document.getElementById('closeDetailBtn');
        if (closeDetailBtn) {
            closeDetailBtn.addEventListener('click', () => {
                document.getElementById('categoryDetail').style.display = 'none';
            });
        }
        
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
        const claimBtn = document.getElementById('claimRewardBtn');
        if (claimBtn) {
            claimBtn.addEventListener('click', () => this.claimChallengeReward());
        }
        const regenBtn = document.getElementById('regenerateReportBtn');
        if (regenBtn) {
            regenBtn.textContent = this.t('regenerateReport');
            regenBtn.addEventListener('click', () => {
                const txt = this.generateWeeklyNarrativeReport();
                const el = document.getElementById('weeklyReportText');
                if (el) el.textContent = txt;
            });
        }
    }

    updateUI() {
        // Allinea automaticamente il periodo all'ultimo stipendio (se presente)
        this.ensureSalaryPeriod();
        document.getElementById('dailyBudget').textContent = this.formatCurrency(this.calculateDailyBudget());
        document.getElementById('remaining').textContent = this.formatCurrency(this.calculateRemaining());
        document.getElementById('daysLeft').textContent = this.getDaysLeft();
        const plannedBadge = document.getElementById('plannedSavingsBadge');
        if (plannedBadge) {
            const planned = this.calculatePlannedSavings();
            plannedBadge.textContent = planned > 0 ? `${this.t('plannedSavingsLabel')}: ${this.formatCurrency(planned)}` : '';
            if (planned > 0) {
                const percent = this.data.savingsPercent || 0;
                if (percent > 0 && percent < 20) {
                    const suggested = Math.min(percent + 5, 20);
                    const income = this.calculateTotalIncome();
                    const goal = this.data.savingsGoal || 0;
                    let hint = this.t('plannedSavingsShortHint', { p: suggested });
                    if (goal > 0 && income > 0) {
                        const monthsNeeded = Math.ceil(goal / ((income * percent) / 100));
                        const newMonths = Math.ceil(goal / ((income * suggested) / 100));
                        const diff = Math.max(0, monthsNeeded - newMonths);
                        if (diff > 0 && isFinite(diff)) {
                            plannedBadge.title = this.t('plannedSavingsTooltip', { p: suggested, m: diff });
                        } else {
                            plannedBadge.title = this.t('plannedSavingsTooltip', { p: suggested, m: 1 });
                        }
                    }
                    plannedBadge.textContent += ` • ${hint}`;
                } else {
                    plannedBadge.title = '';
                }
                plannedBadge.classList.remove('good','warn');
                if (percent >= 20) {
                    plannedBadge.classList.add('good');
                } else if (percent > 0) {
                    plannedBadge.classList.add('warn');
                }
            } else {
                plannedBadge.title = '';
                plannedBadge.classList.remove('good','warn');
            }
        }

        // Piano risparmi (fondo separato dal budget)
        const potEl = document.getElementById('savingsPot');
        const projEl = document.getElementById('savingsProjected');
        if (potEl) potEl.textContent = this.formatCurrency(this.data.savingsPot || 0);
        if (projEl) projEl.textContent = `Fine periodo: ${this.formatCurrency(this.calculateProjectedSavingsEnd())}`;


        const remainingStatus = document.getElementById('remainingStatus');
        const remainingTrend = document.getElementById('remainingTrend');
        const remaining = this.calculateRemaining();
        if (remainingStatus) {
            remainingStatus.textContent = remaining >= 0 ? '✅' : '⚠️';
            remainingStatus.title = remaining >= 0 ? this.t('positiveBalance') : this.t('negativeBalance');
        }
        if (remainingTrend) {
            const today = new Date();
            const todayIso = today.toISOString().split('T')[0];
            let todaySpent = 0;
            if (this.data.variableExpenses && Array.isArray(this.data.variableExpenses[todayIso])) {
                todaySpent = this.data.variableExpenses[todayIso].reduce((s, e) => s + (Number(e.amount || 0) || 0), 0);
            }
            const dailyBudget = this.calculateDailyBudget();
            const totalIncome = this.calculateTotalIncome();
            const totalFixed = this.calculateTotalFixedExpensesUnpaid();
            const remainingNoSavings = (totalIncome - totalFixed) - this.calculateTotalVariableExpenses();
            const daysLeft = this.getDaysLeft();
            const avg7Arr = this.getLast7DaysData();
            const avg7 = avg7Arr.length ? (avg7Arr.reduce((a,b)=>a+b,0) / avg7Arr.length) : 0;
            const runoutDays = avg7 > 0 ? Math.ceil(Math.max(0, remainingNoSavings) / avg7) : Infinity;
            const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
            const tomIso = tomorrow.toISOString().split('T')[0];
            let tomorrowFixed = 0;
            const occs = this.getFixedOccurrencesInPeriod();
            occs.forEach(o => { if (!o.paid && o.dueDate === tomIso) tomorrowFixed += (Number(o.amount||0)||0); });
            const msgRisk = (lang) => {
                const d = runoutDays;
                return lang === 'it' ? `⚠️ A questo ritmo sarai a zero in ${d} giorni`
                     : lang === 'en' ? `⚠️ At this pace you'll hit zero in ${d} days`
                     : lang === 'es' ? `⚠️ A este ritmo llegarás a cero en ${d} días`
                     : lang === 'fr' ? `⚠️ À ce rythme tu seras à zéro dans ${d} jours`
                     : lang === 'de' ? `⚠️ Mit diesem Tempo bist du in ${d} Tagen bei null`
                     : lang === 'pt' ? `⚠️ Nesse ritmo você chega a zero em ${d} dias`
                     : lang === 'nl' ? `⚠️ In dit tempo ben je over ${d} dagen op nul`
                     : lang === 'el' ? `⚠️ Με αυτόν τον ρυθμό θα μηδενίσεις σε ${d} ημέρες`
                     : `⚠️ At this pace you'll hit zero in ${d} days`;
            };
            const msgTomorrow = (lang, amt) => {
                const a = this.formatCurrency(amt);
                return lang === 'it' ? `⚠️ Domani fissa: ${a}. Riduci oggi`
                     : lang === 'en' ? `⚠️ Fixed tomorrow: ${a}. Cut today`
                     : lang === 'es' ? `⚠️ Fija mañana: ${a}. Reduce hoy`
                     : lang === 'fr' ? `⚠️ Fixe demain: ${a}. Réduis aujourd’hui`
                     : lang === 'de' ? `⚠️ Fixkosten morgen: ${a}. Heute reduzieren`
                     : lang === 'pt' ? `⚠️ Fixa amanhã: ${a}. Reduza hoje`
                     : lang === 'nl' ? `⚠️ Vaste last morgen: ${a}. Vandaag minderen`
                     : lang === 'el' ? `⚠️ Πάγιο αύριο: ${a}. Μείωσε σήμερα`
                     : `⚠️ Fixed tomorrow: ${a}. Cut today`;
            };
            if (tomorrowFixed > dailyBudget) {
                remainingTrend.textContent = msgTomorrow(this.data.language, tomorrowFixed);
            } else if (avg7 > dailyBudget && runoutDays < daysLeft) {
                remainingTrend.textContent = msgRisk(this.data.language);
            } else {
                const labelToday = (this.data.language === 'it' ? 'Oggi' :
                    (this.data.language === 'en' ? 'Today' :
                    (this.data.language === 'es' ? 'Hoy' :
                    (this.data.language === 'fr' ? 'Aujourd’hui' :
                    (this.data.language === 'de' ? 'Heute' :
                    (this.data.language === 'pt' ? 'Hoje' :
                    (this.data.language === 'nl' ? 'Vandaag' :
                    (this.data.language === 'el' ? 'Σήμερα' :
                    (this.data.language === 'ar' ? 'اليوم' : 'Today')))))))));
                remainingTrend.textContent = `${labelToday}: ${this.formatCurrency(todaySpent)} / ${this.formatCurrency(dailyBudget)}`;
            }
        }

        this.updatePeriodInfo();
        this.updateIncomeList();
        this.updateFixedExpensesList();
        this.updateVariableExpensesList();

        document.getElementById('savePercent').value = this.data.savingsPercent || 0;
        document.getElementById('saveGoal').value = this.data.savingsGoal || 0;
        const potInput = document.getElementById('savingsPotInput');
        if (potInput) potInput.value = this.data.savingsPot || 0;
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
        this.drawSparkline('budgetSparkline', last7DaysBudget, '#0ea5e9');
        const remainingColor = this.calculateRemaining() >= 0 ? '#2dc653' : '#ef233c';
        this.drawSparkline('remainingSparkline', last7Days, remainingColor);
        this.updateBurnRateChart();

        this.generateAiSuggestion();
        const challengesTitle = document.getElementById('challengesTitle');
        if (challengesTitle) challengesTitle.textContent = this.t('challengesTitle');
        this.updateChallengesUI();
        const wrTitle = document.getElementById('weeklyReportTitle');
        if (wrTitle) wrTitle.textContent = this.t('weeklyReportTitle');
        const wrEl = document.getElementById('weeklyReportText');
        if (wrEl) wrEl.textContent = this.generateWeeklyNarrativeReport();
    }

    generateWeeklyNarrativeReport() {
        const lang = this.data.language || 'it';
        const ps = this.normalizeIsoDate(this.data.periodStart);
        const pe = this.normalizeIsoDate(this.data.periodEnd);
        if (!ps || !pe) {
            return lang === 'it' ? 'Aggiungi un periodo e qualche spesa per generare il report'
                 : 'Add a period and some expenses to generate the report';
        }
        const start = new Date(ps);
        const end = new Date(pe);
        const today = new Date();
        const curEnd = today < end ? today : end;
        const prevStartIso = this.addMonthsClamp(ps, -1);
        const prevStart = new Date(prevStartIso);
        const prevEnd = new Date(ps);
        const curMap = this.sumVariableByCategoryBetween(start, curEnd);
        const prevMap = this.sumVariableByCategoryBetween(prevStart, prevEnd);
        const deltas = [];
        Object.keys(curMap).forEach(cat => {
            const c = curMap[cat] || 0;
            const p = prevMap[cat] || 0;
            const pct = p > 0 ? ((c - p) / p) : (c > 0 ? 1 : 0);
            if (pct > 0.05) deltas.push({ cat, pct: Math.round(pct*100), amount: c });
        });
        deltas.sort((a,b)=>b.pct - a.pct);
        const fixedCur = this.sumFixedBetween(start, curEnd);
        const fixedPrev = this.sumFixedBetween(prevStart, prevEnd);
        const fixedStable = fixedPrev > 0 ? Math.abs((fixedCur - fixedPrev) / fixedPrev) < 0.05 : true;
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpensesUnpaid();
        const remainingNoSavings = (totalIncome - totalFixed) - this.calculateTotalVariableExpenses();
        const daysLeft = this.getDaysLeft();
        const avg7Arr = this.getLast7DaysData();
        const avg7 = avg7Arr.length ? (avg7Arr.reduce((a,b)=>a+b,0) / avg7Arr.length) : 0;
        const dailyBudget = this.calculateDailyBudget();
        const projectedSpend = avg7 * Math.max(0, daysLeft);
        const targetSpend = dailyBudget * Math.max(0, daysLeft);
        const diff = projectedSpend - targetSpend;
        const fmt = (v) => this.formatCurrency(Math.abs(Math.round(v)));
        const top = deltas[0];
        const catTxt = top ? (lang === 'it'
            ? `Hai speso ${top.pct}% in più in ${top.cat} rispetto al mese scorso`
            : `You spent ${top.pct}% more on ${top.cat} than last month`)
            : (lang === 'it' ? 'Le spese variabili sono in linea con il mese scorso' : 'Variable spending is in line with last month');
        const fixedTxt = fixedStable
            ? (lang === 'it' ? 'mentre le spese fisse sono stabili' : 'while fixed bills are stable')
            : (lang === 'it'
                ? `con le spese fisse ${fixedCur > fixedPrev ? 'in aumento' : 'in calo'}`
                : `with fixed bills ${fixedCur > fixedPrev ? 'increasing' : 'decreasing'}`);
        const endTxt = diff > 0
            ? (lang === 'it' ? `Se mantieni questo ritmo, arriverai a fine mese con ${fmt(diff)} in meno`
                              : `At this pace, you’ll end the month with ${fmt(diff)} less`)
            : (lang === 'it' ? `Se mantieni questo ritmo, arriverai a fine mese con ${fmt(diff)} in più`
                              : `At this pace, you’ll end the month with ${fmt(diff)} more`);
        return `${catTxt}, ${fixedTxt}. ${endTxt}.`;
    }

    sumVariableByCategoryBetween(start, end) {
        const out = {};
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < start || d > end) return;
                if (Array.isArray(arr)) {
                    arr.forEach(e => {
                        const cat = e.category || 'Altro';
                        out[cat] = (out[cat] || 0) + (Number(e.amount||0)||0);
                    });
                }
            });
        }
        return out;
    }

    sumFixedBetween(start, end) {
        let total = 0;
        const occs = this.getFixedOccurrencesInPeriod ? this.getFixedOccurrencesInPeriod() : [];
        occs.forEach(o => {
            const d = new Date(this.normalizeIsoDate(o.dueDate));
            if (isNaN(d.getTime()) || d < start || d > end) return;
            total += (Number(o.amount||0)||0);
        });
        return total;
    }

    initChallenges() {
        if (!this.data.challenge) {
            const baseline = this.computeWeeklyVariableAverage(28);
            this.data.challenge = {
                id: 'reduce10_var_4w',
                startDate: new Date().toISOString().split('T')[0],
                weeksTarget: 4,
                targetReductionPercent: 10,
                baselineWeeklyAvg: baseline,
                weeksAchieved: 0,
                completed: false,
                claimed: false,
                rewardType: 'savings_pot_add',
                rewardAmount: 20
            };
            this.saveData();
        }
        this.evaluateChallengeProgress();
    }

    computeWeeklyVariableAverage(daysWindow) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - Math.max(1, daysWindow || 28));
        let total = 0;
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < start || d > end) return;
                const sum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                total += sum;
            });
        }
        const dailyAvg = total / Math.max(1, Math.ceil((end - start) / (1000*60*60*24)));
        return dailyAvg * 7;
    }

    evaluateChallengeProgress() {
        const ch = this.data.challenge;
        if (!ch) return;
        const start = new Date(ch.startDate);
        const today = new Date();
        let weeksDone = 0;
        for (let i = 0; i < ch.weeksTarget; i++) {
            const ws = new Date(start); ws.setDate(start.getDate() + i*7);
            const we = new Date(ws); we.setDate(ws.getDate() + 7);
            if (we > today) break;
            const sum = this.sumVariableBetween(ws, we);
            const target = ch.baselineWeeklyAvg * (1 - ch.targetReductionPercent/100);
            if (sum <= target) weeksDone += 1;
        }
        ch.weeksAchieved = weeksDone;
        ch.completed = weeksDone >= ch.weeksTarget;
        this.saveData();
    }

    sumVariableBetween(start, end) {
        let total = 0;
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < start || d > end) return;
                const sum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                total += sum;
            });
        }
        return total;
    }

    updateChallengesUI() {
        const ch = this.data.challenge;
        const box = document.getElementById('challengeBox');
        if (!box || !ch) return;
        const desc = this.t('challengeReduceDescTpl', { pct: ch.targetReductionPercent, weeks: ch.weeksTarget });
        const reward = this.t('challengeRewardAddTpl', { amount: this.formatCurrency(ch.rewardAmount) });
        const progressText = this.t('challengeProgressTpl', { done: ch.weeksAchieved || 0, target: ch.weeksTarget });
        document.getElementById('challengeDesc').textContent = desc;
        document.getElementById('challengeRewardText').textContent = reward;
        document.getElementById('challengeProgressText').textContent = progressText;
        const bar = document.getElementById('challengeProgressBar');
        const cont = document.getElementById('challengeProgressContainer');
        if (bar && cont) {
            const pct = Math.min(100, Math.round(((ch.weeksAchieved || 0) / ch.weeksTarget) * 100));
            cont.style.display = 'block';
            bar.style.width = pct + '%';
        }
        const claim = document.getElementById('claimRewardBtn');
        if (claim) {
            claim.style.display = ch.completed && !ch.claimed ? '' : 'none';
            claim.textContent = this.t('claimReward');
        }
    }

    claimChallengeReward() {
        const ch = this.data.challenge;
        if (!ch || !ch.completed || ch.claimed) return;
        if (ch.rewardType === 'savings_pot_add') {
            this.data.savingsPot = (this.data.savingsPot || 0) + (ch.rewardAmount || 0);
        }
        ch.claimed = true;
        this.saveData();
        this.updateUI();
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
                    <span class="expense-amount" style="color: var(--success)">+${this.formatCurrency(inc.amount || 0)}</span>
                    <div class="expense-actions">
                        <button class="delete-income-btn" data-id="${inc.id}">🗑️</button>
                    </div>
                </div>
            `).join('');
        }

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

        document.querySelectorAll('.delete-fixed-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                this.deleteFixedExpense(id);
            });
        });
    }

    updateVariableExpensesList() {
        const container = document.getElementById('variableExpensesList');
        if (!container) return;

        const selectedDateRaw = document.getElementById('expenseDate')?.value || '';
        const selectedDate = this.normalizeIsoDate(selectedDateRaw);

        let view = [];
        if (this.showAllExpenses) {
            const entries = (this.data.variableExpenses && typeof this.data.variableExpenses === 'object')
                ? Object.entries(this.data.variableExpenses)
                : [];

            for (const [d, dayExpenses] of entries) {
                if (!Array.isArray(dayExpenses)) continue;
                for (const exp of dayExpenses) view.push({ date: this.normalizeIsoDate(d), exp });
            }

            view.sort((a, b) => {
                const da = new Date(a.date);
                const db = new Date(b.date);
                if (db - da !== 0) return db - da;
                return (b.exp?.id || 0) - (a.exp?.id || 0);
            });
        } else {
            const expenses = (this.data.variableExpenses && this.data.variableExpenses[selectedDate]) || [];
            if (Array.isArray(expenses)) view = expenses.map(exp => ({ date: selectedDate, exp }));
        }

        if (!view || view.length === 0) {
            container.innerHTML = `<p class="chart-note">${this.t('noVariable')}</p>`;
            return;
        }

        container.innerHTML = view.map(({ date, exp }) => {
            const cat = exp.category || 'Altro';
            const catDisplay = this.getAllCategories().includes(cat) ? cat : 'Altro';
            const dateBadge = this.showAllExpenses ? `<span class="expense-category">📅 ${date}</span>` : '';
            return `
                <div class="expense-item">
                    <div class="expense-info">
                        <span class="expense-name">${exp.name || '?'}</span>
                        <span class="expense-category">${this.getCategoryEmoji(catDisplay)} ${catDisplay}</span>
                        ${dateBadge}
                    </div>
                    <span class="expense-amount">${this.formatCurrency(exp.amount || 0)}</span>
                    <div class="expense-actions">
                        <button class="edit-variable-btn" title="${this.t('edit')}" data-id="${exp.id}" data-date="${date}">✏️</button>
                        <button class="delete-variable-btn" data-id="${exp.id}" data-date="${date}">🗑️</button>
                    </div>
                </div>
            `;
        }).join('');

        document.querySelectorAll('.edit-variable-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                const date = e.currentTarget.dataset.date;
                this.editVariableExpense(date, id);
            });
        });

        document.querySelectorAll('.delete-variable-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = parseInt(e.currentTarget.dataset.id);
                const date = e.currentTarget.dataset.date;
                this.deleteVariableExpense(date, id);
            });
        });
    }

    editVariableExpense(date, id) {
        date = this.normalizeIsoDate(date);
        if (!this.data.variableExpenses || !this.data.variableExpenses[date]) return;
        const idx = this.data.variableExpenses[date].findIndex(e => e.id === id);
        if (idx === -1) return;

        const exp = this.data.variableExpenses[date][idx];

        const newName = prompt(this.data.language === 'it' ? 'Descrizione' : 'Description', exp.name || '');
        if (newName === null) return;

        const newAmountStr = prompt(this.data.language === 'it' ? 'Importo (€)' : 'Amount (€)', String(exp.amount ?? ''));
        if (newAmountStr === null) return;
        const newAmount = parseFloat(String(newAmountStr).replace(',', '.'));
        if (!isFinite(newAmount) || newAmount <= 0) {
            alert(this.t('fillFields'));
            return;
        }

        const cats = this.getAllCategories();
        const catHint = cats.join(', ');
        const newCategory = prompt(
            this.data.language === 'it' ? `Categoria (es. ${catHint})` : `Category (e.g. ${catHint})`,
            exp.category || 'Altro'
        );
        if (newCategory === null) return;
        const trimmedCat = String(newCategory).trim() || 'Altro';

        if (!this.getAllCategories().includes(trimmedCat)) {
            this.customCategories.push(trimmedCat);
            this.saveCustomCategories();
            this.updateAllCategorySelects();
        }

        exp.name = String(newName).trim() || exp.name;
        exp.amount = newAmount;
        exp.category = trimmedCat;

        this.data.variableExpenses[date][idx] = exp;
        this.saveData();
        this.updateUI();
        this.updateChart();
        this.showToast(this.data.language === 'it' ? '✅ Spesa aggiornata' : '✅ Expense updated', 'success');
    }

    updateChart() {
        const categories = {};
        const categoryExpenses = {};

        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([date, dayExpenses]) => {
                if (!Array.isArray(dayExpenses)) return;
                dayExpenses.forEach(expense => {
                    const cat = expense.category || 'Altro';
                    const amt = Number(expense.amount || 0) || 0;
                    categories[cat] = (categories[cat] || 0) + amt;

                    if (!categoryExpenses[cat]) categoryExpenses[cat] = [];
                    categoryExpenses[cat].push({
                        name: expense.name || '?',
                        amount: amt,
                        date: date
                    });
                });
            });
        }

        const chartNote = document.getElementById('chartNote');
        const categoryDetail = document.getElementById('categoryDetail');

        const chartContainer = document.querySelector('.chart-container');
        const legendEl = document.getElementById('chartLegend');

        if (Object.keys(categories).length === 0) {
            if (chartNote) chartNote.style.display = 'block';
            if (categoryDetail) categoryDetail.style.display = 'none';
            if (chartContainer) chartContainer.style.display = 'none';
            if (legendEl) { legendEl.innerHTML = ''; legendEl.style.display = 'none'; }
            if (this.chart) this.chart.destroy();
            this.chart = null;
            this.categoryExpenses = {};
            return;
        }

        if (chartNote) chartNote.style.display = 'none';
        if (chartContainer) chartContainer.style.display = '';
        if (legendEl) legendEl.style.display = '';

        if (this.chart) this.chart.destroy();
        this.chart = null;

        const canvas = document.getElementById('expenseChart');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        const labels = Object.keys(categories);
        const values = Object.values(categories);
        const totalExpenses = values.reduce((a, b) => a + b, 0);
        const colors = ['#0ea5e9', '#38bdf8', '#22c55e', '#f59e0b', '#ef4444', '#0284c7', '#8b5cf6', '#ec4899'];

        const bw = this;
        const centerTextPlugin = {
            id: 'centerText',
            afterDraw: (chart) => {
                const { ctx, chartArea } = chart;
                if (!chartArea || chart.config.type !== 'doughnut') return;
                const centerX = (chartArea.left + chartArea.right) / 2;
                const centerY = (chartArea.top + chartArea.bottom) / 2;
                const textColor = (getComputedStyle(document.documentElement).getPropertyValue('--text-secondary') || '#94a3b8').trim();
                const textColorBold = (getComputedStyle(document.documentElement).getPropertyValue('--text-primary') || '#f8fafc').trim();
                ctx.save();
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.font = '13px Inter, system-ui, sans-serif';
                ctx.fillStyle = textColor;
                ctx.fillText(bw.data.language === 'it' ? 'Totale spese' : 'Total expenses', centerX, centerY - 14);
                ctx.font = 'bold 22px Inter, system-ui, sans-serif';
                ctx.fillStyle = textColorBold;
                ctx.fillText(bw.formatCurrency(totalExpenses), centerX, centerY + 6);
                ctx.restore();
            }
        };

        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: values,
                    backgroundColor: labels.map((_, i) => colors[i % colors.length]),
                    borderColor: 'transparent',
                    hoverOffset: 4
                }]
            },
            options: {
                cutout: '70%',
                responsive: true,
                maintainAspectRatio: true,
                layout: { padding: 8 },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const label = context.label || '';
                                const value = context.raw || 0;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : '0.0';
                                const catName = labels[context.dataIndex];
                                const count = (categoryExpenses[catName] || []).length;
                                const nTrans = bw.data.language === 'it' ? 'transazioni' : 'transactions';
                                return [
                                    `${label}: ${bw.formatCurrency(value)}`,
                                    `${percentage}%`,
                                    `${count} ${nTrans}`
                                ];
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
            },
            plugins: [centerTextPlugin]
        });

        if (legendEl) {
            legendEl.innerHTML = labels.map((label, i) => {
                const amt = values[i] || 0;
                const pct = totalExpenses > 0 ? ((amt / totalExpenses) * 100).toFixed(0) : '0';
                const col = colors[i % colors.length];
                return `<div class="chart-legend-item" data-index="${i}" role="button" tabindex="0">
                    <span class="chart-legend-dot" style="background:${col}"></span>
                    <span class="chart-legend-label">${label}</span>
                    <span class="chart-legend-value">${this.formatCurrency(amt)} (${pct}%)</span>
                </div>`;
            }).join('');
            legendEl.querySelectorAll('.chart-legend-item').forEach((el, i) => {
                el.addEventListener('click', () => {
                    const catName = labels[i];
                    this.showCategoryDetail(catName, categoryExpenses[catName] || []);
                });
            });
        }

        this.categoryExpenses = categoryExpenses;
    }

    buildBurnRateSeries() {
        const startIso = this.normalizeIsoDate(this.data.periodStart);
        const endIso = this.normalizeIsoDate(this.data.periodEnd);
        const start = new Date(startIso);
        const end = new Date(endIso);
        if ([start, end].some(d => isNaN(d.getTime()))) return { labels: [], data: [], meta: [], baseline: [] };
        const varMap = {};
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([date, arr]) => {
                const d = this.normalizeIsoDate(date);
                if (!d || !this.isDateInPeriod(d)) return;
                const sum = Array.isArray(arr) ? arr.reduce((s, e) => s + (Number(e.amount || 0) || 0), 0) : 0;
                varMap[d] = (varMap[d] || 0) + sum;
            });
        }
        const occs = this.getFixedOccurrencesInPeriod();
        const unpaidFixedMap = {};
        occs.forEach(o => {
            if (!o || !o.dueDate || o.paid) return;
            unpaidFixedMap[o.dueDate] = (unpaidFixedMap[o.dueDate] || 0) + (Number(o.amount || 0) || 0);
        });
        const totalIncome = this.calculateTotalIncome();
        const initialRemaining = totalIncome;
        let remaining = initialRemaining;
        const labels = [];
        const data = [];
        const meta = [];
        const baseline = [];
        // baseline: distribuisce (initialRemaining - totale fisse) uniformemente sui giorni
        let totalFixedUnpaid = 0;
        Object.values(unpaidFixedMap).forEach(v => totalFixedUnpaid += (Number(v || 0) || 0));
        const daysCount = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const dailyTarget = (initialRemaining - totalFixedUnpaid) / daysCount;
        let cumulativeFixed = 0;
        const cursor = new Date(start);
        let dayIndex = 0;
        while (cursor < end) {
            const iso = cursor.toISOString().slice(0, 10);
            const fixedToday = unpaidFixedMap[iso] || 0;
            const varToday = varMap[iso] || 0;
            if (fixedToday) remaining -= fixedToday;
            if (varToday) remaining -= varToday;
            cumulativeFixed += fixedToday;
            const dLabel = cursor.toLocaleDateString(this.data.language === 'it' ? 'it-IT' : 'en-US', { day: '2-digit', month: '2-digit' });
            labels.push(dLabel);
            data.push(remaining);
            meta.push({ fixedToday, varToday, remaining });
            const baselineRemaining = initialRemaining - cumulativeFixed - (dailyTarget * (dayIndex + 1));
            baseline.push(baselineRemaining);
            cursor.setDate(cursor.getDate() + 1);
            dayIndex += 1;
        }
        return { labels, data, meta, baseline };
    }

    updateBurnRateChart() {
        const noteEl = document.getElementById('burnRateNote');
        const canvas = document.getElementById('burnRateChart');
        if (!canvas) return;
        const series = this.buildBurnRateSeries();
        const hasData = series.labels.length > 0 && this.calculateTotalIncome() > 0;
        if (noteEl) noteEl.style.display = hasData ? 'none' : '';
        if (!hasData) {
            if (this.burnChart) { this.burnChart.destroy(); this.burnChart = null; }
            return;
        }
        if (this.burnChart) { this.burnChart.destroy(); this.burnChart = null; }
        const ctx = canvas.getContext('2d');
        const colors = this.getCurrentThemeColors();
        const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const accent = colors.accentLight || '#38bdf8';
        grad.addColorStop(0, `${accent}`);
        grad.addColorStop(0.3, `${accent}AA`);
        grad.addColorStop(1, `${accent}00`);
        const zeroLine = {
            id: 'zeroLine',
            afterDraw: (chart) => {
                const yScale = chart.scales.y;
                if (!yScale) return;
                const y = yScale.getPixelForValue(0);
                const { left, right } = chart.chartArea;
                const c = chart.ctx;
                c.save();
                c.setLineDash([6, 4]);
                c.strokeStyle = colors.textSecondary || '#a1a1aa';
                c.lineWidth = 1;
                c.beginPath();
                c.moveTo(left, y);
                c.lineTo(right, y);
                c.stroke();
                c.restore();
            }
        };
        this.burnChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: series.labels,
                datasets: [{
                    data: series.data,
                    tension: 0.4,
                    borderWidth: 2,
                    fill: true,
                    backgroundColor: grad
                },{
                    data: series.baseline,
                    tension: 0.4,
                    borderWidth: 2,
                    borderColor: colors.warning || '#f59e0b',
                    fill: false,
                    borderDash: [8, 6]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const idx = context.dataIndex ?? 0;
                                const m = series.meta[idx] || { fixedToday:0, varToday:0, remaining:0 };
                                const r = this.formatCurrency(context.parsed.y || m.remaining || 0);
                                const f = this.formatCurrency(m.fixedToday || 0);
                                const v = this.formatCurrency(m.varToday || 0);
                                const fixedTxt = this.data.language === 'it' ? 'Fisse oggi' :
                                                  (this.data.language === 'de' ? 'Fixkosten heute' :
                                                  (this.data.language === 'pt' ? 'Fixas hoje' :
                                                  (this.data.language === 'nl' ? 'Vaste lasten vandaag' :
                                                  (this.data.language === 'el' ? 'Πάγια σήμερα' :
                                                  (this.data.language === 'es' ? 'Fijas hoy' :
                                                  (this.data.language === 'fr' ? 'Fixes aujourd’hui' :
                                                   'Fixed today'))))));
                                const varTxt = this.data.language === 'it' ? 'Variabili oggi' :
                                               (this.data.language === 'de' ? 'Variabel heute' :
                                               (this.data.language === 'pt' ? 'Variáveis hoje' :
                                               (this.data.language === 'nl' ? 'Variabel vandaag' :
                                               (this.data.language === 'el' ? 'Μεταβλητά σήμερα' :
                                               (this.data.language === 'es' ? 'Variables hoy' :
                                               (this.data.language === 'fr' ? 'Variables aujourd’hui' :
                                                'Variables today'))))));
                                // distinguere serie: saldo reale vs baseline
                                const isBaseline = context.datasetIndex === 1;
                                const titleTxt = isBaseline
                                    ? (this.data.language === 'it' ? 'Saldo previsto' :
                                       (this.data.language === 'de' ? 'Erwarteter Saldo' :
                                       (this.data.language === 'pt' ? 'Saldo previsto' :
                                       (this.data.language === 'nl' ? 'Verwachte saldo' :
                                       (this.data.language === 'el' ? 'Αναμενόμενο υπόλοιπο' :
                                       (this.data.language === 'es' ? 'Saldo previsto' :
                                       (this.data.language === 'fr' ? 'Solde prévu' : 'Expected balance')))))))
                                    : (this.data.language === 'it' ? 'Saldo' :
                                       (this.data.language === 'de' ? 'Saldo' :
                                       (this.data.language === 'pt' ? 'Saldo' :
                                       (this.data.language === 'nl' ? 'Saldo' :
                                       (this.data.language === 'el' ? 'Υπόλοιπο' :
                                       (this.data.language === 'es' ? 'Saldo' :
                                       (this.data.language === 'fr' ? 'Solde' : 'Balance')))))));
                                const main = `${titleTxt}: ${r}`;
                                if (isBaseline) return [main];
                                return [main, `${fixedTxt}: ${f}`, `${varTxt}: ${v}`];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { autoSkip: true, maxTicksLimit: 10 }
                    },
                    y: {
                        ticks: {
                            callback: (v) => this.formatCurrency(v)
                        }
                    }
                },
                elements: {
                    line: {
                        borderColor: (ctx) => {
                            const y0 = ctx.p0.parsed.y;
                            const y1 = ctx.p1.parsed.y;
                            const neg = y0 < 0 || y1 < 0;
                            return neg ? (colors.danger || '#ef4444') : (colors.accent || '#0ea5e9');
                        }
                    },
                    point: {
                        radius: 0
                    }
                }
            },
            plugins: [zeroLine]
        });
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
        const localeMap = { it: 'it-IT', en: 'en-GB', es: 'es-ES', fr: 'fr-FR', de: 'de-DE', pt: 'pt-PT', nl: 'nl-NL', el: 'el-GR', ar: 'ar-EG' };
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
        const totalFixed = this.calculateTotalFixedExpensesUnpaid();
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
        // Riapplica eventuali colori custom (senza bloccare la dark mode)
        if (localStorage.getItem('budgetwise-custom-colors')) {
            this.applyCustomColors();
        } else {
            this.clearThemeInlineOverrides();
        }
        this.updateChart();
        this.updateBurnRateChart();
    }

    applyTheme() {
        if (localStorage.getItem('budgetwise-theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('themeToggle').textContent = '☀️';
        }
    }

    getCurrentTheme() {
        // Source of truth: data-theme attribute (html), fallback to localStorage
        const attr = document.documentElement.getAttribute('data-theme');
        if (attr === 'dark') return 'dark';
        const saved = localStorage.getItem('budgetwise-theme');
        return saved === 'dark' ? 'dark' : 'light';
    }
getCurrentThemeColors() {
        const style = getComputedStyle(document.documentElement);
        return {
            accent: style.getPropertyValue('--accent').trim() || '#0ea5e9',
            accentLight: style.getPropertyValue('--accent-light').trim() || '#38bdf8',
            cardBg: style.getPropertyValue('--card-bg').trim() || '#ffffff',
            textPrimary: style.getPropertyValue('--text-primary').trim() || '#0f172a',
            textSecondary: style.getPropertyValue('--text-secondary').trim() || '#334155',
            bg: style.getPropertyValue('--bg-color').trim() || '#f8fafc',
            success: style.getPropertyValue('--success').trim() || '#10b981',
            danger: style.getPropertyValue('--danger').trim() || '#ef4444',
            warning: style.getPropertyValue('--warning').trim() || '#f59e0b',
            border: style.getPropertyValue('--border').trim() || '#e2e8f0'
        };
    }

    applyCustomColors() {
        // Apply ONLY if user has custom colors saved.
        if (!this.customColors) return;
        const currentTheme = this.getCurrentTheme ? this.getCurrentTheme() : (localStorage.getItem('budgetwise-theme') === 'dark' ? 'dark' : 'light');
        const savedTheme = this.customColorsTheme || localStorage.getItem('budgetwise-custom-colors-theme') || 'light';
        const crossTheme = savedTheme !== currentTheme;
        // Se i colori sono stati salvati in LIGHT, non devono bloccare la DARK mode.
        const lockSensitive = crossTheme && currentTheme === 'dark';
        document.documentElement.style.setProperty('--accent', this.customColors.accent);
        document.documentElement.style.setProperty('--accent-light', this.customColors.accentLight);
        if (!lockSensitive) document.documentElement.style.setProperty('--card-bg', this.customColors.cardBg);
        if (!lockSensitive) document.documentElement.style.setProperty('--text-primary', this.customColors.textPrimary);
        if (!lockSensitive) document.documentElement.style.setProperty('--text-secondary', this.customColors.textSecondary);
        if (!lockSensitive) document.documentElement.style.setProperty('--bg-color', this.customColors.bg);
document.documentElement.style.setProperty('--success', this.customColors.success);
        document.documentElement.style.setProperty('--danger', this.customColors.danger);
        document.documentElement.style.setProperty('--warning', this.customColors.warning);
        if (!lockSensitive) document.documentElement.style.setProperty('--border', this.customColors.border);
document.documentElement.style.setProperty('--accent-gradient', 
            `linear-gradient(135deg, ${this.customColors.accent}, ${this.customColors.accentLight})`);
        
        this.syncColorPickers();
    }

    clearThemeInlineOverrides() {
        const props = [
            '--accent', '--accent-light', '--card-bg', '--text-primary', '--text-secondary',
            '--bg-color', '--success', '--danger', '--warning', '--border', '--accent-gradient'
        ];
        props.forEach(p => document.documentElement.style.removeProperty(p));
    }

    syncColorPickers() {
        const setField = (id, value) => {
            const input = document.getElementById(id);
            if (!input) return;

            // <input type="color"> accetta solo #RRGGBB. Se troviamo valori tipo rgb/rgba li normalizziamo.
            const normalizeToHex = (v) => {
                if (!v) return '';
                v = String(v).trim();

                // già #RRGGBB
                if (/^#[0-9a-fA-F]{6}$/.test(v)) return v;

                // #RGB -> #RRGGBB
                const short = v.match(/^#([0-9a-fA-F]{3})$/);
                if (short) {
                    const s = short[1];
                    return '#' + s[0] + s[0] + s[1] + s[1] + s[2] + s[2];
                }

                // rgb()/rgba() -> #RRGGBB (ignora alpha)
                const rgb = v.match(/^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})(?:\s*,\s*(?:0|1|0?\.\d+))?\s*\)$/i);
                if (rgb) {
                    const r = Math.max(0, Math.min(255, parseInt(rgb[1], 10)));
                    const g = Math.max(0, Math.min(255, parseInt(rgb[2], 10)));
                    const b = Math.max(0, Math.min(255, parseInt(rgb[3], 10)));
                    const toHex = (n) => n.toString(16).padStart(2, '0');
                    return '#' + toHex(r) + toHex(g) + toHex(b);
                }

                return '';
            };

            // Se il campo è un color picker, settiamo solo valori validi
            if (input.type === 'color') {
                const hex = normalizeToHex(value);
                if (hex) input.value = hex;
                return;
            }

            // altrimenti set normale
            input.value = value ?? '';
        };
        setField('colorAccent', this.customColors.accent);
        setField('colorAccentLight', this.customColors.accentLight);
        setField('colorCardBg', this.customColors.cardBg);
        setField('colorTextPrimary', this.customColors.textPrimary);
        setField('colorTextSecondary', this.customColors.textSecondary);
        setField('colorBg', this.customColors.bg);
        setField('colorSuccess', this.customColors.success);
        setField('colorDanger', this.customColors.danger);
        setField('colorWarning', this.customColors.warning);
        setField('colorBorder', this.customColors.border);
    }

    saveCustomColors() {
        localStorage.setItem('budgetwise-custom-colors', JSON.stringify(this.customColors));
        const currentTheme = this.getCurrentTheme ? this.getCurrentTheme() : (localStorage.getItem('budgetwise-theme') === 'dark' ? 'dark' : 'light');
        localStorage.setItem('budgetwise-custom-colors-theme', currentTheme);
        this.customColorsTheme = currentTheme;
    }

    setupColorPickers() {
        const colorInputs = [
            'colorAccent', 'colorAccentLight', 'colorCardBg', 
            'colorTextPrimary', 'colorTextSecondary', 'colorBg',
            'colorSuccess', 'colorDanger', 'colorWarning', 'colorBorder'
        ];
        
        colorInputs.forEach(id => {
            const picker = document.getElementById(id);
            if (picker) {
                picker.addEventListener('input', (e) => {
                    const value = e.target.value;
                    // First time the user touches a picker, initialize from current theme defaults.
                    if (!this.customColors) {
                        this.customColors = this.getCurrentThemeColors();
                    }
                    const propName = id.replace('color', '').charAt(0).toLowerCase() + id.replace('color', '').slice(1);
                    this.customColors[propName] = value;
                    this.applyCustomColors();
                    this.saveCustomColors();
                });
            }
        });
        
        const resetBtn = document.getElementById('resetColorsBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // Reset to theme defaults and remove inline overrides.
                this.customColors = null;
                localStorage.removeItem('budgetwise-custom-colors');
                localStorage.removeItem('budgetwise-custom-colors-theme');
                this.customColorsTheme = null;
                this.clearThemeInlineOverrides();
                this.syncColorPickers();
                this.showToast(this.t('resetColors') || 'Colori ripristinati', 'success');
            });
        }
    }

    saveData() {
        localStorage.setItem('budgetwise-data', JSON.stringify(this.data));
    }

    loadData() {
        const saved = localStorage.getItem('budgetwise-data');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                
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
                if (this.data.savingsPot === undefined) this.data.savingsPot = 0;
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
            savingsPot: 0,
                threshold: 50,
                language: this.data.language,
                periodStart: today.toISOString().split('T')[0],
                periodEnd: end.toISOString().split('T')[0]
            };
            // Resetta anche i colori personalizzati
            this.customColors = this.getCurrentThemeColors();
            this.applyCustomColors();
            this.saveCustomColors();
            this.syncColorPickers();

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

    // ========== IMPARARE CATEGORIE (AI locale) ==========
    /** Migra regole vecchie { keyword: "Cat" } → { keyword: { category, confidence } } */
    migrateCategoryRules(raw) {
        const migrated = {};
        for (const [key, val] of Object.entries(raw)) {
            if (typeof val === 'string') {
                migrated[key] = { category: val, confidence: 1 };
            } else if (val && typeof val.category === 'string') {
                migrated[key] = { category: val.category, confidence: Math.max(1, val.confidence || 1) };
            }
        }
        return migrated;
    }

    /** Normalizza descrizione: minuscole, rimozione numeri/codici, estrae token principali */
    normalizeDescriptionForLearning(description) {
        if (!description || typeof description !== 'string') return [];
        let s = description
            .toLowerCase()
            .replace(/[\u0300-\u036f]/g, '') // diacritics
            .replace(/\d+/g, ' ')            // numeri
            .replace(/[^a-z0-9\s]/gi, ' ')
            .replace(/\s+/g, ' ')
            .trim();
        const tokens = s.split(' ').filter(t => t.length >= 3);
        const seen = new Set();
        const out = [];
        for (const t of tokens) {
            if (!seen.has(t)) { seen.add(t); out.push(t); }
        }
        // Opzionale: IBAN/RID/SEPA per ricorrenti
        const lower = description.toLowerCase();
        if (/\bibb\b|iban|rid|sepa|addebito|sdd|abbonamento\b/i.test(lower)) {
            const ric = 'ricorrente';
            if (!seen.has(ric)) { seen.add(ric); out.push(ric); }
        }
        return out;
    }

    learnCategory(description, category) {
        if (!description || !category) return;
        const tokens = this.normalizeDescriptionForLearning(description);
        for (const keyword of tokens) {
            if (keyword.length < 3) continue;
            const existing = this.categoryRules[keyword];
            if (existing && existing.category === category) {
                existing.confidence = Math.min(10, (existing.confidence || 1) + 1);
            } else {
                this.categoryRules[keyword] = { category, confidence: 1 };
            }
        }
        localStorage.setItem('budgetwise-category-rules', JSON.stringify(this.categoryRules));
        console.log(`📌 Appreso: "${tokens.slice(0, 3).join(', ')}" → ${category}`);
    }

    /**
     * Suggerisce categoria da descrizione.
     * @returns {{ category: string, confidence: number }} category + confidenza (0 = nessun match)
     */
    suggestCategory(description) {
        const lowerDesc = description.toLowerCase();
        const isRicorrente = /\bibb\b|iban|rid|sepa|addebito|sdd|abbonamento\b/i.test(description || '');
        let best = { category: 'Altro', confidence: 0 };
        for (const [keyword, rule] of Object.entries(this.categoryRules)) {
            if (keyword.length < 3) continue;
            const matches = (keyword === 'ricorrente' && isRicorrente) || lowerDesc.includes(keyword);
            if (!matches) continue;
            const conf = (rule && rule.confidence) || 1;
            if (conf > best.confidence) {
                best = { category: (rule && rule.category) || 'Altro', confidence: conf };
            }
        }
        return best;
    }

    /** Per retrocompatibilità: restituisce solo la stringa categoria (come prima) */
    suggestCategoryString(description) {
        return this.suggestCategory(description).category;
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
            defaultList.innerHTML = this.defaultCategories.map(cat => {
                let translationKey = '';
                switch(cat) {
                    case 'Alimentari': translationKey = 'categoryAlimentari'; break;
                    case 'Trasporti': translationKey = 'categoryTrasporti'; break;
                    case 'Svago': translationKey = 'categorySvago'; break;
                    case 'Salute': translationKey = 'categorySalute'; break;
                    case 'Abbigliamento': translationKey = 'categoryAbbigliamento'; break;
                    case 'Altro': translationKey = 'categoryAltro'; break;
                    default: translationKey = cat;
                }
                const displayName = this.t(translationKey);
                return `<div class="category-item default"><span>${displayName}</span></div>`;
            }).join('');
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
            
            listEl.innerHTML = importedExpenses.map((exp, index) => {
                const hint = exp._suggested
                    ? this.t('importSuggested').replace('{cat}', exp._suggested)
                    : this.t('importLearn');
                return `
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
                        <small class="review-hint">${hint}</small>
                    </div>
                </div>
            `;
            }).join('');
            
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
                    importedExpenses[index].category = newCategory;
                    // Impara sempre dalla conferma (aumenta confidenza o crea nuova regola)
                    this.learnCategory(importedExpenses[index].name, newCategory);
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
    async showMappingDialog(file, delimiter, skipRows = 0, headerRow = 1) {
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
                const lines = text.split('\n').filter(line => line.trim() !== '');
                
                if (lines.length === 0) {
                    resolve(null);
                    return;
                }
                
                // Salta le righe iniziali
                const startLine = Math.min(skipRows, lines.length - 1);
                let headerLine = startLine;
                
                // Se headerRow è > 0, la riga di intestazione è startLine + (headerRow - 1)
                if (headerRow > 0) {
                    headerLine = startLine + (headerRow - 1);
                    if (headerLine >= lines.length) {
                        alert(`Riga intestazione ${headerRow} non trovata. Uso la prima riga disponibile.`);
                        headerLine = startLine;
                    }
                }
                
                // Estrai intestazione
                let headers = [];
                if (headerRow > 0) {
                    headers = lines[headerLine].split(delimiter).map(h => h.trim());
                } else {
                    // Nessuna intestazione: crea colonne fittizie
                    const sampleLine = lines[startLine] || '';
                    headers = sampleLine.split(delimiter).map((_, i) => `Colonna ${i+1}`);
                }
                
                // Prepara dati per anteprima (dopo l'intestazione)
                const previewData = [];
                const dataStartLine = headerLine + 1;
                for (let i = dataStartLine; i < Math.min(dataStartLine + 5, lines.length); i++) {
                    previewData.push(lines[i].split(delimiter).map(cell => cell.trim()));
                }
                
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
                
                // Clona per evitare listener duplicati
                const newConfirm = confirmBtn.cloneNode(true);
                const newCancel = cancelBtn.cloneNode(true);
                confirmBtn.parentNode.replaceChild(newConfirm, confirmBtn);
                cancelBtn.parentNode.replaceChild(newCancel, cancelBtn);
                
                newConfirm.addEventListener('click', onConfirm);
                newCancel.addEventListener('click', onCancel);
            };
            
            reader.onerror = () => {
                resolve(null);
            };
            
            reader.readAsText(file);
        });
    }

    // ========== IMPORT CSV CON MAPPATURA E REVISIONE ==========
    async parseCSV(file, delimiter, dateFormat, skipRows = 0, headerRow = 1) {
        console.log('📥 Inizio import CSV:', file.name, 'delimiter:', delimiter, 'dateFormat:', dateFormat, 'skipRows:', skipRows, 'headerRow:', headerRow);

        const mapping = await this.showMappingDialog(file, delimiter, skipRows, headerRow);
        if (!mapping) {
            alert(this.t('importCancelled'));
            return { cancelled: true, added: 0, incomes: 0 };
        }

        return await new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = async (e) => {
                try {
                    const text = e.target.result;
                    const allLines = String(text).split('\n').filter(line => line.trim() !== '');

                    // Salta le righe iniziali
                    const startLine = Math.min(skipRows, allLines.length - 1);

                    // Determina dove iniziano i dati (dopo l'intestazione)
                    let dataStartLine = startLine;
                    if (headerRow > 0) {
                        dataStartLine = startLine + headerRow; // Salta anche l'intestazione
                    }

                    const lines = allLines.slice(dataStartLine);
                    const importedExpenses = [];
                    const tempIncomes = [];

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
                                if (d && m && y) dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                                else continue;
                            } else continue;
                        } else if (dateFormat === 'MM/DD/YYYY') {
                            const parts = dateStr.split(/[\/\-]/);
                            if (parts.length === 3) {
                                const [m, d, y] = parts;
                                if (m && d && y) dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                                else continue;
                            } else continue;
                        }

                        dateStr = this.normalizeIsoDate(dateStr);
                        if (!dateStr) continue;

                        let amount = parseFloat(String(amountStr).replace(',', '.').replace(/[^0-9.-]/g, ''));
                        if (isNaN(amount)) continue;

                        let _suggested = null;
                        if (!category) {
                            const sug = this.suggestCategory(description);
                            category = sug.confidence >= this.CATEGORY_CONFIDENCE_THRESHOLD ? sug.category : 'Altro';
                            if (sug.confidence > 0 && sug.confidence < this.CATEGORY_CONFIDENCE_THRESHOLD) {
                                _suggested = sug.category;
                            }
                        }

                        if (amount > 0) {
                            tempIncomes.push({
                                desc: description,
                                amount: amount,
                                date: dateStr,
                                id: Date.now() + i
                            });
                        } else {
                            amount = Math.abs(amount);
                            const exp = { name: description, amount: amount, date: dateStr, category: category || 'Altro', id: Date.now() + i };
                            if (_suggested) exp._suggested = _suggested;
                            importedExpenses.push(exp);
                        }
                    }

                    let addedExpenses = 0;
                    let addedIncomes = 0;

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

                            addedExpenses = reviewed.length;

                            if (tempIncomes.length > 0) {
                                if (!this.data.incomes) this.data.incomes = [];
                                this.data.incomes.push(...tempIncomes);
                                addedIncomes = tempIncomes.length;
                            }

                            this.saveData();
                            this.updateUI();
                            this.updateChart();

                            const mostRecent = reviewed
                                .map(e => this.normalizeIsoDate(e.date))
                                .sort()
                                .slice(-1)[0];
                            const dateInput = document.getElementById('expenseDate');
                            if (dateInput && mostRecent) dateInput.value = mostRecent;
                            this.updateVariableExpensesList();

                            this.showToast(
                                this.data.language === 'it'
                                    ? `✅ Importate ${addedExpenses} spese${addedIncomes ? ` e ${addedIncomes} entrate` : ''}!`
                                    : `✅ Imported ${addedExpenses} expenses${addedIncomes ? ` and ${addedIncomes} incomes` : ''}!`,
                                'success'
                            );

                            resolve({ cancelled: false, added: addedExpenses, incomes: addedIncomes });
                            return;
                        } else {
                            alert(this.t('importCancelled'));
                            resolve({ cancelled: true, added: 0, incomes: 0 });
                            return;
                        }
                    } else if (tempIncomes.length > 0) {
                        if (!this.data.incomes) this.data.incomes = [];
                        this.data.incomes.push(...tempIncomes);
                        addedIncomes = tempIncomes.length;
                        this.saveData();
                        this.updateUI();
                        this.updateChart();

                        this.showToast(
                            this.data.language === 'it'
                                ? `✅ Importate ${addedIncomes} entrate!`
                                : `✅ Imported ${addedIncomes} incomes!`,
                            'success'
                        );

                        resolve({ cancelled: false, added: 0, incomes: addedIncomes });
                        return;
                    } else {
                        this.showToast(
                            this.data.language === 'it'
                                ? '⚠️ Nessun movimento valido trovato nel file'
                                : '⚠️ No valid transactions found in the file',
                            'info'
                        );
                        resolve({ cancelled: false, added: 0, incomes: 0 });
                        return;
                    }
                } catch (err) {
                    console.error('❌ Errore durante import CSV:', err);
                    alert(this.t('csvImportError'));
                    reject(err);
                }
            };

            reader.onerror = () => {
                console.error('❌ Errore lettura file');
                alert(this.t('fileReadError'));
                reject(new Error('File read error'));
            };

            reader.readAsText(file);
        });
    }

    // ========== IMPORT EXCEL ==========
    async parseExcel(file, sheetIndex = 0, headerRow = 0) {
        console.log('📥 Inizio import Excel:', file.name, 'foglio:', sheetIndex, 'headerRow:', headerRow);

        // Legge Excel
        const arrayBuffer = await new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = () => reject(new Error('Errore durante la lettura del file'));
            reader.readAsArrayBuffer(file);
        });

        const data = new Uint8Array(arrayBuffer);
        const workbook = XLSX.read(data, { type: 'array', cellDates: true });

        const safeSheetIndex = (sheetIndex >= 0 && sheetIndex < workbook.SheetNames.length) ? sheetIndex : 0;
        const sheetName = workbook.SheetNames[safeSheetIndex];
        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
        if (!rows || rows.length === 0) throw new Error('Il file Excel è vuoto');

        const cellToString = (cell) => {
            if (cell === null || cell === undefined) return '';
            if (cell instanceof Date && !isNaN(cell.getTime())) {
                const y = cell.getFullYear();
                const m = String(cell.getMonth() + 1).padStart(2, '0');
                const d = String(cell.getDate()).padStart(2, '0');
                return `${y}-${m}-${d}`;
            }
            // Seriali data Excel
            if (typeof cell === 'number' && isFinite(cell) && XLSX?.SSF?.parse_date_code) {
                const dc = XLSX.SSF.parse_date_code(cell);
                if (dc && dc.y >= 1900 && dc.y <= 2100 && dc.m >= 1 && dc.m <= 12 && dc.d >= 1 && dc.d <= 31) {
                    const y = dc.y;
                    const m = String(dc.m).padStart(2, '0');
                    const d = String(dc.d).padStart(2, '0');
                    return `${y}-${m}-${d}`;
                }
            }
            return String(cell).replace(/[\t ]+/g, ' ').trim();
        };

        const normalizeHeader = (h) => String(h || '').trim().toLowerCase();

        // Autodetect header row se headerRow è 0 o non valido:
        // cerchiamo una riga che contenga colonne tipo Data/Descrizione/Entrate-Uscite
        let hr = (headerRow >= 0 && headerRow < rows.length) ? headerRow : 0;
        if (headerRow === 0) {
            let bestIdx = 0;
            let bestScore = -1;
            for (let i = 0; i < Math.min(rows.length, 50); i++) {
                const r = (rows[i] || []).map(cellToString).map(normalizeHeader);
                if (!r.length) continue;

                const hasDataOp = r.includes('data_operazione') || r.includes('data operazione') || r.includes('data');
                const hasDesc = r.includes('descrizione') || r.includes('descrizione_completa') || r.includes('descrizione completa');
                const hasUsc = r.includes('uscite') || r.includes('addebiti') || r.includes('debit');
                const hasEnt = r.includes('entrate') || r.includes('accrediti') || r.includes('credit');

                const score = (hasDataOp ? 2 : 0) + (hasDesc ? 2 : 0) + (hasUsc ? 1 : 0) + (hasEnt ? 1 : 0);
                if (score > bestScore) {
                    bestScore = score;
                    bestIdx = i;
                }
            }
            if (bestScore >= 3) hr = bestIdx;
        }

        const headersRaw = (rows[hr] || []).map(cellToString);
        const headers = headersRaw.map(normalizeHeader);

        const idx = (nameList) => {
            for (const n of nameList) {
                const key = normalizeHeader(n);
                const i = headers.indexOf(key);
                if (i !== -1) return i;
            }
            return -1;
        };

        // Formato estratto conto tipo il tuo (Data_Operazione, Entrate, Uscite, Descrizione, Moneymap...)
        const iDate = idx(['data_operazione', 'data operazione', 'data']);
        const iEnt = idx(['entrate', 'accrediti', 'credit']);
        const iUsc = idx(['uscite', 'addebiti', 'debit']);
        const iDescFull = idx(['descrizione_completa', 'descrizione completa']);
        const iDesc = idx(['descrizione']);
        const iCat = idx(['moneymap', 'categoria', 'category']);

        const dataRows = rows
            .slice(hr + 1)
            .filter(row => Array.isArray(row) && row.some(cell => String(cell ?? '').trim() !== ''));

        // Se riconosciamo questo formato, importiamo direttamente (senza dialog mappatura)
        const recognizedBankFormat = (iDate !== -1) && (iDesc !== -1 || iDescFull !== -1) && (iEnt !== -1 || iUsc !== -1);

        if (recognizedBankFormat) {
            const importedExpenses = [];
            const tempIncomes = [];

            for (let r = 0; r < dataRows.length; r++) {
                const row = dataRows[r] || [];
                let dateStr = cellToString(row[iDate]);
                dateStr = this.normalizeIsoDate(dateStr);
                if (!dateStr) continue;

                const description = cellToString(row[iDescFull !== -1 ? iDescFull : iDesc]);
                if (!description) continue;

                const catRaw = (iCat !== -1) ? cellToString(row[iCat]) : '';
                let category = catRaw;
                let _suggested = null;
                if (!category) {
                    const sug = this.suggestCategory(description);
                    category = sug.confidence >= this.CATEGORY_CONFIDENCE_THRESHOLD ? sug.category : 'Altro';
                    if (sug.confidence > 0 && sug.confidence < this.CATEGORY_CONFIDENCE_THRESHOLD) {
                        _suggested = sug.category;
                    }
                }

                const parseNum = (v) => {
                    if (v === null || v === undefined || v === '') return null;
                    if (typeof v === 'number' && isFinite(v)) return v;
                    const s = String(v).replace(',', '.').replace(/[^0-9.-]/g, '');
                    const n = parseFloat(s);
                    return isNaN(n) ? null : n;
                };

                const usc = (iUsc !== -1) ? parseNum(row[iUsc]) : null;
                const ent = (iEnt !== -1) ? parseNum(row[iEnt]) : null;

                // Nel tuo file le uscite sono già negative (es: -16.50). Manteniamo il segno.
                let amount = null;
                if (usc !== null && usc !== 0) amount = usc;
                else if (ent !== null && ent !== 0) amount = ent;
                else continue;

                if (amount > 0) {
                    tempIncomes.push({ desc: description, amount: amount, date: dateStr, id: Date.now() + r });
                } else {
                    const exp = { name: description, amount: Math.abs(amount), date: dateStr, category: category || 'Altro', id: Date.now() + r };
                    if (_suggested) exp._suggested = _suggested;
                    importedExpenses.push(exp);
                }
            }

            // Riutilizza lo stesso flusso di salvataggio/revisione usato dal CSV
            let addedExpenses = 0;
            let addedIncomes = 0;

            if (importedExpenses.length > 0) {
                const reviewed = await this.showImportReview(importedExpenses);
                if (reviewed.length > 0) {
                    for (const exp of reviewed) {
                        if (!this.data.variableExpenses) this.data.variableExpenses = {};
                        if (!this.data.variableExpenses[exp.date]) this.data.variableExpenses[exp.date] = [];
                        this.data.variableExpenses[exp.date].push({ name: exp.name, amount: exp.amount, category: exp.category, id: exp.id });
                    }
                    addedExpenses = reviewed.length;
                } else {
                    alert(this.t('importCancelled'));
                    return { cancelled: true, added: 0, incomes: 0 };
                }
            }

            if (tempIncomes.length > 0) {
                if (!this.data.incomes) this.data.incomes = [];
                this.data.incomes.push(...tempIncomes);
                addedIncomes = tempIncomes.length;
            }

            if (addedExpenses === 0 && addedIncomes === 0) {
                this.showToast(
                    this.data.language === 'it'
                        ? '⚠️ Nessun movimento valido trovato nel file'
                        : '⚠️ No valid transactions found in the file',
                    'info'
                );
                return { cancelled: false, added: 0, incomes: 0 };
            }

            this.saveData();
            this.updateUI();
            this.updateChart();

            if (addedExpenses > 0) {
                const mostRecent = importedExpenses
                    .map(e => this.normalizeIsoDate(e.date))
                    .sort()
                    .slice(-1)[0];
                const dateInput = document.getElementById('expenseDate');
                if (dateInput && mostRecent) dateInput.value = mostRecent;
                this.updateVariableExpensesList();
            }

            this.showToast(
                this.data.language === 'it'
                    ? `✅ Importate ${addedExpenses} spese${addedIncomes ? ` e ${addedIncomes} entrate` : ''}!`
                    : `✅ Imported ${addedExpenses} expenses${addedIncomes ? ` and ${addedIncomes} incomes` : ''}!`,
                'success'
            );

            return { cancelled: false, added: addedExpenses, incomes: addedIncomes };
        }

        // Fallback: converte in TSV e usa la mappatura manuale
        const headersForTsv = headersRaw.map(cellToString).join('\t');
        const tsvLines = [headersForTsv];

        for (const row of dataRows) {
            tsvLines.push((row || []).map(cellToString).join('\t'));
        }

        const virtualFile = new File(
            [tsvLines.join('\n')],
            file.name.replace(/\.[^/.]+$/, '') + '_converted.tsv',
            { type: 'text/tab-separated-values' }
        );

        return await this.parseCSV(virtualFile, '\t', 'ISO', 0, 1);
    }


    async importFromVirtualCSV(file, delimiter, dateFormat, originalName) {
        console.log('🔄 Conversione da Excel a CSV per:', originalName);
        return await this.parseCSV(file, delimiter, dateFormat);
    }


    // ========== ONBOARDING GUIDATO ==========
    startOnboarding() {
        if (localStorage.getItem('budgetwise-onboarding-completed') === 'true') return;
        if (!this.isFirstRun()) return;

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

            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom: 14px;">
                <button id="onboarding-next" class="btn-primary" style="padding: 14px 32px; font-size: 1.1rem; border-radius: 50px; min-width: 140px; font-weight: 700;">
                    ${this.t('onboardingNext')}
                </button>
                <button id="onboarding-skip" class="btn-secondary" style="padding: 14px 32px; font-size: 1.1rem; border-radius: 50px; min-width: 140px; background: transparent; border: 2px solid var(--border);">
                    ✕ ${this.t('onboardingSkip')}
                </button>
            </div>

            <div style="display:flex; gap:12px; justify-content:center; flex-wrap:wrap; margin-bottom: 14px;">
                <button id="onboarding-demo" class="btn-secondary" style="padding: 12px 20px; border-radius: 50px; min-width: 180px;">
                    ${this.t('onboardingDemo')}
                </button>
                <button id="onboarding-empty" class="btn-text" style="padding: 12px 14px;">
                    ${this.t('onboardingEmpty')}
                </button>
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
                    box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.6) !important;
                }
                @keyframes targetGlow {
                    0% { box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.6); }
                    50% { box-shadow: 0 0 0 8px rgba(124, 58, 237, 1), 0 0 50px rgba(124, 58, 237, 0.9); }
                    100% { box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.8), 0 0 30px rgba(124, 58, 237, 0.6); }
                }
            `;
            document.head.appendChild(style);
        }

        const closeOnboarding = () => {
            localStorage.setItem('budgetwise-onboarding-completed', 'true');
            this.markFirstRunSeen();
            overlay.style.opacity = '0';
            setTimeout(() => overlay.remove(), 250);
            document.querySelectorAll('.onboarding-highlight').forEach(el => el.classList.remove('onboarding-highlight'));
        };

        const showStep = () => {
            const step = steps[stepIndex];
            const descEl = document.getElementById('onboarding-description');
            if (descEl) descEl.textContent = step.text;

            const counterEl = document.getElementById('onboarding-counter');
            if (counterEl) counterEl.innerText = String(stepIndex + 1);

            const progress = ((stepIndex + 1) / steps.length) * 100;
            const progressBar = document.getElementById('onboarding-progress');
            if (progressBar) progressBar.style.width = progress + '%';

            document.querySelectorAll('.onboarding-highlight').forEach(el => el.classList.remove('onboarding-highlight'));

            const target = document.querySelector(step.highlight);
            if (target) {
                target.classList.add('onboarding-highlight');
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        };

        const nextBtn = document.getElementById('onboarding-next');
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                stepIndex++;
                if (stepIndex < steps.length) showStep();
                else closeOnboarding();
            });
        }

        const skipBtn = document.getElementById('onboarding-skip');
        if (skipBtn) {
            skipBtn.addEventListener('click', () => closeOnboarding());
        }

        const demoBtn = document.getElementById('onboarding-demo');
        if (demoBtn) {
            demoBtn.addEventListener('click', () => {
                this.loadDemoData();
                closeOnboarding();
            });
        }

        const emptyBtn = document.getElementById('onboarding-empty');
        if (emptyBtn) {
            emptyBtn.addEventListener('click', () => closeOnboarding());
        }

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
        
        // Proattivo: rischio andare a zero prima della fine
        const totalIncome = this.calculateTotalIncome();
        const totalFixed = this.calculateTotalFixedExpensesUnpaid();
        const remainingNoSavings = (totalIncome - totalFixed) - this.calculateTotalVariableExpenses();
        const daysLeft = this.getDaysLeft();
        const avg7Arr = this.getLast7DaysData();
        const avg7 = avg7Arr.length ? (avg7Arr.reduce((a,b)=>a+b,0) / avg7Arr.length) : 0;
        const dailyBudget = this.calculateDailyBudget();
        const runoutDays = avg7 > 0 ? Math.ceil(Math.max(0, remainingNoSavings) / avg7) : Infinity;
        if (avg7 > dailyBudget && runoutDays < daysLeft) {
            const d = runoutDays;
            const msg = language === 'it'
                ? `⚠️ A questo ritmo sarai a zero in ${d} giorni. Prova a restare sotto ${this.formatCurrency(dailyBudget)} al giorno.`
                : language === 'en'
                ? `⚠️ At this pace you'll hit zero in ${d} days. Try staying under ${this.formatCurrency(dailyBudget)} per day.`
                : language === 'es'
                ? `⚠️ A este ritmo llegarás a cero en ${d} días. Intenta gastar menos de ${this.formatCurrency(dailyBudget)} por día.`
                : language === 'fr'
                ? `⚠️ À ce rythme tu seras à zéro dans ${d} jours. Essaie de rester sous ${this.formatCurrency(dailyBudget)} par jour.`
                : language === 'de'
                ? `⚠️ Mit diesem Tempo bist du in ${d} Tagen bei null. Bleibe unter ${this.formatCurrency(dailyBudget)} pro Tag.`
                : language === 'pt'
                ? `⚠️ Nesse ritmo você chega a zero em ${d} dias. Tente ficar abaixo de ${this.formatCurrency(dailyBudget)} por dia.`
                : language === 'nl'
                ? `⚠️ In dit tempo ben je over ${d} dagen op nul. Blijf onder ${this.formatCurrency(dailyBudget)} per dag.`
                : language === 'el'
                ? `⚠️ Με αυτόν τον ρυθμό θα μηδενίσεις σε ${d} ημέρες. Προσπάθησε να μένεις κάτω από ${this.formatCurrency(dailyBudget)} την ημέρα.`
                : `⚠️ At this pace you'll hit zero in ${d} days. Try staying under ${this.formatCurrency(dailyBudget)} per day.`;
            suggestions.push({
                message: msg,
                action: language === 'it' ? 'Consigli budget' : 'Budget tips',
                actionType: 'pace'
            });
        }
        // Proattivo: fissa alta domani
        const today = new Date();
        const tomorrow = new Date(today); tomorrow.setDate(today.getDate()+1);
        const tomIso = tomorrow.toISOString().split('T')[0];
        const occs = this.getFixedOccurrencesInPeriod();
        let tomorrowFixed = 0;
        occs.forEach(o => { if (!o.paid && o.dueDate === tomIso) tomorrowFixed += (Number(o.amount||0)||0); });
        if (tomorrowFixed > dailyBudget) {
            const a = this.formatCurrency(tomorrowFixed);
            const msg = language === 'it'
                ? `⚠️ Domani hai una fissa di ${a}. Riduci oggi per restare in linea col budget.`
                : language === 'en'
                ? `⚠️ Fixed expense of ${a} tomorrow. Cut today to stay on budget.`
                : language === 'es'
                ? `⚠️ Mañana tienes un fijo de ${a}. Reduce hoy para mantener el presupuesto.`
                : language === 'fr'
                ? `⚠️ Dépense fixe de ${a} demain. Réduis aujourd’hui pour tenir le budget.`
                : language === 'de'
                ? `⚠️ Morgen hast du Fixkosten von ${a}. Heute reduzieren, um im Budget zu bleiben.`
                : language === 'pt'
                ? `⚠️ Amanhã há uma despesa fixa de ${a}. Reduza hoje para manter o orçamento.`
                : language === 'nl'
                ? `⚠️ Morgen staat een vaste last van ${a}. Minderen vandaag om binnen budget te blijven.`
                : language === 'el'
                ? `⚠️ Αύριο έχεις πάγιο ${a}. Μείωσε σήμερα για να μείνεις στο budget.`
                : `⚠️ Fixed expense of ${a} tomorrow. Cut today to stay on budget.`;
            suggestions.push({
                message: msg,
                action: language === 'it' ? 'Riduci oggi' : 'Cut today',
                actionType: 'fixedTomorrow'
            });
        }
        const dow = new Date().getDay();
        const dowAvg = this.averageSpendForDow(dow, 56);
        if (dowAvg > dailyBudget) {
            const totalIncome2 = this.calculateTotalIncome();
            const totalFixed2 = this.calculateTotalFixedExpensesUnpaid();
            const remaining2 = (totalIncome2 - totalFixed2) - this.calculateTotalVariableExpenses();
            const runout2 = dowAvg > 0 ? Math.ceil(Math.max(0, remaining2) / dowAvg) : Infinity;
            if (runout2 < daysLeft) {
                const dayName2 = this.getDayName(dow);
                const msg2 = language === 'it'
                    ? `🔮 Se oggi spendi come i ${dayName2} scorsi, finirai il budget tra ${runout2} giorni`
                    : language === 'en'
                    ? `🔮 If you spend like past ${dayName2}s, you’ll run out in ${runout2} days`
                    : language === 'es'
                    ? `🔮 Si gastas como los últimos ${dayName2}, te quedarás sin presupuesto en ${runout2} días`
                    : language === 'fr'
                    ? `🔮 Si tu dépenses comme les derniers ${dayName2}, tu seras à court dans ${runout2} jours`
                    : language === 'de'
                    ? `🔮 Wenn du wie an vergangenen ${dayName2} ausgibst, bist du in ${runout2} Tagen am Limit`
                    : language === 'pt'
                    ? `🔮 Se gastar como nas últimas ${dayName2}, ficará sem orçamento em ${runout2} dias`
                    : language === 'nl'
                    ? `🔮 Als je uitgeeft zoals eerdere ${dayName2}, ben je over ${runout2} dagen door je budget`
                    : language === 'el'
                    ? `🔮 Αν ξοδέψεις όπως τα προηγούμενα ${dayName2}, θα μηδενίσεις σε ${runout2} ημέρες`
                    : `🔮 If you spend like past ${dayName2}s, you’ll run out in ${runout2} days`;
                suggestions.unshift({
                    message: msg2,
                    action: language === 'it' ? 'Regola oggi' : 'Adjust today',
                    actionType: 'dowPredict'
                });
            }
        }
        const trends = this.computeCategoryNegativeTrends(28, 28);
        if (trends && trends.length >= 1) {
            const top3 = trends.slice(0,3).map(t => `${t.cat} (+${Math.round(t.growth*100)}%)`).join(' • ');
            const msg3 = language === 'it'
                ? `📉 Trend negativo: ${top3} → valore emotivo, esamina`
                : language === 'en'
                ? `📉 Negative trend: ${top3} → emotional value, examine`
                : language === 'es'
                ? `📉 Tendencia negativa: ${top3} → valor emocional, examina`
                : language === 'fr'
                ? `📉 Tendance négative: ${top3} → valeur émotionnelle, examine`
                : language === 'de'
                ? `📉 Negativer Trend: ${top3} → emotionaler Wert, prüfen`
                : language === 'pt'
                ? `📉 Tendência negativa: ${top3} → valor emocional, examine`
                : language === 'nl'
                ? `📉 Negatieve trend: ${top3} → emotionele waarde, bekijk`
                : language === 'el'
                ? `📉 Αρνητική τάση: ${top3} → συναισθηματική αξία, εξέτασε`
                : `📉 Negative trend: ${top3} → emotional value, examine`;
            suggestions.unshift({
                message: msg3,
                action: language === 'it' ? 'Rivedi categorie' : 'Review categories',
                actionType: 'catTrend'
            });
        }
        const season = this.computeSeasonalityPreSalary();
        if (season && season.isUpcoming && season.ratio > 1.2) {
            const cutAmt = Math.round(Math.max(0, dailyBudget * (season.ratio - 1)));
            const msg4 = language === 'it'
                ? `📆 Negli anni passati, spendi di più nella settimana prima dello stipendio. Soglia adattiva: -${this.formatCurrency(cutAmt)} al giorno`
                : language === 'en'
                ? `📆 Historically you spend more in the week before payday. Adaptive threshold: -${this.formatCurrency(cutAmt)} per day`
                : language === 'es'
                ? `📆 Históricamente gastas más la semana previa al salario. Umbral adaptativo: -${this.formatCurrency(cutAmt)} por día`
                : language === 'fr'
                ? `📆 Historiquement tu dépenses plus la semaine avant le salaire. Seuil adaptatif: -${this.formatCurrency(cutAmt)} par jour`
                : language === 'de'
                ? `📆 Historisch gibst du in der Woche vor dem Gehalt mehr aus. Adaptiver Schwellenwert: -${this.formatCurrency(cutAmt)} pro Tag`
                : language === 'pt'
                ? `📆 Historicamente você gasta mais na semana antes do salário. Limite adaptativo: -${this.formatCurrency(cutAmt)} por dia`
                : language === 'nl'
                ? `📆 Historisch geef je meer uit in de week voor salaris. Adaptieve drempel: -${this.formatCurrency(cutAmt)} per dag`
                : language === 'el'
                ? `📆 Ιστορικά ξοδεύεις περισσότερο την εβδομάδα πριν τον μισθό. Προσαρμοστικό όριο: -${this.formatCurrency(cutAmt)} ανά ημέρα`
                : `📆 Historically you spend more in the week before payday. Adaptive threshold: -${this.formatCurrency(cutAmt)} per day`;
            suggestions.unshift({
                message: msg4,
                action: language === 'it' ? 'Applica soglia' : 'Apply threshold',
                actionType: 'adaptiveThreshold',
                amount: cutAmt
            });
        }
        // Coach predittivo di spesa: profilo e piano
        const coachProfile = this.computeSpendingProfile(30);
        if (coachProfile.total > 0) {
            const caps = this.computeCategoryCaps(coachProfile, dailyBudget);
            const topCaps = Object.entries(caps).sort((a,b)=>a[1]-b[1]).slice(0,3);
            const worstDow = coachProfile.dowAverages.length ? coachProfile.dowAverages.sort((a,b)=>b.avg-a.avg)[0] : null;
            const lines = [];
            if (topCaps.length) {
                const capLine = topCaps.map(([cat, cap]) => `${cat}: ${this.formatCurrency(Math.max(0, cap))}`).join(' • ');
                lines.push(language === 'it' ? `🎯 Limiti consigliati (al giorno): ${capLine}`
                     : language === 'en' ? `🎯 Recommended daily caps: ${capLine}`
                     : language === 'es' ? `🎯 Límites diarios recomendados: ${capLine}`
                     : language === 'fr' ? `🎯 Plafonds quotidiens recommandés: ${capLine}`
                     : language === 'de' ? `🎯 Tägliche Limits empfohlen: ${capLine}`
                     : language === 'pt' ? `🎯 Limites diários recomendados: ${capLine}`
                     : language === 'nl' ? `🎯 Aanbevolen daglimieten: ${capLine}`
                     : language === 'el' ? `🎯 Συνιστώμενα ημερήσια όρια: ${capLine}`
                     : `🎯 Recommended daily caps: ${capLine}`);
            }
            if (worstDow && worstDow.avg > dailyBudget) {
                const dayName = this.getDayName(worstDow.dow);
                const cut = Math.max(0, Math.round(worstDow.avg - dailyBudget));
                const msg = language === 'it'
                    ? `📅 Regola settimanale: riduci ${this.formatCurrency(cut)} il ${dayName}`
                    : language === 'en'
                    ? `📅 Weekly rule: cut ${this.formatCurrency(cut)} on ${dayName}`
                    : language === 'es'
                    ? `📅 Regla semanal: reduce ${this.formatCurrency(cut)} el ${dayName}`
                    : language === 'fr'
                    ? `📅 Règle hebdo: réduis de ${this.formatCurrency(cut)} le ${dayName}`
                    : language === 'de'
                    ? `📅 Wochenregel: reduziere ${this.formatCurrency(cut)} am ${dayName}`
                    : language === 'pt'
                    ? `📅 Regra semanal: reduza ${this.formatCurrency(cut)} na ${dayName}`
                    : language === 'nl'
                    ? `📅 Weekregel: minder ${this.formatCurrency(cut)} op ${dayName}`
                    : language === 'el'
                    ? `📅 Εβδομαδιαίος κανόνας: μείωσε κατά ${this.formatCurrency(cut)} την ${dayName}`
                    : `📅 Weekly rule: cut ${this.formatCurrency(cut)} on ${dayName}`;
                lines.push(msg);
            }
            if (lines.length) {
                suggestions.unshift({
                    message: lines.join(' • '),
                    action: language === 'it' ? 'Coach plan' : 'Coach plan',
                    actionType: 'coach'
                });
            }
        }
        
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
            this.showAiSuggestion(suggestions[0]);
        } else {
            document.getElementById('aiWidget').style.display = 'none';
        }
    }

    averageSpendForDow(dow, daysWindow) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - Math.max(7, daysWindow || 56));
        let sum = 0, count = 0;
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < start || d > end) return;
                if (d.getDay() !== dow) return;
                const daySum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                sum += daySum;
                count += 1;
            });
        }
        return count ? (sum / count) : 0;
    }

    computeCategoryNegativeTrends(daysRecent, daysPrev) {
        const end = new Date();
        const recentStart = new Date(); recentStart.setDate(end.getDate() - Math.max(7, daysRecent || 28));
        const prevStart = new Date(); prevStart.setDate(recentStart.getDate() - Math.max(7, daysPrev || 28));
        const recent = {};
        const prev = {};
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime())) return;
                const sum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                arr && arr.forEach(e => {
                    const cat = e.category || 'Altro';
                    if (d >= recentStart && d <= end) recent[cat] = (recent[cat] || 0) + (Number(e.amount||0)||0);
                    else if (d >= prevStart && d < recentStart) prev[cat] = (prev[cat] || 0) + (Number(e.amount||0)||0);
                });
            });
        }
        const out = [];
        Object.keys(recent).forEach(cat => {
            const r = recent[cat] || 0;
            const p = prev[cat] || 0;
            const growth = p > 0 ? (r - p) / p : (r > 0 ? 1 : 0);
            if (growth > 0.15) out.push({ cat, growth });
        });
        out.sort((a,b)=>b.growth - a.growth);
        return out;
    }

    computeSeasonalityPreSalary() {
        const incomes = Array.isArray(this.data.incomes) ? this.data.incomes : [];
        const salaryDates = incomes.filter(inc => this.isSalaryIncome(inc) && inc.date).map(inc => this.normalizeIsoDate(inc.date));
        if (!salaryDates.length) return null;
        let preWeekSum = 0, weeks = 0;
        const allWeeklyAvg = [];
        salaryDates.forEach(sd => {
            const end = new Date(sd);
            const start = new Date(sd); start.setDate(end.getDate() - 7);
            let sum = 0;
            for (let d = new Date(start); d <= end; d.setDate(d.getDate()+1)) {
                const iso = d.toISOString().split('T')[0];
                const arr = this.data.variableExpenses && this.data.variableExpenses[iso];
                const daySum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                sum += daySum;
            }
            preWeekSum += sum;
            weeks += 1;
        });
        const preAvg = weeks ? (preWeekSum / weeks / 7) : 0;
        const endAll = new Date();
        const startAll = new Date(); startAll.setFullYear(endAll.getFullYear()-3);
        let total = 0, days = 0;
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < startAll || d > endAll) return;
                const sum = Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
                total += sum;
                days += 1;
            });
        }
        const globalAvg = days ? (total / days) : 0;
        const ratio = globalAvg ? (preAvg / globalAvg) : 1;
        const nextSalary = this.findLastSalaryIncome();
        if (!nextSalary || !nextSalary.date) return { ratio: 1, isUpcoming: false };
        const nextDate = this.addMonthsClamp(this.normalizeIsoDate(nextSalary.date), 1);
        const today = new Date();
        const next = new Date(nextDate);
        const diffDays = Math.ceil((next - today) / (1000*60*60*24));
        const isUpcoming = diffDays > 0 && diffDays <= 7;
        return { ratio, isUpcoming };
    }

    getDayName(dow) {
        const daysIt = ['Domenica','Lunedì','Martedì','Mercoledì','Giovedì','Venerdì','Sabato'];
        const daysEn = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const daysEs = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
        const daysFr = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
        const daysDe = ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];
        const daysPt = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
        const daysNl = ['Zondag','Maandag','Dinsdag','Woensdag','Donderdag','Vrijdag','Zaterdag'];
        const daysEl = ['Κυριακή','Δευτέρα','Τρίτη','Τετάρτη','Πέμπτη','Παρασκευή','Σάββατο'];
        const daysAr = ['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
        const lang = this.data.language || 'it';
        const maps = { it: daysIt, en: daysEn, es: daysEs, fr: daysFr, de: daysDe, pt: daysPt, nl: daysNl, el: daysEl, ar: daysAr };
        const arr = maps[lang] || daysIt;
        return arr[dow] || arr[0];
    }

    computeSpendingProfile(daysWindow) {
        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - Math.max(1, daysWindow || 30));
        const categoryTotals = {};
        const dowTotals = Array(7).fill(0);
        let total = 0;
        if (this.data.variableExpenses && typeof this.data.variableExpenses === 'object') {
            Object.entries(this.data.variableExpenses).forEach(([iso, arr]) => {
                const d = new Date(this.normalizeIsoDate(iso));
                if (isNaN(d.getTime()) || d < start || d > end) return;
                if (Array.isArray(arr)) {
                    arr.forEach(e => {
                        const amount = Number(e.amount || 0) || 0;
                        const cat = e.category || 'Altro';
                        categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
                        total += amount;
                    });
                }
                const dow = d.getDay(); // 0=Sun ... 6=Sat
                dowTotals[dow] += Array.isArray(arr) ? arr.reduce((s,e)=>s+(Number(e.amount||0)||0),0) : 0;
            });
        }
        const shares = Object.entries(categoryTotals).map(([cat, tot]) => ({ cat, tot, share: total ? tot/total : 0 }));
        const dowAverages = dowTotals.map((sum, i) => ({ dow: i, avg: sum / Math.max(1, Math.floor((daysWindow||30)/7)) }));
        return { total, shares, dowAverages };
    }

    computeCategoryCaps(profile, dailyBudget) {
        const caps = {};
        const budget = Math.max(0, dailyBudget || 0);
        profile.shares.forEach(s => {
            caps[s.cat] = s.share * budget;
        });
        Object.keys(caps).forEach(cat => {
            if (caps[cat] > budget * 0.4) caps[cat] = Math.round(caps[cat] * 0.85);
        });
        return caps;
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
        const applyBtn = document.getElementById('applyAiSuggestion');
        const dismissBtn = document.getElementById('dismissAiSuggestion');
        const aiAction = document.getElementById('aiAction');
        const aiWidget = document.getElementById('aiWidget');

        if (!applyBtn) return;

        const cleanApplyBtn = applyBtn.cloneNode(true);
        applyBtn.parentNode.replaceChild(cleanApplyBtn, applyBtn);

        if (dismissBtn) {
            const cleanDismissBtn = dismissBtn.cloneNode(true);
            dismissBtn.parentNode.replaceChild(cleanDismissBtn, dismissBtn);
            cleanDismissBtn.addEventListener('click', () => {
                if (aiWidget) aiWidget.style.display = 'none';
            });
        }

        cleanApplyBtn.addEventListener('click', (e) => {
            const type = e.currentTarget.dataset.type || '';
            const amount = parseFloat(e.currentTarget.dataset.amount || '0');

            const bumpGoal = (extra) => {
                const currentGoal = this.data.savingsGoal || 0;
                const newGoal = currentGoal + (extra || 0);
                const goalInput = document.getElementById('saveGoal');
                if (goalInput) goalInput.value = newGoal;

                this.showToast(
                    this.data.language === 'it'
                        ? `🎯 Obiettivo aumentato a ${this.formatCurrency(newGoal)}`
                        : `🎯 Goal increased to ${this.formatCurrency(newGoal)}`,
                    'success'
                );
            };

            if (type === 'reduce' && amount > 0) {
                bumpGoal(amount);
            } else if (type === 'transport' && amount > 0) {
                const message = this.data.language === 'it'
                    ? `🚗 Prova a usare mezzi pubblici o car pooling per risparmiare ${this.formatCurrency(amount)} al mese. Vuoi fissare un obiettivo?`
                    : `🚗 Try using public transport or car pooling to save ${this.formatCurrency(amount)} per month. Want to set a goal?`;

                if (confirm(message)) bumpGoal(amount);
            } else if (type === 'leisure' && amount > 0) {
                const message = this.data.language === 'it'
                    ? `🎮 Limitando le uscite a 2 a settimana, potresti risparmiare ${this.formatCurrency(amount)}. Vuoi fissare un obiettivo?`
                    : `🎮 Limiting to 2 outings per week could save you ${this.formatCurrency(amount)}. Want to set a goal?`;

                if (confirm(message)) bumpGoal(amount);
            } else {
                this.showToast(this.t('featureInDev'), 'info');
            }

            if (aiAction) aiAction.style.display = 'none';
            setTimeout(() => {
                if (aiWidget) aiWidget.style.display = 'none';
            }, 2000);
        });
    }
}

// ============================================
// INIZIALIZZAZIONE
// ============================================

const app = new BudgetWise();
window.app = app;

// ============================================
// ============================================
// GESTIONE IMPORT CSV/EXCEL
// ============================================
setTimeout(function() {
    const btn = document.getElementById('importCsvBtn');
    const fileInput = document.getElementById('csvFile');
    const fileNameSpan = document.getElementById('csvFileName');
    const skipRowsInput = document.getElementById('skipRows');
    const headerRowInput = document.getElementById('headerRowManual');
    const sheetSelect = document.getElementById('excelSheet');
    const excelHeaderSelect = document.getElementById('excelHeaderRow');
    const advancedToggle = document.getElementById('importAdvancedToggle');
    const advancedWrap = document.getElementById('importAdvanced');
    
    if (!btn || !fileInput || !window.app) {
        console.error('Elementi import non trovati');
        return;
    }

    // Variabile per tenere traccia del file Excel in attesa
    window._pendingExcelFile = null;

    // Toggle opzioni avanzate (default: nascoste)
    if (advancedToggle && advancedWrap) {
        advancedToggle.addEventListener('click', () => {
            const isOpen = advancedWrap.style.display !== 'none';
            advancedWrap.style.display = isOpen ? 'none' : 'block';
            advancedToggle.textContent = isOpen ? this.t('advancedOptions') : this.t('hideOptions');
        });
    }

    btn.addEventListener('click', function(ev) {
        // Se non è stato selezionato nessun file, apri il picker.
        // Se invece c'è già un file (o un Excel in attesa), il click avvierà l'import (handler sotto).
        const hasSelected = (fileInput && fileInput.files && fileInput.files[0]) || window._pendingExcelFile;
        if (!hasSelected) {
            ev.preventDefault();
            ev.stopImmediatePropagation();
            fileInput.click();
            return;
        }
        // altrimenti: lascia proseguire il click → handler import
    });

fileInput.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        fileNameSpan.textContent = file.name;
        
        const fileExt = file.name.split('.').pop().toLowerCase();
        const isExcel = ['xls', 'xlsx'].includes(fileExt);
        
        if (isExcel) {
            // Abilita il select dei fogli
            if (sheetSelect) {
                sheetSelect.innerHTML = '<option value="">Caricamento...</option>';
                sheetSelect.disabled = true;
            }
            
            try {
                // Leggi i nomi dei fogli
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        const data = new Uint8Array(e.target.result);
                        const workbook = XLSX.read(data, { type: 'array' });
                        
                        if (sheetSelect) {
                            sheetSelect.innerHTML = workbook.SheetNames.map((name, index) => 
                                `<option value="${index}">${index+1}. ${name}</option>`
                            ).join('');
                            sheetSelect.disabled = false;
                            sheetSelect.value = '0';
                        }
                        
                        // Salva il file per dopo
                        window._pendingExcelFile = file;
	                        // UX: niente alert bloccanti. Se l'utente non apre le opzioni avanzate,
	                        // importeremo automaticamente il primo foglio con rilevazione intestazione.
                        
                    } catch (err) {
                        alert('❌ Errore nella lettura del file Excel: ' + err.message);
                    }
                };
                reader.readAsArrayBuffer(file);
                
            } catch (error) {
                alert('❌ Errore nella lettura del file Excel: ' + error.message);
            }
        } else {
            // CSV: reset selettore fogli
            if (sheetSelect) {
                sheetSelect.innerHTML = '<option value="">Carica un file Excel</option>';
                sheetSelect.disabled = true;
            }
            window._pendingExcelFile = null;
        }
    });

    // Gestione click pulsante Importa
    btn.addEventListener('click', async function() {
        const file = fileInput.files[0];
        const pendingFile = window._pendingExcelFile;
        
        if (!file && !pendingFile) {
            alert('❌ Seleziona prima un file CSV o Excel');
            return;
        }
        
        const fileToImport = pendingFile || file;
	        const fileExt = fileToImport.name.split('.').pop().toLowerCase();
        const isExcel = ['xls', 'xlsx'].includes(fileExt);
        
        try {
            if (isExcel) {
	                // Excel: 1-click. Se le opzioni avanzate non sono usate, importiamo
	                // il primo foglio (0) e lasciamo che parseExcel rilevi l'intestazione.
	                const sheetIndex = (sheetSelect && !sheetSelect.disabled && sheetSelect.value !== '')
	                    ? parseInt(sheetSelect.value)
	                    : 0;
	                const headerRow = excelHeaderSelect
	                    ? parseInt(excelHeaderSelect.value || '-1')
	                    : -1;
                
                btn.textContent = '⏳ Importazione...';
                btn.disabled = true;
                
                await window.app.parseExcel(fileToImport, sheetIndex, headerRow);
                
                // Resetta dopo import riuscito
                window._pendingExcelFile = null;
                fileInput.value = '';
                fileNameSpan.textContent = 'Nessun file selezionato';
                if (sheetSelect) {
                    sheetSelect.innerHTML = '<option value="">Carica un file Excel</option>';
                    sheetSelect.disabled = true;
                }
                
            } else {
                // Import CSV
                const delimiter = document.getElementById('csvSeparator').value;
                const dateFormat = document.getElementById('csvDelimiter').value;
                const skipRows = parseInt(skipRowsInput?.value || '0');
                const headerRow = parseInt(headerRowInput?.value || '1');
                
                btn.textContent = '⏳ Importazione...';
                btn.disabled = true;
                
                await window.app.parseCSV(fileToImport, delimiter, dateFormat, skipRows, headerRow);
                
                fileInput.value = '';
                fileNameSpan.textContent = 'Nessun file selezionato';
            }
            
            // Esito già gestito da parseCSV/parseExcel (toast/messaggi)
            
        } catch (error) {
            alert('❌ Errore durante l\'import: ' + (error?.message || String(error)));
            console.error(error);
	        } finally {
	            // Ripristina etichetta originale (con traduzioni)
	            try {
	                btn.innerHTML = window.app?.t ? window.app.t('csvImportBtn') : '📥 Importa CSV / Excel';
	            } catch {
	                btn.textContent = '📥 Importa CSV / Excel';
	            }
            btn.disabled = false;
        }
    });
    
}, 2000);