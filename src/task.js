class Task {
    constructor(description) {
        this.description = description;
        this.id = crypto.randomUUID();
    }
}

export {Task}