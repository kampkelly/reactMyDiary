export const checkCheckedValues = checkedValues => {
  // eslint-disable-next-line
  for (var key in checkedValues) {
    if (checkedValues[key] === '') {
      return false;
    }
  }
  return true;
};

export const validateForm = (errorMessage, checkedValues, e) => {
  e.preventDefault();
  if (checkCheckedValues(checkedValues) === true) { // success
    document.querySelector('.form_error_text').style.display = 'none';
  } else {
    document.querySelector('.form_error_text').style.display = 'block';
    document.querySelector('.form_error_text small').textContent = errorMessage;
  }
  return checkCheckedValues(checkedValues);
};