class TaskEntity {
    constructor({
        id = 0,
        title = '',
        description = '',
        status = false
    }) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.created_at = new Date().toLocaleString();
        this.status = status;
    }

    validation() {
        if (!this.title || this.title == '') {
            return false;
        }
        return true;
    }
}