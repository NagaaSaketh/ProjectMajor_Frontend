import { use } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import Header from "../components/Header";

const ProductDetails = () => {
  const { productId } = useParams();
  const { data, loading, error } = useFetch(
    `https://major-project1-backend-ten.vercel.app/products/${productId}`
  );
  console.log(data);

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
              <div className="col-lg-4 col-md-5 mb-4">
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
              </div>
              <div className="col-lg-8 col-md-7">
                <div className="card text-center">
                  <div className="card-body p-4">
                    <h2 className="fw-bold mb-3">{data.productName}</h2>
                    <div className="align-items-center mb-3">
                      <span className="me-2">
                        Product rating: <strong>{data.productRating}</strong> 
                      </span>
                    </div>
                    <div className="mb-4">
                      <h3 className="fw-bold mb-1">
                        Rs.{data.productPrice}
                        <span className="text-muted small text-decoration-line-through mx-2">
                          ₹{data.actualPrice}
                        </span>
                      </h3>
                      <span className="badge bg-success">
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
                        <button className="btn btn-outline-primary btn-sm">
                          -
                        </button>
                        <input
                          type="text"
                          className="form-control text-center mx-2"
                          value="1"
                          style={{ width: "40px" }}
                        />
                        <button className="btn btn-outline-primary btn-sm">
                          +
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="fw-bold mb-2">Size:</label>
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "50px", height: "40px" }}
                        >
                          {" "}
                          XS
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "50px", height: "40px" }}
                        >
                          {" "}
                          S
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "50px", height: "40px" }}
                        >
                          {" "}
                          M
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "50px", height: "40px" }}
                        >
                          {" "}
                          L
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "50px", height: "40px" }}
                        >
                          {" "}
                          XL
                        </button>
                        <button
                          className="btn btn-outline-primary"
                          style={{ width: "60px", height: "40px" }}
                        >
                          {" "}
                          XXL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              <h5>Product Not Found</h5>
              <p>The product you're looking for doesn't exist.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
