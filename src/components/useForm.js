import { useState } from "react";

export default (intialValues, validate, setCurrentId) => {
  const [values, setValues] = useState(intialValues);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    const filedValue = { [name]: value };
    setValues({
      ...values,
      ...filedValue,
    });
    validate(filedValue);
  };

  const resetForm = () => {
    setValues({
      ...intialValues
    })
    setErrors({})
    setCurrentId(0)
  }

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleChange,
    resetForm
  };
};
