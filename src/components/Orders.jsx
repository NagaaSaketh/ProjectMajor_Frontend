import { useEffect, useState } from "react";
import useUserContext from "../contexts/UserContext";
import useFetch from "../useFetch";
import { Link } from "react-router-dom";

const Orders = () => {
  const { user } = useUserContext();
  const [orders, setOrders] = useState(null);

  console.log(orders);

  const { data, loading, error } = useFetch(
    `https://major-project1-backend-ten.vercel.app/orders/${user._id}`
  );

  console.log(data);

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  // console.log(data);

  const formatPrice = (price) => {
    return `INR ${parseFloat(price).toFixed(2)}`;
  };

  return (
    <>
      <div className="container-fluid bg-light min-vh-100">
        <div className="container">
          <div className="py-4">
            <div className="row">
              <div className="col-12">
                <h1
                  style={{ fontFamily: "CopperPlate" }}
                  className="fw-bold text-center text-dark mb-4"
                >
                  Your Orders
                </h1>
                <hr
                  className="border-primary border-3 mx-auto"
                  style={{ width: "250px" }}
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <div className="card shadow-sm border-0 p-5">
                  <div
                    className="spinner-border text-primary mb-3"
                    role="status"
                  >
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <h5 className="text-muted">Loading your orders...</h5>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="row justify-content-center">
              <div className="col-md-6">
                <div
                  className="alert alert-danger border-0 shadow-sm"
                  role="alert"
                >
                  An error occurred while fetching your orders. Please try again
                  later.
                </div>
              </div>
            </div>
          ) : orders && orders.length > 0 ? (
            <div className="row">
              <div className="col-12">
                {orders.map((order) => (
                  <div key={order._id} className="card mb-4 border-0 shadow-sm">
                    <div className="card-header bg-dark text-light">
                      <div className="row align-items-center">
                        <div className="col-md-8">
                          <h5 className="mb-2">Order #{order._id}</h5>
                          <small className="fw-bold">
                            Ordered on:{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                        <div className="d-flex justify-content-end mb-2">
                          <span className="fw-bold text-light">
                            Payment Mode: {order.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="card-body">
                      <div className="row">
                        {order.items.map((item) => (
                          <div
                            key={item._id}
                            className="col-md-6 col-lg-4 mb-4"
                          >
                            <div className="card h-100 border-0 shadow-sm">
                              <div className="position-relative">
                                <img
                                  className="card-img-top"
                                  src={item.productImage}
                                  alt={item.productName}
                                  style={{
                                    height: "250px",
                                    objectFit: "cover",
                                  }}
                                />
                                <span className="badge bg-dark position-absolute top-0 end-0 m-2">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="card-body">
                                <h6 className="card-title text-dark fw-bold">
                                  {item.productName}
                                </h6>
                                <div className="d-flex justify-content-between align-items-center">
                                  <span className="badge bg-light text-dark border">
                                    Size: {item.size}
                                  </span>
                                  {item.price && (
                                    <span className="text-dark fw-bold">
                                      {formatPrice(item.price)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="container">
                        <h4
                          style={{ fontFamily: "CopperPlate" }}
                          className="fw-bold"
                        >
                          Delivery Address:
                        </h4>
                        <hr
                          className="border-dark border-3"
                          style={{ width: "230px" }}
                        />
                        <div className="row">
                          {order.address && order.address.length > 0 ? (
                            <div className="col-md-6">
                              <div className="card">
                                <div className="fw-bold card-body">
                                  <p>{order.address[0].street}</p>
                                  <p>
                                    {order.address[0].city} -{" "}
                                    {order.address[0].pincode}
                                  </p>
                                  <p>{order.address[0].state}</p>
                                  <p>{order.address[0].country}</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-12">
                              <p className="text-muted">
                                No delivery address found for this order
                              </p>
                            </div>
                          )}
                        </div>
                      </div>

                      <hr
                        className="border-dark border-3 mx-auto"
                        style={{ width: "100%" }}
                      />

                      <div className="row">
                        <div className="col-12">
                          <div className="d-flex justify-content-between align-items-center">
                            <div>
                              <span className="badge bg-success fs-6 p-2">
                                {order.orderStatus}
                              </span>
                            </div>
                            <div className="text-end">
                              <h4 className="text-dark fw-bold mb-0">
                                Total: {formatPrice(order.totalAmount)}
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="row justify-content-center">
              <div className="col-md-6 text-center">
                <div className="card border-0 shadow-sm p-5">
                  <h3
                    style={{ fontFamily: "Times New Roman" }}
                    className="fw-bold text-dark mb-3"
                  >
                    No Orders Found
                  </h3>
                  <p
                    style={{ fontFamily: "Times New Roman" }}
                    className="text-muted mb-4"
                  >
                    You haven't placed any orders yet.
                  </p>
                  <Link
                    to="/"
                    style={{ fontFamily: "Times New Roman" }}
                    className="btn btn-outline-dark btn-lg"
                  >
                    Start Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
