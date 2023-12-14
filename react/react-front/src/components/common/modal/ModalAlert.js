import React from 'react'
import useModal from '/@hooks/common/useModal'

const ModalAlert = () => {
	const { alertDataState } = useModal()
	const { isOpen, message, okBtnText, okFunc } = alertDataState
	return (
		<>
			{ isOpen && (
				<>
					<div className="modal-backdrop modal-alert-backdrop fade in"></div>
					<div className="modal modal-alert fade in">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-body">
									<div className="modal-cont-msg">
										<p className="tit">{ message }</p>
									</div>
									<div className="btn-wrap">
										<button type="button"
											className="ui-button ui-button__bg--blue ml-3"
											onClick={okFunc}
										>
											{okBtnText || '확인'}
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	)
}

export default ModalAlert