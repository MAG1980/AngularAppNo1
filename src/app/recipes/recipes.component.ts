import { Component, OnInit } from '@angular/core';
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./recipe.model";
import { NgIf } from "@angular/common";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RecipeListComponent,
    RecipeDetailComponent,
    NgIf,
    RouterOutlet
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  providers: [RecipeService],
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe | null = null

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipeSelected.subscribe((recipe) => {this.selectedRecipe = recipe})
  }

  ngOnInit() {

  }
}
