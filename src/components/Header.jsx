import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
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
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogOut = () => {
    logout();
    toast.success("Logout success");
    navigate("/login");
  };

  return (
    <header className="text-secondary">
      <div className="container px-3">
        <div className="d-flex align-items-center justify-content-between py-2">
          {/* Logo */}
          <div className="col-6 col-md-3 col-lg-2">
            <Link
              to="/"
              style={{ textDecoration: "none", fontSize: "18px" }}
              className="fw-bold text-secondary"
            >
              MyShoppingSite
            </Link>
          </div>

          {/* Desktop Search */}
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
                className="form-control ps-5 border-2"
                onChange={handleSearch}
                style={{ width: "100%", maxWidth: "500px" }}
                type="text"
                name="searchBox"
                id="search"
                placeholder="Search"
                value={search}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="col-6 col-md-3 col-lg-3 d-none d-md-block">
            <div className="d-flex align-items-center justify-content-end gap-2 gap-md-3">
              {user ? (
                <p className="mb-0 d-none d-lg-block">Hi, {user.fullName}</p>
              ) : (
                <Link
                  to="/signup"
                  className="btn btn-outline-secondary d-none d-lg-block"
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
                  <div className="position-relative d-inline-block">
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
                  <span className="fw-medium text-secondary ms-1 d-none d-lg-inline">
                    Cart
                  </span>
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
                  className="btn btn-outline-secondary d-none d-lg-block"
                >
                  Logout
                </button>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="col-6 d-md-none">
            <div className="d-flex align-items-center justify-content-end gap-2">
              {/* Mobile Search Toggle */}
              <button
                className="btn p-1"
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                style={{ border: "none" }}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="text-muted"
                  style={{ fontSize: "18px" }}
                />
              </button>

              {/* Mobile Cart */}
              <Link to="/cart" className="position-relative">
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-muted"
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
              </Link>

              {/* Mobile Menu Toggle */}
              <button
                className="btn p-1"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                style={{ border: "none" }}
              >
                <FontAwesomeIcon
                  icon={showMobileMenu ? faTimes : faBars}
                  className="text-muted"
                  style={{ fontSize: "18px" }}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="d-md-none pb-3">
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
                className="form-control ps-5 border-2"
                onChange={handleSearch}
                type="text"
                name="mobileSearchBox"
                placeholder="Search"
                value={search}
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="d-md-none border-top pt-3">
            <div className="d-flex flex-column gap-3">
              {user ? (
                <div className="d-flex align-items-center justify-content-between">
                  <span>Hi, {user.fullName}</span>
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline-secondary btn-sm"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  to="/signup"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowMobileMenu(false)}
                >
                  Sign Up
                </Link>
              )}

              <Link
                to="/wishlist"
                className="d-flex align-items-center gap-2 text-decoration-none text-secondary"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span>Wishlist</span>
                {user && wishList?.length > 0 && (
                  <span className="badge bg-danger">{wishList.length}</span>
                )}
              </Link>

              <Link
                to="/profile"
                className="d-flex align-items-center gap-2 text-decoration-none text-secondary"
                onClick={() => setShowMobileMenu(false)}
              >
                <FontAwesomeIcon icon={faUser} />
                <span>Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;