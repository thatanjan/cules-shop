import useSWRgql from 'hooks/swr/useSWRgql'
import { GetMultipleUserNameImage } from 'interfaces/profile'
import { getMultipleUserNameImage } from 'graphql/queries/profileQueries'

type ArrayOfID = Array<string>

export const useGetMultipleUserNameImage = (ids: ArrayOfID) =>
	useSWRgql<{ userIDs: ArrayOfID }, GetMultipleUserNameImage>({
		values: { userIDs: ids },
		key: getMultipleUserNameImage,
	})
