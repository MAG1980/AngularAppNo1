import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RecipeService } from "../recipes/recipe.service";
import { API_URL } from "./constants";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes()
    return this.http.put(
      `${ API_URL } /recipes.json`,
      recipes)
      .subscribe(response => {
        console.log(response)
      })
  }
}
