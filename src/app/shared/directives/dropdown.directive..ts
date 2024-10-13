import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.opened') isOpened = false

  @HostListener('click') toggleOpen() {
    this.isOpened = !this.isOpened
  }

  @HostListener('mouseleave') close() {
    if ( !this.isOpened ) {
      this.isOpened = false
    }
  }
}
