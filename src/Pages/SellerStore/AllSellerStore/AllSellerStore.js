import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../BaseUrl/BaseUrl";
import { useRef } from "react";

const AllSellerStore = () => {
  const [allSellerStore, setAllSellerStore] = useState([]);
  const [loading, setLoading] = useState(true);
  const listInnerRef = useRef();
  const [currPage, setCurrPage] = useState(1);
  const [prevPage, setPrevPage] = useState(0);
  const [lastList, setLastList] = useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}/seller/all`).then((res) => console.log(res));
  });

  useEffect(() => {
    let limit = 50;
    const fetchData = async () => {
      const response = await axios.get(
        `${baseUrl}/seller/all?limit=${limit}&offset=${currPage}`
      );
      // console.log(response.data.data.data);
      response && setLoading(false);
      if (!response?.data?.data?.data?.length) {
        setLastList(true);
        return;
      }
      setPrevPage(currPage);
      setAllSellerStore([...allSellerStore, ...response?.data?.data?.data]);
    };
    if (!lastList && prevPage !== currPage) {
      fetchData();
    }
  }, [currPage, lastList, prevPage, allSellerStore]);

  const onScroll = () => {
    if (listInnerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = listInnerRef.current;
      if (scrollTop + clientHeight === scrollHeight) {
        setCurrPage(currPage + 1);
      }
    }
  };
  return (
    <>
      <div>
        <div
          onScroll={onScroll}
          ref={listInnerRef}
          style={{ height: "100vh", overflowY: "auto" }}
          className="brand_container mt-4 pb-5"
        >
          All Seller


        </div>
      </div>
    </>
  );
};

export default AllSellerStore;
