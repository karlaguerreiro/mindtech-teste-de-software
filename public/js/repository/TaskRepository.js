class TaskRepository extends Repository {
    constructor() {
        super();
        this.id = 0;
        this.arrayTasks = [];
    }

    getByid(id) {
        return (() => {
            for (let i = 0; i < this.arrayTasks.length; i++) {
                if (this.arrayTasks[i].id == id) return this.arrayTasks[i];
            } return false;
        })();
    }

    update(id, task) {
        let exist = this.getByid(id);
        if (!exist) return false;

        for (let i = 0; i < this.arrayTasks.length; i++) {
            if (this.arrayTasks[i].id == id) {
                this.arrayTasks[i] = task; return true;
            }
        }
    }

    getAll() {
        return this.arrayTasks;
    }

    delete(id) {
        for (let i = 0; i < this.arrayTasks.length; i++) {
            if (this.arrayTasks[i].id == id) {
                this.arrayTasks.splice(i, 1);
            }
        }
    }

    save(task) {
        task.id = ++this.id;
        this.arrayTasks.push(task);
    }
}