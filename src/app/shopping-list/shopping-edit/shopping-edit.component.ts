import { Component, ElementRef, ViewChild } from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent {
  @ViewChild('name') ingredientNameInput!: ElementRef;
  @ViewChild('amount') ingredientAmountInput!: ElementRef;

  constructor(private shoppingListService: ShoppingListService) { }

  addIngredient() {
    const nameInput = this.ingredientNameInput?.nativeElement as HTMLInputElement
    const amountInput = this.ingredientAmountInput?.nativeElement as HTMLInputElement
    this.shoppingListService.addIngredient(new Ingredient(nameInput.value, +amountInput.value))
    nameInput.value = ''
    amountInput.value = ''
  }

  clearInputs() {
    const nameInput = this.ingredientNameInput?.nativeElement as HTMLInputElement
    const amountInput = this.ingredientAmountInput?.nativeElement as HTMLInputElement
    nameInput.value = ''
    amountInput.value = ''
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient()
  }
}
