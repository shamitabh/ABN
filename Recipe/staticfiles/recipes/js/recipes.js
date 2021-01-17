$(document).ready(function () {
  $.ajax({
    url: "/recipes/api/",
    type: "GET",
    success: function (response) {
      var grid = $("#data").grid({
        dataSource: response,
        columns: [
          { field: "name", title: "Name of the recipe" },
          { field: "serving_count", title: "Serve count", sortable: true },
          { field: "veg_indicator", title: "Veg indicator" },
        ],
        pager: { limit: 5 },
      });
    },
  });
});
