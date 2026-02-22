import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GameInitService } from '../../../core/services/game-init.service';

@Component({
  selector: 'app-hero-creator',
  imports: [],
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
})
export class HeroCreatorComponent {
  constructor(private router: Router, private gameInitService: GameInitService) {}

  startGame(): void {
    this.gameInitService.init();
    this.router.navigate(['/game']);
  }
}
