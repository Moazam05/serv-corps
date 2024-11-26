import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./views/Home";

// Routes configuration
const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const RootComponent = () => {
  return <RouterProvider router={Router} />;
};

export default RootComponent;
