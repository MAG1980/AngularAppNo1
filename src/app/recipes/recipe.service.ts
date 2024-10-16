import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('A Test1 Recipe', 'This is a test1', 'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg'),
    new Recipe('A Test2 Recipe', 'This is a test2', 'https://attuale.ru/wp-content/uploads/2018/10/49-2.jpg')
  ];

  recipeSelected = new EventEmitter<Recipe>()

  constructor() { }

  getRecipes() {
    //Применение метода slice() для создания копии массива
    return this.recipes.slice();
  }
}
