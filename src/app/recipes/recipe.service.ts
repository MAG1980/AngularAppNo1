import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      1,
      'A Test1 Recipe',
      'This is a test1',
      'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg',
      [new Ingredient(uuidv4(), 'Apples', 5), new Ingredient(uuidv4(), 'Tomatoes', 10)]
    ),
    new Recipe(
      2,
      'A Test2 Recipe',
      'This is a test2',
      'https://attuale.ru/wp-content/uploads/2018/10/49-2.jpg',
      [new Ingredient(uuidv4(),'Milk', 1), new Ingredient(uuidv4(),'Eggs', 10)]
    )
  ];

  recipeSelected = new EventEmitter<Recipe | null>()
  recipesIsChanged = new EventEmitter<Recipe[]>()

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    //Применение метода slice() для создания копии массива
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes.find((recipe) => recipe.id === id)
  }


  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1)
    this.recipesIsChanged.emit(this.recipes.slice())
    this.recipeSelected.emit(null)
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
