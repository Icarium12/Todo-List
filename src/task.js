class Task {
    constructor(description, id) {
        this.description = description;
        if (id === undefined) {
            this.id = crypto.randomUUID();
        }
        else {
            this.id = id;
        }
    }

    changeTask(value) {
        this.description = value;
    }
}

export {Task}