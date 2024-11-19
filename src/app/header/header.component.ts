import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import { DropdownDirective } from "../shared/directives/dropdown.directive.";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { DataStorageService } from "../common/data-storage.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    DropdownDirective,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  constructor(private dataStorageService: DataStorageService) {
  }
  onSaveRecipes(){
    this.dataStorageService.storeRecipes()
  }
}
