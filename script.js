// Load saved items from local storage when the page loads
document.addEventListener("DOMContentLoaded", function () {
  loadItems();
});

// Function to load items from local storage
function loadItems() {
  const list = document.getElementById("shoppingList");
  const savedItems = JSON.parse(localStorage.getItem("shoppingList")) || [];

  savedItems.forEach((itemText) => {
    const li = createListItem(itemText);
    list.appendChild(li);
  });
}

// Function to create a list item
function createListItem(itemText) {
  const li = document.createElement("li");
  li.textContent = itemText;

  // Add a delete button to the item
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    li.remove();
    saveItems();
  };

  li.appendChild(deleteButton);
  return li;
}

// Function to add an item to the list
function addItem() {
  const input = document.getElementById("itemInput");
  const itemText = input.value.trim();

  if (itemText !== "") {
    const list = document.getElementById("shoppingList");

    // Create a new list item
    const li = createListItem(itemText);
    list.appendChild(li);

    // Clear the input field
    input.value = "";

    // Save the updated list to local storage
    saveItems();
  }
}

// Function to save items to local storage
function saveItems() {
  const list = document.getElementById("shoppingList");
  const items = [];

  // Loop through the list items and save their text content
  list.querySelectorAll("li").forEach((li) => {
    items.push(li.textContent.replace("Delete", "").trim());
  });

  // Save the items array to local storage
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

// Add event listener for the "Enter" key
document.getElementById("itemInput").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});