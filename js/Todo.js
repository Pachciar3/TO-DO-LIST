class Todo {
  constructor() {
    this.categories = null;
    this.tasks = null;
    this.addToDOM = null;
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
      }], 2);
    }
    this.addToDOM = new AddToDOM(this.categories,this.tasks);
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
          this.addToDOM.addTask(this.tasksConatiner, task);
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
      this.addToDOM.searchTask(value, categoryKey, this.tasksConatinerSearch);
    });
    this.addCategoryForm.addEventListener('submit', e => {
      e.preventDefault();
      const value = e.target[0].value;
      if (value) {
        const ct = this.categories.newCategory(value);
        localStorage.setItem('categoriesArray', JSON.stringify(this.categories.categories));
        localStorage.setItem('categoriesID', this.categories.id);
        this.addToDOM.addCategory(this.categoryContainerAdd, ct);
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
      this.addToDOM.addCategory(this.categoryContainerAdd, this.categories.categories[i]);
      this.addToDOM.addCategory(this.categoryContainerSearch, this.categories.categories[i]);
    }
    this.tasksConatiner.textContent = "";
    this.tasksConatinerSearch.textContent = "";
    for (let i = 0; i < this.tasks.tasks.length; i++) {
      this.addToDOM.addTask(this.tasksConatiner, this.tasks.tasks[i]);
    }
  }
}