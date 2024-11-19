import { Injectable } from '@angular/core';
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { ShoppingListService } from "../shopping-edit/shopping-list/shopping-list.service";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];

  recipeSelected = new Subject<Recipe | null>()
  recipesIsChanged = new Subject<Recipe[]>()

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes
    console.log(recipes)
    this.recipesIsChanged.next(this.recipes.slice())
  }

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
