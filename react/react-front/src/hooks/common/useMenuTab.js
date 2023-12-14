import { useRecoilState, useRecoilValue } from 'recoil'
import { menuTabList, menuTabListSelector } from '/@store/atom'

const useMenuTab = () => {
	const [ menuTabState, setMenuTabState ] = useRecoilState(menuTabList)
	const menuList = useRecoilValue(menuTabListSelector)

	const fnAddMenuTabState = (menu) => {
		const isOpenMenu = menuTabState.filter(tab => tab.menuCd === menu.menuCd)
		if (!isOpenMenu || isOpenMenu.length === 0) {
			let newMenuList = []
			menuTabState.forEach(tab => {
				newMenuList.push({...tab})
			})
			newMenuList.push({...menu})

			setMenuTabState(newMenuList)
		} else {
			const menuIdx = menuTabState.map(m => m.menuCd).indexOf(menu.menuCd)

			let newMenuList = []
			menuTabState.forEach((tab, idx) => {
				if (menuIdx !== idx) {
					newMenuList.push({...tab})
				} else {
					newMenuList.push({...tab, urlPath: menu.urlPath})
				}
			})

			setMenuTabState(newMenuList)
		}
	}

	const fnDelMenuTabState = (menuIdx) => {
		let newMenuList = []
		menuTabState.forEach((tab, idx) => {
			if (menuIdx !== idx) {
				newMenuList.push({...tab})
			}
		})
		setMenuTabState(newMenuList)
		return newMenuList
	}

	const fnGetMenuTabState = () => {
		return menuList
	}

	const fnResetMenuTabState = () => {
		setMenuTabState([])
	}

	return { menuTabState, fnAddMenuTabState, fnDelMenuTabState, fnGetMenuTabState, fnResetMenuTabState }
}

export default useMenuTab