import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";

const Home = ({ allCategory, loading }) => {
  console.log(allCategory);
  return (
    <>
      <div className="home_container">
      <MetaData title="BPPShop Home" />
        <Category allCategory={allCategory} loading={loading} />
      </div>
    </>
  );
};

export default Home;
