import { Component, OnDestroy, OnInit } from '@angular/core';
import { DropdownDirective } from "../../shared/directives/dropdown.directive.";
import { Recipe } from "../recipe.model";
import { ShoppingListItemComponent } from "../../shopping-list/shopping-list-item/shopping-list-item.component";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
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
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe | null = null
  recipeParamsSubscription!: Subscription
  recipeId: string | null = null

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.recipeParamsSubscription = this.route.params
      .subscribe(params => {
        this.recipeId = params['id']
        if ( this.recipeId ) {
          this.recipe = this.recipeService.getRecipe(this.recipeId) || null
        }
      })
  }

  deleteRecipe() {
    if (this.recipe) {
      this.recipeService.deleteRecipe(this.recipe)
    }

    this.router.navigate(['recipes'])
  }

  addToShoppingList() {
    if (this.recipe?.ingredients) {
      this.recipeService.addToShoppingList(this.recipe.ingredients)
    }
  }

  onRecipeEditing() {
    // this.router.navigate(['../', this.recipeId, 'edit'], { relativeTo: this.route })
    this.router.navigate(['edit'], { relativeTo: this.route })
  }

  ngOnDestroy() {
    this.recipeParamsSubscription.unsubscribe()
  }
}
