function clearStorage() {
  localStorage.clear();
}

function saveDataAndMoveOn() {
  let input = document.getElementById("testname").value;
  console.log(input);
  localStorage.setItem("Testperson_Name", input);
  window.location.href = "welcome.html";
}
