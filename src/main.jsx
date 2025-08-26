import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Categories from "./components/Categories.jsx";
import ProductsListing from "./pages/ProductsListing.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import { CartProvider } from "./contexts/CartContext.jsx";
import WishList from "./pages/WishList.jsx";
import { WishListProvider } from "./contexts/WishListContext.jsx";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/categories", element: <Categories /> },
  { path: "/products/categories/:categoryId", element: <ProductsListing /> },
  { path: "/products/:productId", element: <ProductDetails /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <WishList /> },
]);

root.render(
  <StrictMode>
    <CartProvider>
      <WishListProvider>
        <RouterProvider router={router} />
      </WishListProvider>
    </CartProvider>
  </StrictMode>
);
