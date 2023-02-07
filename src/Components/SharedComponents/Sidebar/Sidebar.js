import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
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
        {/* <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <div className="spinner top"></div>
          <div className="spinner middle"></div>
          <div className="spinner bottom"></div>
        </label> */}
        <label htmlFor="openSidebarMenu" className="sidebarIconToggle">
          <i className="bi bi-list"></i>
        </label>
        <div id="sidebarMenu">
          <ul className="menu">
            {/* <li className="homeIcon">
              <Link to="/">
                <div>
                  <i className="bi bi-house-door-fill"></i>
                  Home
                </div>
              </Link>
            </li> */}
            <div className="homeIcon">
              <Link to="/">
                <div>
                  <i className="bi bi-house-door-fill"></i>
                </div>
              </Link>
            </div>
            <hr />

            {allCategory?.map((categoryItem, index) => (
              <li
                key={index}
                id={`categoryItem ${index}`}
                className=""
                onClick={() => subMenuHandler(categoryItem?.slug, index)}
              >
                <Link to={`/${categoryItem?.slug}`}>
                  <div>
                    <img
                      width="15"
                      className="sidebar-Icon"
                      src={categoryBaseUrl + `/${categoryItem.icon}`}
                      alt=""
                    />
                    {categoryItem?.name}
                  </div>
                  <span>
                    <i className="bi bi-chevron-right chevronRight"></i>
                    {/* <i className="bi bi-chevron-down chevron-down"></i> */}
                  </span>
                </Link>
              </li>
            ))}

            <ul className=" subMenu">
              {subCategory?.map((item, indx) => (
                <Link to={`/${categorySlugName}/${item?.slug}`}>
                  <li
                    key={indx}
                    id={`subSubCategoryItem ${indx}`}
                    onClick={() => subSubCategoryViewHandler(item?.slug, indx)}
                  >
                    {item?.name}
                  </li>
                  <ul className=" subSubMenu">
                    {subSubCategoryList?.childes?.map((item, index) => (
                      <Link
                        to={`/${categorySlugName}/${subCategorySlugName}/${item?.slug}`}
                      >
                        <li key={item.index}>{item?.name}</li>
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
