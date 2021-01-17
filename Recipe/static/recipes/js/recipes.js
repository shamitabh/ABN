// $(document).ready(function () {
//   $.ajax({
//     url: "/recipes/api/",
//     type: "GET",
//     success: function (response) {
//       var grid = $("#data").grid({
//         dataSource: response,
//         columns: [
//           { field: "name", title: "Name of the recipe" },
//           { field: "serving_count", title: "Serve count", sortable: true },
//           { field: "veg_indicator", title: "Veg indicator" },
//         ],
//         pager: { limit: 5 },
//       });
//     },
//   });
// });

$(document).ready(function () {
  $.ajax({
    url: "/recipes/api/",
    type: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem("token")}`,
    },
    success: function (response) {
      console.log(response);
      createTable(response);
    },
    error: function (errors) {
      error = JSON.parse(errors.responseText);
      Object.keys(error).map((item) => {
        item === "non_field_errors" || "detail"
          ? Array.isArray(error[item])
            ? alert(`${error[item][0]}`)
            : alert(`Login required to access recipes.`)
          : alert(`${item}: ${error[item][0]}`);
      });
    },
  });
});

const createTable = (data) => {
  let dataCount = 0;
  data.forEach(function () {
    $("#data tbody").append("<tr></tr>");
    $("#data tbody tr:last").append(
      `<td>${data[dataCount].name}</td><td>${data[dataCount].serving_count}</td><td>${data[dataCount].veg_indicator}</td><td><a href='/recipes/${data[dataCount].slug}' class='btn btn-outline-primary'>view</a></td>`
    );
    dataCount++;
  });
};
