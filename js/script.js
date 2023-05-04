function validationFrom() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var address = document.getElementById("address").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }
  if (age == "") {
    alert("Age is required");
    return false;
  }

  if (age < 1) {
    alert("Age must not be zero or less than zero");
    return false;
  }

  if (address == "") {
    alert("Address is required");
    return false;
  }

  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email address");
    return false;
  }

  return true;
}

function func_showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var html = "";

  peopleList.forEach(function (element, index) {
    html += `
        <tr>
            <td>${element.name}</td>
            <td>${element.age}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
            <td><button class="btn btn-outline-danger" onclick="func_deleteData(${index})">Delete Data</button></td>
            <td><button class="btn btn-outline-warning" onclick="func_updateData(${index})">Edit Data</button></td>
        </tr>
        `;
  });
  document.querySelector("#crudTable tbody").innerHTML = html;
}

document.onload = func_showData();

function func_AddData() {
  if (validationFrom() == true) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var address = document.getElementById("address").value;
    var email = document.getElementById("email").value;
    // console.log(name, age, address, email);

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      address: address,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    func_showData();
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";
  }
}

function func_deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  func_showData();
}

function func_updateData(index) {
  document.getElementById("adddata_btn").style.display = "none";
  document.getElementById("update_btn").style.display = "block";

  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[index]["name"];
  document.getElementById("age").value = peopleList[index]["age"];
  document.getElementById("address").value = peopleList[index]["address"];
  document.getElementById("email").value = peopleList[index]["email"];

  document.querySelector("#update_btn").onclick = function () {
    peopleList[index]["name"] = document.getElementById("name").value;
    peopleList[index]["age"] = document.getElementById("age").value;
    peopleList[index]["address"] = document.getElementById("address").value;
    peopleList[index]["email"] = document.getElementById("email").value;

    localStorage.setItem("peopleList", JSON.stringify(peopleList));

    func_showData();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";

    document.getElementById("adddata_btn").style.display = "block";
    document.getElementById("update_btn").style.display = "none";
  };
}
