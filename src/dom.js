import { Page } from ".";

function displayProject (todo, cont) {
    const body = document.body;

    const title = document.createElement("h1");
    title.textContent = todo.title;
    title.addEventListener('click', () => {
        displayTodo(todo, Page.todoInfo);
    })

    cont.appendChild(title);
    body.appendChild(cont);
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
    return {button, titleInput, descriptionIn, priorityVal, form}
}

function displayTodo(todo, cont) {
    const body = document.body;
    cont.replaceChildren();

    const title = document.createElement('h2');
    title.textContent = todo.title;
    cont.appendChild(title);

    const description = document.createElement('p');
    description.textContent = todo.description;
    cont.appendChild(description);

    const priority = document.createElement('div');
    priority.textContent = todo.priority;
    cont.appendChild(priority);

    const checklist = displayCheckL(todo.checkList);
    cont.appendChild(checklist);

    const button = document.createElement('button');
    button.textContent = "Delete Todo";
    button.addEventListener("click", () => {
        Page.todoList.removeFromList(todo);
        renderPage();
        console.log(Page.todoList);
    })
    cont.appendChild(button);

    body.appendChild(cont);
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
        task.appendChild(input);
        task.appendChild(label);
        list.appendChild(task);
    });
    return list;
}

export { displayProject, createProject, renderPage }