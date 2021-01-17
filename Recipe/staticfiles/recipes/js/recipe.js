$(document).ready(function () {
  $.ajax({
    url: `/recipes/api/${getSlug()}`,
    type: "GET",
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
    success: function () {
      alert("Recipe removed");
      window.location.href = "/recipes";
    },
  });
};

const updateRecipe = () => {
  window.location.href = `/recipes/update-recipe/${getSlug()}`;
};
