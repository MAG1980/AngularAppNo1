import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsAreaComponent } from "./buttons-area/buttons-area.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";
import { HeaderComponent } from "./header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RecipesComponent, ButtonsAreaComponent, ShoppingListComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAppNo1';
}
