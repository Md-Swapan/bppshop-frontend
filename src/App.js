import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Layout from "./Pages/Layout/Layout";
import SubCategory from "./Pages/CategoryPage/SubCategory/SubCategory";
import SubSubCategory from "./Pages/CategoryPage/SubSubCategory/SubSubCategory";
import Product from './Pages/ProductPage/Product';
import axios from "axios";
import { baseUrl } from "./BaseUrl/BaseUrl";
import Shipping from "./Pages/ShippingPage/Shipping";
import AddShippingAddress from "./Pages/ShippingPage/AddShippingAddress";
import Profile from "./Pages/Profile/Profile";


function App() {
  const [loading,setLoading]=useState(true);
  const [allCategory, setAllCategory] = useState([]);


  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home allCategory={allCategory} loading={loading}/>} />
          <Route path="/:slug" element={<SubCategory allCategory={allCategory} loading={loading}/>}/>
          <Route path="/:slug/:subSlug" element={<SubSubCategory allCategory={allCategory} loading={loading}/>} />
          <Route path="/:slug/:subSlug/:subSubSlug" element={<Product allCategory={allCategory}/>} />
          <Route path="/shipping-details" element={<Shipping></Shipping>}></Route>
          <Route path="/add-shipping-address" element={<AddShippingAddress></AddShippingAddress>}></Route>
          <Route path="/profile" element={<Profile></Profile>}></Route>
          <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
    </div>
  );
}

export default App;
