import { AppComponent } from "./app.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { Routes } from "@angular/router";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import {
  RecipeDetailPlaceholderComponent
} from "./recipes/recipe-detail/recipe-detail-placeholder/recipe-detail-placeholder.component";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { RecipeResolverService } from "./recipes/recipe-resolver.service";

export const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeDetailPlaceholderComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }]
  },
  { path: 'shopping-list', component: ShoppingEditComponent },
  { path: '**', component: AppComponent }
]
