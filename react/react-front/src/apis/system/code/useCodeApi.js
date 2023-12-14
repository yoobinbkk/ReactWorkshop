import customAxios from '/@utils/customAxios'
import useModal from '/@hooks/common/useModal'

const useCodeApi = () => {
	const { fnAlertOpen } = useModal()

	// 코드 마스터 리스트 검색
	const selectCodeMstList = (params) => {
    return customAxios({
      method: 'get',
      url: '/api/system/code/selectCodeMstList',
      isLoading: true,
      params: {...params, arrMstCd: [], arrLangObj: []},
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

	// 코드 마스터 리스트 업데이트
  const updateCodeMstState = (params) => {
    return customAxios({
      method: 'put',
      url: '/api/system/code/updateCodeMstState',
      isLoading: true,
      data: params,
    })
    .then((res) => {
      const result = res.data
      if(result.code === 'RS001')
        fnAlertOpen({message: params.delYn === 'Y'? '선택하신 ' + params.arrMstCd.length + '개 항목이 정상 삭제되었습니다.' : '정상적으로 변경 처리 되었습니다.'})
      else
        fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
    })
  }

	// 코드 마스터 상세
	const selectCodeMst = async (params) => {
    return customAxios({
			method: 'get',
			url: '/api/system/code/selectCodeMst',
			isLoading: true,
			params: params,
		})
		.then (async(res) => {
			const result = res.data
			if(result.code === 'RS001')
				return result.data
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
		})
  }

	// 코드 마스터 저장/업데이트
	const updateCodeMst = async (params) => {
		return customAxios({
			method: 'put',
			url: '/api/system/code/updateCodeMst',
			isLoading: true,
			data: params,
		})
		.then((res) => {
			const result = res.data
			if(result.code === 'RS001')
				fnAlertOpen({message: '정상적으로 저장 처리 되었습니다.'})
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
		})
	}

	// 언어 리스트 초기화 
  const selectLangMstList = (params) => {
    return customAxios({
      method: 'get',
      url: '/api/system/code/selectLangMstList',
      isLoading: true,
      params: {},
    })
    .then((res) => {
			const result = res.data
			if(result.code === 'RS001')
				return result.data
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
    })
  }

	// 서브 코드 저장
	const updateCodeSub = (params) => {
		return customAxios({
			method: 'put',
			url: '/api/system/code/updateCodeSub',
			isLoading: true,
			data: params,
		})
		.then((res) => {
			const result = res.data
			if(result.code === 'RS001')
				fnAlertOpen({message: '정상적으로 저장 처리 되었습니다.'})
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
		})
	}

	// 서브 코드 상세
	const selectCodeSub = (params) => {
		return customAxios({
			method: 'get',
			url: '/api/system/code/selectCodeSub',
			isLoading: true,
			params: params,
		})
		.then((res) => {
			const result = res.data
			if(result.code === 'RS001')
				return result.data;
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
		})
	}

	// 서브 코드 리스트 상태변경(삭제)
	const updateCodeSubState = (params) => {
		return customAxios({
			method: 'put',
			url: '/api/system/code/updateCodeSubState',
			isLoading: true,
			data: params,
		})
		.then((res) => {
			const result = res.data
			if(result.code === 'RS001')
				fnAlertOpen({message: '선택하신 항목이 정상 삭제되었습니다.'})
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
		})
	}

	// 서브 코드 리스트
	const selectCodeSubList = (params) => {
		return customAxios({
      method: 'get',
      url: '/api/system/code/selectCodeSubList',
      isLoading: true,
      params: {...params, arrLangObj: []},
    })
    .then((res) => {
      const result = res.data
			if(result.code === 'RS001')
				return result.data;
			else
				fnAlertOpen({message: '작업중 오류가 발생했습니다.'})
    })
	}

	return {
		selectCodeMstList,
		updateCodeMstState,
		selectCodeMst,
		updateCodeMst,
		selectLangMstList,
		updateCodeSub,
		selectCodeSub,
		updateCodeSubState,
		selectCodeSubList,
	}
}

export default useCodeApi