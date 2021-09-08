import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import { useGetTotalCartPrice } from 'hooks/swr/useCartHooks'

const Subtotal = () => {
	const { data } = useGetTotalCartPrice()

	if (!data) return null

	const {
		totalCartPrice: { totalPrice },
	} = data

	return (
		<Grid sx={{ margin: '2rem 0' }}>
			<Typography variant='h4' sx={{ marginBottom: '.5rem' }}>
				Cart Totals
			</Typography>
			<Divider />

			<Grid container justifyContent='space-between'>
				<Grid item>
					<Typography
						sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}
					>
						SubTotal
					</Typography>
				</Grid>

				<Grid item>
					<Typography
						sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}
					>
						${totalPrice / 100}
					</Typography>
				</Grid>
			</Grid>
			<Divider />

			<Grid container justifyContent='space-between'>
				<Grid item>
					<Typography
						sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}
					>
						Total
					</Typography>
				</Grid>

				<Grid item>
					<Typography
						sx={{ fontWeight: 'bold', marginTop: '1rem', marginBottom: '0.5rem' }}
					>
						${totalPrice / 100}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	)
}

export default Subtotal
