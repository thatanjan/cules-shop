import { createApi } from '@reduxjs/toolkit/query/react'

import graphqlBaseQuery from 'redux/api/graphqlBaseQuery'
import { loginMutation } from 'graphql/mutations/authMutations'

import { LoginOutput, LoginInput } from 'interfaces/authentication'

const userAuthApi = createApi({
	reducerPath: 'userAuthApi',
	baseQuery: graphqlBaseQuery,
	endpoints: builder => ({
		login: builder.mutation<LoginOutput, LoginInput>({
			query: values => ({
				body: loginMutation,
				params: values,
			}),
		}),
	}),
})

export const { useLoginMutation } = userAuthApi

export default userAuthApi
