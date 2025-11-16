class Task {
    constructor(description, id) {
        this.description = description;
        this.id = id;
    }

    changeTask(value) {
        this.description = value;
    }
}

export {Task}