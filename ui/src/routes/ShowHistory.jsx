import { React, useState, useContext } from "react";
import "../styles/home.css";
import { useFormik } from "formik";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { GlobalStateContext } from "../Context/Global_Context";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const ShowHistory = () => {
  const { getHistory } = useContext(GlobalMethodsContext);
  const { history } = useContext(GlobalStateContext);
  const [show, setShow] = useState(true);
  //   const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log("ok");
    console.log(JSON.stringify(values));
    const res = await getHistory(values);
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
    <div>
      <h1>Free URL Shortener</h1>
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
          <p>
            Long Url:{" "}
            <a href={history.data.longUrl} target="_blank" rel="noreferrer">
              <span className="longurl">{history.data.longUrl}</span>
            </a>
          </p>
          <p>Total visits: {history.data.totalClicks}</p>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default ShowHistory;
