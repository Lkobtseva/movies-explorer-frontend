import React, {useState, useCallback} from "react";
import { REG_NAME, REG_EMAIL } from "../utils/RegexConst";

function useValidation() {
  const [data, setData] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateField = useCallback((name, value) => {
    let errorMessage = "";
    if (name === "name" && value !== undefined) {
      if (!value.match(REG_NAME)) {
        errorMessage = "Поле должно содержать только латиницу, кирилицу, пробел или дефис";
      }
    } else if (name === "email" && value !== undefined) {
      if (!value.match(REG_EMAIL)) {
        errorMessage = "Не валидный адрес электронной почты";
      }
    }
    return errorMessage;
  }, []);

  const onChange = useCallback((evt) => {
    const { name, type, checked, value: inputValue } = evt.target;
    const value = type === "checkbox" ? checked : inputValue;

    const errorMessage = validateField(name, value);
    const newData = { ...data, [name]: value };
    const newErrors = { ...errors, [name]: errorMessage };
    const formValid = Object.values(newErrors).every(error => !error);

    setData(newData);
    setErrors(newErrors);
    setIsFormValid(formValid);
  }, [data, errors, validateField]);

  const resetValidation = useCallback((newData = {}, newErrors = {}) => {
    setData(newData);
    setErrors(newErrors);
    setIsFormValid(Object.values(newErrors).every(error => !error));
  }, []);

  return {
    data,
    errors,
    onChange,
    resetValidation,
    isFormValid,
    setIsFormValid,
    setData
  };
}

export default useValidation;
