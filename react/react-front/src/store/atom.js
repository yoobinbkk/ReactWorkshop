import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
const { persistAtom } = recoilPersist()

export const myInfo = atom({
	key: 'myInfo',
	default: {},
	effects_UNSTABLE: [persistAtom]
})

export const myInfoSelector = selector({
	key: 'myInfoSelector',
	get: ({ get }) => {
		return get(myInfo)
	}
})

export const menuTabList = atom({
	key: 'menuTabList',
	default: [],
	effects_UNSTABLE: [persistAtom]
})

export const menuTabListSelector = selector({
	key: 'menuTabListSelector',
	get: ({ get }) => {
		return get(menuTabList)
	}
})

export const menuTabClose = atom({
	key: 'menuTabClose',
	default: false
})

export const popupState = atom({
	key: 'popupState',
	default: {
		isOpen: false,
		title: '',
		content: '',
		popupWidth: ''
	}
})

export const alertState = atom({
	key: 'alertState',
	default: {
		isOpen: false,
		message: '',
		okBtnText: ''
	}
})

export const confirmState = atom({
	key: 'confirmState',
	default: {
		isOpen: false,
		message: '',
		confirmBtnText: '',
		cancelBtnText: '',
	}
})