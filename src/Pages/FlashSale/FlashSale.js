import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { baseUrl } from "./../../BaseUrl/BaseUrl";
import { useState } from "react";

const FlashSale = () => {
// const [timerDays,setTimerDays] =useState('00');
// const [timerHours,setTimerHours] =useState('00');
// const [timerMinutes,setTimerMinutes] =useState('00');
// const [timerSecounds,setTimerSecounds] =useState('00');


  const [flashTimeData, setFlashTimeData] = useState({});
  const [flashProducts, setFlashProducts] = useState([]);
  console.log(flashTimeData);
  console.log(flashProducts);
  useEffect(() => {
    axios
      .get(`${baseUrl}/flash-deals`)
      .then((res) => setFlashTimeData(res.data));
    axios
      .get(`${baseUrl}/flash-deals/products/2`)
      .then((res) => setFlashProducts(res.data));
  }, []);



  // ................//
// let interval = useRef();
// console.log(interval);
// const startTimer=()=>{
//   const countdowndate = new Date('May 30, 2020 00:00:00').getTime();
//   interval = setInterval(() => {
// const now = new Date().getTime();
// const distance=countdowndate-now;
// const days = Math.floor(distance/(1000 * 60 * 60 * 24));
// const hours = Math.floor((distance % (1000 * 60 * 60 * 24)/(1000*60*60)));
// const minutes = Math.floor((distance % (1000 * 60 * 60))/(1000*60));
// const seconds = Math.floor((distance%(1000 * 60))/1000);
// if (distance<0) {
//   clearInterval(interval.current);
// }else{
//   setTimerDays(days);
//   setTimerHours(hours);
//   setTimerMinutes(minutes);
//   setTimerSecounds(seconds);
// }

//   },1000);
// }
// const cleareInt = interval.current;
// console.log(cleareInt);
// useEffect(()=>{
//   startTimer();
//   return()=>{
//     clearInterval(interval.current);
//   }
// },[])
// .......................//









  return (
    <div>
      {/* <h4>Flash Sale Products:</h4> */}
      <h4>Flash sale coming soon...............</h4>

      {/* <div className="">
        <span className="mx-2">days:{timerDays}</span>
        <span className="mx-2">hours:{timerHours}</span>
        <span className="mx-2">minutes:{timerMinutes}</span>
        <span className="mx-2">secounds:{timerSecounds}</span>
      </div> */}
    </div>
  );
};

export default FlashSale;
