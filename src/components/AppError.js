import React from "react";
import "../styles/AppError.css";

const AppError = ({ err }) => {
  return <div className="appError">{err}</div>;
};

export default AppError;
