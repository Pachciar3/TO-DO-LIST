class Tasks {
  constructor(tasks, id) {
    this.tasks = tasks;
    this.id = id;
  }
  newTask(name, category) {
    const task = {
      id: this.id,
      name: name,
      category: category,
      complete: false
    }
    this.tasks.push(task);
    this.id++;
    return task;
  }
  deleteTask(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (id == this.tasks[i].id) {
        this.tasks.splice(i, 1);
        return this.tasks;
      }
    }
  }
  completeTask(id) {
    for (let i = 0; i < this.tasks.length; i++) {
      if (id == this.tasks[i].id) {
        if (this.tasks[i].complete) {
          this.tasks[i].complete = false
        } else {
          this.tasks[i].complete = true
        }
        return this.tasks;
      }
    }
  }
}

// const zadania = new Tasks([{
//   id: 0,
//   name: "dupa",
//   category: 3,
//   complete: false
// }, {
//   id: 1,
//   name: "dupaf",
//   category: 2,
//   complete: false
// }, {
//   id: 2,
//   name: "dweraf",
//   category: 2,
//   complete: false
// }, {
//   id: 3,
//   name: "dweraf",
//   category: 0,
//   complete: false
// }, {
//   id: 5,
//   name: "dwesdfaf",
//   category: 1,
//   complete: false
// }], 6);