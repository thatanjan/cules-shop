import { gql } from 'apollo-server-express'

const Query = gql`
	type Query {
		_empty: String
	}
`

const Mutation = gql`
	type Mutation {
		_empty: String
	}
`

const typeDefs = [Query, Mutation]

export default typeDefs
