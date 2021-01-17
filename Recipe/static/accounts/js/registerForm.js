$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    var formData = {};
    formData["username"] = $("[name='username']").val();
    formData["password"] = $("[name='password']").val();
    formData["password2"] = $("[name='password2']").val();
    registerUser(JSON.stringify(formData));
  });
});

const registerUser = (data) => {
  $.ajax({
    url: "/accounts/api/register",
    type: "POST",
    data: data,
    headers: {
      "content-type": "application/json",
    },
    success: function (response) {
      alert("Sign up successful. Kindly login to continue.");
      window.location.href = "/accounts/login";
    },
    error: function (errors) {
      error = JSON.parse(errors.responseText);
      Object.keys(error).map((item) => {
        item === "non_field_errors" || "detail"
          ? Array.isArray(error[item])
            ? alert(`${error[item][0]}`)
            : alert(`${error[item]}`)
          : alert(`${item}: ${error[item][0]}`);
      });
    },
  });
};
