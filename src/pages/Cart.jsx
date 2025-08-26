import Header from "../components/Header";
import useCartContext from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
// import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, quantity, increaseQuantity, decreaseQuantity , deleteItem } =
    useCartContext();

  const totalPrice = cart?.reduce((acc, curr) => acc + curr.productPrice, 0);
//   console.log(totalPrice);

  const totalActualPrice =
    cart?.reduce((acc, curr) => acc + curr.actualPrice, 0) || 0;

//   console.log(totalActualPrice);

  const totalDiscount = totalActualPrice - totalPrice;
//   console.log(totalDiscount);

  return (
    <>
      <Header />
      <div className="container">
        <div className="text-center mb-4">
          <h3 style={{fontFamily:"CopperPlate"}}>MY CART ({cart ? cart?.length : 0}) </h3>
          <hr />
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart && cart.length > 0 ? (
              <div>
                {cart.map((item) => (
                  <div key={item._id} className="card mb-4">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-4">
                          <img
                            style={{
                              height: "300px",
                              objectFit: "cover",
                              width: "100%",
                            }}
                            className="img-fluid rounded"
                            src={item.productImage}
                            alt={item.productName}
                          />
                        </div>
                        <div className="col-md-8">
                          <h5 className="card-title mb-3 fw-bold">
                            {item.productName}
                          </h5>

                          <div className="mb-3">
                            <span className="h4 text-dark fw-bold">
                              ₹{item.productPrice}
                            </span>
                            <span className="text-muted text-decoration-line-through ms-2">
                              ₹{item.actualPrice}
                            </span>
                          </div>

                          <div className="mb-3">
                            <span className="text-muted fw-bold">
                              Size: {item.size}
                            </span>
                          </div>

                          <div className="d-flex align-items-center mb-3">
                            <span className="me-3 fw-bold">Quantity:</span>
                            <div className="btn-group" role="group">
                              <button
                                onClick={decreaseQuantity}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
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
                                onClick={increaseQuantity}
                                type="button"
                                className="btn btn-outline-dark btn-sm"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          <div className="d-flex gap-3 mt-4">
                            <button style={{fontFamily:"CopperPlate"}}  className="btn btn-outline-dark">
                              Move to Wishlist
                            </button>
                            <button onClick={()=>deleteItem(item._id)} style={{background:"none",border:"none"}} >
                              <FontAwesomeIcon
                                style={{color: "red" }}
                                className="mt-3"
                                icon={faTrash}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center">
                <p style={{fontFamily:"serif" ,fontSize:"25px"}} className="fw-bold">No Items in cart</p>
              </div>
            )}
          </div>

          <div className="col-md-4">
            <div className="card sticky-top">
              <div className="card-body">
                <h4 className="fw-bold" style={{fontFamily:"TimesNewRoman"}}>Price Details</h4>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold" style={{fontFamily:"TimesNewRoman"}}>Price: Rs. {totalActualPrice * quantity} </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p  className="fw-bold" style={{fontFamily:"TimesNewRoman"}}>Discount: Rs. {totalDiscount ? totalDiscount * quantity : 0} </p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold" style={{fontFamily:"TimesNewRoman"}}>Total Amount to be paid : Rs. {totalPrice * quantity} </p>
                </div>
                <div className="text-center">
                  <button style={{fontFamily:"CopperPlate"}} className="btn btn-outline-dark">
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
