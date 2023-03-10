import React from "react";
import Nav from "./../../Components/SharedComponents/Nav/Nav";
import HomeFilterBtnHeader from "./../../Components/HomeFilterBtnHeader/HomeFilterBtnHeader";
import Footer from "./../../Components/SharedComponents/Footer/Footer";
import "./Layout.css";
import Cart from "../../Components/Cart/Cart";
import CartDetailsView from "./../../Components/Cart/CartDetailsView/CartDetailsView";
import { Toaster } from "react-hot-toast";

// const notify = () => toast('Here is your toast.');


const CartDetailsCloseHandler = () => {
  const cartDetailsViewContainer = document.querySelector(
    ".cartDetailsView-container"
  );

  const cartDetailsViewSectionOverlay = document.querySelector(
    ".cartDetailsView_section_overlay"
  );

  cartDetailsViewSectionOverlay.style.display = "none";   
  cartDetailsViewContainer.classList.toggle(
    "cartDetailsView-container-toggle"
  );
};

// const sidebarCloseGlobalHandler = () => {
//   const sidebarToggleSection = document.querySelector("#sidebarMenu");
//   sidebarToggleSection.classList.toggle(
//     "sidebar-toggle-section-toggle"
//   );
// }



// $(document).ready(function(){
//   $('#addtocart').on('click',function(){
    
//     var button = $(this);
//     var cart = $('#cart');
//     var cartTotal = cart.attr('data-totalitems');
//     var newCartTotal = parseInt(cartTotal) + 1;
    
//     button.addClass('sendtocart');
//     setTimeout(function(){
//       button.removeClass('sendtocart');
//       cart.addClass('shake').attr('data-totalitems', newCartTotal);
//       setTimeout(function(){
//         cart.removeClass('shake');
//       },500)
//     },1000)
//   })
// })



const Layout = ({ children }) => {
  return (
    <div>
      <Nav />
      <HomeFilterBtnHeader />
      {/* <main className="layout_container" onClick={sidebarCloseGlobalHandler}>{children}</main> */}
      <main className="layout_container">{children}</main>
      <CartDetailsView />
      <Cart />
      <Footer />
      <Toaster position="top-right" reverseOrder={false} />
      <div onClick={CartDetailsCloseHandler} className="cartDetailsView_section_overlay"></div>
    </div>
  );
};

export default Layout;
