import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from "@angular/forms";
import { NgForOf, NgOptimizedImage } from "@angular/common";
import { RecipeService } from "../recipe.service";


@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage,
    NgForOf
  ],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit {
  id!: number
  editMode = false
  recipeForm!: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null
      this.initForm()
    })
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray<AbstractControl>([])


    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      if (recipe) {
        recipeName = recipe.name
        recipeImagePath = recipe.imagePath
        recipeDescription = recipe.description
        if (recipe['ingredients']) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(
                  ingredient.amount, [
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                  ])
              })
            )
          }
        }
      }
    }
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription),
      ingredients: recipeIngredients
    })
  }

  getIngredientControls() {
    return ( <FormArray> this.recipeForm.get('ingredients') ).controls
  }

  onSubmit() {
    console.log(this.recipeForm.value)
  }

  onCancel() {
  }

  onAddIngredient() {
    ( <FormArray> this.recipeForm.get('ingredients') )
      .push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
  }
}
