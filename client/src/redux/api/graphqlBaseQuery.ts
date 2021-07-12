import { ClientError } from 'graphql-request'

import { AnyObject } from 'interfaces/global'
import graphqlClient from 'graphql/graphqlClient'

interface Props {
	body: string
	params: AnyObject<any>
}

const graphqlBaseQuery = async ({ body, params }: Props) => {
	try {
		const result = await graphqlClient().request(body, params)
		return { data: result }
	} catch (error) {
		if (error instanceof ClientError) {
			return { error: { status: error.response.status, data: error } }
		}
		return { error: { status: 500, data: error } }
	}
}

export default graphqlBaseQuery
