//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//EventListeners
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click', filterTodo);


//Functions

function addTodo(event){
     // prevent form from submitting
     event.preventDefault();
     // create the todo
     const todoDiv = document.createElement('div');
     todoDiv.classList.add("todo");
     // create todo items
     const newTodo = document.createElement('li');
     newTodo.innerText= todoInput.value;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);
     // add todo to local storage
     saveLocalTodos(todoInput.value);
     // create checked button
     const checkedButton = document.createElement('button');
     checkedButton.innerHTML = '<i class="fas fa-check"></i>';
     checkedButton.classList.add("check-btn");
     todoDiv.appendChild(checkedButton)
     // create trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //append to list
     todoList.appendChild(todoDiv);
     // Clear todo input value
     todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    // delete todo
    if(item.classList[0] === "trash-btn"){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function(){
            todo.remove();
        });
        
    }

    if(item.classList[0] === "check-btn"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }else{
                    todo.style.display = "none";
                }
                break;
            case "incompleted":
                if(!todo.classList.contains("completed")){
                     todo.style.display = "flex";
                 }else{
                     todo.style.display = "none";
                 }
                 break;
        }
    });
}

function saveLocalTodos(todo){
    // check if there is already one todo
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // create the todo
     const todoDiv = document.createElement('div');
     todoDiv.classList.add("todo");
     // create todo items
     const newTodo = document.createElement('li');
     newTodo.innerText= todo;
     newTodo.classList.add("todo-item");
     todoDiv.appendChild(newTodo);
     // add todo to local storage
    
     // create checked button
     const checkedButton = document.createElement('button');
     checkedButton.innerHTML = '<i class="fas fa-check"></i>';
     checkedButton.classList.add("check-btn");
     todoDiv.appendChild(checkedButton)
     // create trash button
     const trashButton = document.createElement('button');
     trashButton.innerHTML = '<i class="fas fa-trash"></i>';
     trashButton.classList.add("trash-btn");
     todoDiv.appendChild(trashButton);
     //append to list
     todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    // storing the index of the element to be removed in the const
    const todoIndex = todo.children[0].innerText;
    // delete the element at the given index, the second argument is the number 
    // of element to be deleted
    todos.splice(todos.indexOf(todoIndex), 1);
    
    localStorage.setItem("todos", JSON.stringify(todos));
}

// const todos = ['apple','john','donut','boy'];

// const johnindex = todos.indexOf("john");

// todos.splice(johnindex,1);

// console.log(todos);