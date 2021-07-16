import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import CustomAlert from 'components/Alerts/CustomAlert'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'
import { useUserState } from 'redux/hooks/useSliceHooks'

const AccountData = () => {
	const { userID } = useUserState()
	const { data, error } = useGetMultipleProfile([userID])

	if (error)
		return <CustomAlert checked severity='error' message='Something went wrong' />

	if (!data)
		return (
			<CustomAlert checked severity='info' message='Profile data is loading' />
		)

	const [myData] = data.getMultipleProfile

	const { name, address } = myData

	const originalData = { name, ...address }

	const fields = Object.keys(originalData)

	return (
		<Grid justifyContent='center' container sx={{ maxWidth: '50rem' }}>
			{fields.map(item => {
				const value = originalData[item]

				return (
					<Grid
						container
						item
						justifyContent='center'
						sx={{ marginBottom: '.5rem' }}
						key={nanoid()}
					>
						{value && (
							<>
								<Grid item xs={3}>
									{item}
								</Grid>
								<Grid item xs={2} sm={1}>
									:
								</Grid>
								<Grid item xs={6}>
									{value}
								</Grid>
							</>
						)}
					</Grid>
				)
			})}
		</Grid>
	)
}

export default AccountData
