
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('toDoList') !== null) {
        const getSavedList = JSON.parse(localStorage.getItem('toDoList'));
        toDoList.insertAdjacentHTML('afterbegin', getSavedList);
    }
});

const addTodo = document.querySelector('form');
const toDoList = document.querySelector('.todo_list');
const newToDoItems = [];


addTodo.addEventListener('submit', function(e) {
    //prevent the default form submission
   e.preventDefault();
    //create the new html elements
   const todoInput = document.querySelector('#new_todo');
   const newLi = document.createElement('li');
   const newButtonCheck = document.createElement('button');
   const newButtonDelete = document.createElement('button');
   
    //add values to the elements
   newLi.innerText = todoInput.value + " ";
   newButtonCheck.classList.add('done');
   newButtonDelete.classList.add('delete');
   newButtonCheck.innerHTML = '<i class="fas fa-check-square"></i>';
   newButtonDelete.innerHTML = '<i class="fas fa-trash-alt"></i>';
   newLi.append(newButtonCheck);
   newLi.append(newButtonDelete);
   toDoList.append(newLi);
    //add the new todo to localStorage
   localStorage.setItem('toDoList', JSON.stringify(toDoList.innerHTML));
   //add each new element to a temp Array
   const item = {lable:todoInput.value, content:newLi};
   newToDoItems.push(item);
   //reset the form values
   addTodo.reset();
});

toDoList.addEventListener('click', function(e){
    //If the delete button is checked removed the element.
    if (e.target.parentElement.classList.contains('delete')) {
        e.target.parentElement.parentElement.remove();
        updateLocalStorage();
    } else if (e.target.parentElement.classList.contains('done')) {
        //If the check button is clicked strikethrough
        e.target.parentElement.parentElement.classList.toggle('cross_out');
        updateLocalStorage();
    }
});

function updateLocalStorage() {
    /* When elements in the list are 
    updated or removed, clear any existing
    localStorage, then add the new changes to localStorage.
    */
   localStorage.clear();
   localStorage.setItem('toDoList', JSON.stringify(toDoList.innerHTML));
}