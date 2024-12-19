const taskList = document.querySelector(".tasklist");

let savedTasks = JSON.parse(localStorage.getItem("tasks"));

if (savedTasks) {
  for (let i = 0; i < savedTasks.length; i++) {
    document.querySelector(".empty").style.display = "none";
    let newTask = createListItem();
    newTask.querySelector(".text").textContent = savedTasks[i].text;
    newTask.querySelector(".completed").checked = savedTasks[i].isChecked;
    taskList.append(newTask);
    function deleteTask() {
      newTask.remove();
      const taskListItems = document.querySelectorAll(".list-item");
      if (taskListItems.length === 0) {
        document.querySelector(".empty").style.display = "block";
      }
      updateLocalStorage()
    }
    newTask.querySelector(".completed").addEventListener("click", updateLocalStorage);
    newTask.querySelector(".trash-icon").addEventListener("click", deleteTask);
    updateLocalStorage();
  }
}

const addButton = document.querySelector(".add-button");
addButton.addEventListener("click", addTask);

function addTask() {
  document.querySelector(".empty").style.display = "none";
  const newTask = createListItem();
  newTask.querySelector(".text").textContent = document.querySelector(".add-input").value;
  taskList.append(newTask);
  function deleteTask() {
    newTask.remove();
    const taskListItems = document.querySelectorAll(".list-item");
    if (taskListItems.length === 0) {
      document.querySelector(".empty").style.display = "block";
    }
    updateLocalStorage()
  }
  newTask.querySelector(".completed").addEventListener("click", updateLocalStorage);
  newTask.querySelector(".trash-icon").addEventListener("click", deleteTask);
  document.querySelector(".add-input").value = "";
  updateLocalStorage();
}

function createListItem() {
  const newItem = document.createElement("li");
  newItem.classList.add("list-item");
  newItem.innerHTML = `    <p class="text"></p>
    <div class="trash-icon"><img src="./assets/image/trashicon.svg" alt="delete"></div>
    <input type="checkbox" class="completed">`;
  return newItem;
}

const clearButton = document.querySelector(".clear-button");
clearButton.addEventListener("click", clearTaskList);


function clearTaskList() {
  const taskListItems = document.querySelectorAll(".list-item");
  for (let item of taskListItems) {
    item.remove();
  }
  document.querySelector(".empty").style.display = "block";
  updateLocalStorage();
}

document.querySelector("#test").addEventListener("click", updateLocalStorage);

function updateLocalStorage() {
  let taskListItems = [];
  let taskListItemsArray = Array.from(document.querySelectorAll(".list-item"));
  for (let i = 0; i < taskListItemsArray.length; i++) {
    let item = {};
    item.text = taskListItemsArray[i].querySelector(".text").textContent;
    item.isChecked = taskListItemsArray[i].querySelector(".completed").checked;
    taskListItems.push(item);
  }
  localStorage.setItem("tasks", JSON.stringify(taskListItems))
}