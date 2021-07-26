import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { Props as ProductQuantityProps } from 'components/Products/ProductQuantity'

import createRequest from 'graphql/createRequest'

import { CommonResponse } from 'interfaces/global'

import { addProductToCart } from 'graphql/mutations/productMutations'
import { getCategoryProducts } from 'graphql/queries/productQueries'

import { useIsProductInTheCart } from 'hooks/swr/useProductHooks'

const ProductQuantity = dynamic(() => import('./ProductQuantity'))
const DeleteFromCart = dynamic(() => import('components/Cart/DeleteFromCart'))

export interface Props {
	twoColumn?: boolean
	cartPage?: boolean
	name: string
	image: string
	price: number
	userQuantity?: number
	_id: string
	seller?: {
		name: string
		_id: string
	}
	category: {
		name: string
		_id: string
	}
	alreadyInCart?: null | boolean
}

const ProductQuantityContainer = (props: ProductQuantityProps) => {
	const { data, mutate } = useIsProductInTheCart(props.productID as string)

	return (
		<ProductQuantity
			{...{
				...props,
				quantity: data ? data.isProductInTheCart.quantity : props.quantity,
				mutateQuantity: mutate,
			}}
		/>
	)
}

const ProductPreview = ({
	twoColumn,
	cartPage,
	name,
	category,
	price,
	userQuantity,
	_id,
	image,
	alreadyInCart,
}: Props) => {
	const { route } = useRouter()

	const addProductHandler = async () => {
		try {
			const {
				addProductToCart: { success },
			} = await createRequest<
				{ productID: string; quantity: number },
				{ addProductToCart: CommonResponse }
			>({
				key: addProductToCart,
				values: { productID: _id, quantity: 1 },
			})

			if (success) {
				if (route === '/category/[category]')
					mutate([getCategoryProducts, undefined])
			}
		} catch (error) {}
	}

	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
				display: twoColumn && 'flex',
			}}
		>
			<CardMedia
				sx={{
					width: '100%',
					m: 'auto',
					flexBasis: twoColumn && '30%',
				}}
			>
				<Image src={image} width={1920} height={1080} layout='responsive' />
			</CardMedia>

			<Box sx={{ flexGrow: 1 }}>
				<CardHeader
					title={name}
					subheader={category.name}
					subheaderTypographyProps={{
						color: 'secondary',
						variant: 'body2',
						component: 'h4',
					}}
					titleTypographyProps={{
						variant: 'body1',
						component: 'h3',
					}}
				/>
				<CardContent
					component={Grid}
					container
					alignItems='center'
					justifyContent='space-between'
				>
					<Grid item>
						<Typography component='h5' variant='subtitle1' color='secondary'>
							${`${price / 100}`}
						</Typography>
					</Grid>

					{(alreadyInCart || cartPage) && (
						<Grid item>
							<DeleteFromCart productID={_id} />
						</Grid>
					)}

					{!cartPage && !alreadyInCart && (
						<Grid item>
							<IconButton onClick={() => addProductHandler()}>
								<AddShoppingCartIcon />
							</IconButton>
						</Grid>
					)}

					{cartPage && (
						<Grid item>
							<ProductQuantityContainer productID={_id} quantity={userQuantity} />
						</Grid>
					)}
				</CardContent>
			</Box>
		</Card>
	)
}

export default ProductPreview
