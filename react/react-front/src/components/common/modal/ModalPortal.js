import ReactDOM from 'react-dom'

export const ModalPortal = ({ children }) => {
	const modalElement = document.getElementById('modal-root')
	return ReactDOM.createPortal(children, modalElement)
}