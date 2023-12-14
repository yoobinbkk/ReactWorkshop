import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '/@assets/scss/datepicker.scss'

const InputYearPicker = (props) => {
  const { date, disabled, readOnly, callbackFunction } = props
  const [ selectedDate, setSelectedDate ] = useState(date || new Date())
  const fnDateChange = (date) => {
		setSelectedDate(date)

		if (callbackFunction) {
			callbackFunction(date)
		}
	}

  return (
    <div>
      <DatePicker
        dateFormat='yyyy'
        shouldCloseOnSelect
        showYearPicker
        isClearable
        selected={selectedDate}
        disabled={disabled}
        readOnly={readOnly}
        onChange={fnDateChange}
      />
    </div>
  )
}

export default InputYearPicker