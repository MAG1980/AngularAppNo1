import { Component } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { NgForOf } from "@angular/common";

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [
    RecipeItemComponent,
    NgForOf
  ],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test1 Recipe', 'This is a test1', 'https://attuale.ru/wp-content/uploads/2018/10/49-1.jpg'),
    new Recipe('A Test2 Recipe', 'This is a test2', 'https://attuale.ru/wp-content/uploads/2018/10/49-2.jpg')
  ];
}
