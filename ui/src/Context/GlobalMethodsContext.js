import { GlobalStateContext } from "./Global_Context";
import React, { createContext, useContext } from "react";
import axios from "axios";

const GlobalMethodsContext = createContext();

const GlobalMethodsProvider = ({ children }) => {
  const { setUrl, setLongUrl, setHistory } = useContext(GlobalStateContext);

  const createUrl = async (values) => {
    try {
      const url = "http://localhost:4001/url/";
      const response = await axios({
        method: "POST",
        url,
        data: values,
      });
      console.log("name: ", response.data.id);
      setUrl(response.data.id);
      setLongUrl(response.data.longUrl);
      return response.status;
    } catch (error) {
      console.log(error.message);
      return 401;
    }
  };

  const getHistory = async (values) => {
    try {
      const url = "http://localhost:4001/url/analytics/:shortId";
      const response = await axios({
        method: "GET",
        url,
        data: values,
      });
      console.log("name: ", response);
      setHistory(response);
      return response.status;
    } catch (error) {
      console.log(error.message);
      return 401;
    }
  };

  return (
    <GlobalMethodsContext.Provider
      value={{
        createUrl,
        getHistory,
      }}
    >
      {children}
    </GlobalMethodsContext.Provider>
  );
};
export { GlobalMethodsContext, GlobalMethodsProvider };
