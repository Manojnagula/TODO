document.addEventListener('DOMContentLoaded', function () {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const deleteAllBtn = document.getElementById('delete-all-btn');
  
    // Function to fetch todos from local storage
    function fetchTodos() {
      let todos = JSON.parse(localStorage.getItem('todos')) || [];
      todos.forEach(todo => addTodoToDOM(todo));
    }
  
    // Function to add todo to the DOM
    function addTodoToDOM(todo) {
      const todoItem = document.createElement('li');
      todoItem.classList.add('todo-item');
      todoItem.innerHTML = `
        <div>
          <input type="checkbox" ${todo.completed ? 'checked' : ''}>
          <span>${todo.text}</span>
        </div>
        <button class="delete-btn">Delete</button>
      `;
      todoList.appendChild(todoItem);
    }
  
    // Function to save todos to local storage
    function saveTodos(todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  
    // Function to handle form submission
    todoForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const todoText = todoInput.value.trim();
      if (todoText !== '') {
        const newTodo = { text: todoText, completed: false };
        addTodoToDOM(newTodo);
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.push(newTodo);
        saveTodos(todos);
        todoInput.value = '';
      }
    });
  
    // Function to handle delete todo
    function deleteTodo(todoItem, todos) {
      const todoText = todoItem.querySelector('span').innerText;
      const index = todos.findIndex(todo => todo.text === todoText);
      if (index !== -1) {
        todos.splice(index, 1);
        saveTodos(todos);
      }
      todoItem.remove();
    }
  
    // Function to initialize the app
    function init() {
      fetchTodos();
  
      // Delete all todos
      deleteAllBtn.addEventListener('click', function () {
        localStorage.removeItem('todos');
        todoList.innerHTML = '';
      });
  
      // Delete individual todo
      todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('delete-btn')) {
          const todoItem = e.target.parentElement;
          let todos = JSON.parse(localStorage.getItem('todos')) || [];
          deleteTodo(todoItem, todos);
        }
      });
    }
  
    // Initialize the app
    init();
  });
  