import { Component, Input } from '@angular/core';
import { DropdownDirective } from "../../shared/directives/dropdown.directive.";
import { Recipe } from "../recipe.model";

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [
    DropdownDirective
  ],
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.scss'
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe | null = null
}
