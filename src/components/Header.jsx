import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="text-secondary">
      <div className="container py-3">
        <div className="row">
          <div className="col-md-4">
            <Link to="/" style={{textDecoration:"none",fontSize:"18px"}} className="fw-bold text-secondary">MyShoppingSite</Link>
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
              <FontAwesomeIcon
                icon={faHeart}
                className="text-muted position-relative"
                style={{ fontSize: "18px", cursor: "pointer" }}
                title="Wishlist"
              />
              

              <div
                className="d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  className="text-muted me-1"
                  style={{ fontSize: "18px" }}
                />
                <span className="fw-medium text-secondary">Cart</span>
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
