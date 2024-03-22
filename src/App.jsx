import React from "react";
import Home from "./Routes/Home";
import "./App.scss";
import Navbar from "./Components/Navbar/Navbar";
import {Navigate, BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Customers from "./Routes/Customers";
import Rentals from "./Routes/Rentals";
import NotFound from "./Routes/NotFound";
import SingleMovie from "./Routes/SingleMovie";
// import Login from "./Routes/Login";
// import Register from "./Routes/Register";
import { Toaster } from "react-hot-toast";
// import MovieUpdate from "./Routes/MovieUpdate";
// import NewMovie from "./Routes/NewMovie";
import { useMovieContext } from "./Context/Context";
import NewLogin from "./NewRoutes/NewLogin";
import NewRegister from "./NewRoutes/NewRegister";
import NewMovieUpdate from "./NewRoutes/NewMovieUpdate";
import NewMovieAdd from "./NewRoutes/NewMovieAdd";



const App = () => {
  const {user} = useMovieContext()
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
        <Navbar />
        <Routes>
        {user ? (
            <>
              <Route path="/" element={<Home />} />
              {/* Add other routes for authenticated users */}
            </>
          ) : (
            <Route path="/" element={<NewLogin />} />
          )}
          <Route path="/movies" element={<Home />} />
           <Route path="/movies/:id" element={<SingleMovie />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/Rentals" element={<Rentals />} />
          <Route path="/login" element={<NewLogin />} />
          <Route path="/register" element={<NewRegister />} />
          <Route path="/update/:id" element={<NewMovieUpdate/>} />
          <Route path="/new" element={<NewMovieAdd />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
