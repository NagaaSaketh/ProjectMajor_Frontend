import useUserContext from "../contexts/UserContext";

import LoginForm from "./LoginForm";
import Orders from "../components/Orders";
import Header from "../components/Header";
import { useState } from "react";
import ManageProfile from "./ManageProfile";

const Profile = () => {
  const { user } = useUserContext();
  const [tab, setTab] = useState("profile");

  if (!user) {
    return (
      <>
        <LoginForm />
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="container">
        <div className="d-flex align-items-center gap-2">
          <button
            style={{ fontFamily: "CopperPlate" }}
            className="btn btn-outline-dark"
            onClick={() => setTab("profile")}
          >
            Profile
          </button>
          <button
            style={{ fontFamily: "CopperPlate" }}
            className="btn btn-outline-dark"
            onClick={() => setTab("orders")}
          >
            Orders
          </button>
        </div>
      </div>

      {tab === "profile" && <ManageProfile />}
      {tab === "orders" && <Orders />}
      <div></div>
    </>
  );
};

export default Profile;
