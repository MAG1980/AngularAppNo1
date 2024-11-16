import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { NgForOf } from "@angular/common";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []
  recipesIsChangedSubscription!: Subscription

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  this.recipesIsChangedSubscription=  this.recipeService.recipesIsChanged.subscribe((recipes) => {
      this.recipes = recipes
    })
  }

  onRecipeAdding() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(){
    this.recipesIsChangedSubscription.unsubscribe()
  }
}
