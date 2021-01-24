
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('toDoList') !== null) {
        const getSavedList = JSON.parse(localStorage.getItem('toDoList'));
        toDoList.insertAdjacentHTML('afterbegin', getSavedList);
    }
});

const addTodo = document.querySelector('form');
const toDoList = document.querySelector('.todo_list');

addTodo.addEventListener('submit', function(e) {
    //prevent the default form submission
    e.preventDefault();
    //create the new html elements
    const todoInput = document.querySelector('#new_todo');
    const newLi = document.createElement('li');
    //add the check and trash icons
    newLi.innerHTML = '<i class="fas fa-check-square"></i><i class="fas fa-trash-alt"></i>';
    //add the todo value
    newLi.prepend(todoInput.value + " ");
    //add the new todo item
    toDoList.append(newLi);
    //add the new todo to localStorage
    localStorage.setItem('toDoList', JSON.stringify(toDoList.innerHTML));
    //reset the form values
    addTodo.reset();
});

toDoList.addEventListener('click', function(e){
    const target = e.target;
    if (target.classList.contains('fa-trash-alt')) {
        //If the trash icon is clicked removed the list item.
        target.parentElement.remove();
        updateLocalStorage();
    } else if (target.classList.contains('fa-check-square')) {
        //If the check icon is clicked, strike through the list item.
        target.parentElement.classList.toggle('cross_out');
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