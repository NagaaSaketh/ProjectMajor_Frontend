import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [quantity, setQuantity] = useState(1);
  const [cart, setCart] = useState([]);
  const [size, setSize] = useState("");

  useEffect(() => {
    async function getCartItems() {
      const res = await fetch("https://major-project1-backend-ten.vercel.app/cart/items");
      const jsonData = await res.json();
      // console.log(jsonData);
      if (jsonData) {
        setCart(Array.isArray(jsonData) ? jsonData : jsonData.products || []);
      }
    }
    getCartItems();
  }, []);

  const handleAddToCart = async (productData, quantity, size) => {
    // console.log(productData);
    if (!size) {
      toast.warning("Please select a size");
      return;
    }
    const existingProduct = cart.find(
      (product) =>
        product.productId === productData.productId && product.size === size
    );

    if (existingProduct) {
      toast.info("This item & size is already in your cart.");
      return;
    }

    try {
      const cartItem = {
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
    } catch (err) {
      console.log(err);
    }
  };

  const increaseQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity((quantity) => (quantity > 1 ? quantity - 1 : 1));
  };

  const handleMoveToWishListFromCart = async(product)=>{
    try {
      const response = await fetch("https://major-project1-backend-ten.vercel.app/wishlist/items/products");
      const wishListData = await response.json();
      const wishList = wishListData.wishlistItems || [];

      const existingProduct = wishList.find((item) =>item.productId === product.productId);

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

        const addResponse = await fetch("https://major-project1-backend-ten.vercel.app/wishlistItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wishListItem),
        });

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
      const response = await fetch(`https://major-project1-backend-ten.vercel.app/items/${itemId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
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
        quantity,
        deleteItem,
        handleMoveToWishListFromCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default useCartContext;
