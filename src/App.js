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
import Profile from "./Pages/Profile/Profile";
import Login from './Pages/User/Login/Login';
import ForgetPassWord from "./Pages/ForgetPassword/ForgetPassWord";
import SignUp from "./Pages/User/SignUp/SignUp";
import ProfileHome from "./Components/ProfileComponent/ProfileHome/ProfileHome";
import OrderHome from "./Components/ProfileComponent/OrderHome/OrderHome";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import store from "./Redux/Store";
import { loadUser } from './Redux/Actions/UserAction';
import TrackOrder from './Components/ProfileComponent/TrackOrder/TrackOrder';
import AddressHome from './Components/ProfileComponent/AddressHome/AddressHome';
import AddNewAddress from './Components/ProfileComponent/AddNewAddress/AddNewAddress';
import ShippingDetails from './Pages/ShippingAddressPage/ShippingDetails/ShippingDetails';
import AddShipping from './Pages/ShippingAddressPage/AddShipping/AddShipping';
import ShippingAddressList from './Pages/ShippingAddressPage/ShippingAddressList/ShippingAddressList';

function App() {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const [shippingAddressList, setShippingAddressList] = useState([]);
  // const { isAuthenticated, user } = useSelector((state) => state.user);

  // console.log(user)

  useEffect(() => {
    store.dispatch(loadUser());

    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
      setLoading(false);
    });

  }, []);

  useEffect(()=>{
    axios
    .get(baseUrl + "/shipping-address", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setShippingAddressList(res?.data?.data);
    });
  },[token])

  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug" element={<SubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug" element={<SubSubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug/:subSubSlug" element={<Product allCategory={allCategory} />}/>

          <Route path="/shipping-details" element={<ShippingDetails shippingAddressList={shippingAddressList}/>}/>
          <Route path="/add-shipping-address" element={<AddShipping/>}/>
          <Route path="/shipping-address" element={<ShippingAddressList shippingAddressList={shippingAddressList}/>}/>

          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<ProfileHome />}></Route>
            <Route path="my-order" element={<OrderHome />}></Route>
            <Route path="track-order" element={<TrackOrder/>}></Route>
            <Route path="account-address" element={<AddressHome/>}></Route>
            <Route path="add-new-address" element={<AddNewAddress/>}></Route>
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
