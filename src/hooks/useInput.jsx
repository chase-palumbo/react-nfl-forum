import { useReducer } from "react";

const initialInput = {
  value: '',
  isTouched: false
};

const inputReducer = (prevState, action) => {
  return action.type === 'INPUT'
    ? { ...prevState, value: action.value }
    : action.type === 'BLUR'
    ? { ...prevState, isTouched: true }
    : initialInput
};

const useInput = (validationFn) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, initialInput);
  
  const inputValidation = validationFn(inputState.value);
  const hasError = !inputValidation.success && inputState.isTouched;

  const inputChangeHandler = (e) => {
    dispatchInput({ type: 'INPUT', value: e.target.value });
  };

  const inputBlurHandler = () => {
    dispatchInput({ type: 'BLUR' });
  };

  return {
    value: inputState.value,
    isValid: inputValidation,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
  }
};

export default useInput;