import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Error from "../ Error";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      errorElement: <Error message="An unexpected error occurred"></Error>,
      children: [
        {
          path: "/",
          element: <Addschool />,
        },
   
      ],
    },
  ]);


export default router;