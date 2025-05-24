import translationAr from '@src/json/lang/ar.json'
import translationDe from '@src/json/lang/de.json'
import translationEn from '@src/json/lang/en.json'
import translationEs from '@src/json/lang/es.json'
import translationFr from '@src/json/lang/fr.json'
import translationHe from '@src/json/lang/he.json'
import translationIt from '@src/json/lang/it.json'
import translationKo from '@src/json/lang/ko.json'
import translationNl from '@src/json/lang/nl.json'
import translationPt from '@src/json/lang/pt.json'
import translationRu from '@src/json/lang/ru.json'
import translationTr from '@src/json/lang/tr.json'
import translationVi from '@src/json/lang/vi.json'
import translationZh from '@src/json/lang/zh.json'
import i18n from 'i18next'
import detector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: { translation: translationEn },
  es: { translation: translationEs },
  fr: { translation: translationFr },
  ru: { translation: translationRu },
  de: { translation: translationDe },
  it: { translation: translationIt },
  zh: { translation: translationZh },
  ar: { translation: translationAr },
  tr: { translation: translationTr },
  he: { translation: translationHe },
  vi: { translation: translationVi },
  nl: { translation: translationNl },
  ko: { translation: translationKo },
  pt: { translation: translationPt },
}

i18n
  .use(detector)
  .use(initReactI18next)
  .init({
    resources,
    // lng: localStorage.getItem("I18N_LANGUAGE") || "en",
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
