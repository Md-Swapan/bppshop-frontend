import React from "react";
import Nav from "./../../Components/SharedComponents/Nav/Nav";
import HomeFilterBtnHeader from "./../../Components/HomeFilterBtnHeader/HomeFilterBtnHeader";
import Footer from "./../../Components/SharedComponents/Footer/Footer";
import './Layout.css'
import Cart from "../../Components/Cart/Cart";
import CartDetailsView from './../../Components/Cart/CartDetailsView/CartDetailsView';

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <HomeFilterBtnHeader />
      <main className="layout_container">{children}</main>
      <CartDetailsView />
      <Cart/>
      <Footer />
    </div>
  );
};

export default Layout;
