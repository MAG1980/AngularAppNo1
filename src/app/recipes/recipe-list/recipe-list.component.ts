import { Component } from '@angular/core';
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes: Recipe[] = [new Recipe('A Test Recipe', 'This is a test', 'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg')];
}
