import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from "../../shared/ingredient.model";

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private ingredients: Ingredient[] = [new Ingredient(uuidv4(), "Apples", 5), new Ingredient(uuidv4(), "Tomatoes", 10
  )];
  ingredientsIsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<Ingredient | null>()
  selectedIngredientIsChanged = new Subject<Ingredient>()

  constructor() {
  }

  getIngredients() {
    return [...this.ingredients]
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsIsChanged.next(this.ingredients.slice())
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsIsChanged.next(this.ingredients.slice())
  }


  deleteIngredient(item: Ingredient) {
    this.ingredients = this.ingredients.filter((ingredient) => ingredient.id !== item.id)
    this.ingredientsIsChanged.next(this.ingredients.slice())
  }

  saveIngredientChanges(ingredient: Ingredient) {
    let editedIngredient = this.ingredients
      .find(item => item.id === ingredient.id)
    if (editedIngredient) {
      editedIngredient.amount = ingredient.amount
      editedIngredient.name = ingredient.name
    }
  }

  groupIngredients() {
    const ingredients: Ingredient[] = [...this.ingredients ]
    const groupedIngredients: Ingredient[] = []
    for (let i = 0; i <ingredients.length; i++) {
      let currentIngredient = ingredients[i]
      for (let k = i + 1; k <ingredients.length; k++) {
        if (currentIngredient.name === ingredients[k].name) {
          currentIngredient.amount += ingredients[k].amount
          ingredients.splice(k, 1)
        }
      }
      groupedIngredients.push(currentIngredient)
    }
    this.ingredients = groupedIngredients
    this.ingredientsIsChanged.next(this.ingredients.slice())
  }
}
