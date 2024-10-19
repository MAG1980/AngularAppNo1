import { Component, Input } from '@angular/core';
import { NgClass, NgForOf } from "@angular/common";
import { Ingredient } from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list-item',
  standalone: true,
  imports: [
    NgForOf,
    NgClass
  ],
  templateUrl: './shopping-list-item.component.html',
  styleUrl: './shopping-list-item.component.scss'
})
export class ShoppingListItemComponent {
  @Input()  ingredient!: Ingredient
  @Input()  parentClass!: string
}
