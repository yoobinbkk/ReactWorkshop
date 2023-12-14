import React from 'react'
import useLanguage from '/@hooks/common/useLanguage'

const Language = () => {
	const defaultLangCd = localStorage.getItem('langCd') || 'KO'
	const [langCd, fnLanguageChange ] = useLanguage(defaultLangCd)

	return (
		<div className="ui-select-box">
			<select
				className="ui-select ui-select__width--120"
				value={langCd}
				onChange={fnLanguageChange}
			>
				<option value="KO">Korean</option>
				<option value="EN">English</option>
			</select>
		</div>
	)
}

export default Language