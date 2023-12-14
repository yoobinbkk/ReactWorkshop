import customAxios from '/@utils/customAxios'
import { useQuery } from '@tanstack/react-query'

const getCategoryList = (params) => {
  return customAxios({
    method: 'get',
    url: '/api/faqCategory/getFaqCategoryList',
    isLoading: true,
    params: params,
  })
  .then ((res) => {
    const result = res.data.data
    return result
  })
}

export const useCategoryListQuery = (payload) => {
  const {
    isLoading,
    isError,
    data,
    isSuccess,
    refetch
  } = useQuery({
    queryKey: ['getFaqCategoryList'],
    queryFn: async () => {
      return await getCategoryList(payload.params)
    },
    refetchOnWindowFocus: false,
  })

  return { isLoading, isError, data, isSuccess, refetch}
}

export const getCategoryDetail = (params) => {
  return customAxios({
    method: 'get',
    url: '/api/faqCategory/getFaqCategoryDetail',
    isLoading: false,
    params: params
  })
  .then ((res) => {
    const result = res.data.data
    return result
  })
}

export const postFaqCategoryReg = (params) => {
  return customAxios({
    method: 'post',
    url: '/api/faqCategory/postFaqCategoryReg',
    data: params,
    isLoading: false,
  })
  .then ((res) => {
    const result = res.data.data

    return result
  })
}

export const putFaqCategoryUpd = async (params) => {
  return customAxios({
    method: 'put',
    url: '/api/faqCategory/putFaqCategoryUpd',
    data: params,
    isLoading: false,
  })
  .then ((res) => {
    const result = res.data.data

    return result
  })

}

export const delFaqCategoryDel = async (params) => {
  return customAxios({
    method: 'delete',
    url: '/api/faqCategory/delFaqCategoryDel',
    data: params,
    isLoading: false
  })
  .then ((res) => {
    const result = res.data.data

    return result
  })
}