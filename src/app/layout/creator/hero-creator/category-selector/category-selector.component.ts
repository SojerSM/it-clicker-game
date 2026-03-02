import { Component, signal } from '@angular/core';
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

  private activeIndex = signal(0);

  get activeOption() {
    return this.options[this.activeIndex()];
  }

  switch(direction: 'left' | 'right'): void {
    const step = direction === 'right' ? 1 : -1;
    const newIndex = (this.activeIndex() + step + this.options.length) % this.options.length;

    this.activeIndex.set(newIndex);
  }
}
