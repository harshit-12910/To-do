const addButton = document.querySelector(".add-task");
const userInput = document.getElementById("add-input");
const itemlist = document.querySelector(".list");


addButton.addEventListener("click", function () {
  const value = userInput.value;

  if (value !== "") {
    const li = document.createElement('li');
    li.innerHTML = `<input class="checkbox" type="checkbox"><span class="task-text">${value}</span>`;  
    itemlist.prepend(li);
    userInput.value = "";
    console.log("button clicked");

    const checkbox = li.querySelector(".checkbox");
    const span = li.querySelector(".task-text");

    checkbox.addEventListener('change', () => {
    console.log('Checkbox checked:', checkbox.checked);
  
    span.classList.toggle("done", checkbox.checked);
});

    
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
});



