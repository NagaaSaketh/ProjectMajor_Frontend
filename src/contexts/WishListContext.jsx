import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import useUserContext from "./UserContext";

const WishListContext = createContext();

const useWishListContext = () => useContext(WishListContext);

export const WishListProvider = ({ children }) => {
  const { user } = useUserContext();

  const [wishList, setWishList] = useState([]);

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

      const response = await fetch(
        "https://major-project1-backend-ten.vercel.app/wishlistItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wishListItem),
        }
      );
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

      const response = await fetch(
        "https://major-project1-backend-ten.vercel.app/wishlistItems",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(wishListItem),
        }
      );
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
      setWishList((prevWishList) => prevWishList.filter((item) => item._id !== itemId));
      toast.success("Item removed from wishlist successfully!");
    } catch (err) {
      console.log(err);
    }
  };
  const addToWishListFromCart = (newItem) => {
    setWishList((prevWishList) => [...prevWishList, newItem]);
  };
  return (
    <WishListContext.Provider
      value={{
        handleAddToWishList,
        wishList,
        setWishList,
        handleAddToWishListFromProductsListPage,
        removeFromWishlist,
        addToWishListFromCart
      }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default useWishListContext;



