import { Component } from '@angular/core';
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
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
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {
}
