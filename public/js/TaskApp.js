class TaskApp {
    constructor() {
        this.repo = new TaskOtimizedRepository();
        if (!this.repo)
            this.repo = new TaskRepository();
    }

    toAdd() {
        let task = this.readData()

        if (!task.validation()) throw new Error("Erro ao adicionar dados!");

        this.repo.save(task);

        this.listTable();
        this.clear();
        console.log(this.repo.getAll());
    }

    readData() {
        return new TaskEntity(
            {
                description: document.getElementById('description').value,
                title: document.getElementById('title').value
            }
        );
    }

    listTable() {
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = '';
        let tasks = this.repo.getAll();
        for (let i = 0; i < tasks.length; i++) {

            let tr = tbody.insertRow();
            let tdCheck = tr.insertCell();
            let tdId = tr.insertCell();
            let tdTitle = tr.insertCell();
            let tdDescription = tr.insertCell();
            let tdDate = tr.insertCell();
            let tdEdit = tr.insertCell();
            let tdDelete = tr.insertCell();

            tr.classList.add('list-item');
            let status = tasks[i].status ? "checked" : "";
            tdCheck.innerHTML = `<input type="checkbox" onclick="app.mudarStatus(${tasks[i].id})" name="checkbox" ${status}>
                                  <label class="form-check-label" for="flexCheckDefault"> `;

            tdId.innerText = tasks[i].id;
            tdTitle.innerText = tasks[i].title;
            tdDescription.innerText = tasks[i].description;

            tdDate.innerHTML = tasks[i].created_at;
            tdEdit.innerHTML = `<button type="button" class="btn btn-outline-secondary justify-content-center" data-bs-toggle="modal" data-bs-target="#modalEdit" onclick="app.loadTask(${tasks[i].id})">
                                     <i class="fas fa-cog"></i>
                                </button> `;

            tdDelete.innerHTML = `<button type="button" class="btn btn-outline-danger justify-content-center" onclick="app.delete(${tasks[i].id})">
                                     <i class="far fa-trash-alt"></i>
                                  </button> `;
        }
    }

    clear() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
    }

    loadTask(id) {
        let task = this.repo.getByid(id);
        if (!task) return;

        document.getElementById('id-input').value = task.id;
        document.getElementById('edit-title').value = task.title;
        document.getElementById('edit-description').value = task.description;
    }

    edit() {
        let newTask = new TaskEntity(
            {
                id: document.getElementById("id-input").value,
                title: document.getElementById("edit-title").value,
                description: document.getElementById("edit-description").value
            }
        );
        console.log(newTask)
        if (!newTask.validation()) {
            throw new Error("Erro ao editar dados!");
        }
        if (this.repo.update(newTask.id, newTask)) {

        }

        this.listTable();
    }

    mudarStatus(id) {
        let task = this.repo.getByid(id);
        if (!task) throw new Error("Falha ao buscar task com esse id: ", id);
        task.status = !task.status;
        if (!this.repo.update(id, task)) throw new Error("Falha ao mudar estado da task com esse id: ", id);
        this.listTable();
    }

    delete(id) {
        if (confirm('Deseja remover a tarefa?')) {
            this.repo.delete(id);
            this.listTable();
        }
    }

    busca(e) {
        let value = e.target.value;
        let childs = document.getElementsByClassName('list-item');
        for (let i = 0; i < childs.length; i++) {
            let child = childs[i];
            if (child.innerText.toLowerCase().indexOf(value.toLowerCase()) > -1) {
                child.classList.remove('hide');
            } else {
                child.classList.add('hide');
            }
        }
    }

    events() {
        document.getElementById('search-input').addEventListener('input', this.busca);
    }
}