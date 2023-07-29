import * as ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/user", element: <User /> },
  { path: "/recomandation", element: <Recomandation /> },
]);

import App from "./App";
import User from "./components/User";
import Recomandation from "./components/Recomandation";

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={routes} />
);
