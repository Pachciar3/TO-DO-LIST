const menuButtons = document.querySelectorAll('button[data-type="menu-buttons"]');
const menuContents = document.querySelectorAll('.l-actions__content[data-type="menu-contents"]');
const menuContents2 = document.querySelectorAll('.l-results[data-type="menu-contents"]');
const apk = new Todo();
apk.start();
const elementsRemoveClass = (elements, className,i) => {
  elements.forEach(el => {
    el.classList.remove(className);
  });
  elements[i].classList.add(className);
}
for (let i = 0; i < menuButtons.length; i++) {
  menuButtons[i].addEventListener('click', () => {
    elementsRemoveClass(menuButtons, 'is-active',i);
    elementsRemoveClass(menuContents, 'is-active',i);
    elementsRemoveClass(menuContents2, 'is-active',i);
    apk.renderNodeLists();
  })
}
