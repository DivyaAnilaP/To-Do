const addTaskButton = document.getElementById('add-task');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

const loadTasks = async () => {
    const response = await fetch('http://localhost:5000/todos');
    const todos = await response.json();
    taskList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `${todo.task} <button class="delete" onclick="deleteTask('${todo._id}')">Delete</button>`;
        taskList.appendChild(li);
    });
};

const addTask = async () => {
    const task = taskInput.value;
    await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, completed: false })
    });
    taskInput.value = '';
    loadTasks();
};

const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/todos/${id}`, {
        method: 'DELETE'
    });
    loadTasks();
};

addTaskButton.addEventListener('click', addTask);
window.onload = loadTasks;
