const validationRequirements = {
  first_name: {
    empty: true,
    regExp: /^[a-zA-Zа-яА-Я\sё\-]+$/i,
    minLength: 2,
    maxLength: 30,
  },
  last_name: {
    empty: true,
    regExp: /^[a-zA-Zа-яА-Я\sё\-]+$/i,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    empty: true,
    regExp: /^(([^#<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  },
  avatar: {
    regExp: /(https?:\/\/(([\w-]+\.)+)+([\w])+((\/[a-z_0-9\-:~\\.%\\/?#[\]@!$&'\\(\\)*+,;=]+)+)?)/i,
  },

  password: {
    empty: true,
    regExp: /^[a-zA-Z0-9:%.,_+~#=@]+$/,
  }
}

const validationErrorsText = {
  first_name: {
    empty: 'Пожалуйста, укажите имя',
    regExp: 'Пожалуйста, используйте только буквы',
    minLength: `Допускается имя не короче ${validationRequirements.first_name.minLength} символов`,
    maxLength: `Допускается имя не длиннее ${validationRequirements.first_name.maxLength} символов`,
  },
  last_name: {
    empty: 'Пожалуйста, укажите фамилию',
    regExp: 'Пожалуйста, используйте только буквы',
    minLength: `Допускается фамилия не короче ${validationRequirements.last_name.minLength} символов`,
    maxLength: `Допускается фамилия не длиннее ${validationRequirements.last_name.maxLength} символов`,
  },
  email: {
    empty: 'Пожалуйста, укажите Email',
    regExp: 'Некорректный Email',
  },
  avatar: {
    regExp: 'Некорректная ссылка',
  },
  password: {
    empty: 'Пожалуйста, укажите пароль',
    regExp: 'Пароль может состоять из латинских букв, цифр и специальных символов : % . , _ + ~ # = @',
  }
}

function validateData(input) {
  let errors = {};

  // Проверка поля на пустоту
  if (validationRequirements[input.name].empty && !input.value.trim()) {
    errors[input.name] = validationErrorsText[input.name].empty;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на регулярное выражение
  if (validationRequirements[input.name].regExp && input.value && !validationRequirements[input.name].regExp.test(input.value)) {
    errors[input.name] = validationErrorsText[input.name].regExp;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на минимальную длину
  if (validationRequirements[input.name].minLength && input.value.length < validationRequirements[input.name].minLength) {
    errors[input.name] = validationErrorsText[input.name].minLength;
    return errors;
  } else {
    errors[input.name] = '';
  }

  // Проверка поля на максимальную длину
  if (validationRequirements[input.name].maxLength && input.value.length > validationRequirements[input.name].maxLength) {
    errors[input.name] = validationErrorsText[input.name].maxLength;
    return errors;
  } else {
    errors[input.name] = '';
  }

  return errors;
}

export default validateData;