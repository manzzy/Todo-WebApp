// Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoOptions = document.querySelector('.filter-todo');

// Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
todoOptions.addEventListener('click',filterTodo);

// Functions
function addTodo(event){
    // prevents form from submitting which results in autorefreshing
    event.preventDefault();
    // creating the todo div that holds the li and the buttons
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create new todo list item 
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    
    todoDiv.appendChild(newTodo); // nests the list item in the div
    saveTodos(todoInput.value);

    //Check Mark Button 
    const completedButton = document.createElement('button');
    completedButton.classList.add('complete-btn');
    completedButton.innerText = 'Check';

    todoDiv.appendChild(completedButton);
    
    //Delete or trash Button 
    const trashButton = document.createElement('button');
    trashButton.classList.add('trash-btn');
    trashButton.innerText = 'Delete';

    todoDiv.appendChild(trashButton);

    // Append the todo div to the todo list
    todoList.appendChild(todoDiv);

    // Clear todo input value after submitting
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    // delete or remove an item 
    if (item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        // Animation 
        todo.classList.add("fall");
        deleteTodo(todo);

        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
        
    }

    // check an item 
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'none';
                } else {
                    todo.style.display = 'flex';
                }
                break;
        }
    })
}

function saveTodos(todo){
    //CHECK --- if todos already exist
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}

function getTodos(){
    //CHECK --- if todos already exist
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // creating the todo div that holds the li and the buttons
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        // create new todo list item 
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo-item');
        newTodo.innerText = todo;
        
        todoDiv.appendChild(newTodo); // nests the list item in the div

        //Check Mark Button 
        const completedButton = document.createElement('button');
        completedButton.classList.add('complete-btn');
        completedButton.innerText = 'Check';

        todoDiv.appendChild(completedButton);
        
        //Delete or trash Button 
        const trashButton = document.createElement('button');
        trashButton.classList.add('trash-btn');
        trashButton.innerText = 'Delete';

        todoDiv.appendChild(trashButton);

        // Append the todo div to the todo list
        todoList.appendChild(todoDiv);
    })
}

function deleteTodo(todoitem){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos= [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todos.indexOf(todoitem.children[0].innerText);
    todos.splice(todoIndex,1);
    localStorage.setItem('todos', JSON.stringify(todos));
}