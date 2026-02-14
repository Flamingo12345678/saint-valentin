// =========================================
// APPLICATION PRINCIPALE - MISSION SAINT-VALENTIN
// =========================================

const app = {
    // Configuration
    config: {
        enigme1Answer: '26042024', // Date début relation (à personnaliser)
        enigme2Answer: 'mini messi', // Surnom (à personnaliser)
        enigme3Answer: '18022024', // Date première rencontre (à personnaliser)
        finalCode: 'ERNESTGRC',
        maxCardsToOpen: 3
    },
    
    // État de l'application
    state: {
        currentSection: 'intro',
        enigme1Solved: false,
        enigme2Solved: false,
        enigme3Solved: false,
        openedCardsCount: 0,
        selectedRestaurant: null,
        openedCards: []
    },
    
    // Restaurant unique
    restaurant: {
        name: 'La Maison du Thai',
        address: 'Bondoufle, France',
        instagram: 'https://www.instagram.com/lamaisonduthai/?hl=fr',
        time: '19h00'
    },
    
    // Initialisation
    init() {
        console.log('🎯 Mission Saint-Valentin initialisée');
        this.loadState();
        this.setupEventListeners();
        this.generateQRCode();
        
        // Si déjà des énigmes résolues, mettre à jour l'UI
        if (this.state.enigme1Solved || this.state.enigme2Solved || this.state.enigme3Solved) {
            this.restoreProgress();
        }
    },
    
    // Sauvegarde de l'état dans localStorage
    saveState() {
        localStorage.setItem('valentine_mission_state', JSON.stringify(this.state));
    },
    
    // Chargement de l'état depuis localStorage
    loadState() {
        const saved = localStorage.getItem('valentine_mission_state');
        if (saved) {
            this.state = { ...this.state, ...JSON.parse(saved) };
        }
    },
    
    // Restaurer la progression
    restoreProgress() {
        if (this.state.enigme1Solved) {
            document.getElementById('fragment1').classList.add('show');
            document.getElementById('fragment1').classList.remove('hidden');
        }
        if (this.state.enigme2Solved) {
            document.getElementById('fragment2').classList.add('show');
            document.getElementById('fragment2').classList.remove('hidden');
        }
        if (this.state.enigme3Solved) {
            document.getElementById('fragment3').classList.add('show');
            document.getElementById('fragment3').classList.remove('hidden');
        }
    },
    
    // Configuration des écouteurs d'événements
    setupEventListeners() {
        // Validation avec Enter
        document.getElementById('enigme1-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkEnigme1();
        });
        document.getElementById('enigme2-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkEnigme2();
        });
        document.getElementById('enigme3-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkEnigme3();
        });
        document.getElementById('code-input')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.checkFinalCode();
        });

        // Animation au survol du bouton Non
        document.getElementById('valentine-no')?.addEventListener('pointerenter', () => {
            this.teaseValentine();
        });
    },
    
    // Générer le QR code
    generateQRCode() {
        const qrImg = document.getElementById('qr-code');
        if (!qrImg) return;
        
        const url = window.location.href;
        const encodedUrl = encodeURIComponent(url);
        const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodedUrl}`;
        
        qrImg.src = qrApiUrl;
    },
    
    // Navigation entre sections
    goToSection(sectionId) {
        // Masquer toutes les sections
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Afficher la section cible
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            this.state.currentSection = sectionId;
            this.saveState();
            
            // Scroll vers le haut
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    },

    // Démarrer la mission
    startMission() {
        this.playSound('start');
        this.goToSection('valentine-section');
    },

    // =========================================
    // DEMANDE VALENTINE
    // =========================================
    acceptValentine() {
        const feedback = document.getElementById('valentine-feedback');
        feedback.textContent = '💝 J\'en étais sûr ! On commence l\'aventure...';
        feedback.className = 'feedback success';
        this.playSound('success');
        
        setTimeout(() => {
            this.goToSection('enigme1-section');
        }, 2000);
    },

    declineValentine() {
        const feedback = document.getElementById('valentine-feedback');
        feedback.textContent = '🥺 Je suis sûr que tu voulais dire oui... Reconsidère ?';
        feedback.className = 'feedback error';
        this.playSound('error');

        // Sur mobile, le clic remplace le survol
        this.teaseValentine();
    },

    teaseValentine() {
        const yesButton = document.getElementById('valentine-yes');
        const noButton = document.getElementById('valentine-no');
        if (!yesButton || !noButton) return;

        const currentYes = parseFloat(yesButton.dataset.scale || '1');
        const currentNo = parseFloat(noButton.dataset.scale || '1');

        const nextYes = Math.min(currentYes + 0.06, 1.6);
        const nextNo = Math.max(currentNo - 0.06, 0.6);

        yesButton.dataset.scale = nextYes.toString();
        noButton.dataset.scale = nextNo.toString();

        yesButton.style.transform = `scale(${nextYes})`;
        noButton.style.transform = `scale(${nextNo})`;
        yesButton.classList.add('valentine-grow');
        noButton.classList.add('valentine-shrink');

        if (nextNo <= 0.6) {
            const container = noButton.parentElement;
            if (container) {
                const containerRect = container.getBoundingClientRect();
                const buttonRect = noButton.getBoundingClientRect();
                const maxX = Math.max(containerRect.width - buttonRect.width, 0);
                const maxY = Math.max(containerRect.height - buttonRect.height, 0);

                const randomX = Math.random() * maxX - maxX / 2;
                const randomY = Math.random() * maxY - maxY / 2;

                noButton.style.position = 'relative';
                noButton.style.left = `${randomX}px`;
                noButton.style.top = `${randomY}px`;
            }
        }
    },
    
    // =========================================
    // ÉNIGME 1
    // =========================================
    checkEnigme1() {
        const input = document.getElementById('enigme1-input');
        const feedback = document.getElementById('enigme1-feedback');
        const value = input.value.trim();
        
        if (value === this.config.enigme1Answer) {
            // Succès
            input.classList.remove('error');
            input.classList.add('success');
            feedback.textContent = '✅ Correct ! Notre histoire a commencé ce jour-là...';
            feedback.className = 'feedback success';
            
            this.state.enigme1Solved = true;
            this.saveState();
            
            // Révéler le fragment
            setTimeout(() => {
                document.getElementById('fragment1').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('fragment1').classList.add('show');
                }, 50);
            }, 500);
            
            // Son de succès
            this.playSound('success');
            
            // Passer à l'énigme suivante après 2s
            setTimeout(() => {
                this.goToSection('enigme2-section');
            }, 3000);
        } else {
            // Erreur
            input.classList.add('error');
            input.classList.remove('success');
            feedback.textContent = '❌ Ce n\'est pas la bonne date... Réessaye !';
            feedback.className = 'feedback error';
            
            this.playSound('error');
            
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        }
    },
    
    // =========================================
    // ÉNIGME 2
    // =========================================
    checkEnigme2() {
        const input = document.getElementById('enigme2-input');
        const feedback = document.getElementById('enigme2-feedback');
        const value = input.value.trim().toLowerCase();
        
        if (value === this.config.enigme2Answer.toLowerCase()) {
            // Succès
            input.classList.remove('error');
            input.classList.add('success');
            feedback.textContent = '✅ Exact ! Mon petit ' + this.config.enigme2Answer + ' 😊';
            feedback.className = 'feedback success';
            
            this.state.enigme2Solved = true;
            this.saveState();
            
            // Révéler le fragment
            setTimeout(() => {
                document.getElementById('fragment2').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('fragment2').classList.add('show');
                }, 50);
            }, 500);
            
            this.playSound('success');
            
            setTimeout(() => {
                this.goToSection('enigme3-section');
            }, 3000);
        } else {
            // Erreur
            input.classList.add('error');
            input.classList.remove('success');
            feedback.textContent = '❌ Ce n\'est pas ce surnom... Essaie encore !';
            feedback.className = 'feedback error';
            
            this.playSound('error');
            
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        }
    },
    
    // =========================================
    // ÉNIGME 3
    // =========================================
    checkEnigme3() {
        const input = document.getElementById('enigme3-input');
        const feedback = document.getElementById('enigme3-feedback');
        const value = input.value.trim();
        
        if (value === this.config.enigme3Answer) {
            // Succès
            input.classList.remove('error');
            input.classList.add('success');
            feedback.textContent = '✅ Parfait ! C\'était le début de tout... 💕';
            feedback.className = 'feedback success';
            
            this.state.enigme3Solved = true;
            this.saveState();
            
            // Révéler le fragment
            setTimeout(() => {
                document.getElementById('fragment3').classList.remove('hidden');
                setTimeout(() => {
                    document.getElementById('fragment3').classList.add('show');
                }, 50);
            }, 500);
            
            this.playSound('success');
            
            setTimeout(() => {
                this.goToSection('code-section');
            }, 3000);
        } else {
            // Erreur
            input.classList.add('error');
            input.classList.remove('success');
            feedback.textContent = '❌ Pas tout à fait... Pense au jour où on s\'est rencontrés !';
            feedback.className = 'feedback error';
            
            this.playSound('error');
            
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        }
    },
    
    // =========================================
    // CODE FINAL
    // =========================================
    checkFinalCode() {
        const input = document.getElementById('code-input');
        const feedback = document.getElementById('code-feedback');
        const value = input.value.trim().toUpperCase();
        
        if (value === this.config.finalCode) {
            // Succès
            input.classList.add('success');
            feedback.textContent = '🎉 CODE VALIDÉ ! Ouverture du coffre...';
            feedback.className = 'feedback success';
            
            this.playSound('success');
            
            setTimeout(() => {
                this.openChest();
            }, 1500);
        } else {
            // Erreur
            input.classList.add('error');
            feedback.textContent = '❌ Code incorrect. Assemble bien les 3 fragments !';
            feedback.className = 'feedback error';
            
            this.playSound('error');
            
            setTimeout(() => {
                input.classList.remove('error');
            }, 500);
        }
    },
    
    // =========================================
    // OUVERTURE DU COFFRE
    // =========================================
    openChest() {
        this.goToSection('coffre-section');
        
        const coffre = document.getElementById('coffre');
        const message = document.getElementById('coffre-message');
        
        // Animation d'ouverture après 500ms
        setTimeout(() => {
            coffre.classList.add('opening');
            this.playSound('chest');
            
            // Lancer les confettis
            setTimeout(() => {
                this.launchConfetti();
            }, 500);
            
            // Afficher le message
            setTimeout(() => {
                message.classList.remove('hidden');
                setTimeout(() => {
                    message.classList.add('show');
                }, 50);
            }, 1000);
            
            // Passer aux cartes
            setTimeout(() => {
                this.showCards();
            }, 4000);
        }, 500);
    },
    
    // =========================================
    // CONFETTIS
    // =========================================
    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const confetti = [];
        const colors = ['#ff6b9d', '#c44569', '#f8b500', '#ffd93d', '#ff6348'];
        
        // Créer les confettis
        for (let i = 0; i < 150; i++) {
            confetti.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height - canvas.height,
                r: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 3 + 2,
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5
            });
        }
        
        let animationId;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            confetti.forEach((c, index) => {
                ctx.save();
                ctx.translate(c.x, c.y);
                ctx.rotate(c.rotation * Math.PI / 180);
                ctx.fillStyle = c.color;
                ctx.fillRect(-c.r / 2, -c.r / 2, c.r, c.r);
                ctx.restore();
                
                c.x += c.vx;
                c.y += c.vy;
                c.rotation += c.rotationSpeed;
                
                // Retirer les confettis hors écran
                if (c.y > canvas.height) {
                    confetti.splice(index, 1);
                }
            });
            
            if (confetti.length > 0) {
                animationId = requestAnimationFrame(animate);
            } else {
                cancelAnimationFrame(animationId);
            }
        };
        
        animate();
    },
    
    // =========================================
    // RÉVÉLATION DU RESTAURANT
    // =========================================
    showCards() {
        this.goToSection('cartes-section');
        this.revealRestaurant();
    },
    
    revealRestaurant() {
        const grid = document.getElementById('cartes-grid');
        grid.innerHTML = '';
        
        // Créer une seule carte mystère
        const carte = document.createElement('div');
        carte.className = 'carte carte-unique';
        
        carte.innerHTML = `
            <div class="carte-inner">
                <div class="carte-face carte-back">
                    🎁
                </div>
                <div class="carte-face carte-front">
                    <h3>${this.restaurant.name}</h3>
                    <p>📍 ${this.restaurant.address}</p>
                    <p>🕖 ${this.restaurant.time}</p>
                    <a href="${this.restaurant.instagram}" target="_blank" onclick="event.stopPropagation()">📸 Voir l'Instagram</a>
                </div>
            </div>
        `;
        
        grid.appendChild(carte);
        
        // Retourner automatiquement la carte après 1 seconde
        setTimeout(() => {
            carte.classList.add('flipped');
            this.playSound('flip');
            
            // Afficher le bouton de confirmation après l'animation
            setTimeout(() => {
                document.getElementById('btn-confirm-choice').classList.remove('hidden');
            }, 800);
        }, 1000);
    },
    
    confirmChoice() {
        this.goToSection('resultat-section');
        
        const finalDiv = document.getElementById('restaurant-final');
        finalDiv.innerHTML = `
            <h3>🍽️ ${this.restaurant.name} 🍽️</h3>
            <p>📍 ${this.restaurant.address}</p>
            <p style="font-size: 1.2rem; color: var(--color-accent); margin: 1rem 0;">🕖 Réservation à ${this.restaurant.time}</p>
            <a href="${this.restaurant.instagram}" target="_blank">
                📸 Voir l'Instagram
            </a>
        `;
        
        this.playSound('success');
        this.launchConfetti();
    },
    
    // =========================================
    // SONS (Web Audio API)
    // =========================================
    playSound(type) {
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            switch(type) {
                case 'start':
                    oscillator.frequency.value = 523.25; // C5
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.2);
                    break;
                    
                case 'success':
                    oscillator.frequency.value = 659.25; // E5
                    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.3);
                    break;
                    
                case 'error':
                    oscillator.frequency.value = 293.66; // D4
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
                    
                case 'chest':
                    // Séquence de notes pour l'ouverture du coffre
                    [523.25, 659.25, 783.99].forEach((freq, i) => {
                        setTimeout(() => {
                            const osc = audioContext.createOscillator();
                            const gain = audioContext.createGain();
                            osc.connect(gain);
                            gain.connect(audioContext.destination);
                            osc.frequency.value = freq;
                            gain.gain.setValueAtTime(0.2, audioContext.currentTime);
                            osc.start();
                            osc.stop(audioContext.currentTime + 0.3);
                        }, i * 150);
                    });
                    break;
                    
                case 'flip':
                    oscillator.frequency.value = 440; // A4
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.1);
                    break;
                    
                case 'select':
                    oscillator.frequency.value = 587.33; // D5
                    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
                    oscillator.start();
                    oscillator.stop(audioContext.currentTime + 0.15);
                    break;
            }
        } catch (e) {
            console.log('Audio non supporté:', e);
        }
    }
};

// Initialiser l'application au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});

// Empêcher le zoom sur iOS
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});
