import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '/@assets/scss/datepicker.scss'

const InputMonthPicker = (props) => {
  const { date, disabled, readOnly, callbackFunction } = props
  const [ selectedDate, setSelectedDate ] = useState(date || new Date())
  const fnDateChange = (date) => {
		setSelectedDate(date)

		if (callbackFunction) {
			callbackFunction(date)
		}
	}

  return (
    <DatePicker
      dateFormat='yyyy.MM'
      shouldCloseOnSelect
      showMonthYearPicker
      isClearable
      selected={selectedDate}
      disabled={disabled}
			readOnly={readOnly}
			onChange={fnDateChange}
    />
  )
}

export default InputMonthPicker