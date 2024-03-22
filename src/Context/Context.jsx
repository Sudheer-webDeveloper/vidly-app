import { createContext, useContext, useEffect, useState } from "react";
import { fetchsData } from "../Utils/Utils";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import axios from "axios";

const MovieContext = createContext();

export const MovieContextProvider = ({ children }) => {
  // All the component states declared on the Top To avaoid unnessary confusions and main thing these are the global states , every component have its one local state , even passing props from one component to anothe component is not allowed in my coding

  const [movieItem, setMovieItem] = useState({
    _id: "",
    title: "",
    genre: { _id: "", name: "" },
    numberInStock: "",
    dailyRentalRate: "",
    publishDate: "",
    liked: false,
  });
  const [genresData, setGenresData] = useState([]);
  let loginedUser = localStorage.getItem("userDataJwt");
  const [user, setUser] = useState(
    localStorage.getItem("userDataJwt") ? jwtDecode(loginedUser) : ""
  );
  console.log(loginedUser);
  console.log("the user name is", user);

  const [actualMovies, setActualMovies] = useState([]);
  const [sameMovies, setSameMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [itemSelect, setItemSelect] = useState("All");
  const [sortCriteria, setSortCriteria] = useState(null);
  const [sortAscending, setSortAscending] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false)
  const [errorOccur,setErrorOccur] = useState(false)

  // This titleProperties helps to sort the products based on the ascending or descending of the sort value
  let titleProperties = [
    { name: "Title", property: "title", type: "string" },
    { name: "Genre", property: "genre.name", type: "string" },
    { name: "Stock", property: "numberInStock", type: "number" },
    { name: "Rate", property: "dailyRentalRate", type: "number" },
  ];

  // This useEffect helps us to fetch the movies on the inital render and updates the actualMovies array
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchsData("/movies/allmovies");
        setActualMovies(data);
        setSameMovies(data);
      } catch (error) {
        console.log("error while fetching the genres");
      }
    };

    if (actualMovies.length === 0) {
      fetchData();
    }
  }, [actualMovies]);

  // This useEffect helps to fetch the genres or moviesGenres like ,adventure , drama , thriller on inital render of the component
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchsData("/genre/allgenres");
        setGenresData(data);
      } catch (error) {
        console.log("error while fetching the genres");
      }
    };
    fetchData();
  }, []);
  console.log("genres", genresData);

  //OnfilterringItems helps to filter the movie items based on the category selected , the below setting category is reponsible for that
  const onFilterItems = (category) => {
    if (category === "All") {
      setActualMovies(sameMovies);
      setCurrentPage(1);
      setItemSelect(category);
      return;
    }

    const filterItems = sameMovies.filter((item) => {
      return item.genre.name === category;
    });

    setActualMovies(filterItems);
    setCurrentPage(1);
    setItemSelect(category);
  };

  // This function sets the category ,based on the category we will filter the movies
  let settingCategory = (category) => {
    setItemSelect(category);
  };

  // This sort Moivies Function is responsible to sort the movies based on titile , rate , stocks , genre etc
  const sortingMovies = (property) => {
    const newSortAscending = sortCriteria === property ? !sortAscending : true;

    const sortedMovies = [...actualMovies].sort((a, b) => {
      let valueA = a;
      let valueB = b;

      if (property === "genre.name") {
        valueA = a.genre.name.toLowerCase();
        valueB = b.genre.name.toLowerCase();
      } else {
        valueA = a[property];
        valueB = b[property];
      }

      if (typeof valueA === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      }

      if (valueA < valueB) {
        return newSortAscending ? -1 : 1;
      }
      if (valueA > valueB) {
        return newSortAscending ? 1 : -1;
      }
      return 0;
    });

    setActualMovies(sortedMovies);
    setSortCriteria(property);
    setSortAscending(newSortAscending);
  };

  // This is the random updated Movies array we are creating when user liking the movie
  const updateMovies = (updateMovies) => {
    setActualMovies(updateMovies);
  };

  // This function handles the likeing of the movie
  const toggleLiked = (id) => {
    const updatedMovies = actualMovies.map((movie) => {
      if (movie._id === id) {
        return { ...movie, liked: !movie.liked };
      }
      return movie;
    });
    updateMovies(updatedMovies);
  };

  // changing the movieObject to update the movie
  const handleHeaderClick = (property, movieObject) => {
    console.log("property is ", property);
    setMovieItem(movieObject);
  };

  async function fetchesMoviesEveryTime() {
    const data = await fetchsData("/movies/allmovies");
    return setActualMovies(data);
  }


  const handleChange = (e, schema,  newSetForm) => {  

    const { name, value } = e.target;
  
    const errorMessage = schema?.validate(value)?.error?.message;
  
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    newSetForm((prevForm) => ({ ...prevForm, [name]: value }));

    console.log(errors)
  };



  // This delete Movie function is responsible to make network for delete the movie in the database
  const deletingMovie = async (id) => {
    try {
      await axios.delete(`http://192.168.0.128:5000/api/movies/delete/${id}`);
      toast.success("successfully Movie Deleted");

      fetchesMoviesEveryTime();
    } catch (error) {
      toast.error("Error while deleting Movie");
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movieItem,
        setMovieItem,
        genresData,
        setGenresData,
        user,
        setUser,
        actualMovies,
        setActualMovies,
        sameMovies,
        setSameMovies,
        currentPage,
        setCurrentPage,
        itemsPerPage,
        setItemsPerPage,
        itemSelect,
        setItemSelect,
        sortCriteria,
        setSortCriteria,
        sortAscending,
        setSortAscending,
        onFilterItems,
        sortingMovies,
        settingCategory,
        updateMovies,
        toggleLiked,
        titleProperties,
        deletingMovie,
        handleHeaderClick,
        fetchesMoviesEveryTime,
        errors,
        setErrors,
        handleChange,
        errorOccur,
        setErrorOccur,
        loading,
        setLoading
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = () => {
  return useContext(MovieContext);
};
