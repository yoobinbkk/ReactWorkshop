import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import { useQueryCustom } from '/@hooks/common/useQueryCustom'
import useCommonApi from '/@apis/common/useCommonApi'

import '/@assets/scss/App.scss'
import Error404 from './pages/error/Error404'
import SignIn from './pages/SignIn'
import Main from './pages/Main'

import { ModalPortal } from '/@components/common/modal/ModalPortal'
import ModalPopup from '/@components/common/modal/ModalPopup'
import ModalAlert from '/@components/common/modal/ModalAlert'
import ModalConfirm from '/@components/common/modal/ModalConfirm'
import LayoutBlank from '/@components/layout/LayoutBlank'
import LayoutMain from '/@components/layout/LayoutMain'
import LayoutSystem from '/@components/layout/LayoutSystem'

function App() {
	const { selectPageList } = useCommonApi()
	const { data: pageList } = useQueryCustom({
		queryKey: 'selectPageList',
		queryFn: selectPageList,
	})

	let routerInfoList = []

	if (pageList) {
		routerInfoList.push({
			path: '/',
			layoutNm: 'LayoutBlank',
			element: <SignIn/>,
		})

		routerInfoList.push({
			path: '/signIn',
			layoutNm: 'LayoutBlank',
			element: <SignIn/>,
		})

		routerInfoList.push({
			path: '/main',
			layoutNm: 'LayoutMain',
			element: <Main/>,
		})
		pageList.forEach(page => {
			routerInfoList.push({
				path: page.urlPath,
				layoutNm: page.sysYn === 'Y' ? 'LayoutSystem' : 'LayoutMain',
				lazy: async () => {
					const Component = await import('./pages' + page.pagePath)
					return {
						Component: Component.default
					}
				}
			})
		})
	}

	const router = createBrowserRouter(
		[
			{
				element: <LayoutBlank />,
				children: routerInfoList.filter(item => item.layoutNm === 'LayoutBlank'),
				errorElement: <Error404 />
			},
			{
				element: <LayoutMain />,
				children: routerInfoList.filter(item => item.layoutNm === 'LayoutMain'),
				errorElement: <Error404 />
			},
			{
				element: <LayoutSystem />,
				children: routerInfoList.filter(item => item.layoutNm === 'LayoutSystem'),
				errorElement: <Error404 />
			}
		]
	)

	return (
		<>
		{routerInfoList && routerInfoList.length > 0 &&
				<>
				<RouterProvider router={router}>
				<div className="App">
				</div>
				</RouterProvider>
				<ModalPortal>
					<ModalPopup />
					<ModalAlert />
					<ModalConfirm />
				</ModalPortal>
				</>
		}
		</>
	)
}

export default App
