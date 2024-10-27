import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { NgForOf } from "@angular/common";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

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
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = []

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.recipeService.recipesIsChanged.subscribe((recipes) => {
      this.recipes = recipes
    })
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }

  onRecipeAdding() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }
}
