import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../ Error";
import Home from "../components/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <Error message="An unexpected error occurred"></Error>,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);

export default router;
