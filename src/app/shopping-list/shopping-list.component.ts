import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from "../shared/ingredient.model";
import { NgClass, NgForOf } from "@angular/common";
import { ShoppingListService } from "./shopping-list.service";
import { ShoppingListItemComponent } from "./shopping-list-item/shopping-list-item.component";
import { Subscription } from "rxjs";

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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = []
  selectedIngredient: Ingredient = { id: '', name: '', amount: 0 }
  subscription!: Subscription

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
    this.subscription = this.shoppingListService.startedEditing.subscribe((ingredient) => {
      this.selectedIngredient = ingredient
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onEditItem(ingredient: Ingredient) {
    this.shoppingListService.startedEditing.next(ingredient)
    this.selectedIngredient = ingredient
  }
}
