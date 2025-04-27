import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../components/ Error";
import ProductTable from "../components/ProductTable";
 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error message="An unexpected error occurred"></Error>,
    children: [
      {
        path: "/",
        element: <ProductTable />,
      },
    ],
  },
]);

export default router;
