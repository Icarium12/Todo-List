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
            todo.changeDescription(newEdit.value);;
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
            element.textContent = todo.title;
            dialog.close();
        }
    })
    form.appendChild(submit);
    dialog.appendChild(form);
    return dialog
}

export {editDescription, editTitle}