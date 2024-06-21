// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  setCategories,
  setSelectedCategory,
  setVideos,
} from "../slices/categorySlice";
import Navbar from "../Pages/Navbar";
import VideoCards from "../Pages/VideoCards";
import Footer from "../Pages/Footer";
import Header from "../Pages/Header";
import ContinueWatching from "../Pages/ContinueWatching";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const storeCategory = useSelector((state) => state.category);
const navigate=useNavigate()

useEffect(() => {
  const cookieValue = Cookies.get("msisdn");
  console.log("type of cookie", typeof(cookieValue));

  if (!cookieValue) {
    console.log("No cookie found, redirecting to login");
    navigate("/login");
    
  } else {
    
    
    axios.get(`/checkuser?msisdn=${cookieValue}`)
      .then(response => {
      
        if (response.data.status=='1') {
          console.log("User verified");
         
        } else {
          console.log("User does not exist, redirecting to login");
          navigate("/login"); 
        }
      })
      .catch(error => {
        console.error("Error verifying user", error);
        navigate("/login"); // Redirect to login on error
      });
  }
}, []);


  
  useEffect(() => {
    const exist = Cookies.get("msisdn");
    if (!exist) {
      const uniqueId = generateUniqueUserId();
      Cookies.set("number", uniqueId, { expires: 2 });
    }
    console.log("cookie<><><><>");
    const fetchData = async () => {
      console.log("start")
      try {
        const response = await axios.get("https://mali.toon-flix.com/api/little");
        console.log("response data", response.data)
        const { categories, videos } = response.data;
        dispatch(setCategories(categories));
        dispatch(setVideos(videos));
        dispatch(setSelectedCategory("All"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="text-sm">
        <Navbar />
        <>
          <Header categories={storeCategory} />
          <ContinueWatching />
          <VideoCards categories={storeCategory} />
        </>
      </div>
      <Footer className="" />
    </>
  );
};

export default Home;

function generateUniqueUserId() {
  const str = "qwertyuiopasdfghjklzxcvbnm1234567890";
  let uuid = "OM_";
  for (let i = 0; i < 16; i++) {
    uuid += str.charAt(Math.floor(Math.random() * str.length));
  }
  return uuid;
}
