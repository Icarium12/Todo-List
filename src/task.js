class Task {
    constructor(description) {
        this.description = description;
        this.id = crypto.randomUUID();
    }

    changeTask(value) {
        this.description = value;
    }
}

export {Task}