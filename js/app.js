//Problem: User interaction doesn't provide desired results
//Solution: Add interactivity so the user can manage daily tasks

var taskInput = document.getElementById("new-task"); //new-task
var addButton = document.getElementsByTagName("button")[0]; //first button
var incompleteTaskHolder = document.getElementById("incomplete-tasks"); //incomplete-tasks
var completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New Task List Item
var createNewTaskElement = function(taskString){
  var listItem = document.createElement("li");
    //input (checkbox)
  var checkBox = document.createElement("input");
    //label
  var label = document.createElement("label");
    //input (text)
  var editInput = document.createElement("input");
    //button with .edit
  var editButton = document.createElement("button");
    //button with .delete
  var deleteButton = document.createElement("button");

  //Each element needs modifying

  checkBox.type = "checkbox";
  editInput.type = "text";
  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  label.innerText = taskString;

  //Each element needs appending
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);


  return listItem;
}

//Add new task
var addTask = function() {
  console.log("Add task...");
  //create a new list item with the text from #new-task;
  var listItem = createNewTaskElement(taskInput.value);

  //text should append to incomplete task list
  bindTaskEvents(listItem, taskCompleted);
  incompleteTaskHolder.appendChild(listItem);
}

//Edit an existing task
var editTask = function() {
  console.log("Edit task...");

  var listItem = this.parentNode;

  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");

  var containsClass = listItem.classList.contains("editMode")
   //when click Edit button is pressed
     //if the class of the parent is .editMode
  if(containsClass){
      //switch from .editMode to saved mode
      //label text become the input's value
    label.innerText = editInput.value;
  } else {
    //else
      //switch to .editMode
      //input value becomes the label's text
    editInput.value = label.innerText;
  }

    //Toggle .editMode on the parent
}

//Delete
var deleteTask = function() {
  console.log("Delete task...");
  //when delete button is presssed
     //remove the parent list item from ul
  var listItem = this.parentNode; // the parentNode here is <li>
  var ul = listItem.parentNode;   // the parentNode here is <ul>
  ul.removeChild(listItem);       // removing <li> from <ul>
}

//Mark a task as complete
var taskCompleted = function(){
  console.log("Complete task...");
  //when the Checkbox is checked
    //Append checked task list item to the #completed-tasks
  var listItem = this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete); //So that this listItem is ready to be incomplete when checked again.
}

//Mark a task as incomplete
var taskIncomplete = function(){
  console.log("Incomplete task...");
  //when the Checkbox is checked
    //Append checked task list item to the #incompleted-tasks
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted); //So that this listItem is ready to be complete when checked again.
}

var bindTaskEvents = function(taskListItem, checkBoxEventHandler){
  console.log("Bind list item events");
   //select taskListItem's children
  var checkBox = taskListItem.querySelector("input[type=checkbox]"); // can't use input as there is another input type text
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
   //bind editTask to edit button
  editButton.onclick = editTask;
   //bind deleteTask to delete button
  deleteButton.onclick = deleteTask
   //bind checkBoxEventHandler to check box
  checkBox.onchange = checkBoxEventHandler;
}

//Set the click hander for addTask
addButton.onclick = addTask;

//cycle over incompleteTasksHolders ul list items
for (var i = 0; i < incompleteTaskHolder.children.length; i++){
    //bind events to list item's children (taskCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}


//cycle over completedTasksHolders ul list items
for (var i = 0; i < completedTasksHolder.children.length; i++){
    //bind events to list item's children (taskIncomplete)
  bindTaskEvents(completedTasksHolder.children[i], taskIncomplete);
}
