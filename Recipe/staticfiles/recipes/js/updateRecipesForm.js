var rowCount = 1;

$(document).ready(function () {
  // when page loads
  $.ajax({
    url: `/recipes/api/${getSlugUpdated()}`,
    type: "GET",
    success: function (response) {
      if (
        response.ingredients &&
        Object.keys(response.ingredients).length > 0
      ) {
        let keys = Object.keys(response.ingredients);
        let ingreObj = response.ingredients;
        $("#ingreDiv div#row0 input#item").val(keys[0]);
        $("#ingreDiv div#row0 input#amount").val(ingreObj[keys[0]]);
        while (rowCount < keys.length) {
          $("#ingreDiv").append(
            `<div id='row${rowCount}'><input type='text' id='item' placeholder='item' value=${
              keys[rowCount]
            }>&nbsp;<input type='text' id='amount' placeholder='amount' value=${
              ingreObj[keys[rowCount]]
            }>&nbsp;<button class='btn' type='button' onclick='removeInput(row${rowCount})'><i class='fa fa-minus'></i></button></div>`
          );
          rowCount++;
        }
      }
    },
    error: function () {},
  });

  // while submitting the form
  $("form").submit(function (e) {
    e.preventDefault();
    var formData = {};
    formData["name"] = $("[name='name']").val();
    formData["serving_count"] = parseInt($("[name='serving_count']").val());
    formData["veg_indicator"] = $("#id_veg_indicator").is(":checked")
      ? true
      : false;
    formData["ingredients"] = getIngredients();
    formData["instructions"] = $("[name='instructions']").val();
    submitForm(JSON.stringify(formData));
  });
});

const addInput = () => {
  $("#ingreDiv").append(
    `<div id='row${rowCount}'><input type='text' id='item' placeholder='item'>&nbsp;<input type='text' id='amount' placeholder='amount'>&nbsp;<button class='btn' type='button' onclick='removeInput(row${rowCount})'><i class='fa fa-minus'></i></button></div>`
  );
  rowCount++;
};

const removeInput = (target) => {
  target.remove();
};

const getIngredients = () => {
  const ingredientList = {};
  $("#ingreDiv")
    .children()
    .each(function () {
      let item = $(this).children("#item").val();
      let amount = $(this).children("#amount").val();
      if (item && amount) {
        ingredientList[`${item}`] = amount;
      }
    });
  return ingredientList;
};

const submitForm = (data) => {
  $.ajax({
    url: `/recipes/api/${getSlugUpdated()}`,
    type: "PUT",
    data: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    success: function () {
      alert("Recipe updated successfully.");
      window.location.href = "/recipes/";
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

const getSlugUpdated = () => {
  const url = document.URL;
  var regex = url.match(new RegExp("update-recipe\\/(.+)"));
  return regex[1];
};
