import React from 'react'

const Error500 = () => {
	return (
		<div className="error-page">
			<div className="error-page__inner">
				<div className="error-text">
					<div className="error-text__code">500</div>
					<div className="error-text__text">페이지가 작동하지 않습니다.</div>
					<div className="error-text__detail">
						현재 요청을 처리할 수 없습니다.<br />
						시스템 관리자에게 문의하시기 바랍니다.
					</div>
				</div>
			</div>
		</div>
	)
}

export default Error500