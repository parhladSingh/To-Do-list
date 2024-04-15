window.addEventListener('load', () => {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    const nameInput = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    const username = localStorage.getItem('username') || '';

    nameInput.value = username;

    nameInput.addEventListener('change', e => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', e => {
        e.preventDefault();
        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime()
        };
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos(todos); // Pass todos array as argument
        e.target.reset();
    });

    DisplayTodos(todos); // Pass todos array as argument
});

function DisplayTodos(todos) { // Receive todos array as parameter
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';

    if (todos.length == 0) {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const content = document.createElement('content');
        content.classList.add('todo-content');
        content.innerHTML = `<input type="text" value="You haven't added any tasks until now." readonly style="margin-left: 7px;">`;
        todoItem.appendChild(content);
        todoList.appendChild(todoItem);
    } else {
        todos.forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.classList.add('todo-item');
            const label = document.createElement('label');
            const checkbox = document.createElement('input');
            const span = document.createElement('span');
            const content = document.createElement('content');
            const actions = document.createElement('div');
            const edit = document.createElement('button');
            const deleteButton = document.createElement('button');

            checkbox.type = 'checkbox';
            checkbox.checked = todo.done;
            span.classList.add('bubble');

            if (todo.category.toLowerCase() === 'personal') {
                span.classList.add('personal');
            } else {
                span.classList.remove('personal');
            }

            content.classList.add('todo-content');
            actions.classList.add('actions');
            edit.classList.add('edit');
            deleteButton.classList.add('delete');
            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            edit.innerHTML = 'Edit';
            deleteButton.innerHTML = 'Delete';

            label.appendChild(checkbox);
            label.appendChild(span);
            actions.appendChild(edit);
            actions.appendChild(deleteButton);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add('done');
            }

            checkbox.addEventListener('click', e => {
                todo.done = e.target.checked;
                localStorage.setItem('todos', JSON.stringify(todos));
                if (todo.done) {
                    todoItem.classList.add('done');
                } else {
                    todoItem.classList.remove('done');
                }
                DisplayTodos(todos);
            });

            edit.addEventListener('click', () => {
                const inputField = content.querySelector('input');
                if (edit.innerText === "Edit") {
                    // edit.classList.add('save-mode');
                    edit.innerText = "Save";
                    edit.style.backgroundColor = "green";
                    // edit.classList.add('save-mode'); // Add save-mode class
                    inputField.removeAttribute('readonly');
                    inputField.focus();
                } else {
                    edit.innerText = "Edit";
                    edit.style.backgroundColor = "#EA40A4"
                    // edit.classList.remove('save-mode'); // Remove save-mode class
                    inputField.setAttribute('readonly', true);
                    todo.content = inputField.value;
                    localStorage.setItem('todos', JSON.stringify(todos));
                }
            });

            deleteButton.addEventListener('click', () => {
                const index = todos.findIndex(t => t === todo);
                if (index !== -1) {
                    todos.splice(index, 1);
                    localStorage.setItem('todos', JSON.stringify(todos));
                    DisplayTodos(todos);
                }
            });
        });
    }
}