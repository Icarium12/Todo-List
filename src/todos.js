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
            this.completeStatus = "Completed";
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
        const array = this.dueDate.split("-");
        if (array.length === 3) {
            const date = new Date(this.dueDate);
            const formattedDate = format(date, 'MMMM dd, yyyy');
            this.dueDate = formattedDate;
        }
    }

    changeDueDate(value) {
        this.dueDate = value
    }
}




export { Todos }