import { Component, EventEmitter, Output } from '@angular/core';
import { MenuNavigationPayload } from "../common/MenuNavigationPayload.type";
import { NgClass } from "@angular/common";
import { DropdownDirective } from "../shared/directives/dropdown.directive.";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgClass,
    DropdownDirective
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Output() changeCurrentSection = new EventEmitter<'recipes' | 'shoppingList' | undefined>()
  currentSection: MenuNavigationPayload = 'recipes';

  setCurrentSection($event: MouseEvent) {
    const element = $event.target as HTMLAnchorElement;
    const section = element.dataset['section'] as MenuNavigationPayload;
    this.currentSection = section;
    this.changeCurrentSection.emit(section);
  }

}
