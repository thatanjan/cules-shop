import { Key } from 'swr'
import graphQLClient from 'graphql/graphqlClient'

export interface Input<K> {
	key: string | Key
	values: K | undefined
}

const createRequest = async <I, O>({ key, values }: Input<I>) => {
	const data = await graphQLClient().request(key as string, values)
	return data as O
}

export default createRequest
