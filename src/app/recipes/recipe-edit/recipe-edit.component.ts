import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgOptimizedImage } from "@angular/common";

@Component({
  selector: 'app-recipe-edit',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgOptimizedImage
  ],
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.scss'
})
export class RecipeEditComponent implements OnInit {
  id!: number
  editMode = false

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id']
      this.editMode = params['id'] != null
    })
  }

  onSubmit() {}

  onCancel() {}

  protected readonly FormGroup = FormGroup;
}
