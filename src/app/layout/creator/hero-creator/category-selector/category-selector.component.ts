import { TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-category-selector',
  imports: [TitleCasePipe],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.scss',
})
export class CategorySelectorComponent<T> {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) options!: readonly T[];
  @Output() valueChange = new EventEmitter<T>();

  activeIndex = 0;

  get activeOption() {
    return this.options[this.activeIndex];
  }

  get displayValue(): string {
    const value = this.activeOption;

    if (value === null) {
      return this.title === 'Gender' ? 'Both' : 'All';
    }

    return String(value);
  }

  switch(direction: 'left' | 'right'): void {
    const step = direction === 'right' ? 1 : -1;

    this.activeIndex = (this.activeIndex + step + this.options.length) % this.options.length;
    this.valueChange.emit(this.activeOption);
  }
}
