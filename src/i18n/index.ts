import type { LocaleCode } from './types';
import { en } from './locales/en';

// Only English is implemented at this stage. Other locale slots are reserved
// for future translations and intentionally not exposed as functional.
export const defaultLocale: LocaleCode = 'en';

export const availableLocales: LocaleCode[] = ['en', 'uk', 'fr', 'de', 'es'];

export const localeLabels: Record<LocaleCode, string> = {
  en: 'English',
  uk: 'Українська',
  fr: 'Français',
  de: 'Deutsch',
  es: 'Español',
};

export function getLocaleContent(locale: LocaleCode = defaultLocale) {
  // Future translations will be loaded here. Until then, English is the only
  // implemented language and is always returned.
  void locale;
  return en;
}

export { en };
