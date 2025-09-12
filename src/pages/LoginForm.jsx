import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { useState } from "react";
import useUserContext from "../contexts/UserContext";
import { ToastContainer,Slide,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useUserContext();
  const navigate = useNavigate();

  
  async function handleUserLogin(e) {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };
    const response = await fetch("https://major-project1-backend-ten.vercel.app/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setUser(data.user);
      toast.success("Login Success");
      navigate("/");
    } else {
      console.error("Login failed", data.message);
    }
  }

  return (
    <>
      <Header />
      <div className="container-fluid d-flex justify-content-center align-items-center py-5">
        <div className="row justify-content-center w-100">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6">
            <div className="card bg-light">
              <div className="card-body p-4">
                <div className="text-center mb-4">
                  <h1 style={{ fontFamily: "CopperPlate" }}>MyShoppingSite</h1>
                </div>
                <div className="mb-4">
                  <h3 className="fw-bold text-center mb-2">Login</h3>
                  <hr />
                </div>

                <form onSubmit={handleUserLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pass" className="form-label">
                      Password
                    </label>
                    <input
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Enter your password"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="mb-4 fw-bold btn btn-outline-dark"
                    >
                      Continue
                    </button>
                    <p>
                      Don't have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to="/signup">
                        Sign up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
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
}

export default LoginForm;
