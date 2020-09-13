import React, { useState } from "react";

function useForm(callback, initialValues = {}) {
  const [values, setValues] = useState(initialValues);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  };
  return {
    errors,
    values,
    onChange,
    onSubmit,
  };
}

export default useForm;
