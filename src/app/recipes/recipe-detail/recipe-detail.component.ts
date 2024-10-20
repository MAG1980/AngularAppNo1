import { Component, Input } from '@angular/core';
import { DropdownDirective } from "../../shared/directives/dropdown.directive.";
import { Recipe } from "../recipe.model";
import { ShoppingListItemComponent } from "../../shopping-list/shopping-list-item/shopping-list-item.component";
import { NgClass, NgForOf } from "@angular/common";
import { RecipeService } from "../recipe.service";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    DropdownDirective,
    ShoppingListItemComponent,
    NgForOf,
    NgClass
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe | null = null

  constructor(private recipeService: RecipeService) {}

  deleteRecipe() {
    if (this.recipe) {
      this.recipeService.deleteRecipe(this.recipe)
    }
  }

  addToShoppingList() {
    if (this.recipe?.ingredients) {
      this.recipeService.addToShoppingList(this.recipe.ingredients)
    }
  }
}
