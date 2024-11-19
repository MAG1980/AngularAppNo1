import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonsAreaComponent } from "./buttons-area/buttons-area.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { HeaderComponent } from "./header/header.component";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RecipesComponent,
    ButtonsAreaComponent,
    HeaderComponent,
    NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'AngularAppNo1';
}
