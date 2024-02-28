import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Trending.css";
import { TrendingCoins } from "../../config/api";
import { CryptoState } from "../../CryptoContext";
import Loader from "../Loader";

const Banner = ({ loading, setLoading, setAppError }) => {
  const [trending, setTrending] = useState([]);

  // Bool value used to increase slice target for mobile trending display.
  const [seeMore, setSeeMore] = useState(false);

  const { currency } = CryptoState();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      try {
        const { data } = await axios.get(TrendingCoins(currency));
        setTrending(data);
      } catch (error) {
        console.error("Error fetching trending coins:", error);
        setAppError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingCoins();
  }, [currency, setLoading]);

  return !loading && trending.length > 0 ? (
    <>
      <div className="trending">
        {trending.slice(0, 5).map((item, index) => {
          return (
            <div
              onClick={() => navigate(`/coins/${item.id}`)}
              key={item.id}
              className={`trending-item ${
                item?.price_change_percentage_24h > 0 ? "up" : "down"
              }`}
            >
              <h3>#{index + 1} Trending</h3>
              <img src={item.image} alt={item.id} />
              <h2>{item.name}</h2>
              <p>
                <span
                  style={{
                    color:
                      item.price_change_percentage_24h > 0
                        ? "#078080"
                        : "#f45d48",
                  }}
                >
                  {item.price_change_percentage_24h > 0 ? "+" : ""}
                  {item.price_change_percentage_24h.toFixed(2)}%
                </span>{" "}
                24h change
              </p>
            </div>
          );
        })}
      </div>
      <div className="mobile-trending">
        {trending.slice(0, seeMore ? 5 : 3).map((item, index) => {
          return (
            <div
              onClick={() => navigate(`/coins/${item.id}`)}
              key={item.id}
              className={`trending-item ${
                item?.price_change_percentage_24h > 0 ? "up" : "down"
              }`}
            >
              <div className="mobile-trending-item">
                <img src={item.image} alt={item.id} />
                <div>
                  <h5>#{index + 1} Trending</h5>
                  <div className="name-change">
                    <p>{item.name}</p>
                    <span id="dot"></span>
                    <p>
                      <span
                        style={{
                          color:
                            item.price_change_percentage_24h > 0
                              ? "#078080"
                              : "#f45d48",
                        }}
                      >
                        {item.price_change_percentage_24h > 0 ? "+" : ""}
                        {item.price_change_percentage_24h.toFixed(2)}%
                      </span>{" "}
                      24h change
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div
          onClick={() => {
            setSeeMore(!seeMore);
          }}
          className="see-more-ctr"
        >
          <h5>{seeMore ? "See Less" : "See More"}</h5>
        </div>
      </div>
    </>
  ) : (
    <Loader />
  );
};

export default Banner;
