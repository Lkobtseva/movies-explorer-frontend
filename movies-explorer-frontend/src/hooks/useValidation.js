import React, { useState, useCallback } from "react";
import { REG_NAME, REG_EMAIL } from "../utils/RegexConst";

function useValidation() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback((name, value) => {
    let errorMessage = "";
    if (name === "name") {
      if (!REG_NAME.test(value)) {
        errorMessage =
          "Поле должно содержать только латиницу, кирилицу, пробел или дефис";
      }
    } else if (name === "email") {
      if (!REG_EMAIL.test(value)) {
        errorMessage = "Не валидный адрес электронной почты";
      }
    }
    return errorMessage;
  }, []);

  const onChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      const errorMessage = validateField(name, value);
      setData((prevData) => ({ ...prevData, [name]: value }));
      setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
      setIsFormValid(!Object.values(errors).some((error) => error !== ""));
    },
    [validateField, errors]
  );

  const resetValidation = useCallback(() => {
    setData({});
    setErrors({});
    setIsFormValid(false);
  }, []);

  return {
    data,
    setData,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid,
  };
}

export default useValidation;
