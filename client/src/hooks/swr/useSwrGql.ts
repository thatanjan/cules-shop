import useSWR, { Key, SWRResponse, SWRConfiguration } from 'swr'
import { Input } from 'graphql/createRequest'

import fetcher from 'utils/swrFetcher'

interface Props<I> {
	conditionState?: boolean | undefined
	swrOptions?: SWRConfiguration | undefined
	swrDependencies?: string | number
	key: Key
	values: Input<I>
}

const useSWRgql = <D, I, O>({
	conditionState,
	key,
	swrOptions,
	swrDependencies,
	values,
}: Props<I>): SWRResponse<D, any> =>
	useSWR<D, any>(
		[conditionState !== false ? key : null, swrDependencies],
		fetcher<I, O>({ key, values }),
		swrOptions
	) as SWRResponse<D, any>

export default useSWRgql
