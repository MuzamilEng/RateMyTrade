import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../../UserContext/UserContext";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import Layout from "../../Layout/Layout";
import TradesmanCard from "../../Component/Card/TradesmanCard";

const SearchUser = () => {
  const { query } = useGlobalContext();
  const [arr, setArr] = useState({});

  const fetchData = async (query1) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/v1/tradesman/search?${query1}`
      );

      setArr(result);
      console.log(result.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    let query1 = localStorage.getItem("query");

    fetchData(query1);
  }, []);
  return (
    <div>
      <Layout>
      <div className="grid grid-cols-4 place-content-center">
        {arr?.data?.data.map((elem, index) => (
          <main key={index}>
          <TradesmanCard key={elem._id} username={elem?.user?.firstName} image={elem?.user?.image} occupation={elem?.tradeType} id={elem?._id} />
        </main>
        ))}
      </div>
      </Layout>
    </div>
  );
};

export default SearchUser;
