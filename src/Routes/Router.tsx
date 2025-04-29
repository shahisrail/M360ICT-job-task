import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../components/ Error";
import ProductsPage from "../pages/ProductsPage";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error message="An unexpected error occurred"></Error>,
    children: [
      {
        path: "/",
        element: <ProductsPage />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/product/edit/:id",
        element: <ProductEdit />,
      },
      
    ],
  },
]);

export default router;
