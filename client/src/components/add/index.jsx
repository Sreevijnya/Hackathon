import "./styles3.css";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Formik, useFormik } from "formik";
import * as yup from "yup";

const Adduser = () => {
  //const [data, setData] = useState({
  //firstName: "",
  //lastName: "",
  //email: "",
  //password: "",
  //});
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  //const handleChange = ({ currentTarget: input }) => {
  //setData({ ...data, [input.name]: input.value });
  //};

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      pass: "",
      add: "",
      mob: "",
      mark: "",
    },
    validationSchema: yup.object({
      fname: yup
        .string()
        .required("Name is Required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      lname: yup
        .string()
        .required("Name Required")
        .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
      email: yup.string().email().required("Email is Required"),
      pass: yup.string().required("Password is Required"),
      add: yup.string().required("Address is Required"),
      mob: yup
        .string()
        .required("Mobile Number is Required")
        .min(10, "Invalid Number")
        .max(10, "Invalid Nummber")
        .matches(/^\d+$/, "Only digits are allowed"),
      mark: yup
        .string()
        .required("Mark is required")
        .matches(/^[1-9]?[0-9]{1}$|^100$/, "Invaild Mark"),
    }),
    onSubmit: async (values) => {
      try {
        const url = "http://localhost:8000/api/adduser";
        const { values: res } = await axios.post(url, {
          firstName: values.fname,
          lastName: values.lname,
          email: values.email,
          password: values.pass,
          address: values.add,
          mobile: values.mob,
          mark: values.mark,
        });
        console.log(res.message);
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
      if (!error) {
        navigate("/");
      }
    },
  });
  return (
    <div className="signup_container">
      <div className="signup_form_container">
        <div className="left1">
          <h1>Go Back?</h1>
          <button
            type="button"
            className="white_btn"
            onClick={() => navigate("/")}
          >
            Close
          </button>
        </div>
        <div className="right1">
          <form className="form_container" onSubmit={formik.handleSubmit}>
            <h1>Add new User</h1>
            <input
              type="text"
              placeholder="First Name"
              name="fname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.fname}
              required
              multiple
              className="input"
            />
            {formik.touched.fname && formik.errors.fname ? (
              <div className="text-danger">{formik.errors.fname}</div>
            ) : null}
            <input
              type="text"
              placeholder="Last Name"
              name="lname"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.lname}
              required
              multiple
              className="input"
            />
            {formik.touched.lname && formik.errors.lname ? (
              <div className="text-danger">{formik.errors.lname}</div>
            ) : null}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              required
              multiple
              className="input"
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
            <input
              type="password"
              placeholder="Password"
              name="pass"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pass}
              required
              multiple
              className="input"
            />
            {formik.touched.pass && formik.errors.pass ? (
              <div className="text-danger">{formik.errors.pass}</div>
            ) : null}
            <input
              type="text"
              placeholder="Address"
              name="add"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.add}
              required
              multiple
              className="input"
            />
            {formik.touched.add && formik.errors.add ? (
              <div className="text-danger">{formik.errors.add}</div>
            ) : null}
            <input
              type="text"
              placeholder="Mobile Number"
              name="mob"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.mob}
              required
              multiple
              className="input"
            />
            {formik.touched.mob && formik.errors.mob ? (
              <div className="text-danger">{formik.errors.mob}</div>
            ) : null}
            <input
              type="text"
              placeholder="Mark"
              name="mark"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.mark}
              className="input"
            />
            {formik.touched.mark && formik.errors.mark ? (
              <div className="text-danger">{formik.errors.mark}</div>
            ) : null}
            {error && <div className="error_msg">{error}</div>}
            <button type="submit" className="green_btn">
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Adduser;
