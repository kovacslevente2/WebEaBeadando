var selectedRow = null
function onFormSubmit() {
    if (validate()) {
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}
function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["email"] = document.getElementById("email").value;
    formData["gender"] = document.getElementById("gender").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}
function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}
function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.city;
}
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function validate() {
    isValid = true;

    // Név validáció
    if (document.getElementById("fullName").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }

    // Email validáció
    const email = document.getElementById("email").value;
    if (!email.includes("@")) {
        isValid = false;
        document.getElementById("emailValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("emailValidationError").classList.contains("hide"))
            document.getElementById("emailValidationError").classList.add("hide");
    }

    // Nem validáció
    const gender = document.getElementById("gender").value.toLowerCase();
    if (gender !== "férfi" && gender !== "nő") {
        isValid = false;
        document.getElementById("genderValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("genderValidationError").classList.contains("hide"))
            document.getElementById("genderValidationError").classList.add("hide");
    }

    // Város validáció
    if (document.getElementById("city").value == "") {
        isValid = false;
        document.getElementById("cityValidationError").classList.remove("hide");
    } else {
        if (!document.getElementById("cityValidationError").classList.contains("hide"))
            document.getElementById("cityValidationError").classList.add("hide");
    }

    return isValid;
}

// Rendezés funkció
function sortTable(columnIndex) {
    const table = document.getElementById("employeeList");
    const rows = Array.from(table.rows).slice(1); 
    const isAscending = table.getAttribute("data-sort-order") === "asc";
    const direction = isAscending ? 1 : -1;

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].innerText.toLowerCase();
        const bText = b.cells[columnIndex].innerText.toLowerCase();
        return aText > bText ? direction : aText < bText ? -direction : 0;
    });

    rows.forEach(row => table.tBodies[0].appendChild(row));
    table.setAttribute("data-sort-order", isAscending ? "desc" : "asc");
}

// Keresés funkció
function filterTable() {
    const filter = document.getElementById("filterInput").value.toLowerCase();
    const rows = document.getElementById("employeeList").rows;

    for (let i = 1; i < rows.length; i++) { 
        const cells = rows[i].cells;
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) { 
            if (cells[j].innerText.toLowerCase().includes(filter)) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? "" : "none";
    }
}
