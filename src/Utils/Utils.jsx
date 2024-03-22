import { toast } from "react-hot-toast";
import Joi from "joi";
import axios from "axios";

export const defaultUrl = "http://10.106.1.4:5000/api";

export const handleSubmit = async (e, form, setForm, register, navigate) => {
  e.preventDefault();

  try {
    if (register) {
      try {
        const response = await axios.post(
          (`${defaultUrl}/users/register`),
          form
        );
        console.log({ response }, response.data);
        setForm({
          name: "",
          password: "",
          email: "",
        });
        console.log(window.location)
        navigate("/login");
        toast.success("Successfully registered");
      } catch (error) {
        console.log("error while registration", error);
        toast.error("error while registration");
      }
    } else {
      try {
        const response = await axios.post(
          (`${defaultUrl}/auth/login`),
          form
        );

        localStorage.setItem("userDataJwt", response.data);
        console.log({ response }, response);

        setForm({
          email: "",
          password: "",
        });

          navigate("/movies");
          
          toast.success("Login Successfully");            
            window.location.reload();
      } catch (error) {
        console.error("Error while login", error);
        toast.error("Error while login");
        // Handle login error (e.g., show error message)
      }
    }
  } catch (error) {
    console.error("Registration failed:", error);
    // Handle registration error (e.g., show error message)
  }
};

export const handelChange = (e, setForm) => {
  const { name, value } = e.target;
  setForm((prevForm) => {
    return { ...prevForm, [name]: value };
  });
};


const schema = {
  title: Joi.string().min(5).max(15).required().label("Title"),
  genre_id: Joi.string().required().label("Genre"),
  numberInStock: Joi.number().min(1).required().label("Number in Stock"),
  dailyRentalRate: Joi.number().min(1).max(10).required().label("Rate"),
}

export const movieSchema = Joi.object(schema);


export const fetchsData = async (url) => {
  try {
    console.log("hitt");
    const response = await axios.get(defaultUrl + url);
    return response.data;
  } catch (error) {
    console.log(error, "v");
    throw new Error(`Fetch error: ${error.message}`);
  }
};





