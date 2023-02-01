import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import islamicIcon from "../../../Assets/Images/icons/islamic-icon-vector-27687758.jpg";
import groceryIcon from "../../../Assets/Images/icons/grocery.webp";
import fashionIcon from "../../../Assets/Images/icons/image 40.png";
import babyCareIcon from "../../../Assets/Images/icons/3731013.png";
import cosmeticsIcon from "../../../Assets/Images/icons/cosmetic.jpg";
import shoesIcon from "../../../Assets/Images/icons/shoes.jpg";
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
import { baseUrl, categoryBaseUrl } from "./../../../BaseUrl/BaseUrl";

const Sidebar = () => {
  const [allCategory, setAllCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [categorySlugName, setCategorySlugName] = useState([]);
  const [subCategorySlugName, setSubCategorySlugName] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/categories`).then((res) => {
      setAllCategory(res?.data?.data);
    });
  }, []);

  const subMenuHandler = (slug, index) => {
    setCategorySlugName(slug);

    const subCategories = allCategory.find((item) => item.slug === slug);
    setSubCategory(subCategories.childes);
    const categoryItem = document.getElementById(`categoryItem ${index}`);

    const subMenu = document.querySelector(".subMenu");

    categoryItem.append(subMenu);

    if (subCategories) {
      const subMenu = document.querySelector(".subMenu");
      const chevronRight = document.querySelector(".chevronRight");

      subMenu.classList.toggle("subMenuActive");
      chevronRight.classList.toggle("arrowToggle");
    }
  };

  const [subSubCategoryList, setSubSubCategoryList] = useState([]);
  const subSubCategoryViewHandler = (subSlug, indx) => {
    setSubCategorySlugName(subSlug);

    const subCategories = allCategory.find(
      (item) => item.slug === categorySlugName
    );
    const subSubCategories = subCategories?.childes.find(
      (item) => item.slug === subSlug
    );

    setSubSubCategoryList(subSubCategories);

    const subSubCategoryItem = document.getElementById(
      `subSubCategoryItem ${indx}`
    );
    const subSubMenu = document.querySelector(".subSubMenu");
    subSubCategoryItem.append(subSubMenu);

    if (subCategories) {
      const subSubMenu = document.querySelector(".subSubMenu");
      subSubMenu.classList.toggle("subSubMenuActive");
    }
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

            {allCategory?.map((categoryItem, index) => (
              <li
                id={`categoryItem ${index}`}
                className=""
                onClick={() => subMenuHandler(categoryItem?.slug, index)}
              >
                <Link to={`/${categoryItem?.slug}`}>
                  <div>
                      <img
                        width="15"
                        className="sidebar-Icon"
                        src={categoryBaseUrl + `/${categoryItem.thumb}`}
                        alt=""
                      />
                    {categoryItem?.name}
                  </div>
                  <span>
                    <i class="bi bi-chevron-right chevronRight"></i>
                    {/* <i class="bi bi-chevron-down chevron-down"></i> */}
                  </span>
                </Link>
              </li>
            ))}

            <ul className=" subMenu">
              {subCategory?.map((item, indx) => (
                <Link to={`/${categorySlugName}/${item?.slug}`}>
                  <li
                    id={`subSubCategoryItem ${indx}`}
                    onClick={() => subSubCategoryViewHandler(item?.slug, indx)}
                  >
                    {item?.name}
                  </li>
                  <ul className=" subSubMenu">
                    {subSubCategoryList?.childes?.map((item) => (
                      <Link
                        to={`/${categorySlugName}/${subCategorySlugName}/${item?.slug}`}
                      >
                        <li>{item?.name}</li>
                      </Link>
                    ))}
                  </ul>
                </Link>
              ))}
            </ul>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
