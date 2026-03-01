// ============================================
// BUDGETWISE 2.0 - FREEMIUM LICENSE SYSTEM
// ============================================

class BudgetWiseLicense {
    constructor() {
        this.licenseKey = localStorage.getItem('bw-license-key') || null;
        this.licenseEmail = localStorage.getItem('bw-license-email') || null;
        this.isPremium = this.checkPremiumStatus();
        this.trialUsed = localStorage.getItem('bw-trial-used') === 'true';
        this.trialStart = localStorage.getItem('bw-trial-start') || null;
        
        // Limitazioni per versione
        this.limits = {
            free: {
                maxTransactions: 50,
                maxCategories: 3,
                csvImport: false,
                aiAssistant: false,
                voiceRecognition: false,
                cloudSync: false,
                customCategories: false,
                advancedReports: false,
                calendarExport: false
            },
            premium: {
                maxTransactions: Infinity,
                maxCategories: Infinity,
                csvImport: true,
                aiAssistant: true,
                voiceRecognition: true,
                cloudSync: true,
                customCategories: true,
                advancedReports: true,
                calendarExport: true
            }
        };
        
        this.categories = ['Alimentari', 'Trasporti', 'Altro']; // Free version limit
    }
    
    checkPremiumStatus() {
        const license = localStorage.getItem('bw-license-valid');
        const expiry = localStorage.getItem('bw-license-expiry');
        
        if (!license || !expiry) return false;
        
        const expiryDate = new Date(expiry);
        const now = new Date();
        
        return now < expiryDate && license === 'valid';
    }
    
    getCurrentLimits() {
        if (this.isPremium) return this.limits.premium;
        return this.limits.free;
    }
    
    canAddTransaction(currentCount) {
        const limits = this.getCurrentLimits();
        return currentCount < limits.maxTransactions;
    }
    
    canUseFeature(feature) {
        const limits = this.getCurrentLimits();
        return limits[feature] === true;
    }
    
    startTrial() {
        if (this.trialUsed) return false;
        
        this.trialUsed = true;
        this.trialStart = new Date().toISOString();
        localStorage.setItem('bw-trial-used', 'true');
        localStorage.setItem('bw-trial-start', this.trialStart);
        
        // 7 giorni di trial premium
        const trialEnd = new Date();
        trialEnd.setDate(trialEnd.getDate() + 7);
        localStorage.setItem('bw-trial-end', trialEnd.toISOString());
        
        return true;
    }
    
    isTrialActive() {
        if (!this.trialUsed || !this.trialStart) return false;
        
        const trialEnd = new Date(localStorage.getItem('bw-trial-end') || '');
        const now = new Date();
        
        return now < trialEnd;
    }
    
    hasFullPremiumAccess() {
        return this.isPremium || this.isTrialActive();
    }
    
    async activateLicense(email, key) {
        try {
            // Validazione licenza via GitHub API (o altro servizio gratuito)
            const response = await fetch('https://api.github.com/repos/ferrarofranco917-netizen/budgetwise/actions/workflows/validate-license/dispatches', {
                method: 'POST',
                headers: {
                    'Authorization': `token ${key}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    timestamp: Date.now()
                })
            });
            
            if (response.ok) {
                this.licenseKey = key;
                this.licenseEmail = email;
                this.isPremium = true;
                
                // Salva licenza valida per 30 giorni
                const expiry = new Date();
                expiry.setDate(expiry.getDate() + 30);
                
                localStorage.setItem('bw-license-key', key);
                localStorage.setItem('bw-license-email', email);
                localStorage.setItem('bw-license-valid', 'valid');
                localStorage.setItem('bw-license-expiry', expiry.toISOString());
                
                return true;
            }
        } catch (error) {
            console.error('License validation failed:', error);
        }
        
        return false;
    }
    
    getUpgradeMessage(feature) {
        const messages = {
            csvImport: 'Importa i tuoi estratti conto con un clic! 📊',
            aiAssistant: 'Chiedi consigli al tuo assistente finanziario AI! 🤖',
            voiceRecognition: 'Aggiungi spese con la voce! 🎤',
            cloudSync: 'Sincronizza i dati su tutti i dispositivi! 🔄',
            customCategories: 'Crea categorie personalizzate! 🏷️',
            advancedReports: 'Report dettagliati e previsioni! 📈',
            calendarExport: 'Esporta in Google Calendar! 📅'
        };
        
        return messages[feature] || 'Questa funzionalità è disponibile nella versione Premium! 💎';
    }
    
    getRemainingDays() {
        if (this.isPremium) {
            const expiry = new Date(localStorage.getItem('bw-license-expiry') || '');
            const now = new Date();
            const diff = expiry - now;
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
        
        if (this.isTrialActive()) {
            const trialEnd = new Date(localStorage.getItem('bw-trial-end') || '');
            const now = new Date();
            const diff = trialEnd - now;
            return Math.ceil(diff / (1000 * 60 * 60 * 24));
        }
        
        return 0;
    }
    
    getStatus() {
        if (this.isPremium) return 'premium';
        if (this.isTrialActive()) return 'trial';
        return 'free';
    }
    
    getPlanInfo() {
        const status = this.getStatus();
        const remainingDays = this.getRemainingDays();
        
        switch(status) {
            case 'premium':
                return {
                    name: 'Premium',
                    status: 'Attivo',
                    remaining: `${remainingDays} giorni rimanenti`,
                    color: '#10b981'
                };
            case 'trial':
                return {
                    name: 'Trial Premium',
                    status: 'Attivo',
                    remaining: `${remainingDays} giorni rimanenti`,
                    color: '#f59e0b'
                };
            default:
                return {
                    name: 'Free',
                    status: 'Limitato',
                    remaining: 'Upgrade per funzionalità complete',
                    color: '#6b7280'
                };
        }
    }
}

// Export per uso in app.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BudgetWiseLicense;
}

// Expose for other scripts/modules
try { globalThis.BudgetWiseLicense = BudgetWiseLicense; } catch(e) {}
try { window.BudgetWiseLicense = BudgetWiseLicense; } catch(e) {}
