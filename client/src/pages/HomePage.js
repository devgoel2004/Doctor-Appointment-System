import React, { useEffect } from "react";

const HomePage = () => {
  const getUserData = () => {
    try {
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return <div>HomePage</div>;
};

export default HomePage;
