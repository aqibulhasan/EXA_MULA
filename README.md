# Exa Mula — Internal Company Review Platform (Vite Build)

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

---

## Firebase Setup (Free — No Credit Card Needed)

### Step 1: Create a Firebase Project
1. Go to https://console.firebase.google.com
2. Click **"Add project"** → name it `exa-mula` → click through the steps
3. On the project dashboard, click the **Web icon `</>`** to add a web app
4. Register with name `exa-mula` → copy the `firebaseConfig` object shown

### Step 2: Paste Config into firebase.js
Open `src/services/firebase.js` and find the `FIREBASE_CONFIG` block:

```js
const FIREBASE_CONFIG = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_PROJECT.firebaseapp.com',
  projectId: 'YOUR_PROJECT_ID',
  ...
}
```

Replace with your actual config from the Firebase console.

### Step 3: Enable Firestore
1. In Firebase console → **Build → Firestore Database**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (allows all reads/writes for 30 days)
4. Select a region → Done

### Step 4: Set Firestore Rules
Go to **Firestore → Rules** and paste:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // Internal use — open access
    }
  }
}
```

### Step 5: Create Required Indexes
Firestore needs a composite index for comments. Go to:
**Firestore → Indexes → Composite → Add index:**

| Collection | Fields                     | Order |
|------------|----------------------------|-------|
| comments   | storyId ASC, createdAt ASC | —     |

Or just open the app — it will throw an error with a direct link to create the index automatically.

---

## Project Structure

```
exa-mula-vite/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.js                 ← App entry point
    ├── App.vue                 ← Root component + hash-based router
    ├── style.css               ← Global styles & design tokens
    ├── services/
    │   └── firebase.js         ← FUNCTIONAL CORE + IMPERATIVE SHELL
    │                             (pure transformers + Firestore I/O)
    ├── composables/
    │   ├── useStories.js       ← Reactive state: story list / single / submit
    │   └── useComments.js      ← Real-time comment subscription
    ├── components/
    │   ├── AppNav.vue
    │   ├── VibeBadge.vue
    │   ├── StoryDetailModal.vue
    │   └── CommentSection.vue
    └── views/
        ├── HomeView.vue
        └── SubmitView.vue
```

## Available Scripts

| Command           | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start dev server with HMR          |
| `npm run build`   | Production build to `dist/`        |
| `npm run preview` | Preview production build locally   |

## Architecture: Functional Core / Imperative Shell

```
┌─────────────────────────────────────────┐
│           FUNCTIONAL CORE               │
│  toStory(), toComment(), formatDate(),  │
│  validateStory() — pure, no side effects│
└─────────────────┬───────────────────────┘
                  │ used by
┌─────────────────▼───────────────────────┐
│          IMPERATIVE SHELL               │
│  storyAPI, commentAPI — Firestore I/O   │
│  Each fn does one thing, returns Promise│
└─────────────────┬───────────────────────┘
                  │ wrapped by
┌─────────────────▼───────────────────────┐
│            COMPOSABLES                  │
│  useStories, useStory, useSubmit,       │
│  useComments — reactive state + loading │
└─────────────────┬───────────────────────┘
                  │ consumed by
┌─────────────────▼───────────────────────┐
│          VUE COMPONENTS (.vue SFCs)     │
│  Read refs, emit events, render UI only │
└─────────────────────────────────────────┘
```
