import React, { useEffect, useState } from "react";
import { Route, Navigate, BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./App/store";
import VideoItem from './Pages/VideoItem';
import Header from './Pages/Header';
import ScrollToTop from './Pages/ScrollToTop';
import Login from "./Pages/Login";
import NewLogin from "./Pages/NewLogin";
import Cookies from 'js-cookie';
import Home from "./Components/Home";
import Success from "./Pages/Success";
import Failure from "./Pages/Failure";
import AlreadySubscribed from "./Pages/AlreadySubscribed";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // useEffect(() => {
  //   const cookieValue = Cookies.get("number");
  //   console.log("main cookie")
  //   setIsAuthenticated(cookieValue == "9350631275");
  // }, [Cookies.get("number")]); // Add Cookies.get("number") as dependency

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home /> } />
          <Route path="/video/:id" element={ <VideoItem />} />
          <Route path="/login" element={<NewLogin />} />
          <Route path="/header" element={<Header />} />
          <Route path="/DoiRedirect" element={<Success />} />
          <Route path='/error' element={<Failure/>}/>
        
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
