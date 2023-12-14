import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonEn from '/@languages/en/common.en.json'
import commonKo from '/@languages/ko/common.ko.json'

const resource = {
  EN: {
    common: commonEn,
  },
  KO: {
    common: commonKo,
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources: resource,
    lng: localStorage.getItem('langCd') || 'KO',
    fallbackLng: localStorage.getItem('langCd') || 'KO',
    debug: false,
    keySeparator: '.',
    interPolation: {
      escapeValue: false, // xss 취약점을 막아주는 옵션으로 기본 true이나, 번역을 통해 html 태그가 들어갈 수 있음
    }
  })

export default i18n