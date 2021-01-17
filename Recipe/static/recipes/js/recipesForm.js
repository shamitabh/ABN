$(document).ready(function () {
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

var rowCount = 1;

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
    url: "/recipes/api/",
    type: "POST",
    data: data,
    headers: {
      "content-type": "application/json",
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    success: function () {
      alert("Recipe added successfully.");
      window.location.href = "/recipes/";
    },
    error: function (errors) {
      error = JSON.parse(errors.responseText);
      Object.keys(error).map((item) => {
        item === "non_field_errors" || "detail"
          ? Array.isArray(error[item])
            ? alert(`${error[item][0]}`)
            : alert(`Login required to add recipe.`)
          : alert(`${item}: ${error[item][0]}`);
      });
    },
  });
};
