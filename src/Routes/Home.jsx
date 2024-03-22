import React from "react";
import Movies from "../Components/Movies";
import Pagination from "../Components/Pagination";
import { useMovieContext } from "../Context/Context";
import FilteringMovies from "../Components/Filtering";

const Home = () => {
 const {actualMovies,itemSelect} = useMovieContext()

  return (
    <>
      <main>
        <h2 className="title">
          With
          <span> {itemSelect}</span>
          Category we have these many {actualMovies.length} awesome Movies
        </h2>

        <section className="sort-movies">
          <div className="movies-section">
            <Movies/>
          </div>

          <div className="sort-section">
            <FilteringMovies
              name="name"
              id="_id"/>
          </div>
        </section>

        <Pagination />
      </main>
    </>
  );
};

export default Home;
