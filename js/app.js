var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks


var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");

  var checkBox = document.createElement("input");
  var label = document.createElement("label");
  var editInput = document.createElement("input");
  var editButton = document.createElement("button");
  var deleteButton = document.createElement("button");

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
}

var addTask = function() {
  console.log("Add task...");

  var listItem = createNewTaskElement(taskInput.value);
  bindTaskEvents(listItem, taskCompleted);
  incompleteTaskHolder.appendChild(listItem);
  taskInput.value = "";
}

var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode")

  if(containsClass){
    label.innerText = editInput.value;
  } else {
    editInput.value = label.innerText;
  }

  listItem.classList.toggle("editMode");
}

var deleteTask = function() {
  console.log("Delete task...");

  var listItem = this.parentNode; // the parentNode here is <li>
  var ul = listItem.parentNode;   // the parentNode here is <ul>
  ul.removeChild(listItem);       // removing <li> from <ul>
}

var taskCompleted = function(){
  console.log("Complete task...");
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete); //So that this listItem is ready to be incomplete when checked again.
}

var taskIncomplete = function(){
  console.log("Incomplete task...");
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted); //So that this listItem is ready to be complete when checked again.
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("Bind list item events");
  var checkBox = taskListItem.querySelector("input[type=checkbox]"); // can't use input as there is another input type text
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask
  checkBox.onchange = checkBoxEventHandler;
}

addButton.addEventListener("click", addTask);

for (var i = 0; i < incompleteTaskHolder.children.length; i++){
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

for (var i = 0; i < completedTasksHolder.children.length; i++){
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
