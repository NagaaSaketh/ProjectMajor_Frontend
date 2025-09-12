import { Link, useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../components/Header";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useCartContext from "../contexts/CartContext";
import useWishListContext from "../contexts/WishListContext";
import { ToastContainer, Slide } from "react-toastify";
import { useState , useEffect } from "react";
import useRecommendationContext from "../contexts/RecommendationContext";

const ProductDetails = () => {
  const { handleAddToCart, size, setSize } = useCartContext();
  const { handleAddToWishList } = useWishListContext();
  const {recommendationProducts,recommendations} = useRecommendationContext();
  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://major-project1-backend-ten.vercel.app/products/${productId}`
  );
  const [quantity, setQuantity] = useState(1);
  console.log(data);
  

  useEffect(() => {
    if (data?.category && data?._id) {
      recommendationProducts(data.category, data._id);
    }
  }, [data, productId]);

  const handleDecreaseBtn = () => {
    setQuantity((prevVal) => prevVal > 1 ? prevVal - 1 : 1);
  };

  const handleIncreaseBtn = () => {
    setQuantity((prevVal) => prevVal + 1);
  };

  const handleSizeSelection = (selectedSize) => {
    setSize(selectedSize);
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container py-4">
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
          ) : data ? (
            <div className="row">
              <div key={data._id} className="col-lg-4 col-md-5 mb-4">
                <div className="card">
                  <div className="position-relative">
                    <img
                      src={data.productImage}
                      alt={data.productName}
                      className="card-img-top img-fluid rounded"
                      style={{
                        height: "400px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center m-4 gap-4">
                  <button
                    onClick={() => handleAddToCart(data, quantity, size)}
                    style={{
                      borderRadius: "1%",
                      width: "100%",
                      fontFamily: "CopperPlate",
                    }}
                    className="btn btn-outline-dark"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleAddToWishList(data, size)}
                    style={{
                      borderRadius: "1%",
                      width: "100%",
                      fontFamily: "CopperPlate",
                    }}
                    className="btn btn-outline-dark"
                  >
                    Wishlist
                  </button>
                </div>
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="card text-center">
                  <div className="card-body p-4">
                    <h2
                      style={{ fontFamily: "Garamond" }}
                      className="fw-bold mb-3"
                    >
                      {data.productName}
                    </h2>
                    <div className="align-items-center mb-3">
                      <span className="me-2">
                        Product rating:{" "}
                        <strong>
                          {data.productRating}{" "}
                          <FontAwesomeIcon
                            icon={faStar}
                            style={{ color: "#FFD43B" }}
                          />
                        </strong>
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="fw-bold mb-1">
                        Rs.{data.productPrice}
                        <span className="text-muted small text-decoration-line-through mx-2">
                          ₹{data.actualPrice}
                        </span>
                      </h3>
                      <span
                        style={{ borderRadius: "1%" }}
                        className="badge bg-danger"
                      >
                        {Math.round(
                          ((data.actualPrice - data.productPrice) /
                            data.actualPrice) *
                            100
                        )}
                        % off
                      </span>
                    </div>
                    <div className="mb-4">
                      <label className="fw-bold mb-2">Quantity:</label>
                      <div className="d-flex justify-content-center ">
                        <button
                          onClick={handleDecreaseBtn}
                          className="btn btn-outline-dark rounded-circle"
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center mx-2"
                          value={quantity}
                          style={{ width: "45px" }}
                          readOnly
                        />
                        <button
                          onClick={handleIncreaseBtn}
                          className="btn btn-outline-dark rounded-circle"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="fw-bold mb-2">Size:</label>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          onClick={() => handleSizeSelection("XS")}
                          className={`btn ${
                            size === "XS"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          style={{
                            width: "50px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          XS
                        </button>
                        <button
                          onClick={() => handleSizeSelection("S")}
                          className={`btn ${
                            size === "S" ? "btn-primary" : "btn-outline-primary"
                          }`}
                          style={{
                            width: "50px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          S
                        </button>
                        <button
                          onClick={() => handleSizeSelection("M")}
                          className={`btn ${
                            size === "M" ? "btn-primary" : "btn-outline-primary"
                          }`}
                          style={{
                            width: "50px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          M
                        </button>
                        <button
                          onClick={() => handleSizeSelection("L")}
                          className={`btn ${
                            size === "L" ? "btn-primary" : "btn-outline-primary"
                          }`}
                          style={{
                            width: "50px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          L
                        </button>
                        <button
                          onClick={() => handleSizeSelection("XL")}
                          className={`btn ${
                            size === "XL"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          style={{
                            width: "50px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          XL
                        </button>
                        <button
                          onClick={() => handleSizeSelection("XXL")}
                          className={`btn ${
                            size === "XXL"
                              ? "btn-primary"
                              : "btn-outline-primary"
                          }`}
                          style={{
                            width: "60px",
                            height: "40px",
                            fontFamily: "CopperPlate",
                          }}
                        >
                          {" "}
                          XXL
                        </button>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center gap-5">
                      <div>
                        <img
                          style={{ width: "55px" }}
                          className="img-fluid"
                          src="https://static.thenounproject.com/png/952397-200.png"
                          alt="returnimg"
                        />
                        <p className="py-2 small fw-bold">Easy Return</p>
                      </div>
                      <div>
                        <img
                          style={{ width: "60px" }}
                          src="https://cdn-icons-png.flaticon.com/512/4947/4947265.png"
                          alt="shippingicon"
                        />
                        <p className="small fw-bold">Free Shipping</p>
                      </div>
                      <div>
                        <img
                          style={{ width: "70px" }}
                          src="https://logowik.com/content/uploads/images/secure-payment2785.jpg"
                          alt="payment"
                        />
                        <p className="py-2 small fw-bold">Secure Payments</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-3">
                  <h5
                    style={{ fontFamily: "Verdana" }}
                    className="py-1 fw-bold"
                  >
                    Product Description:{" "}
                  </h5>
                  <p className="fw-light">{data.productDescription}</p>
                  <h5
                    style={{ fontFamily: "Verdana" }}
                    className="py-1 fw-bold"
                  >
                    Product Info:
                  </h5>
                  {data?.productInfo.map((info, index) => (
                    <div key={index}>
                      <ul className="mt-1 fw-light">
                        <li>{info}</li>
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
              <hr />
              <div>
                <div className="text-center">
                  <h2 style={{ fontFamily: "CopperPlate" }}>
                    You may be interested in
                  </h2>
                </div>
                <div className="row">
                  {recommendations && recommendations.length > 0 ? (
                    recommendations.map((product)=>(
                      <div key={product._id} className="col-md-3 mb-4 my-3">
                        <Link to={`/products/${product._id}`}>
                    <div className="card h-100">
                      <img
                        src={product.productImage}
                        alt={product.productName}
                        className="card-img"
                        style={{ height: "250px", objectFit: "cover" }}
                      />
                    </div>
                     </Link>
                  </div>
                    ))
                  ) : <p>No Recommendations found.</p>  }
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              <h5>Product Not Found</h5>
            </div>
          )}
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

export default ProductDetails;
