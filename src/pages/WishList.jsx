import Header from "../components/Header";
import useWishListContext from "../contexts/WishListContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
const WishList = () => {
  const { wishList } = useWishListContext();
  console.log(wishList);

  return (
    <>
      <Header />
      <div className="container">
        <div className="text-center py-2">
          <h2 style={{ fontFamily: "CopperPlate" }}>
            MY WISHLIST ({wishList.length}){" "}
          </h2>
          <hr />
        </div>
        <div className="row g-4">
          {wishList && wishList.length > 0 ? (
            wishList.map((item) => {
              return (
                <div key={item.productId} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <div className="card">
                    <div className="position-relative">
                      <img
                      
                      style={{ maxHeight:"250px",width:"100%", objectFit: "cover" }}
                        className="img-fluid "
                        src={item.productImage}
                        alt={item.productName}
                      />
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="text-danger position-absolute top-0 end-0 p-2"
                        style={{ fontSize: "18px", cursor: "pointer" }}
                        title="Wishlist"
                      />
                    </div>
                    <div className="card-body d-flex flex-column justify-content-between text-center py-2">
                      <p className="fw-bold">{item.productName}</p>
                      <p className="fw-bold">Rs.{item.productPrice}</p>
                      <button
                        style={{ fontFamily: "CopperPlate" }}
                        className="btn btn-outline-dark"
                      >
                        Move to Cart
                      </button>
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
    </>
  );
};

export default WishList;
