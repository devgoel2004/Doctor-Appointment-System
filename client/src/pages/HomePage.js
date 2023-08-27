import React, { useEffect } from "react";
import axios from "axios";
import Layout   from "../components/Layout";
const HomePage = () => {
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/getUserData",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <Layout>HomePage</Layout>;
};

export default HomePage;
