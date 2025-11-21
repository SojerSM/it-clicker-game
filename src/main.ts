import { provideHttpClient } from '@angular/common/http';
import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { GameInitService } from './app/core/services/game-init.service';
import { EffectService } from './app/domains/effect/services/effect.service';
import { StressEffectService } from './app/domains/effect/services/stress-effect.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(() => {
      const initService = inject(GameInitService);
      return initService.init();
    }),
    provideAppInitializer(() => {
      inject(EffectService);
      inject(StressEffectService);
      return;
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
}).catch((err) => console.error(err));
