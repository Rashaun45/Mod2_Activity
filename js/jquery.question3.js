/*
  Module 2 - Assignment 2 - (Question 3)
  Group members:
  - Sherona Findley
  - Romain Stoddart
  - Rashaun Lennox
  - Brittany Small 
*/

// Run once the DOM is ready (same pattern as the Week 8 jQuery lesson)
$(function () {
  const message = $("#message");

  // Show a friendly message instead of DataTables' default alert box
  $.fn.dataTable.ext.errMode = "none";
  $("#employeeTable").on("error.dt", function (event, settings, techNote, errorMessage) {
    console.error("The JSON could not be loaded.", errorMessage);
    message.text("The employee data could not be loaded. Check that MOCK_DATA.json is next to Question_3.html and that the page is opened with Live Server.");
  });

  const table = $("#employeeTable").DataTable({
    // MOCK_DATA.json looks like { "data": [ ... ] }.
    // DataTables reads the "data" array by default and parses the JSON for us.
    ajax: "MOCK_DATA.json",
    columns: [
      { data: "id" },
      { data: "name" },
      {
        data: "email",
        // A template literal builds the link, like the course cards in Week 8.
        // Only the displayed value becomes a link, so sorting and searching still use the plain email.
        render: function (email, type) {
          return type === "display" ? `<a href="mailto:${email}">${email}</a>` : email;
        }
      },
      { data: "department" },
      { data: "position" },
      { data: "office" },
      { data: "start_date" },
      { data: "status" }
    ],
    initComplete: function (settings, json) {
      message.text(`Loaded ${json.data.length} employee records.`);
    }
  });

  // Extra jQuery interaction: filter the Status column from the select box
  $("#statusFilter").on("change", function () {
    const status = $(this).val();
    // ^ and $ match the whole word, so "Active" does not also match "Inactive"
    table.column(7).search(status ? `^${status}$` : "", true, false).draw();
  });
});