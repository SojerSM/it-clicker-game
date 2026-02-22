import { provideHttpClient } from '@angular/common/http';
import { inject, provideAppInitializer } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { EffectService } from './app/domains/effect/services/effect.service';
import { ImpactEffectService } from './app/domains/effect/services/impact-effect.service';
import { StressEffectService } from './app/domains/effect/services/stress-effect.service';
import { firstValueFrom } from 'rxjs';

bootstrapApplication(AppComponent, {
  providers: [
    provideAppInitializer(async () => {
      const translate = inject(TranslateService);
      await firstValueFrom(translate.use('en'));
    }),
    provideAppInitializer(() => {
      inject(EffectService);
      inject(StressEffectService);
      inject(ImpactEffectService);
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
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
