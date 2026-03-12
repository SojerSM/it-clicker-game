import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-landing',
  imports: [RouterOutlet],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  constructor(private router: Router) {}

  goToHeroCreator(): void {
    this.router.navigate(['/hero-creator']);
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
