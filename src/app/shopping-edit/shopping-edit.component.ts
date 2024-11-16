import { Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { NgIf } from "@angular/common";
import { v4 as uuidv4 } from 'uuid';
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "./shopping-list/shopping-list.service";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

@Component({
  selector: 'app-shopping-edit',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ShoppingListComponent
  ],
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.scss'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription
  editMode: boolean = false
  editedItem!: Ingredient
  @ViewChild('form') shoppingListForm!: NgForm
  @ViewChild('shoppingEdit') shoppingEdit!: ElementRef

  constructor(
    private renderer: Renderer2,
    private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.renderer.listen('window', 'click',
      (event: Event) => {
        if (!this.shoppingEdit.nativeElement.contains(event.target as Node)) {
          this.clearInputs(this.shoppingListForm)
        }
      })

    this.subscription = this.shoppingListService.startedEditing.subscribe((ingredient) => {
      if (ingredient) {
        this.editedItem = ingredient
        this.editMode = true
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

  onGroupItems() {
    this.shoppingListService.groupIngredients()
  }
}
