import Header from "../components/Header";
import useWishListContext from "../contexts/WishListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, Slide, toast } from "react-toastify";
import { useState } from "react";
import useCartContext from "../contexts/CartContext";

const WishList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    wishList,
    setWishList,
    handleMoveToCartFromWishList,
    removeFromWishlist,
  } = useWishListContext();

  const { handleAddToCart } = useCartContext();

  const moveToCart = async (product, size) => {
    try {
      await handleAddToCart(product, 1, size);
      await removeFromWishlist(product._id);

      setWishList((prevWishList) =>
        prevWishList.filter((item) => item._id !== product._id)
      );
    } catch (err) {
      console.log(err);
      toast.error("Failed to move item to cart.")
    }
  };

  const openSizeModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };
  const handleSizeSelection = (size) => {
    if (!selectedProduct) {
      return;
    }
    moveToCart(selectedProduct, size);
    setSelectedProduct(null);
    setShowModal(false);
  };

  return (
    <>
      <Header />
      <div className="bg-light">
        <div className="container">
          <div className="text-center py-4">
            <h2 style={{ fontFamily: "CopperPlate" }}>
              MY WISHLIST ({wishList.length}){" "}
            </h2>
            <hr />
          </div>
          <div className="row g-4">
            {Array.isArray(wishList) && wishList.length > 0 ? (
              wishList.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="col-12 col-sm-6 col-md-4 col-lg-3"
                  >
                    <div className="card mb-3">
                      <div className="position-relative">
                        <img
                          style={{
                            maxHeight: "250px",
                            width: "100%",
                            objectFit: "cover",
                          }}
                          className="img-fluid "
                          src={item.productImage}
                          alt={item.productName}
                        />
                      </div>
                      <div className="card-body d-flex flex-column justify-content-between text-center py-2">
                        <p className="fw-bold">{item.productName}</p>
                        <p className="fw-bold">Rs.{item.productPrice}</p>
                        <div className="d-flex justify-content-evenly">
                          <button
                            onClick={() => openSizeModal(item)}
                            style={{ fontFamily: "CopperPlate" }}
                            className="btn btn-outline-dark"
                          >
                            Move to Cart
                          </button>
                          <button
                            onClick={() => removeFromWishlist(item._id)}
                            className="btn"
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center mt-4">Your Wishlist is empty</p>
            )}
          </div>
        </div>
        {showModal && (
          <>
            <div className="modal-backdrop fade show"></div>
            <div
              className="modal fade show"
              style={{ display: "block" }}
              tabIndex="-1"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    Please select a size
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setShowModal(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body d-flex gap-2 flex-wrap justify-content-center">
                    {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                      <button
                        style={{ fontFamily: "CopperPlate" }}
                        key={size}
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => {
                          handleSizeSelection(size);
                          setShowModal(false);
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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

export default WishList;
