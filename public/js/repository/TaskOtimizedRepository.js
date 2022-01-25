// Teste
class TaskOtimizedRepository extends Repository {
    constructor() {
        super();
        this.id = 5;
        this.tasks = {
            '1': new TaskEntity({ id: 1, title: "Mover classes", description: "Mover classes para arquivos próprios. Com o mesmo nome." }),
            '2': new TaskEntity({ id: 2, title: "Refatorar código", description: "Ajustes em responsabilidade das classes" }),
            '3': new TaskEntity({ id: 3, title: "Testar funcionalidades", description: "Editar,Criar,Pesquisar,Deletar,Mudar Status" }),
            '4': new TaskEntity({ id: 4, title: "Ajustes em CSS ", description: "Deixar o UI mais amigavel.", status: true }),
            '5': new TaskEntity({ id: 5, title: "Revisar código", description: "Revisar classes e estruturas usadas.", status: true }),
        }
    }

    getByid(id) {
        return this.tasks[id];
    }

    update(id, task) {
        let exist = this.getByid(id);
        if (!exist) return false;
        this.tasks[id] = task;
    }

    getAll() {
        return Object.keys(this.tasks).map(key => this.tasks[key]);
    }

    delete(id) {
        delete this.tasks[id];
    }

    save(task) {
        task.id = ++this.id;
        this.tasks[task.id] = task;
    }
}