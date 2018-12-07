class Todo {
  constructor() {
    this.categories = null;
    this.tasks = null;
    this.addTaskForm = document.querySelector('*[data-type="add-task"]');
    this.searchTaskForm = document.querySelector('*[data-type="search-task"]');
    this.addCategoryForm = document.querySelector('*[data-type="add-category"]');
    this.tasksConatiner = document.querySelector('.l-results[data-content="add"] .l-results__result');
    this.tasksConatinerSearch = document.querySelector('.l-results[data-content="search"] .l-results__result');
    this.categoryContainerAdd = document.querySelector('.c-choose-ct__categories[data-type="add"]');
    this.categoryContainerSearch = document.querySelector('.c-choose-ct__categories[data-type="search"]');
  }
  start() {
    if (localStorage.getItem('tasksArray') || localStorage.getItem('tasksID')) {
      this.tasks = new Tasks(JSON.parse(localStorage.getItem('tasksArray')), Number(localStorage.getItem('tasksID')));
    } else {
      this.tasks = new Tasks([{
        id: 0,
        name: 'Washing dishes',
        category: 0,
        complete: true
      }, {
        id: 1,
        name: 'Learn Java Script :-)',
        category: 1,
        complete: false
      }], 2);
    }
    if (localStorage.getItem('categoriesArray') || localStorage.getItem('categoriesID')) {
      this.categories = new Categories(JSON.parse(localStorage.getItem('categoriesArray')), Number(localStorage.getItem('categoriesID')));
    } else {
      this.categories = new Categories([{
        id: 0,
        name: 'House'
      }, {
        id: 1,
        name: 'Work'
      }, {
        id: 2,
        name: 'School'
      }], 3);
    }
    this.renderNodeLists();
    this.addTaskForm.addEventListener('submit', e => {
      e.preventDefault();
      const value = e.target[0].value;
      if (value) {
        const category = this.categoryContainerAdd.querySelector('.c-choose-ct__category button.is-active');
        if (category) {
          const categoryKey = Number(category.parentNode.dataset.key);
          const task = this.tasks.newTask(value, categoryKey);
          localStorage.setItem('tasksArray', JSON.stringify(this.tasks.tasks));
          localStorage.setItem('tasksID', this.tasks.id);
          this.addTask(this.tasksConatiner, task);
          e.target[0].value = "";
        } else {
          alert('Wybierz kategorię');
        }
      } else {
        alert('Podaj wartość')
      }
    });
    this.searchTaskForm.addEventListener('input', e => {
      e.preventDefault();
      const value = e.target.value;
      this.tasksConatinerSearch.innerHTML = "";
      const category = this.categoryContainerSearch.querySelector('.c-choose-ct__category button.is-active');
      let categoryKey = ""
      if (category) {
        categoryKey = Number(category.parentNode.dataset.key);
      } else {
        categoryKey = "all"
      }
      this.searchTask(value, categoryKey, this.tasksConatinerSearch);
    });
    this.addCategoryForm.addEventListener('submit', e => {
      e.preventDefault();
      const value = e.target[0].value;
      if (value) {
        const ct = this.categories.newCategory(value);
        localStorage.setItem('categoriesArray', JSON.stringify(this.categories.categories));
        localStorage.setItem('categoriesID', this.categories.id);
        this.addCategory(this.categoryContainerAdd, ct);
        e.target[0].value = "";
      } else {
        alert('Podaj wartość')
      }
    });
  }
  renderNodeLists() {
    this.categoryContainerAdd.textContent = "";
    this.categoryContainerSearch.textContent = "";
    for (let i = 0; i < this.categories.categories.length; i++) {
      this.addCategory(this.categoryContainerAdd, this.categories.categories[i]);
      this.addCategory(this.categoryContainerSearch, this.categories.categories[i]);
    }
    this.tasksConatiner.textContent = "";
    this.tasksConatinerSearch.textContent = "";
    for (let i = 0; i < this.tasks.tasks.length; i++) {
      this.addTask(this.tasksConatiner, this.tasks.tasks[i]);
    }
  }
  addTask(tasksConatiner, task) {
    const div = document.createElement('div');
    div.className = task.complete ? "c-task is-active" : "c-task";
    div.dataset.key = task.id
    div.innerHTML = `<button class="c-task__btn o-btn o-btn--red" data-type="remove" data-key=${task.id}><span class="fas fa-trash"></span></button><div class="c-task__name">${task.name}</div><button class="c-task__btn o-btn o-btn--lightBlack" data-type="complete" data-key=${task.id}><span class="fas fa-check"></span></button>`;
    tasksConatiner.appendChild(div);
    div.querySelector('button[data-type=remove]').addEventListener('click', this.deleteTask.bind(this, tasksConatiner));
    div.querySelector('button[data-type=complete]').addEventListener('click', this.completeTask.bind(this, tasksConatiner));
  }
  searchTask(name, category, conatiner) {
    let tempArray = Searching.searchByPartName(this.tasks.tasks, name);
    if (category !== "all") {
      tempArray = Searching.searchByCategory(tempArray, category);
    }
    for (let i = 0; i < tempArray.length; i++) {
      this.addTask(conatiner, tempArray[i]);
    }
  }
  deleteTask(tasksConatiner, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    this.tasks.deleteTask(id);
    localStorage.setItem('tasksArray', JSON.stringify(this.tasks.tasks));
    localStorage.setItem('tasksID', this.tasks.id);
    tasksConatiner.removeChild(tasksConatiner.querySelector(`.c-task[data-key="${id}"]`))
  }
  completeTask(tasksConatiner, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    this.tasks.completeTask(id);
    localStorage.setItem('tasksArray', JSON.stringify(this.tasks.tasks));
    localStorage.setItem('tasksID', this.tasks.id);
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
    div.querySelector('button.c-choose-ct__close-button').addEventListener('click', this.deleteCategory.bind(this, container));
  }
  deleteCategory(container, e) {
    const id = e.target.dataset.key ? e.target.dataset.key : e.target.parentNode.dataset.key;
    if (!Searching.searchByCategory(this.tasks.tasks, Number(id)).length > 0) {
      this.categories.deleteCategory(id);
      localStorage.setItem('categoriesArray', JSON.stringify(this.categories.categories));
      localStorage.setItem('categoriesID', this.categories.id);
      container.removeChild(container.querySelector(`.c-choose-ct__category[data-key="${id}"]`))
      console.log("usuwanie kategorii nr: ", id)
    }else{
      alert('Uwaga są jeszcze zadania w tej kategorii');
    }
  }
}