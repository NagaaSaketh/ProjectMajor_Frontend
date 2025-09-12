import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import useUserContext from "./UserContext";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useUserContext();
  console.log(user);

  
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState("");

  useEffect(() => {
    async function getCartItems() {
      if (!user?._id) {
        setCart([]);
        localStorage.removeItem("cart");
        return;
      }
      try {
        const res = await fetch(`https://major-project1-backend-ten.vercel.app/cart/${user._id}`);
        const jsonData = await res.json();
        if (jsonData) {
          setCart(Array.isArray(jsonData) ? jsonData : jsonData.products || []);
        }
      } catch (err) {
        console.error(err);
        setCart([]);
        localStorage.removeItem("cart");
      }
    }
    getCartItems();
  }, [user]);

  const handleAddToCart = async (productData, quantity, size) => {
    // console.log(productData);
    try {
      if (!size) {
        toast.warning("Please select a size");
        return;
      }
      const existingProduct = cart.find(
        (product) =>
          product.productId === productData._id && product.size === size
      );
      console.log(existingProduct);

      if (existingProduct) {
        increaseQuantity(existingProduct._id);
        toast.success("Item quantity updated in cart!");
      } else {
        const cartItem = {
          userID: user._id,
          productId: productData._id,
          productName: productData.productName,
          productImage: productData.productImage,
          productPrice: productData.productPrice,
          actualPrice: productData.actualPrice,
          quantity: quantity,
          size: size,
        };

        const response = await fetch("https://major-project1-backend-ten.vercel.app/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        });
        if (!response.ok) {
          throw "Failed to add item into cart.";
        }
        const data = await response.json();
        console.log("Added item:", data);
        setCart([...cart, data.cartItem]);
        toast.success("Item added to cart successfully!");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      const item = cart.find((cartItem) => cartItem._id === itemId);
      if (!item) return;

      const updatedQuantity = item.quantity + 1;

      const updateResponse = await fetch(
        `https://major-project1-backend-ten.vercel.app/cart/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: updatedQuantity }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update quantity");
      }

      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: updatedQuantity }
            : cartItem
        )
      );
    } catch (err) {
      console.error("Failed to increase quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      const item = cart.find((cartItem) => cartItem._id === itemId);
      if (!item || item.quantity <= 1) return;

      const updatedQuantity = item.quantity - 1;

      const updateResponse = await fetch(
        `https://major-project1-backend-ten.vercel.app/cart/items/${itemId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: updatedQuantity }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update quantity on server");
      }

      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: updatedQuantity }
            : cartItem
        )
      );
    } catch (err) {
      console.error("Failed to decrease quantity:", err);
      toast.error("Failed to update quantity");
    }
  };

  const handleMoveToWishListFromCart = async (product) => {
    try {
      const response = await fetch(
        "https://major-project1-backend-ten.vercel.app/wishlist/items/products"
      );
      const wishListData = await response.json();
      const wishList = wishListData.wishlistItems || [];

      const existingProduct = wishList.find(
        (item) => item.productId === product._id
      );

      if (existingProduct) {
        toast.info("This Item is already in your wishlist.");
      } else {
        const wishListItem = {
          productId: product.productId,
          productName: product.productName,
          productImage: product.productImage,
          productPrice: product.productPrice,
          actualPrice: product.actualPrice,
          quantity: 1,
          size: product.size,
        };

        const addResponse = await fetch(
          "https://major-project1-backend-ten.vercel.app/wishlistItems",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(wishListItem),
          }
        );

        if (!addResponse.ok) {
          throw "Failed to add item into wishlist.";
        }

        toast.success("Item moved to wishlist successfully!");
      }

      await deleteItem(product._id);
    } catch (err) {
      console.log(err);
      toast.error("Failed to move item to wishlist.");
    }
  };

  async function deleteItem(itemId) {
    try {
      // console.log("Deleting item with ID:", itemId);
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete item: ${errorText}`);
      }

      const data = await response.json();
      console.log("Item Deleted:", data);

      setCart((cart) => cart.filter((item) => item._id !== itemId));

      toast.success("Item deleted successfully.");
    } catch (err) {
      console.log(err);
    }
  }
  const clearCart = async (userId) => {
    try {
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/cart/clear/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        setCart([]);
        localStorage.removeItem("cart");
        console.log("Cart cleared successfully");
      } else {
        console.error("Failed to delete cart items");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        handleAddToCart,
        size,
        setSize,
        increaseQuantity,
        decreaseQuantity,
        deleteItem,
        handleMoveToWishListFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default useCartContext;
