import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero-creator',
  imports: [],
  templateUrl: './hero-creator.component.html',
  styleUrl: './hero-creator.component.scss',
})
export class HeroCreatorComponent {
  constructor(private router: Router) {}

  startGame(): void {
    this.router.navigate(['/game']);
  }
}
