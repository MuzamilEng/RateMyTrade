import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../Layout/Layout";
import TradesmanCard from "../../Component/Card/TradesmanCard";

const SearchUser = () => {
  const [arr, setArr] = useState({});

  const fetchData = async (searchQuery) => {
    try {
      const result = await axios.post(
        `http://localhost:5000/api/v1/tradesman/search?${searchQuery}`
      );

      setArr(result);
      console.log(result.data.data);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    let searchQuery = localStorage.getItem("searchTradesmanQuery");

    fetchData(searchQuery);
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
