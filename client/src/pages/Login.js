import React from "react";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/RegisterStyles.css";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    // console.log(values);
    try {
      dispatch(showLoading());
      const res = await axios.post("/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfull");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      console.log(err);
      message.error("Something went wrong");
    }
  };
  return (
    <div>
      <div>
        <div className="form-container">
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className="card p-3 register-form">
            <h3 className="text-center">Register Form</h3>

            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" required />
            </Form.Item>
            <Link to="/register" className="m-2">
              Not a user Register Here
            </Link>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
