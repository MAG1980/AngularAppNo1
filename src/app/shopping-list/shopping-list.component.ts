import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from "../shared/ingredient.model";
import { NgClass, NgForOf } from "@angular/common";
import { ShoppingListService } from "./shopping-list.service";
import { ShoppingListItemComponent } from "./shopping-list-item/shopping-list-item.component";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    NgForOf,
    ShoppingListItemComponent,
    NgClass
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = []
  selectedIngredient: Ingredient | null = null

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientsIsChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
    this.shoppingListService.selectedIngredientIsChanged.subscribe((ingredient) => {
      this.selectedIngredient = ingredient
    })
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
  }

  selectIngredient(ingredient: Ingredient) {
    this.shoppingListService.setSelectedIngredient(ingredient)
  }
}
