# 🎯 Mission Saint-Valentin — Ernest & Grace

Une expérience interactive romantique pour la Saint-Valentin, conçue comme un mini escape game personnalisé.

## 📋 Description

Grace doit résoudre 3 énigmes basées sur votre histoire commune pour débloquer un coffre virtuel contenant une sélection de restaurants présentés sous forme de cartes mystérieuses.

## ✨ Fonctionnalités

- **3 énigmes personnalisées** basées sur vos dates et souvenirs
- **Système de fragments de code** à assembler
- **Animation 3D** d'ouverture du coffre avec effets sonores
- **Confettis animés** pour célébrer les succès
- **Tirage de cartes** avec limite de 3 cartes à retourner
- **Responsive design** optimisé mobile
- **Sauvegarde automatique** de la progression (localStorage)

## 🚀 Installation & Utilisation

### Méthode 1 : Ouverture locale directe
1. Ouvrez simplement `index.html` dans votre navigateur
2. C'est tout ! Aucune installation nécessaire.

### Méthode 2 : Serveur local (optionnel)
```bash
# Avec Python 3
python3 -m http.server 8000

# Avec Node.js
npx serve .

# Puis ouvrir : http://localhost:8000
```

## ⚙️ Personnalisation

### Modifier les réponses des énigmes

Ouvrez `app.js` et modifiez la section `config` :

```javascript
config: {
    enigme1Answer: '14022024', // Date début relation (JJMMYYYY)
    enigme2Answer: 'mini messi', // Surnom (en minuscules)
    enigme3Answer: '01012023', // Date première rencontre (JJMMYYYY)
    finalCode: 'ERNESTGRC', // Code final
    maxCardsToOpen: 3
}
```

### Modifier les restaurants

Dans `app.js`, section `restaurants` :

```javascript
restaurants: [
    {
        name: 'Le Jardin Secret',
        address: '15 Rue des Roses, 75001 Paris',
        site: 'https://votre-restaurant.fr'
    },
    // ... ajoutez autant de restaurants que vous voulez
]
```

### Ajuster les couleurs

Dans `style.css`, modifiez les variables CSS :

```css
:root {
    --color-primary: #ff6b9d;     /* Rose principal */
    --color-secondary: #c44569;   /* Rose foncé */
    --color-accent: #f8b500;      /* Or/Jaune */
    /* ... */
}
```

## 📱 Compatibilité

- ✅ Chrome / Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Samsung Internet

## 🎨 Technologies utilisées

- **HTML5** — Structure
- **CSS3** — Design & Animations
- **JavaScript ES6** — Logique & Interactivité
- **Web Audio API** — Effets sonores
- **Canvas API** — Confettis animés
- **LocalStorage API** — Sauvegarde progression

## 📂 Structure du projet

```
Saint_Valentin/
├── index.html      # Page principale
├── style.css       # Styles & animations
├── app.js          # Logique JavaScript
└── README.md       # Documentation
```

## 🎁 Fonctionnalités détaillées

### Énigmes
- Validation en temps réel
- Feedback visuel et sonore
- Révélation progressive des fragments de code
- Passage automatique à l'étape suivante

### Coffre
- Animation 3D d'ouverture
- Séquence sonore immersive
- Effet de confettis
- Transition fluide

### Cartes restaurants
- Animation flip 3D
- Limite stricte de 3 cartes
- Sélection visuelle claire
- Liens directs vers sites web

### Sauvegarde
- Progression automatiquement sauvegardée
- Possibilité de reprendre où vous vous êtes arrêté
- Réinitialisation possible via DevTools : `localStorage.clear()`

## 💡 Astuces

### Tester rapidement
Pour sauter directement à une section (dans la console du navigateur) :
```javascript
app.goToSection('cartes-section'); // Voir les cartes
app.goToSection('coffre-section'); // Voir le coffre
```

### Réinitialiser la progression
```javascript
localStorage.clear();
location.reload();
```

### Débugger
Tous les événements importants sont loggés dans la console.

## 🐛 Résolution de problèmes

**Les sons ne fonctionnent pas sur iOS ?**
→ Les sons nécessitent une interaction utilisateur (clic). C'est une limitation d'iOS.

**Les animations sont saccadées ?**
→ Vérifiez que vous utilisez un navigateur récent. Désactivez les économies d'énergie.

**La page ne sauvegarde pas ma progression ?**
→ Vérifiez que les cookies/localStorage ne sont pas bloqués dans les paramètres du navigateur.

## 📝 Notes de développement

### Bonnes pratiques utilisées
- Pas de dépendances externes
- Code vanilla pour performances maximales
- Mobile-first design
- Accessibilité basique
- Gestion d'erreurs
- Feedback utilisateur constant

### Améliorations possibles
- [ ] Mode paysage amélioré
- [ ] Plus d'effets sonores (musique de fond)
- [ ] Animations de transition entre sections
- [ ] QR code vers vidéo TikTok
- [ ] Mode nuit/jour
- [ ] Partage sur réseaux sociaux

## 💝 Crédits

Créé avec ❤️ par Ernest pour Grace
Saint-Valentin 2026

---

**Joyeuse Saint-Valentin ! 🌹✨**
