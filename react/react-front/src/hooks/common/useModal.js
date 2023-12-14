
import { useCallback, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { popupState, alertState, confirmState } from '/@store/atom'

const useModal = () => {
	const [ popupDataState, setPopupDataState ] = useRecoilState(popupState)
	const [ alertDataState, setAlertDataState ] = useRecoilState(alertState)
	const [ confirmDataState, setConfirmDataState ] = useRecoilState(confirmState)
	const awaitingPromiseRef = useRef(null);
	const fnModalOpenScrollEvent = () => {
		const scrollTop = window.scrollY || window.document.documentElement.scrollTop
		sessionStorage.setItem('scrollTop', scrollTop)
		window.document.querySelector('html').style.overflow = 'hidden'
	}

	const fnModalCloseScrollEvent = () => {
		window.document.querySelector('html').style.overflow = 'auto'
		setTimeout(() => {
			window.document.documentElement.scrollTo(0, sessionStorage.getItem('scrollTop'))
			sessionStorage.removeItem('scollTop')
		}, 100)
	}
	
	const fnPopupOpen = useCallback((modalObject) => {
		fnModalOpenScrollEvent()
		setPopupDataState({
			...modalObject,
			isOpen: true,
		})
	}, [setPopupDataState])

	const fnPopupClose = useCallback(() => {
		setPopupDataState((prev) => {
			return { ...prev, isOpen: false }
		})
		fnModalCloseScrollEvent()
	}, [setPopupDataState])

	const fnAlertOpen = (modalObject) => {
		return new Promise((resolve) => {
			fnModalOpenScrollEvent()
			setAlertDataState({
				...modalObject,
				okFunc: () => {
					fnAlertClose()
				},
				isOpen: true,
			})
			awaitingPromiseRef.current = { resolve }
		})
	}

	const fnAlertClose = useCallback(() => {
		if (awaitingPromiseRef.current) {
			awaitingPromiseRef.current.resolve(true)
		}
		awaitingPromiseRef.current = null
		setAlertDataState((prev) => {
			return {
				...prev,
				isOpen: false
			}
		})
		fnModalCloseScrollEvent()

	}, [setAlertDataState])

	const fnConfirmOpen = (modalObject) => {
		return new Promise((resolve) => {
			fnModalOpenScrollEvent()
			awaitingPromiseRef.current = { resolve }

			setConfirmDataState({
				...modalObject,
				isOpen: true,
				confirmFunc: () => {
					fnConfirmClose(true)
				},
				cancelFunc: () => {
					fnConfirmClose(false)
				}
			})
		})
	}

	const fnConfirmClose = useCallback((flag) => {
		if (awaitingPromiseRef.current) {
			awaitingPromiseRef.current.resolve(flag)
		}

		setConfirmDataState((prev) => {
			return {
				...prev,
				isOpen: false
			}
		})
	}, [setConfirmDataState])

	return {
		popupDataState,
		alertDataState,
		confirmDataState,
		fnPopupOpen,
		fnPopupClose,
		fnAlertOpen,
		fnAlertClose,
		fnConfirmOpen,
		fnConfirmClose,
	}
}

export default useModal