import { Component } from '@angular/core';
import { HeroDraft } from '../../../../domains/heroes/types/hero-draft';

@Component({
  selector: 'app-creator-preview',
  imports: [],
  templateUrl: './creator-preview.component.html',
  styleUrl: './creator-preview.component.scss',
})
export class CreatorPreviewComponent {
  private STORAGE_KEY = 'ceoDraft';

  get draft(): HeroDraft | null {
    const hero = localStorage.getItem(this.STORAGE_KEY);

    return hero ? JSON.parse(hero) : null;
  }
}
