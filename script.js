const addButton = document.querySelector(".add-task");
const userInput = document.getElementById("add-input");
const itemlist = document.querySelector(".list");

addButton.addEventListener("click", function () {
  const value = userInput.value;

  if (value !== "") {
    const li = document.createElement('li');
    li.textContent = value;
    itemlist.appendChild(li);
    userInput = "";
    console.log("button clicked");
    
  } else {
    alert("Please Enter Something!")
    console.log("user didn't put anything");
  };
});

userInput.addEventListener("keydown", function(event) {
  if(event.key === "Enter") {
    addButton.click();
    console.log("User pressed enter");
    
  }
})