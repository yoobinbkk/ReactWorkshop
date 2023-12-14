/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useCallback } from 'react'
import { useLocation, useNavigate, Outlet } from 'react-router-dom'
import { useQueryCustom } from '/@hooks/common/useQueryCustom'
import useMenuTab from '/@hooks/common/useMenuTab'
import useModal from '/@hooks/common/useModal'
import useCommonApi from '/@apis/common/useCommonApi'
import useSignApi from '/@apis/common/useSignApi'

import KeepAlive from '/@components/common/KeepAlive'
import Header from '/@components/layout/Header'
import LeftMenu from '/@components/layout/LeftMenu'

import { useRecoilState } from 'recoil'
import { menuTabClose } from '/@store/atom'
import Breadcrumb from '/@components/common/Breadcrumb'
import MenuTabList from '/@components/common/MenuTabList'

const LayoutCommon = (props) => {
	const { sysYn } = props
	const location = useLocation()
	const navigate = useNavigate()
	const { selectMenuList } = useCommonApi()
	const { data: menuList } = useQueryCustom({
		queryKey: 'selectMenuList',
		queryFn: selectMenuList,
	})

	const [ openMenuCd, setOpenMenuCd ] = useState('')
	const [ isTabLoad, setIsTabLoad ] = useState(false)
	const [ openSubMenuCd, setOpenSubMenuCd ] = useState('')
	const [ openMenuInfo, setOpenMenuInfo ] = useState(null)
	const { fnAddMenuTabState, fnDelMenuTabState, fnGetMenuTabState, fnResetMenuTabState } = useMenuTab()
	const [ menuTabList, setMenuTabList ] = useState(null)
	const [ isMenuTabClose, setIsMenuTabClose ] = useRecoilState(menuTabClose)
	const { fnAlertOpen } = useModal()

	const fnMenuOpen = useCallback((menu) => {
		openMenuCd !== menu.menuCd ? setOpenMenuCd(menu.menuCd) : setOpenMenuCd('')
	}, [openMenuCd, setOpenMenuCd])

	const fnGoPage = (menu) => {
		navigate(menu.urlPath)
	}

	const fnGoSystemPage = () => {
		const defaultUrl = '/system/faq/faqCategoryList'

		let defaultMenu = null
		// eslint-disable-next-line array-callback-return
		menuList.some(menu => {
			const subMenuList = menu.subMenuList.filter(subMenu => subMenu.urlPath === defaultUrl && subMenu.defaultPageYn === 'Y')

			if (subMenuList && subMenuList.length > 0) {
				defaultMenu = subMenuList
				return true
			}
		})
		
		if (defaultMenu && defaultMenu.length > 0) {
			fnAddMenuTabState(defaultMenu[0])
			setMenuTabList(fnGetMenuTabState())
			navigate(defaultUrl)
		}
	}

	const fnGoMain = () => {
		setMenuTabList(null)
		fnResetMenuTabState()
		navigate('/main')
	}

	const fnMenuTabClose = (menuIdx, activeFlag) => {
		const newMenuList = fnDelMenuTabState(menuIdx)
		setMenuTabList(fnDelMenuTabState(menuIdx))

		let moveUrl = null
		if ((newMenuList.length > 1 && activeFlag === 'ACTIVE') || newMenuList.length === 1) {
			moveUrl = newMenuList[0].urlPath
		} else if (newMenuList.length === 0) {
			moveUrl = '/main'
			setOpenSubMenuCd('')
			setOpenMenuInfo(null)
		}

		setIsMenuTabClose(true)

		if (moveUrl) {
			navigate(moveUrl)
		}
	}

	const { tokenCheck } = useSignApi()
	const { refetch } = useQueryCustom({
		queryKey: 'tokenCheck',
		queryFn: tokenCheck,
	})

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => {
		if (menuList) {
			const prevMenuTabList = fnGetMenuTabState()

			if (prevMenuTabList && prevMenuTabList.length > 8) {
				fnAlertOpen({
					message: '메뉴는 최대 8개만 오픈 가능합니다.'
				})
				return
			}
			const defaultOpen1Depth = menuList.filter(menu => location.pathname.indexOf(menu.apiUrl) > -1)
			if (defaultOpen1Depth && defaultOpen1Depth.length > 0) {
				setOpenMenuCd(defaultOpen1Depth[0].menuCd)

				const menuInfo = defaultOpen1Depth[0].subMenuList && defaultOpen1Depth[0].subMenuList.length > 0
											? defaultOpen1Depth[0].subMenuList.filter(menu => location.pathname === menu.urlPath)
											: undefined

				if (menuInfo) {
					fnAddMenuTabState({ ...menuInfo[0], urlPath: location.pathname})
					setOpenSubMenuCd(menuInfo[0].menuCd)
					setOpenMenuInfo(menuInfo[0])
				}
			}

			setMenuTabList(fnGetMenuTabState())
			setIsTabLoad(true)
		}

		refetch()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [menuList, location.pathname])

	return (
		<div className="wrap">
			<Header fnGoMain={fnGoMain} fnGoSystemPage={fnGoSystemPage}/>
			<div className="ui-layout">
				<div className="ui-layout__inner">
					{
						menuList && menuList.length > 0 &&
						<LeftMenu
							openMenuCd={openMenuCd}
							openSubMenuCd={openSubMenuCd}
							menuList={menuList}
							fnMenuOpen={fnMenuOpen}
							sysYn={sysYn}
						/>
					}
					<div className="contents">
						<div className="contents__inner">
							{
								menuTabList && menuTabList.length > 0 &&
								isTabLoad &&
								<MenuTabList
									pathname={location.pathname}
									menuTabList={menuTabList}
									openSubMenuCd={openSubMenuCd}
									fnGoPage={fnGoPage}
									fnMenuTabClose={fnMenuTabClose}
									sysYn={sysYn}
								/>
							}
							
								<div className="contents-core">
									<div className="contents-cell__wrap">
										<div className="contents-cell">
											<div className="contents-box contents-box__full">
												<div className="contents-box__inner">
												{
													openMenuInfo &&
													<Breadcrumb openMenuInfo={openMenuInfo}/>
												}
												{
													openSubMenuCd !== ''
													? (
													<KeepAlive menuTabList={menuTabList} isMenuTabClose={isMenuTabClose}>
														<Outlet />
													</KeepAlive>
													)
													:
													<Outlet />
												}
												
												</div>
											</div>
										</div>
									</div>
								</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default React.memo(LayoutCommon)