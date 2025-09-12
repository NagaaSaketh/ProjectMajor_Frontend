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
import Profile from "./pages/Profile.jsx";
import { UserProvider } from "./contexts/UserContext.jsx";
import SignUp from "./pages/SignUp.jsx";
import LoginForm from "./pages/LoginForm.jsx";
import Orders from "./components/Orders.jsx";
import { AddressProvider } from "./contexts/AddressesContext.jsx";
import { SearchProvider } from "./contexts/SearchContext.jsx";
import { RecommendationProvider } from "./contexts/RecommendationContext.jsx";
const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/categories", element: <Categories /> },
  { path: "/products/categories/:categoryId", element: <ProductsListing /> },
  { path: "/products/:productId", element: <ProductDetails /> },
  { path: "/cart", element: <Cart /> },
  { path: "/wishlist", element: <WishList /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/profile", element: <Profile /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/orders", element: <Orders /> },
]);

root.render(
  <StrictMode>
    <UserProvider>
      <CartProvider>
        <WishListProvider>
          <AddressProvider>
            <SearchProvider>
              <RecommendationProvider>
              <RouterProvider router={router} />
              </RecommendationProvider>
            </SearchProvider>
          </AddressProvider>
        </WishListProvider>
      </CartProvider>
    </UserProvider>
  </StrictMode>
);
