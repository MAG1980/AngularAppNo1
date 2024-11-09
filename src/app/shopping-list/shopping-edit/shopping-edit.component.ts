import { Component, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ShoppingListService } from "../shopping-list.service";
import { Ingredient } from "../../shared/ingredient.model";
import { FormsModule, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgIf } from "@angular/common";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  editMode: boolean = false
  editedItem!: Ingredient
  @ViewChild('form') shoppingListForm!: NgForm
  @Input('shoppingList') shoppingList!: HTMLDivElement

  constructor(
    private renderer: Renderer2,
    private shoppingListService: ShoppingListService) {
    this.renderer.listen('window', 'click',
      (event: Event) => {
        if (!this.shoppingList.contains(event.target as Node)) {
          this.clearInputs(this.shoppingListForm)
        }
      })
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((ingredient) => {
      this.editedItem = ingredient
      this.editMode = true
      if (ingredient.id) {
        this.shoppingListForm.setValue({
          name: this.editedItem?.name,
          amount: this.editedItem?.amount
        })
      }
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  addIngredient(form: NgForm) {
    this.shoppingListService.addIngredient(
      new Ingredient(uuidv4(), form.value.name.trim(), +form.value.amount)
    )
    form.reset()
  }

  clearInputs(form: NgForm) {
    form.reset()
    this.shoppingListService.startedEditing.next({ id: '', name: '', amount: 0 })
    this.editMode = false
  }

  deleteItem() {
    if (this.editedItem) {
      this.shoppingListService.deleteIngredient(this.editedItem)
      this.shoppingListForm.reset()
      this.editMode = false
    }
  }

  saveIngredientChanges() {
    if (this.editedItem) {
      this.shoppingListService.saveIngredientChanges(this.editedItem.id, this.shoppingListForm.value.amount)
      this.shoppingListForm.reset()
      this.shoppingListService.startedEditing.next({ id: '', name: '', amount: 0 })
      this.editMode = false
    }
  }
}
