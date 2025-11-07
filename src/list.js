class List {
    constructor() {
        this.array = []
    }

    addToList(todo) {
        this.array.push(todo);
    }

    removeFromList(todo) {
        this.array.forEach(item => {
            if (item.id === todo.id) {
                const index = this.array.indexOf(item);
                this.array.splice(index, 1);
            }
        });
    }
}



export { List }

