import dynamic from 'next/dynamic'
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
import MuiLink from 'components/Links/MuiLink'

import createRequest from 'graphql/createRequest'

import { CommonResponse, SxTypes } from 'interfaces/global'
import { MutationDeps } from 'interfaces/product'

import { totalCartItems } from 'graphql/queries/cartQueries'
import { addProductToCart } from 'graphql/mutations/productMutations'

import { useIsProductInTheCart } from 'hooks/swr/useProductHooks'

const ProductQuantity = dynamic(() => import('./ProductQuantity'))
const DeleteFromCart = dynamic(() => import('components/Cart/DeleteFromCart'))

export interface Props extends MutationDeps {
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
	cartPage,
	name,
	category,
	price,
	userQuantity,
	_id,
	image,
	alreadyInCart,
	mutationDeps,
}: Props) => {
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
				mutationDeps.forEach(item => mutate(item))
				mutate([totalCartItems, undefined])
			}
		} catch (error) {}
	}

	const cartStyle: SxTypes = { display: 'grid', justifyItems: 'end' }
	const productPageLink = `/product/${_id}`

	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
			}}
		>
			<MuiLink
				href={productPageLink}
				MuiComponent={CardMedia}
				sx={{
					width: '100%',
					m: 'auto',
				}}
			>
				<Image
					src={image}
					width={1920}
					height={1080}
					layout='responsive'
					quality={20}
				/>
			</MuiLink>

			<Box sx={{ flexGrow: 1 }}>
				<CardHeader
					title={
						<MuiLink MuiComponent={Typography} href={productPageLink}>
							{name}
						</MuiLink>
					}
					subheader={
						<MuiLink MuiComponent={Typography} href={productPageLink}>
							{category.name}
						</MuiLink>
					}
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
					sx={{ padding: '0 16px' }}
				>
					<Grid item xs={6}>
						<Typography component='h5' variant='subtitle1' color='secondary'>
							${`${price / 100}`}
						</Typography>
					</Grid>

					{(alreadyInCart || cartPage) && (
						<Grid item sx={cartStyle}>
							<DeleteFromCart productID={_id} mutationDeps={mutationDeps} />
						</Grid>
					)}

					{!cartPage && !alreadyInCart && (
						<Grid item xs={6} sx={cartStyle}>
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
