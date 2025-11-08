function displayProject (todo, cont) {
    const body = document.body;
    const projectCont = document.createElement("div")

    const title = document.createElement("h1");
    title.textContent = todo.title;
    title.addEventListener('click', () => {
        displayTodo(todo, cont);
    })

    projectCont.appendChild(title);
    body.appendChild(projectCont);
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

    body.appendChild(cont);
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

export { displayProject }