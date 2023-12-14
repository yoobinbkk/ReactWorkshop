import customAxios from '/@utils/customAxios'
import useModal from '/@hooks/common/useModal'
import { useTranslation } from 'react-i18next'

const useCommonApi = () => {
	const { t } = useTranslation(['common'])

	const selectPageList = () => {
		return customAxios({
			method: 'get',
			url: '/api/common/selectPageList',
			isLoading: true,
		})
		.then((res) => {
			const result = res.data

			if (result.code === 'RS001') {
				return result.data
			} else {
				alert(t('common.message.api_error_msg'))
				return null
			}
		})
	}

	const selectMenuList = () => {
		return customAxios({
			method: 'get',
			url: '/api/common/selectMenuList',
		})
		.then((res) => {
			const result = res.data

			if (result.code === 'RS001') {
				return result.data
			} else {
				alert(t('common.message.api_error_msg'))
				return null
			}
		})
	}

	return {
		selectPageList,
		selectMenuList,
	}
}

export default useCommonApi