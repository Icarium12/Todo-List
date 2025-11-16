class List {
    constructor() {
        this.array = []
    }

    addToList(todo) {
        this.array.push(todo);
    }

    removeFromList(todo) {
        console.log("ran");
        this.array.forEach(item => {
            if (item.id === todo.id) {
                const index = this.array.indexOf(item);
                this.array.splice(index, 1);
                console.log(this.array);
            }
        });
    }
}



export { List }

