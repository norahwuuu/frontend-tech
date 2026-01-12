import { en } from './locales/en'
import { zh } from './locales/zh'

export type Language = 'en' | 'zh'
export type Translations = typeof en

export const translations: Record<Language, Translations> = {
  en,
  zh,
}

export const getTranslation = (lang: Language): Translations => {
  return translations[lang]
}
