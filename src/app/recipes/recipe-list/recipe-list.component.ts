import { Component, OnInit } from '@angular/core';
import { Recipe } from "../recipe.model";
import { RecipeItemComponent } from "./recipe-item/recipe-item.component";
import { NgForOf } from "@angular/common";
import { RecipeService } from "../recipe.service";

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
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = []

  constructor(private recipeService: RecipeService) {
    this.recipeService.recipesIsChanged.subscribe((recipes)=>{
      this.recipes = recipes
    })
  }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes()
  }
}
