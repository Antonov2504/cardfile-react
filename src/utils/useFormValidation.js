import { useState, useEffect } from 'react';

function useFormValidation(inputs, validateData) {
  const [inputValues, setInputValues] = useState({                                                                          // Стейт со значениями инпутов для валидации
    ...inputs
  });
  const [validationInput, setValidationInput] = useState({                                                                  // Стейт валидируемый инпут
    name: '',
    value: ''
  });
  const [enableValidation, setEnableValidation] = useState({ ...inputs });                                                  // Стейт состояния валидации инпутов выполнялась/не выполнялась
  const [isValidForm, setIsValidForm] = useState(false);                                                                    // Стейт состояния форма валидна
  const [validationErrors, setValidationErrors] = useState({});                                                             // Стейт ошибок валидации

  // При изменении валидируемого инпута выполняется валидация его значения
  useEffect(() => {
    const enableFormValidation = Object.keys(enableValidation).every(key => {                                               // Валидация формы завершена, все поля формы провалидированы
      return enableValidation[key];
    });
    // Если включена валидация поля, выполнить валидацию значения поля, записать ошибки
    if (enableValidation[validationInput.name]) {
      setValidationErrors({
        ...validationErrors,
        ...validateData(validationInput)
      })
    }

    // Если выполнена валидация всех полей формы, обновить Стейт состояния валидации инпутов
    if (enableFormValidation) {
      setEnableValidation({
        ...enableValidation,
        form: true
      });
    }
  }, [validationInput]);

  // Валидация формы, проверка при изменении Стейта ошибок валидации
  useEffect(() => {
    const emptyValidationErrors = Object.keys(validationErrors).every(key => {                                              // Ошибки валидации отсутствуют
      return !validationErrors[key];
    });
    enableValidation.form && emptyValidationErrors ? setIsValidForm(true) : setIsValidForm(false);                          // Если провалидированы все поля формы и отутствуют ошибки валидации - форма валидна
  }, [validationErrors]);

  // При первой загрузке компонента форма невалидна
  useEffect(() => {
    setIsValidForm(false);
  }, []);

  // Изменить валидируемый инпут
  function changeValidationInput(input) {
    const { name, value } = input;
    setEnableValidation({
      ...enableValidation,
      [name]: true
    });
    setValidationInput({
      ...validationInput,
      name,
      value
    });
  }

  // Выполнить валидацию формы
  function runFormValidation() {
    for (const input in inputValues) {
      changeValidationInput({ name: input, value: inputValues[input] });
    }
  }

  // Задать значения инпутов
  function setFormInputValues(inputs) {
    setEnableValidation({
      all: true
    });
    setInputValues({
      ...inputValues,
      ...inputs
    });
  }

  // Очистить поля формы
  function clearFormInputValues() {
    setInputValues({});
  }

  // Очистить ошибки валидации
  function clearValidationErrors() {
    setValidationErrors({});
  }

  // Изменение Стейтов значений инпутов, валидации инпутов и валидируемого инпута при изменении значений инпутов
  function handleChange(evt) {
    const { name, value } = evt.target;
    setInputValues({
      ...inputValues,
      [name]: value
    });
    changeValidationInput(evt.target);
  }

  return {
    inputValues,
    setFormInputValues,
    clearFormInputValues,
    clearValidationErrors,
    validationErrors,
    handleChange,
    runFormValidation,
    isValidForm
  };
}

export default useFormValidation;