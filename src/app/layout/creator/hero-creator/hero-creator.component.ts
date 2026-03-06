import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HeroGeneratorService } from '../../../domains/heroes/services/hero-generator.service';
import { HeroOrigin } from '../../../domains/heroes/types/enums/hero-origin.enum';
import { HeroRole } from '../../../domains/heroes/types/enums/hero-role.enum';
import { LangWidgetComponent } from '../../../shared/components/lang-widget/lang-widget.component';
import { Gender } from '../../../shared/types/enums/gender.enum';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CreatorPreviewComponent } from './creator-preview/creator-preview.component';

@Component({
  selector: 'app-hero-creator',
  imports: [CreatorPreviewComponent, CategorySelectorComponent, LangWidgetComponent],
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
})
export class HeroCreatorComponent {
  private STORAGE_KEY = 'ceoDraft';
  private ORIGIN_SELECTOR = 'Origin';
  private GENDER_SELECTOR = 'Gender';

  origin = signal<HeroOrigin | null>(null);
  gender = signal<Gender | null>(null);

  constructor(private router: Router, private heroGeneratorService: HeroGeneratorService) {}

  get originLabel(): string {
    return this.ORIGIN_SELECTOR;
  }

  get genderLabel(): string {
    return this.GENDER_SELECTOR;
  }

  get originOptions(): (HeroOrigin | null)[] {
    return [null, ...Object.values(HeroOrigin)];
  }

  get genderOptions(): (Gender | null)[] {
    return [null, ...Object.values(Gender)];
  }

  startGame(): void {
    this.router.navigate(['/game']);
  }

  getRandomHero(): void {
    const selectedOrigin = this.origin() ?? undefined;
    const selectedGender = this.gender() ?? undefined;

    const hero = this.heroGeneratorService.generateDraft(
      HeroRole.CEO,
      selectedOrigin,
      selectedGender
    );

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(hero));
  }
}
