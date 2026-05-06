import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  query,
  orderBy,
  where,
  onSnapshot,
  serverTimestamp,
  increment,
} from 'firebase/firestore'

// ============================================================
// FIREBASE CONFIG
// ⚠️  Replace with your own Firebase project config
// Free plan (Spark) — no credit card needed
// https://console.firebase.google.com → New project → Web app → Get config
// ============================================================
const FIREBASE_CONFIG =  {
  apiKey: "AIzaSyAZfICitS48jjWDKOU0CgeyUwH95HWocL4",
  authDomain: "exa-mula.firebaseapp.com",
  databaseURL: "https://exa-mula-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "exa-mula",
  storageBucket: "exa-mula.firebasestorage.app",
  messagingSenderId: "684830542963",
  appId: "1:684830542963:web:172b64a9f197de0f87ee06"
};

const firebaseApp = initializeApp(FIREBASE_CONFIG)
const db = getFirestore(firebaseApp)

// ============================================================
// FUNCTIONAL CORE — pure transformers (no side effects)
// ============================================================

export const toStory = (snap) => ({
  id: snap.id,
  vibe: snap.data().vibe ?? 'neutral',
  verified: snap.data().verified ?? false,
  title: snap.data().title ?? '',
  body: snap.data().body ?? '',
  upvotes: snap.data().upvotes ?? 0,
  downvotes: snap.data().downvotes ?? 0,
  commentCount: snap.data().commentCount ?? 0,
  createdAt: snap.data().createdAt?.toDate?.() ?? new Date(),
})

export const toComment = (snap) => ({
  id: snap.id,
  storyId: snap.data().storyId ?? '',
  author: snap.data().author || 'Anonymous',
  text: snap.data().text ?? '',
  createdAt: snap.data().createdAt?.toDate?.() ?? new Date(),
})

export const formatDate = (date) =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date instanceof Date ? date : new Date(date))


// ============================================================
// IMPERATIVE SHELL — Firebase I/O
// ============================================================

export const storyAPI = {
  async fetchAll({ vibe = '' } = {}) {
    const q = query(collection(db, 'stories'), orderBy('createdAt', 'desc'))
    const snap = await getDocs(q)
    let stories = snap.docs.map(toStory)
    if (vibe) stories = stories.filter((s) => s.vibe === vibe)
    return stories
  },

  async fetchOne(id) {
    const snap = await getDoc(doc(db, 'stories', id))
    if (!snap.exists()) throw new Error('Story not found')
    return toStory(snap)
  },

  async create({ vibe, title, body }) {
    const ref = await addDoc(collection(db, 'stories'), {
      vibe,
      title: title.trim(),
      body: body.trim(),
      upvotes: 0,
      downvotes: 0,
      commentCount: 0,
      createdAt: serverTimestamp(),
    })
    return ref.id
  },

  async vote(id, dir) {
    const field = dir === 'up' ? 'upvotes' : 'downvotes'
    await updateDoc(doc(db, 'stories', id), {
      [field]: increment(1),
    })
  },
}

export const commentAPI = {
  subscribe(storyId, callback) {
    const q = query(
      collection(db, 'comments'),
      where('storyId', '==', storyId),
      orderBy('createdAt', 'asc'),
    )
    return onSnapshot(q, (snap) => callback(snap.docs.map(toComment)))
  },

  async add(storyId, { author, text }) {
    await addDoc(collection(db, 'comments'), {
      storyId,
      author: (author || 'Anonymous').trim(),
      text: text.trim(),
      createdAt: serverTimestamp(),
    })
    await updateDoc(doc(db, 'stories', storyId), {
      commentCount: increment(1),
    })
  },
}
