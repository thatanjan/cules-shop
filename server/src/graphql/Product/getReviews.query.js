import Product from 'models/Product'

const resolver = {
	Query: {
		getReviews: async (_, { productID }) => {
			const product = await Product.findById(productID).populate({
				path: 'reviews.user',
				select: 'name profilePicture user',
			})

			let { allStars, reviews } = product

			let totalReviews = 0
			let averageStars = 0

			allStars = allStars.toObject()

			for (let key in allStars) {
				const value = allStars[key]
				const numKey = parseInt(key, 10)

				totalReviews += value
				averageStars += value * numKey
			}

			averageStars = (averageStars.toFixed(1) / totalReviews) * 10

			reviews = reviews.toObject()

			reviews.forEach(review => {
				review.date = review.date.toDateString()
			})

			return { reviews, totalReviews, averageStars }
		},
	},
}

export default resolver
