import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  @HostBinding('class.closed') isClosed = true

  @HostListener('click') toggleOpen() {
    this.isClosed = !this.isClosed
  }

  @HostListener('mouseleave') close() {
    if ( !this.isClosed ) {
      this.isClosed = true
    }
  }
}
