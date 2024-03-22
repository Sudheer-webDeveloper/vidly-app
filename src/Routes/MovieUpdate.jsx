import React from "react";
import { useMovieContext } from "../Context/Context";
import UpdationNew from "./UpdationNew";

const MovieUpdate = () => {
  const { movieItem } = useMovieContext();
  const {
    title,
    genre: { genere_id , name },
    numberInStock,
    dailyRentalRate,
  } = movieItem;

  const movieData = {
    title: title,
    genre_id: genere_id,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate,

  };

  return <UpdationNew movieData={movieData} newRoute={false} />;
};

export default MovieUpdate;
