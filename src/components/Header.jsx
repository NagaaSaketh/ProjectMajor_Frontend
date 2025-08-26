import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import useWishListContext from "../contexts/WishListContext";
const Header = () => {
  const { cart } = useCartContext();
  const { wishList } = useWishListContext();
  return (
    <header className="text-secondary">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4">
            <Link
              to="/"
              style={{ textDecoration: "none", fontSize: "18px" }}
              className="fw-bold text-secondary"
            >
              MyShoppingSite
            </Link>
          </div>
          <div className="col-md-5">
            <div className="position-relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="position-absolute"
                style={{
                  left: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6c757d",
                  zIndex: 10,
                }}
              />

              <input
                className="form-control ps-5"
                style={{ width: "350px" }}
                type="text"
                name="searchBox"
                id="search"
                placeholder="Search"
              />
            </div>
          </div>
          <div className="col-md-3 d-flex align-items-center justify-content-end">
            <button
              className="btn btn-secondary me-3"
              style={{ borderRadius: "1px", width: "100px" }}
            >
              Login
            </button>

            <div className="d-flex align-items-center gap-3">
              <Link to="/wishlist">
                <div className="position-relative d-inline-block">
                  <FontAwesomeIcon
                    icon={faHeart}
                    className="text-muted"
                    style={{ fontSize: "18px", cursor: "pointer" }}
                    title="Wishlist"
                  />
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "9px" }}
                  >
                    {wishList?.length}
                  </span>
                </div>
              </Link>

              <Link style={{ textDecoration: "none" }} to="/cart">
                <div className="d-flex align-items-center">
                  <div className="position-relative d-inline-block">
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      className="text-muted me-1"
                      style={{ fontSize: "18px" }}
                    />
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "9px" }}
                    >
                      {cart?.length}
                    </span>
                  </div>

                  <span className="fw-medium text-secondary ms-1">Cart </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
