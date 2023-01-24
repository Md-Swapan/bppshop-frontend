import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import PageNotFound from "./Pages/PageNotFound/PageNotFound";
import Layout from "./Pages/Layout/Layout";
import SubCategory from "./Pages/CategoryPage/SubCategory/SubCategory";
import SubSubCategory from "./Pages/CategoryPage/SubSubCategory/SubSubCategory";
import Product from "./Pages/ProductPage/Product";
import axios from "axios";
import { baseUrl } from "./BaseUrl/BaseUrl";
import Shipping from "./Pages/ShippingPage/Shipping";
import AddShippingAddress from "./Pages/ShippingPage/AddShippingAddress";
import Profile from "./Pages/Profile/Profile";
import Login from './Pages/User/Login/Login';
import ForgetPassWord from "./Pages/ForgetPassword/ForgetPassWord";
import SignUp from "./Pages/User/SignUp/SignUp";
import ProfileHome from "./Components/ProfileComponent/ProfileHome/ProfileHome";
import OrderHome from "./Components/ProfileComponent/OrderHome/OrderHome";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import store from "./Redux/Store";
import { useSelector } from 'react-redux';
import { loadUser } from './Redux/Actions/UserAction';

function App() {
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  // console.log(user)

  useEffect(() => {
    store.dispatch(loadUser());

    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
      setLoading(false);
    });

  }, []);

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route
            path="/"
            element={<Home allCategory={allCategory} loading={loading} />}
          />
          <Route
            path="/:slug"
            element={
              <SubCategory allCategory={allCategory} loading={loading} />
            }
          />
          <Route
            path="/:slug/:subSlug"
            element={
              <SubSubCategory allCategory={allCategory} loading={loading} />
            }
          />
          <Route
            path="/:slug/:subSlug/:subSubSlug"
            element={<Product allCategory={allCategory} />}
          />
          <Route
            path="/shipping-details"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/add-shipping-address"
            element={<AddShippingAddress></AddShippingAddress>}
          ></Route>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<ProfileHome />}></Route>
            <Route path="my-order" element={<OrderHome />}></Route>
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sign-up" element={<SignUp />}></Route>
          <Route path="/recover-password" element={<ForgetPassWord />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
