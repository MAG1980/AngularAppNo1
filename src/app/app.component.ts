import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsAreaComponent } from "./buttons-area/buttons-area.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HeaderComponent } from "./header/header.component";
import { NgIf } from "@angular/common";
import { MenuNavigationPayload } from "./common/MenuNavigationPayload.type";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipesComponent, ButtonsAreaComponent, ShoppingListComponent, HeaderComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAppNo1';
  currentSection: MenuNavigationPayload = 'recipes';

  setCurrentSection($event: MenuNavigationPayload) {
    this.currentSection = $event as unknown as MenuNavigationPayload;
  }
}
