//Search any keypress

$(document).ready(function () {
  $("#searchField").on("keypress", function (e) {
    $(".product-result").text("");
    if (e.which == 13) {
      e.preventDefault();
    }
    var userText = $(this).val().trim();
    if (userText.length > 0) {
      $.ajax({
        url: "backend/search_city.php",
        type: "GET",
        dataType: "json",
        data: { search: userText },
        success: function (response) {
          if (response) {
            var availableTags = [];
            var showCity = {};
            $.each(response, function (key, value) {
              if (value.name) {
                availableTags.push(value.name);
              }
            });
            $("#searchField")
              .autocomplete({
                source: availableTags,
                select: function (event, ui) {
                  event.preventDefault();
                  response.forEach((city) => {
                    if (city.name === ui.item.label) {
                      showCity = city;
                      $(this).val(ui.item.label);
                    }
                  });
                  $(".product-result").append(`
                  <div class="mt-5">
                    <table class="table bordered">
                      <thead>
                        <tr class="table-success">
                        <th>City Name</th>
                        <th>City Code</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>${showCity.name}</td>
                        <td>${showCity.zip_code}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  `);
                },
              })
              .focusout(function () {
                $(this).val("");
                $(this).keydown();
              });
          }
        },
      });
    }
  });
});



// One Data Base call

// let cities = [];
// var availableTags = [];
// var showCity = {};

// $(document).ready(function () {
//   $.ajax({
//     url: "backend/search_city.php",
//     type: "GET",
//     dataType: "json",
//     success: function (response) {
//       if (response) {
//         $.each(response, function (key, value) {
//           if (value.name) {
//             availableTags.push(value.name);
//             cities.push(value);
//           }
//         });
//       }
//     },
//   });
//   $("#searchField").on("keypress", function (e) {
//     $(".product-result").text("");
//     if (e.which == 13) {
//       e.preventDefault();
//     }
//     var userText = $(this).val().trim();
//     if (userText.length > 0) {
//       $("#searchField")
//         .autocomplete({
//           source: availableTags,
//           select: function (event, ui) {
//             event.preventDefault();
//             cities.forEach((city) => {
//               if (city.name === ui.item.label) {
//                 showCity = city;
//                 $(this).val(ui.item.label);
//               }
//             });
//             $(".product-result").append(`
//             <div class="mt-5">
//               <table class="table bordered">
//                 <thead>
//                   <tr class="table-success">
//                   <th>City Name</th>
//                   <th>City Code</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                   <td>${showCity.name}</td>
//                   <td>${showCity.zip_code}</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//             `);
//           },
//         })
//         .focusout(function () {
//           $(this).val("");
//           $(this).keydown();
//         });
//     }
//   });
// });
