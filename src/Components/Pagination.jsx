import React from "react";
import { useMovieContext } from "../Context/Context";


const Pagination = () => {

  const {currentPage,setCurrentPage,actualMovies,itemsPerPage} = useMovieContext()

  const numberOfPages = Math.ceil(actualMovies.length / itemsPerPage);
  const pagesArray = Array(numberOfPages)
  .fill(0)
  .map((_, index) => index + 1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  
  return (
    <section className="pagination">
      {pagesArray.map((item, index) => (
        <button
          className={`pageButton ${currentPage === item ? 'active' : ''}`}
          key={item}
          onClick={() => handlePageChange(item)}
        >
          {item}
        </button>
      ))}
    </section>
  );
};

export default Pagination;
