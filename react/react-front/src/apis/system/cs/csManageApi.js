import customAxios from '/@utils/customAxios'
import useModal from '/@hooks/common/useModal'

const useCsManageApi = () => {
	
  const { fnAlertOpen } = useModal()

	const selectCsManageList = (params) => {
		return customAxios({
			method: 'get',
			url: '/api/system/cs/selectCsManageList',
			isLoading: true,
			params: params,
		})
		.then((res) => {
			const result = res.data
			if (result.code === 'RS001') {
				return result.data
			} else {
				fnAlertOpen({
					message: '작업증 오류가 발생했습니다.'
				})
				return null
			}
		})
	}

	return {
		selectCsManageList,
	}
}

export default useCsManageApi