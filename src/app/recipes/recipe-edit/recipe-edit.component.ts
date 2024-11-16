import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
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
import { v4 as uuidv4 } from 'uuid';
import { RecipeService } from "../recipe.service";
import { Recipe } from "../recipe.model";


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
  id!: string
  editMode = false
  recipeForm!: FormGroup

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id']
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
    if ( this.id || this.editMode ) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(
        new Recipe(
          uuidv4(),
          this.recipeForm.value.name,
          this.recipeForm.value.description,
          this.recipeForm.value.imagePath,
          this.recipeForm.value.ingredients)
      )
    }
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route })
  }

  onAddIngredient() {
    ( <FormArray> this.recipeForm.get('ingredients') )
      .push(new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null,
          [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      }))
  }

  onDeleteIngredient(id:number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(id)
  }
}
