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
      if (ingredient) {
        this.editedItem = ingredient
        this.editMode = true
        console.log("Edited item:", this.editedItem)
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

  onSubmit(form: NgForm) {
    if (this.editMode) {
      this.editedItem.name = form.value.name
      this.editedItem.amount = form.value.amount
      this.shoppingListService.saveIngredientChanges(this.editedItem)
      this.shoppingListService.startedEditing.next(null)
    } else {
      this.shoppingListService.addIngredient(
        new Ingredient(uuidv4(), form.value.name.trim(), +form.value.amount)
      )
    }
    this.onClear(this.shoppingListForm)
  }

  clearInputs(form: NgForm) {
    this.shoppingListService.startedEditing.next(null)
    this.onClear(form)
  }

  deleteItem(form: NgForm) {
    if (this.editedItem) {
      this.shoppingListService.deleteIngredient(this.editedItem)
      this.onClear(form)
    }
  }

  onClear(form: NgForm) {
    form.reset()
    this.editMode = false
  }
}
