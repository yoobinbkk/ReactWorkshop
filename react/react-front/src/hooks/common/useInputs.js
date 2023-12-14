import { useState, useCallback } from 'react'

const useInputs = (registerParams) => {
	const [params, setParams] = useState(registerParams)
	const fnInputChange = useCallback(e => {
		const { name, value } = e.target
		setParams(param => ({ ...param, [name]: value }))
	}, [])
	
	const fnInputReset = useCallback(() => setParams(registerParams), [registerParams])
	return { params, fnInputChange, fnInputReset, setParams }
}

export default useInputs