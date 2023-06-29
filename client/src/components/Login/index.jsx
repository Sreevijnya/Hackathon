import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./styles1.css";
import { Formik, useFormik } from "formik";
import * as yup from "yup";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

const Login = () => {
  //const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [adminerror, setadminerror] = useState("");

  // const handleChange = ({ currentTarget: input }) => {
  //   setData({ ...data, [input.name]: input.value });
  // };

  const formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    validationSchema: yup.object({
      email: yup.string().email().required("Email Required"),
      pass: yup.string().required("Password Required"),
    }),

    onSubmit: async (values) => {
      try {
        const url = "http://localhost:8000/api/auth";
        const { values: res } = await axios
          .post(url, {
            email: values.email,
            password: values.pass,
          })
          .then((res) => {
            const data = res.data;
            localStorage.setItem("token", data.data);
            window.location = "/";
          });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
      try {
        const adminurl = "http://localhost:8000/api/auth/login";
        const { values: res } = await axios.post(adminurl, {
          email: values.email,
          password: values.pass,
        });
        localStorage.setItem("token1", [values.email, values.pass]);
        window.location = "/";
      } catch (adminerror) {
        if (
          adminerror.response &&
          adminerror.response.status >= 400 &&
          adminerror.response.status <= 500
        ) {
          setadminerror(adminerror.response.data.message);
        }
      }
    },
  });
  return (
    <div className="login_container">
      <div className="login_form_container">
        <div className="left">
          <form className="form_container" onSubmit={formik.handleSubmit}>
            <h1>Login to Your Account</h1>
            <div>
              <AccountCircleIcon sx={{ fontSize: 35 }} />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
                className="input"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-danger">{formik.errors.email}</div>
            ) : null}
            <div>
              <VpnKeyIcon sx={{ fontSize: 35 }} />
              <input
                type="password"
                placeholder="Password"
                name="pass"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.pass}
                required
                className="input"
              />
            </div>
            {formik.touched.pass && formik.errors.pass ? (
              <div className="text-danger">{formik.errors.pass}</div>
            ) : null}
            {error && adminerror ? (
              <div className="error_msg">{error && adminerror}</div>
            ) : null}
            <button type="submit" className="green_btn">
              Sign In
            </button>
          </form>
        </div>
        <div className="right">
          <h1>New User?</h1>
          <Link to="/signup">
            <button type="button" className="white_btn">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
