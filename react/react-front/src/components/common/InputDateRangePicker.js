import React, { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import '/@assets/scss/datepicker.scss'

const InputDateRangePicker = (props) => {
  const { startDate, endDate, disabled, readOnly, startCallbackFunction, endCallbackFunction } = props
  const [ selectedStartDate, setSelectedStartDate ] = useState(startDate)
  const [ selectedEndDate, setSelectedEndDate ] = useState(endDate)

  const fnStartDateChange = (date) => {
    setSelectedStartDate(date)

    if (startCallbackFunction) {
      startCallbackFunction(date)
    }
  }

  const fnEndDateChange = (date) => {
    setSelectedEndDate(date)

    if (endCallbackFunction) {
      endCallbackFunction(date)
    }
  }

  return (
    <div className="d-flex-align-center">
      <DatePicker
				formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
				dateFormat='yyyy.MM.dd'
        selectsStart
        isClearable
        selected={selectedStartDate}
				startDate={selectedStartDate}
        endDate={selectedEndDate}
				disabled={disabled}
				readOnly={readOnly}
				onChange={fnStartDateChange}
			/>&nbsp;&nbsp;-&nbsp;&nbsp; 
      <DatePicker
				formatWeekDay={(nameOfDay) => nameOfDay.substring(0, 1)}
				dateFormat='yyyy.MM.dd'
        selectsEnd
        isClearable
        selected={selectedEndDate}
        startDate={selectedStartDate}
				endDate={selectedEndDate}
        minDate={selectedStartDate}
				disabled={disabled}
				readOnly={readOnly}
				onChange={fnEndDateChange}
			/>
    </div>
  )
}

export default InputDateRangePicker