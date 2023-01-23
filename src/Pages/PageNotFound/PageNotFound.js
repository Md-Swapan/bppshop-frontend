import React from 'react';
import './PageNotFound.css'
import PageNotFoundGif from "../../Assets/Images/404.png"


const PageNotFound = () => {
  return (
    <>
     <div className="pageNotFoundContainer">
      <div className="">
        {/* <img src={PageNotFoundGif} alt="Page Not Found."/> */}
        <h2>Sorry!</h2>
        <h4>Content Not Found.</h4>

        <br/>

        <a href="/">
        <button>Go Back</button>
        </a>
      </div>
    </div> 
    </>
  );
};

export default PageNotFound;