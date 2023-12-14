import React from 'react'
import useModal from '/@hooks/common/useModal'

const ModalPopup = () => {
	const { popupDataState, fnPopupClose } = useModal()
	const { isOpen, title, content, popupWidth } = popupDataState

	return (
		<>
			{ isOpen && (
				<>
					<div className="modal-backdrop fade in"></div>
					<div className="modal fade in">
						<div className="modal-dialog modal-popup">
							<div className="modal-content" style={{ 'width': popupWidth }}>
								<div className="modal-header">
									<div className="modal-title">{ title }</div>
									<button type="button" className="modal-close" onClick={fnPopupClose}></button>
								</div>
								<div className="modal-body">
									{ content }
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default ModalPopup