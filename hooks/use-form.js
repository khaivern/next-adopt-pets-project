import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let overallFormIsValid = true;
      for (const inputId in state.inputs) {
        const currInput = state.inputs[inputId];
        if (!currInput) continue;

        if (inputId === action.inputId) {
          overallFormIsValid = overallFormIsValid && action.isValid;
        } else {
          overallFormIsValid = overallFormIsValid && currInput.isValid;
        }
      }

      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: {
            val: action.val,
            isValid: action.isValid,
          },
        },
        overall: overallFormIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.inputs,
        overall: action.overall,
      };
    default:
      return state;
  }
};

/* {
  inputs :{
    key : {val, isValid},
  }
  overall: false
}; */

const useForm = (initialForm) => {
  const [formState, dispatchFormAction] = useReducer(formReducer, initialForm);

  const inputHandler = useCallback((inputId, val, isValid) => {
    dispatchFormAction({
      type: "INPUT_CHANGE",
      inputId,
      val,
      isValid,
    });
  }, []);

  const setForm = useCallback((inputs, overall) => {
    dispatchFormAction({
      type: "SET_DATA",
      inputs,
      overall,
    });
  }, []);

  return { formState, inputHandler, setForm };
};

export default useForm;
