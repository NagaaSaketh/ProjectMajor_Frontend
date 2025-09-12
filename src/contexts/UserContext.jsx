import { createContext, useContext, useState , useEffect } from "react";
import useWishListContext from "./WishListContext";
const UserContext = createContext();

const useUserContext = () => useContext(UserContext);

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try{
        setUser(JSON.parse((savedUser)))
      }catch(err){
        console.log(err);
        localStorage.removeItem('user')
      }
    }
    setLoading(false);
  },[]);
  
  const updateUser = (userData)=>{
    setUser(userData);
    if(userData){
        localStorage.setItem('user',JSON.stringify(userData))
    }else{
        localStorage.removeItem('user')
    }
  };

  const logout = ()=>{
    setUser(null);
    localStorage.removeItem('user')  
  }
  return (
    <>
      <UserContext.Provider value={{ user, setUser:updateUser,logout }}>
        {children}
      </UserContext.Provider>
    </>
  );
}

export default useUserContext;
