import React from "react";
import UpdationNew from "./UpdationNew";

const NewMovie = () => {
  const movieData = {
    title: "",
    genre_id: "",
    numberInStock: "",
    dailyRentalRate: "",
  };
  
  return <UpdationNew movieData={movieData}  newRoute={true}   />;
};

export default NewMovie;
