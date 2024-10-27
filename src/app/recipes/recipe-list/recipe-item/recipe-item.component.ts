import { Component, Input } from '@angular/core';
import { NgForOf } from "@angular/common";
import { Recipe } from "../../recipe.model";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-recipe-item',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './recipe-item.component.html',
  styleUrl: './recipe-item.component.scss'
})
export class RecipeItemComponent {
  @Input() recipe!: Recipe

}
