import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

const AccountData = () => {
	return (
		<Grid justifyContent='center' container sx={{ maxWidth: '50rem' }}>
			{Array(10)
				.fill(0)
				.map(() => (
					<Grid
						container
						item
						justifyContent='center'
						sx={{ marginBottom: '.5rem' }}
						key={nanoid()}
					>
						<Grid item xs={3}>
							Name
						</Grid>
						<Grid item xs={2} sm={1}>
							:
						</Grid>
						<Grid item xs={6}>
							Anjan Shomodder
						</Grid>
					</Grid>
				))}
		</Grid>
	)
}

export default AccountData
