import { Todos } from "./todos.js";
import { List } from "./list.js";
import { displayProject, createProject, renderPage } from "./dom.js";
import { Task } from "./task.js";

const Page = (function() {
    const body = document.body;
    const todoCont = document.createElement('div');
    const todoInfo = document.createElement("div");
    const dialog = document.createElement('dialog');
    const button = document.createElement('button');
    button.textContent = "Add Project";
    button.addEventListener('click', () => {
        dialog.showModal();
    })

    const addProj = createProject(body, dialog);
    body.appendChild(button);

    addProj.button.addEventListener('click', (e) => {
        if (addProj.form.checkValidity()) {
            e.preventDefault();
            const todo = new Todos (
            addProj.titleInput.value,
            addProj.descriptionIn.value,
            addProj.priorityVal.value
            )
            todoList.addToList(todo);
            todoCont.replaceChildren();
            todoList.array.forEach(todo => {
            renderPage();
        });   
        }

        console.log(todoList);
    })


    



    const todoList = new List();
    const todo1 = new Todos("Clean house", "Do the weekend chores", "low");
    const todo2 = new Todos("Study for test", "Study for the upcoming physics test", "High");
    const todo3 = new Todos("Fix code", "Fix issue in game code", "medium");
    const task = new Task("Select topics to study");
    const task2 = new Task("Study each topic");
    todo2.addTask(task);
    todo2.addTask(task2);

    todoList.addToList(todo1);
    todoList.addToList(todo2);
    todoList.addToList(todo3);
    todoList.array.forEach(todo => {
        displayProject(todo, todoCont);
    });
    // todoList.removeFromList(todo1);
    // console.log(todoList.array);
    // console.log(todo2.checklist);
    console.log(todo1.dueDate);
    console.log(todo1.creationDate);

//    todo1.changePriority();
//     console.log(todo1.priority);

    return {todoInfo, todoList, todoCont};
})();

export {Page}