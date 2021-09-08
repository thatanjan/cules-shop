import React from 'react'
import Pagination from '@material-ui/core/Pagination'
import Stack from '@material-ui/core/Stack'
import { useRouter } from 'next/router'

interface Props {
	getRedirectLink: (value: number) => string
	totalPages: number
}

const CategoryPagination = ({ getRedirectLink, totalPages }: Props) => {
	const {
		push,
		query: { page },
	} = useRouter()

	const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
		const redirectLink = getRedirectLink(value)
		push(redirectLink)
	}

	return (
		<>
			<Stack spacing={2}>
				<Pagination
					page={page ? parseInt(page as string, 10) : 1}
					count={totalPages}
					onChange={handleChange}
					sx={{
						'& .MuiPagination-ul': { display: 'flex', justifyContent: 'center' },
					}}
					color='primary'
				/>
			</Stack>
		</>
	)
}

export default CategoryPagination
