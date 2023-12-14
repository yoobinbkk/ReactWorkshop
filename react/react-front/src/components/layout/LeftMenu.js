/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useMenuTab from '/@hooks/common/useMenuTab'

const LeftMenu = (props) => {
	const { openMenuCd, openSubMenuCd, menuList, fnMenuOpen, sysYn } = props
	const navigate = useNavigate()
	const isMenuOpen = JSON.parse(localStorage.getItem('isMenuOpen')) || true
	const [ menuOpen, setMenuOpen ] = useState(Boolean(isMenuOpen))
	const { fnAddMenuTabState } = useMenuTab()
	
	const fnMenuToggle = (e) => {
		e.preventDefault()
		localStorage.setItem('isMenuOpen', JSON.stringify(!menuOpen))
		setMenuOpen(!menuOpen)
	}

	const fnPageMove = (menu) => {
		fnAddMenuTabState(menu)
		navigate(menu.urlPath)
	}

	return (
		<div className={!menuOpen ? 'left-menu ' : 'left-menu is-open'}>
			<div className="left-menu__inner">
				<button type="button" className="left-menu__button" onClick={fnMenuToggle}>
					<i className="left-menu__button--icon"></i>
				</button>
				<div className="left-menu__box">

					<div className="menu-toggle">
						<div className="menu-toggle__inner">
							<div className="menu-toggle__text">CMS</div>
						</div>
					</div>

					<div className="left-menu__item">
						<ul className="ui-list left-menu__lists left-menu__lists--height-60">
						{ menuList && menuList.length > 0 &&
							menuList.filter(menu => menu.sysYn === sysYn).map((menu) => (
								<li className={"left-menu__list is-filter " + (openMenuCd === menu.menuCd ? "is-filter__open is-active" : "")} key={ menu.menuCd }>
									<a className="left-menu__link" onClick={() => fnMenuOpen(menu)}>
										<i className="left-menu__icon"></i>
										<span className="left-menu__text">{ menu.menuNm }</span>
										<span className="left-menu__tooltip">{ menu.menuNm }</span>
									</a>

									<ul className="ui-list filter-lists">
										{
											menu.subMenuList && menu.subMenuList.length > 0 &&
											menu.subMenuList.filter(subMenu => subMenu.defaultPageYn === 'Y').map((subMenu) => (
												<li className={"filter-list " + (openSubMenuCd === subMenu.menuCd ? "is-active" : "")}
													key={ subMenu.menuCd }
													onClick={() => fnPageMove(subMenu)}
												>
													{ subMenu.menuNm }
												</li>
											))
										}
									</ul>
								</li>
							))
						}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(LeftMenu)