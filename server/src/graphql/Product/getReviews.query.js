import Product from 'models/Product'

const resolver = {
	Query: {
		getReviews: async (_, { productID }) => {
			let product = await Product.findById(productID)
				.sort('-reviews.date')
				.populate({
					path: 'reviews.user',
					select: 'name profilePicture user',
				})

			product = product.toObject()

			let { allStars, reviews } = product

			let totalReviews = 0
			let averageStars = 0

			if (!reviews || reviews.length === 0)
				return { reviews: [], totalReviews, averageStars }

			for (let key in allStars) {
				const value = allStars[key]
				const numKey = parseInt(key, 10)

				totalReviews += value
				averageStars += value * numKey
			}

			averageStars = (averageStars.toFixed(1) / totalReviews) * 10

			reviews.forEach(review => {
				review.date = review.date.toDateString()
			})

			const sortedReviews = []

			for (let i = reviews.length - 1; i >= 0; i--) {
				sortedReviews.push(reviews[i])
			}

			return { reviews: sortedReviews, totalReviews, averageStars }
		},
	},
}

export default resolver
