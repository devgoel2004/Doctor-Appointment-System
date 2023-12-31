import React, { useState, CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
  return (
    <div className="spinner d-flex justify-content-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
