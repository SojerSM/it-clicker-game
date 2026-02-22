import { Routes } from '@angular/router';
import { GameComponent } from './layout/game/game.component';
import { LandingComponent } from './layout/landing/landing.component';
import { HeroCreatorComponent } from './layout/creator/hero-creator/hero-creator.component';
import { gameResolver } from './layout/game/game.resolver';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'hero-creator', component: HeroCreatorComponent },
  {
    path: 'game',
    component: GameComponent,
    resolve: {
      game: gameResolver,
    },
  },
];
