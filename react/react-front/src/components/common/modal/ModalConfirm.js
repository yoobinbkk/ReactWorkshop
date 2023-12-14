import React from 'react'
import useModal from '/@hooks/common/useModal'

const ModalAlert = () => {
	const { confirmDataState } = useModal()
	const { isOpen, message, confirmBtnText, cancelBtnText, confirmFunc, cancelFunc } = confirmDataState

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
											onClick={confirmFunc}
										>
											{confirmBtnText || '확인'}
										</button>
										<button type="button"
											className="ui-button ui-button__bg--gray ml-3"
											onClick={cancelFunc}
										>
											{cancelBtnText || '취소'}
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