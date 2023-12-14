import customAxios from '/@utils/customAxios'
import useModal from '/@hooks/common/useModal'
const useSampleApi = () => {
	const { fnAlertOpen } = useModal()
	const getIngreInfoList = (params) => {
		return customAxios({
			method: 'get',
			url: '/api/sample/getIngreInfoList',
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
		getIngreInfoList,
	}
}

export default useSampleApi