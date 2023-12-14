import { useSetRecoilState } from 'recoil'
// import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import customAxios from '/@utils/customAxios'
import useModal from '/@hooks/common/useModal'

import { myInfo } from '/@store/atom'

const useSignApi = () => {
	const setMyInfo = useSetRecoilState(myInfo)
	const { fnAlertOpen } = useModal()
	const { t } = useTranslation(['common'])

	const signIn = (payload) => {
		return customAxios({
			method: 'post',
			url: '/api/sign/signIn',
			isLoading: true,
			data: payload,
		})
		.then((res) => {
			const result = res.data
			if (result.code === 'RS001') {
				setMyInfo(result.data)
				sessionStorage.setItem('accessToken', result.data.userToken)
				document.location.href= '/main'
			} else {
				fnAlertOpen({
					message: result.message
				})
			}

			return result.code
		})
	}

  const signOut = (payload) => {
    return customAxios({
      method: 'post',
      url: '/api/sign/signOut',
      isLoading: true,
      data: payload,
    })
    .then((res) => {

      setMyInfo({})

      sessionStorage.removeItem('accessToken')
			document.location.href= '/signIn'
    })
  }

	const tokenCheck = () => {
    return customAxios({
      method: 'get',
			headers: {
				'x-session-token': 'Bearer ' + sessionStorage.getItem('accessToken')
			},
      url: '/api/sign/tokenCheck',
      isLoading: true,
    })
    .then((res) => {

			const result = res.data

			if (result.code === 'RS001') {
				
				setMyInfo(result.data)
				sessionStorage.setItem('accessToken', result.data.userToken)
			}
			else {
				document.location.href= '/signIn'
			}
			return null
    })
	}

	return { signIn, signOut, tokenCheck }
}

export default useSignApi


