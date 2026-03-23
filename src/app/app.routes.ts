import { Routes } from '@angular/router';
import { GameComponent } from './layout/game/game.component';
import { LandingComponent } from './layout/landing/landing.component';
import { HeroCreatorComponent } from './layout/creator/hero-creator/hero-creator.component';
import { heroCreatorResolver } from './layout/creator/hero-creator/hero-creator.resolver';
import { gameResolver } from './layout/game/game.resolver';
import { RegisterComponent } from './domains/security/components/register/register.component';
import { AuthComponent } from './domains/security/components/auth/auth.component';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'auth',
    component: AuthComponent,
  },
  {
    path: 'hero-creator',
    component: HeroCreatorComponent,
    resolve: {
      heroCreator: heroCreatorResolver,
    },
    canActivate: [authGuard],
  },
  {
    path: 'game',
    component: GameComponent,
    resolve: { gameResolver: gameResolver },
    canActivate: [authGuard],
  },
];
