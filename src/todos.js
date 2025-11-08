import { format, getDate } from "date-fns";

format(new Date(), "MM/dd/yyyy");

class Todos {
    constructor(title, description, priority) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = new Date();
        this.id = crypto.randomUUID();
        this.checkList = [];
        this.creationDate = new Date();
    }

    changePriority() {
        this.priority = prompt("Select Priority (High, Medium, Low)");
    }

    addTask(task) {
        this.checkList.push(task);
    }

    removeTask(task) {
        this.checkList.forEach(item => {
            if (item.id === task.id) {
                const index = this.checklist.indexOf(item);
                this.checkList.splice(index, 1);
            }
        })
    }
    setComplete() {
        this.staus = "Complete"
    }
}




export { Todos }