class Searching{
  static searchByPartName(arrayTab,value){
    const searchedTasks = [];
    for(let i=0; i<arrayTab.length; i++){
      if(arrayTab[i].name.toLowerCase().includes(value.toLowerCase())){
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