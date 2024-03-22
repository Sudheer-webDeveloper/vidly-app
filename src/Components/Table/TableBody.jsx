import React from "react";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useMovieContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";

const TableBody = ({ deletee }) => {
  const {handleHeaderClick,actualMovies,currentPage,itemsPerPage,toggleLiked,deletingMovie} = useMovieContext();

  let lastIndex = currentPage * itemsPerPage;
  let firstIndex = lastIndex - itemsPerPage;
  let paginateMovieItems = actualMovies.slice(firstIndex, lastIndex);

  return (
    <>
      <tbody>
        {paginateMovieItems.map((movie) => {
          const { _id,movies_id,title,genre: { name },numberInStock,dailyRentalRate,liked} = movie;

          return (
            <tr key={_id}>
              <td onClick={() => handleHeaderClick(movie.property, movie)}>
                <NavLink to={`/update/${movies_id}`}>{title}</NavLink>
              </td>
              <td>{name}</td>
              <td>{numberInStock}</td>
              <td>{dailyRentalRate}</td>
              <td className="heart" onClick={() => toggleLiked(_id)}>
                {deletee && (liked ? <FaHeart /> : <CiHeart />)}
              </td>
              <td>
                {deletee && (
                  <button onClick={() => deletingMovie(movies_id)}>
                    Delete
                  </button>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};

export default TableBody;
