import React from 'react'

import ProductOverviewTabs from 'components/Tabs/ProductOverviewTabs'
import ProductOverview from 'components/Products/ProductOverview'

const Product = () => {
	return (
		<>
			<ProductOverview />

			<ProductOverviewTabs />
		</>
	)
}

export default Product
