import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../components/ Error";
import ProductsPage from "../pages/ProductsPage";
import ProductDetail from "../pages/ProductDetail";

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
    ],
  },
]);

export default router;
