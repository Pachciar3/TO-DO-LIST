class Searching{
  static searchByPartValue(arrayTab,property,value){
    const searchedTasks = [];
    for(let i=0; i<arrayTab.length; i++){
      if(arrayTab[i][property].toLowerCase().includes(value.toLowerCase())){
        searchedTasks.push(arrayTab[i]);
      }
    }
    return searchedTasks
  }
  static searchByFullValue(arrayTab,property,value){
    const searchedTasks = [];
    for(let i=0; i<arrayTab.length; i++){
      if(arrayTab[i][property]===value){
        searchedTasks.push(arrayTab[i]);
      }
    }
    return searchedTasks
  }
}