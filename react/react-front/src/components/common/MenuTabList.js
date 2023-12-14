/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'

const MenuTabList = (props) => {
  const { pathname, menuTabList, openSubMenuCd, fnGoPage, fnMenuTabClose, sysYn } = props
	return (
    <ul className="ui-list menu-tab__list">
			{
				pathname !== '/main' &&
				menuTabList.filter(menu => menu.defaultPageYn === 'Y' && menu.sysYn === sysYn).map((menu, menuIdx) => (
					<li className={"menu-tab__item " + (openSubMenuCd === menu.menuCd ? "is-active" : "")} key={ menu.menuCd }>
						<div className="menu-tab__block">
							<a
								className="menu-tab__link ui-tooltip__parent"
								onClick={() => fnGoPage(menu)}
							>
								<span className="menu-tab__title">{ menu.menuNm }</span>
								<span className="ui-tooltip ui-tooltip__top"><span className="ui-tooltip__inner">{ menu.menuNm }</span></span>
							</a>
							<button type="button"
								className="ui-button menu-tab__delete"
								onClick={() => fnMenuTabClose(menuIdx, (openSubMenuCd === menu.menuCd ? 'ACTIVE' : ''))}
							>
								<span className="for-a11y">삭제</span>
							</button>
						</div>
					</li>
				))
			}
		</ul>
  )
}

export default MenuTabList