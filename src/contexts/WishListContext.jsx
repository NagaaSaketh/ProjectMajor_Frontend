import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const WishListContext = createContext();

const useWishListContext = () => useContext(WishListContext);

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    async function getWishListItems() {
      const res = await fetch("https://major-project1-backend-ten.vercel.app/wishlist/items/products");
      const jsonData = await res.json();
      console.log(jsonData);
      if (jsonData) {
        setWishList(Array.isArray(jsonData) ? jsonData : jsonData.items || []);
      }
    }
    getWishListItems();
  }, []);

  const handleAddToWishList = async (productData, size) => {
    console.log(productData);

    const existingProduct = wishList.find(
      (product) =>
        product.productId === productData.productId && product.size === size
    );
    if (existingProduct) {
      toast.info("Product already exists in your wishlist.");
      return;
    }

    try {
      const wishListItem = {
        productId: productData._id,
        productName: productData.productName,
        productImage: productData.productImage,
        productPrice: productData.productPrice,
        actualPrice:productData.actualPrice,
        size: size,
      };

      const response = await fetch("https://major-project1-backend-ten.vercel.app/wishlistItems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(wishListItem),
      });
      if (!response.ok) {
        throw "Failed to add item into wishlist.";
      }
      const data = await response.json();
      console.log("Added wishlist item:", data);

      setWishList([...wishList, data.items]);
      toast.success("Item added to wishlist successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoveToCartFromWishList = async (product) => {
    // console.log(product);

    try {
      const response = await fetch("https://major-project1-backend-ten.vercel.app/cart/items");
      const cartData = await response.json();
      const cart = cartData.products || [];

      const existingProduct = cart.find(
        (item) =>
          item.productId === product.productId && item.size === product.size
      );

      if (existingProduct) {
        const updatedQuantity = existingProduct.quantity + 1;
        const updateResponse = await fetch(
          `https://major-project1-backend-ten.vercel.app/cart/items/${existingProduct._id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ quantity: updatedQuantity }),
          }
        );

        if (!updateResponse.ok) {
          throw "Failed to update item quantity in cart.";
        }
        toast.success("Item quantity updated in cart!");
      } else {
        const cartItem = {
          productId: product.productId,
          productName: product.productName,
          productImage: product.productImage,
          productPrice: product.productPrice,
          actualPrice: product.actualPrice,
          quantity: 1,
          size: product.size,
        };

        const addResponse = await fetch("https://major-project1-backend-ten.vercel.app/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cartItem),
        });

        if (!addResponse.ok) {
          throw "Failed to add item into cart.";
        }

        toast.success("Item moved to cart successfully!");
      }

      await removeFromWishlist(product._id);

    } catch (err) {
      console.log(err);
      toast.error("Failed to move item to cart.");
    }
  };

  const removeFromWishlist = async (itemId) => {
    try {
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/wishlist/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from wishlist.");
      }
      setWishList((wishList) => wishList.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <WishListContext.Provider
      value={{ handleAddToWishList, wishList, setWishList , handleMoveToCartFromWishList}}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default useWishListContext;
