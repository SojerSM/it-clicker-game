import { Component } from '@angular/core';
import { Hero } from '../../../../domains/heroes/types/hero.model';

@Component({
  selector: 'app-creator-preview',
  imports: [],
  templateUrl: './creator-preview.component.html',
  styleUrl: './creator-preview.component.scss',
})
export class CreatorPreviewComponent {
  private STORAGE_KEY = 'ceoDraft';

  get draft(): Hero | null {
    const hero = localStorage.getItem(this.STORAGE_KEY);

    return hero ? JSON.parse(hero) : null;
  }
}
