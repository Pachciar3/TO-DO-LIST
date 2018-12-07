class Searching{
  static searchByPartName(arrayTab,name){
    const searchedTasks = [];
    name.toLowerCase();
    for(let i=0; i<arrayTab.length; i++){
      if(arrayTab[i].name.toLowerCase().includes(name)){
        searchedTasks.push(arrayTab[i]);
      }
    }
    return searchedTasks
  }
  static searchByCategory(arrayTab,value){
    const searchedTasks = [];
    for(let i=0; i<arrayTab.length; i++){
      if(arrayTab[i].category===value){
        searchedTasks.push(arrayTab[i]);
      }
    }
    return searchedTasks
  }
}