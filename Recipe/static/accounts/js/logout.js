$(document).ready(function () {
  // handle authentication in base.html
  if (localStorage.getItem("user")) {
    $("#navbar #login").remove();
    $("#navbar").append(
      "&nbsp;<button type='button' class='btn btn-sm btn-outline-danger' id='logout'>Logout</button>"
    );
  } else {
    $("#navbar #logout").remove();
    $("#navbar").append(
      "&nbsp;<a href='/accounts/login' id='login' class='btn btn-sm btn-outline-primary'>Login/Register</a>"
    );
  }

  // handle logout operation
  $("#logout").click(function () {
    $.ajax({
      url: "/accounts/api/logout",
      type: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
      success: function () {
        localStorage.clear();
        alert("Logout successful. Please login to access the site.");
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
  });
});
