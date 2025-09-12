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
  const { handleSearch , search} = useSearchContext();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    toast.success("Logout success");
    navigate("/login");
  };

  return (
    <header className="text-secondary">
      <div className="container px-3 px-lg-4">
        <div className="row align-items-center py-2 py-md-3">
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
                className="form-control ps-5 border-2"
                onChange={handleSearch}
                style={{ width: "500px" }}
                type="text"
                name="searchBox"
                id="search"
                placeholder="Search"
                value={search}
              />
            </div>
          </div>
          <div className="col-6 col-md-3 col-lg-3">
            <div className="d-flex align-items-center justify-content-end gap-3">
              <div className="d-flex align-items-center gap-3">
                {user ? (
                  <p className="">Hi, {user.fullName} </p>
                ) : (
                  <Link
                    to="/signup"
                    className="btn btn-outline-secondary"
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
                    {user ? <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{ fontSize: "9px" }}
                    >
                      {wishList?.length}
                    </span> : "" }
                    
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
                      {user ?  <span
                        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "9px" }}
                      >
                        {cart?.length}
                      </span> : "" }
                     
                    </div>

                    <span className="fw-medium text-secondary ms-1">Cart </span>
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
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="btn btn-outline-secondary"
                  >
                    Logout
                  </button>
                ) : (
                  ""
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
