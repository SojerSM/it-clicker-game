import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { PlayerStatsService } from './app/domains/player/services/player-stats.service';

bootstrapApplication(AppComponent, {
  providers: [PlayerStatsService],
})
  .then((appRef) => {
    const injector = appRef.injector;
    injector.get(PlayerStatsService);
  })
  .catch((err) => console.error(err));
