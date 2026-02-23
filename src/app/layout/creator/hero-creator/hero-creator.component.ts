import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInitService } from '../../../core/services/game-init.service';
import { CreatorPreviewComponent } from './creator-preview/creator-preview.component';
import { HeroGeneratorService } from '../../../domains/heroes/services/hero-generator.service';
import { HeroRole } from '../../../domains/heroes/types/enums/hero-role.enum';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-hero-creator',
  imports: [CreatorPreviewComponent],
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
})
export class HeroCreatorComponent {
  private STORAGE_KEY = 'ceoDraft';

  constructor(
    private router: Router,
    private gameInitService: GameInitService,
    private heroGeneratorService: HeroGeneratorService
  ) {}

  startGame(): void {
    this.gameInitService.init();
    this.router.navigate(['/game']);
  }

  getRandomHero(): void {
    const hero = this.heroGeneratorService.generate(HeroRole.CEO);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(hero));
  }
}
