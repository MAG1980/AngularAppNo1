import { Component } from '@angular/core';
import { RecipeListComponent } from "./recipe-list/recipe-list.component";

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [
    RecipeListComponent
  ],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent {

}
