import { Component } from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";
import { FormsModule, NgForm } from "@angular/forms";

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent {

  constructor(private shoppingListService: ShoppingListService) {
  }

  addIngredient(form: NgForm) {
    this.shoppingListService.addIngredient(new Ingredient(form.value.name.trim(), +form.value.amount))
    form.reset()
  }

  clearInputs(form: NgForm) {
    form.reset()
  }

  deleteItem() {
    this.shoppingListService.deleteIngredient()
  }
}
