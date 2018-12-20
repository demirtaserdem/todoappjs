const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");

//Tüm Event listenerler
evenListeners();
function evenListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",LoadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);
    clearButton.addEventListener("click",clearAllTodos);
}

function addTodo(e){
    const newTodo = todoInput.value.trim();
    if (newTodo === ""){
          showAlert("danger","Lütfen Bir Todo Giriniz...");
    }
    else {
    addTodoToUI(newTodo); //
    addTodoToStroge(newTodo);
    showAlert("success",`${newTodo} Todo Başarıyla eklendi...`)
    todoInput.value = null; 
    }
    e.preventDefault();
};

function clearAllTodos(e){
    //Arayüzden todoları temizleme
    if(confirm("Tümünü Silmek İstediğinize Emin Misiniz?")){
        // todoList.innerHTML = null; // Yavaş
        while(todoList.firstElementChild != null){
            todoList.removeChild(todoList.firstElementChild);
        };
    };
    localStorage.removeItem("todos");

};

function filterTodos(e){
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function(listItem){
        const text = listItem.textContent.toLowerCase();
    
    if(text.indexOf(filterValue) === -1){
        listItem.setAttribute("style","display : none !important")
    }

    else{
        listItem.setAttribute("style","display : block");
    }
    });
};

function deleteTodoFromStroge(deleteTodo){
    let todos = getTodosToStroge();
    todos.forEach(function(todo,index){
        if(todo === deleteTodo){
            todos.splice(index,1);
        };
    });
    localStorage.setItem("todos",JSON.stringify(todos));
};

function deleteTodo(e){
    if(e.target.className === "fa fa-remove"){
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStroge(e.target.parentElement.parentElement.textContent);
        showAlert("success","Todo Başarıyla Silindi...");
    }
}

function LoadAllTodosToUI(){
    let todos = getTodosToStroge();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
};



function getTodosToStroge(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
};

function addTodoToStroge(newTodo){
    let todos = getTodosToStroge();
    todos.push(newTodo);
    localStorage.setItem("todos",JSON.stringify(todos));
};

function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    window.setTimeout(function(){
        alert.remove();    
    },1000);
}
// List İtem Oluşturma
function addTodoToUI(newTodo){
    const ListItem = document.createElement("li");
    
    // Link Oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";
    
    ListItem.className = "list-group-item d-flex justify-content-between";
    ListItem.appendChild(document.createTextNode(newTodo));
    ListItem.appendChild(link);
    

    //Todolist'e List İtemi ekleme

    todoList.appendChild(ListItem);
    
};