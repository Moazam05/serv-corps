import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Blogs from "./views/Blogs";
import SingleBlog from "./views/Blogs/components/singleBlog";

// Routes configuration
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Blogs />,
  },
  {
    path: "/blog/:id",
    element: <SingleBlog />,
  },
]);

const RootComponent = () => {
  return <RouterProvider router={Router} />;
};

export default RootComponent;
