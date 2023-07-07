import React, { useContext } from "react";
import "../styles/home.css";
import { useFormik } from "formik";
import { GlobalMethodsContext } from "../Context/GlobalMethodsContext";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { createUrl } = useContext(GlobalMethodsContext);
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log("ok");
    console.log(JSON.stringify(values));
    const res = await createUrl(values);

    console.log("result->", res);
    actions.resetForm();
    if (res === 201) {
      navigate("/result");
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
            placeholder="Enter the Link here"
            onBlur={handleBlur}
          />
        </form>
        <div
          disabled={isSubmitting}
          onClick={handleSubmit}
          type="submit"
          className="button"
        >
          Shorten URL
        </div>
      </div>
      <ToastContainer />
      <div className="details">
        <p>
          ShortURL is a free tool to shorten URLs and generate short links. URL
          shortener allows you to create a shortened link, making it easy to
          share. <span>Click here</span> to know the history of a shortened URL.
        </p>
      </div>
    </div>
  );
};

export default Home;
