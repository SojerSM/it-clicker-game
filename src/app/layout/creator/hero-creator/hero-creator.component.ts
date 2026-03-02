import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInitService } from '../../../core/services/game-init.service';
import { HeroGeneratorService } from '../../../domains/heroes/services/hero-generator.service';
import { HeroRole } from '../../../domains/heroes/types/enums/hero-role.enum';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CreatorPreviewComponent } from './creator-preview/creator-preview.component';
import { HeroOrigin } from '../../../domains/heroes/types/enums/hero-origin.enum';
import { Gender } from '../../../shared/types/enums/gender.enum';

@Component({
  selector: 'app-hero-creator',
  imports: [CreatorPreviewComponent, CategorySelectorComponent],
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
})
export class HeroCreatorComponent {
  private STORAGE_KEY = 'ceoDraft';
  private ORIGIN_SELECTOR = 'Origin';
  private GENDER_SELECTOR = 'Gender';

  constructor(
    private router: Router,
    private gameInitService: GameInitService,
    private heroGeneratorService: HeroGeneratorService
  ) {}

  get originLabel(): string {
    return this.ORIGIN_SELECTOR;
  }

  get genderLabel(): string {
    return this.GENDER_SELECTOR;
  }

  get originOptions(): string[] {
    return ['all', ...Object.values(HeroOrigin)];
  }

  get genderOptions(): string[] {
    return ['both', ...Object.values(Gender)];
  }

  startGame(): void {
    this.gameInitService.init();
    this.router.navigate(['/game']);
  }

  getRandomHero(): void {
    const hero = this.heroGeneratorService.generate(HeroRole.CEO);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(hero));
  }
}
