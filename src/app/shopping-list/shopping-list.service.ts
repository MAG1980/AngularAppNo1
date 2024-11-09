import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [new Ingredient(uuidv4(), "Apples", 5), new Ingredient(uuidv4(), "Tomatoes", 10
  )];
  ingredientsIsChanged = new EventEmitter<Ingredient[]>()
  startedEditing = new Subject<Ingredient>()
  selectedIngredientIsChanged = new EventEmitter<Ingredient>()

  constructor() {
  }

  getIngredients() {
    return [...this.ingredients]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsIsChanged.emit(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsIsChanged.emit(this.ingredients.slice())
  }


  deleteIngredient(item: Ingredient) {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.name !== item.name)
    this.ingredientsIsChanged.emit(this.ingredients.slice())
  }

  saveIngredientChanges(id: string, amount: number) {
    let editedIngredient = this.ingredients
      .find(ingredient => ingredient.id === id)
    if ( editedIngredient ) {
      editedIngredient.amount = amount
    }
    console.log(this.ingredients)
  }

}
