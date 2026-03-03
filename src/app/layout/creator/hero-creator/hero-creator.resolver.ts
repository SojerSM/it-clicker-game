import { ResolveFn } from '@angular/router';
import { HeroGeneratorService } from '../../../domains/heroes/services/hero-generator.service';
import { inject } from '@angular/core';
import { HeroRole } from '../../../domains/heroes/types/enums/hero-role.enum';
import { Hero } from '../../../domains/heroes/types/hero.model';
import { HeroDraft } from '../../../domains/heroes/types/hero-draft';

const STORAGE_KEY = 'ceoDraft';

export const heroCreatorResolver: ResolveFn<void> = (route, state) => {
  const heroGeneratorService = inject(HeroGeneratorService);

  if (loadDraft() === null) {
    const hero = heroGeneratorService.generateDraft(HeroRole.CEO);
    saveDraft(hero);
  }
};

function saveDraft(draft: HeroDraft): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

function loadDraft(): Hero | null {
  const draft = localStorage.getItem(STORAGE_KEY);

  return draft ? JSON.parse(draft) : null;
}
