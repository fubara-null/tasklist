const form       = document.querySelector('#task-form');
const clearBtn   = document.querySelector('.clear-task');
const filter     = document.querySelector('#filter');
const taskList   = document.querySelector('.collection');
const taskInput  = document.querySelector('#task');

//load event listener
LoadEventListener();

function LoadEventListener(){
  document.addEventListener('DOMContentLoaded', getStoredItem);
  form.addEventListener('submit', addTask);
  filter.addEventListener('keyup', filterTask);
  clearBtn.addEventListener('click', removeAllTask);


}

function addTask(e){
  if(taskInput.value === ''){
    alert('Add an Item');
  }

  const li = document.createElement('li');
  li.className = 'collection-item';
  li.appendChild(document.createTextNode(taskInput.value));

  const link = document.createElement('a');
  link.className = 'delete';
  link.innerHTML = '<i class= "fa fa-remove"></i>';

  //appending the link to the list
  li.appendChild(link);

  //apppending the  li to ul
  taskList.appendChild(li);

 //store in Local storage
 storeInLocalStorage(taskInput.value);

  //clear input 
  taskInput.value = '';


  e.preventDefault();
}

function filterTask(e){
  //get the filter input value
  const text = e.target.value.toLowerCase();
  //Get all the li items
  document.querySelectorAll('.collection-item').forEach(function(task){
    const liItems = task.firstChild.textContent;
    if(liItems.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    }else{
      task.style.display = 'none';
    }
  })
}

//remove all list at once

function removeAllTask(){
  while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}


// retrieving data from local storage and displaying it on the UI
function getStoredItem(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []; 
  }else{
     tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
  
    const link = document.createElement('a');
    link.className = 'delete';
    link.innerHTML = '<i class= "fa fa-remove"></i>';
  
    //appending the link to the list
    li.appendChild(link);
  
    //apppending the  li to ul
    taskList.appendChild(li);
  });
}

//Setting data into local storage
function storeInLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []; 
  }else{
     tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}


