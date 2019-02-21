class AddToDOM{
  constructor(categories,tasks){
    this.categories=categories;
    this.tasks=tasks;
    this.categoriesARRAY=categories.categories;
    this.categoriesID=categories.id;
    this.tasksARRAY=tasks.tasks;
    this.tasksID=tasks.id;
  }
  addTask(tasksConatiner, task) {
    const category = Searching.searchOneByFullValue(this.categoriesARRAY, 'id', task.category);
    const div = document.createElement('div');
    div.className = task.complete ? "c-task is-active" : "c-task";
    div.dataset.key = task.id
    div.innerHTML = `<button class="c-task__btn o-btn o-btn--red" data-type="remove" data-key=${task.id}><span class="fas fa-trash"></span></button><div class="c-task__name" title="${task.name}">${task.name}<span class="c-task__cat-name" title="${category.name}">${category.name}</span></div><button class="c-task__btn o-btn o-btn--lightBlack" data-type="complete" data-key=${task.id}><span class="fas fa-check"></span></button>`;
    tasksConatiner.appendChild(div);
    div.querySelector('button[data-type=remove]').addEventListener('click', this.deleteTask.bind(this, tasksConatiner));
    div.querySelector('button[data-type=complete]').addEventListener('click', this.completeTask.bind(this, tasksConatiner));
  }
  searchTask(name, category, conatiner) {
    let tempArray = Searching.searchByPartValue(this.tasksARRAY,'name',name);
    if (category !== "all") {
      tempArray = Searching.searchByFullValue(tempArray, 'category', category);
    }
    for (let i = 0; i < tempArray.length; i++) {
      this.addTask(conatiner, tempArray[i]);
    }
  }
  deleteTask(tasksConatiner, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    this.tasks.deleteTask(id);
    localStorage.setItem('tasksArray', JSON.stringify(this.tasksARRAY));
    localStorage.setItem('tasksID', this.tasksID);
    tasksConatiner.removeChild(tasksConatiner.querySelector(`.c-task[data-key="${id}"]`))
  }
  completeTask(tasksConatiner, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    this.tasks.completeTask(id);
    localStorage.setItem('tasksArray', JSON.stringify(this.tasksARRAY));
    localStorage.setItem('tasksID', this.tasksID);
    tasksConatiner.querySelector(`.c-task[data-key="${id}"]`).classList.toggle('is-active');
  }
  addCategory(container, ct) {
    const div = document.createElement('div');
    div.className = "c-choose-ct__category";
    div.dataset.key = ct.id
    div.innerHTML = `<button class="o-btn o-btn--text c-choose-ct__button">${ct.name}</button><button class="o-btn c-choose-ct__close-button" data-key="${ct.id}"><span class="fas fa-times"></span></button>`
    container.prepend(div);
    div.addEventListener('click', (e) => {
      container.querySelectorAll('.c-choose-ct__category button.is-active').forEach(el => {
        el.classList.remove('is-active');
      });
      e.target.classList.add('is-active');
    })
    div.addEventListener('dblclick', (e) => {
      e.target.classList.remove('is-active');
    })
    div.querySelector('button.c-choose-ct__close-button').addEventListener('click', this.deleteCategory.bind(this, container));
  }
  deleteCategory(container, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    console.log(this.tasksARRAY);
    if (!Searching.searchByFullValue(this.tasksARRAY, 'category', Number(id)).length > 0) {
      this.categories.deleteCategory(id);
      localStorage.setItem('categoriesArray', JSON.stringify(this.categoriesARRAY));
      localStorage.setItem('categoriesID', this.categoriesID);
      container.removeChild(container.querySelector(`.c-choose-ct__category[data-key="${id}"]`))
    } else {
      alert('Uwaga są jeszcze zadania w tej kategorii');
    }
  }
}