$(document).ready(function () {
  $.ajax({
    url: `/recipes/api/${getSlug()}`,
    type: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      // Recipe name
      $("span#header").text(response.name);

      // indicate if the recipe is vegetarian
      response.veg_indicator
        ? $("h3 img").attr("src", "/static/recipes/images/veg.png")
        : $("h3 img").attr("src", "/static/recipes/images/non-veg.jpg");

      // serve count
      $("#serve").text("People served: " + response.serving_count);

      // Enlist ingredients
      if (response.ingredients) {
        var key = Object.keys(response.ingredients);
        key.map((item) => {
          $("#ingredients ul").append(
            `<li>${item} - ${response.ingredients[item]}</li>`
          );
        });
      }

      // Display instructions
      $("#instructions").text(response.instructions);
    },
    error: function (errors) {
      error = JSON.parse(errors.responseText);
      Object.keys(error).map((item) => {
        item === "non_field_errors" || "detail"
          ? Array.isArray(error[item])
            ? alert(`${error[item][0]}`)
            : alert(`Login required to access recipe.`)
          : alert(`${item}: ${error[item][0]}`);
      });
    },
  });
});

const getSlug = () => {
  const url = document.URL;
  var regex = url.match(new RegExp("recipes\\/(.+)"));
  return regex[1];
};

const deleteRecipe = () => {
  $.ajax({
    url: `/recipes/api/${getSlug()}`,
    type: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    success: function () {
      alert("Recipe removed");
      window.location.href = "/recipes";
    },
    error: function (errors) {
      error = JSON.parse(errors.responseText);
      Object.keys(error).map((item) => {
        item === "non_field_errors" || "detail"
          ? Array.isArray(error[item])
            ? alert(`${error[item][0]}`)
            : alert(`Login required to delete recipe.`)
          : alert(`${item}: ${error[item][0]}`);
      });
    },
  });
};

const updateRecipe = () => {
  window.location.href = `/recipes/update-recipe/${getSlug()}`;
};
