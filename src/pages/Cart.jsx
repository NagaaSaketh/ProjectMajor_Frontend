import Header from "../components/Header";
import useCartContext from "../contexts/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useUserContext from "../contexts/UserContext";
import useAddressContext from "../contexts/AddressesContext";
import { toast, ToastContainer, Slide } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Cart = () => {
  const navigate = useNavigate();
  const [paymentMode, setPaymentMode] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddAddressForm, setShowAddAddressForm] = useState(false);

  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    deleteItem,
    handleMoveToWishListFromCart,
    clearCart
  } = useCartContext();

  console.log(cart);
  
  const { user } = useUserContext();
  const { addresses } = useAddressContext();

  const totalPrice = cart?.reduce((acc, curr) => acc + curr.productPrice * curr.quantity, 0);
  const totalActualPrice =
    cart?.reduce((acc, curr) => acc + (curr.actualPrice * curr.quantity), 0) || 0;
  const totalDiscount = totalActualPrice - totalPrice;

  const handleProceedToCheckout = () => {
    if (!user) {
      toast.error("Please login to continue");
      return;
    }
    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    if (!paymentMode) {
      toast.info("Please select your preferred mode of payment.");
      return;
    }

    setShowAddressModal(true);
  };

  const handleAddressSelection = () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    setShowAddressModal(false);
    handleCheckOut(cart, user, paymentMode, selectedAddress);
  };

  const handleCheckOut = async (
    cartItems,
    user,
    paymentMode,
    selectedAddress
  ) => {
    try {
      const calculateTotalAmount = () => {
        return cartItems.reduce((acc, curr) => {
          return acc + curr.productPrice * curr.quantity;
        }, 0);
      };

      const orderData = {
        userID: user._id,
        items: cartItems.map((item) => ({
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          size: item.size,
          quantity: item.quantity,
          price: item.productPrice,
        })),
        address: {
          street: selectedAddress.street,
          city: selectedAddress.city,
          state: selectedAddress.state,
          pincode: selectedAddress.pincode,
          country: selectedAddress.country,
        },
        totalAmount: calculateTotalAmount(),
        paymentMethod: paymentMode,
      };

      const response = await fetch("https://major-project1-backend-ten.vercel.app/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok && result) {

        await clearCart(user._id);
        toast.success("Order placed successfully!");
        setTimeout(() => {
          navigate("/profile");
        }, 3000);
      } else {
        toast.error("Failed to place order.");
      }
    } catch (err) {
      console.log(err);
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container">
          <div className="text-center py-2">
            <h2 className="pt-4" style={{ fontFamily: "CopperPlate" }}>
              MY CART ({cart ? cart?.length : 0}){" "}
            </h2>
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
                                  onClick={() => decreaseQuantity(item._id)}
                                  type="button"
                                  className="btn btn-outline-dark btn-sm"
                                >
                                  -
                                </button>
                                <input
                                  type="text"
                                  className="form-control text-center mx-2"
                                  value={item.quantity}
                                  style={{ width: "45px" }}
                                  readOnly
                                />
                                <button
                                  onClick={() => increaseQuantity(item._id)}
                                  type="button"
                                  className="btn btn-outline-dark btn-sm"
                                >
                                  +
                                </button>
                              </div>
                            </div>

                            <div className="d-flex gap-3 mt-4">
                              <button
                                onClick={() =>
                                  handleMoveToWishListFromCart(item)
                                }
                                style={{ fontFamily: "CopperPlate" }}
                                className="btn btn-outline-dark"
                              >
                                Move to Wishlist
                              </button>
                              <button
                                onClick={() => deleteItem(item._id)}
                                style={{ background: "none", border: "none" }}
                              >
                                <FontAwesomeIcon
                                  style={{ color: "red" }}
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
                  <p
                    style={{ fontFamily: "serif", fontSize: "25px" }}
                    className="fw-bold"
                  >
                    No Items in cart
                  </p>
                </div>
              )}
            </div>

            <div className="col-md-4">
              <div className="card sticky-top">
                <div className="card-body">
                  <h4
                    className="fw-bold"
                    style={{ fontFamily: "TimesNewRoman" }}
                  >
                    Price Details
                  </h4>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p
                      className="fw-bold"
                      style={{ fontFamily: "TimesNewRoman" }}
                    >
                      Price: Rs. {totalActualPrice}{" "}
                    </p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p
                      className="fw-bold"
                      style={{ fontFamily: "TimesNewRoman" }}
                    >
                      Discount: Rs.{" "}
                      {totalDiscount ? totalDiscount: 0}{" "}
                    </p>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p
                      className="fw-bold"
                      style={{ fontFamily: "TimesNewRoman" }}
                    >
                      Total Amount to be paid : Rs. {totalPrice}{" "}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{ fontFamily: "TimesNewRoman", fontSize: "18px" }}
                      className="fw-bold"
                    >
                      Select your preferred payment method:
                    </p>
                  </div>

                  <div className="mb-3 form-check">
                    <label className="fw-bold form-check-label" htmlFor="upi">
                      <input
                        className="form-check-input"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        checked={paymentMode === "UPI"}
                        type="radio"
                        id="upi"
                        value="UPI"
                        name="paymentmethods"
                      />
                      UPI
                    </label>
                  </div>
                  <div className="mb-3 form-check">
                    <label
                      className="fw-bold form-check-label"
                      htmlFor="credit"
                    >
                      <input
                        className="form-check-input"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        checked={paymentMode === "Credit Card"}
                        type="radio"
                        id="credit"
                        value="Credit Card"
                        name="paymentmethods"
                      />
                      Credit Card
                    </label>
                  </div>
                  <div className="mb-3 form-check">
                    <label className="fw-bold form-check-label" htmlFor="debit">
                      <input
                        className="form-check-input"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        checked={paymentMode === "Debit Card"}
                        type="radio"
                        id="debit"
                        value="Debit Card"
                        name="paymentmethods"
                      />
                      Debit Card
                    </label>
                  </div>
                  <div className="mb-3 form-check">
                    <label className="fw-bold form-check-label" htmlFor="cod">
                      <input
                        className="form-check-input"
                        onChange={(e) => setPaymentMode(e.target.value)}
                        checked={paymentMode === "COD"}
                        type="radio"
                        id="cod"
                        value="COD"
                        name="paymentmethods"
                      />
                      COD
                    </label>
                  </div>

                  <div className="text-center">
                    <button
                      onClick={handleProceedToCheckout}
                      style={{ fontFamily: "CopperPlate" }}
                      className="btn btn-outline-dark"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showAddressModal ? "show" : ""}`}
        style={{ display: showAddressModal ? "block" : "none" }}
        tabIndex="-1"
        aria-labelledby="addressModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title fw-bold"
                id="addressModalLabel"
                style={{ fontFamily: "CopperPlate" }}
              >
                Choose your Delivery Address
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddressModal(false)}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <>
                {addresses && addresses.length > 0 ? (
                  <div>
                    {addresses.map((address) => (
                      <div key={address._id} className="card mb-3">
                        <div className="card-body">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              name="addressSelection"
                              id={`address-${address._id}`}
                              onChange={() => setSelectedAddress(address)}
                              checked={selectedAddress?._id === address._id}
                            />
                            <label
                              className="form-check-label w-100"
                              htmlFor={`address-${address._id}`}
                            >
                              <div className="d-flex justify-content-between align-items-start">
                                <div>
                                  <strong>{address.street}</strong>
                                  <br />
                                  {address.city}, {address.state}
                                  <br />
                                  {address.country} - {address.pincode}
                                </div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center mb-3">
                    <p className="text-muted">
                      No addresses found. Please add a new address.
                    </p>
                  </div>
                )}
              </>
            </div>
            <div className="modal-footer">
              {!showAddAddressForm && (
                <>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddressModal(false)}
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleAddressSelection}
                    disabled={!selectedAddress}
                  >
                    Confirm & Place Order
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && <div className="modal-backdrop fade show"></div>}

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

export default Cart;
