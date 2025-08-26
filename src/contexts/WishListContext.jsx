import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


const WishListContext = createContext();

const useWishListContext = () => useContext(WishListContext);

export const WishListProvider = ({ children }) => {
  const [wishList, setWishList] = useState([]);

  useEffect(() => {
    async function getWishListItems() {
      const res = await fetch("http://localhost:3000/wishlist/items/products");
      const jsonData = await res.json();
      console.log(jsonData);
      if (jsonData) {
        setWishList(Array.isArray(jsonData) ? jsonData : jsonData.items || []);
      }
    }
    getWishListItems();
  }, []);

  const handleAddToWishList = async (productData) => {
    console.log(productData);

    const existingProduct = wishList.find(
      (product) => product.productId === productData._id
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
      };

      const response = await fetch("http://localhost:3000/wishlistItems", {
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

      setWishList([...wishList, { ...productData }]);
      toast.success("Item added to wishlist successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <WishListContext.Provider
      value={{ handleAddToWishList, wishList, setWishList }}
    >
      {children}
    </WishListContext.Provider>
  );
};

export default useWishListContext;
