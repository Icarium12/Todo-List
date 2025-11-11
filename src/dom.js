import { Page } from ".";
import { Task } from "./task";
import { editDescription, editTitle, editPriotity, editTask, editDueDate } from "./edit";

function displayProject (todo, cont) {
    const body = document.body;
    const container = document.createElement("div");
    container.className = "project-display"

    const title = document.createElement("h3");
    title.textContent = todo.title;
    title.addEventListener('click', () => {
        displayTodo(todo, Page.todoInfo);
    })
    const edit = document.createElement("button");
    edit.className = "title-edit"
    edit.textContent = "edit";
    const editDialog = editTitle(todo, title);
    body.appendChild(editDialog);
    edit.addEventListener("click", () => {
        editDialog.showModal();
    });

    
    container.appendChild(title);
    container.appendChild(edit);
    cont.appendChild(container);
}

function createProject(body, dialog) {
    dialog.setAttribute("closedby", "any");

    const form = document.createElement('form');
    const title = document.createElement('label');
    title.setAttribute("for", "title");
    title.textContent = "Project Title*:";
    form.appendChild(title);

    const titleInput = document.createElement('input');
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "title");
    titleInput.setAttribute("required", "");
    form.appendChild(titleInput);

    const description = document.createElement('label');
    description.setAttribute("for", "description");
    description.textContent = "Project Description:"
    form.appendChild(description);

    const descriptionIn = document.createElement('input');
    descriptionIn.setAttribute("type", "textarea");
    descriptionIn.setAttribute("name", "description");
    form.appendChild(descriptionIn);

    const priority = document.createElement("label");
    priority.setAttribute("for", "priority");
    priority.textContent = "Priorty";
    form.appendChild(priority);

    const priorityVal = document.createElement("select");
    priorityVal.setAttribute("name", "priority")
    const priority1 = document.createElement("option");
    priority1.setAttribute("value", "Low");
    priority1.textContent = "Low";
    priorityVal.appendChild(priority1);

    const priority2 = document.createElement("option");
    priority2.setAttribute("value", "Medium");
    priority2.textContent = "Medium";
    priorityVal.appendChild(priority2);

    const priority3 = document.createElement("option");
    priority3.setAttribute("value", "High");
    priority3.textContent = "High";
    priorityVal.appendChild(priority3);
    form.appendChild(priorityVal);

    const date = document.createElement("label");
    date.setAttribute("for", "duedate");
    date.textContent = "Set due date";
    form.appendChild(date);
    
    const dueDate = document.createElement("input");
    dueDate.setAttribute("name", "duedate");
    dueDate.setAttribute("type", "date");
    form.appendChild(dueDate);

    const button = document.createElement("button");
    button.className = "submitProj";
    button.textContent = "submit";
    form.appendChild(button);


    dialog.appendChild(form);
    body.appendChild(dialog);
    return {button, titleInput, descriptionIn, priorityVal, form, dueDate, dialog}
}

function displayTodo(todo, cont) {
    const body = document.body;
    cont.replaceChildren();

    const title = document.createElement('h2');
    title.className = "mini-title";
    title.textContent = todo.title;
    cont.appendChild(title);

    const dueDate = document.createElement("div");
    todo.formatDueDate();
    dueDate.textContent = `Due Date: ${todo.dueDate}`;
    cont.appendChild(dueDate);

    const dueDateEdit = editDueDate(todo, dueDate);
    body.appendChild (dueDateEdit);

    const dueDateEditButton = document.createElement("button");
    dueDateEditButton.textContent = "Edit"
    dueDateEditButton.addEventListener("click", () => {
        dueDateEdit.showModal();
    })
    cont.appendChild(dueDateEditButton);

    const description = document.createElement('p');
    description.textContent = todo.description;
    cont.appendChild(description);

    const editDescriptionDialog = editDescription(todo, description);
    body.appendChild(editDescriptionDialog);

    const editDescriptionButton = document.createElement("button");
    editDescriptionButton.textContent = "Edit";
    editDescriptionButton.addEventListener("click", () => {
        editDescriptionDialog.showModal();
    })
    cont.appendChild(editDescriptionButton);

    const priority = document.createElement('div');
    priority.textContent = `Importance: ${todo.priority}`;
    cont.appendChild(priority);

    const priorityEdit = editPriotity(todo, priority);
    body.appendChild(priorityEdit);

    const priorityEditButton = document.createElement("button");
    priorityEditButton.textContent = "Edit";
    priorityEditButton.addEventListener("click", () => {
        priorityEdit.showModal();
    });

    cont.appendChild(priorityEditButton);

    const checklist = displayCheckL(todo.checkList);
    cont.appendChild(checklist);

    body.appendChild(Page.taskDialog);
    const taskButton = document.createElement("button");
    taskButton.className = "task-button";
    taskButton.textContent = "Add Checklist";
    taskButton.addEventListener("click", () => {
        const task = createTask();
        Page.taskDialog.showModal();
        addTask(task.form, task.taskInput, task.submit, todo);
    })
    cont.appendChild(taskButton);

    const button = document.createElement('button');
    button.textContent = "Delete Todo";
    button.addEventListener("click", () => {
        Page.todoList.removeFromList(todo);
        renderPage();
        console.log(Page.todoList);
    })
    cont.appendChild(button);

    const todoStatus = document.createElement("button");
    todoStatus.textContent = todo.completeStatus;
    todoStatus.addEventListener("click", () => {
        todo.setComplete();
        todoStatus.textContent = todo.completeStatus
    })
    cont.appendChild(todoStatus);

    Page.display.appendChild(cont);
}

function renderPage() {
    Page.todoCont.replaceChildren();
    Page.todoInfo.replaceChildren();
    Page.todoList.array.forEach(todo => {
        displayProject(todo, Page.todoCont);
    })
}

function displayCheckL(array) {
    const list = document.createElement('ol');
    array.forEach(item => {
        const task = document.createElement("li");
        const label = document.createElement("label");
        label.setAttribute("for", "task")
        const input = document.createElement("input");
        input.setAttribute("type", "checkbox");
        input.setAttribute("id", "task");
        label.textContent = item.description;

        const editTaskDialog = editTask(item, label);
        document.body.appendChild(editTaskDialog);

        const editTaskButton = document.createElement("button");
        editTaskButton.textContent = "Edit";
        editTaskButton.addEventListener("click", () => {
            editTaskDialog.showModal();
        })

        const delTask = document.createElement("button");
        delTask.textContent = "Remove";
        delTask.addEventListener("click", () => {
            deleteTask(item);
            delTask.style.backgroundColor = "grey";
            task.style.color = "grey";
        })
        task.appendChild(input);
        task.appendChild(label);
        task.appendChild(editTaskButton);
        task.appendChild(delTask);
        list.appendChild(task);
    });
    return list;
}

function deleteTask(task) {
    Page.todoList.array.forEach(item => {
        item.removeTask(task);
    });
}

function createTask() {
    Page.taskDialog.setAttribute("closedby", "any");
    const form = document.createElement("form");
    const label  = document.createElement("label");
    label.setAttribute("for", "task");
    label.textContent = "Add task to checklist";
    form.appendChild(label);

    const taskInput = document.createElement("input");
    taskInput.setAttribute("name", "task");
    taskInput.setAttribute("type", "textarea");
    taskInput.setAttribute("required", "");
    form.appendChild(taskInput);

    const submit = document.createElement("button");
    submit.textContent = "Submit";
    form.appendChild(submit);

    Page.taskDialog.appendChild(form);

    return {form, taskInput, submit}
}

function addTask(form, description, button, todo) {
    button.addEventListener("click", (e) => {
        if (form.checkValidity()) {
            e.preventDefault();
            const task = new Task(description.value);
            todo.addTask(task);
            displayTodo(todo, Page.todoInfo);
            Page.taskDialog.replaceChildren();
            Page.taskDialog.close();
        }
    })
}

export { displayProject, createProject, renderPage, createTask }