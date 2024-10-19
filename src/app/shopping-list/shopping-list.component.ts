import { Component, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from "../shared/ingredient.model";
import { NgForOf } from "@angular/common";
import { ShoppingListService } from "./shopping-list.service";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingEditComponent,
    NgForOf
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = []

  constructor(private shoppingListService: ShoppingListService) {
    this.shoppingListService.ingredientsIsChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
  }

  selectIngredient(ingredient: Ingredient) {
    this.shoppingListService.setSelectedIngredient(ingredient)
  }
}
