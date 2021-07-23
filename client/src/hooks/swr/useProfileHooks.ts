import useSWRgql from 'hooks/swr/useSWRgql'
import { useUserState } from 'redux/hooks/useSliceHooks'

import {
	GetMultipleUserNameImage,
	GetMultipleProfileResponse,
} from 'interfaces/profile'
import {
	getMultipleUserNameImage,
	getMultipleProfile,
} from 'graphql/queries/profileQueries'

type ArrayOfID = Array<string>

export const useGetMultipleUserNameImage = (ids: ArrayOfID) =>
	useSWRgql<{ userIDs: ArrayOfID }, GetMultipleUserNameImage>({
		values: { userIDs: ids },
		key: getMultipleUserNameImage,
	})

export const useGetMultipleProfile = (
	ids?: ArrayOfID,
	swrDependencies?: 'all'
) => {
	const { userID } = useUserState()
	return useSWRgql<{ userIDs: ArrayOfID }, GetMultipleProfileResponse>({
		values: { userIDs: ids || [userID] },
		key: getMultipleProfile,
		swrDependencies: swrDependencies || userID,
	})
}
