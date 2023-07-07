import React, { createContext, useState } from "react";

const GlobalStateContext = createContext();

const GlobalStateProvider = ({ children }) => {
  const [url, setUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");
  const [history, setHistory] = useState({});
  return (
    <GlobalStateContext.Provider
      value={{
        url,
        setUrl,
        longUrl,
        setLongUrl,
        history,
        setHistory,
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export { GlobalStateContext, GlobalStateProvider };
