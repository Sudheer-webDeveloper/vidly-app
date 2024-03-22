import React from "react";
import { useMovieContext } from "../Context/Context";

const FilteringMovies = ({
  name,
}) => {

  const {genresData,onFilterItems,itemSelect,settingCategory} = useMovieContext()


  const handleClick = (category, e) => {
    e.preventDefault();
    onFilterItems(category);
    settingCategory(category);
  };

  return (
    <ul className="genres-list">
      <li
        className={`genre-item ${itemSelect === "All" ? "genre-item-1" : ""}`}
        onClick={(e) => handleClick("All", e)}
      >
        All
      </li>
      {genresData.map((item) => (
        <li
          key={item._id}
          className={`genre-item ${
            itemSelect === item[name] ? "genre-item-1" : ""
          }`}
          onClick={(e) => handleClick(item[name], e)}
        >
          {item[name]}
        </li>
      ))}
    </ul>
  );
};

export default FilteringMovies;
