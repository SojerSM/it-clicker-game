import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { TicketStressEffectService } from './app/domains/effect/services/ticket-stress-effect.service';

bootstrapApplication(AppComponent, {
  providers: [],
})
  .then((appRef) => {
    const injector = appRef.injector;
    injector.get(TicketStressEffectService);
  })
  .catch((err) => console.error(err));
