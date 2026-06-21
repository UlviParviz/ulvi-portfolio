import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import BlogDetails from "../features/blog/BlogDetails";

export const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/blog/:slug", element: <BlogDetails /> },
]);