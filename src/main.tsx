import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./styles/global.scss";
import { router } from "./app/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
);