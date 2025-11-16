import { Todos } from "./todos.js";
import { List } from "./list.js";
import { displayProject, createProject, renderPage, createTask } from "./dom.js";
import { Task } from "./task.js";
import "./styles.css";
import { fromUnixTime } from "date-fns";



const Page = (function() {
    const todoList = new List();

    function storeUserInput(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate
        this.id = crypto.randomUUID();
    }

    

    const body = document.body;

    const title = document.createElement("h1");
    title.textContent = "Todo List";
    title.className = "todo-list";
    body.appendChild(title);

    const display = document.createElement("div");
    display.className = "main-display";


    const todoCont = document.createElement('div');
    // retrieveLocalStorage();
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
                item.id
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
        const parsedArray = JSON.parse(storedArray);
        const projectList = projectCreate(parsedArray);
        if (parsedArray.length > 0) {
            // const projectList = projectCreate(parsedArray);
            projectList.array.forEach(todo => {
                displayProject(todo, todoCont);
            });
            return projectList;
        }
        else {
            return projectList
        }
    }

    function editStoredUser(todo) {
        console.log(todo.id);
        const storedtodoList = retrieveLocalStorage();
        storedtodoList.array.forEach(item => {
            if(todo.id === item.id) {
                item.title = todo.title;
                item.description = todo.description;
                item.priority = todo.priority;
                item.dueDate = todo.dueDate;
                // item.id = todo.id;
                console.log(storedtodoList.array);
                saveToLocalStorage(storedtodoList.array);
                // renderPage();
            }
        })
    }


    // const savedTodoList = JSON.stringify(todoList.array);
    // localStorage.setItem("savedTodo", savedTodoList);
    // const todo1 = new Todos("Clean house", "Do the weekend chores", "low", "tomorrow");
    // const todo2 = new Todos("Study for test", "Study for the upcoming physics test", "High", "next week");
    // const todo3 = new Todos("Fix code", "Fix issue in game code", "medium", "placeholder");
    // const task = new Task("Select topics to study");
    // const task2 = new Task("Study each topic");
    // todo2.addTask(task);
    // todo2.addTask(task2);

    // todoList.addToList(todo1);
    // todoList.addToList(todo2);
    // todoList.addToList(todo3);
    // saveToLocalStorage(todoList.array);
    // todoList.array.forEach(todo => {
    //     displayProject(todo, todoCont);
    // });
    // console.log(todo1.creationDate);
    // display.appendChild(todoCont);

//    todo1.changePriority();
//     console.log(todo1.priority);
    retrieveLocalStorage();
    display.appendChild(todoCont);

    return {todoInfo, todoList, todoCont, taskDialog, dialog, button, display, retrieveLocalStorage, saveToLocalStorage, editStoredUser};
})();

export {Page}