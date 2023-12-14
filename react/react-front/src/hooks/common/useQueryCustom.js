import { useQuery } from '@tanstack/react-query'

export const useQueryCustom = ({
	queryKey, 
	queryFn, 
	params,
	enabled,
	retry,
}) => {
	const {
		isLoading,
		isError,
		data,
		isSuccess,
		refetch,
	} = useQuery({
		queryKey: [queryKey],
		queryFn: async () => {
			return await queryFn(params)
		},
		refetchOnWindowFocus: false,
		enabled: enabled === undefined ? true : enabled,
		retry: retry === undefined ? false : retry
	})

	return { isLoading, isError, data, isSuccess, refetch }
}