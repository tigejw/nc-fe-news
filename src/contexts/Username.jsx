import { createContext, useState } from "react";

export const UsernameContext = createContext();
//set default
export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};
