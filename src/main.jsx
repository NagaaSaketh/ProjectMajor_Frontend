import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Categories from "./components/Categories.jsx";
import ProductsListing from "./pages/ProductsListing.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/categories", element: <Categories /> },
  { path: "/products/categories/:categoryId", element: <ProductsListing /> },
  { path: "/products/:productId", element: <ProductDetails /> },
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
