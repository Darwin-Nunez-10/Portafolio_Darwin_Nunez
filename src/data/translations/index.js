import es from './es';
import en from './en';

const langs = [en, es];

export const LANGS = Object.fromEntries(langs.map((l) => [l.code, l]));
export const AVAILABLE = langs.map(({ code, native }) => ({ code, native }));
export const DICTS = Object.fromEntries(langs.map((l) => [l.code, l.dict]));
export const DEFAULT_LANG = 'en';
export const FALLBACK_LANG = 'en';
