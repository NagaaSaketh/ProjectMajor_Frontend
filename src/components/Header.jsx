import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useCartContext from "../contexts/CartContext";
import useWishListContext from "../contexts/WishListContext";
import useUserContext from "../contexts/UserContext";
import { toast } from "react-toastify";
import useSearchContext from "../contexts/SearchContext";

const Header = () => {
  const { cart } = useCartContext();
  const { wishList } = useWishListContext();
  const { user, logout } = useUserContext();
  const { handleSearch, search } = useSearchContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    toast.success("Logout success");
    navigate("/login");
  };

  return (
    <header className="text-secondary">
      <div className="container px-3">
        <div className="d-flex align-items-center justify-content-between py-2">
          <div className="col-6 col-md-3 col-lg-2">
            <Link
              to="/"
              style={{ textDecoration: "none", fontSize: "18px" }}
              className="fw-bold text-secondary"
            >
              MyShoppingSite
            </Link>
          </div>
          <div className="col-md-6 col-lg-7 d-none d-md-block">
            <div
              className="position-relative mx-auto"
              style={{ maxWidth: "500px" }}
            >
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
                className="form-control ps-5 border-2 w-100"
                onChange={handleSearch}
                type="text"
                name="searchBox"
                id="search"
                placeholder="Search"
                value={search}
              />
            </div>
          </div>
          <div className="col-6 col-md-3 col-lg-3">
            <div className="d-flex align-items-center justify-content-end gap-2 gap-md-3">
              <div className="d-flex align-items-center gap-2 gap-md-3">
                {user ? (
                  <p className="mb-0 d-none d-lg-block">Hi, {user.fullName}</p>
                ) : (
                  <Link
                    to="/signup"
                    className="btn btn-outline-secondary d-none d-md-inline-block"
                    style={{
                      borderRadius: "10px",
                      width: "100px",
                      height: "40px",
                    }}
                  >
                    <span>Sign Up</span>
                  </Link>
                )}

                <Link to="/wishlist">
                  <div className="position-relative d-inline-block">
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="text-muted"
                      style={{ fontSize: "18px", cursor: "pointer" }}
                      title="Wishlist"
                    />
                    {user && wishList?.length > 0 && (
                      <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "9px" }}
                      >
                        {wishList.length}
                      </span>
                    )}
                  </div>
                </Link>

                <Link style={{ textDecoration: "none" }} to="/cart">
                  <div className="d-flex align-items-center">
                    <div className="position-relative d-inline-block mx-1">
                      <FontAwesomeIcon
                        icon={faCartShopping}
                        className="text-muted me-1"
                        style={{ fontSize: "18px" }}
                      />
                      {user && cart?.length > 0 && (
                        <span
                          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                          style={{ fontSize: "9px" }}
                        >
                          {cart.length}
                        </span>
                      )}
                    </div>

                    <span className="fw-medium text-secondary ms-1 d-none d-lg-inline">Cart</span>
                  </div>
                </Link>
                <Link
                  to="/profile"
                  style={{
                    borderRadius: "50%",
                    width: "38px",
                    height: "38px",
                    padding: "0px",
                  }}
                  className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                >
                  <FontAwesomeIcon style={{ fontSize: "16px" }} icon={faUser} />
                </Link>
                {user && (
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline-secondary inline-block"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;