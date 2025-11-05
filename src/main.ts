import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [],
})
  // .then((appRef) => {
  //   const injector = appRef.injector;
  //   injector.get(PlayerStressService);
  // })
  .catch((err) => console.error(err));
