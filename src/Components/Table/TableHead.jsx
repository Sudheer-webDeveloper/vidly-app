import React from "react";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { useMovieContext } from "../../Context/Context";


const TableHead = () => {
  const {titleProperties,sortAscending,sortingMovies} = useMovieContext()
  return (
    <>
      <thead>
        <tr>
          {titleProperties.map((movie, index) => (
            <th key={index} onClick={() => sortingMovies(movie.property)}>
              {movie.name}
              <span className="icon">
                {sortAscending ? <MdArrowDropDown /> : <MdArrowDropUp />}
              </span>
            </th>
          ))}
          <th>Like</th>
          <th>Options</th>
        </tr>
      </thead>
    </>
  );
};

export default TableHead;
