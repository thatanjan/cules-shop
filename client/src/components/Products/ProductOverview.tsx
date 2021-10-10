import { mutate as swrMutate } from 'swr'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { nanoid } from 'nanoid'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CompareIcon from '@material-ui/icons/Compare'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import createRequest from 'graphql/createRequest'

import { totalCartItems } from 'graphql/queries/cartQueries'

import {
	removeProductFromCart,
	addProductToCart,
} from 'graphql/mutations/productMutations'

import { useIsProductInTheCart } from 'hooks/swr/useProductHooks'

import { useUserState } from 'redux/hooks/useSliceHooks'

import { LOGIN_URL } from 'variables/global'

import { CommonResponse } from 'interfaces/global'

import MuiLink from 'components/Links/MuiLink'

import ProductQuantity from './ProductQuantity'

interface CartPartProps {
	productQuantity: number
}

const CartPart = ({ productQuantity }: CartPartProps) => {
	const {
		query: { productID },
	} = useRouter()
	const { data, mutate } = useIsProductInTheCart(productID as string)

	if (!data) return null

	const {
		isProductInTheCart: { exist, quantity },
	} = data

	const removeHandler = async () => {
		try {
			const {
				removeProductFromCart: { success },
			} = await createRequest<
				{ productID: string },
				{ removeProductFromCart: CommonResponse }
			>({ key: removeProductFromCart, values: { productID: productID as string } })

			if (success) {
				mutate()
				swrMutate([totalCartItems, undefined])
			}
			return true
		} catch (error) {
			return error
		}
	}

	const addHandler = async () => {
		try {
			const {
				addProductToCart: { success },
			} = await createRequest<
				{ productID: string; quantity: number },
				{ addProductToCart: CommonResponse }
			>({
				key: addProductToCart,
				values: { productID: productID as string, quantity: 1 },
			})

			if (success) {
				mutate()
				swrMutate([totalCartItems, undefined])
			}
			return true
		} catch (error) {
			return error
		}
	}

	return (
		<>
			{exist && (
				<ProductQuantity
					{...{
						productID: productID as string,
						userQuantity: quantity,
						mutateQuantity: mutate,
						productQuantity,
					}}
				/>
			)}

			<Button
				sx={{ textTransform: 'capitalize', marginTop: '2rem', padding: '0.8rem' }}
				variant='contained'
				startIcon={exist ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
				fullWidth
				onClick={exist ? removeHandler : addHandler}
			>
				{exist ? 'remove from the cart' : 'add to cart '}{' '}
			</Button>
		</>
	)
}

interface Props {
	image: string
	name: string
	quantity: number
	price: number
	category: {
		name: string
		_id: string
	}
}

const ProductOverview = ({
	image,
	name,
	quantity: productQuantity,
	price,
	category,
}: Props) => {
	const { loggedIn } = useUserState()
	const { push } = useRouter()
	return (
		<Grid container sx={{ mt: '2rem' }} justifyContent='space-evenly'>
			<Grid item container xs={12} md={6}>
				<Grid item xs={12} alignItems='center'>
					<Image
						src={image}
						layout='responsive'
						width={100}
						height={100}
						quality={60}
						objectFit='cover'
					/>
				</Grid>
			</Grid>

			<Grid item xs={12} md={5} sx={{ mt: '1rem' }}>
				<MuiLink
					MuiComponent={Typography}
					href={`/category/${category._id}?page=1`}
					sx={{ color: '#9c9c9c', textTransform: 'capitalize' }}
				>
					{category.name}
				</MuiLink>
				<Typography
					variant='h4'
					component='h1'
					sx={{ textTransform: 'capitalize' }}
				>
					{name}
				</Typography>
				<Box sx={{ marginTop: '1rem' }}>
					<Typography sx={{ display: 'inline' }}>Availability: </Typography>
					<Typography
						sx={{ display: 'inline' }}
						color={productQuantity ? 'limegreen' : 'error'}
					>
						{productQuantity ? 'In Stock' : 'Out Of Stock'}
					</Typography>
				</Box>
				<hr style={{ color: '#6f6f6f' }} />
				<Box sx={{ marginTop: '2rem' }}>
					<Button
						variant='contained'
						startIcon={<FavoriteBorderIcon fontSize='small' />}
						size='small'
					>
						Wishlist
					</Button>

					<Button
						variant='contained'
						startIcon={<CompareIcon fontSize='small' />}
						size='small'
						sx={{ marginLeft: '1rem' }}
					>
						Compare
					</Button>
				</Box>
				<List>
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<ListItem key={nanoid()}>
								<Typography sx={{ marginRight: '1rem' }}>{index + 1}.</Typography>
								<ListItemText primary='I dont for now' />
							</ListItem>
						))}
				</List>
				<Typography variant='h3' sx={{ marginTop: '3rem' }}>
					${price / 100}
				</Typography>

				{/* eslint-disable-next-line no-nested-ternary */}
				{productQuantity === 0 ? (
					<Typography color='error' variant='h4' sx={{ m: '1rem 0' }}>
						Out of Stock
					</Typography>
				) : loggedIn ? (
					<CartPart productQuantity={productQuantity} />
				) : (
					<Button
						sx={{ textTransform: 'capitalize', marginTop: '2rem', padding: '0.8rem' }}
						variant='contained'
						startIcon={<AddShoppingCartIcon />}
						fullWidth
						onClick={() => {
							push(LOGIN_URL)
						}}
					>
						Please login to add products to cart
					</Button>
				)}
			</Grid>
		</Grid>
	)
}

export default ProductOverview
