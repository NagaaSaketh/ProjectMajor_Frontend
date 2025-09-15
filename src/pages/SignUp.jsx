import { toast, ToastContainer, Slide } from "react-toastify";
import { useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import useSignUpContext from "../contexts/SignUpContext";
const SignUp = () => {
  const {name,
        setName,
        phNum,
        setPhNum,
        email,
        setEmail,
        pass,
        setPass,
        dob,
        setDob,
        address,
        setAddress,
        city,
        setCity,
        state,
        setState,
        pinCode,
        setPinCode,
        country,
        setCountry,
        handleUserLogin} = useSignUpContext(); 
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
                  <h3 className="mb-2">Sign Up</h3>
                  <p className="fw-light mb-0">
                    Enter your information to create your account
                  </p>
                </div>

                <form onSubmit={handleUserLogin}>
                  <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                      Full Name
                    </label>
                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      className="form-control"
                      id="fullName"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone Number
                    </label>
                    <input
                      onChange={(e) => setPhNum(e.target.value)}
                      value={phNum}
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                    />
                  </div>

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
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      type="password"
                      className="form-control"
                      id="pass"
                      placeholder="Enter your password"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dob" className="form-label">
                      Date of Birth
                    </label>
                    <input
                      onChange={(e) => setDob(e.target.value)}
                      value={dob}
                      type="date"
                      className="form-control"
                      id="dob"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <textarea
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                      className="form-control"
                      id="address"
                      rows="4"
                      placeholder="Enter your address"
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      onChange={(e) => setCity(e.target.value)}
                      value={city}
                      type="text"
                      className="form-control"
                      id="city"
                      placeholder="Enter your city name"
                    />
                  </div>


                  <div className="mb-3">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      onChange={(e) => setState(e.target.value)}
                      value={state}
                      type="text"
                      className="form-control"
                      id="state"
                      placeholder="Enter your state"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="pinCode" className="form-label">
                      Pin Code
                    </label>
                    <input
                      onChange={(e) => setPinCode(e.target.value)}
                      value={pinCode}
                      type="number"
                      className="form-control"
                      id="pinCode"
                      placeholder="Enter your pincode"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="country" className="form-label">
                      Country
                    </label>
                    <input
                      onChange={(e) => setCountry(e.target.value)}
                      value={country}
                      type="text"
                      className="form-control"
                      id="country"
                      placeholder="Enter your country"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mb-4 btn btn-outline-dark w-100"
                  >
                    Continue
                  </button>
                  <p>
                    Have an account?
                    <Link style={{ textDecoration: "none" }} to="/profile">
                      {" "}
                      Login
                    </Link>
                  </p>
                </form>

                <div className="d-flex justify-content-center gap-4 mt-4 pt-3 border-top">
                  <a
                    style={{ textDecoration: "none" }}
                    href="#"
                    className="text-primary"
                  >
                    Privacy Policy
                  </a>
                  <a
                    style={{ textDecoration: "none" }}
                    href="#"
                    className="text-primary"
                  >
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
        position="top-center"
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
export default SignUp;
