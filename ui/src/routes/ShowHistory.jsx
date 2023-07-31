import { React, useState, useContext } from "react";
import "../styles/home.css";
import { useFormik } from "formik";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ShowHistory = () => {
  const { getHistory } = useContext(GlobalMethodsContext);
  const { history } = useContext(GlobalStateContext);
  const [show, setShow] = useState(true);

  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log("ok");
    console.log(JSON.stringify(values));

    const parts = values.url.split("/");
    const onlyUrl = parts[parts.length - 1];
    console.log(onlyUrl);
    const res = await getHistory(onlyUrl);
    if (res === 201) {
      setShow(false);
      console.log("-->", history);
      //   setUrl(res.data.longUrl);
    } else {
      toast.error("Url required", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const covertIntoTime = (timestamp) => {
    const date = new Date(timestamp);

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const obj = {
      Datetime: `${day}-${month}-${year}`,
      Time: `${hours}:${minutes}:${seconds}`,
    };

    return obj;
  };

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      url: "",
    },
    onSubmit,
  });

  console.log(errors);

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
        <form class="form" onSubmit={handleSubmit} autoComplete="off">
          <input
            value={values.url}
            onChange={handleChange}
            id="url"
            type="url"
            placeholder="Enter the Shorten URL"
            onBlur={handleBlur}
          />
        </form>
        <div
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
          className="button"
        >
          Get History
        </div>
      </div>
      {show ? (
        <div className="details">
          <p>Enter the Shorten URL to get the history</p>
        </div>
      ) : (
        <div className="details">
          <h2>Long Url:</h2>
          <a href={history.data.longUrl} target="_blank" rel="noreferrer">
            <span className="longurl">{history.data.longUrl}</span>
          </a>

          <div>
            <p>Total visits: {history.data.totalClicks}</p>
            <p>History</p>
            <div className="history">
              <div className="history-info">
                <div className="info">Time</div>
                <div className="info">Date</div>
              </div>
              {history.data.analytics.map((list) => (
                <div key={list._id} className="time-date">
                  <p className="line">{covertIntoTime(list.timestamp).Time}</p>
                  <p>-</p>
                  <p>{covertIntoTime(list.timestamp).Datetime}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ShowHistory;
