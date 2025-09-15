import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import useUserContext from "./UserContext";

const WishListContext = createContext();

const useWishListContext = () => useContext(WishListContext);

export const WishListProvider = ({ children }) => {
  const { user } = useUserContext();
  // console.log(user?._id);

  const [wishList, setWishList] = useState([]);

  // console.log(wishList);

  useEffect(() => {
    if (!user) {
      setWishList([]);
      localStorage.removeItem("wishList");
    }
  }, [user]);

  useEffect(() => {
    async function getWishListItems() {
      if (!user?._id) {
        setWishList([]);
        return;
      }

      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/wishlist/${user._id}`
      );
      const jsonData = await response.json();
      // console.log(jsonData);
      if (jsonData) {
        setWishList(Array.isArray(jsonData) ? jsonData : jsonData.items || []);
      }
    }
    getWishListItems();
  }, [user?._id]);

  const handleAddToWishList = async (productData) => {
    console.log(productData);

    if (!user) {
      toast.info("Please login to continue");
      return;
    }
    const existingProduct = wishList.find(
      (product) =>
        product.productId === productData._id
    );
    if (existingProduct) {
      toast.info("Product already exists in your wishlist.");
      return;
    }

    try {
      const wishListItem = {
        userID: user._id,
        productId: productData._id,
        productName: productData.productName,
        productImage: productData.productImage,
        productPrice: productData.productPrice,
        actualPrice: productData.actualPrice,
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

      setWishList([...wishList, data]);
      toast.success("Item added to wishlist successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToWishListFromProductsListPage = async (productData) => {
    console.log(productData);

    if (!user) {
      toast.info("Please login to continue");
      return;
    }

    const existingProduct = wishList.find(
      (product) => product.productId === productData._id
    );
    if (existingProduct) {
      toast.info("Product already exists in your wishlist.");
      return;
    }
    try {
      const wishListItem = {
        userID: user._id,
        productId: productData._id,
        productName: productData.productName,
        productImage: productData.productImage,
        productPrice: productData.productPrice,
        actualPrice: productData.actualPrice,
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

      setWishList([...wishList, { ...data, productId: productData._id }]);
      toast.success("Item added to wishlist successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoveToCartFromWishList = async (product) => {
    // console.log(product);

    try {
      const response = await fetch(
        "https://major-project1-backend-ten.vercel.app/cart/items"
      );
      const cartData = await response.json();
      const cart = cartData.products || [];

      const existingProduct = cart.find(
        (item) => item.productId === product._id && item.size === product.size
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
          userID: user._id,
          productId: product.productId,
          productName: product.productName,
          productImage: product.productImage,
          productPrice: product.productPrice,
          actualPrice: product.actualPrice,
          quantity: 1,
          size: product.size,
        };

        const addResponse = await fetch(
          "https://major-project1-backend-ten.vercel.app/cart",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(cartItem),
          }
        );

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
      toast.success("Item removed from wishlist successfully!");
      setWishList((wishList) => wishList.filter((item) => item._id !== itemId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WishListContext.Provider
      value={{
        handleAddToWishList,
        wishList,
        setWishList,
        handleMoveToCartFromWishList,
        handleAddToWishListFromProductsListPage,
        removeFromWishlist,
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default useWishListContext;
