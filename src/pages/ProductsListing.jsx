import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useWishListContext from "../contexts/WishListContext";
import { ToastContainer, Slide } from "react-toastify";
import useSearchContext from "../contexts/SearchContext";

const ProductsListing = () => {
  const { wishList, handleAddToWishListFromProductsListPage } =
    useWishListContext();
  const { search } = useSearchContext();
  const [category, setCategory] = useState([]);
  const [rating, setRating] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [price,setPrice] = useState(1100);
  const { categoryId } = useParams();
  const { data, loading, error } = useFetch(
    `https://major-project1-backend-ten.vercel.app/products/category/${categoryId}`
  );
  console.log(data);

  const categoryHandler = (event) => {
    const { value, checked } = event.target;
    if (value && checked) {
      setCategory((category) => [...category, value]);
    } else {
      setCategory((category) => category.filter((cat) => cat !== value));
    }
  };

  const ratingHandler = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const sortByHandler = (event) => {
    setSortBy(event.target.value);
  };

  const priceRangeHandler = (event)=>{
    setPrice(event.target.value)
  }

  const clearSelections = () => {
    setCategory([]);
    setRating("");
    setSortBy("");
    setPrice(1100)
  };

  let filteredProducts =
    category.length === 0
      ? data
      : data?.filter((product) => category.includes(product.productType));

  if (rating) {
    filteredProducts = filteredProducts?.filter(
      (product) => product.productRating >= rating
    );
  }

  if (sortBy === "lowToHigh") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => a.productPrice - b.productPrice
    );
  } else if (sortBy === "highToLow") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.productPrice - a.productPrice
    );
  }

  if(price){
    filteredProducts = filteredProducts?.filter((item)=>item.actualPrice >= price )
  }

  if (search && search.trim()) {
    filteredProducts = filteredProducts?.filter((product) =>
      product.productName?.toLowerCase().includes(search.toLowerCase().trim())
    );
  }

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 col-md-2 bg-light">
            <section className="sticky-top py-2">
              <div className="d-flex justify-content-between align-items-center mb-4">
                <p className="fw-bold">Filters</p>
                <p>
                  <button onClick={clearSelections} className="btn">
                    Clear
                  </button>
                </p>
              </div>
              <div>
                <p className="fw-bold">Price</p>
                <div className="d-flex justify-content-between small text-secondary">
                  <span>1100</span>
                  <span>3000</span>
                  <span>5000</span>
                </div>
                <input
                  type="range"
                  className="form-range"
                  onChange={priceRangeHandler}
                  value={price}
                  min="1100"
                  max="6000"
                />
              </div>
              <div className="mb-4">
                <p className="fw-bold">Category</p>
                <div className="form-check">
                  <input
                    onChange={categoryHandler}
                    className="form-check-input"
                    type="checkbox"
                    value="Shirts"
                    name="clothing"
                    id="shirts"
                    checked={category.includes("Shirts")}
                  />
                  <label className="form-check-label" htmlFor="shirts">
                    Shirts
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={categoryHandler}
                    className="form-check-input"
                    type="checkbox"
                    value="T-Shirts"
                    name="clothing"
                    id="tshirts"
                    checked={category.includes("T-Shirts")}
                  />
                  <label className="form-check-label" htmlFor="tshirts">
                    T-Shirts
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={categoryHandler}
                    className="form-check-input"
                    type="checkbox"
                    value="Hoodies"
                    name="clothing"
                    id="hoodies"
                    checked={category.includes("Hoodies")}
                  />
                  <label className="form-check-label" htmlFor="hoodies">
                    Hoodies
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={categoryHandler}
                    className="form-check-input"
                    type="checkbox"
                    value="Pants"
                    name="clothing"
                    id="pants"
                    checked={category.includes("Pants")}
                  />
                  <label className="form-check-label" htmlFor="pants">
                    Pants
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={categoryHandler}
                    className="form-check-input"
                    type="checkbox"
                    value="Oversized T-shirts"
                    name="clothing"
                    id="oversized"
                    checked={category.includes("Oversized T-shirts")}
                  />
                  <label className="form-check-label" htmlFor="oversize">
                    Oversized T-Shirts
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <p className="fw-bold">Rating</p>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={ratingHandler}
                    type="radio"
                    name="rating"
                    id="rating4"
                    value="4"
                    checked={rating === 4}
                  />
                  <label className="form-check-label" htmlFor="rating4">
                    4 stars & above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={ratingHandler}
                    type="radio"
                    name="rating"
                    id="rating3"
                    value="3"
                    checked={rating === 3}
                  />
                  <label className="form-check-label" htmlFor="rating3">
                    3 stars & above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={ratingHandler}
                    type="radio"
                    name="rating"
                    id="rating2"
                    value="2"
                    checked={rating === 2}
                  />
                  <label className="form-check-label" htmlFor="rating2">
                    2 stars & above
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    onChange={ratingHandler}
                    type="radio"
                    name="rating"
                    value="1"
                    id="rating1"
                    checked={rating === 1}
                  />
                  <label className="form-check-label" htmlFor="rating1">
                    {" "}
                    1 stars & above
                  </label>
                </div>
              </div>
              <div className="mb-4">
                <p className="fw-bold">Sort By</p>
                <div className="form-check">
                  <input
                    onChange={sortByHandler}
                    className="form-check-input"
                    type="radio"
                    name="sort"
                    id="lowToHigh"
                    value="lowToHigh"
                    checked={sortBy === "lowToHigh"}
                  />
                  <label className="form-check-label" htmlFor="lowToHigh">
                    Price - Low to High
                  </label>
                </div>
                <div className="form-check">
                  <input
                    onChange={sortByHandler}
                    className="form-check-input"
                    type="radio"
                    name="sort"
                    id="highToLow"
                    value="highToLow"
                    checked={sortBy === "highToLow"}
                  />
                  <label className="form-check-label" htmlFor="highToLow">
                    Price - High to Low
                  </label>
                </div>
              </div>
            </section>
          </div>
          <div className="col-lg-10 col-md-10 p-4">
            <div className="mb-4">
              <h3 className="fw-bold">
                Showing All Products
                <span style={{ fontSize: "20px" }} className="fw-normal mx-2">
                  (showing {filteredProducts?.length} products)
                </span>
              </h3>
            </div>
            <section className="mx-2">
              {loading ? (
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ height: "400px" }}
                >
                  <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="alert alert-danger text-center">
                  <p>An error occurred while fetching product details.</p>
                </div>
              ) : filteredProducts && filteredProducts.length > 0 ? (
                <div className="row">
                  {filteredProducts.map((obj) => (
                    <div
                      key={obj._id}
                      className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                    >
                      <Link
                        to={`/products/${obj._id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div className="card my-2">
                          <div className="position-relative">
                            <img
                              style={{
                                height: "250px",
                                width: "100%",
                                objectFit: "cover",
                              }}
                              className="card-img-top"
                              src={obj.productImage}
                              alt={obj.productName}
                            />
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToWishListFromProductsListPage(obj);
                              }}
                              className="position-absolute btn btn-link top-0 end-0 p-1"
                              style={{
                                color: wishList.find(
                                  (item) => item.productId === obj._id
                                )
                                  ? "red"
                                  : "gray",
                                borderRadius: "50%",
                                background: "transparent",
                                padding: "4px",
                              }}
                            >
                              <FontAwesomeIcon icon={faHeart} />
                            </button>
                          </div>

                          <div className="card-body d-flex flex-column text-center">
                            <p className="fw-bold">{obj.productName}</p>
                            <p className="fw-bold">
                              Rs.{obj.productPrice}{" "}
                              <span
                                style={{ textDecoration: "line-through" }}
                                className="fw-normal text-muted small"
                              >
                                ₹{obj.actualPrice}{" "}
                              </span>{" "}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="d-flex justify-content-center align-items-center">
                  <p>No Products available.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
};

export default ProductsListing;
