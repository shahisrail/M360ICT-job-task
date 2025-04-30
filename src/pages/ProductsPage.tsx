import ProductTable from "../components/ProductTable"
import { Helmet } from "react-helmet"


const ProductsPage = () => {
  return (
    <div>
      <Helmet>
        <title>Products | ProductHub</title>
        <meta name="description" content="Browse our complete product catalog" />
      </Helmet>
      <ProductTable />
    </div>
  )
}

export default ProductsPage
