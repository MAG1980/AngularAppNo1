import { Component } from '@angular/core';
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { Ingredient } from "../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list',
  standalone: true,
  imports: [
    ShoppingEditComponent
  ],
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.scss'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = []
}
