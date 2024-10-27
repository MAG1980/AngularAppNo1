import { Component, OnDestroy } from '@angular/core';
import { DropdownDirective } from "../../shared/directives/dropdown.directive.";
import { Recipe } from "../recipe.model";
import { ShoppingListItemComponent } from "../../shopping-list/shopping-list-item/shopping-list-item.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    DropdownDirective,
    ShoppingListItemComponent,
    NgForOf,
    NgClass,
    RouterLink,
    NgIf
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent implements OnDestroy {
  recipe: Recipe | null = null
  recipeParamsSubscription: Subscription

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {
    this.recipeParamsSubscription = this.route.params
      .subscribe(params => {
        const id = +params['id']
        this.recipe = this.recipeService.getRecipe(id) || null
      })
    console.log(this.recipe)
  }

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

  ngOnDestroy() {
    this.recipeParamsSubscription.unsubscribe()
    this.recipeService.recipeSelected.emit(null)
  }
}
