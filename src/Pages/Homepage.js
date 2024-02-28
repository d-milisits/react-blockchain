import React, { useState } from "react";
import AllAssets from "../components/AllAssets";
import Banner from "../components/Banner/Banner";
import AppError from "../components/AppError";

const Homepage = () => {
  const [loading, setLoading] = useState(true);
  const [appError, setAppError] = useState(false);

  return !appError ? (
    <div>
      <Banner
        loading={loading}
        setLoading={setLoading}
        setAppError={setAppError}
      />
      <AllAssets loading={loading} setAppError={setAppError} />
    </div>
  ) : (
    <AppError err="Oops! Looks like we've encountered an API error. Please try again shortly." />
  );
};

export default Homepage;
