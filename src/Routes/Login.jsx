import React, { useState } from "react";
import ReusableForm from "./ReUsableForm";
const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const form2 = [
    {
      name: "email",
      type: "email",
      placeholder: "john@gmail.com",
      required: true,
    },
    {
      name: "password",
      type: "text",
      placeholder: "234Tu$",
      required: true,
      error:"password dosen't match"
    },
  ];

  

  return <ReusableForm formData={form2} formObject={form} register={false} />;
};

export default Login;
