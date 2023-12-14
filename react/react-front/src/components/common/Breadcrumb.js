/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'

const Breadcrumb = (props) => {
	const { openMenuInfo } = props
	const { naviPath } = openMenuInfo
	
	const naviPathList = naviPath.split(' > ')

	return (
		<>
			<div className="nav">
				<div className="nav__inner">
					{/* <div className="nav-title">{ openMenuInfo.menuNm }</div> */}
					<ul className="ui-list nav-lists">
						<li className="nav-list nav-list__home">
							<a className="nav-link"></a>
						</li>
						{
							naviPathList && naviPathList.length > 0 &&
								naviPathList.map((nav, index) => (
									<li
										className={"nav-list nav-list__depth" + (index + 2) + (index + 1 === naviPathList.length ? ' is-active' : '')}
										key={"nav-path" + index}
									>
										<a className="nav-link">{ nav }</a>
									</li>
								))
						}
					</ul>
				</div>
			</div>
		</>
	)
}

export default Breadcrumb