import { React, useContext } from "react";
import "../styles/home.css";
import { GlobalStateContext } from "../Context/Global_Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Result = () => {
  const { url, longUrl } = useContext(GlobalStateContext);
  console.log(url);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`http://localhost:4001/url/${url}`);
      toast.success("Shorten URL copied to clipboard", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  return (
    <div>
      <h1>Your shortened URL</h1>

      <div className="main">
        <input value={url || ""} readOnly />
        <div onClick={handleCopy} className="button">
          Copy
        </div>
        <ToastContainer />
      </div>
      <div className="details">
        <p>
          Long Url:{" "}
          <a href={longUrl} target="_blank" rel="noreferrer">
            <span className="longurl">{longUrl}</span>
          </a>
        </p>
      </div>

      <div className="details">
        <p>
          Copy the shortened link and share it in messages, texts, posts,
          websites and other locations.<span>Click here</span> to know the
          history of a shortened URL.
        </p>
      </div>
    </div>
  );
};

export default Result;
