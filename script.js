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
      <button class="star-btn">☆</button>
    `;
    itemlist.prepend(li);
    userInput.value = "";
    li.dataset.index = currentIndex++;

    const checkbox = li.querySelector(".checkbox");
    const span = li.querySelector(".task-text");
    const starBtn = li.querySelector(".star-btn");
    li.dataset.starred = "false";

    checkbox.addEventListener('change', function () {
      span.classList.toggle("done", this.checked);
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