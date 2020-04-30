const invalidInputClass = "text-input--invalid";

let submitBtn = document.getElementsByClassName("form__submit-btn")[0];
let requiredFields = document.querySelectorAll(":required");

requiredFields.forEach((field) => {
  field.addEventListener("change", function () {
    isValidField(this);
  });
});

submitBtn.addEventListener("click", function (e) {
  let formIsValid = true;

  requiredFields.forEach((field) => {
    let fieldIsValid = isValidField(field);
    if (formIsValid) formIsValid = fieldIsValid;
  });

  !formIsValid && e.preventDefault();
});

function isValidField(field) {
  const isValid = field.checkValidity();

  if (!isValid) {
    field.classList.add(invalidInputClass);
  } else {
    field.classList.remove(invalidInputClass);
  }

  return isValid;
}
