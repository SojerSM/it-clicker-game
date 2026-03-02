import { Component, EventEmitter, Output, Signal, signal } from '@angular/core';
import { Input } from '@angular/core';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-category-selector',
  imports: [TitleCasePipe],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.scss',
})
export class CategorySelectorComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) options!: string[];
  @Output() indexChange = new EventEmitter<number>();

  activeIndex = 0;

  get activeOption() {
    return this.options[this.activeIndex];
  }

  switch(direction: 'left' | 'right'): void {
    const step = direction === 'right' ? 1 : -1;

    this.activeIndex = (this.activeIndex + step + this.options.length) % this.options.length;
    this.indexChange.emit(this.activeIndex);
  }
}
