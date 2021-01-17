$(document).ready(function () {
  // handle display of username
  if (localStorage.getItem("user")) {
    $("#user").append(
      `<h5 id="username">Hi ${localStorage.getItem("user")},</h5>`
    );
  } else {
    $("#user #username").remove();
  }
});
