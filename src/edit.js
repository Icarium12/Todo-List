import {Page} from "./index"

function editDescription(todo, element) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("closedby", "any");
    const form = document.createElement("form")
    const label = document.createElement('label');
    label.setAttribute("for", "new-edit");
    label.textContent = "Edit Description:";
    form.appendChild(label);

    const newEdit = document.createElement("textarea");
    newEdit.setAttribute("name", "new-edit");
    newEdit.setAttribute("required", "");
    form.appendChild(newEdit);

    const submit = document.createElement("button");
    submit.textContent = "Save";
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if(form.checkValidity()) {
            dialog.showModal();
            todo.changeDescription(newEdit.value);
            Page.editStoredUser(todo);
            element.textContent = todo.description;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog
}

function editTitle(todo, element) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("closedby", "any");
    const form = document.createElement("form")
    const label = document.createElement('label');
    label.setAttribute("for", "new-edit");
    label.textContent = "Edit Title:";
    form.appendChild(label);

    const newEdit = document.createElement("input");
    newEdit.setAttribute("name", "new-edit");
    newEdit.setAttribute("type", "text");
    newEdit.setAttribute("required", "");
    form.appendChild(newEdit);

    const submit = document.createElement("button");
    submit.textContent = "Save";
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if(form.checkValidity()) {
            dialog.showModal();
            todo.changeTitle(newEdit.value);
            Page.editStoredUser(todo);
            element.textContent = todo.title;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog
}

function editPriotity(todo, element) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("closedby", "any");
    const form = document.createElement("form")
    const label = document.createElement('label');
    label.setAttribute("for", "new-edit");
    label.textContent = "Edit Importance:";
    form.appendChild(label);

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

    const submit = document.createElement("button");
    submit.textContent = "Save";
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if(form.checkValidity()) {
            dialog.showModal();
            todo.changePriority(priorityVal.value);
            Page.editStoredUser(todo);
            element.textContent = `Importance: ${todo.priority}`;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog
}

function editTask(task, element, todo) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("closedby", "any");
    const form = document.createElement("form")
    const label = document.createElement('label');
    label.setAttribute("for", "new-edit");
    label.textContent = "Edit Task:";
    form.appendChild(label);

    const newEdit = document.createElement("textarea");
    newEdit.setAttribute("name", "new-edit");
    newEdit.setAttribute("required", "");
    form.appendChild(newEdit);

    const submit = document.createElement("button");
    submit.textContent = "Save";
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if(form.checkValidity()) {
            dialog.showModal();
            task.description = newEdit.value;
            const checkList = localStorage.getItem(todo.id);
            const parsedCheckList = JSON.parse(checkList)
            parsedCheckList.forEach(item => {
                if(item.id === task.id) {
                    item.description = task.description
                }
            });
            localStorage.setItem(todo.id, JSON.stringify(parsedCheckList));
            element.textContent = task.description;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog
}

function editDueDate(todo, element) {
    const dialog = document.createElement("dialog");
    dialog.setAttribute("closedby", "any");
    const form = document.createElement("form");

    const date = document.createElement("label");
    date.setAttribute("for", "duedate");
    date.textContent = "Edit Due Date:";
    form.appendChild(date)

    const newDate = document.createElement("input");
    newDate.setAttribute("name", "duedate");
    newDate.setAttribute("type", "date");
    form.appendChild(newDate);

    const submit = document.createElement("button");
    submit.textContent = "Save";
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        if(form.checkValidity()) {
            dialog.showModal();
            todo.changeDueDate(newDate.value);
            Page.editStoredUser(todo);
            todo.formatDueDate();
            element.textContent = `Due Date: ${todo.dueDate}`;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog;
}

export {editDescription, editTitle, editPriotity, editTask, editDueDate}