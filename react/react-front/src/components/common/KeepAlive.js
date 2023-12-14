import { useUpdate } from "ahooks"
import React, { useEffect, useRef } from "react"
import { useLocation, useOutlet } from "react-router-dom"
import { useRecoilState } from 'recoil'
import { menuTabClose } from '/@store/atom'

function KeepAlive(props) {
	const { menuTabList, isMenuTabClose } = props
	const componentList = useRef(new Map())
	const outLet = useOutlet()
	const { pathname } = useLocation()
	const forceUpdate = useUpdate()
	const [ isTabClose, setIsTabClose ] = useRecoilState(menuTabClose)

	useEffect(() => {
		if (!componentList.current.has(pathname)) {
			componentList.current.set(pathname, outLet)
		}

		setIsTabClose(isMenuTabClose)

		forceUpdate()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname])

	useEffect(() => {
		if (isMenuTabClose) {
			const mapKeys = Array.from(componentList.current.keys())
			const excludeKeys = []
	
			const tabKeys = menuTabList.map(tab => tab.urlPath)
			mapKeys.forEach(key => {
				if (!tabKeys.includes(key)) {
					excludeKeys.push(key)
				}
			})
	
			if (excludeKeys.length > 0) {
				excludeKeys.forEach(key => {
					componentList.current.delete(key)
				})
			}

			setIsTabClose(false)
		}

		forceUpdate()
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isTabClose])

	return <>
	{
		Array.from(componentList.current).map(([key, component]) =>
			<div className="contents-core" id={"menu_" + key} key={key} style={{display: pathname === key ? 'block': 'none'}}>
				{component}
			</div>
		)
	}
	</>
}

export default KeepAlive;