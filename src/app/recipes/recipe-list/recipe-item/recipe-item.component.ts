import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Recipe } from "../../recipe.model";

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe
}