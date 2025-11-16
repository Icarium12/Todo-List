import { Todos } from "./todos.js";
import { List } from "./list.js";
import { displayProject, createProject, renderPage, displayTodo } from "./dom.js";
import { Task } from "./task.js";
import "./styles.css";
import { fromUnixTime } from "date-fns";



const Page = (function() {

    function storeUserInput(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate
        this.id = crypto.randomUUID();
        this.completeStatus = "Set Complete";
    }



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
    const todoList = retrieveLocalStorage();

    const buttondiv = document.createElement("div");
    buttondiv.className = "add-proj-container";
    const button = document.createElement('button');
    button.className = "add-project";
    button.textContent = "Add Project";
    buttondiv.appendChild(button);
    body.appendChild(dialog);
    button.addEventListener('click', () => {
        const addProj = createProject();
        body.appendChild(addProj.dialogT);
        addProj.dialogT.showModal();
        addProj.button.addEventListener('click', (e) => {
            if (addProj.form.checkValidity()) {
                e.preventDefault();
                const todo = new storeUserInput (
                addProj.titleInput.value,
                addProj.descriptionIn.value,
                addProj.priorityVal.value,
                addProj.dueDate.value
                )
                todoList.addToList(todo);
                saveToLocalStorage(todoList.array);
                todoCont.replaceChildren();
                renderPage();
                addProj.dialogT.close(); 
            }
        })
    })
    body.appendChild(buttondiv);

    body.appendChild(display);

    function projectCreate(array) {
        const projectList = new List()
        array.forEach(item => {
            const todoProject = new Todos (
                item.title,
                item.description,
                item.priority,
                item.dueDate,
                item.id,
                item.completeStatus
            );
            projectList.addToList(todoProject);
        });
        return projectList
    }

    

    function saveToLocalStorage(array) {
        const savedTodoList = JSON.stringify(array);
        localStorage.setItem("savedTodo", savedTodoList);
    }

    function retrieveLocalStorage() {
        const storedArray = localStorage.getItem("savedTodo");
        if (storedArray !== null) {
            const parsedArray = JSON.parse(storedArray);
            const projectList = projectCreate(parsedArray);
            if (parsedArray.length > 0) {
                todoCont.replaceChildren();
                const project = document.createElement("h2")
                project.textContent = "Projects";
                todoCont.appendChild(project);
                projectList.array.forEach(todo => {
                    displayProject(todo, todoCont);
                });
                return projectList;
            }
            else {
                return projectList;
            }
        }
        else {
            return new List();
        }
        
    }

    function editStoredUser(todo) {
        const storedtodoList = retrieveLocalStorage();
        storedtodoList.array.forEach(item => {
            if(todo.id === item.id) {
                item.title = todo.title;
                item.description = todo.description;
                item.priority = todo.priority;
                item.dueDate = todo.dueDate;
                item.completeStatus = todo.completeStatus;
                saveToLocalStorage(storedtodoList.array);
                renderPage();
                displayTodo(todo, todoInfo);
            }
        })
    }

    retrieveLocalStorage();
    display.appendChild(todoCont);

    return {todoInfo, todoList, todoCont, taskDialog, dialog, 
        button, display, retrieveLocalStorage, saveToLocalStorage, editStoredUser};
})();

export {Page}