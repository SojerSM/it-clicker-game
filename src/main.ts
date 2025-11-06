import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { GameLoopService } from './app/core/services/game-loop.service';
import { StressEffect } from './app/domains/effect/services/stress-effect.service';

bootstrapApplication(AppComponent, {
  providers: [],
})
  .then((appRef) => {
    const injector = appRef.injector;
    injector.get(GameLoopService);
    injector.get(StressEffect);
  })
  .catch((err) => console.error(err));
