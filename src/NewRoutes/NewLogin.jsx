import React, { useState } from "react";
import Joi from "joi";
import { Input_text, Input_email } from "../Components/All-Inputs";
import { useMovieContext } from "../Context/Context";
import { defaultUrl } from "../Utils/Utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewLogin = () => {
  const navigate = useNavigate();
  const { setErrors, setErrorOccur, setLoading, loading, errorOccur } =
    useMovieContext();
  const [newForm, newSetForm] = useState({
    email: "",
    password: "",
  });

  const loginSchema = {
    email: Joi.string().required().label("email"),
    password: Joi.string().min(6).required().label("password"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = Joi.object(loginSchema);

    const { error } = schema.validate(newForm, { abortEarly: false });

    if (error) {
      const newErrors = {};
      error.details.forEach((detail) => {
        newErrors[detail.path[0]] = detail.message;
      });
      setErrors(newErrors);
    } else {
      try {
        setLoading(true);
        let response = await axios.post(`${defaultUrl}/auth/login`, newForm);
        toast.success("Successfully Registered");
        localStorage.setItem("userDataJwt", response.data);

        navigate("/movies");
        setLoading(false);
        setErrorOccur(false);
        setTimeout(() => {
          window.location.reload("/movies");
        }, 1000);
        newSetForm({
          email: "",
          password: "",
        });
      } catch (error) {
        setLoading(false);
        setErrorOccur(true);
        toast.error("Login Error may be invalid email or password");
      }
    }
  };

  return (
    <div className="new-form">
      <form className="updated-form" onSubmit={handleSubmit}>
        <div className="new-input">
          <Input_email
            type={"email"}
            value={newForm["email"]}
            name={"email"}
            placeholder={"John@gmail.com"}
            id={"number"}
            newSetForm={newSetForm}
            schema={loginSchema["email"]}
          />
          <Input_text
            type={"text"}
            label={"password"}
            value={newForm["password"]}
            name={"password"}
            placeholder={"123456"}
            id={"special_character"}
            newSetForm={newSetForm}
            schema={loginSchema["password"]}
          />
        </div>

        {(loading|| errorOccur) &&  <div className="loading-error">
          {loading && <span className="update">Updating Database</span>}
          {errorOccur && <span className="error">Error Occured</span>}
        </div> }

        <div className="new-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewLogin;
