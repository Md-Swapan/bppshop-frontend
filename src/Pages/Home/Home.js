import React from "react";
import "./Home.css";
import Category from "./../CategoryPage/Category/Category";
import MetaData from "../Layout/MetaData";

const Home = ({ allCategory, loading }) => {
  return (
    <>
      <div className="home_container">
        <MetaData title="BPPShop" description=""/>
        <Category allCategory={allCategory} loading={loading} />
      </div>
    </>
  );
};

export default Home;
