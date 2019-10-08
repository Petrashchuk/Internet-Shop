import {Directive, ElementRef, HostListener, Renderer2} from "@angular/core";

@Directive({
  selector: '[hover]'
})

export class HoverDirective {

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.element.nativeElement, "cursor", "pointer");
  }

  @HostListener("mouseenter") onMouseEnter() {
    this.boxShadow("0 10px 20px grey");
    this.boxRounder('5px');
    this.boxTrans('.3s');
  }

  @HostListener("mouseleave") onMouseLeave() {
    this.boxShadow('none');
    this.boxRounder('0');
    this.boxTrans('.3s');
  }
  private boxShadow(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'box-shadow', val)
  }
  private boxRounder(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', val)
  }
  private boxTrans(val: string) {
    this.renderer.setStyle(this.element.nativeElement, 'transition', val)
  }
}
