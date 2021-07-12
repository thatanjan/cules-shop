import graphQLClient from 'graphql/graphqlClient'

import { AnyObject } from 'interfaces/global'

interface Input {
	key: string
	values: AnyObject<any> | undefined
}

const createRequest = async ({ key, values }: Input) => {
	const data = await graphQLClient().request(key, values)
	return data
}

export default createRequest
