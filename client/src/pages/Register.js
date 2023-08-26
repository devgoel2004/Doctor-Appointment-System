import React, { useState } from "react";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/RegisterStyles.css";
import api from "./Api";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const onfinishHandler = async (values) => {
    // console.log(values);
    try {
      const res = await axios.post(`http://localhost:8080/register`, values);
      if (res.data.success) {
        message.success("Register sucessfully");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      message.error("Something went wrong");
    }
  };
  return (
    <div>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className="card p-3 register-form">
          <h3 className="text-center">Register Form</h3>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password"></Input>
          </Form.Item>
          <Link to="/login" className="m-2">
            Already a user login here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Register;
