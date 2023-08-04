import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const [destination, setDestination] = useState(null);
  const [userProfilePhoto, setUserProfilePhoto] = useState(null);

  const handleLogin = (user) => {
    setUser(user);
    setIsLoading(false);
  };

  const storeUserProfileImage = (data) => {
    setUserProfilePhoto(data);
  };

  const handleLogout = () => {
    setDestination(null);
    setResult(null);
    setUser(null);
    localStorage.clear();
  };

  const handleDestinationSave = (route) => {
    setDestination(route);
  };

  const handleDestinationClear = () => {
    setDestination(null);
  };

  const handleResultSave = (result) => {
    setResult(result);
  };

  const handleResultClear = () => {
    setResult(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
        isLoading,
        handleDestinationSave,
        handleDestinationClear,
        destination,
        handleResultSave,
        handleResultClear,
        storeUserProfileImage,
        userProfilePhoto,
        result,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
