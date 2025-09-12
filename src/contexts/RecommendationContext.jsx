import { createContext, useContext, useState } from "react";

const RecommendationContext = createContext();

const useRecommendationContext = () => useContext(RecommendationContext);

export const RecommendationProvider = ({ children }) => {
  const [recommendations, setRecommmendations] = useState([]);

  const recommendationProducts = async (categoryId, currentProductId) => {
    // console.log(categoryId,currentProductId);
    try {
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/products/category/${categoryId}`
      );
      const data = await response.json();
      let filteredProducts = data.filter(
        (product) => product._id !== currentProductId
      );
      const products = filteredProducts.slice(0,4)
      
      setRecommmendations(products);
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  return (
    <RecommendationContext.Provider
      value={{ recommendationProducts, recommendations }}
    >
      {children}
    </RecommendationContext.Provider>
  );
};

export default useRecommendationContext;
