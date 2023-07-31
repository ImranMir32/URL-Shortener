import { React, useContext } from "react";
import "../styles/home.css";
import { GlobalStateContext } from "../Context/Global_Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Result = () => {
  const { url, longUrl } = useContext(GlobalStateContext);
  const navigate = useNavigate();
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
    <div className="container">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        Free URL Shortener
      </h1>

      <div className="main">
        <input value={url || ""} readOnly />
        <div onClick={handleCopy} className="button">
          Copy
        </div>
        <ToastContainer />
      </div>
      {/* <div className="details">
       
      </div> */}

      <div className="details">
        <h2>Long Url:</h2>
        <a href={longUrl} target="_blank" rel="noreferrer">
          {longUrl}
        </a>
        <div className="details-info">
          <p>
            Copy the shortened link and share it in messages, texts, posts,
            websites and other locations.{" "}
            <span
              onClick={() => {
                navigate("/show-history");
              }}
            >
              Click here
            </span>{" "}
            to know the history of a shortened URL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
