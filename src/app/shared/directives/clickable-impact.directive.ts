import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { FloatingMpiService } from '../components/clickable/floating-mpi.service';

@Directive({
  selector: '[appClickableImpact]',
})
export class ClickableImpactDirective {
  @Input({ required: true }) value!: number;

  constructor(
    private floatingMpiService: FloatingMpiService,
    private element: ElementRef,
    private renderer: Renderer2
  ) {
    this.setStyles();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    this.floatingMpiService.spawn(event.clientX, event.clientY, this.value);
  }

  @HostListener('mousedown')
  onPress() {
    this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(3px)');
  }

  @HostListener('mouseup')
  onRelease() {
    this.renderer.setStyle(this.element.nativeElement, 'transform', 'translateY(0)');
  }

  private setStyles(): void {
    this.renderer.setStyle(this.element.nativeElement, 'user-select', 'none');
    this.renderer.setStyle(this.element.nativeElement, '-webkit-user-select', 'none');
    this.renderer.setStyle(this.element.nativeElement, '-moz-user-select', 'none');
    this.renderer.setStyle(this.element.nativeElement, '-ms-user-select', 'none');
    this.renderer.setStyle(this.element.nativeElement, 'transition', 'transform 0.15s ease');
  }
}
