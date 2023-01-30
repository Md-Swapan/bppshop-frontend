import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import islamicIcon from "../../../Assets/Images/icons/islamic-icon-vector-27687758.jpg";
import groceryIcon from "../../../Assets/Images/icons/grocery.webp";
import fashionIcon from "../../../Assets/Images/icons/image 40.png";
import babyCareIcon from "../../../Assets/Images/icons/3731013.png";
import cosmeticsIcon from "../../../Assets/Images/icons/cosmetic.jpg";
import shoesIcon from "../../../Assets/Images/icons/shoes.jpg";
import watchIcon from "../../../Assets/Images/icons/watch.png";
import eyeCareIcon from "../../../Assets/Images/icons/eyecare.jpg";
import sportsIcon from "../../../Assets/Images/icons/Sport_balls.svg.png";
import pharmacyIcon from "../../../Assets/Images/icons/pharmacy-icon-3.jpg";
import electronicsIcon from "../../../Assets/Images/icons/electronics.jpg";
import furnitureIcon from "../../../Assets/Images/icons/furniture.jpeg";
import hardwareIcon from "../../../Assets/Images/icons/image 52 (1).png";
import homeDecorateIcon from "../../../Assets/Images/icons/image 50.png";
import vehicleIcon from "../../../Assets/Images/icons/image 53.png";
import usedProductsIcon from "../../../Assets/Images/icons/usedProduct.jfif";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "./../../../BaseUrl/BaseUrl";

const Sidebar = () => {
  // const { slug } = useParams();

  const [allCategory, setAllCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  // const [categoryName, setCategoryName] = useState('')


  // const categoryList = allCategory?.map((item) => item)
  // const categoryNames = categoryList?.map(item => item.slug)



//   const subCategoryList = categoryList?.map(item => item.childes)
//   const subCategoryName = subCategoryList.map(item => item.name)

//  console.log(categoryNames)

  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res?.data?.data);
    });
  }, []);


  const subMenuHandler = (slug) => {

    // setCategoryName(slug)
    // const category = allCategory?.map((item) => item)

    // const categoryName = category?.map(item => item.slug)
    // const subCategoryName = categoryName?.find((item) => item === slug);

    // const subCategories = allCategory?.map((item) => item.childes)
    // setSubCategory(subCategories?.find((item) => item.slug === slug));







    
    // if(subCategoryName === slug){
    //   const subMenu = document.querySelector(".subMenu");
    //   const chevronRight = document.querySelector(".chevron-right");
    //   const chevronDown = document.querySelector(".chevron-down");
  
    //   subMenu.classList.toggle("subMenuActive");
    //   chevronRight.style.display = "none";
    //   chevronDown.style.display = "block";
    // }
    
  };

  return (
    <>
      <div className="sidebar-toggle-section">
        <input type="checkbox" name="" id="openSidebarMenu" />
        <label for="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner top"></div>
          <div className="spinner middle"></div>
          <div className="spinner bottom"></div>
        </label>
        <div id="sidebarMenu">
          <ul className="menu">
            <li className="homeIcon">
              <Link to="/">
                <div>
                  <i className="bi bi-house-door-fill"></i>
                  Home
                </div>
              </Link>
            </li>

            {allCategory.map((categoryItem) => (
              <li onClick={() => subMenuHandler(categoryItem.slug)}>
                <Link to={`/${categoryItem.slug}`}>
                  <div>
                    {categoryItem.name === "Islamic" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={islamicIcon}
                        alt=""
                      />
                    ) : "icon" &&
                      categoryItem.name === "Grocery ( Only Dhaka City)" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={groceryIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Fashion" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={fashionIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Baby Care" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={babyCareIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Cosmetics" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={cosmeticsIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Pharmacy" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={pharmacyIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Electronics" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={electronicsIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Eye Care" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={eyeCareIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Shoe" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={shoesIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Furniture" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={furnitureIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Sports" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={sportsIcon}
                        alt=""
                      />
                    ) : "icon" &&
                      categoryItem.name === "Home Appliance & Decorate" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={homeDecorateIcon}
                        alt=""
                      />
                    ) : "icon" &&
                      categoryItem.name === "Hardware, Cables & Sanitary" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={hardwareIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Vehicle" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={vehicleIcon}
                        alt=""
                      />
                    ) : "icon" && categoryItem.name === "Used Product" ? (
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={usedProductsIcon}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
                    {categoryItem.name}
                  </div>
                  <span>
                    <i class="bi bi-chevron-right chevron-right"></i>
                    <i class="bi bi-chevron-down chevron-down"></i>
                  </span>
                </Link>
                {/* <ul className="subMenu">
                  {subCategory.map((item) => (
                    <li>{item.name}</li>
                  ))}
                </ul> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
