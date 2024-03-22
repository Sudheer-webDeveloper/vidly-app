import React, { useState } from "react";
import Joi from "joi";

import {
  Input_text,
  Input_email,
} from "../Components/All-Inputs";

import { useMovieContext } from "../Context/Context";
import { defaultUrl } from "../Utils/Utils";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate} from "react-router-dom";

const NewRegister = () => {
  const navigate = useNavigate();
  const {setErrors,setErrorOccur, setLoading, loading, errorOccur} =useMovieContext()

  const [newForm, newSetForm] = useState({
    name: "",
    password: "",
    email: "",
  });
  const registerSchema = {
  name: Joi.string().min(3).max(30).required().label("name"),
  email: Joi.string().required().label("email"),
  password: Joi.string().min(6).required().label("password"),
};


const handleSubmit = async (e) => {
    e.preventDefault();
    const schema = Joi.object(registerSchema);

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
         await axios.post(
          `${defaultUrl}/users/register`,
          newForm
        );
        toast.success("Successfully Registered");
        navigate("/login");
        setLoading(false);
        setErrorOccur(false);
        newSetForm({
            name: "",
            password: "",
            email: "",
          });
      } catch (error) {
        setLoading(false);
        setErrorOccur(true);
        toast.error("error while register maybe email or password already exsists");
      }
    }
  };
  return (
    <div className="new-form">
      <form className="updated-form" onSubmit={handleSubmit}>
        <div className="new-input">
          <Input_text
            type={"text"}
            value={newForm["name"]}
            name={"name"}
            placeholder={"John"}
            id={"special_character"}
            newSetForm={newSetForm}
            schema={registerSchema["name"]}


          />
          <Input_email
            type={"email"}
            value={newForm["email"]}
            name={"email"}
            placeholder={"John@gmail.com"}
            id={"special_character"}
            newSetForm={newSetForm}
            schema={registerSchema["email"]}


          />
          <Input_text
            type={"text"}
            value={newForm["password"]}
            name={"password"}
            placeholder={"123456"}
            id={"special_character"}
            newSetForm={newSetForm}
            schema={registerSchema["password"]}
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

export default NewRegister;
