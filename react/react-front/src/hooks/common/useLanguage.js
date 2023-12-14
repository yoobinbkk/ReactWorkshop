import { useState, useCallback } from 'react'
import i18n from '/@languages/i18n'

const useLanguage = (defaultLangCd) => {
	const [ langCd, setLangCd ] = useState(defaultLangCd)
	
	const fnLanguageChange = useCallback(e => {
		setLangCd(e.target.value)
		localStorage.setItem('langCd', e.target.value)
		i18n.changeLanguage(e.target.value)
	}, [])

	return [ langCd, fnLanguageChange ]
}

export default useLanguage