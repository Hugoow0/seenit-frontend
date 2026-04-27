# Documentation des Tests

Ce document explique les différentes stratégies de test mises en place sur le projet de frontend.

Pour ne pas alourdir la configuration, le projet se concentre sur **3 niveaux essentiels**.

## 1. Tests Unitaires (Logique & Utilitaires)

**Objectif :** S'assurer que les fonctions isolées se comportent comme prévu.
**Outils :** Vitest
**Exemple de fichier :** `tests/unit/utils.test.ts`

**Pourquoi ?** Sécuriser la logique pure sans avoir besoin de charger un DOM (ex: fonctions de formatage, utilitaires de style, calculs).

## 2. Tests de Composants (UI)

**Objectif :** Tester le rendu et l'interactivité d'un composant isolé.
**Outils :** Vitest + React Testing Library + jsdom
**Exemple de fichier :** `tests/components/button.test.tsx`

**Pourquoi ?** Permet de documenter implicitement l'usage de composants réutilisables (Design System) et empêcher les régressions visuelles / interactives.

## 3. Tests de Hooks React (Logique d'état)

**Objectif :** Tester la logique métier encapsulée dans les Hooks paramétrés (cycles de vie, états).
**Outils :** Vitest + React Testing Library (`renderHook`, `act`)
**Exemple de fichier :** `tests/hooks/use-media-query.test.ts`

**Pourquoi ?** Valider précisément les comportements liés à React (effets de bord, asynchronisme, responsivité) sans avoir besoin de monter un composant UI complexe.

---

## - Comment tester

Maintenant que les librairies sont installées, vous pouvez lancer vos tests de cette manière.

### Installation de l'environnement Unitaire / Composant (Vitest)

```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/dom --legacy-peer-deps
```

**IMPORTANT :** Pensez à ajouter ce script de lancement dans votre fichier `package.json` :

```json
"scripts": {
  "test": "vitest run",
  "test:watch": "vitest"
}
```
