import React, { useState } from "react";
import Joi from "joi";
import {
  Input_text,
  Select_input,
  Password_Input,
  Input_email,
} from "../Components/All-Inputs";
import { useMovieContext } from "../Context/Context";
import { defaultUrl } from "../Utils/Utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const NewMovieUpdate = () => {
  const {
    movieItem,
    setErrorOccur,
    setLoading,
    loading,
    errorOccur,
    fetchesMoviesEveryTime,
    setErrors,
  } = useMovieContext();

  const { id } = useParams();
  const navigate = useNavigate();

  const {
    title,
    genre: { genere_id, name },
    numberInStock,
    dailyRentalRate,
  } = movieItem;

  const [newForm, newSetForm] = useState({
    title: title,
    genre_id: genere_id,
    numberInStock: numberInStock,
    dailyRentalRate: dailyRentalRate,
  });

  const movieSchema = {
    title: Joi.string().min(5).max(15).required().label("title"),
    genre_id: Joi.string().required(),
    numberInStock: Joi.number().min(0).required().label("numberInStock"),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(10)
      .required()
      .label("dailyRentalRate"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = Joi.object(movieSchema);

    const { error } = schema.validate(newForm, { abortEarly: false });

    if (error) {
      const newErrors = {};
      console.log("this is error", error.details);
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      try {
        setLoading(true);

        await axios.post(`${defaultUrl}/movies/update/${id}`, newForm);
        fetchesMoviesEveryTime();
        toast.success("Success fully movie updated");
        navigate("/movies");
        setLoading(false);
        setErrorOccur(false);
        newSetForm({
          title: "",
          genre_id: "",
          numberInStock: "",
          dailyRentalRate: "",
        });
      } catch (error) {
        setLoading(false);
        setErrorOccur(true);
        toast.error("error in movie updation");
      }
    }
  };

  return (
    <div className="new-form">
      <form className="updated-form" onSubmit={handleSubmit}>
        <div className="new-input">
          <Input_text
            type={"title"}
            value={newForm["title"]}
            name={"title"}
            placeholder={"JohnWick"}
            id={"special_character"}
            newSetForm={newSetForm}
            schema={movieSchema["title"]}
          />
          <Select_input
            type={"select"}
            value={newForm["genre_id"]}
            name={"genre_id"}
            newSetForm={newSetForm}
            schema={movieSchema["genre_id"]}
          />
          <Input_text
            type={"text"}
            value={newForm["numberInStock"]}
            name={"numberInStock"}
            placeholder={"2"}
            id={"number"}
            newSetForm={newSetForm}
            schema={movieSchema["numberInStock"]}
          />
          <Input_text
            type={"text"}
            value={newForm["dailyRentalRate"]}
            name={"dailyRentalRate"}
            placeholder={"2.5"}
            id={"number"}
            newSetForm={newSetForm}
            schema={movieSchema["dailyRentalRate"]}
          />
        </div>


        {(loading|| errorOccur) &&  <div className="loading-error">
          {loading && <span className="update">Updating Database</span>}
          {errorOccur && <span className="error">Error Occured</span>}
        </div> }

        <div className="new-submit">
          <button>Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewMovieUpdate;