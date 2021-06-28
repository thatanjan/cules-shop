import React from 'react'
import Pagination from '@material-ui/core/Pagination'
import Stack from '@material-ui/core/Stack'
import { useRouter } from 'next/router'

interface Props {}

const CategoryPagination = (props: Props) => {
	const {
		push,
		query: { category },
	} = useRouter()

	const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
		push(`/category/${category}?page=${value}`)
	}

	return (
		<>
			<Stack spacing={2}>
				<Pagination
					count={10}
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
