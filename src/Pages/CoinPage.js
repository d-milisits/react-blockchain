import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import CoinInfo from "../components/CoinInfo";
import Loader from "../components/Loader";
import { SingleCoin } from "../config/api";
import AppError from "../components/AppError";

const CoinPage = () => {
  // Used to get coin ID from search URL.
  const { id } = useParams();
  const [coin, setCoin] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(SingleCoin(id));
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin:", error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
  }, [id]);

  return !loading && !error ? (
    <>
      <CoinInfo coin={coin} />
    </>
  ) : error ? (
    <AppError err="Oops! Looks like we've encountered an API error. Please try again shortly." />
  ) : (
    <Loader />
  );
};

export default CoinPage;
