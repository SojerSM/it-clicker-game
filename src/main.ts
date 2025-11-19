import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { GameInitService } from './app/core/services/game-init.service';
import { GameLoopService } from './app/core/services/game-loop.service';
import { StressEffect } from './app/domains/effect/services/stress-effect.service';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      const initService = inject(GameInitService);
      initService.init();
    }),
    provideHttpClient(),
    provideTranslateService({
      lang: 'pl',
      fallbackLang: 'pl',
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json',
      }),
    }),
  ],
})
  .then((appRef) => {
    const injector = appRef.injector;
    injector.get(GameLoopService);
    injector.get(StressEffect);
  })
  .catch((err) => console.error(err));
