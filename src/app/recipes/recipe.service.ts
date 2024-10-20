import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test1 Recipe',
      'This is a test1',
      'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg',
      [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)]
    ),
    new Recipe(
      'A Test2 Recipe',
      'This is a test2',
      'https://attuale.ru/wp-content/uploads/2018/10/49-2.jpg',
      [new Ingredient('Milk', 1), new Ingredient('Eggs', 10)]
    )
  ];

  recipeSelected = new EventEmitter<Recipe|null>()
  recipesIsChanged = new EventEmitter<Recipe[]>()

  constructor() { }

  getRecipes() {
    //Применение метода slice() для создания копии массива
    return this.recipes.slice();
  }

  deleteRecipe(recipe:Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1)
    this.recipesIsChanged.emit(this.recipes.slice())
    this.recipeSelected.emit(null)
  }
}
