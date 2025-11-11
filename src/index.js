import { Todos } from "./todos.js";
import { List } from "./list.js";
import { displayProject, createProject, renderPage, createTask } from "./dom.js";
import { Task } from "./task.js";
import "./styles.css";

const Page = (function() {
    const body = document.body;

    const title = document.createElement("h1");
    title.textContent = "Todo List";
    title.className = "todo-list";
    body.appendChild(title);

    const display = document.createElement("div");
    display.className = "main-display";


    const todoCont = document.createElement('div');
    const todoInfo = document.createElement("div");


    const dialog = document.createElement('dialog');
    const project = document.createElement("h2")
    project.textContent = "Projects";
    todoCont.appendChild(project);

    const taskDialog = document.createElement('dialog');

    const buttondiv = document.createElement("div");
    buttondiv.className = "add-proj-container";
    const button = document.createElement('button');
    button.className = "add-project";
    button.textContent = "Add Project";
    buttondiv.appendChild(button);
    body.appendChild(dialog);
    button.addEventListener('click', () => {
        dialog.showModal();
        const addProj = createProject(body, dialog);
        addProj.button.addEventListener('click', (e) => {
            if (addProj.form.checkValidity()) {
                e.preventDefault();
                const todo = new Todos (
                addProj.titleInput.value,
                addProj.descriptionIn.value,
                addProj.priorityVal.value,
                addProj.dueDate.value
                )
                todoList.addToList(todo);
                todoCont.replaceChildren();
                todoList.array.forEach(todo => {
                    renderPage();
                });
                dialog.replaceChildren();
                dialog.close(); 
            }
        })
    })
    body.appendChild(buttondiv);

    body.appendChild(display)

    

    


    const todoList = new List();
    const todo1 = new Todos("Clean house", "Do the weekend chores", "low", "tomorrow");
    const todo2 = new Todos("Study for test", "Study for the upcoming physics test", "High", "next week");
    const todo3 = new Todos("Fix code", "Fix issue in game code", "medium", "placeholder");
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
    console.log(todo1.creationDate);
    display.appendChild(todoCont);

//    todo1.changePriority();
//     console.log(todo1.priority);

    return {todoInfo, todoList, todoCont, taskDialog, dialog, button, display};
})();

export {Page}