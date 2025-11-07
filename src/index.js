import { Todos, Task } from "./todos";
import { addToList } from "./list";

(function() {
    const list = [];
    const todo1 = new Todos("Clean house", "Do the weekend chores", "low");
    const todo2 = new Todos("Study for test", "Study for the upcoming physics test", "High");
    const task = new Task("Select topics to study");
    todo2.addTask(task);
    addToList(list, todo1);
    addToList(list, todo2);
    console.log(list);
    console.log(todo2.checklist);

//    todo1.changePriority();
//     console.log(todo1.priority);
})();