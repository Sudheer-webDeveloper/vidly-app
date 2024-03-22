import React, { useState } from "react";
import { handelChange, handleSubmit } from "../Utils/Utils";
import { useNavigate } from "react-router-dom";




const ReusableForm = ({formData,formObject,register}) => {

  const [form, setForm] = useState
  (formObject);
   
  const navigate = useNavigate()
  return (
    <div className="coverer">
      <section className="form-section">
        <form className="form-group" onSubmit={(e) => handleSubmit(e,form,setForm,register,navigate)}>
          
          {formData?.map((item, index) => {
            return <Input key={item?.name} item={item} form={form} setForm={setForm} />;
          })}

          {!register  ? "Not Have Account Please Register" : "Have Account Login" }
          <div className="formbutton">
            <button type="submit">Submit</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default ReusableForm;










export function Input({ item,form,setForm }) {

  const [focused,setFoucsed] = useState(false)

  const handleFocus =(e) =>{

    setFoucsed((focus)=>!focus)
  }
  return (
    <div className="input-data">
      <label htmlFor={`${item.name}`}>{item.name}</label>
      <input
        id={item.name}
        value={form[item.name]}
        onChange={(e)=>handelChange(e,setForm)}
        {...item}
        onBlur={handleFocus}
        focused={focused.toString()}
      />

      <span className="error">{item.error}</span>
    </div>
  );
}
