$(document).ready(function () {
  var form = document.getElementsByClassName('needs-validation')[0];

  form.addEventListener('submit', function (event) {

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      var inputs = document.getElementsByClassName("validation");
      for (let i = 0; i < inputs.length; i++) {
        $("[data-error='" + inputs[i].id + "']").text(inputs[i].validationMessage);
      }
    }

    form.classList.add('was-validated');
  }, false);
});