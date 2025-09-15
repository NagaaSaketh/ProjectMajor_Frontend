import { createContext, useContext, useState, useEffect } from "react";
import useUserContext from "./UserContext";
import { toast } from "react-toastify";
const AddressContext = createContext();

const useAddressContext = () => useContext(AddressContext);

export const AddressProvider = ({ children }) => {
  const { user } = useUserContext();
  const [addresses, setAddress] = useState([]);

  useEffect(() => {
    if (user?._id) {
      fetchAddresses();
    }
  }, [user]);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/address/${user._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const userAddresses = await response.json();
        setAddress(userAddresses);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    }
  };

  const editAddress = async (address) => {
  try {
    const response = await fetch(
      `https://major-project1-backend-ten.vercel.app/user/addresses/address/${address._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(address),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to edit address");
    }

    const updatedAddress = await response.json();
    toast.success("Address updated successfully!");
    // console.log(updatedAddress);
    

    setAddress((prevVal) =>
      prevVal.map((addr) =>
        addr._id === updatedAddress._id ? updatedAddress : addr
      )
    );
  } catch (err) {
    console.log(err);
    toast.error("Error updating address!");
  }
};
  const addAddress = async (address) => {
    try {
      const newAddress = {
        userID: user._id,
        street: address.street,
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        country: address.country,
      };

      const response = await fetch("https://major-project1-backend-ten.vercel.app/address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddress),
      });

      const result = await response.json();
      console.log("Address added successfully:", newAddress);
      toast.success("Address added successfully!");

      setAddress((prevVal) => [...prevVal, result]);

      if (!response.ok && !result) {
        throw new Error("Failed to add a new address.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteAddress = async (address) => {
    try {
      const response = await fetch(
        `https://major-project1-backend-ten.vercel.app/user/address/${address._id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to delete address: ${errorText}`);
      }

      const data = await response.json();
      console.log("Address Deleted:", data);
      toast.success("Address deleted successfully!");

      setAddress((prevVal) =>
        prevVal.filter((addr) => addr._id !== address._id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AddressContext.Provider
      value={{
        addresses,
        editAddress,
        addAddress,
        deleteAddress,
        fetchAddresses,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export default useAddressContext;
