const addButton = document.querySelector(".add-task");
const userInput = document.getElementById("add-input");
const itemlist = document.querySelector(".list");
const deleteSelectedButton = document.querySelector(".delete-selected");
let currentIndex = 0;

addButton.addEventListener("click", function () {
  const value = userInput.value;

  if (value !== "") {
    const li = document.createElement('li');

    const label = document.createElement('label');
    label.classList.add('custom-checkbox');

    const checkbox = document.createElement('input');
    checkbox.classList.add('checkbox');
    checkbox.type = 'checkbox';

    const checkmark = document.createElement('span');
    checkmark.classList.add('checkmark');

    label.appendChild(checkbox);
    label.appendChild(checkmark);

    const taskTextSpan = document.createElement('span');
    taskTextSpan.classList.add('task-text');
    taskTextSpan.textContent = value; // Use textContent here!

    const starBtn = document.createElement('button');
    starBtn.classList.add('star-btn');
    starBtn.textContent = '☆';

    li.appendChild(label);
    li.appendChild(taskTextSpan);
    li.appendChild(starBtn);

    itemlist.prepend(li);
    userInput.value = "";
    li.dataset.index = currentIndex++;
    li.dataset.starred = "false";

    checkbox.addEventListener('change', function () {
      taskTextSpan.classList.toggle("done", this.checked);
      reorderItems(); // Reorder on checkbox change
    });

    starBtn.addEventListener("click", function () {
      const isStarred = li.dataset.starred === "true";
      li.dataset.starred = isStarred ? "false" : "true";
      starBtn.textContent = isStarred ? "☆" : "★";
      reorderItems(); // Reorder on star click
    });

  } else {
    alert("Please Enter Something!");
    console.log("user didn't put anything");
  };
});

userInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addButton.click();
    console.log("User pressed enter");
  }
});

function reorderItems() {
  const items = Array.from(itemlist.children);

  items.sort((a, b) => {
    const aChecked = a.querySelector(".checkbox").checked ? 1 : 0;
    const bChecked = b.querySelector(".checkbox").checked ? 1 : 0;
    const aStar = a.dataset.starred === "true" ? -1 : 1; // Starred items come first
    const bStar = b.dataset.starred === "true" ? -1 : 1;
    const aIndex = parseInt(a.dataset.index);
    const bIndex = parseInt(b.dataset.index);

    // Prioritize starred items, then unchecked items by original index, then checked items
    if (aStar !== bStar) {
      return aStar - bStar;
    }
    if (aChecked !== bChecked) {
      return aChecked - bChecked; // Checked items go last
    }
    return aIndex - bIndex; // Maintain original order for items with the same star/check status
  });

  items.forEach(item => itemlist.appendChild(item));
}

reorderItems(); // Initial reorder on page load (if there are any items initially)

function updateDeleteButtonVisibility(){
  const checkedCheckboxes = itemlist.querySelectorAll('input[type="checkbox"]:checked');
  if (checkedCheckboxes.length > 0) {
    deleteSelectedButton.classList.add('visible');
  } else {
    deleteSelectedButton.classList.remove('visible');
  }
}

itemlist.addEventListener('change', function(event) {
  if (event.target.type === 'checkbox') {
    updateDeleteButtonVisibility();
  }
});

deleteSelectedButton.addEventListener('click', function() {
  const checkedItems = itemlist.querySelectorAll('li input[type="checkbox"]:checked');

  checkedItems.forEach(checkbox => {
    const listItem = checkbox.parentNode.parentNode; 
    itemlist.removeChild(listItem);
  });

  reorderItems();
  updateDeleteButtonVisibility();
});

updateDeleteButtonVisibility();