import React, { useState } from "react";
import Joi from "joi";
import { movieSchema } from "../Utils/Utils";
import { useMovieContext } from "../Context/Context";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const UpdationNew = ({ movieData, newRoute }) => {
  const [form, setForm] = useState(movieData);
  const [errors, setErrors] = useState({});
  const { genresData,fetchesMoviesEveryTime } = useMovieContext();
  //   console.log("akkcndewa",genresData)
  const naviagate = useNavigate()

  console.log("newRoute", newRoute)

  const {id} = useParams()
  console.log(id)

  const movieFormData = [
    {
      label: "title",
      name: "title",
      type: "text",
      placeholder: "john",
      error: "title should be valid",
      required: true,
    },
    {
      label: "genre",
      name: "genre_id",
      type: `select`,
      options: genresData,
      placeholder: "john@gmail.com",
      error: "genre sholuld be selected",
      required: true,
    },
    {
      label: "number in stock",
      name: "numberInStock",
      type: "text",
      placeholder: "834010-/3",
      error: "stock must be in positive",
      required: true,
    },
    {
      label: "dailyRentalRate",
      name: "dailyRentalRate",
      type: "text",
      placeholder: "834010-/3",
      error: "rate must be betweeen in 1 - 10 ",
      required: true,
    },
 
  ];



  // This handleChange method updates the values based on the userInput and handles the validation while user typing some thing
  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    switch (name) {
      case "title":
        errorMessage = Joi.string().min(5).max(15).required().validate(value)
          .error?.message;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));
        break;

      case "genre_id":
        errorMessage = Joi.string().required().validate(value).error?.message;
        setForm((prevForm) => ({ ...prevForm, [name]: value }));

        break;

      case "numberInStock":
        if (!isNaN(value) || value === "") {
          errorMessage = Joi.number().min(0).required().validate(Number(value))
            .error?.message;
          setForm((prevForm) => ({ ...prevForm, [name]: value }));
        } else {
          errorMessage = "Please enter a valid number";
        }
        break;

      case "dailyRentalRate":
        if (!isNaN(value) || value === "") {
          errorMessage = Joi.number()
            .min(1)
            .max(10)
            .required()
            .validate(Number(value)).error?.message;
          setForm((prevForm) => ({ ...prevForm, [name]: value }));
        } else {
          errorMessage = "Please enter a valid number";
        }
        break;

      default:
        break;
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };




  // Handles the form to Backend route and update or add the movie to the batabse !
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)

    
    const { error } = movieSchema.validate(form, { abortEarly: false });
    console.log("error", error);
    if (error) {
      const newErrors = {};
      console.log("this is error", error.details);
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      // Validation passed, handle form submission
      setErrors({});
      console.log("Form submitted:", form);

      if (newRoute) {
        try {      
           await axios.post(
            "http://192.168.0.128:5000/api/movies/postmovies",
            form
          );
          fetchesMoviesEveryTime()
          toast.success("Movie Added");
          naviagate('/movies')

         console.log(form)
        } catch (error) {
          toast.error("error in movie adding");
          console.log("error while movie adding", error);
        }
      } else {
        try {
          const response = await axios.post(
            `http://192.168.0.128:5000/api/movies/update/${id}`,
            form
          );
          console.log("response", response);
          fetchesMoviesEveryTime()
          toast.success("Success fully movie updated");
          naviagate("/movies")
        } catch (error) {
          toast.error("error in movie updation");
          console.log("error while movie updating", error);
        }
      }

      setForm({
        title: "",
        genre_id: "",
        numberInStock: "",
        dailyRentalRate: "",
      });
    }
  };


  return (
    <div className="coverer">
      <section className="form-section">
        <form className="form-group" onSubmit={handleSubmit}>
          {movieFormData.map((item, index) => {
            return (
              <Input
                key={item?.name}
                item={item}
                form={form}
                setForm={setForm}
                errors={errors}
                handleChange={handleChange}
              />
            );
          })}
          <div className="formbutton">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default UpdationNew;


//
export function Input({ item, form, setForm, handleChange, errors }) {
  return (
    <div className="input-data">
      <label htmlFor={`${item.label}`}>{item.label}</label>
      {item.type === "select" ? (
        <>
          <select
            onChange={(e) => handleChange(e, setForm)}
            name={item.name}
            value={form[item.name]}
            id={item.name}
            className="custom-select"
          >
            <option value="">
              {form[item.name] ? form[item.name] : "select"}
            </option>
            {item &&
              item.options.map((option) => (
                <option value={option?.genere_id} key={option?._id}>
                  {option?.name}
                </option>
              ))}
          </select>
          <span className="red"> {errors[item.name]}</span>
        </>
      ) : (
        <>
          <input
            type={item.type}
            id={item.name}
            name={item.name}
            placeholder={item.placeholder}
            value={form[item.name]}
            onChange={(e) => handleChange(e, setForm)}
            autoComplete="off"
          />
          <span className="red"> {errors[item.name]}</span>
        </>
      )}
    </div>
  );
}













