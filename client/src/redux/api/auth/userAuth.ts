import { createApi } from '@reduxjs/toolkit/query/react'

import graphqlBaseQuery from 'redux/api/graphqlBaseQuery'
import {
	loginMutation,
	registerMutation,
} from 'graphql/mutations/authMutations'

import {
	LoginOutput,
	LoginInput,
	RegisterInput,
	RegisterOutput,
} from 'interfaces/authentication'

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
		register: builder.mutation<RegisterOutput, RegisterInput>({
			query: values => ({
				body: registerMutation,
				params: values,
			}),
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation } = userAuthApi

export default userAuthApi
