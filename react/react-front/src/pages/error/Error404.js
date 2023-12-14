import React from 'react'

const Error404 = () => {
	return (
		<div className="error-page">
			<div className="error-page__inner">
				<div className="error-text">
					<div className="error-text__code">404</div>
					<div className="error-text__text">페이지를 찾을 수 없습니다.</div>
					<div className="error-text__detail">
						페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. <br />
						입력하신 주소가 정확한지 다시 한 번 확인해 주세요.
					</div>
				</div>
			</div>
		</div>
	)
}

export default Error404