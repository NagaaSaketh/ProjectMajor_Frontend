import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import useUserContext from "../contexts/UserContext";
import useAddressContext from "../contexts/AddressesContext";
import { useState, useEffect } from "react";
import { ToastContainer, Slide } from "react-toastify";

const ManageProfile = () => {
  const { user } = useUserContext();

  const { addresses, editAddress, addAddress, deleteAddress, fetchAddresses } =
    useAddressContext();

  useEffect(() => {
    if (user?._id) {
      fetchAddresses();
    }
  }, [user]);

  // console.log(addresses);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [formData, setFormData] = useState({
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editForm) {
        await editAddress(formData);
        await fetchAddresses();
      } else {
        await addAddress(formData);
      }

      setFormData({
        street: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
      setShowModal(false);

      console.log("Address added successfully!");
    } catch (error) {
      console.error("Failed to add address:", error);
    } 
  };

  const handleDelete = async (addr) => {
    try {
      await deleteAddress(addr);
      console.log("Address deleted successfully!");
    } catch (error) {
      console.error("Failed to delete address:", error);
    }finally{
      setLoading(false)
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setFormData({
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
  };

  const openAddAddressModal = () => {
    setEditForm(false);
    setFormData({
      street: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
    });
    setShowModal(true);
  };

  const openEditAddressModal = (addr) => {
    setEditForm(true);
    setFormData(addr);
    setShowModal(true);
  };

  return (
    <>
      <div className="container">
        <div className="py-3">
          <div className="row">
            <div className="col-md-7">
              <div className="card">
                <div className="card-body">
                  <h5 className="fw-bold">Name : </h5>
                  <h5 className="fw-bold">{user?.fullName}</h5>
                </div>
              </div>
              <div className="card mt-4">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">Select your address:</h5>
                    <div className="d-flex justify-content-between mb-4">
                      <button onClick={openAddAddressModal} className="btn">
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>

                  {!addresses ? (
                    <p>Loading...</p>
                  ) : addresses.length > 0 ? (
                    <div>
                      {addresses.map((addr, i) => (
                        <div key={addr._id} className="mb-3">
                          <div className="card-body py-2">
                            <div className="d-flex justify-content-between">
                              <h5 className="fw-bold">Address {i + 1}:</h5>
                              <div className="d-flex gap-2">
                                <button
                                  onClick={() => openEditAddressModal(addr)}
                                  className="btn"
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                  onClick={() => handleDelete(addr)}
                                  className="btn"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>

                            <p className="mb-1">{addr.street}</p>
                            <p className="mb-1">
                              {addr.city}, {addr.state} - {addr.pincode}
                            </p>
                            <p className="mb-0">{addr.country}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No Address found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
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
                  {editForm ? "Edit Address" : "Add New Address"}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                    aria-label="Close"
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="street" className="form-label">
                        Street
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="street"
                        name="street"
                        value={formData.street || ""}
                        onChange={handleInputChange}
                        placeholder="Enter street address"
                        required
                      />
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="city" className="form-label">
                            City
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="city"
                            name="city"
                            value={formData.city || ""}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="state" className="form-label">
                            State
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="state"
                            name="state"
                            value={formData.state || ""}
                            onChange={handleInputChange}
                            placeholder="Enter state"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="pincode" className="form-label">
                            Pincode
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="pincode"
                            name="pincode"
                            value={formData.pincode || ""}
                            onChange={handleInputChange}
                            placeholder="Enter pincode"
                            pattern="[0-9]{6}"
                            title="Please enter a valid 6-digit pincode"
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="country" className="form-label">
                            Country
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="country"
                            name="country"
                            value={formData.country || ""}
                            onChange={handleInputChange}
                            placeholder="Enter country"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={handleClose}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={loading}
                    >
                      {loading ? (editForm ? "Saving..." : "Adding...") : editForm ? "Save Changes" : "Add Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
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

export default ManageProfile;
