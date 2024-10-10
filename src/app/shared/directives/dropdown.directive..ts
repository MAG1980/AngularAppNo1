import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdown]',
  standalone: true
})
export class DropdownDirective {
  private readonly element: HTMLElement
  isOpen = false

  constructor(private ref: ElementRef, private renderer: Renderer2) {
    this.element = this.ref.nativeElement
  }

  @HostListener('click') toggleOpen() {
    if ( this.isOpen ) {
      this.renderer.addClass(this.element, 'closed')
      this.isOpen = false
    } else {
      this.renderer.removeClass(this.element, 'closed')
      this.isOpen = true
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.addClass(this.element, 'closed')
    this.isOpen= false
  }
}
