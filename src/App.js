import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
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
import { loadUserOrders } from './Redux/Actions/UserOrderAction';
import TrackOrder from './Components/ProfileComponent/TrackOrder/TrackOrder';
import AddressHome from './Components/ProfileComponent/AddressHome/AddressHome';
import AddNewAddress from './Components/ProfileComponent/AddNewAddress/AddNewAddress';
import ShippingDetails from './Pages/ShippingAddressPage/ShippingDetails/ShippingDetails';
import OrderDetails from "./Components/ProfileComponent/OrdersDetails/OrderDetails";
import CheckoutPayment from "./Components/CheckoutComponent/CheckoutPayment/CheckoutPayment";
import ShippingHome from "./Components/ShippingComponent/ShippingHome/ShippingHome";
import AddShipping from "./Components/ShippingComponent/AddShipping/AddShipping";
import ShippingAddressList from "./Components/ShippingComponent/ShippingAddressList/ShippingAddressList";

import PageNotFound from './Pages/PageNotFound/PageNotFound';
import CheckoutShopCart from './Components/CheckoutComponent/CheckoutShopCart/CheckoutShopCart';
import TrackOrderDetails from './Components/ProfileComponent/TrackOrderDetails/TrackOrderDetails';
import CheckoutComplete from './Pages/Checkut/CheckoutComplete';


function App() {
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  // const { isAuthenticated, error} = useSelector((state) => state.user);
  const token = localStorage.getItem("token");

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadUserOrders())

    // if(token){
    //   store.dispatch(getCartData())
    // }

    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
      setLoading(false);
    });

  }, [token]);
  
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug" element={ <SubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug" element={ <SubSubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug/:subSubSlug" element={<Product allCategory={allCategory} />} />
        
          <Route path="/shipping-details" element={<ProtectedRoute><ShippingDetails/></ProtectedRoute>}>
              <Route index element={<ShippingHome/>}></Route>
              <Route path="checkout-shop-cart" element={<CheckoutShopCart/>}></Route>
              <Route path="checkout-payment" element={<CheckoutPayment/>}></Route>
          </Route>
          <Route path="/checkout-complete" element={<ProtectedRoute><CheckoutComplete /></ProtectedRoute>}/>

          {/* <Route path="/shipping-details" element={<ProtectedRoute><ShippingDetails /></ProtectedRoute>}/> */}
          <Route path="/add-shipping-address" element={<ProtectedRoute><AddShipping/></ProtectedRoute>}/>
          <Route path="/shipping-address" element={<ProtectedRoute><ShippingAddressList/></ProtectedRoute>}/>
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}>
            <Route index element={<ProfileHome />}></Route>
            <Route path="orders" element={<OrderHome />}></Route>
            <Route path="orders-detail/:id" element={<OrderDetails />}></Route>
            <Route path="track-order/:id" element={<TrackOrder/>}></Route>
            <Route path="track-order-details/:id" element={<TrackOrderDetails/>}></Route>
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
