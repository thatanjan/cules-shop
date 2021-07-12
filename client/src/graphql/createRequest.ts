import graphQLClient from 'graphql/graphqlClient'

interface Input<T> {
	key: string
	values: T | undefined
}

const createRequest = async <I, O>({ key, values }: Input<I>) => {
	const data = await graphQLClient().request(key, values)
	return data as O
}

export default createRequest
