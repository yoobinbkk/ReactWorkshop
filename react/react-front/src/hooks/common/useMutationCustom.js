import { useMutation } from '@tanstack/react-query'

export const useMutationCustom = ({
	mutationKey, 
	mutationFn,
	params
}) => {
	const {
		mutate,
		mutateAsync,
		data,
		isError,
		isSuccess,
	} = useMutation({
		mutationKey: [mutationKey],
		mutationFn: () => {
			return mutationFn(params)
		}
	})

	return {
		mutate,
		mutateAsync,
		data,
		isError,
		isSuccess
	}
}