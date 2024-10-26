import { Component } from '@angular/core';
import { NgClass } from "@angular/common";
import { DropdownDirective } from "../shared/directives/dropdown.directive.";
import { RouterLink, RouterLinkActive } from "@angular/router";

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
}
