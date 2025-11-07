class Todos {
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.id = crypto.randomUUID();
        this.checklist = [];
    }

    changePriority() {
        this.priority = prompt("Select Priority (High, Medium, Low)");
    }

    addTask(task) {
        this.checklist.push(task);
    }

    removeTask() {

    }
}

// function Task(description) {
//     this.description = description;
//     this.id = crypto.randomUUID
// }

const Task = function(description) {
    const task = description;
    const id = crypto.randomUUID();
    return {task, id}
}


export {Todos, Task}