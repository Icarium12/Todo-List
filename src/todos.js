import { format, getDate } from "date-fns";

format(new Date(), "MM/dd/yyyy");

class Todos {
    constructor(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
        this.id = crypto.randomUUID();
        this.checkList = [];
        this.creationDate = new Date();
        this.completeStatus = "Set Complete";
    }

    changePriority(value) {
        this.priority = value;
    }

    addTask(task) {
        this.checkList.push(task);
    }

    removeTask(task) {
        this.checkList.forEach(item => {
            if (item.id === task.id) {
                const index = this.checkList.indexOf(item);
                this.checkList.splice(index, 1);
                console.log("ran");
            }
        })
    }
    setComplete() {
        if (this.completeStatus === "Set Complete") {
            this.completeStatus = "Complete";
        }
        else {
            this.completeStatus = "Set Complete";
        }
    }

    changeTitle(value) {
        this.title = value;
    }

    changeDescription(value) {
        this.description = value;
    }

    formatDueDate() {

    }
}




export { Todos }