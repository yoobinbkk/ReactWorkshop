import React from 'react'
import useModal from '/@hooks/common/useModal'
import Error404 from '/@pages/error/Error404'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import InputDatePicker from '/@components/common/InputDatePicker'
import InputMonthPicker from '/@components/common/InputMonthPicker'
import InputYearPicker from '/@components/common/InputYearPicker'
import InputDateRangePicker from '/@components/common/InputDateRangePicker'
import CodePageSample from './sample/code/CodePageSample'

const Main = () => {
	const { fnPopupOpen, fnAlertOpen, fnConfirmOpen } = useModal()
	const { t } = useTranslation(['common'])
	const navigate = useNavigate()
	const fnTestPopupOpen = () => {
		fnPopupOpen({
			title: 'test',
			content: <Error404 />,
			popupWidth: '600px'
		})
	}

	const fnTestAlertOpen = () => {
		fnAlertOpen({
			message: 'alert 테스트',
		})
	}

	const fnTestConfirmOpen = async () => {
		if (await fnConfirmOpen({ message: 'confirm 테스트'})) {
			console.log('test')
		}
	}

	const fnDateChange = (date) => {
		console.log(date)
	}

	const fnGoPage1 = () => {
		navigate('/sample/code/codePageSample')
	}

	const fnGoPage2 = () => {
		navigate('/sample/code/codePageSample2')
	}
	
	const fnGoPage3 = () => {
		navigate('/sample/registerPageSample')
	}

	return (
		<>
			<h1 style={{color: '#f76060'}}>샘플 스타일 참고하여 html 수정해 주세요. </h1>
			<div>
				다국어 테스트 : {t('common.label.search')} <br/><br/>
				<button type="button" className="ui-button ui-button__bg--blue" onClick={() => fnTestPopupOpen()}>모달 팝업</button>
				<button type="button" className="ui-button ui-button__bg--blue ml-3" onClick={() =>fnTestAlertOpen()}>ALERT</button>
				<button type="button" className="ui-button ui-button__bg--blue ml-3" onClick={() =>fnTestConfirmOpen()}>CONFIRM</button>
				<button type="button" className="ui-button ui-button__border--blue ml-3" onClick={() =>fnGoPage1()}>코드관리 샘플</button>
				<button type="button" className="ui-button ui-button__border--blue ml-3" onClick={() =>fnGoPage2()}>FAQ 샘플</button>
				<button type="button" className="ui-button ui-button__border--blue ml-3" onClick={() =>fnGoPage3()}>등록 샘플</button>
			</div>

			<div className="mt-10">
				<h2>버튼 스타일</h2>
				<button type="button" className="ui-button ui-button__bg--skyblue">버튼</button>
				<button type="button" className="ui-button ui-button__bg--blue">버튼</button>
				<button type="button" className="ui-button ui-button__border--blue">버튼</button> 
				<button type="button" className="ui-button ui-button__border__bg--blue">버튼</button> 
				<button type="button" className="ui-button ui-button__border--gray">버튼</button> 
			</div>

			<div className="mt-10">
				<CodePageSample />
			</div>

			<div className="mt-10 d-flex">
				<InputDatePicker 
					callbackFunction={fnDateChange}
					date={new Date('2023.11.08')}
				/>

				<InputMonthPicker
					date={new Date('2023.10')}
				/>

				<InputYearPicker
				/>

				<InputDateRangePicker

				/>
			</div>
		</>
	)
}

export default Main