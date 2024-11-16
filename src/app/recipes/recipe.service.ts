import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { v4 as uuidv4 } from 'uuid';
import { Subject } from "rxjs";
import { ShoppingListService } from "../shopping-edit/shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      uuidv4(),
      'A Test1 Recipe',
      'This is a test1',
      'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg',
      [new Ingredient(uuidv4(), 'Apples', 5), new Ingredient(uuidv4(), 'Tomatoes', 10)]
    ),
    new Recipe(
      uuidv4(),
      'A Test2 Recipe',
      'This is a test2',
      'https://attuale.ru/wp-content/uploads/2018/10/49-2.jpg',
      [new Ingredient(uuidv4(), 'Milk', 1), new Ingredient(uuidv4(), 'Eggs', 10)]
    )
  ];

  recipeSelected = new Subject<Recipe | null>()
  recipesIsChanged = new Subject<Recipe[]>()

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    //Применение метода slice() для создания копии массива
    return this.recipes.slice();
  }

  getRecipe(id: string) {
    return this.recipes.find((recipe) => recipe.id === id)
  }

  updateRecipe(id: string, recipeFormValue: any) {
    let updatedRecipe = this.recipes.find(recipe => recipe.id === id)
    if ( updatedRecipe ) {
      console.log(recipeFormValue)
      updatedRecipe.name = recipeFormValue.name
      updatedRecipe.description = recipeFormValue.description
      updatedRecipe.imagePath = recipeFormValue.imagePath
      updatedRecipe.ingredients = recipeFormValue.ingredients
      console.log({ updatedRecipe })
      console.log(this.recipes)
    } else {
      console.log('Recipe with id ' + id + ' not found')
    }
    this.recipesIsChanged.next(this.recipes.slice())
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipesIsChanged.next(this.recipes.slice())
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1)
    this.recipesIsChanged.next(this.recipes.slice())
    this.recipeSelected.next(null)
  }

  addToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients)
  }
}
