import createRequest, { Input } from 'graphql/createRequest'

const fetcher =
	<I, O>({ key, values }: Input<I>) =>
	async () =>
		createRequest<I, O>({ key, values })

export default fetcher
