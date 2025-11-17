import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { GameInitService } from './app/core/services/game-init.service';
import { GameLoopService } from './app/core/services/game-loop.service';
import { StressEffect } from './app/domains/effect/services/stress-effect.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      const initService = inject(GameInitService);
      initService.init();
    }),
  ],
})
  .then((appRef) => {
    const injector = appRef.injector;
    injector.get(GameLoopService);
    injector.get(StressEffect);
  })
  .catch((err) => console.error(err));
