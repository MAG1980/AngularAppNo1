import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)];
  ingredientsIsChanged = new EventEmitter<Ingredient[]>()
  selectedIngredient: Ingredient | null = null
  selectedIngredientIsChanged = new EventEmitter<Ingredient>()

  constructor() {
  }

  getIngredients() {
    return [...this.ingredients]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsIsChanged.emit(this.ingredients)
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
  }

  setSelectedIngredient(ingredient: Ingredient) {
    this.selectedIngredient = ingredient
    this.selectedIngredientIsChanged.emit(this.selectedIngredient)
  }

  deleteIngredient() {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.name !== this.selectedIngredient?.name)
    this.ingredientsIsChanged.emit(this.ingredients)
  }
}
