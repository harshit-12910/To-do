const addButton = document.querySelector(".add-task");
const userInput = document.getElementById("add-input");
const itemlist = document.querySelector(".list");
let currentIndex = 0;



addButton.addEventListener("click", function () {
  const value = userInput.value;

  if (value !== "") {
    const li = document.createElement('li');
    li.innerHTML = `
    <label class="custom-checkbox">
      <input class="checkbox" type="checkbox">
      <span class="checkmark"></span>
    </label>
    <span class="task-text">${value}</span>
  `;
      itemlist.prepend(li);
    userInput.value = "";  
    li.dataset.index = currentIndex++; // store original position


    const checkbox = li.querySelector(".checkbox");
    const span = li.querySelector(".task-text");

    checkbox.addEventListener('change', function () {
      span.classList.toggle("done", this.checked);
    
      if (this.checked) {
        itemlist.appendChild(li);
      } else {
        const originalIndex = parseInt(li.dataset.index); // lowercase 'index'
        const items = Array.from(itemlist.children);
    
        let inserted = false;
        for (let i = 0; i < items.length; i++) {
          const otherIndex = parseInt(items[i].dataset.index);
          if (originalIndex < otherIndex) {
            itemlist.insertBefore(li, items[i]);
            inserted = true;
            break;
          }
        }
        if (!inserted) itemlist.appendChild(li);
      }
    });
    

  itemlist.prepend(li);
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



