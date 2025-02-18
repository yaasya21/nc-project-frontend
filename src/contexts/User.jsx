import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const User = createContext();

export const UserProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);   

  useEffect(() => {
    const fetchUser = () => {
      axios
        .get("https://nc-project-iwre.onrender.com/api/users/weegembump") 
        .then((response) => {
          setLoggedInUser(response.data.user);
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setError(error); 
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading user...</div>; 
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  if (!loggedInUser) {
    return <div>User not found or not logged in.</div>
  }

  return (
    <User.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </User.Provider>
  );
};