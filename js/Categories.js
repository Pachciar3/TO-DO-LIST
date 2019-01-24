class Categories {
  constructor(categories,id){
    this.categories = categories;
    this.id = id;
  }
  newCategory(name){
    const category={
      id:this.id,
      name:name
    }
    this.categories.push(category);
    this.id++;
    return category;
  }
  deleteCategory(id){
    for(let i=0; i<this.categories.length; i++){
      if(id==this.categories[i].id){
        this.categories.splice(i,1); 
        return this.categories
      }
    }
  }
 searchById(id){
    for(let i=0; i<this.categories.length; i++){
      if(this.categories[i].id===id){
        return this.categories[i].name
      }
    }
    return false
  }
}