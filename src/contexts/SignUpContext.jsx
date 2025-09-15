import { createContext, useContext } from "react";
import { useState } from "react";
const SignUpContext = createContext();

const useSignUpContext = () => useContext(SignUpContext);

export const SignUpProvider = ({ children }) => {
  const [name, setName] = useState("");
  const [phNum, setPhNum] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState([]);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [country, setCountry] = useState("");

  const handleUserLogin = async (e) => {
    e.preventDefault();
    if (
      !name ||
      phNum.length !== 10 ||
      !email.includes("@") ||
      pass.length <= 8 ||
      !dob ||
      !address
    ) {
      toast.error("Please correctly enter the required details.");
      return;
    }

    try {
      const userData = {
        fullName: name,
        phoneNumber: phNum,
        emailID: email,
        password: pass,
        dateOfBirth: dob,
        address: {
          street: address,
          city: city,
          state: state,
          pincode: parseInt(pinCode),
          country: country,
        },
      };
      console.log(userData);

      const response = await fetch(
        "https://major-project1-backend-ten.vercel.app/user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );

      if (response.status === 409) {
        toast.error("User with this email already exists.");
        return;
      }

      if (!response.ok) {
        throw "Failed to save user info";
      }
      const data = await response.json();
      console.log("Added user:", data);
      toast.success("Account created successfully!");

      setName("");
      setPhNum("");
      setEmail("");
      setPass("");
      setDob("");
      setAddress("");
      setCity("");
      setState("");
      setPinCode("");
      setCountry("");
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  return (
    <SignUpContext.Provider
      value={{
        name,
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
        handleUserLogin,
      }}
    >
      {children}
    </SignUpContext.Provider>
  );
};

export default useSignUpContext;
