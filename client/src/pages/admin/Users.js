import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
const Users = () => {
  const [users, setUsers] = useState([]);

  //get users
  const getUsers = async () => {
    try {
      const res = await axios.get("/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return <Layout>Users</Layout>;
};

export default Users;
