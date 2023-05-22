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
import CheckoutShopCart from './Components/CheckoutComponent/CheckoutShopCart/CheckoutShopCart';
import TrackOrderDetails from './Components/ProfileComponent/TrackOrderDetails/TrackOrderDetails';
import CheckoutComplete from './Pages/Checkout/CheckoutComplete';
import ProductDetailsPage from './Pages/ProductDetailsPage/ProductDetailsPage';
import Search from "./Pages/Search/Search";
import PageNotFound from './Pages/PageNotFound/PageNotFound';
import Brands from './Pages/Brand/Brands/Brands';
import BestSelling from './Pages/BestSelling/BestSelling';
import NewArrival from './Pages/NewArrival/NewArrival';
import TopRated from "./Pages/TopRated/TopRated";
import DiscountProducts from './Pages/DiscountProducts/DiscountProducts';
import BrandsProducts from './Pages/Brand/BrandsProducts/BrandsProducts';
import AgentLand from './Pages/AgentLand/AgentLand';
import AgentPayment from "./Components/CheckoutComponent/AgentPayment/AgentPayment";
import EditShipping from "./Components/ShippingComponent/EditShipping/EditShipping";
import FlashSale from "./Pages/FlashSale/FlashSale";
import AddProductReview from "./Pages/Review/AddProductReview";
import DiscountProductDetails from "./Pages/DiscountProducts/DiscountProductDetails";
import BestSellingProductDetails from "./Pages/BestSelling/BestSellingProductDetails";
import NewArrivalProductDetails from "./Pages/NewArrival/NewArrivalProductDetails";
import TopRatedProductDetails from "./Pages/TopRated/TopRatedProductDetails";
import BrandProductDetails from "./Pages/Brand/BrandProductDetails";
import FlashSaleProductDetails from "./Pages/FlashSale/FlashSaleProductDetails";
import SearchProductDetails from "./Pages/Search/SearchProductDetails";


function App() {
  const [loading, setLoading] = useState(true);
  const [allCategory, setAllCategory] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadUserOrders())
    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res.data.data);
      setLoading(false);
    });
    
    if (token==="undefined" || token===null || token==="") {
      localStorage.removeItem("token")
    }
  }, [token]);


  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home allCategory={allCategory} loading={loading} />}/>
          
          <Route path="/:slug" element={ <SubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug" element={ <SubSubCategory allCategory={allCategory} loading={loading} />}/>
          <Route path="/:slug/:subSlug/:subSubSlug" element={<Product allCategory={allCategory} isLoading={loading}/>} />
          <Route path="/:slug/:subSlug/:subSubSlug/:id" element={<ProductDetailsPage allCategory={allCategory}/>} />
          <Route path="/search" element={<Search/>} />
          <Route path="/search/:id" element={<SearchProductDetails/>} />
          <Route path="/brands" element={<Brands/>} />
          <Route path="/brands/:brandName/:brandId" element={<BrandsProducts/>} />
          <Route path="/brand/:name/:brandId/:id" element={<BrandProductDetails/>} />
          <Route path="/discount-products" element={<DiscountProducts/>} />
          <Route path="/discount-products/:id" element={<DiscountProductDetails/>} />
          <Route path="/flash-sale" element={<FlashSale/>} />
          <Route path="/flash-sale/:id" element={<FlashSaleProductDetails/>} />
          <Route path="/best-selling" element={<BestSelling/>} />
          <Route path="/best-selling/:id" element={<BestSellingProductDetails/>} />
          <Route path="/new-arrival" element={<NewArrival/>} />
          <Route path="/new-arrival/:id" element={<NewArrivalProductDetails/>} />
          <Route path="/top-rated" element={<TopRated/>} />
          <Route path="/top-rated/:id" element={<TopRatedProductDetails/>} />
          <Route path="/addproductreview/:pid" element={<AddProductReview/>} />
          {/* <Route path="/search/:productName" element={<Search/>} /> */}
        
          <Route path="/shipping-address" element={<ProtectedRoute><ShippingDetails/></ProtectedRoute>}>
              <Route index element={<ShippingHome/>}></Route>
              <Route path="checkout-shop-cart" element={<CheckoutShopCart/>}></Route>
              <Route path="checkout-payment" element={<CheckoutPayment/>}></Route>
              <Route path="agent-payment" element={<AgentPayment/>}></Route>
          </Route>
          <Route path="/checkout-complete" element={<ProtectedRoute><CheckoutComplete /></ProtectedRoute>}/>
          <Route path="/add-shipping-address" element={<ProtectedRoute><AddShipping/></ProtectedRoute>}/>
          <Route path="/edit-shipping-address/:editId" element={<ProtectedRoute><EditShipping/></ProtectedRoute>}/>
          <Route path="/choose-shipping-address" element={<ProtectedRoute><ShippingAddressList/></ProtectedRoute>}/>
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
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/recover-password" element={<ForgetPassWord />}></Route>
          <Route path="/404" element={<PageNotFound />} />
          <Route path="*" element={<navigate to="/404" replace />} />

          <Route path="/customer/force-login-by-agent/:agentToken" element={<AgentLand />}/>
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
