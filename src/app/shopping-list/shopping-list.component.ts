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
  selectedIngredient: Ingredient | null = null
  ingredientsIsChangedSubscription!: Subscription
  startedEditingSubscription!: Subscription

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingredientsIsChangedSubscription = this.shoppingListService.ingredientsIsChanged.subscribe((ingredients) => {
      this.ingredients = ingredients
    })

    this.startedEditingSubscription = this.shoppingListService.startedEditing.subscribe((ingredient) => {
      this.selectedIngredient = ingredient
    })
  }

  ngOnDestroy() {
    this.ingredientsIsChangedSubscription.unsubscribe()
    this.startedEditingSubscription.unsubscribe()
  }

  onEditItem(ingredient: Ingredient) {
    this.shoppingListService.startedEditing.next(ingredient)
    this.selectedIngredient = ingredient
    this.shoppingListService.selectedIngredientIsChanged.next(ingredient)
    console.log("Selected item:", this.selectedIngredient)
  }

  onGroupItems() {
    this.shoppingListService.groupIngredients()
  }
}
