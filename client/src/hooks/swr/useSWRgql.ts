import useSWR, { Key, SWRResponse, SWRConfiguration } from 'swr'

import fetcher from 'utils/swrFetcher'

interface Props<I> {
	conditionState?: boolean | undefined
	swrOptions?: SWRConfiguration | undefined
	swrDependencies?: string | number
	key: Key
	values: I
}

const useSWRgql = <I, O>({
	conditionState,
	key,
	swrOptions,
	swrDependencies,
	values,
}: Props<I>): SWRResponse<O, any> =>
	useSWR<O, any>(
		[conditionState !== false ? key : null, swrDependencies],
		fetcher<I, O>({ key, values }),
		swrOptions
	)

export default useSWRgql
