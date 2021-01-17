$(document).ready(function () {
  $("form").submit(function (e) {
    e.preventDefault();
    var formData = {};
    formData["username"] = $("[name='username']").val();
    formData["password"] = $("[name='password']").val();
    authenticateUser(JSON.stringify(formData));
  });
});

const authenticateUser = (data) => {
  $.ajax({
    url: "/accounts/api/login",
    type: "POST",
    data: data,
    headers: {
      "content-type": "application/json",
    },
    success: function (response) {
      localStorage.setItem("user", response.user.username);
      localStorage.setItem("token", response.token);
      alert("Welcome back.");
      window.location.href = "/";
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
