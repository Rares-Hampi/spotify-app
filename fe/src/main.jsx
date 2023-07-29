import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/user", element: <h1></h1> },
  { path: "/recomandation", element: <h1></h1> },
]);

import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);
