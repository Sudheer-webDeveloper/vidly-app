import React from "react";
import { useMovieContext } from "../Context/Context";
import Joi from "joi";

// const movieSchema = {
//   title: Joi.string().min(5).max(15).required().label("title"),
//   genre_id: Joi.string().required(),
//   numberInStock: Joi.number().min(0).required().label("numberInStock"),
//   dailyRentalRate: Joi.number().min(1).max(10).required().label("dailyRentalRate"),
// };

// const loginSchema = {
//   email: Joi.string().email().required().label("email"),
//   password: Joi.string().min(6).required().label("password"),
// };

// const registerSchema = {
//   name: Joi.string().min(3).max(30).required().label("name"),
//   email: Joi.string().email().required().label("email"),
//   password: Joi.string().min(6).required().label("password"),
// };

const handleChange = (e, schema,  newSetForm) => {
  const { setErrors } = useMovieContext();


  const { name, value } = e.target;

  const errorMessage = schema[name]?.validate(value)?.error?.message;

  setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  newSetForm((prevForm) => ({ ...prevForm, [name]: value }));
};

export function Input_text({
    type,
    name,
    id,
    placeholder,
    value,
    newSetForm,
    schema,
  }) {
    const { errors,handleChange } = useMovieContext();
  
    return (
      <>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e, schema, newSetForm)}
        />
        <span className="red"> {errors[name]}</span>
      </>
    );
  }
  
  export function Input_email({
    type,
    name,
    id,
    placeholder,
    value,
    newSetForm,
    schema,
  }) {
    const { errors,handleChange } = useMovieContext();
  
    return (
      <>
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e, schema, newSetForm)}
        />
        <span className="red"> {errors[name]}</span>
      </>
    );
  }
  
  export function Select_input({ name, value, schema,newSetForm }) {
    const { errors, genresData,handleChange } = useMovieContext();
  
    return (
      <>
        <select
          onChange={(e) => handleChange(e, schema, newSetForm)}
          name={name}
          value={value}
        >
          <option value="">{name ? name : "select"}</option>
          {genresData &&
            genresData.map((option) => (
              <option value={option?.genere_id} key={option?._id}>
                {option?.name}
              </option>
            ))}
        </select>
        <span className="red"> {errors[name]}</span>
      </>
    );
  }
  
  export function Password_Input({
    type,
    name,
    placeholder,
    value,
    newSetForm,
    schema,
  }) {
    const { errors,handleChange } = useMovieContext();
  
    return (
      <>
        <input
          type={type}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(e) => handleChange(e, schema, newSetForm)}
        />
        <span className="red"> {errors[name]}</span>
      </>
    );
  }
  