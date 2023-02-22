import React from "react";
import Nav from "./../../Components/SharedComponents/Nav/Nav";
import HomeFilterBtnHeader from "./../../Components/HomeFilterBtnHeader/HomeFilterBtnHeader";
import Footer from "./../../Components/SharedComponents/Footer/Footer";
import "./Layout.css";
import Cart from "../../Components/Cart/Cart";
import CartDetailsView from "./../../Components/Cart/CartDetailsView/CartDetailsView";
import { Toaster } from "react-hot-toast";

// const notify = () => toast('Here is your toast.');

const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <HomeFilterBtnHeader />
      <main className="layout_container">{children}</main>
      <CartDetailsView />
      <Cart />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Layout;
