import React, { useState } from "react";

import ReusableForm from "./ReUsableForm";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });

  const formData = [
    {
      name: "name",
      type: "text",
      placeholder: "john",
      error: "Name must contain 3 letters which not include special characters",
    },
    {
      type: "email",
      name: "email",
      placeholder: "john@gmail.com",
      error: "Email must be valid",
      // pattern: `^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$`,
      required: true,
    },
    {
      name: "password",
      type: "text",
      placeholder: "834010-/3",
      error:
        "should contain 8-20 one capital letter , number,special-character",
      required: true,
      pattern:
        "(?=^.{8,}$)((?=.*d)|(?=.*W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$",
    },
  ];
  return (
    <>
      <ReusableForm formData={formData} formObject={form} register={true} />
    </>
  );
};

export default Register;
