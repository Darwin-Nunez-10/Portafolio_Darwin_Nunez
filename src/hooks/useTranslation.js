import { useCallback, useSyncExternalStore } from 'react';
import { DICTS, FALLBACK_LANG, DEFAULT_LANG } from '../data/translations';

// Bumped from "lang" so a previously stored "es" (from the old default)
// no longer overrides the new English default on first load.
const STORAGE_KEY = 'lang_v2';

function resolveLang() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && DICTS[saved]) return saved;
  // English is the primary language: default to it on first visit.
  return DEFAULT_LANG;
}

let currentLang = resolveLang();
const listeners = new Set();

function subscribe(cb) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

function getSnapshot() {
  return currentLang;
}

function lookup(key) {
  const keys = key.split('.');
  let value = keys.reduce((obj, k) => obj?.[k], DICTS[currentLang]);
  if (value === undefined || value === null) {
    value = keys.reduce((obj, k) => obj?.[k], DICTS[FALLBACK_LANG]);
  }
  return value ?? key;
}

export function t(key, params) {
  let value = lookup(key);
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      value = value.replaceAll(`{{${k}}}`, String(v));
    }
  }
  return value;
}

export function useTranslation() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const changeLang = useCallback((newLang) => {
    if (!DICTS[newLang] || newLang === currentLang) return;
    localStorage.setItem(STORAGE_KEY, newLang);
    currentLang = newLang;
    listeners.forEach((fn) => fn());
  }, []);

  return { t, lang, changeLang };
}
