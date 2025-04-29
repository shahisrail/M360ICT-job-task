import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../components/ Error";
import ProductsPage from "../pages/ProductsPage";
import ProductDetail from "../pages/ProductDetail";
import ProductEdit from "../pages/ProductEdit";
import Notfound from "../components/Notfound";

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
        path: "/products",
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
      {
        path: "*",
        element:  <Notfound message='this page is not founded'/>
      },
    ],
  },
]);

export default router;
