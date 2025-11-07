import { Todos, Task } from "./todos";
import { List } from "./list";

(function() {
    const todoList = new List();
    const todo1 = new Todos("Clean house", "Do the weekend chores", "low");
    const todo2 = new Todos("Study for test", "Study for the upcoming physics test", "High");
    const todo3 = new Todos("Fix code", "Fix issue in game code", "medium");
    const task = Task("Select topics to study");
    const task2 = Task("Study each topic");
    todo2.addTask(task);
    todo2.addTask(task2);
    todo2.removeTask(task);
    todoList.addToList(todo1);
    todoList.addToList(todo2);
    todoList.addToList(todo3);
    todoList.removeFromList(todo1);
    console.log(todoList.array);
    console.log(todo2.checklist);

//    todo1.changePriority();
//     console.log(todo1.priority);
})();